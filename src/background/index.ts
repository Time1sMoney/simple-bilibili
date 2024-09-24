import { getDate } from "@/utils/time";
import { TimeOfDay } from "../types";

let totalTime = 0; // seconds

const date = getDate();

function init() {
  const todayDefault = {
    date,
    value: 0,
  };
  // Initialize time from local storage
  chrome.storage.local.get("time").then(({ time }) => {
    if (time) {
      const target = (time as TimeOfDay[]).find((item) => item.date === date);
      if (target) {
        totalTime = target.value;
        return;
      }
      // Push new time data to local storage
      if (time.length >= 30) {
        time.shift();
      }
      time.push(todayDefault);
      chrome.storage.local.set({
        time,
      });
    } else {
      chrome.storage.local.set({ time: [todayDefault] });
    }
  });
  // Listen for messages from content script
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "PAGE_RECORD_TIME") {
      totalTime++;
    }
  });
  // Store time in local storage every 10 seconds
  setInterval(() => {
    chrome.storage.local.get("time", ({ time }) => {
      if (time) {
        const target = (time as TimeOfDay[]).find((item) => item.date === date);
        if (target) {
          target.value = totalTime;
          chrome.storage.local.set(
            {
              time,
            },
            () => {
              if (chrome.runtime.lastError) {
                console.error("storage error : " + chrome.runtime.lastError);
              }
            }
          );
        }
      }
    });
  }, 1000 * 10);
}

init();
