export const NasWallServerType = {
  developer: 'developer',
  nas: 'nas',
} as const;
export type NasWallServerType = keyof typeof NasWallServerType;

export const NasWallEnv: {
  /**
   * 테스트 모드 여부
   *
   * `true` 로 설정 시 테스트 광고가 표시됩니다.
   */
  testMode: boolean;

  /**
   * 적립금 관리 서버
   *
   * "적립금 관리 서버" 설정은 NAS 개발자 홈페이지의 "매체 관리" 메뉴에서 설정을 통해 확인 및 변경할 수 있습니다.
   *
   * - NasWallServerType.developer: 개발자 서버에서 적립금 관리
   * - NasWallServerType.nas: NAS 서버에서 적립금 관리
   */
  serverType: NasWallServerType;

  /**
   * 앱 KEY
   *
   * NAS 개발자 홈페이지의 "매체 관리" 메뉴에서 확인 가능합니다.
   */
  appKey: string;

  /**
   * 회원 데이터
   *
   * "개발자 서버에서 적립금 관리" 시 사용됩니다.
   *
   * 회원 ID 등의 적립금 지급에 필요한 고유한 회원 정보를 지정합니다. 광고 참여 완료 시 개발자 서버로 콜백 호출될 때 함께 제공됩니다.
   *
   * ‼️ 회원 로그인 시 값을 지정해주세요.
   */
  userData: string;

  /**
   * 회원 ID
   *
   * "NAS 서버에서 적립금 관리" 시 사용됩니다.
   *
   * 회원 ID 등의 고유한 회원 정보를 지정합니다.
   *
   * ‼️ 회원 로그인 시 값을 지정해주세요.
   */
  userId: string;
} = {
  // 테스트 모드 여부
  // TODO: 테스트 모드 여부를 설정해주세요.
  testMode: false,

  // 적립금 관리 서버
  // TODO: 적립금 관리 서버를 설정해주세요.
  serverType: NasWallServerType.developer, // 개발자 서버에서 적립금 관리
  // serverType: NasWallServerType.nas, // NAS 서버에서 적립금 관리

  // 앱 KEY
  // TODO: 앱 KEY를 설정해주세요.
  appKey: 'YOUR_APP_KEY',

  // 회원 데이터
  // TODO: 회원 데이터를 설정해주세요.
  userData: 'YOUR_USER_DATA',

  // 회원 ID
  // TODO: 회원 ID를 설정해주세요.
  userId: 'YOUR_USER_ID',
};

export default NasWallEnv;
