# cookies-to-local-webpack-plugin

Get the cookie under the domain name and write it to the local development environment

## example

```js
// ...
const cookiesToLocal = require('cookies-to-local-webpack-plugin')
module.exports = {
  webpack: override(
    // ...
    addWebpackPlugin(
      new cookiesToLocal({
        targetUrl: 'https://www.google.com',
        localPort: 8020,
        ars: ['--auto-open-devtools-for-tabs'],
        enable: process.env.NODE_ENV === 'development'
      })
    ),
  ),
  devServer: overrideDevServer(devProxy()),
}

```
