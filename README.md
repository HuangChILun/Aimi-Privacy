# Aimi Landing Page

精美的 Galgame 風格 Landing Page，用於收集 email 並展示 Aimi AI Companion 應用。

## 🌸 特色

### 設計風格
- **Galgame/Visual Novel 美學**: 櫻花粉色系 + 金色裝飾
- **新創風格**: 現代、清新、專業
- **Anime 風格圖標**: Lucide Icons + 漸層色彩 + 3D 效果
- **豐富動畫**:
  - 3D 粒子背景 (Three.js)
  - 櫻花飄落動畫 (Canvas)
  - 卡片懸停效果
  - 圖標光暈脈動
  - 滾動觸發動畫
  - 視差效果

### 功能
- ✉️ Email 收集表單 (Loops API 整合)
- 📱 完全響應式設計
- ♿ 無障礙友善 (WCAG 標準)
- 🎨 流暢動畫與過場
- 🔗 隱私政策連結
- 🚀 性能優化

## 📁 檔案結構

```
Aimi-Privacy/
├── landing.html              # 主頁面 (Landing Page)
├── index.html                # 隱私政策
├── terms-of-use.html         # 服務條款
├── css/
│   ├── landing.css           # 主樣式表
│   └── animations.css        # 動畫效果
├── js/
│   ├── landing.js            # 主邏輯
│   ├── particles.js          # 3D 粒子效果
│   ├── sakura.js             # 櫻花動畫
│   └── loops-integration.js  # Email API 整合
└── assets/
    └── images/               # 圖片資源 (需要添加)
```

## 🚀 快速開始

### 1. 配置 Loops API

編輯 `js/loops-integration.js`:

```javascript
const CONFIG = {
  apiKey: 'YOUR_LOOPS_API_KEY_HERE', // 替換為你的 Loops API key
  apiEndpoint: 'https://app.loops.so/api/v1/contacts/create',
  // ...
};
```

