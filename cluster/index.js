const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length / 2;

console.log(`index exec`)
if (cluster.isMaster) {
  console.log(`主进程 ${process.pid} 正在运行`);

  // 衍生工作进程。
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`cluster exit`, worker, code, signal)
    console.log(`工作进程 ${worker.process.pid} 已退出`);
  });
} else {
  console.log(`enter else`);
  // 工作进程可以共享任何 TCP 连接。
  // 在本例子中，共享的是 HTTP 服务器。
  http.createServer((req, res) => {
    console.log(`这是子进程 ${process.pid}, 我接收了请求处理并返回`)
    res.setHeader('Content-Type', 'application/json; charset=utf-8') // 这里不设置编码会乱
    res.writeHead(200);
    res.end('你好世界\n');
  }).listen(8000);

  console.log(`工作进程 ${process.pid} 已启动`);
}