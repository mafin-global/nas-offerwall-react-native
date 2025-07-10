import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Stack} from './Stack';

interface Props<T extends string | number | undefined> {
  value: T;
  items: {label: string; value: T}[];
  inline?: boolean;
  center?: boolean;
  onChange: (value: T) => void;
}

export function RadioButtons<T extends string | number | undefined>({
  value,
  items,
  inline,
  center,
  onChange,
}: Props<T>) {
  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <Stack row center centerJustify={center}>
      {items.map((item, idx) => (
        <TouchableOpacity
          key={idx}
          activeOpacity={0.8}
          style={[
            styles.button,
            item.value === value ? (inline ? styles.activeButtonInline : styles.activeButton) : undefined,
            {flex: inline ? undefined : 1},
          ]}
          onPress={() => onChange(item.value)}>
          <Text
            style={[
              styles.text,
              item.value === value ? (inline ? styles.activeTextInline : styles.activeText) : undefined,
            ]}>
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </Stack>
  );
}

/********************************************************************************************************************
 * State
 * ******************************************************************************************************************/

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  activeButton: {
    backgroundColor: color.primary,
  },
  activeButtonInline: {},
  text: {
    textAlign: 'center',
    fontSize: 13,
  },
  activeText: {
    color: color.white,
  },
  activeTextInline: {
    fontWeight: 700,
    color: color.primary,
  },
});
