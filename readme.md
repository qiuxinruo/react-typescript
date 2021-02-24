## 架构

- index.tsx 入口文件
- common 业务逻辑无关的公共事物

## 技术方案

- 状态管理 redux+rxjs, rxjs 负责复杂交互
- css 用 less + bem 方案:

  - B 一律以组件为起点，加上 damain+page 明简写，以下划线分割，如“db_detail_header”(用下划线是为了方便双击选中)。
  - E 用中划线分割，保持只有一级，如"db_detail_header-header"
  - M 用"--"分割，如"db_detail_header--disabled"，一般用不到。

- 颜色统一用 antd 的色板（https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less#L54）

- 后台样式比较少，一般一个模块一个 less 文件即可

## 格式化

- 安装 prettier 插件
- 开启 vscode "Format On Save"选项，项目内已有 prettier 配置，会自动格式化
