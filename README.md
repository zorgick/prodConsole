Enables or disables **console** output in the browser when needed.

It doesn't add new methods, nor deletes existing ones from the console object. Nor it makes console
behave identically across all browsers. It is a simple switcher. That's it (: 

Uses Reflect and Proxy objects.

And yea, frick IE! Let it die already, geeze ;P So no support for IE.

But if you still want to support IE or you are forced to do it, use [core-js@3](https://www.npmjs.com/package/core-js) for Reflect and [proxy-polyfill](https://www.npmjs.com/package/proxy-polyfill) for Proxy.

Zero dependency package! Yippee-ki-yay, motherfricker!

# Example

The most common use case for disabling console is for production mode in distributed teams, when someone uses a hideous way to debug the code with console.log and leaves it there

**Require the module**

```js
import consoleProxy from 'consoleProxy'
```

**Usage**

```js
const {NODE_ENV} = process.env
const prodConsole = consoleProxy({
  monitor: false // disables info message if console is turned off
})
NODE_ENV === 'production' && prodConsole.switchConsole('off')  
// or
NODE_ENV === 'production' && __prod_console__.switchConsole('off')

// to enable console output

prodConsole.switchConsole('on') || __prod_console__.switchConsole('on')
```

# [API](./docs/API.md)