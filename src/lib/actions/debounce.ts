/* eslint-disable @typescript-eslint/no-explicit-any */
const debounce = (node: HTMLElement, config: { delay?: 750 | undefined; callback: any; }) => {
  const { delay = 750, callback } = config;

  let timer: string | number | NodeJS.Timeout | undefined;

  const handleChange = (e: Event) => {
    const { value } = e.target as HTMLInputElement;

    clearTimeout(timer);
    timer = window.setTimeout(() => {
      callback(value);
    }, delay);
  };

  node.addEventListener('input', handleChange);

  return {
    destroy() {
      node.removeEventListener("input", handleChange);
    },
  };
};

export { debounce };