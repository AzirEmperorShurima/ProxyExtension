// chrome.runtime.onInstalled.addListener(() => {
//     console.log('Extension installed');
//     setProxy('default-proxy-host', 'default-proxy-port', 'https');
// });

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     if (message.type === 'setProxy') {
//         setProxy(message.host, message.port, message.scheme);
//         sendResponse({ status: 'Proxy set', type: type });

//         return true;
//     }
//     else if (message.type === 'offProxy') {
//         offProxy();
//         sendResponse({ status: 'Proxy off' });
//         return true;
//     }
// });
// let type;
// function setProxy(host, port, scheme) {

//     chrome.proxy.settings.set(
//         {
//             value: {
//                 mode: "fixed_servers",
//                 rules: {
//                     singleProxy: {
//                         scheme: scheme,
//                         host: host,
//                         port: parseInt(port, 10)
//                     },
//                     bypassList: []
//                 }
//             },
//             scope: 'regular'
//         },
//         () => {
//             if (chrome.runtime.lastError) {
//                 console.error(chrome.runtime.lastError);
//                 type = 'error';
//             } else {
//                 console.log(`Proxy set to ${scheme}://${host}:${port}`);
//                 type = 'success';
//             }
//         }
//     );
// }
// function offProxy() {
//     chrome.proxy.settings.set(
//         {
//             value: {
//                 mode: "direct"
//             },
//             scope: 'regular'
//         },
//         () => {
//             if (chrome.runtime.lastError) {
//                 console.error(chrome.runtime.lastError);
//                 type = 'error';
//             } else {
//                 console.log('Proxy is now off');
//                 type = 'success';
//             }
//         }
//     );
// }




// chrome.runtime.onInstalled.addListener(() => {
//     console.log('Extension installed');
//     setProxy('192.168.1.3', 8080);  // Đặt giá trị mặc định khi cài đặt
// });

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     if (message.type === 'setProxy') {
//         setProxy(message.host, message.port, sendResponse);
//         return true; // Để đảm bảo sendResponse không bị đóng ngay lập tức
//     } else if (message.type === 'autoProxy') {
//         const host = generateRandomIP();
//         const port = generateRandomPort();
//         setProxy(host, port, sendResponse);
//         return true;
//     } else if (message.type === 'offProxy') {
//         chrome.proxy.settings.set(
//             { value: { mode: "direct" }, scope: 'regular' },
//             () => {
//                 sendResponse({ status: 'Proxy turned off' });
//             }
//         );
//         return true;
//     }
// });

// function setProxy(host, port, sendResponse) {
//     chrome.proxy.settings.set(
//         {
//             value: {
//                 mode: "fixed_servers",
//                 rules: {
//                     singleProxy: {
//                         scheme: "http",
//                         host: host,
//                         port: parseInt(port)
//                     },
//                     bypassList: []
//                 }
//             },
//             scope: 'regular'
//         },
//         () => {
//             if (sendResponse) sendResponse({ status: `Proxy set to ${host}:${port}` });
//         }
//     );
// }

// function generateRandomIP() {
//     return `192.168.1.${Math.floor(Math.random() * 254) + 1}`;
// }

// function generateRandomPort() {
//     return Math.floor(Math.random() * (65535 - 1024 + 1)) + 1024;
// }

// chrome.runtime.onInstalled.addListener(() => {
//     console.log('Extension installed');
// });

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     if (message.type === 'setProxy') {
//         setProxy(message.host, message.port, sendResponse);
//         return true;
//     } else if (message.type === 'autoProxy') {
//         const randomIndex = Math.floor(Math.random() * autoProxies.length);
//         const { host, port } = autoProxies[randomIndex];
//         setProxy(host, port, sendResponse);
//         return true;
//     } else if (message.type === 'offProxy') {
//         chrome.proxy.settings.set(
//             { value: { mode: "direct" }, scope: 'regular' },
//             () => {
//                 sendResponse({ status: 'Proxy is turned off' });
//             }
//         );
//         return true;
//     }
// });

// const autoProxies = [
//     { host: '192.168.1.3', port: 8081 },
//     { host: '192.168.1.4', port: 8082 },
//     // Add more proxies if needed
// ];

// function setProxy(host, port, sendResponse) {
//     console.log(`Setting proxy to ${host}:${port}`);
//     chrome.proxy.settings.set(
//         {
//             value: {
//                 mode: "fixed_servers",
//                 rules: {
//                     singleProxy: {
//                         scheme: "https", // Sử dụng HTTPS
//                         host: host,
//                         port: parseInt(port)
//                     },
//                     bypassList: []
//                 }
//             },
//             scope: 'regular'
//         },
//         () => {
//             if (sendResponse) sendResponse({ status: `Proxy set to ${host}:${port}` });
//         }
//     );
// }



chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed');
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'setProxy') {
        setProxy(message.host, message.port, sendResponse);
        return true;
    } else if (message.type === 'autoProxy') {
        const randomIndex = Math.floor(Math.random() * autoProxies.length);
        const { host, port } = autoProxies[randomIndex];
        setProxy(host, port, sendResponse);
        return true;
    } else if (message.type === 'offProxy') {
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
    { host: '169.254.200.255', port: 8080 },

];

function setProxy(host, port, sendResponse) {
    console.log(`Setting proxy to ${host}:${port}`);
    chrome.proxy.settings.set(
        {
            value: {
                mode: "fixed_servers",
                rules: {
                    singleProxy: {
                        scheme: "http", // Sử dụng HTTP
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
                    }, 5000);
                }
            }

        });
    },
    { urls: ["<all_urls>"] }
);
