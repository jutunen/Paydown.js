## Browser usage
Paydown functionality is utilized in the browser via IIFE (Immediately Invoked Function Expression).
When the script paydown-browser-iife.js is included, it defines a global variable called Paydown.
### Include the script in HTML:
```html
 <script type="text/javascript" src="paydown-browser-iife.js"></script>
```
### When the script has been loaded, call the global Paydown object directly in your code:
```javascript
 Paydown.calculate(paydown_init_data, events_array, payments_array)
```
