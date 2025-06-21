const icons = document.querySelectorAll('.icon');
const popups = document.querySelectorAll('.popup');
const closeButtons = document.querySelectorAll('.close-btn');

// 每个 icon 点击逻辑：第一次变图，第二次起弹窗
icons.forEach(icon => {
  icon.dataset.clicked = '0'; // 初始化点击次数为 0

  icon.addEventListener('click', (e) => {
    const clickCount = parseInt(icon.dataset.clicked, 10);

    if (clickCount === 0) {
      // 第一次点击：只换图
      const newSrc = icon.getAttribute('data-open-img');
      if (newSrc) {
        icon.src = newSrc;
        icon.dataset.clicked = '1'; // 标记已点过一次
      }
    } else {
      // 第二次及以后点击：弹出 popup
      popups.forEach(p => p.style.display = 'none');

      const popupId = icon.getAttribute('data-popup');
      const popup = document.getElementById(popupId);
      const rect = icon.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // 判断 icon 是否在屏幕下半部分
      const isBottomHalf = rect.top > windowHeight / 2;

      if (isBottomHalf) {
        // 弹窗在 icon 上方
        popup.style.top = `${rect.top + window.scrollY - popup.offsetHeight - 200}px`;
      } else {
        // 弹窗在 icon 下方
        popup.style.top = `${rect.top + window.scrollY + 70}px`;
      }

      popup.style.left = `${rect.left + window.scrollX}px`;
      popup.style.display = 'block';
    }
  });
});

// 点击 popup 自身可关闭（除非阻止）
popups.forEach(popup => {
  popup.addEventListener('click', () => {
    popup.style.display = 'none';
  });
});

// 关闭按钮功能（阻止事件冒泡）
closeButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const popup = btn.closest('.popup');
    popup.style.display = 'none';
  });
});

// 从 popup 中点击按钮打开另一个 popup
document.querySelectorAll('.open-popup').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const targetId = btn.getAttribute('data-target');
    const targetPopup = document.getElementById(targetId);
    if (targetPopup) {
      const rect = btn.getBoundingClientRect();
      targetPopup.style.top = `${rect.top + window.scrollY + 50}px`;
      targetPopup.style.left = `${rect.left + window.scrollX}px`;
      targetPopup.style.display = 'block';
    }
  });
});

