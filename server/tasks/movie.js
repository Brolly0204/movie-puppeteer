const cp = require('child_process')
const { resolve } = require('path')

;(async () => {
  // 执行脚本路径
  const scriptPath = resolve(__dirname, '../crawler/trailer-list')
  const child = cp.fork(scriptPath, [])
  let invoked = false

  child.on('error', err => {
    if (invoked) return
    invoked = true
    console.log(err)
  })

  child.on('exit', code => {
    if (invoked) return
    invoked = false
    let err = code === 0 ? null : new Error('exit code ' + code)
    console.log(err)
  })

  child.on('message', data => {
    let { result } = data
    console.log(result)
  })
})()
