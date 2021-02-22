#!/usr/bin/env osascript -l JavaScript

// Make `$.exit()` NodeJS style `process.exit()` to keep me sane.
ObjC.import('stdlib')
const process = { exit: $.exit }

// OSA scripts don't normally support command-line arguments.
// This hack will set argv array to current arguments. argv[0]
// will be current file name, argv[1] will be first argument,
// and so on.
function buildArguments() {
  ObjC.import('Foundation')

  process.argv = []

  const args = $.NSProcessInfo.processInfo.arguments
  const argc = args.count

  for (let i = 3; i < argc; i++) {
    process.argv.push(ObjC.unwrap(args.objectAtIndex(i)))
  }
}
buildArguments()

// The URL to go.
const URL_TO_GO = process.argv[1]

// Regex for URL searching.
const URL_REGEX = new RegExp('https?://[^/ ]+').exec(URL_TO_GO)[0]

// The variable that will hold our target location.
// @type {number}
let target = null

// Get reference of global Google Chrome application.
const browser = Application('Google Chrome')

// Open a new empty window if there is none.
if (browser.windows.length === 0) {
  browser.Window().make()

  // New window will open a new empty tab by default.
  // This will be our target now.
  target = 0
}

// Get reference of first Google Chrome window and its tabs object.
const win = browser.windows.at(0)
const tabs = win.tabs

// Application('appName') will open that application if it's not already open.
// Chrome should open with a new window and a new tab. So, if there is only one
// tab and it's chrome://newtab, use it as our new target.
if (
  target === null &&
  tabs.at(0).url() === 'chrome://newtab/' &&
  tabs.length === 1
) {
  target = 0
}

// Otherwise, we should seek our target in current tabs.
if (target === null) {
  let urlsOfOpenTabs = []

  // Use for loop to gather open URLs because `tabs` is not an array!
  for (let i = 0; i < tabs.length; i++) {
    urlsOfOpenTabs.push(tabs.at(i).url())
  }

  // Find first tab index as our target.
  target = urlsOfOpenTabs.findIndex((url) => new RegExp(URL_REGEX).test(url))

  // If there is no target tab open.
  if (target === -1) {
    // Open new empty tab.
    target = tabs.push(browser.Tab()) - 1
  }
}

// Mutate URL of the target tab to URL_TO_GO.
// This will trigger a reload and thus go to that URL.
tabs[target].url = URL_TO_GO

// Make active tab to first tab.
win.activeTabIndex = target + 1

// Bring Google Chrome to foreground.
browser.activate()
