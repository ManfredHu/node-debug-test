# pm2启动多进程服务

## start
```bash
pm2 start pm2.config.js
```

## stop
```bash
pm2 kill
```

## pm2配置
instance 为实例数，默认为CPU逻辑内核数目
可以通过以下命令确定核心数

```bash
# linux
# 查看物理CPU个数
cat /proc/cpuinfo| grep "physical id"| sort| uniq| wc -l
# 查看每个物理CPU中core的个数(即核数)
cat /proc/cpuinfo| grep "cpu cores"| uniq
```

```bash
# macos
sysctl machdep.cpu | grep machdep.cpu.thread_count # mac超线程，一般为双倍逻辑核数
```

# node cluster启动多进程
## 按照cps核数启动多个工作进程worker

```
const numCPUs = require('os').cpus().length / 2; // 这里是因为mac cpu超频了，默认double逻辑核心数
```

## isMater
一个属性，标识进程是主/子进程，执行逻辑大概是这样的：主进程isMater是true，fork了多个子进程，程序执行结束。
子进程生成后继续执行，但是isMaster为false，进入下面逻辑，创建server并监听8000端口

每个请求只会被分配到一个worker执行，哪个worker被分配是随机的