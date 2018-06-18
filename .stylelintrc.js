module.exports = {
  'processors': ['stylelint-processor-html'],
  'extends': 'stylelint-config-standard',
  'plugins': ['stylelint-scss'],
  'rules': {
    'rule-empty-line-before': 'never-multi-line',
    'no-empty-source': null,
    'at-rule-no-unknown': [true, {
      'ignoreAtRules': ['function', 'if', 'each', 'include', 'mixin', 'error', 'return', 'else'],
    }],
    'color-hex-case': 'lower',
    'color-hex-length': 'long',
    'color-named': 'never',
    'declaration-no-important': true,
    'string-quotes': 'single',
    'unit-case': 'lower',
    'selector-pseudo-element-colon-notation': 'single',
  },
};