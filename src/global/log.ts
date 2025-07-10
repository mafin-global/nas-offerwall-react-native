declare global {
  function ll(message?: any, ...optionalParams: any[]): void;
  function le(message?: any, ...optionalParams: any[]): void;
}

globalThis.ll = function (message?: any, ...optionalParams: any[]) {
  if (__DEV__) {
    console.log(message, ...optionalParams);
  }
};

globalThis.le = function (message?: any, ...optionalParams: any[]) {
  if (__DEV__) {
    if (message && typeof message === 'object' && message.code != null && message.message != null) {
      console.error(`(${message.code}) ${message.message}`, ...optionalParams);
    } else if (message && typeof message === 'object' && message.message !== null) {
      console.error(message.message, ...optionalParams);
    } else {
      console.error(message, ...optionalParams);
    }
  }
};

export {};
