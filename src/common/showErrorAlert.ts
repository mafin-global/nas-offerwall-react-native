import {Alert} from 'react-native';

/**
 * 오류 Alert 표시
 * @param title 제목
 * @param message 오류 객체 또는 메시지
 */
export const showErrorAlert = (title: string, message: any) => {
  const msg =
    typeof message === 'object'
      ? message.code !== undefined && message.message !== undefined
        ? `(${message.code}) ${message.message}`
        : message.message !== undefined
          ? message.message
          : message
      : message;

  Alert.alert(title, msg, [
    {
      text: '확인',
      style: 'cancel',
    },
  ]);
};
