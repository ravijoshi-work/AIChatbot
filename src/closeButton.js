function addCloseButton() {
  const closeButton = document.createElement("button");
  closeButton.id = "extension-close-btn";
  closeButton.textContent = "×";
  closeButton.style.cssText = `
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    z-index: 9999;
  `;

  closeButton.addEventListener("click", () => {
    window.parent.postMessage(
      {
        from: "my-extension-sidebar",
        action: "close_sidebar",
      },
      "*"
    );
  });

  document.body.appendChild(closeButton);
}

// Check if we're in an iframe
const isInIframe = window !== window.parent;

// If we're in an iframe (sidebar mode), add close button
if (isInIframe) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", addCloseButton);
  } else {
    addCloseButton();
  }
}