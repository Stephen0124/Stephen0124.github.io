/**
 * js/app.js
 * 核心逻辑层
 */

document.addEventListener('DOMContentLoaded', init);

let globalPosts = [];
let currentPostId = null; //用于记录当前正在显示的文章ID，防止点击锚点时重复渲染
let tocObserver = null; // 用于存储 TOC 监听器

// --- 初始化 ---
async function init() {
    try {
        const configRes = await fetch('config.json');
        const config = await configRes.json();
        document.getElementById('profile-name').textContent = config.name;
        document.getElementById('profile-bio').textContent = config.bio;
        if(config.avatar) document.getElementById('profile-avatar').src = config.avatar;
    } catch(e) { console.error("Config Error", e); }
    
    try {
        const res = await fetch('posts.json');
        globalPosts = await res.json();
        renderSidebarWidgets();
        handleRoute();
    } catch(e) {
        document.getElementById('post-list').innerHTML = Render.error('无法加载文章数据 (posts.json)');
    }
}

// --- 路由控制 ---
window.onpopstate = handleRoute;

function handleRoute() {
    const params = new URLSearchParams(window.location.search);
    const postId = params.get('post');
    const view = params.get('view');
    const tag = params.get('tag');
    const category = params.get('category');

    if (postId) {
        // 如果 ID 没变，说明是 TOC 跳转或 Hash 变化，直接忽略
        if (postId === currentPostId) return; 
        
        loadPostById(postId);
    }
    else if (view === 'archive') renderArchive();
    else if (tag) renderPostList('tag', tag);
    else if (category) renderPostList('category', category);
    else renderPostList();
}

function goToRoute(query) {
    const url = window.location.pathname + query;
    window.history.pushState({}, '', url);
    handleRoute();
}

// --- 业务逻辑 ---

function renderSidebarWidgets() {
    const catCounts = {};
    const tagCounts = {};
    globalPosts.forEach(p => {
        if(p.category) catCounts[p.category] = (catCounts[p.category] || 0) + 1;
        if(p.tags) p.tags.forEach(t => tagCounts[t] = (tagCounts[t] || 0) + 1);
    });

    const catContainer = document.getElementById('category-list-container');
    if (Object.keys(catCounts).length > 0) {
        document.getElementById('sidebar-categories').classList.remove('hidden');
        catContainer.innerHTML = Object.keys(catCounts).map(cat => Render.sidebarCategory(cat, catCounts[cat])).join('');
    }

    const tagContainer = document.getElementById('tag-cloud-container');
    if (Object.keys(tagCounts).length > 0) {
        document.getElementById('sidebar-tags').classList.remove('hidden');
        tagContainer.innerHTML = Object.keys(tagCounts).map(tag => Render.sidebarTag(tag)).join('');
    }
}

function renderPostList(filterType, filterValue) {
    currentPostId = null;

    // 切换回列表页时，强制滚动回顶部和左边
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

    const listEl = document.getElementById('post-list');
    const detailEl = document.getElementById('post-detail');
    detailEl.classList.add('hidden');
    listEl.classList.remove('hidden');

    // 在列表页隐藏 TOC
    resetTOC();

    let posts = globalPosts.filter(p => !p.hidden);
    if (filterType === 'tag') posts = posts.filter(p => p.tags && p.tags.includes(filterValue));
    if (filterType === 'category') posts = posts.filter(p => p.category === filterValue);

    let html = Render.listTitle(filterType, filterValue);
    if (posts.length === 0) {
        html += Render.error('没有找到相关文章');
    } else {
        html += posts.map((post, index) => Render.postCard(post, index)).join('');
    }
    listEl.innerHTML = html;
}

async function loadPost(post) {
    currentPostId = post.id;
    const listEl = document.getElementById('post-list');
    const detailEl = document.getElementById('post-detail');
    
    listEl.classList.add('hidden');
    detailEl.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (!window.location.search.includes(post.id)) {
        window.history.pushState({ postId: post.id }, '', `?post=${post.id}`);
    }

    document.getElementById('article-title').textContent = post.title;
    document.getElementById('article-meta').innerHTML = Render.postDetailMeta(post);
    
    const contentEl = document.getElementById('article-content');
    contentEl.innerHTML = Render.loading;

    try {
        const res = await fetch(post.file);
        if(!res.ok) throw new Error('File not found');
        const md = await res.text();
        contentEl.innerHTML = marked.parse(md);
        hljs.highlightAll();

        // 文章加载完毕后，生成目录
        renderTOC();

    } catch(e) {
        contentEl.innerHTML = Render.error('文章加载失败');
    }
}

