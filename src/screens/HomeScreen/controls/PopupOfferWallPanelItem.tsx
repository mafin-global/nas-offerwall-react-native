import {Text} from 'react-native';
import NasWall, {type NasWallError} from 'nas-offerwall-sdk-react-native';
import {PanelItem} from '../../../controls';
import {showErrorAlert} from '../../../common';

interface Props {
  disabled?: boolean;
}

export const PopupOfferWallPanelItem = ({disabled}: Props) => {
  /********************************************************************************************************************
   * Function
   * ******************************************************************************************************************/

  /** 팝업 오퍼월 열기 */
  const openPopupOfferWall = useCallback(() => {
    NasWall.openPopupOfferWall(() => {
      // 팝업 오퍼월 닫힘
    })
      .then(() => {
        // 팝업 오퍼월 열기 성공
      })
      .catch((err: NasWallError) => {
        // 팝업 오퍼월 열기 실패
        le(err);
        showErrorAlert('팝업 오퍼월 열기 실패', err);
      });
  }, []);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <PanelItem icon='cellphone-text' iconColor={color.primary} disabled={disabled} onPress={openPopupOfferWall}>
      <Text style={[g_styles.fontSize15, g_styles.colorPrimary]}>팝업 오퍼월</Text>
    </PanelItem>
  );
};
