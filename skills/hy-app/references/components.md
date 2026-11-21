# hy-app 组件参考

本文件只做两件事：

1. 规定 AI 必须如何调用华玥 MCP 查询组件 API。
2. 提供组件分类快照，帮助先定位可能适用的组件。

不要在本文件维护 Props、Events、Methods、Slots、Exposes、默认值或平台兼容性。生成或修改任何 `hy-*` 组件代码前，必须调用 MCP 获取当前版本信息。

---

# 一、MCP 工具矩阵

| 目标 | 工具 | 关键参数 |
| --- | --- | --- |
| 搜索组件 | `search_components` | `query`，可选 `category` |
| Props / Events / Slots / Exposes / 平台概览 | `get_component_api` | `componentName`，`section`，`detail` |
| 使用示例 | `get_component_examples` | `componentName`，`feature`，`listOnly` |
| 指定平台兼容性 | `check_platform_support` | `componentName`，`platform` |
| 组件用法校验 | `validate_component_usage` | `componentName`，`code` |
| Hook 方法 | `get_hook_doc` | `name` |

组件实例方法、实例属性、组件 Methods 统一通过 `get_component_api(section="exposes")` 查询。MCP 没有 `get_component_methods` 工具，也不要传 `section="methods"`。

---

# 二、componentName 规则

MCP 组件索引使用小写 kebab-case。调用 MCP 时优先传完整组件名：

```text
hy-button
hy-count-down
hy-form-item
hy-swipe-action
hy-config-provider
```

也可以传去掉 `hy-` 后的 kebab-case：

```text
button
count-down
form-item
swipe-action
config-provider
```

禁止把多词组件转换成 PascalCase 或 camelCase：

```text
错误：CountDown / countdown
错误：FormItem / formItem
错误：SwipeAction / swipeAction
```

实测规则：

```text
Button / button / hy-button       可以匹配
CountDown / countdown             匹配失败
count-down / hy-count-down        可以匹配
FormItem                          匹配失败
form-item / hy-form-item          可以匹配
```

不确定组件名时先调用：

```json
{
  "query": "upload"
}
```

工具：

```text
search_components
```

`category` 是可选过滤条件。只有在已经确认分类时才使用；首次查找优先用关键词搜索。当前分类包括：

```text
基础组件
页面布局
表单录入
数据选择
数据与状态
列表与内容
弹层与反馈
导航与操作
业务组件
其他组件
```

---

# 三、标准查询流程

生成或修改组件代码时必须按顺序执行：

```text
search_components
        ↓
get_component_api(section=all, detail=false)
        ↓
get_component_api(section=props/events/slots/exposes, detail=true)
        ↓
check_platform_support
        ↓
get_component_examples(listOnly=true)
        ↓
get_component_examples(feature=...)
        ↓
生成代码
        ↓
validate_component_usage
        ↓
项目 TypeScript / Vue 诊断
```

只需要改某一个 API 分区时，可以直接查指定分区，但仍要确认 `section=all` 返回的平台概览。

---

# 四、get_component_api

第一次查询使用精简模式：

```json
{
  "componentName": "hy-form",
  "section": "all",
  "detail": false
}
```

`section` 只允许：

```text
props
events
slots
exposes
all
```

`section=all` 返回：

```text
name
nameZh
category
description
platform
props
events
slots
exposes
```

其中 `exposes` 只在组件确实有公开项时返回；字段不存在表示当前文档没有公开 Exposes，不得给组件 ref 调用 `open()`、`close()`、`reset()` 等方法。

需要完整说明时再查指定分区：

```json
{
  "componentName": "hy-form",
  "section": "props",
  "detail": true
}
```

`includeExamples` 默认为 `false`。示例代码优先通过 `get_component_examples` 按需获取。

## 4.1 Props

查询：

```json
{
  "componentName": "hy-upload",
  "section": "props",
  "detail": false
}
```

Props 精简模式返回：

```text
name
type
default
enum
```

完整模式补充：

```text
label
description
enumLabels
```

写模板前必须确认属性名、类型、默认值、枚举、v-model 对应属性和平台限制。

## 4.2 Events

查询：

```json
{
  "componentName": "hy-upload",
  "section": "events",
  "detail": true
}
```

必须确认事件名、参数、参数类型、触发时机和平台限制。不要根据相似组件或旧项目代码推断事件名。

## 4.3 Slots

查询：

```json
{
  "componentName": "hy-upload",
  "section": "slots",
  "detail": true
}
```

必须确认插槽名、作用、接收值和小程序条件渲染限制。如果插槽需要通过 Boolean prop 打开，必须同时从 Props 查询确认该属性。

## 4.4 Exposes / Methods

查询：

```json
{
  "componentName": "hy-form",
  "section": "exposes",
  "detail": true
}
```

每个 expose 返回：

```text
name：方法名或属性名
type：类型签名，如 () => Promise<boolean> 或 AnyObject
description：说明
```

Exposes 是组件实例通过 `defineExpose` 暴露的内容，必须通过模板 ref 调用，不是 Props，也不是 Events。

示例结构：

```vue
<script setup lang="ts">
import { ref } from 'vue'

type HyFormExpose = {
    validate: () => Promise<boolean>
}

const formRef = ref<HyFormExpose>()

async function submit() {
    await formRef.value?.validate()
}
</script>

<template>
    <hy-form ref="formRef">
        <hy-form-item>
            <hy-input />
        </hy-form-item>
    </hy-form>
</template>
```

