/**
 *  This script is used to record the browsing time of bilibili.
 *  Scope url : https://www.bilibili.com/*
 */

(function () {
  let timer: ReturnType<typeof setInterval> | null = null;

  const recordBrowsingTime = () => {
    chrome.runtime.sendMessage({
      type: "PAGE_RECORD_TIME"
    });
  };

  const visiblityHandler = () => {
    if (document.visibilityState === "visible") {
      timer = setInterval(recordBrowsingTime, 1000);
    } else {
      if (timer) clearInterval(timer);
    }
  };

  document.addEventListener("visibilitychange", visiblityHandler);
  document.addEventListener("DOMContentLoaded", () => {
    timer = setInterval(recordBrowsingTime, 1000);
  });
})();
