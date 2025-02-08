export const lang = {
  "zh-CN": {
  common: {
  age: '时间',
  time: '时间',
  hours: '时',
  minutes: '分',
  seconds: '秒',
  h: '时',
  m: '分',
  s: '秒',
  d: '日',
  date: '日期',
  aFewSecondsAgo: '几秒前',
  halfAMinuteAgo: '半分钟前',
  aMinuteAgo: '一分钟前',
  nMinutesAgo: (minutes: string | number) => `${minutes}分钟前`,
  aHourAgo: '一小时前',
  nHoursAgo: (hours: string | number) => `${hours}小时前`,
  aDayAgo: '一天前',
  nDaysAgo: (days: string | number) => `${days}天前`,
  cancel: '取消',
  back: '返回',
  noData: '无数据',
  state: '状态',
  status: '状态',
  details: '详情',
  operation: '操作',
  action: '操作',
  failed: '失败',
  completed: '已完成',
  inProgress: '进行中',
  max: '最大',
  min: '最小',
  confirm: '确认',
  allRightsReserved: '，版权所有',
  type: '类型',
  website: '网站',
  x: 'X(Twitter)',
  telegram: 'Telegram',
  more: '更多',
  change: '更改',
  search: '搜索',
  results: '结果',
  suggestions: '建议',
  home: '首页',
  step: '步骤',
  filter: '过滤',
  sort: '排序',
  asc: '升序',
  desc: '降序',
  upload: '上传',
  view: '查看'
},
  tip: {
  enter: (label: string | number) => `请输入${label}`,
  type: (label: string | number, type: string | number) => `${label}必须为${type}`,
  maxCharacters: (max: string | number) => `上限${max}字符`,
  minCharacters: (min: string | number) => `下限${min}字符`,
  positive: (label: string | number) => `$${label}必须是正数`,
  integer: (label: string | number) => `$${label}必须是整数`,
  networkError: '网络错误',
  unauthorized: '未认证',
  requestUrl404: '请求路径不存在',
  tooManyRequests: '请求次数过多',
  serverError: '服务器错误，请稍后再试',
  returnHome: '返回首页',
  copySuccessful: '复制成功',
  connect: '请连接钱包',
  disconnectionSuccessful: '已断开钱包',
  wrongNetwork: '网络错误',
  switchNetwork: '请切换到正确的网络',
  nameRule: '名称只能由字母、数字和空格组成，且空格不能在首尾两端',
  symbolRule: '符号只能由字母和数字组成',
  urlRule: '请输入正确的URL',
  dragFile: '拖动并放下文件或点击上传',
  fileSize: '推荐大小: 350 x350.',
  fileType: '文件格式: JPG, GIF, JPEG, PNG, SVG , WEBP.',
  uploadFailed: '上传失败',
  uploadIcon: '请上传代币图标',
  enterDesc: '请添加描述',
  insufficientBalance: '余额不足',
  insufficientPoolBalance: '池内余额不足，点击存款',
  depositing: '存款中',
  depositSuccessfully: '存款成功',
  withdrawing: '取款中',
  withdrawSuccessfully: '取款成功',
  deploying: '部署中',
  deploySuccessfully: '部署成功',
  pending: '执行中',
  successfully: '成功执行',
  noFound: (keyword: string | number) => `未检索到匹配“${keyword}”的数据`,
  rightKeywords: '确保所有单词拼写正确。',
  diffKeywords: '尝试不同的关键词。',
  moreKeywords: '尝试更多的通用关键词。',
  noPage: '对不起，找不到您搜索的页面。',
  nothingMore: '无更多数据了',
  noData: '无数据',
  maxFileSize: '此文件最大'
},
  account: {
  connect: '连接钱包',
  connectWallet: '连接钱包',
  disconnect: '断开连接',
  wrongNetwork: '网络错误',
  switchNetwork: '切换网络',
  verify: '验证',
  balance: '余额',
  copyAddress: '复制地址'
},
  token: {
  token: '代币',
  symbol: '符号',
  name: '名称',
  contract: '合约',
  amount: '数量',
  decimals: '精度',
  supply: '供应量',
  totalSupply: '总供应量',
  totalCurrency: (symbol: string | number) => `总${symbol}`
},
  market: {
  marketCap: '市值',
  volume: '交易量',
  buy: '购买',
  sell: '出售',
  swap: '兑换',
  trx: '交易',
  transaction: '交易',
  holders: '持有者数',
  value: '价值',
  price: '价格',
  listing: '待上架',
  listed: '已上架'
},
  feat: {
  
}
},
  "en": {
  common: {
  age: 'Age',
  time: 'Time',
  hours: 'Hours',
  minutes: 'Minutes',
  seconds: 'Seconds',
  h: 'H',
  m: 'M',
  s: 'S',
  d: 'D',
  date: 'Date',
  aFewSecondsAgo: 'a few seconds ago',
  halfAMinuteAgo: 'half a minute ago',
  aMinuteAgo: 'a minute ago',
  nMinutesAgo: (minutes: string | number) => `${minutes} minutes ago`,
  aHourAgo: 'a hour ago',
  nHoursAgo: (hours: string | number) => `${hours} hours ago`,
  aDayAgo: 'a day ago',
  nDaysAgo: (days: string | number) => `${days} days ago`,
  cancel: 'Cancel',
  back: 'Back',
  noData: 'No data',
  state: 'State',
  status: 'Status',
  details: 'Details',
  operation: 'Operation',
  action: 'Action',
  failed: 'Failed',
  completed: 'Completed',
  inProgress: 'In progress',
  max: 'Max',
  min: 'Min',
  confirm: 'Confirm',
  allRightsReserved: ', all rights reserved',
  type: 'Type',
  website: 'Website',
  x: 'X(Twitter)',
  telegram: 'Telegram',
  more: 'More',
  change: 'Change ',
  search: 'Search ',
  results: 'Results',
  suggestions: 'Suggestions',
  home: 'Home',
  step: 'Step',
  filter: 'Filter',
  sort: 'Sort',
  asc: 'Asc',
  desc: 'Desc',
  upload: 'Upload',
  view: 'View'
},
  tip: {
  enter: (label: string | number) => `Please enter ${label}`,
  type: (label: string | number, type: string | number) => `The ${label} must be a ${type}`,
  maxCharacters: (max: string | number) => `A maximum limit of ${max} characters`,
  minCharacters: (min: string | number) => `A minimum limit of ${min} characters`,
  positive: (label: string | number) => `${label} must be a positive number`,
  integer: (label: string | number) => `${label} must be an integer`,
  networkError: 'Network Error',
  unauthorized: 'Unauthorized',
  requestUrl404: 'Request url does not exist',
  tooManyRequests: 'Too many requests, please wait, refresh and try again',
  serverError: 'There is a problem with the server, please try again later',
  returnHome: 'Return Home',
  copySuccessful: 'Copy Successful',
  connect: 'Please connect your wallet first',
  disconnectionSuccessful: 'Disconnection Successful',
  wrongNetwork: 'Wrong Network',
  switchNetwork: 'Please switch to the correct network',
  nameRule: 'The name can contain only letters, numbers, and spaces, with spaces allowed only between characters',
  symbolRule: 'The symbol can only contain letters and numbers',
  urlRule: 'Please enter the correct URL',
  dragFile: 'Drag and drop or click to upload',
  fileSize: 'Recommended size: 350 x350.',
  fileType: 'File types: JPG, GIF, JPEG, PNG, SVG , WEBP.',
  uploadFailed: 'Upload Failed',
  uploadIcon: 'Please upload token icon',
  enterDesc: 'Please enter description',
  insufficientBalance: 'Insufficient balance',
  insufficientPoolBalance: 'Insufficient pool balance, click here to deposit.',
  depositing: 'Depositing...',
  depositSuccessfully: 'Deposit Successfully',
  withdrawing: 'Withdrawing...',
  withdrawSuccessfully: 'Withdraw Successfully',
  deploying: 'Deploying...',
  deploySuccessfully: 'Deploy Successfully',
  pending: 'Pending...',
  successfully: 'Successfully',
  noFound: (keyword: string | number) => `No data matching "${keyword}" found.`,
  rightKeywords: 'Make sure all words are spelled correctly.',
  diffKeywords: 'Try different keywords.',
  moreKeywords: 'Try more general keywords.',
  noPage: 'Sorry, the page you are looking for could not be found.',
  nothingMore: 'It is all, nothing more.',
  noData: 'No data',
  maxFileSize: 'The maximum file size is '
},
  account: {
  connect: 'Connect',
  connectWallet: 'Connect Wallet',
  disconnect: 'Disconnect',
  wrongNetwork: 'Wrong Network',
  switchNetwork: 'Switch Network',
  verify: 'Verify',
  balance: 'Balance',
  copyAddress: 'Copy Address'
},
  token: {
  token: 'Token',
  symbol: 'Symbol',
  name: 'Name',
  contract: 'Contract',
  amount: 'Amount',
  decimals: 'Decimals',
  supply: 'Supply',
  totalSupply: 'Total Supply',
  totalCurrency: (symbol: string | number) => `Total ${symbol}`
},
  market: {
  marketCap: 'Market Cap',
  volume: 'Volume',
  buy: 'Buy',
  sell: 'Sell',
  swap: 'Swap',
  trx: 'Trx',
  transaction: 'Transaction',
  holders: 'Holders',
  value: 'Value',
  price: 'Price',
  listing: 'Listing',
  listed: 'Listed'
},
  feat: {
  
}
}
};