/**
 * @file Pug-lint configuration.
 */

module.exports = {
  disallowAttributeConcatenation: true,
  disallowAttributeInterpolation: true,
  disallowAttributeTemplateString: null,
  disallowBlockExpansion: true,
  disallowClassAttributeWithStaticValue: true,
  disallowClassLiteralsBeforeIdLiterals: true,
  disallowDuplicateAttributes: true,
  disallowHtmlText: true,
  disallowIdAttributeWithStaticValue: true,
  disallowLegacyMixinCall: true,
  disallowMultipleLineBreaks: true,
  disallowSpacesInsideAttributeBrackets: true,
  disallowSpecificAttributes: [
    {'a': 'name'}
  ],
  disallowSpecificTags: [
    'b',
    'i'
  ],
  disallowStringConcatenation: true,
  disallowStringInterpolation: null,
  disallowTagInterpolation: null,
  disallowTemplateString: null,
  disallowTrailingSpaces: true,
  maximumLineLength: 120,
  requireClassLiteralsBeforeAttributes: true,
  requireIdLiteralsBeforeAttributes: true,
  requireLineFeedAtFileEnd: true,
  requireLowerCaseAttributes: true,
  requireLowerCaseTags: true,
  requireSpaceAfterCodeOperator: true,
  requireSpecificAttributes: [
    {'a': 'href'},
    {'img': 'alt'}
  ],
  requireStrictEqualityOperators: true,
  validateAttributeQuoteMarks: '\'',
  validateAttributeSeparator: {
    separator: ', ',
    multiLineSeparator: '\n '
  },
  validateDivTags: true,
  validateExtensions: true,
  validateIndentation: 2,
  validateLineBreaks: 'LF',
  validateSelfClosingTags: true,
  validateTemplateString: null
}
