import React, { useState, useEffect } from "react";

/**
 * # uhooks - useOutsideClick
 * @description A hook to detect clicks outside of a DOM element
 * @param ref - an instance of a `React.MutableRefObject<any>` bound to a DOM element
 * @param onOutsideClick - a callback function to be called when a click event occurs outside of the ref element
 * @link https://github.com/Mantra-Coding/uhooks
 */
const useOutsideClick = (
  ref: React.MutableRefObject<any>,
  onOutsideClick: () => void
) => {
  useEffect(() => {
    const eventListener = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onOutsideClick();
      }
    };
    document.addEventListener("mousedown", eventListener);
    return () => {
      document.removeEventListener("mousedown", eventListener);
    };
  }, [ref]);
};

// generate some documentation for this hook

/**
 * # uhooks - useFetch
 * @description A hook to fetch data from an API
 * @example
 * ```jsx
 * const { isLoading, doFetch } = useFetch();
 * doFetch({ input: "https://jsonplaceholder.typicode.com/posts" });
 * // some code to handle the response
 * // ...
 * {isLoading ? <p>Loading...</p> : <p>Request Data...!</p>}
 * ```
 */
const useFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const doFetch = async <T>({
    input,
    init,
  }: {
    input: RequestInfo;
    init?: RequestInit;
  }) => {
    setIsLoading(true);
    const result = await fetch(input, init);
    setIsLoading(false);
    const body: T = await result.json();
    return { statusCode: result.status, body };
  };
  return { isLoading, doFetch };
};

export { useOutsideClick, useFetch };
