import React, { useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable, Alert } from 'react-native';
import OverlayCanvas from '../components/OverlayCanvas';
import SuggestionCard from '../components/SuggestionCard';
import { theme } from '../constants/themes';
import { getCropBox, getInitialSuggestionBox } from '../utils/compositionRules';
import { getPhotoTips } from '../utils/photoTips';
import { exportAnnotatedImage } from '../utils/exportImage';

export default function AnalyzeScreen({ route }) {
  const { imageUri, scene = '海边', shotType = '女朋友单人照' } = route.params || {};
  const [imageLayout, setImageLayout] = useState({ width: 320, height: 420 });

  const [suggestionBox, setSuggestionBox] = useState(getInitialSuggestionBox({ width: 320, height: 420 }, shotType));
  const captureRef = useRef(null);

  const tips = useMemo(() => getPhotoTips(scene, shotType), [scene, shotType]);
  const cropBox = useMemo(() => getCropBox(imageLayout, shotType), [imageLayout, shotType]);

  const onImageLayout = (e) => {
    const { width, height } = e.nativeEvent.layout;
    const nextLayout = { width, height };
    setImageLayout(nextLayout);
    setSuggestionBox(getInitialSuggestionBox(nextLayout, shotType));
  };

  const onExport = async () => {
    try {
      await exportAnnotatedImage(captureRef.current);
      Alert.alert('导出成功', '已保存带构图标注的图片到系统相册。');
    } catch (error) {
      Alert.alert('导出失败', error.message || '请检查相册权限');
    }
  };

  const onSaveCard = async () => {
    try {
      await exportAnnotatedImage(captureRef.current);
      Alert.alert('保存成功', '建议卡片已保存（当前为标注图 + 建议卡）。');
    } catch (error) {
      Alert.alert('保存失败', error.message || '请检查相册权限');
    }
  };

  if (!imageUri) {
    return (
      <View style={styles.emptyWrap}>
        <Text style={styles.emptyText}>未检测到图片，请返回首页重新选择。</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View ref={captureRef} collapsable={false} style={styles.captureWrap}>
        <View style={styles.imageWrap} onLayout={onImageLayout}>
          <Image source={{ uri: imageUri }} style={styles.image} resizeMode="cover" />
          <OverlayCanvas
            imageLayout={imageLayout}
            suggestionBox={suggestionBox}
            cropBox={cropBox}
            onMoveBox={setSuggestionBox}
          />
        </View>

        <View style={styles.legend}>
          <Text style={styles.legendText}>黄框：建议站位（可拖动）｜绿框：建议裁剪</Text>
          <Text style={styles.legendText}>粉线：地平线参考｜蓝线：九宫格与中心线</Text>
        </View>

        <SuggestionCard tips={tips} scene={scene} shotType={shotType} />
      </View>

      <Pressable style={styles.actionBtn} onPress={onExport}>
        <Text style={styles.actionBtnText}>导出带构图线标注图</Text>
      </Pressable>

      <Pressable style={styles.secondaryBtn} onPress={onSaveCard}>
        <Text style={styles.secondaryBtnText}>保存拍摄建议卡片</Text>
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
    paddingBottom: theme.spacing.xl,
    gap: 12
  },
  captureWrap: {
    gap: 12
  },
  imageWrap: {
    width: '100%',
    aspectRatio: 3 / 4,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: '#0B1224'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  legend: {
    backgroundColor: '#162238',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 10,
    gap: 4
  },
  legendText: {
    color: theme.colors.textSecondary,
    fontSize: 12
  },
  actionBtn: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 14,
    borderRadius: theme.radius.md,
    alignItems: 'center',
    marginTop: 2
  },
  actionBtnText: {
    color: '#082436',
    fontWeight: '800',
    fontSize: 15
  },
  secondaryBtn: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.card,
    paddingVertical: 14,
    borderRadius: theme.radius.md,
    alignItems: 'center'
  },
  secondaryBtnText: {
    color: theme.colors.textPrimary,
    fontWeight: '700'
  },
  emptyWrap: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24
  },
  emptyText: {
    color: theme.colors.textPrimary,
    textAlign: 'center'
  }
});
