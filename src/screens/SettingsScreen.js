import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../constants/themes';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>设置与隐私</Text>
      <Text style={styles.item}>• 本应用不需要登录，不采集账号信息。</Text>
      <Text style={styles.item}>• 图片仅在本地分析与导出，不上传服务器。</Text>
      <Text style={styles.item}>• 导出功能仅将标注图保存到你的系统相册。</Text>
      <Text style={styles.item}>• 第一版为本地规则引擎，后续可扩展 AI 视觉分析接口。</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
    gap: 10
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 10
  },
  item: {
    color: theme.colors.textSecondary,
    lineHeight: 22,
    fontSize: 15
  }
});
