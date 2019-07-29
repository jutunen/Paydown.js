## Node.js usage examples
### Basic usage
#### Example script 1 (basic_usage.js):
```javascript
var Paydown = require('./paydown-node.js')

var init_data =
  {
  "start_date"             : "1.1.2019",
  "end_date"               : "30.6.2019",
  "principal"              : 100000,
  "rate"                   : 3.5,
  "recurring":
    {
     "amount"              : 1000,
     "first_payment_date"  : "31.1.2019",
     "payment_day"         : 31
    }
  }

var payments_array = []
var rval_obj
var calculator = new Paydown()

try
  {
  rval_obj = calculator.calculate(init_data, "", payments_array)
  }
catch(err)
  {
  throw(err)
  }

for( var i = 0; i < payments_array.length; i++ )
  {
  console.log( JSON.stringify( payments_array[i] ) )
  }

console.log( JSON.stringify( rval_obj ) );
```
#### Example script 1 output:

    ["01.01.2019",3.5,"-","-","-",100000,0]
    ["31.01.2019",3.5,1000,698.61,301.39,99301.39,0]
    ["28.02.2019",3.5,1000,729.68,270.32,98571.71,0]
    ["31.03.2019",3.5,1000,702.92,297.08,97868.79,0]
    ["30.04.2019",3.5,1000,714.55,285.45,97154.24,0]
    ["31.05.2019",3.5,1000,707.19,292.81,96447.06,0]
    ["30.06.2019",3.5,1000,718.7,281.3,95728.36,0]
    {"sum_of_interests":1728.36,
     "sum_of_reductions":4271.64,
     "sum_of_installments":6000,
     "remaining_principal":95728.36,
     "days_calculated":181,
     "actual_end_date":"30.6.2019",
     "latest_payment_date":"30.6.2019",
     "unpaid_interest":0,
     "sum_of_fees":0}

### Advanced usage
#### Example script 2 (advanced_usage.js):
```javascript
var Paydown = require('./paydown-node.js')

var init_data =
  {
  "start_date"             : "1.1.2019",
  "end_date"               : "30.6.2019",
  "principal"              : 100000,
  "rate"                   : 3.5,
  "day_count_method"       : "act/365",
  "recurring":
    {
     "amount"              : 1000,
     "payment_method"      : "equal_reduction",     
     "first_payment_date"  : "31.1.2019",
     "payment_day"         : 31
    }
  }

var event_obj =
  {
  "date":             "15.3.2019",
  "rate":             5,
  "recurring_amount": 1500
  }

var event_obj_2 =
  {
  "date":             "15.5.2019",
  "pay_reduction":    4000
  }

var events_array = []
events_array.push(event_obj)
events_array.push(event_obj_2)

var payments_array = []
var rval_obj
var calculator = new Paydown()

try
  {
  rval_obj = calculator.calculate(init_data, events_array, payments_array)
  }
catch(err)
  {
  throw(err)
  }

for( var i = 0; i < payments_array.length; i++ )
  {
  console.log(JSON.stringify( payments_array[i]) )
  }

console.log(JSON.stringify(rval_obj));
```
#### Example script 2 output:
    ["01.01.2019",3.5,"-","-","-",100000,0]
    ["31.01.2019",3.5,1297.26,1000,297.26,99000,0]
    ["28.02.2019",3.5,1265.81,1000,265.81,98000,0]
    ["15.03.2019",5,"-","-","-",98000,"-"]
    ["31.03.2019",5,1859.78,1500,359.78,96500,0]
    ["30.04.2019",5,1896.58,1500,396.58,95000,0]
    ["15.05.2019",5,4195.21,4000,195.21,91000,0]
    ["31.05.2019",5,1699.45,1500,199.45,89500,0]
    ["30.06.2019",5,1867.81,1500,367.81,88000,0]
    {"sum_of_interests":2081.89,
     "sum_of_reductions":12000,
     "sum_of_installments":14081.89,
     "remaining_principal":88000,
     "days_calculated":181,
     "actual_end_date":"30.6.2019",
     "latest_payment_date":"30.6.2019",
     "unpaid_interest":0,
     "sum_of_fees":0}
