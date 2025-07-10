const _color = {
  background: '#f0f0f5',
  primary: '#007AFF',
  divider: '#cccccc',
  gray: '#808080',
  white: '#ffffff',
};

declare global {
  var color: typeof _color;
}

globalThis.color = _color;

export {};
