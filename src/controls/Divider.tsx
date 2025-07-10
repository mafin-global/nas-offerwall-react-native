import {StyleSheet, View} from 'react-native';

interface Props {}

export const Divider = ({}: Props) => {
  return <View style={styles.divider} />;
};

/********************************************************************************************************************
 * Style
 * ******************************************************************************************************************/

const styles = StyleSheet.create({
  divider: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#dddddd',
  },
});
