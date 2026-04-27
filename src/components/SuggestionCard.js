import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../constants/themes';

export default function SuggestionCard({ tips, scene, shotType }) {
  if (!tips) return null;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>拍摄建议卡片</Text>
      <Text style={styles.meta}>场景：{scene} ｜ 类型：{shotType}</Text>

      <TipRow label="横竖拍建议" value={tips.orientation} />
      <TipRow label="人物站位" value={tips.position} />
      <TipRow label="手机高度" value={tips.phoneHeight} />
      <TipRow label="镜头焦段" value={tips.zoom} />
      <TipRow label="拍摄方式" value={`${tips.shotMode}；${tips.framing}`} />
      <TipRow label="姿势建议" value={tips.pose} />
      <TipRow label="背景避坑" value={tips.backgroundPitfall} />
      <TipRow label="男友指挥话术" value={tips.script} highlight />
    </View>
  );
}

function TipRow({ label, value, highlight }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, highlight && styles.highlight]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.md,
    gap: 10
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: 18,
    fontWeight: '700'
  },
  meta: {
    color: theme.colors.textSecondary,
    fontSize: 13,
    marginBottom: 4
  },
  row: {
    gap: 4
  },
  label: {
    color: theme.colors.primary,
    fontWeight: '600',
    fontSize: 13
  },
  value: {
    color: theme.colors.textPrimary,
    lineHeight: 20
  },
  highlight: {
    color: '#E9D5FF'
  }
});
