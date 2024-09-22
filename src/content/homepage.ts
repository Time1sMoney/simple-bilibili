/**
 *  This script is injected into the Bilibili homepage to modify the default layout.
 *  Scope url : https://www.bilibili.com/
 */

const searchBarContainer = document.querySelector(
  ".center-search-container"
) as HTMLElement;
const headerBanner = document.querySelector(
  ".bili-header__banner"
) as HTMLElement;
const feedRollBtn = document.querySelector(".feed-roll-btn") as HTMLElement;

function layout() {
  // Layout the search bar
  if (searchBarContainer && headerBanner) {
    const container = document.createElement("div");
    container.classList.add("simple-bilibili-search-container");
    container.appendChild(searchBarContainer);
    headerBanner.appendChild(container);
  }
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
  if (searchBarContainer && headerBanner && feedRollBtn) {
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
