import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './src/screens/HomeScreen';
import CameraPickerScreen from './src/screens/CameraPickerScreen';
import AnalyzeScreen from './src/screens/AnalyzeScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { theme } from './src/constants/themes';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: theme.colors.background },
          headerTintColor: theme.colors.textPrimary,
          contentStyle: { backgroundColor: theme.colors.background }
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: '人像拍照构图助手' }} />
        <Stack.Screen name="CameraPicker" component={CameraPickerScreen} options={{ title: '拍照 / 选图' }} />
        <Stack.Screen name="Analyze" component={AnalyzeScreen} options={{ title: '分析与建议' }} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: '设置' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
