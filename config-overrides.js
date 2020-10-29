const { override, fixBabelImports, addLessLoader } = require("customize-cra");

const supportMjs = () => (webpackConfig) => {
    webpackConfig.module.rules.push({
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
    });
    return webpackConfig;
};

module.exports = override(
    fixBabelImports("import", {
        libraryName: "antd",
        libraryDirectory: "es",
        style: true
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {
            "@font-size-base": "12px"
        }
    }),
    supportMjs()
);
