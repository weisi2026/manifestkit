# Spec: ManifestKit — 灵性工具站 MVP (Manifestation Toolkit)

## Objective

构建一个英文界面的灵性/显化工具站，首个MVP包含4个核心工具。目标用户为全球英语国家的灵性修行者、吸引力法则实践者。

**用户故事：**
- 作为一个显化实践者，我想设定一个意图+倒计时，看到视觉化进度条
- 作为一个灵性修行者，我想生成个性化每日肯定语，收藏和分享
- 作为一个许愿者，我想创建可视化愿景板，把目标和梦想可视化
- 作为一个月相追踪者，我想看到当前月相+月相日历+对应的意图建议
- 作为一个站长，我想通过AdSense变现（灵性类CPC $2-8）

**成功标准：**
- LCP < 2.5s, CLS < 0.1, FID < 100ms（Core Web Vitals全绿）
- 移动端完美适配（70%+流量来自手机）
- AdSense广告位就位（至少3个广告位）
- SEO基础到位（结构化数据、meta标签、sitemap）
- 所有工具纯前端运行，无需后端/数据库（localStorage持久化）

## Tech Stack

- **静态站生成器：** Astro v5（零JS默认=极致性能+SEO友好）
- **样式：** Tailwind CSS v4（快速响应式开发，紫金灵性色调）
- **交互逻辑：** Vanilla JS（工具逻辑无需框架）
- **图表/动画：** CSS动画 + Canvas（月相绘制、进度环）
- **部署：** Cloudflare Pages（已有项目 manifestkit.cc.cd）
- **域名：** manifestkit.cc.cd
- **分析：** Google Analytics 4 + AdSense (pub-6056859786205773)
- **数据持久化：** localStorage（用户意图/愿望本地存储，无需登录）

## Commands

```bash
Dev:      npm run dev
Build:    npm run build
Preview:  npm run preview
```

## Project Structure

