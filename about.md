<style>
    /* 隐藏文章元数据栏 (日期、分类、标签) */
    #article-meta {
        display: none !important;
    }
    
    /* 可选：如果你也不想要标题，把下面这行也加上 */
    #article-title { display: none !important; }
    
    /* 可选：调整一下顶部间距，因为隐藏了元数据，可能会觉得上面太空 */
    #article-content {
        margin-top: -1rem;
    }
</style>

<div class="flex flex-col items-center my-10 fade-in-up">
    <img src="https://avatars.githubusercontent.com/u/103046213?v=4" class="w-40 h-40 !rounded-full object-cover shadow-xl hover:rotate-12 transition-transform duration-500 mb-6">
    <h2 class="text-3xl font-bold text-gray-800 dark:text-white mb-2">👋 你好，我是 SteCheng</h2>
    <p class="text-gray-500 dark:text-gray-400 max-w-lg text-center">
        欢迎来到我的博客。这是一个纯静态网站，主要分享我的个人项目以及日常随记
    </p>
</div>

### 🌟 关于本站

**为什么是博客？**
起初，我想做一个严肃的个人学术网站。但在整理过往成果时，我发现……嗯，好像暂时没什么拿得出手的成果。于是我决定放下包袱，先做一个没什么追求的博客试一试，记录当下的技术探索与生活日常。

**技术选型：**
本站采用了 **纯静态网站** 架构，尝试模仿 [Fuwari](https://fuwari.vercel.app) 样式，托管于 GitHub Pages。
* **安全性**：相比动态网站，静态站不需要担心服务器后端被攻击，省心。
* **适用性**：对于体量小、更新随缘的个人博客来说，完全够用。
* **经济性**：这是最重要的——只要 GitHub Pages 还是免费的，我应该就会一直用下去。

**支持功能：**
* **Markdown & 代码高亮**：核心内容基于 Markdown 编写，集成 `highlight.js`，支持多种编程语言的语法高亮。
* **悬挂式目录 (TOC)**：在大屏模式下，文章目录独立**悬挂**于右侧（不挤占正文空间），支持**滚动监听**与平滑跳转，长文阅读更轻松。
* **SPA 级流畅体验**：虽是纯静态文件，但通过原生 JS 实现了**无刷新路由跳转**，保留了单页应用 (SPA) 的丝滑感，同时对浏览器历史记录友好。
* **全终端响应式**：精心调教的 Tailwind 布局，从手机端到超宽屏显示器，都能自动适配最佳显示效果。

**优化计划：**
虽然部署在 GitHub 上很方便，但发布文章还需要手动修改前端 HTML/JSON 代码，体验实在有点“反人类”。
目前的 **Todo List** 是：
- [ ] 寻找或开发一套自动化工具
- [x] 实现 Markdown 写作 -> 上传 -> 自动生成网页的完整流程

**当前工作流：**  
    1.**内容层**：文章统一以 .md 格式存放在 posts/ 目录下，专注于内容写作。  
    2.**数据层**：维护一个 posts.json 文件作为“简易数据库”，手动注册文章的 ID、标题、发布时间及文件路径。  
    3.**渲染层**：前端通过 fetch 动态读取 JSON 数据生成文章列表；进入详情页时，再次异步拉取对应的 Markdown 文件，通过 marked.js 实时解析为 HTML 并在客户端渲染。  
    4.再也不用手写 `<p>` 标签了。

### 👨‍💻 技术栈

| 领域 | 技术 |
| :--- | :--- |
| **核心** | HTML5, Vanilla JS |
| **样式** | Tailwind CSS |
| **渲染** | Marked.js, Highlight.js |
| **公式** | KaTeX |

### 📬 联系我

如果你对本站的内容感兴趣，或者有更好的静态站自动化方案推荐，欢迎联系：

- **Email**: <k7254017@gmail.com>
- **Github**: [Stephen0124](https://github.com/Stephen0124)