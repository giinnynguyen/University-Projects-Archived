#!/usr/bin/env bash
# Compile and run the game. Requires JDK 17+ (javac/java on PATH).
# Assets (png/wav/map*.txt) are loaded relative to this folder, so we always run from here.
set -euo pipefail
cd "$(dirname "$0")"
MAIN_CLASS="${1:-model.GameMain}"
rm -rf build/classes
mkdir -p build/classes
javac -encoding UTF-8 --release 17 -d build/classes $(find src -name '*.java')
# copy non-java resources from src (e.g. src/image) onto the classpath
(cd src && find . -type f ! -name '*.java' ! -name 'Thumbs.db' -exec sh -c 'mkdir -p "../build/classes/$(dirname "$1")" && cp "$1" "../build/classes/$1"' _ {} \;)
exec java -cp build/classes "$MAIN_CLASS"
