.EXPORT_ALL_VARIABLES:
.PHONY: npm publish release-chrome release-firefox release

include .env

npm:
	npm install

release-chrome:
	npm run release:chrome

release-firefox:
	npm run release:firefox

release:	release-chrome	release-firefox

dev:
	npm run watch
