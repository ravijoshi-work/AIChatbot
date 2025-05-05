chrome.action.onClicked.addListener(async (tab) => {
  // Check if this is a valid tab that we can access
  if (!tab || !tab.id || tab.id === chrome.tabs.TAB_ID_NONE) {
    console.log("Invalid tab");
    return;
  }

  // Check if this is a restricted URL
  const restrictedPatterns = [
    "chrome://",
    "chrome-extension://",
    "chrome-search://",
    "chrome-untrusted://",
    "chrome-devtools://",
    "about:",
    "edge://",
    "brave://",
    "opera://",
    "vivaldi://",
    "chrome.google.com",
    "chromewebstore.google.com",
  ];

  // Check if the current URL is restricted
  const isRestricted = restrictedPatterns.some((pattern) =>
    tab.url.startsWith(pattern)
  );

  if (isRestricted) {
    // Handle restricted page - open your extension in a new tab instead
    console.log("Restricted page detected, opening in new tab");
    chrome.tabs.create({ url: chrome.runtime.getURL("index.html") });
    return;
  }

  // For normal pages, try to inject the sidebar
  try {
    // First check if we can access this tab with scripting
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        return true;
      },
    });

    // Now send the message to toggle sidebar
    chrome.tabs
      .sendMessage(tab.id, { action: "toggle_sidebar" })
      .catch((error) => {
        console.log("Error sending message:", error);

        // If message fails, try injecting the content script first
        chrome.scripting
          .executeScript({
            target: { tabId: tab.id },
            files: ["contentScript.js"],
          })
          .then(() => {
            // Try sending the message again after injection
            setTimeout(() => {
              chrome.tabs
                .sendMessage(tab.id, { action: "toggle_sidebar" })
                .catch((e) => console.log("Still failed after injection:", e));
            }, 100);
          })
          .catch((injectionError) => {
            console.log("Content script injection failed:", injectionError);
          });
      });
  } catch (error) {
    console.log("Tab access error:", error);
    // As a fallback, open in new tab
    chrome.tabs.create({ url: chrome.runtime.getURL("index.html") });
  }
});
