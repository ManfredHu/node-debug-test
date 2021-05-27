var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length / 2;

console.log(`this is ${process.pid}`)

if (cluster.isMaster) {
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // 此事件不会在工作进程中触发。会看到主进程收到了工作进程监听3000端口的信息
  cluster.on('listening', function (worker, address) {
    console.log('[master] ' + 'listening: worker' + worker.id + ',pid:' + worker.process.pid + ', Address:' + address.address + ":" + address.port);
  });

  Object.keys(cluster.workers).forEach(function (id) {
    // 注释1
    cluster.workers[id].on('message', function (msg) {
      console.log('[master] ' + 'message ' + msg);
      cluster.workers[id].send('[master] ' + 'hi worker' + process.pid);
    });
  });

} else if (cluster.isWorker) {
  // 往父进程发送消息，在 注释1处被接收
  process.send('[worker] worker' + process.pid + ' received!');
  process.on('message', function (msg) {
    console.log('[worker] ' + msg);
  });

  http.createServer(function (req, res) {
    res.writeHead(200, {
      "content-type": "text/html"
    });
    res.end('worker' + cluster.worker.id + ',PID:' + process.pid);
  }).listen(3000, () => {
    console.log(`子进程 ${process.pid} 监听端口成功`)
  });
}