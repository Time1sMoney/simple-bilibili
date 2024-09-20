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

/**动态设置columns */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "changeColumns") {
    document.documentElement.style.setProperty("--columns", request.columns);
  }
});
