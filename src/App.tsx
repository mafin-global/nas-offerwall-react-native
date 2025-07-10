import './global';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AdDetailScreen, CustomOfferWallScreen, HomeScreen, PurchaseItemScreen} from './screens';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import type {RootScreenList} from './common';

const Stack = createNativeStackNavigator<RootScreenList>();

function RootStack() {
  return (
    <Stack.Navigator
      initialRouteName='Home'
      screenOptions={{headerStyle: {backgroundColor: color.background}, headerShadowVisible: false}}>
      <Stack.Screen name='Home' component={HomeScreen} options={{title: 'NAS 오퍼월 SDK'}} />
      <Stack.Screen
        name='CustomOfferWall'
        component={CustomOfferWallScreen}
        options={{title: '개발자 정의 UI 오퍼월'}}
      />
      <Stack.Screen
        name='AdDetail'
        component={AdDetailScreen}
        options={{headerShown: false, presentation: 'transparentModal', animation: 'none'}}
      />
      <Stack.Screen name='PurchaseItem' component={PurchaseItemScreen} options={{title: '아이템 구입'}} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
