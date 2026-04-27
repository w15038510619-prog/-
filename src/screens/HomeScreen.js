import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import SceneSelector from '../components/SceneSelector';
import { theme } from '../constants/themes';

const SCENES = ['海边', '古城', '街道', '咖啡店', '公园', '夜景', '室内', '商场'];
const SHOT_TYPES = ['女朋友单人照', '情侣合照', '背影照', '全身照', '半身照'];

export default function HomeScreen({ navigation }) {
  const [scene, setScene] = useState('海边');
  const [shotType, setShotType] = useState('女朋友单人照');

  const goPick = (mode) => {
    navigation.navigate('CameraPicker', { mode, scene, shotType });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>旅行拍照更轻松</Text>
      <Text style={styles.subtitle}>选好场景与拍摄类型，一键生成构图与姿势建议。</Text>

      <SceneSelector title="选择拍摄场景" options={SCENES} selected={scene} onChange={setScene} />
      <SceneSelector title="选择拍摄类型" options={SHOT_TYPES} selected={shotType} onChange={setShotType} />

      <Pressable style={styles.primaryBtn} onPress={() => goPick('camera')}>
        <Text style={styles.primaryText}>拍一张现场图</Text>
      </Pressable>

      <Pressable style={styles.secondaryBtn} onPress={() => goPick('library')}>
        <Text style={styles.secondaryText}>从相册选择</Text>
      </Pressable>

      <Pressable style={styles.textBtn} onPress={() => navigation.navigate('Settings')}>
        <Text style={styles.textBtnLabel}>设置与隐私说明</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  content: {
    padding: theme.spacing.md,
    paddingBottom: theme.spacing.xl
  },
  title: {
    fontSize: 26,
    color: theme.colors.textPrimary,
    fontWeight: '800',
    marginBottom: 8
  },
  subtitle: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.lg,
    lineHeight: 22
  },
  primaryBtn: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.md,
    paddingVertical: 14,
    marginTop: 10,
    alignItems: 'center'
  },
  primaryText: {
    color: '#032030',
    fontWeight: '800',
    fontSize: 16
  },
  secondaryBtn: {
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    paddingVertical: 14,
    marginTop: 12,
    alignItems: 'center'
  },
  secondaryText: {
    color: theme.colors.textPrimary,
    fontWeight: '700',
    fontSize: 16
  },
  textBtn: {
    marginTop: 14,
    alignItems: 'center'
  },
  textBtnLabel: {
    color: theme.colors.accent,
    fontSize: 14
  }
});
