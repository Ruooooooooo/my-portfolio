# 个人作品集网站

一个极简风格的个人作品集/收藏夹网站，采用 React + Vite + Tailwind CSS 构建。

## 项目结构

```
├── public/
│   └── images/          # 图片资源目录
│       └── projects/    # 项目相关图片
│
├── src/
│   ├── data/
│   │   ├── projects.json    # 项目数据（只需编辑此文件添加新作品）
│   │   └── profile.json     # 个人信息配置（只需编辑此文件更新简介）
│   │
│   ├── components/      # 可复用组件
│   ├── pages/          # 页面组件
│   │
│   ├── App.jsx         # 主应用组件（路由配置）
│   ├── main.jsx        # 入口文件
│   └── index.css       # 全局样式
│
├── package.json
└── vite.config.js
```

## 如何添加新作品

只需编辑 `src/data/projects.json` 文件，添加新的项目对象：

```json
{
  "id": "project-3",
  "title": "项目标题",
  "subtitle": "项目副标题",
  "coverImage": "/images/projects/your-cover.jpg",
  "tags": ["标签1", "标签2", "2024"],
  "date": "2024-03",
  "description": "项目详细描述...",
  "images": [
    "/images/projects/image-1.jpg",
    "/images/projects/image-2.jpg"
  ],
  "videos": []
}
```

然后将图片放入 `public/images/projects/` 目录即可。

## 如何更新个人信息

编辑 `src/data/profile.json` 文件，修改个人信息、社交链接等。

## 开发命令

```bash
# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

## 技术栈

- React 18
- Vite
- Tailwind CSS
- React Router
- Framer Motion（页面过渡动画）
- Lucide React（图标库）

