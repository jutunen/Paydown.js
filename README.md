# Paydown.js
Loan payment calculation library with advanced features.
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
     "actual_end_date":"30.6.2019"}

## Documentation

### Invoking the calculation

Paydown.calculate(init_data, events, payments)

#### Method arguments

Argument|Direction|Type|Optional|Description
--------|---------|----|--------|-----------
init_data|input|object|no|Initial calculation values
events|input|array of objects|yes|List of changes during calculation period
payments|output|array|yes|List of individual payments

#### Init_data properties

Name|Type|Optional|Description|Format / Values|Default value
----|----|--------|-----------|---------------|-------------
start_date|string|no|Calculation start date|"dd.mm.yyyy"
end_date|string|no|Calculation end date|"dd.mm.yyyy"
principal|number|no|Principal amount at the start date|
rate|number|no|Interest rate at the start date|
day_count_method|string|yes|Determines how interest accrues over time|"act/360"<br>"act/365"|"act/360"
payment_method|string|yes|Sets payment method for recurring payments|"equal_installment"<br>"equal_reduction"|"equal_installment"
round_values|boolean|yes|Sets output value rounding to 2 decimals|true<br>false|true
include_unpaid_interest|boolean|yes|Determines whether final "loose" interests shall be added to the total sum of interests|true<br>false|true
recurring|object|yes|Defines recurring payments|See below|

#### Recurring properties

Name|Type|Optional|Description|Format / Values
----|----|--------|-----------|---------------
amount|number|no|The amount of recurring payment|
first_payment_date|string|no|First recurring payment date|"dd.mm.yyyy"
payment_day|number|no|Monthly payment day of the recurring payment, applied after the month of the first payment date|1 - 31<br>31 equals to the last day of the month

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
sum_of_interests|Sum of accrued interests during calculation period
sum_of_reductions|Total amount of the principal reduction during calculation period
sum_of_installments|Total sum of interests and reductions during calculation period
remaining_principal|Remaining principal after calculation end date
days_calculated|Number of days in the calculation period
actual_end_date|Actual calculation end date

If Paydown.calculate method is provided with an array as its 3rd argument, the array contents are interpreted as follows:

    [ date, interest rate, installment, principal reduction, interest, remaining principal ]

## To Do
- test scripts
- better input validation
- better documentation
- more day count methods
- length setting of recurring payment period
- debug printing / verbose mode
- loan term features
- "interests only" payment method
- etc.

## Contributing
Contributions are welcome.

## License
Copyright (c) 2019 Jussi Utunen

Licensed under the MIT License
