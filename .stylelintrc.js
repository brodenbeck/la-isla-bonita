module.exports = {
  'processors': ['stylelint-processor-html'],
  'extends': 'stylelint-config-standard',
  'plugins': ['stylelint-scss'],
  'rules': {
    'rule-empty-line-before': 'never-multi-line',
    'no-empty-source': null,
  }
};