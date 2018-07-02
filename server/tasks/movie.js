const cp = require('child_process')
const { resolve } = require('path')

;(async () => {
  // 要在子进程中运行的模块
  const scriptPath = resolve(__dirname, '../crawler/trailer-list')
  const child = cp.fork(scriptPath, [])
  let invoked = false

  child.on('error', err => {
    if (invoked) return
    invoked = true
    console.log('error', err)
  })

  child.on('exit', code => {
    if (invoked) return
    invoked = true
    let err = code === 0 ? null : new Error('exit code ' + code)
    console.log('exit', err)
  })

  // 监听子进程发送的消息
  child.on('message', data => {
    console.log(data);
    // 向子进程发送消息
    child.send('child: 我收到了')
  })
})()
