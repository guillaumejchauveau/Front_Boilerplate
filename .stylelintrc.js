/**
 * @file StyleLint configuration.
 */

const namingRegex = /^[a-z]+(-[a-z0-9]+)*(__[a-z0-9]+(-[a-z0-9]+)*)?(_[a-z0-9]+(-[a-z0-9]+)*){0,2}$/

module.exports = {
  extends: 'stylelint-config-standard',
  plugins: [
    'stylelint-csstree-validator',
    'stylelint-declaration-block-no-ignored-properties',
    'stylelint-images',
    'stylelint-no-unsupported-browser-features',
    'stylelint-order',
    'stylelint-scss'
  ],
  rules: {
    'csstree/validator': true,
    //
    'plugin/declaration-block-no-ignored-properties': true,
    //
    'images/prefer-data-uri': 5000,
    //
    'plugin/no-unsupported-browser-features': [
      true,
      {
        'severity': 'warning'
      }
    ],
    //
    'order/order': [
      'declarations',
      'rules'
    ],
    'order/properties-order': [
      [
        {
          properties: [
            'position',
            'float',
            'top',
            'right',
            'bottom',
            'left'
          ]
        },
        {
          properties: [
            'display',
            'width',
            'height',
            'min-width',
            'min-height',
            'max-width',
            'max-height',
            'margin',
            'margin-top',
            'margin-right',
            'margin-bottom',
            'margin-left',
            'padding',
            'padding-top',
            'padding-right',
            'padding-bottom',
            'padding-left',
            'border',
            'border-top',
            'border-right',
            'border-bottom',
            'border-left'
          ]
        }
      ],
      {
        unspecified: 'bottomAlphabetical'
      }
    ],
    //
    'scss/at-else-closing-brace-newline-after': 'always-last-in-chain',
    'scss/at-else-closing-brace-space-after': 'always-intermediate',
    'scss/at-else-empty-line-before': 'never',
    'scss/at-function-pattern': namingRegex,
    'scss/at-function-parentheses-space-before': 'never',
    'scss/at-if-closing-brace-newline-after': 'always-last-in-chain',
    'scss/at-if-closing-brace-space-after': 'always-intermediate',
    'scss/at-import-no-partial-leading-underscore': true,
    'scss/at-import-partial-extension-blacklist': [
      'scss'
    ],
    'scss/at-mixin-argumentless-call-parentheses': 'never',
    'scss/at-mixin-pattern': namingRegex,
    'scss/at-mixin-parentheses-space-before': 'never',
    'scss/at-rule-no-unknown': true,
    'scss/declaration-nested-properties-no-divided-groups': true,
    'scss/dollar-variable-colon-space-after': 'always',
    'scss/dollar-variable-colon-space-before': 'never',
    'scss/dollar-variable-empty-line-before': [
      'always',
      {
        except: ['first-nested', 'after-dollar-variable'],
        ignore: ['after-comment']
      }
    ],
    'scss/dollar-variable-pattern': namingRegex,
    'scss/operator-no-newline-after': true,
    'scss/operator-no-unspaced': true,
    'scss/percent-placeholder-pattern': namingRegex,
    'scss/selector-no-redundant-nesting-selector': true,
    //
    'at-rule-no-unknown': null,
    'at-rule-empty-line-before': [
      'always',
      {
        except: [
          'blockless-after-same-name-blockless',
          'first-nested'
        ],
        ignore: [
          'after-comment'
        ],
        ignoreAtRules: [
          'else'
        ]
      }
    ],
    'at-rule-no-vendor-prefix': true,
    'block-closing-brace-newline-after': [
      'always-multi-line',
      {
        ignoreAtRules: [
          'if',
          'else'
        ]
      }
    ],
    'color-named': 'never',
    'declaration-colon-newline-after': null,
    'declaration-colon-space-after': null,
    'declaration-no-important': true,
    'font-family-name-quotes': 'always-unless-keyword',
    'function-url-no-scheme-relative': true,
    'function-url-quotes': 'always',
    'indentation': [
      2,
      {
        ignore: ['value']
      }
    ],
    'max-line-length': 120,
    'max-nesting-depth': 4,
    'media-feature-name-no-vendor-prefix': true,
    'no-descending-specificity': true,
    'no-duplicate-selectors': true,
    'number-leading-zero': 'never',
    'property-no-vendor-prefix': true,
    'selector-attribute-quotes': 'always',
    'selector-class-pattern': [
      /^(__[a-z0-9]+(-[a-z0-9]+)*)?(_[a-z0-9]+(-[a-z0-9]+)*){0,2}$/,
      {
        resolveNestedSelectors: true
      }
    ],
    'selector-max-compound-selectors': 3,
    'selector-no-vendor-prefix': true,
    'string-quotes': 'single',
    'value-no-vendor-prefix': true
  }
}
