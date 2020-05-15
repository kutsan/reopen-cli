# `reopen-cli` [![npm](https://img.shields.io/npm/v/reopen-cli?style=flat-square)](https://www.npmjs.com/package/reopen-cli)

|        | Comparison with macOS's `open`       |
|--------|--------------------------------------|
| open   | ![](https://i.imgur.com/frcd25E.gif) |
| reopen | ![](https://i.imgur.com/PgMxiUH.gif) |

## Requirements

- `osascript` which is pre-installed macOS utility
- Google Chrome

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
npm install --global reopen-cli
```

## Usage

### Synopsis

```sh
reopen '<url>'
```

### Example

```sh
reopen 'https://devdocs.io/#q=html'
reopen 'https://devdocs.io/#q=react'
```

### Using with vim

Although you can use with any URL, one particular example would be opening
[devdocs.io](https://devdocs.io) upon pressing `'keywordprg'` mapping which is `K` by default.

Create a command.

```vim
command! -nargs=* Docs call system(printf('reopen "https://devdocs.io/?q=%s"', <q-args>))
```

Set `'keywordprg'` to that command.

```vim
set keywordprg=:Docs
```

Now, pressing `K` under any keyword (or e.g. `:Docs child_process`) will bring
DevDocs docs and repeating that would replace current open tab.

## License

GPL-3.0
