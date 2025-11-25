# 🛒 轻舟商城 (Cockleboat E-Shop)

[English Documentation](./README.md)

一个使用 React 18、TypeScript 和现代技术栈构建的功能丰富的电商平台。本项目作为学习平台，用于掌握从架构到部署的现代前端开发实践。

> **轻舟商城** - 仿 Apple Store 和 Google Store 等电商项目的科技产品商店

## ✨ 功能特性

### 核心功能

- 📦 **商品目录** - 以网格/列表形式展示商品，包含图片、名称、价格、评分和销量数据
- 🔍 **多条件筛选** - 按类别、价格区间、评分和商品属性进行筛选
- 🔄 **灵活排序** - 按价格、销量、评分和上架日期排序
- 📄 **分页功能** - 通过 URL 状态同步浏览商品页面

### UI/UX 功能

- 🎨 **主题支持** - 明暗主题切换，支持系统偏好检测
- 🌍 **国际化** - 完整的 i18n 支持（中文和英文）
- 📱 **响应式设计** - 针对桌面、平板和移动设备优化
- 🎭 **加载状态** - 骨架屏和流畅过渡动画
- 🔒 **身份认证** - 完整的登录/登出流程，配合模拟后端

### 技术亮点

- 🏗️ **Monorepo 架构** - 使用 pnpm workspaces 组织
- 🎯 **类型安全** - 完整的 TypeScript 覆盖
- 📚 **规范开发** - 遵循 ESLint + Prettier + Commitlint 规范开发流程
- 🧩 **组件库** - 基于 shadcn/ui（Radix UI + Tailwind CSS）构建
- 🔧 **状态管理** - 使用 Zustand 管理全局状态
- 🌐 **API 层** - RESTful API 服务，配合 Express 模拟后端
- 📊 **数据建模** - 前后端共享类型定义

## 🏗️ 架构

### 项目结构

```
E-Shop/
├── apps/
│   ├── shop-web/          # 前端 React 应用
│   │   ├── src/
│   │   │   ├── components/    # UI 组件
│   │   │   │   ├── ui/         # 可复用的 UI 基础组件
│   │   │   │   ├── layout/     # 布局组件
│   │   │   │   ├── auth/       # 认证组件
│   │   │   │   └── product/    # 商品相关组件
│   │   │   ├── pages/         # 路由页面
│   │   │   ├── services/      # API 服务
│   │   │   ├── stores/        # Zustand 状态管理
│   │   │   ├── hooks/         # 自定义 React Hooks
│   │   │   ├── i18n/          # 国际化
│   │   │   └── utils/         # 工具函数
│   │   └── vite.config.ts
│   └── shop-api/          # 后端 Express API（模拟）
│       ├── src/
│       │   ├── models/        # 数据模型
│       │   ├── mocks/         # 模拟数据生成器
│       │   └── app.ts         # Express 服务器
│       └── package.json
├── packages/
│   └── shared/            # 共享类型和模型
│       ├── src/
│       │   ├── models/        # TypeScript 接口
│       │   └── common/        # 通用类型
│       └── package.json
└── docs/                  # 文档
```

### 技术栈

#### 前端 (`shop-web`)

- **框架**: React 18
- **语言**: TypeScript
- **构建工具**: Vite
- **UI 库**: shadcn/ui（Radix UI 基础组件 + Tailwind CSS）
- **路由**: React Router v6
- **状态管理**: Zustand
- **样式**: Tailwind CSS 配合自定义主题
- **图标**: Lucide React
- **国际化**: i18next
- **测试**: Vitest + React Testing Library

#### 后端 (`shop-api`)

- **运行时**: Node.js（ES 模块）
- **框架**: Express
- **语言**: TypeScript
- **模拟数据**: Faker.js
- **HTTP 客户端**: 原生 fetch

#### 共享包 (`@e-shop/shared`)

- **用途**: 共享的 TypeScript 接口和类型
- **模型**: Product、User、Authentication
- **工具**: 通用类型定义

#### 开发工具

- **包管理器**: pnpm（配合 workspaces）
- **代码质量**: ESLint + Prettier
- **Git Hooks**: Husky + lint-staged
- **提交规范**: Commitlint（约定式提交）

## 🚀 快速开始

### 前置要求

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### 安装

1. 克隆仓库：

```bash
git clone https://github.com/yourusername/E-Shop.git
cd E-Shop
```

2. 安装依赖：

```bash
pnpm install
```

3. 启动开发服务器：

```bash
pnpm dev
```

这将启动：

- 前端：http://localhost:5173
- 后端 API：http://localhost:3000

### 可用脚本

```bash
pnpm dev          # 启动所有开发服务器
pnpm build        # 构建所有包的生产版本
pnpm test         # 运行所有包的测试
pnpm lint         # 检查所有包的代码规范
pnpm format       # 使用 Prettier 格式化代码
```

## 📖 使用说明

### 测试账号

模拟 API 提供了用于身份验证的测试账号：

```
邮箱：admin@admin.com
密码：admin
```

### 商品类别

- **PC（电脑）** - 笔记本电脑，具有类型、CPU、内存、显卡等属性
- **Phone（手机）** - 智能手机，具有品牌、系列、存储等选项
- **Tablet（平板）** - 平板电脑，具有品牌、尺寸、连接方式等属性
- **Audio（音频）** - 耳机，具有类型、连接方式、功能等属性
- **Accessories（配件）** - 各种配件，具有类型和兼容性属性

