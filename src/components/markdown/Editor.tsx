'use client';

import { useCallback, useEffect } from 'react';
import useCodeMirror from '@/hooks/use-codemirror';
import { type EditorState } from '@codemirror/state';

type EditorProps = {
  initialDoc: string;
  onChange: (doc: string) => void;
};

export default function Editor(props: EditorProps) {
  const { initialDoc, onChange } = props;

  const handleChange = useCallback(
    (state: EditorState) => {
      onChange(state.doc.toString());
    },
    [onChange],
  );

  const [refContainer, editorView] = useCodeMirror<HTMLDivElement>({
    initialDoc: initialDoc,
    onChange: handleChange,
  });

  useEffect(() => {
    if (editorView) {
      // do nothing for now
    }
  }, [editorView]);

  return <div ref={refContainer} className="w-full p-3" />;
}
