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
