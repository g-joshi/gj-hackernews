require('@babel/register')({
    ignore: [/(node_modules)/],
    "env": {
        "development": {
            "plugins": [
                [
                    "babel-plugin-styled-components", {
                        "ssr": true,
                        "displayName": false,
                        "fileName": false
                    }
                ]
            ]
        },
        "production": {
            "plugins": [
                [
                    "babel-plugin-styled-components", {
                        "ssr": true,
                        "displayName": false,
                        "fileName": false
                    }
                ]
            ]
        }
    },
    plugins: [
        [
            "babel-plugin-styled-components", {
                "ssr": true,
                "displayName": false,
                "fileName": false
            }
        ],
        "@babel/plugin-transform-runtime",
        "@babel/plugin-syntax-dynamic-import"
    ],
    presets: [
        "@babel/preset-env",
        "@babel/preset-react"
    ]
});
require('./server');

