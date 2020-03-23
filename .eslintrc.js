module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    extends: [
        'airbnb-base',
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    rules: {
        "prettier/prettier": "error",
        "camelcase": "off",
        "no-param-reassign": "off",
        "no-unused-vars": ["error", { argsIgnorePattern: "next" }],
        "jest/no-disabled-tests": "warn",
        "jest/no-focused-tests": "error",
        "jest/no-identical-title": "error",
        "jest/prefer-to-have-length": "warn",
        "jest/valid-expect": "error"
    },
    extends: ["airbnb-base", "prettier", "plugin:jest/recommended"],
    plugins: ["prettier", "jest"]
};
