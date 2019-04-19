[![npm version](https://badge.fury.io/js/paydown.svg)](https://badge.fury.io/js/paydown)
# Paydown.js
Loan payment calculation library with advanced features.
## Features
- freely selectable calculation period
- daily interest calculation
- recurring payments
- day count methods supported:
  - act / 360
  - act / 365
- payment methods supported:
  - equal installment
  - equal principal reduction
- freely settable rate changes and extra payments
## Browser usage
See https://github.com/jutunen/Paydown.js/tree/master/dist#browser-usage
## Basic node.js usage example
#### Sample script 1:
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
     "payment_day"         : 31,
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
#### Sample script 1 output:

    ["01.01.2019",3.5,"-","-","-",100000]
    ["31.01.2019",3.5,1000,698.61,301.39,99301.39]
    ["28.02.2019",3.5,1000,729.68,270.32,98571.71]
    ["31.03.2019",3.5,1000,702.92,297.08,97868.79]
    ["30.04.2019",3.5,1000,714.55,285.45,97154.24]
    ["31.05.2019",3.5,1000,707.19,292.81,96447.06]
    ["30.06.2019",3.5,1000,718.7,281.3,95728.36]
    {"sum_of_interests":1728.36,
     "sum_of_reductions":4271.64,
     "sum_of_installments":6000,
     "remaining_principal":95728.36,
     "days_calculated":181,
     "actual_end_date":"30.6.2019",
     "latest_payment_date":"30.6.2019",
     "unpaid_interest":0}

## Advanced node.js usage example
#### Sample script 2:
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
     "payment_day"         : 31,
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
#### Sample script 2 output:
    ["01.01.2019",3.5,"-","-","-",100000]
    ["31.01.2019",3.5,1297.26,1000,297.26,99000]
    ["28.02.2019",3.5,1265.81,1000,265.81,98000]
    ["15.03.2019",5,"-","-","-",98000]
    ["31.03.2019",5,1859.78,1500,359.78,96500]
    ["30.04.2019",5,1896.58,1500,396.58,95000]
    ["15.05.2019",5,4195.21,4000,195.21,91000]
    ["31.05.2019",5,1699.45,1500,199.45,89500]
    ["30.06.2019",5,1867.81,1500,367.81,88000]
    {"sum_of_interests":2081.89,
     "sum_of_reductions":12000,
     "sum_of_installments":14081.89,
     "remaining_principal":88000,
     "days_calculated":181,
     "actual_end_date":"30.6.2019",
     "latest_payment_date":"30.6.2019",
     "unpaid_interest":0}

## GUI demo

Both examples above are available in the GUI demo, see http://51.255.43.70/paydown-demo/

Use import buttons to get the input values and then click Calculate.

## Documentation

### Invoking the calculation
```javascript
Paydown.calculate(init_data, events, payments, debug_log)
```
The calculate method can be considered as pure, Paydown object doesn't preserve any state after it has been called.
#### Method arguments

Argument|Direction|Type|Optional|Description
--------|---------|----|--------|-----------
init_data|input|object|no|Initial calculation values
events|input|array of objects|yes|List of changes during calculation period
payments|output|array|yes|List of individual payments
debug_log|output|array|yes|Detailed info about paid interests etc.

#### Init_data object properties

Name|Type|Optional|Description|Format / Values|Default value
----|----|--------|-----------|---------------|-------------
start_date|string|no|Calculation start date|"dd.mm.yyyy"
end_date|string|no|Calculation end date|"dd.mm.yyyy"
principal|number|no|Principal amount at the start date|
rate|number|no|Interest rate at the start date|
day_count_method|string|yes|Determines how interest accrues over time|"act/360"<br>"act/365"|"act/360"
round_values|boolean|yes|Sets output value rounding to 2 decimals|true<br>false|true
debug_logging|boolean|yes|Enables debug logging|true<br>false|false
recurring|object|yes|Defines recurring payments|See below|

#### Recurring object properties

Name|Type|Optional|Description|Format / Values|Default value
----|----|--------|-----------|---------------|-------------
amount|number|no|The amount of recurring payment||
payment_method|string|yes|Payment method for recurring payments|"equal_installment"<br>"equal_reduction"|"equal_installment"
first_payment_date|string|no|First recurring payment date|"dd.mm.yyyy"|
payment_day|number|no|Monthly payment day of the recurring payment, applied after the month of the first payment date|1 - 31<br>31 equals to the last day of the month|

#### Event object properties

Name|Type|Optional|Description|Format / Values
----|----|--------|-----------|---------------
date|string|no|Event date|"dd.mm.yyyy"
rate|number|yes|New interest rate|
recurring_amount|number|yes|New recurring payment amount|
pay_installment|number|yes|Individual installment payment|
pay_reduction|number|yes|Individual principal reduction payment|

### Calculation results

Paydown.calculate method returns an object with following properties:

Name|Description
----|-----------
sum_of_interests|Total sum of accrued interests during calculation period
sum_of_reductions|Total amount of the principal reductions during calculation period
sum_of_installments|Total sum of installments during calculation period
remaining_principal|Remaining principal after calculation end date
days_calculated|Number of days in the calculation period
actual_end_date|Actual calculation end date
latest_payment_date|Latest payment date
unpaid_interest|Interests accrued after latest payment date

If Paydown.calculate method is provided with an array as its 3rd argument, the array contents are interpreted as follows:

    [ date, interest rate, installment, principal reduction, interest, remaining principal ]

### Debug logging

Debug logging can be enabled by setting init_data object property *debug_logging* to *true*.

Debug data shall be logged to an array, if Paydown.calculate method is provided with an array as its 4th argument, otherwise debug data shall be logged through console.log.

## To Do
- more tests
- better input validation
- better documentation
- more day count methods
- length setting of recurring payment period
- loan term features
- "interests only" payment method
- etc.

## Contributing
Contributions are welcome.

## License
Copyright (c) 2019 Jussi Utunen

Licensed under the MIT License
