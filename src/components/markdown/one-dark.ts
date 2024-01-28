import { EditorView } from '@codemirror/view';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
// import { oneDarkHighlightStyle } from '@codemirror/theme-one-dark';
import { Nullable } from 'vitest';
import { tags as t } from '@lezer/highlight';

const chalky = '#e5c07b',
  coral = '#e06c75',
  cyan = '#56b6c2',
  invalid = '#ffffff',
  ivory = '#abb2bf',
  stone = '#7d8799', // Brightened compared to original to increase contrast
  malibu = '#58afef',
  sage = '#98c379',
  whiskey = '#d19a66',
  violet = '#c678dd',
  darkBackground = '#21252b',
  highlightBackground = '#2c313a',
  background = '#282c34',
  tooltipBackground = '#353a42',
  selection = '#3E4451',
  cursor = '#528bff',
  activeLine = '#2c313a',
  field = '#b4d2f0';

const color = {
  chalky,
  coral,
  cyan,
  invalid,
  ivory,
  stone,
  malibu,
  sage,
  whiskey,
  violet,
  darkBackground,
  highlightBackground,
  background,
  tooltipBackground,
  selection,
  cursor,
  activeLine,
  field,
};

// [t.name, t.deleted, t.character, t.propertyName, t.macroName];

export const oneDarkHighlightStyle = HighlightStyle.define([
  { tag: t.keyword, color: violet },
  { tag: t.propertyName, color: field },
  { tag: [t.deleted, t.character, t.macroName], color: coral },
  { tag: [t.function(t.variableName), t.labelName, t.function(t.propertyName)], color: chalky },
  { tag: [t.color, t.constant(t.name), t.standard(t.name)], color: whiskey },
  { tag: [t.definition(t.name), t.separator, t.name], color: malibu },
  {
    tag: [t.className, t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace],
    color: chalky,
  },
  {
    tag: [
      t.operator,
      t.typeName,
      t.operatorKeyword,
      t.url,
      t.escape,
      t.regexp,
      t.link,
      t.special(t.string),
    ],
    color: cyan,
  },
  { tag: [t.meta, t.comment], color: stone },
  { tag: t.strong, fontWeight: 'bold' },
  { tag: t.emphasis, fontStyle: 'italic' },
  { tag: t.strikethrough, textDecoration: 'line-through' },
  { tag: t.link, color: stone, textDecoration: 'underline' },
  { tag: t.heading, fontWeight: 'bold', color: coral },
  { tag: [t.atom, t.bool, t.special(t.variableName)], color: whiskey },
  { tag: [t.processingInstruction, t.string, t.inserted], color: sage },
  { tag: t.invalid, color: invalid },
]);

type ThemeProps = Nullable<{
  backGroundColor?: string;
  cm_activeLine?: string;
}>;

export const oneDarkTheme = ({
  backGroundColor = background,
  cm_activeLine = activeLine,
}: ThemeProps = {}) => {
  const oneDarkTheme = EditorView.theme(
    {
      '&': {
        color: ivory,
        backgroundColor: backGroundColor,
      },

      '.cm-content': {
        caretColor: cursor,
      },

      '.cm-cursor, .cm-dropCursor': { borderLeftColor: cursor },
      '&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection':
        { backgroundColor: selection },

      '.cm-panels': { backgroundColor: darkBackground, color: ivory },
      '.cm-panels.cm-panels-top': { borderBottom: '2px solid black' },
      '.cm-panels.cm-panels-bottom': { borderTop: '2px solid black' },

      '.cm-searchMatch': {
        backgroundColor: '#72a1ff59',
        outline: '1px solid #457dff',
      },
      '.cm-searchMatch.cm-searchMatch-selected': {
        backgroundColor: '#6199ff2f',
      },

      '.cm-activeLine': { backgroundColor: cm_activeLine },
      '.cm-selectionMatch': { backgroundColor: '#aafe661a' },

      '&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket': {
        backgroundColor: '#bad0f847',
      },

      '.cm-gutters': {
        backgroundColor: background,
        color: stone,
        border: 'none',
      },

      '.cm-activeLineGutter': {
        backgroundColor: highlightBackground,
      },

      '.cm-foldPlaceholder': {
        backgroundColor: 'transparent',
        border: 'none',
        color: '#ddd',
      },

      '.cm-tooltip': {
        border: 'none',
        backgroundColor: tooltipBackground,
      },
      '.cm-tooltip .cm-tooltip-arrow:before': {
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
      },
      '.cm-tooltip .cm-tooltip-arrow:after': {
        borderTopColor: tooltipBackground,
        borderBottomColor: tooltipBackground,
      },
      '.cm-tooltip-autocomplete': {
        '& > ul > li[aria-selected]': {
          backgroundColor: highlightBackground,
          color: ivory,
        },
      },
    },
    { dark: true },
  );

  return [oneDarkTheme, syntaxHighlighting(oneDarkHighlightStyle)] as const;
};
