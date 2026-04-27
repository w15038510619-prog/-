export function getInitialSuggestionBox(imageLayout, type) {
  const { width, height } = imageLayout;
  const defaults = {
    x: width * 0.35,
    y: height * 0.25,
    width: width * 0.3,
    height: height * 0.5
  };

  const presets = {
    女朋友单人照: { ...defaults, y: height * 0.22, height: height * 0.56 },
    情侣合照: { x: width * 0.2, y: height * 0.24, width: width * 0.6, height: height * 0.55 },
    背影照: { ...defaults, y: height * 0.2, height: height * 0.58 },
    全身照: { ...defaults, y: height * 0.14, height: height * 0.74 },
    半身照: { ...defaults, y: height * 0.24, height: height * 0.44 }
  };

  return presets[type] || defaults;
}

export function getCropBox(imageLayout, type) {
  const { width, height } = imageLayout;
  if (type === '全身照') {
    return { x: width * 0.1, y: height * 0.05, width: width * 0.8, height: height * 0.9 };
  }

  if (type === '半身照') {
    return { x: width * 0.16, y: height * 0.12, width: width * 0.68, height: height * 0.72 };
  }

  return { x: width * 0.12, y: height * 0.08, width: width * 0.76, height: height * 0.82 };
}
