/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

// ESLint configuration
// http://eslint.org/docs/user-guide/configuring
module.exports = {
    parser: 'babel-eslint',

    extends: [
        'airbnb',
        'prettier',
        'prettier/react',
    ],

    plugins: ['prettier', "react-hooks"],

    env: {
        browser: true,
    },

    rules: {
        "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
        "react-hooks/exhaustive-deps": "off", // Checks effect dependencies
        'import/no-extraneous-dependencies': ['error', { packageDir: '.' }],

        "no-unused-expressions": "off",
        'no-console': [
            'error',
            {
                allow: ['warn', 'error', 'info'],
            },
        ],

        'no-underscore-dangle': [
            'error',
            {
                allow: ['__typename'],
            },
        ],

        'prefer-destructuring': [
            'error',
            {
                VariableDeclarator: {
                    array: false,
                    object: true,
                },
                AssignmentExpression: {
                    array: false,
                    object: false,
                },
            },
            {
                enforceForRenamedProperties: false,
            },
        ],

        'jsx-a11y/anchor-is-valid': [
            'error',
            {
                components: ['Link'],
                specialLink: ['to'],
                aspects: ['noHref', 'invalidHref', 'preferButton'],
            },
        ],

        // Allow .js files to use JSX syntax
        'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],

        // Functional and class components are equivalent from React’s point of view
        'react/prefer-stateless-function': 'off',

        'react/forbid-prop-types': 'off',

        // ESLint plugin for prettier formatting
        "prettier/prettier": ["error", { "singleQuote": true, trailingComma: 'all' }]
    },
};
