(async () => {
  const tab = await chrome.tabs.query({ active: true, currentWindow: true });
  const [currentTab] = tab;

  chrome.debugger.attach({ tabId: currentTab.id }, '1.0', async () => {
    chrome.debugger.sendCommand({ tabId: currentTab.id }, 'Page.enable');
    chrome.debugger.sendCommand({ tabId: currentTab.id }, 'CSS.startRuleUsageTracking');
    
    // Wait for some time or until page is fully loaded
    setTimeout(async () => {
      const result = await new Promise(resolve => {
        chrome.debugger.sendCommand({ tabId: currentTab.id }, 'CSS.stopRuleUsageTracking', {}, (result) => {
          resolve(result);
        });
      });

      const usedRules = result.ruleUsage.filter(rule => rule.used);
      const cssText = usedRules.map(rule => rule.styleSheetId).join('\n');

      // Display or save the CSS text
      console.log(cssText);
      
      chrome.debugger.detach({ tabId: currentTab.id });
    }, 5000);  // Adjust this timeout as needed
  });
})();
