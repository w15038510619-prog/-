const sceneBaseTips = {
  海边: {
    orientation: '竖拍优先，人物更突出；风景特别开阔时可横拍。',
    position: '站在三分线偏左或偏右，留出海平面和浪花层次。',
    phoneHeight: '手机略低于胸口，微微上仰拍更显腿长。',
    zoom: '优先 1x，背景杂乱时切到 2x。',
    pose: '侧身看海、回头笑、轻提裙摆走动。',
    backgroundPitfall: '避免电线杆、垃圾桶、密集游客入镜。',
    script: '“先看海，再慢慢回头看我，步子放慢一点，很好！”'
  },
  古城: {
    orientation: '竖拍更适合街巷纵深；建筑全景可横拍。',
    position: '贴近墙面 0.5 米，利用拱门/巷道做框景。',
    phoneHeight: '手机放在腰到胸之间，保持建筑线条笔直。',
    zoom: '1x 或 2x，压缩杂乱背景。',
    pose: '扶墙回眸、慢走抓拍、手拿帽子或包。',
    backgroundPitfall: '注意招牌文字切头、路人从头顶穿过。',
    script: '“你慢慢往前走，走到那块光里停一下再回头。”'
  },
  街道: {
    orientation: '竖拍更有时尚感；车流线条明显时可横拍。',
    position: '站在斑马线或道路边缘三分点。',
    phoneHeight: '手机接近腰线，轻微仰拍突出身形。',
    zoom: '2x 更利于虚化背景杂物。',
    pose: '插兜走路、撩头发、看向远处。',
    backgroundPitfall: '避开路牌“长在头上”和垃圾袋。',
    script: '“假装在等人，眼神看前面，我连拍三张。”'
  },
  咖啡店: {
    orientation: '竖拍单人，横拍用于桌面+环境故事感。',
    position: '靠窗坐或站，脸部朝向窗光 30 度。',
    phoneHeight: '手机与眼睛同高或略高，避免下巴阴影。',
    zoom: '1x 记录环境，2x 拍半身更干净。',
    pose: '端杯轻抿、看窗外、低头整理头发。',
    backgroundPitfall: '避开凌乱餐具和路人背影。',
    script: '“你先看窗外，我数三下再转头看我。”'
  },
  公园: {
    orientation: '竖拍突出人物，横拍记录草地和树阵。',
    position: '站在树影边缘，形成明暗对比。',
    phoneHeight: '手机略低于胸口，保持地平线平稳。',
    zoom: '1x 为主，花丛细节可 2x。',
    pose: '闻花、转圈、蹲下看草。',
    backgroundPitfall: '避免树枝“穿头”、过曝天空。',
    script: '“先原地转半圈，停住看我，笑一下。”'
  },
  夜景: {
    orientation: '竖拍人像，横拍适合灯光延展。',
    position: '靠近主光源边缘，形成轮廓光。',
    phoneHeight: '手机与胸口齐平，尽量稳住。',
    zoom: '1x 保证进光量，远处霓虹用 2x。',
    pose: '回头、扶栏杆、慢走拖影。',
    backgroundPitfall: '避免强背光导致脸黑，避开杂色霓虹直射。',
    script: '“你慢慢走过来，我不动机位给你拍电影感。”'
  },
  室内: {
    orientation: '竖拍优先，空间感强时可横拍。',
    position: '站在窗边或主灯侧前方，避免顶光直打。',
    phoneHeight: '手机略高于眼睛，脸更精致。',
    zoom: '1x 或 2x，视空间大小决定。',
    pose: '坐姿侧脸、双手互动道具、轻微回眸。',
    backgroundPitfall: '避免天花板灯压头、背景杂物堆叠。',
    script: '“你放松坐着就好，我抓你自然表情。”'
  },
  商场: {
    orientation: '竖拍更出片，扶梯和长廊可横拍。',
    position: '站在灯光均匀区域，借用橱窗反射。',
    phoneHeight: '手机在胸口附近，避免广角畸变。',
    zoom: '2x 常用，压背景更高级。',
    pose: '手拎购物袋走动、回头、扶栏杆。',
    backgroundPitfall: '避免广告牌遮挡和路人抢镜。',
    script: '“往前走两步停一下，侧脸看右边，很好看。”'
  }
};

const typeAdjust = {
  女朋友单人照: '重点突出人物表情和身材线条，建议连拍抓自然瞬间。',
  情侣合照: '两人站位一前一后或并排错位，头部不要重叠。',
  背影照: '让人物朝向景深方向，留更多前方空间。',
  全身照: '脚下留一点空间，避免切脚；轻微广角仰拍显腿长。',
  半身照: '裁切点避开关节，构图落在胸下到腰部更自然。'
};

export function getPhotoTips(scene, type) {
  const base = sceneBaseTips[scene] || sceneBaseTips.街道;

  return {
    ...base,
    framing: typeAdjust[type] || typeAdjust.女朋友单人照,
    shotMode: type
  };
}
