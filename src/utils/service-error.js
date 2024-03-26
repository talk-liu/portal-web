export default function(v) {
  if (v && v.errors[0] && v.errors[0].originErr && v.errors[0].originErr.error && v.errors[0].originErr.error.message) {
    return v.errors[0].originErr.error.message
  } else if (v && v.errors[0] && v.errors[0].message) {
    // 包含了 isAuth = false 的 error返回
    return v.errors[0].message
  } else {
    return 'Unknown Error'
  }
}
