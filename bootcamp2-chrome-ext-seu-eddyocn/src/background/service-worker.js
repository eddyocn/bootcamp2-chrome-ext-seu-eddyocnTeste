// Service worker (background) — inicializa storage no onInstalled
chrome.runtime.onInstalled.addListener((details) => {
  console.log('Click Counter instalado. Reason:', details.reason);
  // define contador inicial se não existir
  chrome.storage.local.get(['clickCount'], (res) => {
    if (res.clickCount === undefined) {
      chrome.storage.local.set({ clickCount: 0 });
      console.log('Inicializado clickCount = 0');
    }
  });
});
