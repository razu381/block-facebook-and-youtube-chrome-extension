


let allowedReferers = new Map();

chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    let referer = details.initiator || details.originUrl;
    if (referer && (referer.includes("mail.google.com") || referer.includes("clicks.aweber.com"))) {
      allowedReferers.set(details.tabId, referer);
    }
  },
  { urls: ["<all_urls>"] }
);

chrome.tabs.onRemoved.addListener((tabId) => {
  allowedReferers.delete(tabId);
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getReferer") {
    let referer = allowedReferers.get(sender.tab.id);
    sendResponse({ referer: referer });
  }
});
