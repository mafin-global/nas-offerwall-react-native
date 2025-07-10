import {View} from 'react-native';
import {NasWallAdListType} from 'nas-offerwall-sdk-react-native';
import {Divider, RadioButtons} from '../../../controls';

interface Props {
  value: NasWallAdListType;
  onChange: (adListType: NasWallAdListType) => void;
}

export const ListType = ({value, onChange}: Props) => {
  return (
    <View>
      <RadioButtons value={value} items={adListTypeItems} onChange={(v) => v !== value && onChange(v)} />
      <Divider />
    </View>
  );
};

/********************************************************************************************************************
 * AdListTypeItems
 * ******************************************************************************************************************/
const adListTypeItems = [
  {label: '참여적립', value: NasWallAdListType.basic},
  {label: '쇼핑적립', value: NasWallAdListType.cps},
  {label: '퀴즈적립', value: NasWallAdListType.cpq},
];
