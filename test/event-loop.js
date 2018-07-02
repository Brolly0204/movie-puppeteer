const { readFile, readFileSync } = require('fs')
const { resolve } = require('path')

setImmediate(() => console.log('[阶段3.immediate] immediate 回调1')) // 11
setImmediate(() => console.log('[阶段3.immediate] immediate 回调2')) // 12
setImmediate(() => console.log('[阶段3.immediate] immediate 回调3')) // 13

Promise.resolve().then(() => {
  console.log('[...待切入下一阶段] promise 回调1') // 5

  setImmediate(() => console.log('[阶段3.immediate] promise 回调1 增加的 immediate 回调4')) // 14
})

readFile('../package.json', 'utf-8', data => {
  console.log('[阶段2...IO 回调] 读文件回调1') // 15

  readFile('../video.mp4', 'utf-8', data => {
    console.log('[阶段2...IO 回调] 读文件回调2') // 27

    setImmediate(() => console.log('[阶段3.immediate] 读文件回调2 增加的 immediate 回调4')) // 28
  })

  setImmediate(() => {
    console.log('[阶段3.immediate] immediate 回调5') // 17

    Promise.resolve().then(() => {
      console.log('[...待切入下一阶段] promise 回调2') // 22
      process.nextTick(() => console.log('[...待切入下一阶段] promise 回调2 增加的 nextTick 回调5')) // 24
    })
    .then(() => {
      console.log('[...待切入下一阶段] promise 回调3') // 23
    })
  })
  setImmediate(() => {
    console.log('[阶段3.immediate] immediate 回调6') // 18

    process.nextTick(() => console.log('[...待切入下一阶段] immediate 回调6 增加的 nextTick 回调7')) // 20
    console.log('[...待切入下一阶段] 这块正在同步阻塞的读一个大文件') // 19
    const video = readFileSync(resolve(__dirname, './video.mp4'), 'utf-8')
    process.nextTick(() => console.log('[...待切入下一阶段] immediate 回调6 增加的 nextTick 回调8')) // 21

    readFile('../package.json', 'utf-8', data => {
      console.log('[阶段2...IO 回调] 读文件回调3') // 29

      setImmediate(() => console.log('[阶段3.immediate] 读文件回调3 增加的 immediate 回调6')) // 30
      setTimeout(() => console.log('[阶段1....定时器] 读文件回调3 增加的定时器回调8'), 0) // 31
    })
  })

  process.nextTick(() => {
    console.log('[...待切入下一阶段] 读文件回调1 增加的 nextTick 回调6') // 16
  })

  setTimeout(() => console.log('[阶段1....定时器] 定时器 回调5'), 0) // 25
  setTimeout(() => console.log('[阶段1....定时器] 定时器 回调6'), 0) // 26
})

setTimeout(() => console.log('[阶段1....定时器] 定时器 回调1'), 0) // 6
setTimeout(() => {
  console.log('[阶段1....定时器] 定时器 回调2') // 7

  process.nextTick(() => {
    console.log('[...待切入下一阶段] nextTick 回调5') // 10
  })
})
setTimeout(() => console.log('[阶段1....定时器] 定时器 回调3'), 0) // 8
setTimeout(() => console.log('[阶段1....定时器] 定时器 回调4'), 0) // 9

process.nextTick(() => console.log('[...待切入下一阶段] nextTick 回调1')) // 1
process.nextTick(() => {
  console.log('[...待切入下一阶段] nextTick 回调2') // 2
  process.nextTick(() => console.log('[...待切入下一阶段] nextTick 回调4')) // 4
})
process.nextTick(() => console.log('[...待切入下一阶段] nextTick 回调3')) // 3
