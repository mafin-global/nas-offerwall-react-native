import { StyleSheet, Text, View } from 'react-native';
import { Divider, Panel, PanelItem, Stack } from '../../../controls';
import Icon from '@react-native-vector-icons/material-design-icons';
import NasWallEnv, { NasWallServerType } from '../../../NasWallEnv';

interface Props {
  expand?: boolean;
}

export const EnvInfoPanel = ({ expand }: Props) => {
  /********************************************************************************************************************
   * State
   * ******************************************************************************************************************/

  // 확장 여부
  const [isExpand, setIsExpand] = useState(false);

  /********************************************************************************************************************
   * Effect
   * ******************************************************************************************************************/

  useEffect(() => {
    if (expand !== undefined) {
      setIsExpand(expand);
    }
  }, [expand]);

  /********************************************************************************************************************
   * Render
   * ******************************************************************************************************************/

  return (
    <Panel>
      <PanelItem icon="cog" onPress={() => setIsExpand(prev => !prev)}>
        <Stack spacing={12}>
          <View style={styles.titleContainer}>
            <Text>
              설정 정보 ({NasWallEnv.testMode ? '테스트' : '라이브'} 모드)
            </Text>

            {/* 우측 인디케이터 아이콘 */}
            <Icon
              name={isExpand ? 'chevron-up' : 'chevron-down'}
              size={20}
              style={styles.icon}
            />
          </View>
        </Stack>
      </PanelItem>

      {/* 상세 정보 */}
      {isExpand && (
        <PanelItem>
          <Stack paddingLeft={16} spacing={12}>
            <Item label="앱 KEY" value={NasWallEnv.appKey} />

            <Divider />

            <Item
              label="적립금 관리 서버"
              value={
                NasWallEnv.serverType === NasWallServerType.nas
                  ? 'NAS 서버'
                  : '개발자 서버'
              }
            />

            <Divider />

            <Item
              label={
                NasWallEnv.serverType === NasWallServerType.nas
                  ? '회원 ID'
                  : '회원 데이터'
              }
              value={
                NasWallEnv.serverType === NasWallServerType.nas
                  ? NasWallEnv.userId
                  : NasWallEnv.userData
              }
            />
          </Stack>
        </PanelItem>
      )}
    </Panel>
  );
};

export default EnvInfoPanel;

/********************************************************************************************************************
 * Item
 * ******************************************************************************************************************/

const Item = ({ label, value }: { label: string; value: string }) => {
  return (
    <Stack spacing={3}>
      <Text style={styles.label}>{label}</Text>
      <Text>{value}</Text>
    </Stack>
  );
};

/********************************************************************************************************************
 * Style
 * ******************************************************************************************************************/

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    marginVertical: -10,
  },
  label: {
    fontSize: 13,
    opacity: 0.5,
  },
});
