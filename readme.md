## 架构

- main 入口文件，复杂装载 module 和全局注册
- common 业务逻辑无关的公共事物
- modules 域模块，该项目共两个域：
  - dashboard(核心域) 数据看板模块
  - auth(支撑域) 鉴权模块

## 技术方案

- 状态管理 redux+rxjs, rxjs 负责复杂交互
- css 使用 emotion，公共样式用 styled-component,独立样式直接写组件内

## 格式化

- 安装 prettier 插件
- 开启 vscode "Format On Save"选项，项目内已有 prettier 配置，会自动格式化
