import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import NasWall, {type NasWallError, type NasWallPointInfo} from 'nas-offerwall-sdk-react-native';
import {Panel, PanelItem} from '../../../controls';

interface Props {
  updateKey: number;
  disabled?: boolean;
}

export const UserPointPanel = ({updateKey, disabled}: Props) => {
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
        safeUpdate(() => {
          setpointInfo(info);
        });
      })
      .catch((err: NasWallError) => {
        // 사용자 적립금 조회 실패
        le(err);
      })
      .finally(() => {
        safeUpdate(() => {
          setLoading(false);
        });
      });
  }, [safeUpdate]);

  /********************************************************************************************************************
   * Effect
   * ******************************************************************************************************************/

  useEffect(() => {
    loadUserPoint();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateKey]);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <Panel>
      <PanelItem icon='circle-multiple' disabled={disabled} onPress={loadUserPoint}>
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
