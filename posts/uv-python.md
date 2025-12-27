Python 版本繁杂，多环境的共存与切换一直是其生态中的一大痛点，以致于出现了“windows 系统安装 Python 的最好方式也许就是不安装”这一戏谑的说法。

以下是目前主流的三种 Python 安装方案。

## 官方安装
官网下载的并不是某一版本的 Python，而是 "python install manager"，而且官方宣称这种方式安装 Python 将成为 Windows 系统的主流方式。官网原文为：
```
The Python install manager for Windows is our tool for installing and managing runtimes. The traditional executable installer will stop being released with Python 3.16 As well as the files below, the Python install manager can be installed using the Microsoft Store app. For most users, this is the recommended approach.
```
这种方式虽然安装起来很简单（只需要不停确定），但大概率会遇到以下问题：
- pip 命令无法使用：因为安装目录下的 Scripts 文件夹没有添加到系统环境变量中。
- 多版本切换困难：使用 `python -V` 命令检查当前 Python 版本时默认为最新版本（即系统环境变量 Path 中顺序靠前的版本）。若要切换版本，需要手动去上下移动环境变量，或者使用 `py -3.10` 或 `py -3.13` 这种特定的启动器命令。

不难看出，py 命令是严格区分版本的。也许官方想要我们时刻记住自己在哪一个版本环境中进行开发。

作为 Python 主推的安装方式，在版本管理上居然这么不方便。个人不推荐。

## Conda + Python
Conda 系列包括 Anaconda 和 Miniconda，它们不仅管理 Python 包，还能管理非 Python 的依赖项（如 CUDA、C++ 库）。

之前我使用的解决方案是 Miniconda（比 Anaconda 更轻量，只包含核心工具）+ Python，安装新环境，切换环境都比较方便。
```Bash
conda create -n my_env python=3.10  # 创建环境
conda activate my_env               # 激活环境
conda install pandas                # 安装包
```

## uv + Python
uv 是目前 Python 社区最火的工具，由 Astral (Ruff 的作者) 开发。它极快，且一个工具集成了安装 Python 版本、管理环境和管理包的所有功能。

使用 Rust 编写，速度比 pip 和 conda 快。无需手动安装 Python，uv 可以根据项目需求自动下载并安装特定版本的 Python。
```Bash
uv venv                         # 创建虚拟环境
uv pip install requests         # 极速安装包
uv run main.py                  # 运行项目
```
安装也很方便，只需在 PowerShell 运行命令：
```PowerShell
"powershell -c "irm https://astral.sh/uv/install.ps1 | iex"
```
第一次安装可能会遇到不信任脚本，按照提示，更改执行策略后再运行安装命令就行。安装成功后，会提示添加系统变量：
```PowerShell
To add C:\Users\SteCheng\.local\bin to your PATH, either restart your shell or run:

    set Path=C:\Users\SteCheng\.local\bin;%Path%   (cmd)
    $env:Path = "C:\Users\SteCheng\.local\bin;$env:Path"   (powershell)
```
然后运行命令查看可用版本：
```PowerShell
uv python list
```
安装特定版本（以 3.12 为例）：
```PowerShell
uv python install 3.12
```
安装 uv 后，软件里不会出现一堆 "Python 3.X" 或者 "Python Launcher"，看起来很清爽。版本切换也很方便，使用 Python 3.8 只需 `uv run --python3.8`，简单快捷。

## 一些建议
- 养成使用虚拟环境 venv 的好习惯，让每个项目都有独立环境，不会让全局环境越来越臃肿。
- 不要在 Microsoft Store 下载 Python，存在权限限制，路径管理混乱等各种问题。

| 功能 | 描述 | 状态 |
|:------:|:------:|:----:|
| **用户登录** | 支持邮箱和手机号登录 | &#x2705; |
| *密码重置* | 通过邮箱重置密码 | &#x26a0;&#xfe0f; |
| `API接口` | RESTful API 设计 | &#x2705; |
| [文档链接](https://example.com) | 查看详细文档 | &#x1f4d6; |