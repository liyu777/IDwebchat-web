const patterns = {
  account: /^[A-Za-z0-9_]*$/,
  ip: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/,
  email: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
  date: /^\d{4}-(0?[1-9]|1[0-2])-(0?[1-9]|[1-2]\d|3[0-1])$/,
  phone: /^1[3|4|5|7|8][0-9]{9}$/
}

export default (str, pat) => {
  const thePat = patterns[pat]
  return thePat.test(str)
}
// 验证密码，公共方法
export const validatePassword = (password) => {
  // 验证结果
  const result = {
    length: null,
    format: null,
    complexity: null
  }
  // 长度验证,6~20
  if (password.length < 6 || password.length > 20) {
    result.length = {
      result: false,
      message: '密码长度必须介于6~20之间'
    }
  } else {
    result.length = {
      result: true
    }
  }
  // 格式验证，不含空格的字符
  if (/^[^ ]+$/.test(password)) {
    result.format = {
      result: true
    }
  } else {
    result.format = {
      result: false,
      message: '密码不能含有空格'
    }
  }
  // 验证密码复杂度
  let hasNumber = false
  let hasLetterLow = false
  let hasLetterUp = false
  let hasMark = false
  // 记录密码复杂度
  let count = 0
  if (/\d/.test(password)) {
    hasNumber = true
    count++
  }
  if (/[a-z]/.test(password)) {
    hasLetterLow = true
    count++
  }
  if (/[A-Z]/.test(password)) {
    hasLetterUp = true
    count++
  }
  if (/\W/g.test(password) && /^[^ ]+$/.test(password)) {
    hasMark = true
    count++
  }
  // 字母，数字，符号有其中两种，验证通过
  if (hasNumber && (hasLetterLow || hasLetterUp) ||
      hasNumber && hasMark ||
      hasMark && (hasLetterLow || hasLetterUp)) {
    result.complexity = {
      result: true,
      count
    }
  } else {
    result.complexity = {
      result: false,
      count,
      message: '字母，数字，标点符号至少包含两种'
    }
  }
  return result
}
