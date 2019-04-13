const {
    override,
    addBabelPlugin,
    fixBabelImports,
    disableEsLint,
    addWebpackAlias,
} = require('customize-cra');
const path = require("path");

module.exports = override(
    addBabelPlugin('@babel/plugin-proposal-optional-chaining'),
    fixBabelImports('antd', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',
    }),
    disableEsLint(),
    addWebpackAlias({
        ["@com"]: path.resolve(__dirname, "src/components/"),
        ["@api"]: path.resolve(__dirname, "src/api/"),
        ["@util"]: path.resolve(__dirname, "src/util/"),
        ["@config"]: path.resolve(__dirname, "src/config/"),
        ["@http$"]: path.resolve(__dirname, "src/util/http.js"),
        ["@history$"]: path.resolve(__dirname, "src/util/history.js"),
        ["@view"]: path.resolve(__dirname, "src/view/"),
        ["@store"]: path.resolve(__dirname, "src/store/"),
        ["@action"]: path.resolve(__dirname, "src/store/action/"),
        ["@assets"]: path.resolve(__dirname, "src/assets/"),
        ["@scss"]: path.resolve(__dirname, "src/scss/"),
        ["@img"]: path.resolve(__dirname, "src/img/"),
    })
);
