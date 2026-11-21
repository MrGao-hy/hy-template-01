# hy-app SCSS 规范

## 一、Style

所有页面和组件：

```vue
<style lang="scss">
</style>
```

---

# 二、单位

uni-app 页面默认：

```text
rpx
```

例如：

```scss
padding: 20rpx;
font-size: 28rpx;
border-radius: 16rpx;
```

只有平台 API、第三方库或特殊 CSS 场景需要时才使用 `px`。

---

# 三、变量定位与覆盖（AI 必读）

## 3.1 源码位置

在 `@hy-app/ui` 源码项目中，样式变量只认以下位置：

```text
全局 SCSS token：src/package/libs/css/theme.scss
亮色 / 暗色 CSS 变量：src/package/libs/css/_vars.scss
公共 class：src/package/libs/css/common.scss
Mixin / BEM：src/package/libs/css/_mixin.scss
组件变量：src/package/components/<component-name>/index.scss
```

在使用已安装包的项目中，优先检查：

```text
node_modules/@hy-app/ui/src/package/...
```

如果安装包目录结构不同，先用 `rg` 找到实际 SCSS，再继续修改。禁止只凭组件名或变量前缀猜测变量。

## 3.2 公共变量引用规则

页面 SCSS 中优先使用 `$hy-*`，前提是项目 `uni.scss` 已经引入 `@/package/index.scss` 或等价主题入口：

```scss
.order-title {
    color: $hy-text-color;
    font-size: $hy-font-size-base;
    background: $hy-background--container;
    border-radius: $hy-radius-base;
}
```

模板、内联样式、运行时动态样式或需要跨组件继承时使用 CSS 变量：

```vue
<view class="order-page">
    <text class="order-title">订单</text>
</view>

<style lang="scss">
.order-page {
    --hy-text-color: #1f1f24;
    --hy-background--container: #ffffff;

    .order-title {
        color: var(--hy-text-color);
        background: var(--hy-background--container);
    }
}
</style>
```

把 SCSS 变量赋给 CSS 自定义属性时必须插值：

```scss
.order-page {
    /* 正确 */
    --order-primary: #{$hy-primary};

    /* 错误：会按字面量输出 $hy-primary */
    --order-primary: $hy-primary;
}
```

常用全局映射必须按源码使用：

| SCSS 变量 | CSS 变量 |
| --- | --- |
| `$hy-primary` | `--hy-theme-color` |
| `$hy-primary-dark` | `--hy-theme--dark` |
| `$hy-primary-disabled` | `--hy-theme--disabled` |
| `$hy-primary-light` | `--hy-theme--light` |
| `$hy-warning` / `$hy-warning-dark` / `$hy-warning-disabled` / `$hy-warning-light` | `--hy-warning` / `--hy-warning--dark` / `--hy-warning--disabled` / `--hy-warning--light` |
| `$hy-success` / `$hy-success-dark` / `$hy-success-disabled` / `$hy-success-light` | `--hy-success` / `--hy-success--dark` / `--hy-success--disabled` / `--hy-success--light` |
| `$hy-error` / `$hy-error-dark` / `$hy-error-disabled` / `$hy-error-light` | `--hy-error` / `--hy-error--dark` / `--hy-error--disabled` / `--hy-error--light` |
| `$hy-info` / `$hy-info-dark` / `$hy-info-disabled` / `$hy-info-light` | `--hy-info` / `--hy-info--dark` / `--hy-info--disabled` / `--hy-info--light` |
| `$hy-text-color` | `--hy-text-color` |
| `$hy-text-color--2` / `--3` / `--4` | `--hy-text-color--2` / `--hy-text-color--3` / `--hy-text-color--4` |
| `$hy-text-color--grey` / `--placeholder` / `--disabled` / `--hover` | `--hy-text-color--grey` / `--hy-text-color--placeholder` / `--hy-text-color--disabled` / `--hy-text-color--hover` |
| `$hy-font-size-*` | `--hy-font-size-*` |
| `$hy-font-weight-*` | `--hy-font-weight-*` |
| `$hy-line-height-*` | `--hy-line-height-*` |
| `$hy-background*` | 同名 `--hy-background*` |
| `$hy-img-size-*` | `--hy-img-size-*` |
| `$hy-avatar-size-*` | `--hy-avatar-size-*` |
| `$hy-radius-*` | `--hy-radius-*` |
| `$hy-border-margin-padding-*` | `--hy-border-margin-padding-*` |
| `$hy-border-line` | `--hy-border-line` |
| `$hy-border-color*` | 同名 `--hy-border-color*` |
| `$hy-border-width-*` | `--hy-border-width-*` |
| `$hy-border-shadow-base` | `--hy-border-box-shadow` |
| `$hy-shadow-*` | `--hy-shadow-*` |
| `$hy-opacity-*` | `--hy-opacity-*` |
| `$hy-transition-*` | `--hy-transition-*` |

