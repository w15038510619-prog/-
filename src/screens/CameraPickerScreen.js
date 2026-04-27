import React, { useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { theme } from '../constants/themes';

export default function CameraPickerScreen({ route, navigation }) {
  const { mode = 'camera', scene, shotType } = route.params || {};

  useEffect(() => {
    const openByMode = async () => {
      if (mode === 'camera') {
        await pickByCamera();
      } else {
        await pickByLibrary();
      }
    };

    openByMode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  const goAnalyze = (uri) => {
    navigation.replace('Analyze', { imageUri: uri, scene, shotType });
  };

  const pickByCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('需要权限', '请允许相机权限后再拍照');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: false,
      quality: 1
    });

    if (!result.canceled && result.assets?.length) {
      goAnalyze(result.assets[0].uri);
    }
  };

  const pickByLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('需要权限', '请允许相册权限后再选图');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: false,
      quality: 1
    });

    if (!result.canceled && result.assets?.length) {
      goAnalyze(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>请选择操作</Text>
      <Text style={styles.desc}>如果系统弹窗关闭了，你也可以手动重新触发。</Text>

      <Pressable style={styles.button} onPress={pickByCamera}>
        <Text style={styles.buttonText}>重新打开相机</Text>
      </Pressable>

      <Pressable style={styles.buttonOutline} onPress={pickByLibrary}>
        <Text style={styles.buttonOutlineText}>重新打开相册</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    padding: theme.spacing.lg
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center'
  },
  desc: {
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 20,
    lineHeight: 20
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 14,
    borderRadius: theme.radius.md,
    alignItems: 'center',
    marginBottom: 12
  },
  buttonText: {
    color: '#0D2132',
    fontWeight: '800'
  },
  buttonOutline: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingVertical: 14,
    borderRadius: theme.radius.md,
    alignItems: 'center'
  },
  buttonOutlineText: {
    color: theme.colors.textPrimary,
    fontWeight: '700'
  }
});
