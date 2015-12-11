module.exports = {
    dev: {
        options: {
            files: [
                '<%= config.dist.root %>**/*'
            ],
            server: {
                baseDir: "dist"
            },
            watchTask: true
        }
    }
};
