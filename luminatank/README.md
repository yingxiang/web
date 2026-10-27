# LuminaTank 网站

沿用 keyboard 的静态页面结构，支持简体中文、英文、德文、法文、日文、韩文、俄文。

- 隐私政策：https://yingxiang.github.io/web/luminatank/privacy.html
- 技术支持：https://yingxiang.github.io/web/luminatank/support.html
- 下载：https://apps.apple.com/app/id6827451371
- 联系邮箱：xiangying320@126.com

`content.js` 管理七语言正文，`pages.js` 管理语言切换和导航，`styles.css` 管理响应式及深浅色样式。
语言优先级：URL 的 lang 参数 → 浏览器语言 → 本地存储 → 英文。
例如：`privacy.html?lang=zh-Hans`。禁用 JavaScript 时显示英文正文。

本地预览：在 web 根目录运行 `python3 -m http.server 8764`，访问 `/luminatank/`。
发布：随现有 web 仓库的 GitHub Pages 流程发布。本地文件完成不代表线上已更新。
隐私说明依据当前应用实现编写，新增账户、云同步、分析或交易功能时需同步更新。
