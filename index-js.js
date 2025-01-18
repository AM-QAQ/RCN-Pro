// 页面加载时默认加载buying.html
document.addEventListener("DOMContentLoaded", function() {
    loadContent('buying.html', 'Pro购买方法');
});

// 动态加载内容文件
function loadContent(file, title) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', file, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById('content').innerHTML = xhr.responseText;
            document.getElementById('subHeader').textContent = title;

            // 移除其他导航项的 active 类
            var links = document.querySelectorAll('nav a');
            links.forEach(function (link) {
                link.classList.remove('active');
            });

            // 给当前导航项添加 active 类
            var currentLink = document.querySelector('nav a[onclick="loadContent(\'' + file + '\', \'' + title + '\')"]');
            currentLink.classList.add('active');

            // 如果加载的是 contact.html，则初始化时间更新函数
            if (file === 'contact.html') {
                initRuntimeUpdater();
            }
        }
    };
    xhr.send();
}

// 切换导航栏收缩/展开
function toggleSidebar() {
    var sidebar = document.getElementById('sidebar');
    var isCollapsed = sidebar.classList.contains('collapsed');
    sidebar.classList.toggle('collapsed');
    sidebar.classList.toggle('expanded');

    // 当菜单栏展开时，延迟显示文本直到过渡结束
    if (!isCollapsed) {
        var links = sidebar.querySelectorAll('a span');
        links.forEach(function(span) {
            span.style.opacity = '0'; // 在收缩过程中隐藏文本
            span.style.visibility = 'hidden'; // 同时隐藏文本
            span.style.width = '0'; // 隐藏文本宽度以防止错位
        });
    }
}

// 监听展开动画结束，显示文本
document.getElementById('sidebar').addEventListener('transitionend', function(e) {
    if (e.propertyName === 'width' && this.classList.contains('expanded')) {
        var links = this.querySelectorAll('a span');
        links.forEach(function(span) {
            span.style.width = 'auto'; // 恢复文本宽度
            span.style.opacity = '1'; // 在展开结束后显示文本
            span.style.visibility = 'visible';
        });
    }
});

// 初始化时间更新函数
function initRuntimeUpdater() {
    const websiteCreationTime = new Date('2024-08-25T18:00:00');

    function updateRuntime() {
        const now = new Date();
        const diff = now - websiteCreationTime;

        const diffSeconds = Math.floor(diff / 1000);
        const seconds = diffSeconds % 60;
        const diffMinutes = Math.floor(diffSeconds / 60);
        const minutes = diffMinutes % 60;
        const diffHours = Math.floor(diffMinutes / 60);
        const hours = diffHours % 24;
        const diffDays = Math.floor(diffHours / 24);
        const days = diffDays % 365;
        const years = Math.floor(diffDays / 365);

        document.getElementById('runtime').textContent = 
            `${years}年${days}天${hours}时${minutes}分${seconds}秒`;
    }

    setInterval(updateRuntime, 1000);
    updateRuntime();
}