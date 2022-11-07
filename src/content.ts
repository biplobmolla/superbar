import initApp from "./screens/index";

if (process.env.DEBUG !== "true") {
	console.log = () => {};
}

chrome.runtime?.onMessage.addListener((message, sender, callback) => {
	if (message?.action === "run-superbar") {
		initApp();
	} else if (message?.action === "close-superbar") {
		document.getElementById("sb-wrapper")?.remove();
	}
});

// initApp();
