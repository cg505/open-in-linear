#!/usr/bin/env bash
set -euo pipefail

# Build directory
DIST_DIR="dist"
OUT_DIR="$DIST_DIR/chrome"
ZIP_NAME="open-linear-chrome.zip"

# Clean
rm -rf "$OUT_DIR" "$DIST_DIR/$ZIP_NAME"
mkdir -p "$OUT_DIR"

# Copy sources
cp src/* "$OUT_DIR"
cp manifests/manifest.chrome.json "$OUT_DIR/manifest.json"

# Zip
pushd "$OUT_DIR" > /dev/null
zip -r "../$ZIP_NAME" .
popd > /dev/null

echo "Chrome package created at $DIST_DIR/$ZIP_NAME"