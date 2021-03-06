## Functions

<dl>
<dt><a href="#consoleProxy">consoleProxy(opts)</a> ⇒ <code><a href="#prodConsole">prodConsole</a></code></dt>
<dd><p>Substitutes the global console with Proxy that wraps around the original
and allows to switch on/off the console when needed.</p>
<p>Additionally sets global variable <strong>__prod_console__</strong> in case
you need to disable or enable the console immediately</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#prodConsole">prodConsole</a> : <code>Object.&lt;string, function()&gt;</code></dt>
<dd></dd>
<dt><a href="#opts">opts</a> : <code>Object</code></dt>
<dd></dd>
</dl>

<a name="consoleProxy"></a>

## consoleProxy(opts) ⇒ [<code>prodConsole</code>](#prodConsole)
Substitutes the global console with Proxy that wraps around the original
and allows to switch on/off the console when needed.

Additionally sets global variable **\_\_prod_console\_\_** in case
you need to disable or enable the console immediately

**Kind**: global function  
**Returns**: [<code>prodConsole</code>](#prodConsole) - API that lets a user to switch on and off the methods of the console  

| Param | Type |
| --- | --- |
| opts | [<code>opts</code>](#opts) | 

**Example**  
```js
const {NODE_ENV} = process.env
const prodConsole = consoleProxy()
// or
const prodConsole = consoleProxy({monitor: false}) // to disable info that the console has been turned off
NODE_ENV === 'production' && prodConsole.switchConsole('off')
// or
NODE_ENV === 'production' && __prod_console__.switchConsole('off')

// to enable console output

prodConsole.switchConsole('on') || __prod_console__.switchConsole('on')
```
<a name="prodConsole"></a>

## prodConsole : <code>Object.&lt;string, function()&gt;</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| switchConsole | <code>function</code> | Activates or disables console in the window object |

**Example**  
```js
prodConsole.switchConsole('on') // Enables console output
prodConsole.switchConsole('off') // Disables console output
```
<a name="opts"></a>

## opts : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [monitor] | <code>boolean</code> | <code>true</code> | When console output is switched off, this parameter allows you to display a message informing that the console has been turned off |

