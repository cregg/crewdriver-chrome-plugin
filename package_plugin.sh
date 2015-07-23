#!/bin/sh
rm -r ../packaged-cd-plugin
rm -r ../packaged-cd-plugin.zip
mkdir ../packaged-cd-plugin
cp manifest.json ../packaged-cd-plugin
cp -r public ../packaged-cd-plugin
cp crew-driver-64x64.png ../packaged-cd-plugin
cp crewdriver-logo-57x57.png ../packaged-cd-plugin
cp crewdriver-logo.png ../packaged-cd-plugin
cp crewdriver_32x32.png ../packaged-cd-plugin
cp badges.js ../packaged-cd-plugin
zip -r ../plugin ../packaged-cd-plugin