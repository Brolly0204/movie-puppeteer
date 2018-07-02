const cluster = require('cluster');
const cpus = require('os').cpus();

let workers = [];

const masterProcess = () => {
  console.log(`一共有 ${cpus.length}个核`);
  console.log(`Master 主进程 ${process.pid} 启动`);

  for (let i = 0; i < cpus.length; i++) {
    const worker = cluster.fork(); // 衍生多个子进程
    workers.push(worker);
    // 主进程监听子进程发送的消息
    worker.on('message', message => {
      console.log(`主进程 ${process.pid} 收到 ${JSON.stringify(message)} 来自 ${worker.process.pid}的消息`);
    })
  }
  workers.forEach(worker => {
    // 主进程给子进程发送消息
    console.log(`主进程 ${process.pid} 发消息给子进程 ${worker.process.pid}`);
    worker.send({msg: `来自主进程的消息 ${process.pid}`});
  })
}

const childProcess = () => {
  // 子进程监听主进程发送的消息
  process.on('message', message => {
    console.log(`Worker 子进程 ${process.pid} 收到来自主进程的消息 ${JSON.stringify(message)}
`);
  });
  // 子进程给主进程发送消息
  console.log(`子进程 ${process.pid} 启动`);
  console.log(`子进程 ${process.pid} 给主进程发送消息`);
  process.send({msg: `来自子进程的消息 ${process.pid}`})
  // process.exit()
};

if (cluster.isMaster) {
  masterProcess()
} else {
  childProcess()
}