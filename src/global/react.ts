import {
  useId as _useId,
  useRef as _useRef,
  useState as _useState,
  useEffect as _useEffect,
  useLayoutEffect as _useLayoutEffect,
  useCallback as _useCallback,
  useMemo as _useMemo,
  type Dispatch,
  type SetStateAction,
} from 'react';

declare global {
  var useId: typeof _useId;
  var useRef: typeof _useRef;
  var useLayoutEffect: typeof _useLayoutEffect;
  var useEffect: typeof _useEffect;
  var useCallback: typeof _useCallback;
  var useMemo: typeof _useMemo;
  var useState: typeof _useState;
  var useSafeState: typeof useSafeStateFunction;
  var useSafeUpdate: typeof useSafeUpdateFunction;
  var useMountedRef: typeof useMountedRefFunction;
}

globalThis.useId = _useId;
globalThis.useRef = _useRef;
globalThis.useLayoutEffect = _useLayoutEffect;
globalThis.useEffect = _useEffect;
globalThis.useCallback = _useCallback;
globalThis.useMemo = _useMemo;
globalThis.useState = _useState;

/********************************************************************************************************************
 * useSafeState
 * ******************************************************************************************************************/
function useSafeStateFunction<S>(
  initialState: S | (() => S),
): [S, Dispatch<SetStateAction<S>>];
function useSafeStateFunction<S = undefined>(): [
  S | undefined,
  Dispatch<SetStateAction<S | undefined>>,
];
function useSafeStateFunction<S>(
  initialState?: S | (() => S),
): [S | undefined, Dispatch<SetStateAction<S | undefined>>] {
  const isMounted = useMountedRef();
  const [value, setValue] = _useState(initialState);

  _useEffect(() => {
    isMounted.current = true;
  }, []);

  const safeSetValue = _useCallback((newValue: any) => {
    if (isMounted.current) {
      setValue(newValue);
    } else {
      if (__DEV__) {
        console.warn('unmounted update', newValue);
      }
    }
  }, []);

  return [value, safeSetValue];
}

globalThis.useSafeState = useSafeStateFunction;

/********************************************************************************************************************
 * useSafeUpdate
 * ******************************************************************************************************************/

function useSafeUpdateFunction() {
  const isMounted = useMountedRef();

  return _useCallback((callback: () => void) => {
    if (isMounted.current) {
      callback();
    } else {
      if (__DEV__) {
        console.warn('unmounted update');
      }
    }
  }, []);
}

globalThis.useSafeUpdate = useSafeUpdateFunction;

/********************************************************************************************************************
 * useMounted
 * ******************************************************************************************************************/
function useMountedRefFunction(initialValue = true) {
  const isMountedRef = _useRef(initialValue);

  _useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return isMountedRef;
}

globalThis.useMountedRef = useMountedRefFunction;

/********************************************************************************************************************
 * export
 * ******************************************************************************************************************/
export {};
