import * as config from './config'
import axios from 'axios'

export default {
  // 教育经历查询
  queryEducate ({userId}) {
    return axios.get(config.ID_SYS_HOST + 'user/edu/' + userId)
  },
   // 删除教育经历
  deleteEducate ({id}) {
    return axios.delete(config.ID_SYS_HOST + 'user/edu/' + id)
  },
  /* // 批量新增教育经历
  saveEducate ({lists}) {
    return axios.post(config.ID_SYS_HOST + 'user/edu', lists)
  },
  // 批量修改教育经历
  editEducate ({lists}) {
    return axios.put(config.ID_SYS_HOST + 'user/edu', lists)
  }, */
  // 批量操作教育经历
  updateEducate ({lists}) {
    return axios.put(config.ID_SYS_HOST + 'user/education', lists)
  },
  // 工作经历查询
  queryJob ({userId}) {
    return axios.get(config.ID_SYS_HOST + 'user/work/' + userId)
  },
   // 删除工作经历
  deleteJob ({id}) {
    return axios.delete(config.ID_SYS_HOST + 'user/work/' + id)
  },
   // 批量操作工作经历
  updateJob ({lists}) {
    return axios.put(config.ID_SYS_HOST + 'user/working', lists)
  },
  /* // 批量新增工作经历
  saveJob ({lists}) {
    return axios.post(config.ID_SYS_HOST + 'user/work', lists)
  },
  // 批量修改工作经历
  editJob ({lists}) {
    return axios.put(config.ID_SYS_HOST + 'user/work', lists)
  }, */
  // 培训经历查询
  queryTrain ({userId}) {
    return axios.get(config.ID_SYS_HOST + 'user/train/' + userId)
  },
  // 删除培训经历
  deleteTrain ({id}) {
    return axios.delete(config.ID_SYS_HOST + 'user/train/' + id)
  },
   // 批量操作培训经历
  updateTrain ({lists}) {
    return axios.put(config.ID_SYS_HOST + 'user/training', lists)
  },
  /* // 批量新增培训经历
  saveTrain ({lists}) {
    return axios.post(config.ID_SYS_HOST + 'user/train', lists)
  },
  // 批量修改培训经历
  editTrain ({lists}) {
    return axios.put(config.ID_SYS_HOST + 'user/train', lists)
  }, */
  // 信息查询
  queryBasic ({userId}) {
    return axios.get(config.ID_SYS_HOST + 'user/' + userId)
  },
  // 基础信息更新
  updateBasic ({lists}) {
    return axios.put(config.ID_SYS_HOST + 'user/basic', lists)
  },
  // 详细信息更新
  updateDetail ({lists}) {
    return axios.put(config.ID_SYS_HOST + 'user/detail', lists)
  },
  // 国家查询 ,省,民族查询
  queryCountry ({code}) {
    return axios.get(config.COMMON_HOST + 'dict/code/' + code)
  },
  // 市,区查询
  queryPro ({id}) {
    return axios.get(config.COMMON_HOST + 'dict/childs/' + id)
  },
  // 根据id查询上级
  queryFath ({id}) {
    return axios.get(config.COMMON_HOST + 'dict/parent_sort/' + id)
  },
  // 根据id查询本级
  queryMy ({id}) {
    return axios.get(config.COMMON_HOST + 'dict/' + id)
  },
  // 获取用户头像
  getAvatar () {
    const promise = new Promise((resolve, reject) => {
      axios.get(config.ID_SYS_HOST + '/user/media').then(data => {
        if (data.system) {
          data.system.forEach((item, index) => {
            item.path = config.FILE_SYS_HOST + item.path
          })
        }
        if (data.used) {
          data.used.forEach((item, index) => {
            item.path = config.FILE_SYS_HOST + item.path
          })
        }
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
    return promise
  },
  // 头像上传
  uploadAvatar (blobData) {
    const promise = new Promise((resolve, reject) => {
      let form = new FormData()
      form.append('file', blobData, 'avater_' + new Date().getTime() + '.png')
      axios.post(config.ID_SYS_HOST + 'user/upload', form).then(data => {
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
    return promise
  },
  // 删除头像
  deleteAvatar (id) {
    return axios.delete(config.ID_SYS_HOST + 'user/media/' + id)
  },
  // 保存头像
  saveAvatar (id) {
    return axios.post(config.ID_SYS_HOST + 'user/media/' + id)
  }
}
