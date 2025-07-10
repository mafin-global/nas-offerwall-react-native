import {StyleSheet} from 'react-native';

const _g_styles = StyleSheet.create({
  fontSize15: {
    fontSize: 15,
  },
  colorPrimary: {
    color: color.primary,
  },
  flex1: {
    flex: 1,
  },
});

declare global {
  var g_styles: typeof _g_styles;
}

globalThis.g_styles = _g_styles;

export {};
