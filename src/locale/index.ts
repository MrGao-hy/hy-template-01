import { Locale } from '@hy-app/ui';
import enUS from './en-US';
import zhCN from './zh-CN';

/**
 * 多语言文案注册
 * 命名空间规范：按页面/模块划分，useTranslate(name) 中的 name 对应此处 key
 * 新增页面文案时，在 en.json 和 zh-CN.json 中同步添加对应命名空间
 */
const messages = {
    'en-US': enUS,
    'zh-CN': zhCN,
};

/** 语言缓存 key */
export const LANG_STORAGE_KEY = 'app-lang';

/** 默认语言 */
const DEFAULT_LANG = 'en-US';

/**
 * 初始化多语言
 * 优先读取本地缓存语言，无缓存时默认英文
 * 切换语言请使用 setLocale()，会同步写入缓存
 */
export function setupLocale() {
    Locale.add(messages);
    const cached = uni.getStorageSync<string>(LANG_STORAGE_KEY);
    Locale.use(cached || DEFAULT_LANG);
}

/**
 * 切换语言并持久化
 * Locale.use 后所有 t() 响应式刷新
 */
export function setLocale(lang: string) {
    Locale.use(lang);
    uni.setStorageSync(LANG_STORAGE_KEY, lang);
}

export { Locale };
