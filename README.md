# Open in Linear

Quickly jump from a public GitHub issue to the corresponding private Linear ticket.

## Prerequisites

* **zip** CLI available in your PATH (most macOS/Linux systems have it; on Windows use Git Bash or WSL).

## Building

```bash
# Chrome / Edge
./scripts/build_chrome.sh
# -> dist/open-linear-chrome.zip

# Firefox
./scripts/build_firefox.sh
# -> dist/open-linear-firefox.zip
```

Upload the resulting ZIPs directly to the Chrome Web Store and AMO (choose *unlisted* if you don’t want them public).  
Both zips already contain the correct `manifest.json` for their respective stores.

## Development tips

* **Local install (Chrome)**  
  `chrome://extensions` → *Developer mode* → *Load unpacked* → select `dist/chrome/`.

* **Local install (Firefox)**  
  `about:debugging` → *This Firefox* → *Load Temporary Add‑on* → pick any file in `dist/firefox/`.

* Increment the **"version"** field in both manifests when you’re ready to push an update.

## License

Open in Linear is distributed under the MIT license, which can be found in LICENSE.md.
