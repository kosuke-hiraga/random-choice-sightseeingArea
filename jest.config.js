const esmPackages = [
    "firebase",
    "@firebase"
];

module.exports = {
    verbose: true,
    testMatch: [
        "/**/*.test.js",
        // "**/test/**/*.test.js",
        // "**/*.test.jsx"
    ],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
        '^.+\\.(js|jsx)$': 'babel-jest'
    },
    testEnvironment: 'node',
    // preset: "ts-jest"
    // preset: "ts-jest/presets/js-with-ts"
    preset: "ts-jest/presets/js-with-babel",
    setupFiles: ["./jest.setup.js"],
    "moduleNameMapper": {
        "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/test/__mocks__/fileMock.js",
        "\\.(css|scss)$": "<rootDir>/test/__mocks__/styleMock.js",
    },
    transformIgnorePatterns: [
        // esmが使われているパッケージを除いてIgnoreする
        `node_modules/(?!(${esmPackages.join("|")})/)`,
    ],
};