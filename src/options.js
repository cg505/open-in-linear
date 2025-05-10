document.addEventListener('DOMContentLoaded', restore);
document.getElementById('save').addEventListener('click', save);

function save() {
  const token = document.getElementById('token').value.trim();
  chrome.storage.sync.set({ linearToken: token }, () => {
    const status = document.getElementById('status');
    status.textContent = 'Saved!';
    setTimeout(() => status.textContent = '', 2000);
  });
}

function restore() {
  chrome.storage.sync.get(['linearToken'], (result) => {
    if (result.linearToken) {
      document.getElementById('token').value = result.linearToken;
    }
  });
}