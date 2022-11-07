chrome.tabs.onUpdated.addListener(function (tabId, info, tab) {
	if (!tab.url) {
		return;
	}
});

chrome.commands.onCommand.addListener((command) => {
	console.log(`Command: ${command}`);

	if (command === "run-superbar" || command === "run-superbar2") {
		chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
			chrome.tabs.sendMessage(tabs[0].id as number, { action: "run-superbar" });
		});
	} else if (command === "close-superbar") {
		chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
			chrome.tabs.sendMessage(tabs[0].id as number, {
				action: "close-superbar",
			});
		});
	}
});
