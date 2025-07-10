import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import type {NasWallAdInfo} from 'nas-offerwall-sdk-react-native';
import {AdIcon, AdMissionText, AdTitle, Stack} from '../../../controls';
import {formatNumber} from '../../../common';

interface Props {
  info: NasWallAdInfo;
  onPress?(info: NasWallAdInfo): void;
}

export const AdListItem = ({info, onPress}: Props) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress ? () => onPress(info) : undefined}>
      <Stack row center spacing={10} style={styles.container}>
        {/* 아이콘 */}
        <AdIcon uri={info.iconUrl} />

        <Stack spacing={5} style={g_styles.flex1}>
          {/* 광고명 */}
          <AdTitle>{info.title}</AdTitle>

          {/* 미션 */}
          <AdMissionText adPrice={info.adPrice}>{info.missionText}</AdMissionText>
        </Stack>

        {/* 적립금 */}
        <View style={styles.rewardPriceContainer}>
          <Text style={styles.rewardPrice}>
            {formatNumber(info.rewardPrice)}
            {info.rewardUnit}
          </Text>
        </View>
      </Stack>
    </TouchableOpacity>
  );
};

/********************************************************************************************************************
 * Style
 * ******************************************************************************************************************/

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.white,
    padding: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: color.divider,
  },
  rewardPriceContainer: {
    backgroundColor: color.primary,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 99,
    minWidth: 80,
    alignItems: 'center',
  },
  rewardPrice: {
    fontSize: 12,
    color: color.white,
    fontWeight: 500,
  },
});