### 筛选与排序

1. **类别选择**：点击类别以筛选商品
2. **属性筛选**：在类别内选择特定属性
3. **价格区间**：设置最低和最高价格
4. **评分筛选**：按最低星级评分筛选
5. **标签**：按新品、热销或促销标签筛选
6. **排序**：按价格、销量、评分或日期排序

## 🔧 开发

### 代码组织

项目遵循清晰的架构，关注点明确分离：

- **Components（组件）**：遵循原子设计原则的可复用 UI 组件
- **Pages（页面）**：路由级别的组件
- **Services（服务）**：API 通信层
- **Stores（状态）**：全局状态管理
- **Hooks（钩子）**：可复用逻辑的自定义 React Hooks
- **Utils（工具）**：纯工具函数

### 关键设计模式

1. **URL 状态管理**：使用 `useSearchParams` 将筛选和分页状态与 URL 同步
2. **Outlet Context**：通过 React Router 的 outlet context 实现布局到页面的通信
3. **组合模式**：将 UI 基础组件组合成特定领域的组件
4. **类型安全**：共享类型确保前后端一致性

### 样式方法

- **Tailwind CSS**：实用优先的 CSS 框架
- **CSS 自定义属性**：用于颜色和间距的主题变量
- **暗黑模式**：使用 CSS 自定义变体支持暗黑主题
- **响应式**：移动优先的响应式设计

### 状态管理策略

- **URL 状态**：筛选、排序、分页（通过 `useSearchParams`）
- **Zustand Store**：身份认证状态、全局 UI 状态
- **组件状态**：使用 `useState` 的本地 UI 状态
- **Outlet Context**：布局级别的函数（如 `scrollToTop`）

## 🎨 设计系统

### 主题

应用支持明暗主题和可自定义的强调色。主题偏好会持久化到 localStorage。

### 组件

所有 UI 组件都基于 Radix UI 基础组件构建，并使用 Tailwind CSS 样式化：

- **Button（按钮）**：多种变体（default、destructive、outline、ghost、link）
- **Input（输入框）**：带验证状态的文本输入
- **Select（选择器）**：下拉选择
- **Dialog/Sheet（对话框/抽屉）**：模态框和抽屉组件
- **Card（卡片）**：内容容器组件
- **Avatar（头像）**：用户资料显示
- **Badge（徽章）**：标签和标记
- **Pagination（分页）**：页面导航控件
- **Star Rating（星级评分）**：交互式和只读的评分显示

## 🌐 API

### 端点

```
GET /products              # 获取分页商品列表
GET /products/:id          # 根据 ID 获取商品
POST /auth/login           # 用户登录
GET /auth/me               # 获取当前用户
```

### 查询参数

商品列表支持广泛的筛选：

```
?page=1                   # 页码
?pageSize=12              # 每页项目数
?category=PC              # 商品类别
?minPrice=100             # 最低价格
?maxPrice=5000            # 最高价格
?minRating=4              # 最低评分
?tags=New,Hot             # 商品标签
?cpu=Intel i7             # 类别特定属性
?sort=price_asc           # 排序选项
```

## 📝 贡献

### 提交信息格式

本项目遵循[约定式提交](https://www.conventionalcommits.org/)：

```
<类型>(<范围>): <主题>

<正文>

<页脚>
```

类型：

- `feat`：新功能
- `fix`：Bug 修复
- `docs`：文档变更
- `style`：代码风格变更
- `refactor`：代码重构
- `test`：添加或更新测试
- `chore`：构建过程或辅助工具变更

### 开发工作流

1. 创建功能分支
2. 进行更改
3. 运行代码检查和测试
4. 使用约定式格式提交
5. 推送并创建 Pull Request

## 📚 文档

- [开发记录](./docs/开发记录/) - 开发日志
- [作业说明](./docs/作业说明.md) - 作业说明
- [学习计划与工作说明](./docs/学习计划与工作说明.md) - 分阶段安排开发任务
- [开发规划](./docs/开发规划.md) - 页面设计/需求分析

## 🎯 路线图

### 已实现 ✅

- [x] 分页展示
- [x] 多条件筛选
- [x] 商品列表网格展示
- [x] 简易身份认证
- [x] 主题切换（明暗）
- [x] 国际化（i18n）
- [x] 响应式设计
- [x] Monorepo 架构

### 计划中 🚧

- [ ] 排序功能
- [ ] 购物车功能
- [ ] 用户收藏/心愿单
- [ ] 公司首页宣传页
- [ ] 商品详情页
- [ ] 订单管理
- [ ] AI 驱动的推荐
- [ ] 大列表虚拟滚动
- [ ] 高级动画
- [ ] PWA 支持
- [ ] ……

## 📄 许可证

本项目仅用于教育目的。

## 👤 作者

**SuperSASS**

## 🙏 致谢

- shadcn/ui 提供的优秀组件库
- Radix UI 提供的无障碍基础组件
- Tailwind CSS 提供的实用优先样式
- React 和 TypeScript 社区
- 字节跳动工程训练营项目

---

用 ❤️ 构建，作为掌握现代前端开发的学习项目
