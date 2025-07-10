import {ActivityIndicator, type GestureResponderEvent, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Stack} from './Stack';

interface Props {
  children: string;
  size?: 'small' | 'medium' | 'large';
  width?: number;
  loading?: boolean;
  disabled?: boolean;
  onPress?(event: GestureResponderEvent): void;
}

export const Button = ({children, size = 'medium', loading, disabled, width, onPress}: Props) => {
  const {padding, fontSize, spacing, loadingScale} = useMemo(() => {
    switch (size) {
      case 'small':
        return {
          padding: 12,
          fontSize: 12,
          spacing: 5,
          loadingScale: 0.7,
        };
      case 'large':
        return {
          padding: 18,
          fontSize: 16,
          spacing: 15,
          loadingScale: 1.1,
        };
      default:
        return {
          padding: 15,
          fontSize: 14,
          spacing: 10,
          loadingScale: 0.9,
        };
    }
  }, [size]);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <TouchableOpacity
      style={[styles.container, {padding, width, opacity: disabled ? 0.5 : 1}]}
      disabled={disabled || loading}
      activeOpacity={0.8}
      onPress={onPress}>
      <Stack row center centerJustify spacing={spacing}>
        {loading && (
          <ActivityIndicator color={color.white} style={{marginVertical: -10, transform: [{scale: loadingScale}]}} />
        )}
        <Text style={[styles.label, {fontSize}]}>{children}</Text>
      </Stack>
    </TouchableOpacity>
  );
};

/********************************************************************************************************************
 * Style
 * ******************************************************************************************************************/

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.primary,
    borderRadius: 8,
  },
  label: {
    color: color.white,
    fontWeight: 600,
  },
});
