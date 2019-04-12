## Browser usage
Paydown functionality is utilized in the browser via IIFE (Immediately Invoked Function Expression) pattern.
When the script paydown-browser-iife.js is loaded, it defines a global object called Paydown, which can be called directly, there is no need to instantiate it.
### Include the script in HTML:
```html
 <script type="text/javascript" src="paydown-browser-iife.js"></script>
```
### When the script has been loaded, the global Paydown object can be called directly:
```javascript
 Paydown.calculate(paydown_init_data, events_array, payments_array)
```
