import {
  ActivityIndicator,
  AppState,
  type AppStateStatus,
  FlatList,
  type ListRenderItemInfo,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import NasWall, {
  type NasWallAdCategory,
  type NasWallAdInfo,
  type NasWallAdList,
  NasWallAdListType,
  type NasWallError,
} from 'nas-offerwall-sdk-react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from '@react-native-vector-icons/material-design-icons';
import {AdListItem, Category, ListType} from './controls';
import type {ScreenProps} from '../../common';
import {Container, ErrorRetry} from '../../controls';

interface Props extends ScreenProps<'CustomOfferWall'> {}

export const CustomOfferWallScreen = ({navigation}: Props) => {
  /********************************************************************************************************************
   * Use
   * ******************************************************************************************************************/

  const safeAreaInsets = useSafeAreaInsets();
  const safeUpdate = useSafeUpdate();

  /********************************************************************************************************************
   * State
   * ******************************************************************************************************************/

  // 광고 목록 조회 상태
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  // 광고 목록 구분
  const [adListType, setAdListType] = useState<NasWallAdListType>(NasWallAdListType.basic);
  // 로드된 광고 목록 구분
  const [loadedAdListType, setLoadedAdListType] = useState<NasWallAdListType>();
  // 카테고리
  const [category, setCategory] = useState<NasWallAdCategory>();
  // 광고 목록
  const [adList, setAdList] = useState<NasWallAdList>();
  // 노출 광고 목록
  const [visibleAdList, setVisibleAdList] = useState<NasWallAdList>();

  /********************************************************************************************************************
   * Function
   * ******************************************************************************************************************/

  /** 광고 목록 조회 */
  const loadAdList = useCallback(
    (listType: NasWallAdListType) => {
      setStatus('loading');

      NasWall.adList(listType)
        .then((newAdList) => {
          // 광고 목록 조회 성공
          safeUpdate(() => {
            setAdList(newAdList);
            setLoadedAdListType(listType);
            setCategory(undefined);
            setStatus('success');
          });
        })
        .catch((err: NasWallError) => {
          // 광고 목록 조회 실패
          le(err);
          safeUpdate(() => {
            setStatus('error');
          });
        });
    },
    [safeUpdate],
  );

  /********************************************************************************************************************
   * Effect
   * ******************************************************************************************************************/

  /** 앱 실행 시 광고 목록 조회 */
  useEffect(() => {
    loadAdList(adListType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** 고객센터 버튼 설정 */
  useEffect(() => {
    const headerRight = () => (
      <TouchableOpacity activeOpacity={0.8} onPress={() => NasWall.openCs()}>
        <Icon name='help-circle' size={25} color={color.primary} />
      </TouchableOpacity>
    );
    navigation.setOptions({headerRight});
  }, [navigation]);

  /** 광고 목록, 광고 목록 구분, 카테고리가 변경되면, 노출 광고 목록 필터링 */
  useEffect(() => {
    if (adList && loadedAdListType === NasWallAdListType.basic && category !== undefined) {
      setVisibleAdList(adList.filter((ad) => (category ? ad.category === category : true)));
    } else {
      setVisibleAdList(adList);
    }
  }, [adList, loadedAdListType, category]);

  /** 앱 포커스 상태에 따라 광고 목록을 다시 로드 **/
  useEffect(() => {
    let isFocused = true;
    let appStatus: AppStateStatus = AppState.currentState;
    let reloadAdListWhenFocused = false;

    const onFocus = () => {
      isFocused = true;
      if (reloadAdListWhenFocused) {
        // 앱이 백그라운드에서 활성화되었을 때, 현재 화면이 포커스 상태라면 광고 목록을 다시 로드
        reloadAdListWhenFocused = false;
        loadAdList(adListType);
      }
    };
    const onBlur = () => {
      isFocused = false;
    };
    navigation.addListener('focus', onFocus);
    navigation.addListener('blur', onBlur);

    const subscription = AppState.addEventListener('change', (nextAppStatus) => {
      if (appStatus === 'background' && nextAppStatus === 'active') {
        // 앱이 백그라운드에서 활성화되었을 때
        if (isFocused) {
          // 현재 화면이 포커스 상태라면 광고 목록을 다시 로드
          loadAdList(adListType);
        } else {
          // 현재 화면이 포커스 상태가 아니라면, 포커스 되었을 때 광고 목록을 다시 로드 하도록 설정
          reloadAdListWhenFocused = true;
        }
      }
      appStatus = nextAppStatus;
    });

    return () => {
      subscription.remove();
      navigation.removeListener('focus', onFocus);
      navigation.removeListener('blur', onBlur);
    };
  }, [adListType, loadAdList, navigation]);

  /********************************************************************************************************************
   * Event Handler
   * ******************************************************************************************************************/

  /** 광고 목록 아이템을 눌렀을 때 상세 화면으로 이동 */
  const handleItemPress = useCallback(
    (item: NasWallAdInfo) => {
      navigation.navigate('AdDetail', item);
    },
    [navigation],
  );

  /** 광고 목록 아이템 렌더링 */
  const handleRenderItem = useCallback(
    ({item}: ListRenderItemInfo<NasWallAdInfo>) => {
      return <AdListItem info={item} onPress={handleItemPress} />;
    },
    [handleItemPress],
  );

  /** 광고 목록 구분 변경 핸들러 */
  const handleAdListTypeChange = useCallback(
    (newAdListType: NasWallAdListType) => {
      if (newAdListType !== adListType) {
        setAdListType(newAdListType);
        loadAdList(newAdListType);
      }
    },
    [adListType, loadAdList],
  );

  /********************************************************************************************************************
   * ListHeaderComponent
   * ******************************************************************************************************************/

  /** 카테고리 선택 컴포넌트 렌더링 */
  const ListHeaderComponent = useMemo(() => {
    return loadedAdListType === NasWallAdListType.basic && adList ? (
      <Category adList={adList} value={category} onChange={setCategory} />
    ) : null;
  }, [adList, category, loadedAdListType]);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return status === 'error' ? (
    <Container center safeAreaEdges={['bottom']}>
      <ErrorRetry onRetry={() => loadAdList(adListType)} />
    </Container>
  ) : (
    <View style={[styles.container]}>
      {/* 광고 목록 구분 */}
      <ListType value={adListType} onChange={handleAdListTypeChange} />

      {/* 광고 목록 */}
      {visibleAdList && (
        <>
          {visibleAdList.length === 0 ? (
            <Container center absoluteFill>
              <ErrorRetry text='참여 가능한 항목이 없습니다.' />
            </Container>
          ) : (
            <FlatList
              data={visibleAdList}
              renderItem={handleRenderItem}
              ListHeaderComponent={ListHeaderComponent}
              scrollIndicatorInsets={{top: 0.1}}
              contentContainerStyle={{paddingBottom: safeAreaInsets.bottom}}
            />
          )}
        </>
      )}

      {/* 로딩 인디케이터 */}
      {status === 'loading' && (
        <Container center absoluteFill backgroundColor='#00000001' safeAreaEdges={['bottom']}>
          <ActivityIndicator color={'#333'} />
        </Container>
      )}
    </View>
  );
};

/********************************************************************************************************************
 * Style
 * ******************************************************************************************************************/

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
});
