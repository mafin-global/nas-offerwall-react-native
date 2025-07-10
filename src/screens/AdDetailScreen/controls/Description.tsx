import {ActivityIndicator, ScrollView, StyleSheet, Text, View} from 'react-native';
import NasWall, {type NasWallAdInfo, type NasWallError} from 'nas-offerwall-sdk-react-native';
import {ErrorRetry} from '../../../controls';

interface Props {
  info: NasWallAdInfo;
}

export const Description = ({info}: Props) => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const safeUpdate = useSafeUpdate();

  /********************************************************************************************************************
   * State
   * ******************************************************************************************************************/

  // 광고 상세 설명 조회 상태
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  // 광고 상세 설명
  const [description, setDescription] = useState<string>();

  /********************************************************************************************************************
   * Function
   * ******************************************************************************************************************/

  /** 광고 상세 설명 조회 */
  const loadDescription = useCallback(() => {
    setStatus('loading');

    NasWall.adDescription(info)
      .then((value) => {
        // 광고 상세 설명 조회 성공
        safeUpdate(() => {
          setDescription(value);
          setStatus('success');
        });
      })
      .catch((err: NasWallError) => {
        // 광고 상세 설명 조회 실패
        le(err);
        safeUpdate(() => {
          setStatus('error');
        });
      });
  }, [info, safeUpdate]);

  /********************************************************************************************************************
   * Effect
   * ******************************************************************************************************************/

  useEffect(() => {
    loadDescription();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [info]);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return status === 'loading' ? (
    <View style={styles.centerContainer}>
      <ActivityIndicator />
    </View>
  ) : status === 'error' ? (
    <View style={styles.centerContainer}>
      <ErrorRetry onRetry={loadDescription} />
    </View>
  ) : (
    <View style={styles.container}>
      <ScrollView style={g_styles.flex1} contentContainerStyle={styles.scrollViewContentContainerStyle}>
        <Text style={styles.description}>{description}</Text>
      </ScrollView>
    </View>
  );
};

/********************************************************************************************************************
 * Style
 * ******************************************************************************************************************/

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollViewContentContainerStyle: {
    padding: 12,
  },
  description: {
    opacity: 0.7,
    fontSize: 15,
    lineHeight: 20,
  },
});
