module.exports = {
    moduleDirectories: ["node_modules"],
    coverageDirectory: "coverage",
    testEnvironment: "node",
    transform: {
        ".(js|jsx|ts|tsx)": "@sucrase/jest-plugin",
    },
    verbose: true,
};
