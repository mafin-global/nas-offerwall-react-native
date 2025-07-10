import type {NasWallAdInfo} from 'nas-offerwall-sdk-react-native';
import type {StackScreenProps} from '@react-navigation/stack';

export type RootScreenList = {
  Home: undefined;
  CustomOfferWall: undefined;
  AdDetail: NasWallAdInfo;
  PurchaseItem: undefined;
};

export type ScreenProps<T extends keyof RootScreenList = any> = StackScreenProps<RootScreenList, T>;
