#/bin/bash

for dir in */; do (cd "$dir" && rm -Rf node_modules && rm package-lock.json); done