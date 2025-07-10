import { ActivityIndicator, ScrollView, StyleSheet, Text } from 'react-native';
import NasWall, { type NasWallError } from 'nas-offerwall-sdk-react-native';
import { Container, ErrorRetry, Panel, PanelItem, Stack } from '../../controls';
import {
  EnvInfoPanel,
  PopupOfferWallPanelItem,
  TotalPointPanel,
  UserPointPanel,
} from './controls';
import { type ScreenProps } from '../../common';
import NasWallEnv, { NasWallServerType } from '../../NasWallEnv';

interface Props extends ScreenProps<'Home'> {}

export const HomeScreen = ({ navigation }: Props) => {
  /********************************************************************************************************************
   * State
   * ******************************************************************************************************************/

  // NasWall SDK 초기화 성공 여부
  const [initialized, setInitialized] = useState<boolean>();
  // NasWall SDK 초기화 실패 시 에러 메시지
  const [initializeError, setInitializeError] = useState<string>();

  /********************************************************************************************************************
   * Effect
   * ******************************************************************************************************************/

  /** NasWall SDK 초기화 */
  useEffect(() => {
    switch (NasWallEnv.serverType) {
      case NasWallServerType.developer:
        // 초기화 - 개발자 서버에서 적립금 관리
        NasWall.initializeDeveloperServer(
          NasWallEnv.appKey,
          NasWallEnv.userData,
          NasWallEnv.testMode,
        )
          .then(() => {
            // 초기화 성공
            setInitialized(true);
          })
          .catch((err: NasWallError) => {
            // 초기화 실패
            le(err);
            setInitializeError(`(${err.code}) ${err.message}`);
            setInitialized(false);
          });
        break;
      case NasWallServerType.nas:
        // 초기화 - NAS 서버에서 적립금 관리
        NasWall.initializeNasServer(
          NasWallEnv.appKey,
          NasWallEnv.userId,
          NasWallEnv.testMode,
        )
          .then(() => {
            // 초기화 성공
            setInitialized(true);
          })
          .catch((err: NasWallError) => {
            // 초기화 실패
            le(err);
            setInitializeError(`(${err.code}) ${err.message}`);
            setInitialized(false);
          });
        break;
    }
  }, []);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <Container backgroundColor={color.background}>
      <ScrollView contentContainerStyle={styles.scrollViewContentContainer}>
        <Stack spacing={32}>
          {/* 설정 정보 */}
          <EnvInfoPanel expand={initialized === false} />

          {initialized === undefined ? (
            <ActivityIndicator />
          ) : !initialized ? (
            <ErrorRetry
              text={`NasWall SDK 초기화에 실패했습니다.\n\n${initializeError}`}
            />
          ) : (
            <>
              {/* 획득 가능 총 적립금 */}
              <TotalPointPanel />

              {/* 내장 UI - 팝업 오퍼월 */}
              <Panel title="내장 UI">
                <PopupOfferWallPanelItem />
              </Panel>

              {/* 개발자 정의 UI - 개발자 정의 오퍼월, 문의하기 */}
              <Panel title="개발자 정의 UI">
                <PanelItem
                  icon="pencil-plus"
                  indicator
                  onPress={() => navigation.navigate('CustomOfferWall')}
                >
                  <Text style={styles.panelItemText}>
                    개발자 정의 UI 오퍼월
                  </Text>
                </PanelItem>
                <PanelItem
                  icon="help-circle"
                  iconColor={color.primary}
                  onPress={() => NasWall.openCs()}
                >
                  <Text style={[styles.panelItemText, g_styles.colorPrimary]}>
                    문의하기
                  </Text>
                </PanelItem>
              </Panel>

              {/* 적립금 - NAS 서버에서 적립금 관리하는 경우에만 사용 */}
              {NasWallEnv.serverType === NasWallServerType.nas && (
                <UserPointPanel
                  onShowPurchaseItem={() => navigation.navigate('PurchaseItem')}
                />
              )}
            </>
          )}
        </Stack>
      </ScrollView>
    </Container>
  );
};

/********************************************************************************************************************
 * Style
 * ******************************************************************************************************************/

const styles = StyleSheet.create({
  scrollViewContentContainer: {
    padding: 10,
  },
  panelItemText: {
    fontSize: 15,
  },
});
