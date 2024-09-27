/**
 *  This script is injected into the Bilibili homepage to modify the default layout.
 *  Scope url : https://www.bilibili.com/
 */

let hasFocus = false;
const header = document.querySelector(".bili-header__bar") as HTMLElement;
const logo = document.querySelector(".inner-logo") as HTMLLinkElement;

const feedRollBtn = document.querySelector(".feed-roll-btn") as HTMLElement;

// 为首页输入框添加键盘事件
const input = document.querySelector(".nav-search-input") as HTMLInputElement;
if (input) {
  input.addEventListener("focusout", () => (hasFocus = false));
  window.addEventListener("keydown", (e) => {
    if (e.key === "/") {
      if (!hasFocus) {
        e.preventDefault();
        input.focus();
        hasFocus = true;
      }
    }
  });
}

function layout() {
  // 调整logo位置
  if (header && logo) {
    header.insertBefore(logo, header.firstChild);
  }
  // 调整feedroll按钮位置并添加键盘事件
  if (feedRollBtn) {
    document.body.appendChild(feedRollBtn);
    window.addEventListener("keydown", (e) => {
      if (e.shiftKey && e.code === "KeyF") {
        (feedRollBtn.children[0] as HTMLButtonElement).click();
        e.preventDefault();
      }
    });
  }
}

const observer = new MutationObserver(() => {
  if (header && logo && feedRollBtn) {
    layout();
    observer.disconnect();
  }
});

observer.observe(document.body, { childList: true, subtree: true });

function setup() {
  // 获取chrome storage中的columns，如果没有则设置默认值
  chrome.storage.local.get("cols", ({ cols }) => {
    if (cols) {
      document.documentElement.style.setProperty("--columns", cols);
    } else {
      chrome.storage.local.set({ cols: 4 });
    }
  });

  //监听chrome storage的变化，动态设置columns
  chrome.storage.local.onChanged.addListener((changes) => {
    if ("cols" in changes) {
      document.documentElement.style.setProperty(
        "--columns",
        changes.cols.newValue
      );
    }
  });
}
setup();
