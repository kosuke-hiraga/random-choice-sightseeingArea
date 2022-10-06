module.exports = {
    //     "presets": [
    //         [
    //             "@babel/preset-env",
    //             {
    //                 "targets": {
    //                     "node": true
    //                 }
    //             }
    //         ],
    //         "@babel/preset-typescript"
    //     ],
    //     "env": {
    //         "test": {
    //             "presets": [
    //                 [
    //                     "@babel/preset-env",
    //                     {
    //                         "targets": {
    //                             "node": "current"
    //                         }
    //                     }
    //                 ]
    //                 //                 "@babel/preset-typescript"
    //             ]
    //         }
    //     }
    // }
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