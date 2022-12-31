module.exports = {
    env: {
        test: {
            presets: [
                "@babel/preset-env",
                "@babel/preset-react"
            ],
            targets: {
                node: "current"
            }
        }
    }
}