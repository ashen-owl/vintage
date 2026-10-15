#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"
RAW_DIR="$PROJECT_DIR/design-assets/raw"
OUT_DIR="$PROJECT_DIR/public/assets/images"

mkdir -p "$OUT_DIR"

if command -v magick >/dev/null 2>&1; then
  IMAGEMAGICK=(magick)
elif command -v convert >/dev/null 2>&1; then
  IMAGEMAGICK=(convert)
else
  echo "Error: ImageMagick is required. Install it first:"
  echo "  macOS: brew install imagemagick"
  echo "  Ubuntu/Debian: sudo apt-get install imagemagick"
  exit 1
fi

find_input() {
  local candidate

  for candidate in "$@"; do
    for ext in png jpg jpeg webp tif tiff; do
      if [[ -f "$RAW_DIR/$candidate.$ext" ]]; then
        printf '%s\n' "$RAW_DIR/$candidate.$ext"
        return 0
      fi
      if [[ -f "$RAW_DIR/$candidate.${ext^^}" ]]; then
        printf '%s\n' "$RAW_DIR/$candidate.${ext^^}"
        return 0
      fi
    done
  done

  return 1
}

rename_if_needed() {
  local current_base="$1"
  local target_base="$2"
  local source=""
  local target=""

  if source="$(find_input "$current_base")"; then
    local ext="${source##*.}"
    target="$RAW_DIR/$target_base.$ext"

    if [[ "$source" == "$target" ]]; then
      return 0
    fi

    if find_input "$target_base" >/dev/null 2>&1; then
      echo "- Kept $(basename "$(find_input "$target_base")"); $(basename "$source") also exists"
      return 0
    fi

    mv "$source" "$target"
    echo "↳ Renamed $(basename "$source") -> $(basename "$target")"
  fi
}

crop_webp() {
  local output_name="$1"
  local width="$2"
  local height="$3"
  local quality="$4"
  local gravity="$5"
  local required="$6"
  shift 6

  local input=""
  if input="$(find_input "$@")"; then
    local output="$OUT_DIR/$output_name"

    "${IMAGEMAGICK[@]}" "$input" \
      -auto-orient \
      -resize "${width}x${height}^" \
      -gravity "$gravity" \
      -extent "${width}x${height}" \
      -strip \
      -quality "$quality" \
      "$output"

    echo "✓ $output_name  ${width}x${height}  <-  $(basename "$input")"
  else
    if [[ "$required" == "required" ]]; then
      echo "✗ Missing required raw file for $output_name. Tried: $*"
      return 1
    fi

    echo "- Skipped optional $output_name. Tried: $*"
  fi
}

copy_optional_svg() {
  local input="$RAW_DIR/favicon.svg"
  local output="$OUT_DIR/favicon.svg"

  if [[ -f "$input" ]]; then
    cp "$input" "$output"
    echo "✓ favicon.svg copied to public/assets/images/favicon.svg"
  else
    echo "- Skipped optional favicon.svg"
  fi
}

echo "Processing vintage jewellery assets..."
echo "Raw:    $RAW_DIR"
echo "Output: $OUT_DIR"
echo ""

echo "Normalizing raw filenames..."

# Numbered mapping for the current raw folder:
# 1 = parchment grain
# 2 = hero necklace
# 3 = collection chain
# 4 = collection signet
# 5 = collection locket
# 6 = atelier restoration bench

rename_if_needed "1" "raw-parchment-grain"
rename_if_needed "2" "raw-hero-necklace-on-velvet"
rename_if_needed "3" "raw-collection-chain"
rename_if_needed "4" "raw-collection-signet"
rename_if_needed "5" "raw-collection-locket"
rename_if_needed "6" "raw-atelier-restoration-bench"
rename_if_needed "social-preview" "raw-social-preview"

echo ""
echo "Cropping and converting to WEBP..."

crop_webp "parchment-grain.webp" 1200 1200 86 Center required \
  "raw-parchment-grain" "parchment-grain"

crop_webp "hero-necklace-on-velvet.webp" 1800 2300 88 Center required \
  "raw-hero-necklace-on-velvet" "hero-necklace-on-velvet"

crop_webp "collection-chain.webp" 1400 1900 88 Center required \
  "raw-collection-chain" "collection-chain"

crop_webp "collection-signet.webp" 1400 2100 88 Center required \
  "raw-collection-signet" "collection-signet"

crop_webp "collection-locket.webp" 1400 1900 88 Center required \
  "raw-collection-locket" "collection-locket"

crop_webp "atelier-restoration-bench.webp" 1700 2200 88 Center required \
  "raw-atelier-restoration-bench" "atelier-restoration-bench"

crop_webp "social-preview.webp" 1200 630 88 Center optional \
  "raw-social-preview" "social-preview"

copy_optional_svg

echo ""
echo "Done. Final assets are in public/assets/images/."
