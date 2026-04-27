# 人像拍照构图助手 App（React Native + Expo）

一个面向旅行拍照场景的手机版构图助手，主要用于给女朋友拍照时提供：构图、站位、姿势、光线与现场指挥话术建议。

## 功能概览

- 首页双入口：
  - 拍一张现场图
  - 从相册选择
- 场景选择：海边、古城、街道、咖啡店、公园、夜景、室内、商场
- 拍摄类型：女朋友单人照、情侣合照、背影照、全身照、半身照
- 分析页叠加标注：
  - 九宫格构图线
  - 三分法交点
  - 中心线
  - 人物建议站位框（支持拖动）
  - 建议裁剪框
  - 地平线参考线
- 本地规则版建议引擎（无需 AI 接口）
- 导出带标注图片
- 保存拍摄建议卡片（当前导出为标注画布 + 建议卡）
- 全中文界面、简洁高级暗色 UI

---

## 1. 如何安装依赖

> 需要先安装 Node.js（建议 18+）与 npm。

```bash
npm install
```

---

## 2. 如何启动项目

```bash
npm run start
```

启动后会打开 Expo Dev Tools，并显示二维码。

---

## 3. 如何在手机上用 Expo Go 预览

1. 手机安装 **Expo Go**（Android/iOS 均可）。
2. 保证手机和电脑在同一网络。
3. 在终端执行：
   ```bash
   npm run start
   ```
4. 用 Expo Go 扫描终端或网页中的二维码。
5. 进入 App 后即可选择拍照或相册图片进行本地构图分析。

---

## 4. 如何打包 Android APK

推荐使用 EAS Build。

1. 安装 EAS CLI：
   ```bash
   npm install -g eas-cli
   ```
2. 登录 Expo 账号：
   ```bash
   eas login
   ```
3. 初始化构建配置：
   ```bash
   eas build:configure
   ```
4. 构建 Android APK：
   ```bash
   eas build -p android --profile preview
   ```
5. 构建完成后，按提示下载 APK 安装包。

> 若你只需要本地开发调试，也可使用 `npm run android`（需本机 Android 环境）。

---

## 5. 隐私说明

- 图片仅在本地处理与绘制构图标注。
- 不上传服务器，不做云端存储。
- 不需要登录，不需要账号系统。
- 导出仅保存到用户本地系统相册。

---

## 6. 后续如何接入 AI 视觉分析接口

当前版本使用 `src/utils/photoTips.js` + `src/utils/compositionRules.js` 的本地规则。

可按以下步骤扩展：

1. 在 `src/utils/` 新增 `aiVisionService.js`，封装图像分析 API 请求。
2. 在 `AnalyzeScreen` 中加入“本地规则 / AI 分析”开关。
3. 优先本地匿名化预处理（压缩、脱敏可选），再决定是否上传。
4. 将 AI 返回的人体关键点、地平线、主体框映射到 `OverlayCanvas`。
5. 保留本地规则作为离线兜底方案。

建议增加：
- 超时回退机制（接口超时自动退回本地规则）
- 本地缓存最近分析结果
- 明确的用户授权弹窗与隐私条款

---

## 项目结构

```text
photo_pose_app/
├─ App.js
├─ package.json
├─ app.json
├─ src/
│  ├─ screens/
│  │  ├─ HomeScreen.js
│  │  ├─ CameraPickerScreen.js
│  │  ├─ AnalyzeScreen.js
│  │  └─ SettingsScreen.js
│  ├─ components/
│  │  ├─ OverlayCanvas.js
│  │  ├─ SuggestionCard.js
│  │  └─ SceneSelector.js
│  ├─ utils/
│  │  ├─ compositionRules.js
│  │  ├─ exportImage.js
│  │  └─ photoTips.js
│  └─ constants/
│     └─ themes.js
└─ README.md
```
