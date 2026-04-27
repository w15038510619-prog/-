import React, { useMemo, useRef } from 'react';
import { View, StyleSheet, PanResponder } from 'react-native';

export default function OverlayCanvas({ imageLayout, suggestionBox, cropBox, onMoveBox }) {
  const panStart = useRef({ x: 0, y: 0 });

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
          panStart.current = { x: suggestionBox.x, y: suggestionBox.y };
        },
        onPanResponderMove: (_, gesture) => {
          const maxX = imageLayout.width - suggestionBox.width;
          const maxY = imageLayout.height - suggestionBox.height;

          const nextX = Math.max(0, Math.min(maxX, panStart.current.x + gesture.dx));
          const nextY = Math.max(0, Math.min(maxY, panStart.current.y + gesture.dy));

          onMoveBox({ ...suggestionBox, x: nextX, y: nextY });
        }
      }),
    [imageLayout.height, imageLayout.width, onMoveBox, suggestionBox]
  );

  const v1 = imageLayout.width / 3;
  const v2 = (imageLayout.width * 2) / 3;
  const h1 = imageLayout.height / 3;
  const h2 = (imageLayout.height * 2) / 3;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
      <Line style={{ left: v1, top: 0, bottom: 0 }} />
      <Line style={{ left: v2, top: 0, bottom: 0 }} />
      <Line style={{ top: h1, left: 0, right: 0, height: 1 }} horizontal />
      <Line style={{ top: h2, left: 0, right: 0, height: 1 }} horizontal />

      <Line style={{ left: imageLayout.width / 2, top: 0, bottom: 0, opacity: 0.85 }} />
      <Line style={{ top: imageLayout.height / 2, left: 0, right: 0, height: 1, opacity: 0.85 }} horizontal />

      <Dot style={{ left: v1 - 5, top: h1 - 5 }} />
      <Dot style={{ left: v2 - 5, top: h1 - 5 }} />
      <Dot style={{ left: v1 - 5, top: h2 - 5 }} />
      <Dot style={{ left: v2 - 5, top: h2 - 5 }} />

      <View style={[styles.horizon, { top: imageLayout.height * 0.42 }]} />

      <View
        style={[
          styles.cropBox,
          { left: cropBox.x, top: cropBox.y, width: cropBox.width, height: cropBox.height }
        ]}
      />

      <View
        {...panResponder.panHandlers}
        style={[
          styles.suggestionBox,
          {
            left: suggestionBox.x,
            top: suggestionBox.y,
            width: suggestionBox.width,
            height: suggestionBox.height
          }
        ]}
      />
    </View>
  );
}

function Line({ style, horizontal }) {
  return <View style={[horizontal ? styles.hLine : styles.vLine, style]} />;
}

function Dot({ style }) {
  return <View style={[styles.dot, style]} />;
}

const styles = StyleSheet.create({
  vLine: {
    position: 'absolute',
    width: 1,
    backgroundColor: 'rgba(56,189,248,0.7)'
  },
  hLine: {
    position: 'absolute',
    backgroundColor: 'rgba(56,189,248,0.7)'
  },
  dot: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#A78BFA'
  },
  horizon: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 2,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(236, 72, 153, 0.75)'
  },
  suggestionBox: {
    position: 'absolute',
    borderColor: '#F59E0B',
    borderWidth: 2,
    borderRadius: 14,
    backgroundColor: 'rgba(245, 158, 11, 0.18)'
  },
  cropBox: {
    position: 'absolute',
    borderColor: 'rgba(34,197,94,0.9)',
    borderStyle: 'dashed',
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: 'rgba(34,197,94,0.1)'
  }
});
