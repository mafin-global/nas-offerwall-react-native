import {StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import NasWall, {type NasWallError} from 'nas-offerwall-sdk-react-native';
import {type ScreenProps, showErrorAlert} from '../../common';
import {Button, Container, Stack} from '../../controls';
import {ItemListPanel, UserPointPanel} from './controls';

interface Props extends ScreenProps<'PurchaseItem'> {}

export const PurchaseItemScreen = ({}: Props) => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const safeAreaInsets = useSafeAreaInsets();
  const safeUpdate = useSafeUpdate();

  /********************************************************************************************************************
   * State
   * ******************************************************************************************************************/

  // 아이템 구입 중 여부
  const [isPurchasing, setIsPurchasing] = useState(false);
  // 선택 아이템 ID
  const [itemId, setItemId] = useState<number>();
  // 사용자 적립금 업데이트 키
  const [userPointUpdateKey, setUserPointUpdateKey] = useState(0);

  /********************************************************************************************************************
   * Function
   * ******************************************************************************************************************/

  /** 아이템 구입 */
  const purchase = useCallback(() => {
    if (itemId) {
      setIsPurchasing(true);

      NasWall.purchaseItem(itemId, 1)
        .then(() => {
          // 아이템 구입 성공
          safeUpdate(() => {
            setUserPointUpdateKey((prev) => prev + 1);
          });
        })
        .catch((err: NasWallError) => {
          // 아이템 구입 실패
          le(err);
          showErrorAlert('구입 실패', err);
        })
        .finally(() => {
          safeUpdate(() => {
            setIsPurchasing(false);
          });
        });
    }
  }, [itemId, safeUpdate]);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <Container>
      <Stack flex={1} spacing={32} padding={16}>
        {/* 보유 적립금 */}
        <UserPointPanel updateKey={userPointUpdateKey} disabled={isPurchasing} />

        {/* 아이템 목록 */}
        <ItemListPanel disabled={isPurchasing} activeItemId={itemId} onActiveItemChange={setItemId} />
      </Stack>

      {/* 구입하기 버튼 */}
      <View style={[styles.buttonContainer, {paddingBottom: safeAreaInsets.bottom + 16}]}>
        <Button disabled={!itemId} loading={isPurchasing} onPress={purchase}>
          구입하기
        </Button>
      </View>
    </Container>
  );
};

/********************************************************************************************************************
 * State
 * ******************************************************************************************************************/

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 16,
    backgroundColor: color.white,
  },
});
