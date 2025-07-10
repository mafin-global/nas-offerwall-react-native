import {View} from 'react-native';
import {NasWallAdCategory, type NasWallAdList} from 'nas-offerwall-sdk-react-native';
import {Divider, RadioButtons, Stack} from '../../../controls';

interface Props {
  adList: NasWallAdList;
  value?: NasWallAdCategory;
  onChange: (category: NasWallAdCategory | undefined) => void;
}

export const Category = ({adList, value, onChange}: Props) => {
  /********************************************************************************************************************
   * Memo
   * ******************************************************************************************************************/

  /** 카테고리 목록 - 광고 목록에서 카테고리 추출 */
  const categoryItems = useMemo(() => {
    // 0=전체
    const values: Set<0 | NasWallAdCategory> = new Set();
    values.add(0);
    adList.forEach((ad) => {
      values.add(ad.category);
    });

    const valueList = Array.from(values);
    valueList.sort();

    return valueList.map((v) => ({
      label: v === 0 ? '전체' : NasWallAdCategory.getName(v),
      value: v,
    }));
  }, [adList]);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <Stack>
      <View style={{paddingVertical: 5}}>
        <RadioButtons
          inline
          center
          value={value ?? 0}
          items={categoryItems}
          onChange={(v) => v !== value && onChange(v === 0 ? undefined : v)}
        />
      </View>
      <Divider />
    </Stack>
  );
};
