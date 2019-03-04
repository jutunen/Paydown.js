
var Paydown = require('../paydown.js')

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