function loadPostById(id) {
    const post = globalPosts.find(p => p.id === id);
    if (post) loadPost(post);
    else renderPostList();
}

function renderArchive() {
    currentPostId = null;

    // 切换回归档页时，强制滚动回顶部和左边
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

    document.getElementById('post-detail').classList.add('hidden');
    const listEl = document.getElementById('post-list');
    listEl.classList.remove('hidden');
    resetTOC(); // 归档页不显示 TOC

    const grouped = {};
    globalPosts.forEach(p => {
        if (p.id === 'about') return;
        const k = p.date.substring(0, 7);
        if(!grouped[k]) grouped[k] = [];
        grouped[k].push(p);
    });
    
    const sortedKeys = Object.keys(grouped).sort().reverse();
    listEl.innerHTML = Render.archiveList(grouped, sortedKeys);
}

/**
 * 退出文章详情页
 * 逻辑：移除 URL 中的 post 参数和 hash，保留其他筛选条件（如 tag/category），然后重新渲染
 */
function exitPost() {
    // 1. 获取当前 URL 对象
    const url = new URL(window.location.href);
    
    // 2. 删除 'post' 参数 (退出文章模式)
    url.searchParams.delete('post');
    
    // 3. 清除 hash (防止锚点干扰)
    url.hash = '';

    // 4. 使用现有的 goToRoute 导航到处理后的 URL
    // url.search 会返回剩下的参数 (例如 "?tag=js") 或者空字符串 (回首页)
    goToRoute(url.search);
}

// --- TOC (目录) 核心逻辑 ---

function resetTOC() {
    const tocContainer = document.getElementById('toc-container');
    const tocContent = document.getElementById('toc-content');
    if (tocContainer) tocContainer.classList.add('hidden', 'opacity-0');
    if (tocContent) tocContent.innerHTML = '';
    if (tocObserver) {
        tocObserver.disconnect();
        tocObserver = null;
    }
}

function renderTOC() {
    const tocContainer = document.getElementById('toc-container');
    const tocContent = document.getElementById('toc-content');
    const articleContent = document.getElementById('article-content');

    // 1. 查找所有标题 H1 - H4
    const headers = articleContent.querySelectorAll('h1, h2, h3, h4');
    
    if (headers.length === 0) return; // 如果没有标题，不显示 TOC

    // 2. 生成 HTML
    let tocHtml = '';
    headers.forEach((header, index) => {
        // 给没有 ID 的标题加上 ID，以便跳转
        if (!header.id) header.id = `heading-${index}`;

        // 计算缩进层级 (H1=1, H2=2...)
        const level = parseInt(header.tagName.substring(1));
        const paddingLeft = level === 1 ? '1rem' : (level * 0.8) + 'rem';
        
        tocHtml += `
            <a href="#${header.id}" 
               class="toc-link block py-1 text-sm text-gray-500 hover:text-primary transition-colors border-l-2 border-transparent pl-4 -ml-[2px] hover:border-primary"
               style="padding-left: ${paddingLeft}"
               data-target="${header.id}">
               ${header.textContent}
            </a>
        `;
    });

    tocContent.innerHTML = tocHtml;
    
    // 3. 显示 TOC (添加淡入效果)
    tocContainer.classList.remove('hidden');
    // 小延迟确保 transition 生效
    setTimeout(() => tocContainer.classList.remove('opacity-0'), 50);

    // 4. 启动滚动监听
    initScrollSpy(headers);
}

// 滚动高亮监听器
function initScrollSpy(headers) {
    const tocLinks = document.querySelectorAll('.toc-link');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -95% 0px', // 视口顶部 5% 区域触发
        threshold: 0
    };

    tocObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 移除所有高亮
                tocLinks.forEach(link => {
                    link.classList.remove('text-primary', 'font-bold', 'border-primary');
                    link.classList.add('text-gray-500', 'border-transparent');
                });

                // 激活当前
                const activeId = entry.target.id;
                const activeLink = document.querySelector(`.toc-link[data-target="${activeId}"]`);
                if (activeLink) {
                    activeLink.classList.remove('text-gray-500', 'border-transparent');
                    activeLink.classList.add('text-primary', 'font-bold', 'border-primary');
                }
            }
        });
    }, observerOptions);

    headers.forEach(header => tocObserver.observe(header));
}