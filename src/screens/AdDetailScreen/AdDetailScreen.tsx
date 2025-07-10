import {StyleSheet, View} from 'react-native';
import NasWall, {type NasWallError} from 'nas-offerwall-sdk-react-native';
import {type ScreenProps, showErrorAlert} from '../../common';
import {AdInfo, Description, Header} from './controls';
import {Button, Container} from '../../controls';

interface Props extends ScreenProps<'AdDetail'> {}

export const AdDetailScreen = ({navigation, route}: Props) => {
  /********************************************************************************************************************
   * Variable
   * ******************************************************************************************************************/

  // 광고 정보
  const info = route.params;

  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const safeUpdate = useSafeUpdate();

  /********************************************************************************************************************
   * State
   * ******************************************************************************************************************/

  // 광고 참여 중 여부
  const [isJoining, setIsJoining] = useState(false);

  /********************************************************************************************************************
   * Function
   * ******************************************************************************************************************/

  /** 광고 참여 */
  const adJoin = useCallback(() => {
    setIsJoining(true);

    NasWall.joinAd(info)
      .then(() => {
        // 광고 참여 성공
        safeUpdate(() => {
          navigation.goBack();
        });
      })
      .catch((err: NasWallError) => {
        // 광고 참여 실패
        le(err);
        showErrorAlert('참여 실패', err);
      })
      .finally(() => {
        safeUpdate(() => {
          setIsJoining(false);
        });
      });
  }, [info, navigation, safeUpdate]);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <Container absoluteFill backgroundColor='#00000060' safeAreaEdges={['top', 'bottom']} padding={16}>
      <View style={styles.contentContainer}>
        {/* 헤더 */}
        <Header disabled={isJoining} onClosePress={() => navigation.goBack()} />

        {/* 광고 정보 */}
        <AdInfo info={info} />

        {/* 설명 설명 */}
        <Description info={info} />

        {/* 참여하기 버튼 */}
        <View style={styles.buttonContainer}>
          <Button loading={isJoining} onPress={adJoin}>
            참여하기
          </Button>
        </View>
      </View>
    </Container>
  );
};

/********************************************************************************************************************
 * Style
 * ******************************************************************************************************************/

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: color.white,
    borderRadius: 10,
    overflow: 'hidden',
  },
  buttonContainer: {
    backgroundColor: color.white,
    padding: 10,
  },
});
