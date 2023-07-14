module.exports = {
  root: true,
  env: {
    node: true,
  },
  parserOptions: {
      "ecmaVersion": 12,
      "sourceType": "module"
   },
  extends: ["plugin:vue/base"],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
  rules: {
      "sort-imports": ["error", {
        "ignoreCase": true,
        "ignoreDeclarationSort": false,
        "ignoreMemberSort": false,
        "memberSyntaxSortOrder": ["all", "single", "none", "multiple"],
        "allowSeparatedGroups": true
    }],
}
}
