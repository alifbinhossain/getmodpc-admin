'use client';

import { useEffect, useState } from 'react';

const TOAST_LIMIT = 5;
const TOAST_REMOVE_DELAY = 5000;

type ToastVariant = 'default' | 'destructive';

export interface ToastProps {
  id?: string;
  title?: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
}

interface ToastState {
  toasts: Required<ToastProps>[];
}

type ToastAction =
  | { type: 'ADD_TOAST'; toast: Required<ToastProps> }
  | { type: 'REMOVE_TOAST'; id: string };

let count = 0;
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

const listeners: Array<(state: ToastState) => void> = [];
let memoryState: ToastState = { toasts: [] };

function dispatch(action: ToastAction) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => listener(memoryState));
}

function reducer(state: ToastState, action: ToastAction): ToastState {
  switch (action.type) {
    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };
    case 'REMOVE_TOAST':
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.id),
      };
    default:
      return state;
  }
}

export function toast(props: ToastProps) {
  const id = props.id ?? genId();
  const newToast: Required<ToastProps> = {
    id,
    title: props.title ?? '',
    description: props.description ?? '',
    variant: props.variant ?? 'default',
    duration: props.duration ?? TOAST_REMOVE_DELAY,
  };

  dispatch({ type: 'ADD_TOAST', toast: newToast });

  setTimeout(() => {
    dispatch({ type: 'REMOVE_TOAST', id });
  }, newToast.duration);

  return id;
}

export function useToast() {
  const [state, setState] = useState<ToastState>(memoryState);

  useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) listeners.splice(index, 1);
    };
  }, []);

  return {
    toasts: state.toasts,
    toast,
    dismiss: (id: string) => dispatch({ type: 'REMOVE_TOAST', id }),
  };
}
