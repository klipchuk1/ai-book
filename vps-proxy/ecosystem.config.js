module.exports = {
  apps: [{
    name: 'gemini-proxy',
    script: 'server.js',
    env: {
      NODE_OPTIONS: '--dns-result-order=ipv4first',
    },
    instances: 1,
    autorestart: true,
    max_memory_restart: '200M',
  }]
};
