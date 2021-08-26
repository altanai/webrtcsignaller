module.exports = {
    apps: [{
        name: "webrtcsignaller",
        script: 'webrtcsignaller.js',
        env: {
            NODE_ENV: "prod",
        },
        env_prod: {
            NODE_ENV: "prod",
        },
        env_dev: {
            "NODE_ENV": "dev"
        },
        watch: true,
        exec_mode: "cluster",
        instances: 1,
        args: "--ssl --port=8085"
    },
        {
            script: './service-worker/',
            watch: ['./service-worker']
        }
    ],

    deploy: {
        production: {
            user: 'SSH_USERNAME',
            host: 'SSH_HOSTMACHINE',
            ref: 'origin/master',
            repo: ' git@github.com:altanai/webrtcsignaller.git',
            path: '/home/ubuntu/webrtcsignaller',
            'pre-deploy-local': '',
            'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
            'pre-setup': ''
        }
    }
};
