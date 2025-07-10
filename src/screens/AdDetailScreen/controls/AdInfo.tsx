import {StyleSheet, Text} from 'react-native';
import type {NasWallAdInfo} from 'nas-offerwall-sdk-react-native';
import {AdIcon, AdMissionText, AdTitle, Stack} from '../../../controls';
import {formatNumber} from '../../../common';

interface Props {
  info: NasWallAdInfo;
}

export const AdInfo = ({info}: Props) => {
  return (
    <Stack row center spacing={10} padding={10}>
      {/* 아이콘 */}
      <AdIcon uri={info.iconUrl} />

      <Stack spacing={1} fullWidth>
        {/* 광고명 */}
        <AdTitle>{info.title}</AdTitle>

        {/* 미션 */}
        <AdMissionText adPrice={info.adPrice}>{info.missionText}</AdMissionText>

        {/* 적립금 */}
        <Text style={styles.rewardPrice}>
          {formatNumber(info.rewardPrice)}
          {info.rewardUnit} 적립
        </Text>
      </Stack>
    </Stack>
  );
};

/********************************************************************************************************************
 * Style
 * ******************************************************************************************************************/

const styles = StyleSheet.create({
  rewardPrice: {
    color: color.primary,
    fontWeight: 'bold',
    lineHeight: 20,
  },
});
