module.exports = {
    apps: [{
        name: "signaller",
        script: 'server.js',
        env: {
            NODE_ENV: "development",
        },
        env_production: {
            NODE_ENV: "production",
        },
        watch: true,
        exec_mode: "cluster",
        instances: 1,
        args: "--ssl --port=8085"
    }
        // {
        //   script: './service-worker/',
        //   watch: ['./service-worker']
        // }
    ],

    deploy: {
        production: {
            user: 'SSH_USERNAME',
            host: 'SSH_HOSTMACHINE',
            ref: 'origin/master',
            repo: ' git@github.com:altanai/webrtcsignaller.git',
            path: 'DESTINATION_PATH',
            'pre-deploy-local': '',
            'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
            'pre-setup': ''
        }
    }
};
