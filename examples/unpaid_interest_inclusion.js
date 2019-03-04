
var Paydown = require('../paydown.js')

var init_data =
{
  "start_date"                 : "1.1.2019",
  "end_date"                   : "20.7.2019",
  "principal"                  : 100000,
  "rate"                       : 3.5,
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
  console.log(JSON.stringify( payments_array[i]) )
  }

console.log(JSON.stringify(rval_obj));
