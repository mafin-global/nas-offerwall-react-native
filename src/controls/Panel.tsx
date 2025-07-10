import type {ReactNode} from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface Props {
  children?: ReactNode;
  title?: string;
}

export const Panel = ({title, children}: Props) => {
  return (
    <View>
      {title && <Text style={styles.title}>{title}</Text>}
      <View style={styles.container}>{children}</View>
    </View>
  );
};

/********************************************************************************************************************
 * Style
 * ******************************************************************************************************************/

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 15,
  },
  title: {
    paddingLeft: 16,
    fontSize: 13,
    marginBottom: 7,
    opacity: 0.5,
  },
});
