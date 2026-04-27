import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';

export async function exportAnnotatedImage(viewRef) {
  const { status } = await MediaLibrary.requestPermissionsAsync();
  if (status !== 'granted') {
    throw new Error('保存失败：请先授予相册权限');
  }

  const uri = await captureRef(viewRef, {
    format: 'png',
    quality: 1,
    result: 'tmpfile'
  });

  await MediaLibrary.saveToLibraryAsync(uri);
  return uri;
}
