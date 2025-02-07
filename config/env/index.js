import fs from 'fs';
import path from 'path';
import process from 'process';


// 设置文件路径
const rootDir = path.resolve();
const envType = process.argv[2].split('=')[1].split(' ')[0]
const filePath = path.join(rootDir, 'config/env', `.env.${envType}`);
const localFilePath = path.join(rootDir, '.env');

// 读取选中的环境文件内容
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error(`读取 .env.${envType} 文件失败:`, err);
    return;
  }

  // 将内容写入 .env.local 文件
  fs.writeFile(localFilePath, data, 'utf8', (err) => {
    if (err) {
      console.error('写入 .env 文件失败:', err);
    } else {
      console.log(`.env.${envType} -> .env`);
    }
  });
});
