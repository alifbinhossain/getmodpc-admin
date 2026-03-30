// utils/debounce.ts
export function debounce<F extends (...args: any[]) => void>(
  func: F,
  delay = 300
) {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<F>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}
