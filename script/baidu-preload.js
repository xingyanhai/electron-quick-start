// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const path = require('path')
const os = require('os')
const fs = require('fs'); // 引入fs模块
const electron = require('electron')
const { ipcRenderer } = require('electron')
const{makeDir} = require('./util')
const http = require("http"); 
window.addEventListener('DOMContentLoaded', () => {
});
// 生产pdf的浏览器
let browser
// pdf 文件产出路径
const outputDir = '/xyh-out-put/baidu'



window.onload = async ()=>{
  console.log('baidu-preload.js')
  let search = '美女';
  getSearchData(search)
};

async function getSearchData (search) {
  let url = `http://image.baidu.com/search/acjson?tn=resultjson_com&ipn=rj&ct=201326592&is=&fp=result&queryWord=${search}&cl=2&lm=-1&ie=utf-8&oe=utf-8&adpicid=&st=&z=&ic=&word=%E5%A4%B4%E5%83%8F&s=&se=&tab=&width=&height=&face=&istype=&qc=&nc=&fr=&cg=head&pn=60&rn=30&gsm=3c&1505874585547=`;
  // let res1 = await fetch(url);
  console.log('----res')
  http.request()
}

async function timeOut(t) {
  return new Promise((resolve)=>{
    setTimeout(()=>{
      resolve();
    },t)
  })
}

// 获取文件夹所有文件名
function getDirFile (dir) {
  return new Promise((resolve)=>{
    fs.readdir(dir, function(err, files) {
      resolve(files)
    })
  })
}

ipcRenderer.on('main-to-win-msg',(e,data)=>{
  console.log(`====main-to-win-msg===`);
  console.log(data);
})

ipcRenderer.send('baidu-preloadjs-msg', '哈哈')