**如何獲取 Loops API Key:**
1. 前往 [Loops.so](https://loops.so)
2. 登入你的帳戶
3. 前往 Settings → API
4. 複製你的 API Key
5. 貼到 `CONFIG.apiKey`

### 2. 添加圖片資源 (可選)

將以下資源放入 `assets/images/`:
- 角色頭像圖片
- App 截圖
- App Store / Google Play 徽章

然後更新 HTML 中的對應路徑。

### 3. 部署

#### 選項 A: 靜態網站託管 (推薦)

**Vercel:**
```bash
# 安裝 Vercel CLI
npm install -g vercel

# 部署
cd Aimi-Privacy
vercel
```

**Netlify:**
```bash
# 安裝 Netlify CLI
npm install -g netlify-cli

# 部署
cd Aimi-Privacy
netlify deploy
```

**GitHub Pages:**
1. 推送到 GitHub repository
2. 前往 Settings → Pages
3. 選擇 branch 和 folder
4. 保存並等待部署

#### 選項 B: 本地測試

使用任何靜態伺服器:

```bash
# Python 3
python -m http.server 8000

# Node.js (http-server)
npx http-server -p 8000

# VS Code Live Server extension
# 右鍵點擊 landing.html → Open with Live Server
```

然後訪問 `http://localhost:8000/landing.html`

## 🎨 自訂設計

### 圖標系統

**使用的圖標庫**: [Lucide Icons](https://lucide.dev)
- ✅ 完全免費,MIT 授權
- ✅ 優雅的 SVG 線條圖標
- ✅ 搭配 Galgame 漸層色彩

**當前圖標**:
1. `user-circle` - 3D Characters (櫻花粉→淡紫)
2. `message-circle` - Conversations (玫瑰粉→金色)
3. `book-open` - Story Mode (淡紫→金色)
4. `mic` - Voice Interaction (金色→玫瑰粉)
5. `sparkles` - Create Your Own (彩虹漸層)
6. `shield-check` - Privacy (綠色→金色)

**更換圖標**:
1. 訪問 [Lucide Icons](https://lucide.dev/icons/)
2. 找到喜歡的圖標
3. 複製圖標名稱
4. 在 `landing.html` 中替換 `data-lucide="icon-name"`

```html
<!-- 範例:替換為 heart 圖標 -->
<i data-lucide="heart" class="card-icon-svg"></i>
```

### 顏色配置

編輯 `css/landing.css` 的 CSS 變數:

```css
:root {
  /* 主色系 */
  --sakura-pink: #FFE5EC;
  --rose-pink: #FFC9D9;
  --deep-rose: #FFB3C6;

  /* 輔色系 */
  --lavender: #F0E6FF;
  --gold: #FFD89C;

  /* 根據需求調整... */
}
```

**自訂圖標漸層**:
編輯 `landing.html` 中的 SVG gradient 定義來改變圖標顏色。

### 動畫配置

編輯各 JS 檔案的 `CONFIG` 物件:

**粒子效果** (`js/particles.js`):
```javascript
const CONFIG = {
  particleCount: 100,        // 粒子數量
  particleSize: 3,           // 粒子大小
  moveSpeed: 0.2,            // 移動速度
  // ...
};
```

**櫻花動畫** (`js/sakura.js`):
```javascript
const CONFIG = {
  petalCount: 30,            // 花瓣數量
  minSpeed: 1,               // 最小下落速度
  maxSpeed: 3,               // 最大下落速度
  windSpeed: 0.5,            // 風速
  // ...
};
```

## 📧 Email 收集

### Demo 模式

如果未配置 Loops API key，表單會在 **demo 模式** 運行:
- Email 會儲存到 `localStorage`
- 顯示成功訊息
- Console 會顯示警告

### 生產模式

配置 API key 後:
- Email 會提交到 Loops
- 本地備份到 `localStorage`
- 錯誤處理與重試邏輯
- 防止重複提交

### 查看收集的 Email

**Loops Dashboard:**
1. 登入 Loops.so
2. 前往 Contacts
3. 查看新訂閱者

**本地備份:**
```javascript
// 在瀏覽器 Console 執行:
JSON.parse(localStorage.getItem('aimi_waitlist'))
```

## 🎯 功能介紹

### Hero 區塊
- 主視覺 + 標題
- Email 收集表單
- 3D 粒子背景
- 角色預覽卡片

### Features 區塊
- 6 個功能卡片
- 懸停 3D 傾斜效果
- 滾動觸發動畫

### Characters 區塊
- 水平滾動輪播
- 預設角色展示
- Galgame 風格卡片

### Screenshots 區塊
- 截圖展示網格
- 影片佔位符
- VN 風格裝飾框

### CTA 區塊
- 重複 Email 表單
- 漸層背景
- 最後行動呼籲

### Footer
- 連結到隱私政策
- 聯絡資訊
- 版權聲明

## 📱 響應式設計

自動適配:
- **桌面** (1200px+): 完整動畫效果
- **平板** (768-1199px): 簡化部分效果
- **手機** (< 768px): 優化觸控體驗

## ♿ 無障礙功能

- 語意化 HTML
- ARIA 標籤
- 鍵盤導航支援
- Focus 指示器
- 尊重 `prefers-reduced-motion`

## 🔧 故障排除

### 粒子動畫不顯示
- 確認 Three.js 已載入
- 檢查瀏覽器 Console 是否有錯誤
- 確認 WebGL 支援: `chrome://gpu`

### 表單提交失敗
- 檢查 Loops API key 是否正確
- 查看 Network tab 確認請求
- 檢查 CORS 設定

### 動畫卡頓
- 減少粒子/花瓣數量
- 在手機上禁用部分效果
- 檢查其他腳本衝突

### 樣式問題
- 清除瀏覽器快取
- 檢查 CSS 檔案路徑
- 確認檔案正確載入

## 🚀 性能優化

已實施:
- ✅ GPU 加速動畫
- ✅ 節流滾動事件
- ✅ 懶載入圖片 (準備好)
- ✅ 程式碼分割
- ✅ 響應式粒子數量
- ✅ Tab 隱藏時暫停動畫

建議:
- 壓縮圖片 (WebP 格式)
- 啟用 Gzip/Brotli 壓縮
- 使用 CDN 託管資源
- 實施 Service Worker

## 📊 分析整合

### Google Analytics (可選)

在 `<head>` 添加:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

Email 提交會自動觸發轉換事件。

## 📝 授權

© 2025 Chi-Lun Huang (Aimi). All rights reserved.

---

## 💡 使用提示

1. **替換佔位圖片**: 用真實的 App 截圖和角色圖片
2. **更新文案**: 根據你的品牌調整標題和描述
3. **測試表單**: 先在測試環境驗證 Loops 整合
4. **SEO 優化**: 更新 meta 標籤、Open Graph 標籤
5. **監控效能**: 使用 Lighthouse 檢查性能分數

## 🆘 需要幫助?

- **Email**: thomas.huang.ai@gmail.com
- **Issues**: 在 GitHub 上開 Issue
- **文檔**: 查看 Loops 和 Three.js 官方文檔

---

Made with 💖 for Aimi
