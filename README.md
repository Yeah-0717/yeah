# 数据分析在线教育平台

基于Python的数据分析在线教育平台，为商务数据分析与应用专业的学生提供完整的学习体系和互动式学习体验。

## 功能特性

- **完整的课程体系**：从Python基础到高级数据分析，为商务数据分析专业学生提供系统化的课程内容
- **互动式学习模块**：包含实时代码编辑器、练习和测评，提供沉浸式学习体验
- **成就激励系统**：通过徽章、证书和进度跟踪，激励学生持续学习和进步
- **响应式设计**：适配不同设备，提供良好的移动端体验

## 技术栈

- **前端**：React 18 + TypeScript + Tailwind CSS + Vite
- **后端**：Express.js + Supabase
- **数据库**：Supabase PostgreSQL
- **部署**：Cloudflare Pages

## 快速开始

### 环境要求

- Node.js 18+
- npm 8+

### 安装步骤

1. 克隆项目

```bash
git clone <repository-url>
cd <project-directory>
```

2. 安装依赖

```bash
npm install
```

3. 配置环境变量

创建 `.env` 文件，添加以下内容：

```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_KEY=your-supabase-service-key
```

4. 启动开发服务器

```bash
npm run dev
```

5. 启动API服务器

```bash
npm run api
```

### 构建与部署

1. 构建项目

```bash
npm run build
```

2. 部署到Cloudflare Pages

- 登录Cloudflare控制台
- 创建新的Pages项目
- 连接GitHub仓库
- 配置构建命令：`npm run build`
- 配置构建输出目录：`dist`
- 部署项目

## 项目结构

```
├── api/            # 后端API
├── public/         # 静态资源
├── src/            # 前端代码
│   ├── components/ # 组件
│   ├── pages/      # 页面
│   ├── utils/      # 工具函数
│   ├── hooks/      # 自定义钩子
│   └── types/      # 类型定义
├── supabase/       # Supabase配置
├── .cloudflare/    # Cloudflare Pages配置
└── README.md       # 项目文档
```

## 核心功能

### 1. 课程管理
- 课程列表展示
- 课程详情查看
- 课程分类筛选

### 2. 学习系统
- 视频课程学习
- 互动练习
- 在线测评

### 3. 成就系统
- 学习进度跟踪
- 徽章获取
- 证书颁发

### 4. 用户系统
- 用户注册/登录
- 个人资料管理
- 学习记录查看

## 贡献指南

1. Fork 项目
2. 创建特性分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 许可证

MIT License

## 联系方式

- 项目维护者：[Your Name]
- 邮箱：[your-email@example.com]
- 网站：[your-website.com]