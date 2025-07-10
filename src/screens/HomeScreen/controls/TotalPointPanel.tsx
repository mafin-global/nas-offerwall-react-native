import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import NasWall, {type NasWallError, type NasWallPointInfo} from 'nas-offerwall-sdk-react-native';
import {Panel, PanelItem} from '../../../controls';
import {showErrorAlert} from '../../../common';

interface Props {
  disabled?: boolean;
}

export const TotalPointPanel = ({disabled}: Props) => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const safeUpdate = useSafeUpdate();

  /********************************************************************************************************************
   * State
   * ******************************************************************************************************************/

  // 조회 중 여부
  const [loading, setLoading] = useState(false);
  // 획득 가능 총 적립금 정보
  const [pointInfo, setpointInfo] = useState<NasWallPointInfo>();

  /********************************************************************************************************************
   * Function
   * ******************************************************************************************************************/

  /** 획득 가능 총 적립금 조회 */
  const loadTotalPoint = useCallback(() => {
    setLoading(true);

    NasWall.totalPoint()
      .then((info) => {
        // 획득 가능 총 적립금 조회 성공
        safeUpdate(() => {
          setpointInfo(info);
        });
      })
      .catch((err: NasWallError) => {
        // 획득 가능 총 적립금 조회 실패
        le(err);
        showErrorAlert('획득 가능 총 적립금 조회 실패', err);
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
    <Panel>
      <PanelItem icon='currency-krw' disabled={disabled || loading} onPress={!pointInfo ? loadTotalPoint : undefined}>
        <View style={styles.container}>
          <Text style={g_styles.fontSize15}>획득 가능 총 적립금</Text>

          {loading ? (
            <ActivityIndicator style={{marginVertical: -10}} />
          ) : pointInfo ? (
            <Text style={g_styles.fontSize15}>{pointInfo.stringValue}</Text>
          ) : (
            <Text style={[g_styles.fontSize15, g_styles.colorPrimary]}>조회</Text>
          )}
        </View>
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
