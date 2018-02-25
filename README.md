# reopen

It needs `osascript` which is pre-installed macOS utility and Google Chrome.

[rhysd/devdocs.vim#4](https://github.com/rhysd/devdocs.vim/issues/4) is the reason for this repository.

## Features

- Should open Google Chrome if it's not already open.
- Should open a new window, if there is no window but Google Chrome is open.
- If there is only one window, one tab and it's new empty tab, it should use that tab.
- Should focus Google Chrome after opening the URL.
- Should focus first tab, if there is one or multiple.
- Should create a new tab, if there is none.
- Should preserve history.

## Installation

```sh
npm install reopen-cli --global
```

## Usage

### Synopsis

```sh
reopen <url> <regex for searching tabs>
```

### Example

```sh
reopen 'https://devdocs.io/#q=html' 'https://devdocs.io'
reopen 'https://devdocs.io/#q=react' 'https://devdocs.io'
```
