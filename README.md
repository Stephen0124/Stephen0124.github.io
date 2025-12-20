# Stephen0124.github.io

你好，欢迎来到我的博客，一个尝试模仿 Fuwari 的**纯静态**网站。

这里没有复杂的 `npm install`，一切回归**简单**。

## 为什么选择静态？
* 🚀 **速度极快**：没有后端计算。
* ☁️ **部署简单**：丢进 GitHub 就能跑。
* ✨ *Zero Config*：修改 HTML 即可自定义。

> Simplicity is the ultimate sophistication.
>
> — Leonardo da Vinci

## 网站结构
```bash
/ (根目录)
├── index.html          # 主页入口
├── config.json         # 网站配置
├── posts.json          # 文章列表索引
├── assets/
│   ├── avatar.png      # 头像
│   └── ...
├── css/
│   └── style.css       # 自定义样式
├── js/
│   ├── app.js          # 核心逻辑
│   └── ...
└── posts/
    ├── post.md  # 文章
    └── ...
```

## 异步内容加载
该博客采用的是 **SPA 异步内容解耦架构**：
- 博客加载的是一个 posts.json，其中包含所有需要加载的文章元数据。
- 当用户点击某篇文章时，通过 `JS` 拦截路由，从 `URL` 中提取 `post` 参数。
- 浏览器接收到的是 Markdown 原始文本，随后由前端解析器将其转化为 `HTML`。

## 技术栈
- **前端样式**: Tailwind CSS 3.4.1
- **路由机制**: JavaScript SPA 架构
- **文档处理**: Marked.js
- **代码高亮**: Highlight.js 
- **图标方案**: Inline SVG 封装
- **托管平台**: GitHub Pages

## 优化计划
- [ ] 添加搜索功能（文章数 > 20 再考虑）
- [ ] 添加音乐播放器（尽量轻量化）
- [ ] 迁至云服务器（有钱再说）

## 联系方式
欢迎通过网站主页的联系方式与我取得联系。

