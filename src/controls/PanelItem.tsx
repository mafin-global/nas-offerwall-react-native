import type {ComponentProps, ReactNode} from 'react';
import {type GestureResponderEvent, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Stack} from './Stack';
import Icon from '@react-native-vector-icons/material-design-icons';

type IconProps = ComponentProps<typeof Icon>;

interface Props {
  children?: ReactNode;
  icon?: IconProps['name'];
  iconColor?: IconProps['color'];
  disabled?: boolean;
  indicator?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
}

export const PanelItem = ({children, icon, iconColor, disabled, indicator, onPress}: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled || !onPress}
      style={disabled ? styles.disabled : undefined}
      onPress={onPress}>
      <Stack row center fullWidth spacing={10} padding={16}>
        {icon && <Icon name={icon} size={20} color={iconColor} />}
        <View style={g_styles.flex1}>{children}</View>
        {indicator && <Icon name='chevron-right' size={23} style={styles.indicator} />}
      </Stack>
    </TouchableOpacity>
  );
};

/********************************************************************************************************************
 * Style
 * ******************************************************************************************************************/

const styles = StyleSheet.create({
  disabled: {
    opacity: 0.5,
  },
  indicator: {
    opacity: 0.5,
    marginRight: -5,
  },
});