`hy-config-provider` 只自动写入 `--hy-theme-color` 和 `--hy-theme--light`。其他 CSS 变量如果要全局改，应放在项目公共根节点、页面根 class 或 provider 的 `customStyle` 中；暗色模式要再核对 `_vars.scss`，不要假设每个 token 都有暗色覆盖。当前源码（1.0.4）的暗色块写入 `--hy-text-color-2`，而 `$hy-text-color--2` 读取 `--hy-text-color--2`；遇到暗色不生效时先核对这类实际变量名差异。

## 3.3 组件 CSS 变量定位流程

修改 hy-app 组件内部样式时必须执行：

```text
1. 把组件名规范为 hy-xxx
2. 读取 src/package/components/hy-xxx/index.scss
3. 只认形如 $scss-var: var(--css-var, fallback) 的声明
4. 使用源码里的 --css-var，不使用推断出来的变量名
5. 在页面祖先 class 上覆盖 --css-var
6. 若变量不存在，改查 Props / customStyle / customClass，不要发明变量
```

精确搜索命令：

```powershell
rg -n "^[ \t]*\$[A-Za-z][A-Za-z0-9_-]*[ \t]*:[ \t]*var\(--" `
  "src/package/components/hy-button/index.scss"
```

不能简单把 `$` 换成 `--`。例如 `hy-table` 中存在别名：

```scss
$header-text-color: var(--hy-table-header-text-color, #909399);
$stripe-bg: var(--hy-table-stripe-bg, #{$hy-background--table-header});
```

正确覆盖方式是放在组件祖先节点上，让 CSS 变量继承：

```vue
<view class="order-actions">
    <hy-button size="large">提交订单</hy-button>
</view>

<style lang="scss">
.order-actions {
    --hy-button-height-large: 88rpx;
    --hy-button-font-size-large: 32rpx;
    --hy-button-radius: #{$hy-radius-lg};
}
</style>
```

不要优先修改库源码里的 fallback。只有在明确要求调整组件库默认主题时，才改 `src/package/components/<component>/index.scss`。固定定位、弹层、Toast、Notify 等全局挂载场景，应确认实际渲染节点仍在覆盖变量的祖先内；若不在，把变量放到更外层公共根节点或使用该组件提供的 class / style API。

---

# 四、主题色

优先使用：

```scss
$hy-primary
$hy-primary-dark
$hy-primary-light
$hy-primary-disabled

$hy-warning
$hy-success
$hy-error
$hy-info
```

---

# 五、文字颜色

```scss
$hy-text-color
$hy-text-color--2
$hy-text-color--3
$hy-text-color--4
$hy-icon-color
$hy-text-color--placeholder
$hy-text-color--disabled
```

---

# 六、字体

```scss
$hy-font-size-xs
$hy-font-size-sm
$hy-font-size-base
$hy-font-size-md
$hy-font-size-lg
$hy-font-size-xl
$hy-font-size-xxl
```

---

# 七、间距

```scss
$hy-border-margin-padding-sm
$hy-border-margin-padding-base
$hy-border-margin-padding-lg
$hy-border-margin-padding-xl
```

---

# 八、圆角

```scss
$hy-radius-no
$hy-radius-sm
$hy-radius-base
$hy-radius-lg
$hy-radius-circle
```

---

# 九、阴影

```scss
$hy-shadow-sm
$hy-shadow-base
$hy-shadow-lg
```

---

# 十、背景

```scss
$hy-background
$hy-background--2
$hy-background--container
$hy-background--track
$hy-background--disabled
$hy-background--mask
```

---

# 十一、Mixin

Flex：

```scss
@include flex(row);
@include flex(column);
```

文本省略使用：

```scss
@include lineEllipsis;
@include multiEllipsis(3);
```

BEM：

```scss
@include b('button') {
}

@include e('icon') {
}

@include m('primary') {
}

@include is('active') {
}

@include pseudo('hover') {
}
```

主题：

```scss
$color-dark: themeColor(
    $hy-primary,
    '',
    'dark'
);

$color-light: themeColor(
    $hy-primary,
    '',
    'light'
);
```

---

# 十二、公共样式

优先使用：

```text
.hy-page
.hy-title
.hy-border
.hy-border__top
.hy-border__bottom
```

如果项目已经提供对应样式：

> 优先复用。

---

# 十三、SCSS 原则

优先级：

```text
hy-app SCSS 变量
      ↓
hy-app Mixin
      ↓
项目公共 SCSS
      ↓
组件局部 SCSS
      ↓
硬编码 CSS
```

禁止大量硬编码颜色：

```scss
color: #333;
background: #fff;
```

如果存在对应主题变量：

> 必须优先使用变量。

---

# 十四、组件样式

组件内部推荐 BEM：

```scss
.hy-product-card {
    &__image {
    }

    &__title {
    }

    &__price {
    }

    &--disabled {
    }
}
```

避免产生过深选择器。

---

# 十五、组件 CSS 变量索引（源码快照）

下表基于 `@hy-app/ui` 1.0.4（2026-11-16）的 `src/package/components` 中 `index.scss` 顶部 `var(--...)` 声明生成，共 74 个组件、647 个组件变量入口。组件版本变化后源码优先；若下表与当前源码冲突，必须以下表前的定位流程重新读取源码。

| 组件 | 可覆盖 CSS 变量 |
| --- | --- |
| hy-action-sheet | --hy-action-sheet-background--track, --hy-action-sheet-cancel-color, --hy-action-sheet-cancel-margin, --hy-action-sheet-cancel-width, --hy-action-sheet-close-radius, --hy-action-sheet-close-right, --hy-action-sheet-close-top, --hy-action-sheet-disabled-color, --hy-action-sheet-font-size, --hy-action-sheet-header-line-height, --hy-action-sheet-img-size-base, --hy-action-sheet-item-color, --hy-action-sheet-item-height, --hy-action-sheet-margin-padding-base, --hy-action-sheet-margin-padding-sm, --hy-action-sheet-panel-height, --hy-action-sheet-panel-img-radius, --hy-action-sheet-panel-title-font-size, --hy-action-sheet-panel-width, --hy-action-sheet-subname-color, --hy-action-sheet-subname-font-size, --hy-action-sheet-width |
| hy-address-picker | --hy-address-picker-border, --hy-address-picker-padding, --hy-address-picker-radius |
| hy-avatar | --hy-avatar-circle-radius, --hy-avatar-square-radius |
| hy-back-top | --hy-back-top-background--3, --hy-back-top-tips-font-size |
| hy-badge | --hy-badge-background--2, --hy-badge-border-width, --hy-badge-dot-size, --hy-badge-inverted-font-size, --hy-badge-padding, --hy-badge-radius, --hy-badge-text-font-size |
| hy-button | --hy-button-disabled-opacity, --hy-button-font-size-large, --hy-button-font-size-medium, --hy-button-font-size-mini, --hy-button-font-size-small, --hy-button-hairline-width, --hy-button-height-large, --hy-button-height-medium, --hy-button-height-mini, --hy-button-height-small, --hy-button-min-width-mini, --hy-button-min-width-small, --hy-button-padding-large, --hy-button-padding-medium, --hy-button-padding-mini, --hy-button-padding-small, --hy-button-radius |
| hy-calendar | --hy-calendar-confirm-padding, --hy-calendar-day-bottom-info-color, --hy-calendar-day-bottom-info-font-size, --hy-calendar-day-disabled-color, --hy-calendar-day-dot-size, --hy-calendar-day-info-font-size, --hy-calendar-day-selected-color, --hy-calendar-day-selected-radius, --hy-calendar-error, --hy-calendar-month-mark-color, --hy-calendar-month-mark-font-size, --hy-calendar-month-title-color, --hy-calendar-month-title-font-size, --hy-calendar-month-title-height, --hy-calendar-primary, --hy-calendar-primary-light, --hy-calendar-subtitle-color, --hy-calendar-subtitle-font-size, --hy-calendar-subtitle-height, --hy-calendar-title-font-size, --hy-calendar-title-height, --hy-calendar-weekday-color, --hy-calendar-weekday-font-size, --hy-calendar-weekday-line-height |
| hy-card | --hy-card-background--container, --hy-card-body-padding, --hy-card-font-size, --hy-card-foot-padding, --hy-card-head-padding, --hy-card-margin-padding-base, --hy-card-margin-padding-sm, --hy-card-right-color, --hy-card-sub-color, --hy-card-sub-font-size, --hy-card-title-font-size, --hy-card-title-max-width |
| hy-cascader | --hy-cascader-background--hover, --hy-cascader-border, --hy-cascader-border-width-lg, --hy-cascader-close-size, --hy-cascader-font-weight-bold, --hy-cascader-item-color, --hy-cascader-item-font-size, --hy-cascader-loading-z-index, --hy-cascader-margin-padding-base, --hy-cascader-margin-padding-lg, --hy-cascader-primary, --hy-cascader-title-color, --hy-cascader-title-font-size |
| hy-cell-item | --hy-cell-item-arrow-color, --hy-cell-item-background, --hy-cell-item-background--disabled, --hy-cell-item-background--hover, --hy-cell-item-disabled-color, --hy-cell-item-font-size-large, --hy-cell-item-font-size-medium, --hy-cell-item-font-size-small, --hy-cell-item-icon-margin, --hy-cell-item-line-height-base, --hy-cell-item-line-height-lg, --hy-cell-item-line-height-sm, --hy-cell-item-padding-base, --hy-cell-item-padding-lg, --hy-cell-item-padding-sm, --hy-cell-item-sub-color, --hy-cell-item-sub-font-size, --hy-cell-item-title-margin, --hy-cell-item-value-color, --hy-cell-item-value-margin, --hy-cell-item-value-max-width |
| hy-check-button | --hy-check-button-background--disabled, --hy-check-button-border-width, --hy-check-button-disabled-border-color, --hy-check-button-disabled-color, --hy-check-button-error, --hy-check-button-font-size-large, --hy-check-button-font-size-medium, --hy-check-button-font-size-small, --hy-check-button-hover-opacity, --hy-check-button-info, --hy-check-button-opacity-disabled, --hy-check-button-padding-large, --hy-check-button-padding-medium, --hy-check-button-padding-small, --hy-check-button-primary, --hy-check-button-radius-circle, --hy-check-button-radius-square, --hy-check-button-success, --hy-check-button-transition-ease, --hy-check-button-warning |
| hy-checkbox | --hy-checkbox-background--disabled, --hy-checkbox-border, --hy-checkbox-disabled-checked-opacity, --hy-checkbox-disabled-color, --hy-checkbox-font-size, --hy-checkbox-margin, --hy-checkbox-margin-padding-sm, --hy-checkbox-primary, --hy-checkbox-radius-square |
| hy-checkbox-item | --hy-checkbox-background--disabled, --hy-checkbox-border, --hy-checkbox-disabled-checked-opacity, --hy-checkbox-disabled-color, --hy-checkbox-font-size, --hy-checkbox-margin, --hy-checkbox-margin-padding-sm, --hy-checkbox-primary, --hy-checkbox-radius-square |
| hy-code-input | --hy-code-input-background--track, --hy-code-input-border-color, --hy-code-input-cursor-color, --hy-code-input-dot-radius, --hy-code-input-dot-size, --hy-code-input-font-size, --hy-code-input-icon-color, --hy-code-input-line-radius, --hy-code-input-line-width, --hy-code-input-no-radius, --hy-code-input-primary, --hy-code-input-text-color |
| hy-count-down | --hy-count-down-font-size, --hy-count-down-line-height |
| hy-count-to | --hy-count-to-color |
| hy-coupon | --hy-coupon-bg-height, --hy-coupon-box-width, --hy-coupon-desc-font-size, --hy-coupon-name-font-size, --hy-coupon-radius, --hy-coupon-suffix-font-size, --hy-coupon-tag-bg, --hy-coupon-tag-color, --hy-coupon-tag-font-size, --hy-coupon-tag-width, --hy-coupon-value-font-size |
| hy-datetime-picker | --hy-datetime-picker-border, --hy-datetime-picker-padding, --hy-datetime-picker-radius |
| hy-divider | --hy-divider-dot-font-size, --hy-divider-margin-padding-sm, --hy-divider-min-height, --hy-divider-text-color |
| hy-dropdown | --hy-dropdown-background |
| hy-dropdown-item | --hy-dropdown-item-background--container, --hy-dropdown-item-border, --hy-dropdown-item-icon-color, --hy-dropdown-item-margin-padding-base, --hy-dropdown-item-primary |
| hy-empty | --hy-empty-button-margin-top, --hy-empty-description-color, --hy-empty-description-width, --hy-empty-margin-padding-base |
| hy-float-button | --hy-float-button-menu-font-size, --hy-float-button-menus-max-height, --hy-float-button-primary, --hy-float-button-radius, --hy-float-button-shadow-base |
| hy-folding-panel-item | --hy-folding-panel-active, --hy-folding-panel-border, --hy-folding-panel-font-size-large, --hy-folding-panel-font-size-medium, --hy-folding-panel-font-size-small, --hy-folding-panel-header-background, --hy-folding-panel-padding-base, --hy-folding-panel-padding-lg, --hy-folding-panel-padding-sm, --hy-folding-panel-value-color, --hy-folding-panel-value-font-size, --hy-folding-panel-value-margin-right |
| hy-form-item | --hy-form-item-error-color, --hy-form-item-error-font-size, --hy-form-item-label-color, --hy-form-item-margin-bottom |
| hy-grid | --hy-grid-border, --hy-grid-hover-opacity |
| hy-icon | --hy-icon-error, --hy-icon-icon-color, --hy-icon-info, --hy-icon-label-color, --hy-icon-label-font-size, --hy-icon-label-max-width, --hy-icon-primary, --hy-icon-success, --hy-icon-warning |
| hy-image | --hy-image-background--empty, --hy-image-height, --hy-image-placeholder-color, --hy-image-width |
| hy-index-bar | --hy-index-bar-background--empty, --hy-index-bar-background--hover, --hy-index-bar-index-color, --hy-index-bar-index-radius, --hy-index-bar-margin-padding-base, --hy-index-bar-primary, --hy-index-bar-toast-color, --hy-index-bar-toast-font-size, --hy-index-bar-toast-size, --hy-index-bar-z-index |
| hy-input | --hy-input-background--disabled, --hy-input-background--track, --hy-input-border, --hy-input-clear-radius, --hy-input-clear-size, --hy-input-color, --hy-input-disabled-color, --hy-input-font-size, --hy-input-height, --hy-input-line-height, --hy-input-margin-padding-base, --hy-input-margin-padding-sm, --hy-input-placeholder-color, --hy-input-radius-circle, --hy-input-radius-square, --hy-input-text-color |
| hy-keyboard | --hy-keyboard-background--track, --hy-keyboard-border, --hy-keyboard-car-key-font-size, --hy-keyboard-car-key-height, --hy-keyboard-close-font-size, --hy-keyboard-header-height, --hy-keyboard-header-padding, --hy-keyboard-key-background--3, --hy-keyboard-key-background--container, --hy-keyboard-key-background--hover, --hy-keyboard-key-error, --hy-keyboard-key-font-size, --hy-keyboard-key-gap, --hy-keyboard-key-height, --hy-keyboard-key-primary, --hy-keyboard-key-radius, --hy-keyboard-key-shadow, --hy-keyboard-margin-padding-sm, --hy-keyboard-sidebar-width, --hy-keyboard-title-font-size |
| hy-line | --hy-line-color |
| hy-line-progress | --hy-line-progress-background--empty, --hy-line-progress-primary, --hy-line-progress-radius, --hy-line-progress-text-color, --hy-line-progress-text-font-size |
| hy-list | --hy-list-margin-padding-base |
| hy-loading | --hy-loading-bars-gap, --hy-loading-bg-color, --hy-loading-border-width, --hy-loading-dots-gap, --hy-loading-margin-padding-base, --hy-loading-primary, --hy-loading-text-font-size, --hy-loading-text-line-height, --hy-loading-vertical-text-color |
| hy-menu | --hy-menu-background--active, --hy-menu-background--disabled, --hy-menu-background--hover, --hy-menu-background--track, --hy-menu-disabled-color, --hy-menu-indicator-height, --hy-menu-indicator-radius, --hy-menu-indicator-width, --hy-menu-margin-padding-base, --hy-menu-margin-padding-lg, --hy-menu-max-width, --hy-menu-primary, --hy-menu-title-font-size |
| hy-modal | --hy-modal-background--empty, --hy-modal-button-cancel-color, --hy-modal-button-confirm-color, --hy-modal-button-font-size, --hy-modal-button-group-padding, --hy-modal-button-height, --hy-modal-button-radius, --hy-modal-confirm-button-padding, --hy-modal-content-color, --hy-modal-content-font-size, --hy-modal-content-padding, --hy-modal-margin-padding-lg, --hy-modal-max-width, --hy-modal-primary, --hy-modal-radius, --hy-modal-title-color, --hy-modal-title-font-size, --hy-modal-title-padding-top |
| hy-navbar | --hy-navbar-background--color, --hy-navbar-height, --hy-navbar-sub-color, --hy-navbar-sub-font-size, --hy-navbar-text-font-size, --hy-navbar-title-font-size, --hy-navbar-z-index |
| hy-notice-bar | --hy-notice-bar-bg, --hy-notice-bar-font-size, --hy-notice-bar-padding, --hy-notice-bar-radius, --hy-notice-bar-swiper-height, --hy-notice-bar-warning |
| hy-notify | --hy-notify-font-size, --hy-notify-margin-padding-base |
| hy-number-step | --hy-number-step-background--disabled, --hy-number-step-background--empty, --hy-number-step-background--hover, --hy-number-step-btn-width, --hy-number-step-disabled-color, --hy-number-step-font-size, --hy-number-step-input-color, --hy-number-step-input-margin, --hy-number-step-radius |
| hy-overlay | --hy-overlay-bg |
| hy-pagination | --hy-pagination-font-size, --hy-pagination-margin-padding-base, --hy-pagination-nav-active-color, --hy-pagination-nav-disabled-color, --hy-pagination-nav-min-width, --hy-pagination-primary |
| hy-picker | --hy-picker-background--hover, --hy-picker-background-image--mask--two-flanks, --hy-picker-item-color, --hy-picker-item-disabled-opacity, --hy-picker-loading-z-index, --hy-picker-margin-padding-lg, --hy-picker-primary, --hy-picker-title-color, --hy-picker-title-font-size |
| hy-popover | --hy-popover-background--box, --hy-popover-border, --hy-popover-icon-size, --hy-popover-line-height, --hy-popover-margin-padding-base, --hy-popover-menu-padding, --hy-popover-min-height, --hy-popover-radius, --hy-popover-shadow-base, --hy-popover-width, --hy-popover-z-index |
| hy-popup | --hy-popup-background--container, --hy-popup-close-hover-opacity, --hy-popup-margin-padding-lg, --hy-popup-radius, --hy-popup-z-index |
| hy-price | --hy-price-font-size, --hy-price-margin-top |
| hy-qrcode | --hy-qrcode-background |
| hy-radio | --hy-radio-background--disabled, --hy-radio-border, --hy-radio-disabled-checked-opacity, --hy-radio-disabled-color, --hy-radio-font-size, --hy-radio-label-color, --hy-radio-margin, --hy-radio-margin-padding-lg, --hy-radio-margin-padding-sm, --hy-radio-primary, --hy-radio-radius-square |
| hy-read-more | --hy-read-more-background--container, --hy-read-more-font-size, --hy-read-more-line-height, --hy-read-more-margin-padding-sm, --hy-read-more-mask-height, --hy-read-more-primary |
| hy-scroll-list | --hy-scroll-list-background--empty, --hy-scroll-list-indicator-bar-width, --hy-scroll-list-indicator-height, --hy-scroll-list-indicator-radius, --hy-scroll-list-indicator-width, --hy-scroll-list-margin-padding-base, --hy-scroll-list-margin-padding-lg, --hy-scroll-list-primary |
| hy-search | --hy-search-action-active-margin, --hy-search-action-color, --hy-search-action-font-size, --hy-search-action-width, --hy-search-background, --hy-search-border-width, --hy-search-close-color, --hy-search-close-radius, --hy-search-close-size, --hy-search-disabled-color, --hy-search-input-color, --hy-search-input-font-size, --hy-search-input-margin, --hy-search-label-color, --hy-search-label-font-size, --hy-search-padding, --hy-search-placeholder-color, --hy-search-placeholder-font-size, --hy-search-placeholder-line-height |
| hy-signature | --hy-signature-background--3, --hy-signature-border, --hy-signature-margin-padding-base, --hy-signature-radius |
| hy-skeleton | --hy-skeleton-background--skeleton, --hy-skeleton-circle-radius, --hy-skeleton-circle-size, --hy-skeleton-height, --hy-skeleton-margin-padding-base, --hy-skeleton-radius, --hy-skeleton-rect-radius |
| hy-slider | --hy-slider-base-background, --hy-slider-button-box-shadow, --hy-slider-button-color, --hy-slider-button-size, --hy-slider-color, --hy-slider-inner-padding, --hy-slider-range-font-size, --hy-slider-track-radius |
| hy-steps | --hy-steps-background--line, --hy-steps-content-min-height, --hy-steps-date-color, --hy-steps-date-font-size, --hy-steps-dot-radius, --hy-steps-dot-size, --hy-steps-error, --hy-steps-icon-border, --hy-steps-icon-radius, --hy-steps-icon-size, --hy-steps-icon-text-color, --hy-steps-icon-text-font-size, --hy-steps-info, --hy-steps-margin-padding-sm, --hy-steps-primary, --hy-steps-title-active-font-size, --hy-steps-title-font-size |
| hy-sticky | --hy-sticky-bg |
| hy-submit-bar | --hy-submit-bar-background--container, --hy-submit-bar-left-font-size, --hy-submit-bar-margin-padding-base, --hy-submit-bar-margin-padding-lg, --hy-submit-bar-right-font-size, --hy-submit-bar-right-width |
| hy-subsection | --hy-subsection-background--3, --hy-subsection-background--container, --hy-subsection-font-size, --hy-subsection-height, --hy-subsection-inner-height, --hy-subsection-line-height, --hy-subsection-padding, --hy-subsection-primary, --hy-subsection-radius |
| hy-swipe-action | --hy-swipe-action-button-color, --hy-swipe-action-button-line-height, --hy-swipe-action-button-padding |
| hy-swiper | --hy-swiper-background, --hy-swiper-dot-active-width, --hy-swiper-dot-margin, --hy-swiper-dot-radius, --hy-swiper-dot-size, --hy-swiper-indicator-bar-bg, --hy-swiper-indicator-bar-radius, --hy-swiper-indicator-bar-width, --hy-swiper-indicator-bottom, --hy-swiper-indicator-height, --hy-swiper-title-bg, --hy-swiper-title-color, --hy-swiper-title-font-size, --hy-swiper-title-margin-lr, --hy-swiper-title-margin-tb |
| hy-switch | --hy-switch-background--3, --hy-switch-background--container, --hy-switch-border-color, --hy-switch-disabled-opacity, --hy-switch-node-box-shadow, --hy-switch-primary, --hy-switch-radius |
| hy-tabbar | --hy-tabbar-background--container, --hy-tabbar-circle-size, --hy-tabbar-height, --hy-tabbar-indicator-size, --hy-tabbar-item-width, --hy-tabbar-padding, --hy-tabbar-primary, --hy-tabbar-radius |
| hy-tabbar-group | --hy-tabbar-group-background--container, --hy-tabbar-group-border, --hy-tabbar-group-height, --hy-tabbar-group-margin-padding-lg, --hy-tabbar-group-radius, --hy-tabbar-group-shadow-base, --hy-tabbar-group-z-index |
| hy-tabbar-item | --hy-tabbar-item-icon-size, --hy-tabbar-item-inactive-color, --hy-tabbar-item-primary, --hy-tabbar-item-title-font-size |
| hy-table | --hy-table-background--container, --hy-table-background--table-header, --hy-table-border, --hy-table-cell-font-size, --hy-table-cell-padding, --hy-table-header-cell-font-size, --hy-table-header-cell-padding, --hy-table-header-height, --hy-table-header-text-color, --hy-table-primary, --hy-table-stripe-bg |
| hy-tabs | --hy-tabs-background--disabled, --hy-tabs-font-size, --hy-tabs-item-height, --hy-tabs-item-padding, --hy-tabs-line-height, --hy-tabs-line-radius, --hy-tabs-line-width, --hy-tabs-primary, --hy-tabs-text-active-color, --hy-tabs-text-color |
| hy-tag | --hy-tag-border-width, --hy-tag-close-margin, --hy-tag-close-size-large, --hy-tag-close-size-medium, --hy-tag-close-size-mini, --hy-tag-close-size-small, --hy-tag-font-size-large, --hy-tag-font-size-medium, --hy-tag-font-size-mini, --hy-tag-font-size-small, --hy-tag-font-text-weight, --hy-tag-icon-margin, --hy-tag-padding-large, --hy-tag-padding-medium, --hy-tag-padding-mini, --hy-tag-padding-small, --hy-tag-transition-ease |
| hy-text | --hy-text-font-size, --hy-text-main-color, --hy-text-price-color, --hy-text-price-font-size, --hy-text-primary |
| hy-textarea | --hy-textarea-background--3, --hy-textarea-background--disabled, --hy-textarea-border, --hy-textarea-color, --hy-textarea-count-font-size, --hy-textarea-count-radius, --hy-textarea-font-size, --hy-textarea-margin-padding-sm, --hy-textarea-max-height, --hy-textarea-min-height, --hy-textarea-radius, --hy-textarea-radius-no |
| hy-toast | --hy-toast-bg-color, --hy-toast-box-shadow, --hy-toast-default-bg-color, --hy-toast-error, --hy-toast-icon-margin-right, --hy-toast-icon-radius, --hy-toast-icon-size, --hy-toast-info, --hy-toast-loading-padding, --hy-toast-max-width, --hy-toast-padding, --hy-toast-primary, --hy-toast-radius, --hy-toast-success, --hy-toast-text-color, --hy-toast-text-font-size, --hy-toast-text-max-width, --hy-toast-warning, --hy-toast-z-index |
| hy-tooltip | --hy-tooltip-background--hover, --hy-tooltip-bg, --hy-tooltip-btn-color, --hy-tooltip-btn-font-size, --hy-tooltip-line-height, --hy-tooltip-margin-padding-base, --hy-tooltip-min-height, --hy-tooltip-radius, --hy-tooltip-shadow-base, --hy-tooltip-width, --hy-tooltip-z-index |
| hy-upload | --hy-upload-background--empty, --hy-upload-background--hover, --hy-upload-deletable-size, --hy-upload-error, --hy-upload-image-width, --hy-upload-item-margin, --hy-upload-other-bg, --hy-upload-primary, --hy-upload-radius, --hy-upload-success, --hy-upload-text-color, --hy-upload-text-font-size |
| hy-warn | --hy-warn-close-right, --hy-warn-close-top, --hy-warn-desc-font-size, --hy-warn-error, --hy-warn-error-light, --hy-warn-info, --hy-warn-info-light, --hy-warn-margin-padding-base, --hy-warn-margin-padding-sm, --hy-warn-primary, --hy-warn-primary-light, --hy-warn-radius, --hy-warn-success, --hy-warn-success-light, --hy-warn-text-color, --hy-warn-title-font-size, --hy-warn-warning, --hy-warn-warning-light |
