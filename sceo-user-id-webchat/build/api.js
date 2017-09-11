const fs = require('fs')
const path = require('path')
const url = require('url')

const httpType = ['get', 'post', 'put', 'delete']

const apiAll = JSON.parse(require('../config/api.json').modelJSON)

const root = 'src' + path.sep + 'api' + path.sep

// 遍历模块
apiAll.moduleList.forEach((itemModel, i) => {
  // 继续遍历page
  itemModel.pageList.forEach((itemPage,j) => {
    // 继续遍历action
    itemPage.actionList.forEach((itemAction,k) => {
      // 获取Url，并实例化
      let requestUrl = url.parse(itemAction.requestUrl)
      // 获取url中的路径
      let pathName = decodeURI(requestUrl.pathname).replace(/\//g, path.sep)
      // 并已成对应的路径名和文件名
      let dist = pathName.substring(0, pathName.lastIndexOf(path.sep) + 1)
      let actionName = pathName.substring(pathName.lastIndexOf(path.sep) + 1)
      let fileDist = root + apiAll.name + dist + actionName + '-' + httpType[parseInt(itemAction.requestType) - 1] + '.json'
      // 创建路径
      if (mkdirsSync(root + apiAll.name + dist)) {
        // 创建文件
        fs.writeFile(fileDist , JSON.stringify(itemAction, null, 2), err => {
            if (err) {
              cosnole.log(err)
            }
          }
        )
      }
    })
  })
})

//创建多层文件夹 同步
function mkdirsSync(dirpath, mode) { 
  if (!fs.existsSync(dirpath)) {
    var pathtmp
    dirpath.split(path.sep).forEach(function(dirname) {
      if (pathtmp) {
        pathtmp = path.join(pathtmp, dirname)
      }
      else {
        pathtmp = dirname
      }
      if (!fs.existsSync(pathtmp)) {
        if (!fs.mkdirSync(pathtmp, mode)) {
          return false
        }
      }
    })
  }
  return true
}

