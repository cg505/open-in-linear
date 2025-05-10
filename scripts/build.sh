#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname $0)"/..

./scripts/build_firefox.sh
./scripts/build_chrome.sh
