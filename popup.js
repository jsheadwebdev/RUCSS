document.getElementById('extract-css').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript(
      {
        target: { tabId: tabs[0].id },
        function: extractCSS
      },
      (result) => {
        document.getElementById('css-output').innerText = result[0].result;
      }
    );
  });
});

function extractCSS() {
  // This function runs in the context of the web page
  // You would need to use the DevTools protocol to get CSS coverage here
  return 'Extracted CSS will be shown here';
}
