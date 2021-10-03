#!/bin/sh

if [ -z "$1" ]; then
    echo "Must supply Maven version argument"
    exit 1
fi

maven_version="$(mvn --v)"
if ! echo "$maven_version" | grep -q --fixed-strings /opt/hostedtoolcache/maven/"$1"/x64; then
    echo "Unexpected version"
    exit 1
fi
