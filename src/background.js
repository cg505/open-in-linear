// background.js (shared between Chrome MV3 service worker and Firefox MV2 background page)
async function getToken() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(['linearToken'], (result) => {
      resolve(result.linearToken);
    });
  });
}

const actionApi = chrome.action || chrome.browserAction;

actionApi.onClicked.addListener(async (tab) => {
  const githubUrl = tab.url;
  const issueOrPrRegex = /^https:\/\/github\.com\/[^/]+\/[^/]+\/(issues|pull)\/\d+/;
  if (!issueOrPrRegex.test(githubUrl)) {
    chrome.notifications.create({
      type: 'basic',
      title: 'Open Linear',
      message: 'This page is not a GitHub issue or pull request.',
      iconUrl: ''
    });
    return;
  }

  const token = await getToken();
  if (!token) {
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage();
    } else {
      chrome.tabs.create({ url: chrome.runtime.getURL('options.html') });
    }
    return;
  }

  const query = `
    query FindGitHub($url: String!) {
      issues(filter: { attachments: { url: { eq: $url } } }) {
        nodes { url }
      }
    }`;

  let res;
  try {
    res = await fetch('https://api.linear.app/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify({ query, variables: { url: githubUrl } })
    });
  } catch (err) {
    chrome.notifications.create({
      type: 'basic',
      title: 'Open Linear',
      message: 'Network error: ' + err,
      iconUrl: ''
    });
    return;
  }

  if (!res.ok) {
    chrome.notifications.create({
      type: 'basic',
      title: 'Open Linear',
      message: 'Linear API request failed: ' + res.status,
      iconUrl: ''
    });
    return;
  }

  const json = await res.json();
  const nodes = json?.data?.issues?.nodes;
  const urls = Array.isArray(nodes) ? nodes.map((node) => node?.url).filter(Boolean) : [];

  if (urls.length === 0) {
    chrome.notifications.create({
      type: 'basic',
      title: 'Open Linear',
      message: 'No matching Linear issue found.',
      iconUrl: ''
    });
    return;
  }

  if (urls.length == 1) {
    chrome.tabs.update(tab.id, { url: urls[0] });
    return;
  }

  for (const url of urls) {
    chrome.tabs.create({
      url,
      index: typeof tab.index === 'number' ? tab.index + 1 : undefined
    });
  }
});
