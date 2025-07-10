import {ActivityIndicator, Text} from 'react-native';
import NasWall, {type NasWallError, type NasWallItemList} from 'nas-offerwall-sdk-react-native';
import {ErrorRetry, Panel, PanelItem, Stack} from '../../../controls';
import {formatNumber} from '../../../common';

interface Props {
  activeItemId?: number;
  disabled?: boolean;
  onActiveItemChange(itemId: number): void;
}

export const ItemListPanel = ({activeItemId, disabled, onActiveItemChange}: Props) => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const safeUpdate = useSafeUpdate();

  /********************************************************************************************************************
   * State
   * ******************************************************************************************************************/

  // 아이템 목록 조회 상태
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  // 아이템 목록
  const [list, setList] = useState<NasWallItemList>();

  /********************************************************************************************************************
   * Function
   * ******************************************************************************************************************/

  /** 아이템 목록 조회 */
  const loadItemList = useCallback(() => {
    setStatus('loading');

    NasWall.itemList()
      .then((itemList) => {
        // 아이템 목록 조회 성공
        safeUpdate(() => {
          setList(itemList);
          setStatus('success');

          if (itemList.length > 0) {
            onActiveItemChange(itemList[0]!.id);
          }
        });
      })
      .catch((err: NasWallError) => {
        // 아이템 목록 조회 실패
        le(err);
        safeUpdate(() => {
          setStatus('error');
        });
      });
  }, [onActiveItemChange, safeUpdate]);

  /********************************************************************************************************************
   * Effect
   * ******************************************************************************************************************/

  useEffect(() => {
    loadItemList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return status === 'loading' ? (
    <ActivityIndicator />
  ) : status === 'error' ? (
    <ErrorRetry onRetry={loadItemList} />
  ) : list ? (
    <Panel>
      {/* 아이템 목록 */}
      {list.map((item, idx) => (
        <PanelItem
          key={idx}
          disabled={disabled}
          icon={item.id === activeItemId ? 'circle-slice-8' : 'circle-outline'}
          iconColor={color.primary}
          onPress={() => onActiveItemChange(item.id)}>
          <Stack row center>
            {/* 아이템 이름 */}
            <Text style={[g_styles.fontSize15, g_styles.colorPrimary, g_styles.flex1]}>{item.name}</Text>

            {/* 아이템 가격 */}
            <Text style={[g_styles.fontSize15, g_styles.colorPrimary]}>
              {formatNumber(item.price)}
              {item.unit}
            </Text>
          </Stack>
        </PanelItem>
      ))}
    </Panel>
  ) : null;
};