注意：

```text
exposes 可包含方法，也可包含属性，例如 formData / errors
type 为 - 或说明为空时，表示文档缓存不完整，需再核对组件类型定义
exposes 不存在时，不得调用组件 ref 方法
Hook 返回方法不是组件 Exposes，应调用 get_hook_doc
```

---

# 五、平台兼容性

`get_component_api(section=all)` 会返回平台概览：

```text
app
h5
weixin
alipay
```

最终仍必须调用：

```text
check_platform_support
```

全平台查询：

```json
{
  "componentName": "hy-upload"
}
```

指定平台查询：

```json
{
  "componentName": "hy-upload",
  "platform": "weixin"
}
```

`platform` 只允许：

```text
app
h5
weixin
alipay
```

涉及上传、文件、Canvas、DOM、滚动容器、固定定位、分包、小程序插槽和条件编译时，平台检查是强制步骤。

---

# 六、示例与校验

先获取示例标题，避免一次性加载大量代码：

```json
{
  "componentName": "hy-button",
  "listOnly": true
}
```

再按功能获取：

```json
{
  "componentName": "hy-button",
  "feature": "size"
}
```

生成代码后调用：

```json
{
  "componentName": "hy-button",
  "code": "<hy-button type=\"primary\" size=\"large\">提交</hy-button>"
}
```

工具：

```text
validate_component_usage
```

该校验主要覆盖模板中的动态属性和事件，不能替代 Exposes、Slots、平台兼容性以及项目 TypeScript / Vue 诊断。

---

# 七、失败回退

MCP 不可用或返回未找到时：

```text
1. 检查 componentName 是否为 kebab-case
2. 调用 search_components 搜索关键词
3. 仍失败才读取 node_modules 源码、.d.ts 或项目已有用法
4. 无法确认的 API 不写入代码
```

可以回退读取源码确认：

```text
Props / Events / Slots / Exposes 定义
defineExpose 传入的对象或类型
组件 typing.d.ts
项目已有同版本用法
```

禁止在 MCP 失败后凭记忆编造 API、平台结论或组件方法。

---

# 八、组件分类快照

分类来自当前 MCP 缓存，仅用于快速定位。组件是否存在、平台是否兼容，仍以 `search_components` 和 `get_component_api` 为准。

## 基础组件

`hy-avatar`、`hy-badge`、`hy-button`、`hy-config-provider`、`hy-icon`、`hy-image`、`hy-tag`、`hy-text`

## 页面布局

`hy-card`、`hy-cell`、`hy-cell-item`、`hy-divider`、`hy-flex`、`hy-grid`、`hy-line`、`hy-sticky`、`hy-transition`、`hy-watermark`

## 表单录入

`hy-check-button`、`hy-checkbox`、`hy-checkbox-group`、`hy-checkbox-item`、`hy-code-input`、`hy-form`、`hy-form-group`、`hy-form-item`、`hy-input`、`hy-keyboard`、`hy-number-step`、`hy-radio`、`hy-rate`、`hy-search`、`hy-signature`、`hy-slider`、`hy-switch`、`hy-textarea`、`hy-upload`

## 数据选择

`hy-address-picker`、`hy-calendar`、`hy-cascader`、`hy-datetime-picker`、`hy-picker`

## 数据与状态

`hy-count-down`、`hy-count-to`、`hy-empty`、`hy-line-progress`、`hy-loading`、`hy-rolling-num`、`hy-skeleton`

## 列表与内容

`hy-index-bar`、`hy-list`、`hy-parse`、`hy-qrcode`、`hy-read-more`、`hy-scroll-list`、`hy-swiper`、`hy-table`、`hy-waterfall`

## 弹层与反馈

`hy-action-sheet`、`hy-dropdown`、`hy-dropdown-item`、`hy-modal`、`hy-notice-bar`、`hy-notify`、`hy-overlay`、`hy-popover`、`hy-popup`、`hy-toast`、`hy-tooltip`、`hy-warn`

## 导航与操作

`hy-back-top`、`hy-float-button`、`hy-folding-panel`、`hy-folding-panel-item`、`hy-menu`、`hy-navbar`、`hy-pagination`、`hy-steps`、`hy-subsection`、`hy-swipe-action`、`hy-tabbar`、`hy-tabbar-group`、`hy-tabbar-item`、`hy-tabs`

## 业务组件

`hy-coupon`、`hy-price`、`hy-submit-bar`

## 其他组件

`hy-safe-bottom`、`hy-status-bar`

---

# 九、当前带 Exposes 的组件快照

当前缓存中有公开 Exposes 的组件：

`hy-calendar`、`hy-code-input`、`hy-count-down`、`hy-count-to`、`hy-folding-panel`、`hy-folding-panel-item`、`hy-form`、`hy-form-group`、`hy-form-item`、`hy-list`、`hy-notify`、`hy-picker`、`hy-popover`、`hy-signature`、`hy-sticky`、`hy-swipe-action`、`hy-tabs`、`hy-toast`、`hy-waterfall`

这只是提醒清单，不是 API 清单。具体方法名、参数、返回值和属性类型必须调用：

```json
{
  "componentName": "hy-form",
  "section": "exposes",
  "detail": true
}
```
