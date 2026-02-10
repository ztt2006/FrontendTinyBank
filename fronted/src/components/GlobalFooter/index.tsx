import styles from "./index.module.scss";

/**
 * 全局底部栏组件
 * @constructor
 */
export default function GlobalFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <div className={styles["global-footer"]}>
      <div>© {currentYear} 面试刷题平台</div>
      <div>
        <a href="https://gitee.com/ZhouTaotao666/projects" target="_blank">
          作者：小莫莫
        </a>
      </div>
    </div>
  );
}
