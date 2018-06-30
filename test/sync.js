const doSync = (sth, time) => new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log(`${sth} 用了 ${time} 毫秒`);
    resolve()
  }, time)
})

const doAsync = (sth, time, cb) => {
  setTimeout(() => {
    console.log(`${sth} 用了 ${time} 毫秒`);
    cb && cb(sth)
  }, time)
}

const doElse = (sth) => {
  console.log(sth);
}
const Scott = { doSync, doAsync }
const Meizi = { doSync, doAsync, doElse}

;(async () => {
  console.log('case 1: 妹子到了门口');
  await Scott.doSync('Scott 刷牙', 1000);
  console.log('一直啥也没干');
  await Meizi.doSync('妹子洗澡', 2000);
  Meizi.doElse('Meizi 去忙别的')

  console.log('case 3: 妹子来到门口按下通知开关');
  Scott.doAsync('Scott 刷牙', 1000, () => {
    console.log('通知妹子来洗澡');
    Meizi.doAsync('妹子洗澡', 2000)
  })
  Meizi.doElse('妹子去忙别的了')
})()
