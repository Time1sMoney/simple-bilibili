let time = 0; // seconds

// Listen for messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "PAGE_RECORD_TIME") {
    time++;
  }
  console.log(time);
});

// Store time in local storage every 10 seconds
const recordTimer = setInterval(() => {
  chrome.storage.local.set({ time });
}, 1000 * 10);
