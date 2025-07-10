import {StyleSheet, Text} from 'react-native';
import {Stack} from './Stack';

interface Props {
  adPrice: string;
  children: string;
}

export const AdMissionText = ({adPrice, children}: Props) => {
  return (
    <Stack row center spacing={5}>
      {adPrice !== '무료' && <Text style={styles.adPrice}>{adPrice}</Text>}
      <Text numberOfLines={1} style={styles.text}>
        {children}
      </Text>
    </Stack>
  );
};

/********************************************************************************************************************
 * Style
 * ******************************************************************************************************************/

const styles = StyleSheet.create({
  adPrice: {
    backgroundColor: color.gray,
    color: color.white,
    paddingHorizontal: 5,
    paddingVertical: 3,
    fontSize: 11,
    marginVertical: -5,
    borderRadius: 4,
  },
  text: {
    flex: 1,
    fontSize: 13,
    opacity: 0.6,
  },
});
