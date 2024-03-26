export const isPhone = val => {
  return /^[0-9]*$/.test(val)
}


export const isEmail = val => {
  return /^[a-zA-Z0-9\+_\.-]+@[a-zA-Z0-9\+_\.-]+(\.[a-zA-Z0-9\+_\.-]+)+$/.test(val) // eslint-disable-line
}

export const isPasswords = val => {
  return val && /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?\W).{10,}$/.test(val)
}

export const isIdcard = val => {
  return /^(\d{18,18}|\d{15,15}|\d{17,17}(X|x))$/.test(val)
}

// 简单ip
// export const isIp = val => {
//     return /^[\d,.]*$/.test(val);
// }

// 标准ip
export const isIp = val => {
  return /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/.test(val)
}

// 标准身份证号码
export function testid(id) {
  // 1 "验证通过!", 0 //校验不通过
  let format = /^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}(([1][9]\d{2})|([2]\d{3}))(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))\d{3}[0-9xX]$/
  // 号码规则校验
  if (!format.test(id)) {
    return false
  }
  // 区位码校验
  // 出生年月日校验   前正则限制起始年份为1900;
  let year = id.substr(6, 4), // 身份证年
    month = id.substr(10, 2), // 身份证月
    date = id.substr(12, 2), // 身份证日
    time = Date.parse(month + '-' + date + '-' + year), // 身份证日期时间戳date
    now_time = Date.parse(new Date()), // 当前时间戳
    dates = new Date(year, month, 0).getDate() // 身份证当月天数
  if (time > now_time || date > dates) {
    return false
  }
  // 校验码判断
  let c = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2) // 系数
  let b = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2') // 校验码对照表
  let id_array = id.split('')
  let sum = 0
  for (let k = 0; k < 17; k++) {
    sum += parseInt(id_array[k]) * parseInt(c[k])
  }
  if (id_array[17].toUpperCase() != b[sum % 11].toUpperCase()) {
    return false
  }
  return true
}

export const isInviteCode = val => {
  let result = /^[a-z0-9]{6}$/.test(val)
  if (!result) {
    result = /^a_[a-zA-Z0-9]{4}$/.test(val) // a_aAa1 分销邀请码 a_开头 后面跟四位 用来区别于原来的老的好友邀请码
  }
  return result
}