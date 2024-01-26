import { EditorState } from '@codemirror/state';
import { oneDarkTheme } from '@/components/markdown/one-dark';
import { EditorView } from '@codemirror/view';

export const transparentTheme = EditorView.theme({
  '&': {
    backgroundColor: 'transparent',
    height: '100%',
  },
});

export const initHighlighting = () => {
  const startState = EditorState.create({
    extensions: [oneDarkTheme({ backGroundColor: '#000000' }), transparentTheme],
  });

  new EditorView({
    state: startState,
  });
};
