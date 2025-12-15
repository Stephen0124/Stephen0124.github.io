这篇文章用于测试博客的 `highlight.js` 代码高亮主题效果。以下展示了不同语言的语法高亮渲染情况。

### 1. JavaScript / TypeScript

这是最常见的代码块测试，包含注释、函数、变量和字符串。

```javascript
/**
 * 计算两个数的和
 * @param {number} a 
 * @param {number} b 
 * @returns {number}
 */
function add(a, b) {
    const result = a + b;
    console.log(`The result is: ${result}`);
    return result;
}

// 调用函数
const sum = add(10, 20);  
```

### 2. HTML & CSS

测试 HTML 结构以及内嵌 CSS 样式的渲染。

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Fuwari Test</title>
    <style>
        body {
            background-color: #f3f4f6;
            font-family: 'Inter', sans-serif;
        }
        .container {
            display: flex;
            justify-content: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Hello World</h1>
    </div>
</body>
</html>
```
### 3. Python

测试后端逻辑、装饰器、类定义和 print 输出。

```Python
import random

class Game:
    """这是一个简单的游戏类"""
    
    def __init__(self, name):
        self.name = name
        self.score = 0
        
    def start(self):
        print(f"Game {self.name} started!")
        # 生成随机数
        return random.randint(1, 100)

if __name__ == "__main__":
    game = Game("Fuwari")
    result = game.start()
```

### 4. Diff (版本控制)

测试 Git 代码变更的差异对比效果（增加/删除行）。

```Diff
function initialize() {
-     var name = "Old Name";
+     const name = "New Name";
      console.log(name);
  }
```

### 5. JSON

测试键值对、布尔值和数字的显示。

```JSON
{
  "project": "Fuwari Static",
  "version": "1.0.0",
  "author": {
    "name": "SteCheng",
    "github": "[https://github.com/saicaca](https://github.com/saicaca)"
  },
  "features": ["static", "blog", "demo"],
  "isActive": true
}
```

### 6. Bash / Shell

测试命令行指令，通常用于安装依赖或部署脚本。

```Bash
# 更新系统
sudo apt update

# 安装项目依赖
npm install

# 启动本地开发服务器
npm run dev
```