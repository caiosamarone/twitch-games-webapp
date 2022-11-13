import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StyleSheet, Text, View } from 'react-native';
import Game from '../screens/Game';
import Home from '../screens/Home';

const { Navigator, Screen } = createNativeStackNavigator();

const AppRoutes = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="home" component={Home} />
      <Screen name="game" component={Game} />
    </Navigator>
  );
};

export default AppRoutes;

const styles = StyleSheet.create({});
