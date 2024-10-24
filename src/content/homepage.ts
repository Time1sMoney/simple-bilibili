/**
 *  该脚本用于修改和增强Bilibili首页的布局和功能
 *  Scope url : https://www.bilibili.com/
 */

let hasFocus = false;
const header = document.querySelector(".bili-header__bar") as HTMLElement;
const logo = document.querySelector(".inner-logo") as HTMLLinkElement;
const feedRollBtn = document.querySelector(".feed-roll-btn") as HTMLElement;
const container = document.querySelector(".container") as HTMLElement;
const input = document.querySelector(".nav-search-input") as HTMLInputElement;

function registerEvent() {
  // 为首页输入框添加键盘事件
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
}
// 隐藏空的视频卡片容器
function filterCard() {
  const cards = document.querySelectorAll(".feed-card");
  for (const card of cards) {
    if (
      card.children[0] &&
      (!card.children[0].classList.contains("enable-no-interest") ||
        card.children[0].children.length === 1)
    ) {
      card.setAttribute("style", "display:none");
      return;
    }
  }
}
// 调整布局
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
// 注册chrome事件
function initChromeEvent() {
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
  // 监听推荐视频请求，在完成时处理空容器
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message === "RECOMMEND_REQUEST_COMPLETE") {
      filterCard();
    }
  });
}
const observer = new MutationObserver(() => {
  if (header && logo && feedRollBtn && container) {
    layout();
    observer.disconnect();
  }
});

observer.observe(document.body, { childList: true, subtree: true });

registerEvent();
initChromeEvent();
