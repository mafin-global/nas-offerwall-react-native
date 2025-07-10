import {type GestureResponderEvent, StyleSheet, Text, View} from 'react-native';
import Icon from '@react-native-vector-icons/material-design-icons';
import {Stack} from './Stack';
import {Button} from './Button';

interface Props {
  text?: string;
  onRetry?(event: GestureResponderEvent): void;
}

export const ErrorRetry = ({text = '정보를 불러오지 못했습니다.', onRetry}: Props) => {
  return (
    <Stack center spacing={15}>
      <Icon name='information' size={40} style={styles.icon} />
      <View>
        <Text style={styles.errorText}>{text}</Text>
        {onRetry && <Text style={styles.errorText}>잠시 후 재시도 해주세요.</Text>}
      </View>
      {onRetry && (
        <Button size='small' width={100} onPress={onRetry}>
          재시도
        </Button>
      )}
    </Stack>
  );
};

/********************************************************************************************************************
 * State
 * ******************************************************************************************************************/

const styles = StyleSheet.create({
  icon: {
    opacity: 0.3,
  },
  errorText: {
    textAlign: 'center',
    opacity: 0.5,
    lineHeight: 19,
  },
});
