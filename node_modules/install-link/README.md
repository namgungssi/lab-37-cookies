# npm-install-link

Install and link local repositories

[![NPM Version][npm-image]][npm-url]

```json
{
  "name": "my-node-app",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "prepublish": "install-link",
    "test": "grunt check"
  },
  "links": [
    "../config",
    "../libs"
  ],
  "dependencies": {
    "install-link": "^0.1.0"
  }
}
```

## Usage

Add "links" property which contains relative paths of local repositories in package.json.

Then run `install-link`

## Installation

```
$ npm install install-link --save
```

## License

MIT

[npm-image]: https://img.shields.io/npm/v/install-link.svg
[npm-url]: https://npmjs.org/package/install-link
