let sidebarFrame = null;
let sidebarVisible = false;
let sidebarContainer = null;

// Function to create the sidebar
function createSidebar() {
  if (sidebarContainer) return sidebarContainer;
  
  try {
    // Create container for the sidebar
    sidebarContainer = document.createElement('div');
    sidebarContainer.id = 'my-extension-sidebar-container';
    sidebarContainer.style.cssText = `
      position: fixed;
      top: 0;
      right: -400px;
      width: 400px;
      height: 100vh;
      z-index: 2147483647;
      transition: right 0.3s ease;
      box-shadow: -5px 0 15px rgba(0, 0, 0, 0.2);
    `;
    
    // Create the iframe
    sidebarFrame = document.createElement('iframe');
    sidebarFrame.id = 'my-extension-sidebar';
    sidebarFrame.src = chrome.runtime.getURL('index.html');
    sidebarFrame.style.cssText = `
      width: 100%;
      height: 100%;
      border: none;
      background-color: white;
    `;
    
    sidebarContainer.appendChild(sidebarFrame);
    document.body.appendChild(sidebarContainer);
    
    return sidebarContainer;
  } catch (error) {
    console.error("Error creating sidebar:", error);
    return null;
  }
}

// Toggle sidebar visibility
function toggleSidebar() {
  try {
    const container = createSidebar();
    if (!container) return;
    
    sidebarVisible = !sidebarVisible;
    
    if (sidebarVisible) {
      container.style.right = '0';
      
      // Optional - shift page content
      document.body.style.transition = 'margin-right 0.3s ease';
      document.body.style.marginRight = '400px';
    } else {
      container.style.right = '-400px';
      
      // Reset page content
      document.body.style.marginRight = '0';
    }
  } catch (error) {
    console.error("Error toggling sidebar:", error);
  }
}

// Listen for messages from background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "toggle_sidebar") {
    toggleSidebar();
    sendResponse({ status: "Toggled sidebar" });
  }
  return true; // Keep the message channel open for asynchronous responses
});

// Listen for messages from the iframe
window.addEventListener('message', (event) => {
  if (event.data && event.data.from === 'my-extension-sidebar') {
    if (event.data.action === 'close_sidebar') {
      if (sidebarVisible) {
        toggleSidebar();
      }
    }
  }
});
