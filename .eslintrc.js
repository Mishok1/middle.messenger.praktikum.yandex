export default {
    extends: ['airbnb', 'airbnb/hooks'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint'],
    rules: {
        indent: ['error', 4], // 2 пробел
        'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
        'import/no-extraneous-dependencies': [
            'error',
            {
                devDependencies: [
                    'vite.config.js',
                    'vite.config.ts',
                    '**/*.test.js',
                    '**/*.test.ts',
                    '**/*.spec.js',
                    '**/*.spec.ts'
                ],
            },
        ],
    },
};
