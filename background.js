chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed');
});
let indexProxySelected = 0
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'setProxy') {
        setProxy(message.host, message.port, sendResponse);
        return true;
    } else if (message.type === 'autoProxy') {
        const proxy = autoProxies[currentProxyIndex];
        setProxy(proxy.host, proxy.port, sendResponse);
        currentProxyIndex = (currentProxyIndex + 1) % autoProxies.length;
        return true;
    } else if (message.type === 'getProxy') {
        sendResponse({ proxies: autoProxies });
    } else if (message.type === 'getProxies') {
        sendResponse({ proxy: autoProxies[message.index] });

    }
    else if (message.type === 'offProxy') {
        chrome.proxy.settings.set(
            { value: { mode: "direct" }, scope: 'regular' },
            () => {
                sendResponse({ status: 'Proxy is turned off' });
            }
        );
        return true;
    }
});

const autoProxies = [
    { host: '192.168.1.3', port: 8080 },
    { host: '169.254.200.255', port: 8080 }
];

function setProxy(host, port, sendResponse) {
    console.log(`Setting proxy to ${host}:${port}`);
    chrome.proxy.settings.set(
        {
            value: {
                mode: "fixed_servers",
                rules: {
                    singleProxy: {
                        scheme: "http",
                        host: host,
                        port: parseInt(port)
                    },
                    bypassList: []
                }
            },
            scope: 'regular'
        },
        () => {
            if (chrome.runtime.lastError) {
                console.error(`Error setting proxy: ${chrome.runtime.lastError.message}`);
                if (sendResponse) sendResponse({ status: 'Error setting proxy', error: chrome.runtime.lastError.message });
            } else {
                if (sendResponse) sendResponse({ status: `Proxy set to ${host}:${port}` });
            }
        }
    );
}

chrome.webRequest.onErrorOccurred.addListener(
    (details) => {
        chrome.storage.local.get('autoCloseEnabled', function (result) {
            const autoCloseEnabled = result.autoCloseEnabled;
            if (autoCloseEnabled) {
                if (details.error === "net::ERR_TUNNEL_CONNECTION_FAILED") {
                    setTimeout(() => {
                        chrome.tabs.query({ url: details.url }, (tabs) => {
                            if (chrome.runtime.lastError) {
                                console.error(`Error querying tabs: ${chrome.runtime.lastError.message}`);
                            } else {
                                for (const tab of tabs) {
                                    chrome.tabs.remove(tab.id, () => {
                                        if (chrome.runtime.lastError) {
                                            console.error(`Error removing tab: ${chrome.runtime.lastError.message}`);
                                        }
                                    });
                                }
                            }
                        });
                    }, 1000);
                }
            }

        });
    },
    { urls: ["<all_urls>"] }
);