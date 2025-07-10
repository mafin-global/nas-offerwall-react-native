import {StyleSheet, Text} from 'react-native';

interface Props {
  children: string;
}

export const AdTitle = ({children}: Props) => {
  return (
    <Text numberOfLines={2} style={styles.text}>
      {children}
    </Text>
  );
};

/********************************************************************************************************************
 * Style
 * ******************************************************************************************************************/

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    lineHeight: 19,
    fontWeight: 500,
  },
});
