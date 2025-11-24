# UserPanel

用户面板，用于展示用户信息和操作。

**面板内容**：

- 用户信息
- 用户设置
- 退出登录

## Props

- `user`: 用户数据
- `trigger`: 触发器，用于触发下拉菜单，如 Avatar。
- `onLogout`: 退出登录的回调函数。

## Usage

```tsx
<UserPanel trigger={<Avatar />} user={user} onLogout={handleLogout} />
```