```
sites/manifestkit/
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro       → 全站布局（header/footer/AdSense/Analytics）
│   ├── components/
│   │   ├── ManifestTimer.astro     → 显化计时器组件
│   │   ├── AffirmationGen.astro   → 每日肯定语生成器
│   │   ├── VisionBoard.astro      → 愿望愿景板
│   │   ├── MoonPhase.astro        → 月相日历+当前月相
│   │   ├── AdBanner.astro         → AdSense广告位组件
│   │   └── SEOMeta.astro          → 结构化数据+meta标签
│   ├── pages/
│   │   ├── index.astro             → 首页：4工具Hub
│   │   ├── manifest-timer.astro    → 显化计时器
│   │   ├── affirmation-generator.astro → 肯定语生成器
│   │   ├── vision-board.astro      → 愿景板
│   │   ├── moon-phase.astro        → 月相日历
│   │   ├── about.astro             → 关于页
│   │   └── 404.astro               → 自定义404
│   ├── lib/
│   │   ├── moon-phase.ts           → 月相计算（纯数学，无API）
│   │   ├── affirmations.ts         → 肯定语数据库+随机/分类算法
│   │   ├── manifest-storage.ts     → localStorage CRUD（意图/愿望）
│   │   └── moon-data.ts            → 月相名/意图建议数据
│   └── styles/
│       └── global.css              → 全局样式+灵性主题CSS变量
├── public/
│   ├── ads.txt                     → AdSense验证
│   ├── robots.txt                  → SEO爬虫规则
│   ├── favicon.svg                 → 紫莲花favicon
│   └── og-image.png               → 社交分享图（1200x630）
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## Pages & Features

### 1. 首页 (index.astro) — 工具Hub
- 英雄区：标题 "ManifestKit — Your Spiritual Toolkit" + 副标题 + CTA
- 4工具卡片：每个工具一个精美卡片（图标+名称+描述+链接）
- 底部：今日月相小组件（自动显示当前月相）
- SEO标题: "ManifestKit — Free Manifestation Tools & Spiritual Calculator"
- Schema: WebSite + SoftwareApplication

### 2. 显化计时器 (manifest-timer.astro)
- 输入：意图描述 + 目标日期 + 意图类别（健康/财富/关系/事业/灵性成长）
- 显示：圆形进度环（Canvas绘制）+ 剩余天数 + 意图文字
- 功能：多个意图并行（localStorage存储）
- 视觉：紫色渐变进度环，完成后金色光芒动画
- SEO标题: "Free Manifestation Timer — Set Intentions & Track Progress"

### 3. 肯定语生成器 (affirmation-generator.astro)
- 分类：信心、丰盛、健康、爱、成功、平静、感恩
- 功能：选择分类→点击生成→显示随机肯定语→可收藏
- 收藏夹：localStorage存储收藏的肯定语
- 分享：复制到剪贴板功能
- 每日肯定：基于日期的种子生成"今日肯定语"（每天固定一句）
- 数据：6个分类×20条=120条预置肯定语
- SEO标题: "Daily Affirmation Generator — Free Personalized Affirmations"

### 4. 愿景板 (vision-board.astro)
- 功能：3x3网格布局，每个格子可输入愿望文字+选颜色
- 预设主题：Dream Life / Career / Health / Relationship / Abundance
- 操作：点击格子→输入愿望→选背景色→保存→导出为图片（Canvas生成）
- localStorage持久化
- SEO标题: "Free Vision Board Maker — Visualize Your Dreams Online"

### 5. 月相日历 (moon-phase.astro)
- 当前月相：Canvas绘制月相图+月相名称+照明百分比
- 月相日历：当月每日月相标记（新月/上弦/满月/下弦）
- 意图建议：每个月相对应不同显化意图
  - 新月 → 设定新意图
  - 上弦 → 采取行动
  - 满月 → 感恩与释放
  - 下弦 → 放下与休息
- 纯数学计算月相（基于已知新月日期推算，无API调用）
- SEO标题: "Moon Phase Calendar — Manifest with Lunar Cycles"

### 6. 关于页 (about.astro)
- 品牌故事：ManifestKit的使命
- E-E-A-T信号：为什么做这个站
- 联系方式

## Design System — 灵性主题

```css
:root {
  /* 主色调：深紫 */
  --color-primary: #7C3AED;        /* violet-600 */
  --color-primary-light: #A78BFA;  /* violet-400 */
  --color-primary-dark: #5B21B6;   /* violet-800 */
  /* 点缀：金色 */
  --color-accent: #D4AF37;         /* 金色 */
  --color-accent-light: #F5D060;   /* 浅金 */
  /* 背景：深邃夜空 */
  --color-bg-dark: #0F0A1E;        /* 深紫黑 */
  --color-bg-card: #1A1333;        /* 卡片背景 */
  /* 文字 */
  --color-text: #E8E0F0;           /* 浅紫白 */
  --color-text-muted: #9B8CB8;     /* 淡紫灰 */
}
```

- **风格：** 深色主题（夜空感）+ 紫金色调 + 星光点缀
- **字体：** 系统字体栈（无需加载外部字体，保证性能）
- **图标：** Emoji + CSS绘制（🌙✨🔮💫⭐🌟🙏💜🌙🌕）
- **动画：** CSS星光闪烁、进度环渐变、卡片hover发光

## AdSense 广告位

1. **顶部横幅** — 页面顶部（728x90 / 响应式）
2. **内容中间** — 工具结果下方（300x250）
3. **侧边栏/底部** — 页面底部锚定广告

全部使用 `data-ad-client="ca-pub-6056859786205773"` + `data-ad-slot="auto"`

## SEO Strategy

### 目标关键词（按优先级）
| 关键词 | 月搜索量 | CPC | 页面 |
|--------|---------|-----|------|
| manifestation timer | 3,600 | $3-5 | /manifest-timer |
| affirmation generator | 18,100 | $2-4 | /affirmation-generator |
| vision board maker | 8,100 | $2-3 | /vision-board |
| moon phase calendar | 40,500 | $1-2 | /moon-phase |
| manifestation tools | 2,400 | $3-6 | / (首页) |

### Schema.org 结构化数据
- 首页: WebSite + SoftwareApplication
- 各工具页: WebApplication + BreadcrumbList
- 关于页: Organization

### Sitemap
- Astro @astrojs/sitemap 自动生成

## Analytics

- **GA4:** 待配置（新建Measurement ID）
- **AdSense:** pub-6056859786205773（已有账号，直接复用）

## Out of Scope (MVP不做)

- ❌ 用户登录/注册
- ❌ 后端服务器/数据库
- ❌ AI生成肯定语（MVP用预置库，后续可接入AI）
- ❌ 付费功能/订阅
- ❌ 社交分享到平台（仅复制到剪贴板）
- ❌ PWA支持

## File Templates

### ads.txt
```
google.com, pub-6056859786205773, DIRECT, f08c47fec0942fa0
```

### robots.txt
```
User-agent: *
Allow: /
Sitemap: https://manifestkit.cc.cd/sitemap-index.xml
```

### astro.config.mjs
```js
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://manifestkit.cc.cd',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()]
  }
});
```

### package.json scripts
```json
{
  "name": "manifestkit",
  "type": "module",
  "version": "1.0.0",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  },
  "dependencies": {
    "astro": "^5.0.0",
    "@astrojs/sitemap": "^3.0.0"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.0.0",
    "tailwindcss": "^4.0.0"
  }
}
```

## Implementation Priority

1. **P0 — 基础骨架** — BaseLayout + 首页 + AdSense + SEO
2. **P1 — 显化计时器** — 核心差异化工具
3. **P1 — 肯定语生成器** — 最容易做、SEO流量最大
4. **P2 — 月相日历** — 天然复访驱动（用户每天看月相）
5. **P2 — 愿景板** — 交互性最强但开发量大
6. **P0 — About/404** — 收尾