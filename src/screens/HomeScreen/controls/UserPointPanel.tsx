import {Panel, PanelItem} from '../../../controls';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import NasWall, {type NasWallError, type NasWallPointInfo} from 'nas-offerwall-sdk-react-native';
import {showErrorAlert} from '../../../common';

interface Props {
  onShowPurchaseItem(): void;
}

export const UserPointPanel = ({onShowPurchaseItem}: Props) => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const safeUpdate = useSafeUpdate();

  /********************************************************************************************************************
   * State
   * ******************************************************************************************************************/

  // 조회 중 여부
  const [loading, setLoading] = useState(false);
  // 사용자 적립금 정보
  const [pointInfo, setpointInfo] = useState<NasWallPointInfo>();

  /********************************************************************************************************************
   * Function
   * ******************************************************************************************************************/

  /** 사용자 적립금 조회 */
  const loadUserPoint = useCallback(() => {
    setLoading(true);

    NasWall.userPoint()
      .then((info) => {
        // 사용자 적립금 조회 성공
        safeUpdate(() => {
          setpointInfo(info);
        });
      })
      .catch((err: NasWallError) => {
        // 사용자 적립금 조회 실패
        le(err);
        showErrorAlert('사용자 적립금 조회 실패', err);
      })
      .finally(() => {
        safeUpdate(() => {
          setLoading(false);
        });
      });
  }, [safeUpdate]);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <Panel title='적립금'>
      {/* 보유 적립금 */}
      <PanelItem icon='circle-multiple' onPress={loadUserPoint}>
        <View style={styles.container}>
          <Text style={g_styles.fontSize15}>보유 적립금</Text>

          {loading ? (
            <ActivityIndicator style={{marginVertical: -10}} />
          ) : pointInfo ? (
            <Text style={g_styles.fontSize15}>{pointInfo.stringValue}</Text>
          ) : (
            <Text style={[g_styles.fontSize15, g_styles.colorPrimary]}>조회</Text>
          )}
        </View>
      </PanelItem>

      {/* 아이템 구입 */}
      <PanelItem icon='cart' indicator onPress={onShowPurchaseItem}>
        <Text style={g_styles.fontSize15}>아이템 구입</Text>
      </PanelItem>
    </Panel>
  );
};

/********************************************************************************************************************
 * Style
 * ******************************************************************************************************************/

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
