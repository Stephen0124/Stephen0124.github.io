/**
 * js/render.js
 * 负责生成 HTML 字符串
 * 依赖: js/icons.js (getIcon)
 */

const Render = {
    
    // 生成列表页的标题 (筛选状态)
    listTitle: (type, value) => {
        if (type === 'tag') {
            return `<div class="mb-6 fade-in-up flex items-center gap-2">
                <span class="text-gray-400 text-sm">标签筛选</span> 
                <h2 class="text-2xl font-bold text-gray-800 flex items-center gap-2">${getIcon('tag')} ${value}</h2>
            </div>`;
        } else if (type === 'category') {
            return `<div class="mb-6 fade-in-up flex items-center gap-2">
                <span class="text-gray-400 text-sm">分类筛选</span> 
                <h2 class="text-2xl font-bold text-gray-800 flex items-center gap-2">${getIcon('category')} ${value}</h2>
            </div>`;
        }
        return '';
    },

    // 生成文章卡片 HTML
    postCard: (post, index) => {
        const delayClass = `delay-${(index % 5) * 100}`;
        
        // 文章卡片-分类
        const categoryHtml = post.category ? 
            `<span onclick="event.stopPropagation(); goToRoute('?category=${post.category}')" class="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-md text-xs text-gray-500 hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer mb-2 inline-block">
                ${getIcon('category')} ${post.category}
            </span>` : '';

        // 文章卡片-标签
        const tagsHtml = post.tags.map(tag => `
            <button onclick="event.stopPropagation(); goToRoute('?tag=${tag}')" class="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-md text-xs text-gray-500 hover:bg-primary/10 hover:text-primary transition-colors">
                ${getIcon('tag')} ${tag}
            </button>
        `).join('');

        return `
            <div onclick="loadPostById('${post.id}')" class="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-lg border border-white/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer fade-in-up ${delayClass} mb-6 group">
                <div class="flex flex-col">
                    <div class="flex justify-between items-start mb-2">
                        ${categoryHtml}
                        <span class="text-sm text-gray-400 flex items-center gap-1 dark:text-gray-500">
                            ${getIcon('date')} ${post.date}
                        </span>
                    </div>
                    <h2 class="text-xl font-bold text-gray-800 mb-2 group-hover:text-primary transition-colors dark:text-gray-200">${post.title}</h2>
                    <p class="text-gray-500 line-clamp-2 mb-4 text-sm dark:text-gray-400">${post.summary}</p>
                    <div class="flex flex-wrap gap-2">
                        ${tagsHtml}
                    </div>
                </div>
            </div>
        `;
    },

    // 生成侧边栏分类项 HTML
    sidebarCategory: (name, count) => {
        return `
            <button onclick="goToRoute('?category=${name}')" class="flex justify-between items-center w-full px-4 py-2 rounded-xl hover:bg-primary/10 hover:text-primary text-gray-600 dark:text-gray-400 dark:hover:text-primary transition-colors text-sm group">
                <span class="font-medium flex items-center gap-2">${getIcon('category')} ${name}</span>
                <span class="bg-gray-100 dark:bg-gray-700 group-hover:bg-white dark:group-hover:bg-gray-600 text-gray-400 group-hover:text-primary py-0.5 px-2 rounded-md text-xs transition-colors">${count}</span>
            </button>
        `;
    },

    // 生成侧边栏标签项 HTML
    sidebarTag: (name) => {
        return `
            <button onclick="goToRoute('?tag=${name}')" class="flex items-center px-2 py-1 bg-gray-100 rounded-md text-xs text-gray-500 hover:bg-primary/10 hover:text-primary transition-colors mb-1 dark:bg-gray-700 dark:text-gray-400 dark:hover:text-primary group">
                ${getIcon('tag')} ${name}
            </button>
        `;
    },

    // 生成文章详情页的 Meta 信息 HTML
    postDetailMeta: (post) => {
        const dateHtml = `
            <div class="flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-sm font-medium transition-all hover:bg-primary/20">
                ${getIcon('date')}
                <span>${post.date}</span>
            </div>
        `;

        const categoryHtml = post.category ? `
            <button onclick="goToRoute('?category=${post.category}')" class="flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-sm font-medium transition-all hover:bg-primary/20 hover:scale-105">
                ${getIcon('category')}
                <span>${post.category}</span>
            </button>
        ` : '';
        
        let tagsGroupHtml = '';
        if (post.tags && post.tags.length > 0) {
            const tagsList = post.tags.map((tag, index) => {
                const isLast = index === post.tags.length - 1;
                return `
                    <span onclick="goToRoute('?tag=${tag}')" class="cursor-pointer hover:underline decoration-primary/50 underline-offset-2">${tag}</span>
                    ${!isLast ? '<span class="opacity-40 mx-1">/</span>' : ''} 
                `;
            }).join('');

            tagsGroupHtml = `
                <div class="flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-sm font-medium transition-all hover:bg-primary/20">
                    ${getIcon('tag')} 
                    <div class="flex items-center">${tagsList}</div>
                </div>
            `;
        }

        return `
            <div class="flex flex-wrap items-center gap-3 select-none">
                ${dateHtml}
                ${categoryHtml}
                ${tagsGroupHtml}
            </div>
        `;
    },

    // 生成归档页面 HTML
    archiveList: (groupedPosts, sortedKeys) => {
        if (sortedKeys.length === 0) {
            return `<div class="text-center text-gray-500">暂无归档。</div>`;
        }
        
        let html = `<div class="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 lg:p-12 border border-white/20 dark:bg-gray-800/80 dark:border-gray-700 fade-in-up mb-10">
            <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-8 pb-4 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3">
                 文章归档
            </h1>`;
        
        sortedKeys.forEach(key => {
            const [y, m] = key.split('-');
            const itemsHtml = groupedPosts[key].map(post => `
                <li class="flex items-start group/item">
                    <span class="text-sm text-gray-400 w-24 pt-1 flex items-center gap-1">
                        ${getIcon('date')} ${post.date.substring(5)}
                    </span>
                    <a href="javascript:;" onclick="loadPostById('${post.id}')" class="text-lg text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-medium transition-colors">
                        ${post.title}
                    </a>
                </li>
            `).join('');

            html += `<div class="mb-10">
                <h2 class="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-4 flex items-center gap-2">${y}年 ${m}月</h2>
                <ul class="space-y-3">${itemsHtml}</ul>
            </div>`;
        });
        
        html += `</div>`;
        return html;
    },

    loading: '<div class="py-20 text-center text-gray-400">正在加载...</div>',
    
    error: (msg) => `<div class="text-red-500 text-center py-10">${msg}</div>`
};