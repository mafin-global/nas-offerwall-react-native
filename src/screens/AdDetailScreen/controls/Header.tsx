import {type GestureResponderEvent, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from '@react-native-vector-icons/material-design-icons';

interface Props {
  disabled?: boolean;
  onClosePress?(event: GestureResponderEvent): void;
}

export const Header = ({disabled, onClosePress}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>참여하기</Text>

      {/* 닫기 버튼 */}
      <TouchableOpacity
        style={[styles.closeButton, {opacity: disabled ? 0.5 : 1}]}
        disabled={disabled}
        activeOpacity={0.8}
        hitSlop={10}
        onPress={onClosePress}>
        <Icon name='close-circle' color={color.white} size={30} />
      </TouchableOpacity>
    </View>
  );
};

/********************************************************************************************************************
 * Style
 * ******************************************************************************************************************/

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.primary,
    padding: 15,
    justifyContent: 'center',
  },
  title: {
    color: color.white,
    fontSize: 16,
    fontWeight: 600,
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    right: 8,
  },
});
