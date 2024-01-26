import type React from 'react';
import { useState, useEffect, useRef } from 'react';
import { EditorState } from '@codemirror/state';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { tags } from '@lezer/highlight';
import { oneDarkTheme } from '@/components/markdown/one-dark';
import {
  indentOnInput,
  bracketMatching,
  HighlightStyle,
  syntaxHighlighting,
  defaultHighlightStyle,
} from '@codemirror/language';

import {
  EditorView,
  keymap,
  highlightActiveLine,
  // lineNumbers,
  highlightActiveLineGutter,
} from '@codemirror/view';

export const transparentTheme = EditorView.theme({
  '&': {
    backgroundColor: 'transparent',
    height: '100%',
  },
});

const mySyntaxHighlight = HighlightStyle.define([
  {
    tag: tags.heading1,
    fontSize: '1.6em',
    fontWeight: 'bold',
    className: 'text-[#61afef]',
  },
  {
    tag: tags.heading2,
    fontSize: '1.4em',
    fontWeight: 'bold',
  },
  {
    tag: tags.heading3,
    fontSize: '1.2em',
    fontWeight: 'bold',
  },
]);

interface Props {
  initialDoc: string;
  onChange: (state: EditorState) => void;
}

const useCodeMirror = <T extends Element>(
  props: Props,
): [React.MutableRefObject<T | null>, EditorView?] => {
  const refContainer = useRef<T>(null);
  const [editorView, setEditorView] = useState<EditorView>();
  const { initialDoc, onChange } = props;

  useEffect(() => {
    if (!refContainer.current) return;

    const startState = EditorState.create({
      doc: initialDoc,
      extensions: [
        keymap.of([...defaultKeymap, ...historyKeymap]),
        // lineNumbers(),
        highlightActiveLineGutter(),
        history(),
        indentOnInput(),
        bracketMatching(),
        highlightActiveLine(),
        markdown({
          base: markdownLanguage,
          codeLanguages: languages,
          addKeymap: true,
        }),
        // oneDark,
        oneDarkTheme({ backGroundColor: '#000000' }),
        transparentTheme,
        syntaxHighlighting(defaultHighlightStyle),
        syntaxHighlighting(mySyntaxHighlight),
        EditorView.lineWrapping,
        EditorView.updateListener.of(update => {
          if (update.changes) {
            onChange && onChange(update.state);
          }
        }),
      ],
    }); 

    const view = new EditorView({
      state: startState,
      parent: refContainer.current,
    });

    setEditorView(view);
  }, [refContainer]);

  return [refContainer, editorView];
};

export default useCodeMirror;
