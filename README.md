# Paydown.js
## Features
- freely selectable calculation period
- daily interest calculation
- recurring payment generation
- day count methods supported: 
  - act / 360
  - act / 365 
- payment methods supported: 
  - equal installment
  - equal principal reduction
- freely settable rate changes and extra payments
## Basic usage example
#### Sample script 1:
```javascript
var Paydown = require('./paydown.js')

var init_data =
{
  "start_date"             : "1.1.2019",
  "end_date"               : "31.12.2019",
  "principal"              : 100000,
  "rate"                   : 3.5,
  "recurring":
    {
     "amount"              : 1000,
     "first_payment_date"  : "1.1.2019",
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
    "actual_end_date":"30.6.2019"}

## Advanced usage example
#### Sample script 2:
```javascript
var Paydown = require('./paydown.js')

var init_data =
{
  "start_date"                 : "1.1.2019",
  "end_date"                   : "30.6.2019",
  "principal"                  : 100000,
  "rate"                       : 3.5,
  "day_count_method"           : "act/365",
  "payment_method"             : "equal_installment",
  "recurring":
    {
     "amount"              : 1000,
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
    ["31.01.2019",3.5,1000,702.74,297.26,99297.26]
    ["28.02.2019",3.5,1000,733.39,266.61,98563.87]
    ["15.03.2019",5,"-","-","-",98563.87]
    ["31.03.2019",5,1500,1138.15,361.85,97425.72]
    ["30.04.2019",5,1500,1099.62,400.38,96326.1]
    ["15.05.2019",5,4197.93,4000,197.93,92326.1]
    ["31.05.2019",5,1500,1297.64,202.36,91028.46]
    ["30.06.2019",5,1500,1125.91,374.09,89902.55]
    {"sum_of_interests":2100.48,
    "sum_of_reductions":10097.45,
    "sum_of_installments":12197.93,
    "remaining_principal":89902.55,
    "days_calculated":181,
    "actual_end_date":"30.6.2019"}
