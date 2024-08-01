
// Lấy phần tử checkbox
// const toggleButton = document.getElementById('toggleButton');

// // Tải trạng thái từ chrome.storage
// chrome.storage.local.get('autoCloseEnabled', function (result) {
//     toggleButton.checked = result.autoCloseEnabled !== false;
// });

// // Lắng nghe sự thay đổi trạng thái
// toggleButton.addEventListener('change', function () {
//     chrome.storage.local.set({ autoCloseEnabled: toggleButton.checked });
// });

// Thiết lập proxy từ input
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
const proxyList = document.getElementById('proxyList');
chrome.runtime.sendMessage({ type: 'getProxy' }, (response) => {
    if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
        return;
    }
    const proxiesList = response.proxies;

    proxiesList.forEach((proxy, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `${proxy.host}:${proxy.port}`;
        proxyList.appendChild(option);
    });

});
proxyList.addEventListener('change', function () {

    const selectedIndex = proxyList.value;
    if (selectedIndex !== "") {
        chrome.runtime.sendMessage({ type: 'getProxies', index: parseInt(selectedIndex) }, (response) => {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError);
                return;
            }

            const { host, port } = response.proxy;
            document.getElementById('host').value = host;
            document.getElementById('port').value = port;
        });
    }
});
// Thiết lập proxy tự động
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

// Tắt proxy
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

// Lấy dữ liệu từ chrome.storage.local
chrome.storage.local.get('autoCloseEnabled', (result) => {
    const checkBtn = document.getElementById('AutoERRHandle');
    const statusAuto = document.getElementById('statusAuto');
    if (result.autoCloseEnabled) {
        checkBtn.checked = true;
        statusAuto.textContent = 'Auto Close Tab Error is ON';
    } else {
        checkBtn.checked = false;
        statusAuto.textContent = 'Auto Close Tab Error is OFF';
    }
    checkBtn.addEventListener('change', function () {
        chrome.storage.local.set({ autoCloseEnabled: checkBtn.checked });
    });
});