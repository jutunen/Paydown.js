
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

### Interest calculation

Daily interests are calculated with following rules:

- daily interest is always calculated for the whole day with a single rate
- daily interest is never calculated for a part of a day with multiple rates
- calculation start and end date interests are always included to the calculation completely
- payment day interest is calculated from the capital before the payment
- interest of the rate change day is calculated with the new rate