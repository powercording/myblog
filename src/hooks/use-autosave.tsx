import { useToast } from '@/context/useToast';
import { database } from '@/database/databaseClient';
import { autoSave } from '@/lib/AutosaveSchema/schema';
import { eq } from 'drizzle-orm';
import { useEffect, useRef } from 'react';
import { useUser } from './use-user';

type Handler = (doc: string) => void;

export const useAutosave = (callback: Handler) => {
  const callbackRef = useRef<Handler>(callback);
  const toast = useToast();
  const userName = useUser();

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handler = (doc: string) => callbackRef.current(doc);
  }, [userName]);
};
