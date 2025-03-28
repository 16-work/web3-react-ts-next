/* eslint-disable */

import fs from 'fs';
import path from 'path';
import xlsx from 'xlsx';
import { converter } from './zhTWConverter.js';

const commonFilePath = path.resolve('./', 'src/constants/i18n/config.ts');
const commonFileContent = fs.readFileSync(commonFilePath, 'utf8');



// 读取需要生成的语言列表
const match = commonFileContent.match(/supportLanguages\s*=\s*({[\s\S]*?});/);
const languageOptions = new Function(`return ${match[1]}`)();
const languageType = Object.keys(languageOptions);


const excelFileName = 'i18n.xlsx';
const currentDirPath = '/src/constants/i18n/script'; // 当前目录路径
const __dirname = path.resolve(`${process.cwd()}${currentDirPath}`);
let workbook = xlsx.readFile(path.join(__dirname, excelFileName));

// 检测字符串是否需要转换为函数
function hasVariables(str) {
  return /\{(\w+)\}/.test(str);
}

// 将含变量的字符串转换为函数
function convertToFunction(str) {
  const matches = [...str.matchAll(/\{(\w+)\}/g)];
  const params = [...new Set(matches.map(m => m[1]))]; // 去重后的参数列表

  // 生成参数类型定义，例如：(label: string, min: number)
  const paramList = params.map(p => `${p}: string | number`).join(', ');

  // 替换 {var} 为 ${var}
  const template = str.replace(/\{(\w+)\}/g, '$${$1}');

  return `(${paramList}) => \`${template}\``;
}

// 递归处理对象的值
function processValue(value) {
  if (typeof value === 'string') {
    if (hasVariables(value)) {
      return convertToFunction(value);
    }
    return `'${value.replace(/'/g, "\\'")}'`; // 处理字符串中的单引号
  }
  if (typeof value === 'object' && value !== null) {
    const processed = {};
    for (const key in value) {
      processed[key] = processValue(value[key]);
    }
    return processed;
  }
  return value;
}


let sheets = {};
let sheetNames = workbook.SheetNames;
sheetNames.map((v, i) => {
  let encode = v.split('-')[0];
  let sheet = workbook.Sheets[sheetNames[i]];
  let range = xlsx.utils.decode_range(sheet['!ref']);
  let arr = [];
  // //循环获取单元格值
  for (let R = range.s.r; R <= range.e.r; ++R) {
    let row_value = [];
    for (let C = range.s.c; C <= range.e.c; ++C) {
      let cell_address = {
        c: C,
        r: R,
      }; //获取单元格地址
      let cell = xlsx.utils.encode_cell(cell_address); //根据单元格地址获取单元格
      if (cell != 'A1' && cell != 'B1' && cell != 'C1') {
        //获取单元格值
        if (sheet[cell]) {
          // 如果出现乱码可以使用iconv-lite进行转码
          // row_value += iconv.decode(sheet1[cell].v, 'gbk') + ", ";
          //    if(sheet1[cell].v != 'encode')
          row_value.push(sheet[cell].v);
        } else {
          //     row_value += ", ";
        }
      }
    }
    if (row_value.length) {
      arr.push(row_value);
    }
  }
  sheets[encode] = arr;
});


/** 开始生成 */
// 取表格中的语言列
const theadLangs = (xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames[0]], { header: 1 })[0])
theadLangs.shift();

// 将excel转化为对象
const lang = {}
theadLangs.map((langName, langIndex) => {
  const tables = {}
  Object.keys(sheets).map((sheetName) => {
    const o = {};
    sheets[sheetName].map((row) => {
      o[row[0]] = row[langIndex + 1]
    })
    tables[sheetName] = o;
  })
  lang[langName] = tables
})

// 生成繁中表
if (languageType.find(item => item === 'zh-TW')) {
  const table = {}
  Object.keys(lang['zh-CN']).map(sheetName => {
    const sheet = {};
    Object.keys(lang['zh-CN'][sheetName]).map(key => {
      sheet[key] = converter(lang["zh-CN"][sheetName][key]);
    })
    table[sheetName] = sheet;
  })
  lang['zh-TW'] = table
}

// 只导出需要的语言
const filteredLang = Object.keys(lang).reduce((acc, key) => {
  if (languageType.includes(key)) {
    acc[key] = lang[key];
  }
  return acc;
}, {});


// 处理所有值，将含变量的字符串转换为函数
const processedLang = {};
for (const langKey in filteredLang) {
  processedLang[langKey] = {};
  for (const sheetName in filteredLang[langKey]) {
    processedLang[langKey][sheetName] = processValue(filteredLang[langKey][sheetName]);
  }
}

// 自定义序列化函数
function customStringify(obj, indent = 2, isTopLevel = true) {
  if (typeof obj === 'string') {
    // 如果是字符串，直接返回带引号的值
    return obj;
  }
  if (typeof obj === 'object' && obj !== null) {
    // 处理对象
    const entries = Object.entries(obj)
      .map(([k, v]) => {
        // 如果是第一层，键需要加引号；否则不加引号
        const key = isTopLevel ? `"${k}"` : k;
        return `${key}: ${customStringify(v, indent, false)}`; // 递归处理值
      })
      .join(`,\n${' '.repeat(indent)}`);
    return `{\n${' '.repeat(indent)}${entries}\n${' '.repeat(indent - 2)}}`;
  }
  return JSON.stringify(obj);
}

// 生成最终内容
let content = `export const lang = ${customStringify(processedLang, 2)};`;

// 写入到 index.ts
fs.writeFile(
  path.resolve(__dirname, `../lang.ts`),
  content,
  (err) => {
    if (err) console.error(err);
    else console.log("----------新增lang.ts成功-------------");
  }
);