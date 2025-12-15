# H1 一级标题 (通常用于页面主标题)

这里是正文段落。Markdown 是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档。Fuwari 主题对 Markdown 的渲染做了精心的样式优化。

## H2 二级标题
### H3 三级标题
#### H4 四级标题
##### H5 五级标题
###### H6 六级标题

### 1. 文本样式 (Typography)

Fuwari 支持多种强调文本的方式：

* **加粗文本 (Bold)**：使用双星号 `**` 包裹。
* *斜体文本 (Italic)*：使用单星号 `*` 包裹。
* ~~删除线 (Strikethrough)~~：使用双波浪线 `~~` 包裹。
* `行内代码 (Inline Code)`：使用反引号 \` 包裹，例如 `console.log()`。
* [超链接 (Link)](https://github.com/saicaca/fuwari)：这是链接的样式，悬停时会有下划线动画。

> **提示**：你也可以混合使用，比如 ***粗斜体***。


### 2. 列表 (Lists)

#### 无序列表
* 列表项 1
* 列表项 2
    * 嵌套列表项 A
    * 嵌套列表项 B
* 列表项 3

#### 有序列表
1.  第一步：准备环境
2.  第二步：编写代码
3.  第三步：部署上线

#### 任务清单 (Task List)
- [x] 已完成的任务
- [ ] 待办任务 A
- [ ] 待办任务 B

### 3. 引用块 (Blockquotes)

> 这是一个标准引用块。
> 它可以跨越多行。
>
> > 甚至可以进行嵌套引用。


### 4. 代码高亮 (Code Blocks)

Fuwari 静态版集成了 `highlight.js`，支持深色模式代码高亮。

**JavaScript:**
```javascript
// 这是一个 JavaScript 示例
function sayHello(name) {
    const message = `Hello, ${name}!`;
    console.log(message);
    return true;
}

sayHello("Fuwari");