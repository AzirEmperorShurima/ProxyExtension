// document.getElementById('setProxy').addEventListener('click', () => {
//     const host = document.getElementById('host').value || 'default-proxy-host';
//     const port = document.getElementById('port').value || 'default-proxy-port';
//     const scheme = 'https'; // Chỉ sử dụng HTTPS cho proxy

//     chrome.runtime.sendMessage({ type: 'setProxy', host, port, scheme }, (response) => {
//         alert(response.status + " " + response.type);
//     });
// });

// document.getElementById('autoSetProxy').addEventListener('click', () => {
//     const proxies = [
//         { host: '192.168.1.1', port: '8080', scheme: 'https' },
//         { host: '182.168.1.1', port: '8081', scheme: 'https' },
//         { host: '172.168.1.1', port: '8082', scheme: 'https' }
//     ];

//     const randomProxy = proxies[Math.floor(Math.random() * proxies.length)];

//     chrome.runtime.sendMessage({ type: 'setProxy', host: randomProxy.host, port: randomProxy.port, scheme: randomProxy.scheme }, (response) => {
//         alert(response.status + randomProxy);
//     });
// });

// document.getElementById('offProxy').addEventListener('click', () => {
//     chrome.runtime.sendMessage({ type: 'offProxy' }, (response) => {
//         alert(response.status + " " + response.type);
//     });
// });

// document.getElementById('setProxy').addEventListener('click', () => {
//     const host = document.getElementById('host').value;
//     const port = document.getElementById('port').value;

//     chrome.runtime.sendMessage({ type: 'setProxy', host, port }, (response) => {
//         alert(response.status);
//     });
// });

// document.getElementById('autoProxy').addEventListener('click', () => {
//     chrome.runtime.sendMessage({ type: 'autoProxy' }, (response) => {
//         alert(response.status);
//     });
// });

// document.getElementById('offProxy').addEventListener('click', () => {
//     chrome.runtime.sendMessage({ type: 'offProxy' }, (response) => {
//         alert(response.status);
//     });
// });

document.getElementById('setProxy').addEventListener('click', () => {
    const host = document.getElementById('host').value;
    const port = document.getElementById('port').value;

    chrome.runtime.sendMessage({ type: 'setProxy', host, port }, (response) => {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
            alert('Error: ' + chrome.runtime.lastError.message);
        } else {
            alert(response.status);
        }
    });
});

document.getElementById('autoProxy').addEventListener('click', () => {
    chrome.runtime.sendMessage({ type: 'autoProxy' }, (response) => {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
            alert('Error: ' + chrome.runtime.lastError.message);
        } else {
            alert(response.status);
        }
    });
});

document.getElementById('offProxy').addEventListener('click', () => {
    chrome.runtime.sendMessage({ type: 'offProxy' }, (response) => {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
            alert('Error: ' + chrome.runtime.lastError.message);
        } else {
            alert(response.status);
        }
    });
});
document.addEventListener('DOMContentLoaded', function () {
    // Lấy phần tử checkbox
    const toggleButton = document.getElementById('toggleButton');

    // Tải trạng thái từ chrome.storage
    chrome.storage.local.get('autoCloseEnabled', function (result) {
        toggleButton.checked = result.autoCloseEnabled !== false;
    });

    // Lắng nghe sự thay đổi trạng thái
    toggleButton.addEventListener('change', function () {
        chrome.storage.local.set({ autoCloseEnabled: toggleButton.checked });
    });
});
