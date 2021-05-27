module.exports = {
  apps: [{
    name: 'node-debug-test',
    script: './app.js',
    exec_mode: 'fork', // cluster
    instances: 1, // 最多进程，默认用CPU逻辑内核数，可以
    node_args: [ "--inspect=0.0.0.0:9229" ],
    ignore_wathc: [
      'node_modules'
    ],
    env: {
      NODE_ENV: 'production'
    }
  }]
}