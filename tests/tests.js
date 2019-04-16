var Paydown = require('../dist/paydown-node.js')
var equal = require('deep-equal')

// 1.

const init_1 = {"start_date":"01.01.2017","end_date":"05.08.2017","principal":50000,"rate":3,"day_count_method":"act/360","recurring":{"amount":900,"payment_method":"equal_installment","first_payment_date":"05.03.2017","payment_day":5}}

const events_1 = []

const rval_1 = {"sum_of_interests":876.3,"sum_of_reductions":4523.7,"sum_of_installments":5400,"remaining_principal":45476.3,"days_calculated":217,"actual_end_date":"05.08.2017","latest_payment_date":"05.08.2017","unpaid_interest":0}

const out_1 = [["01.01.2017",3,"-","-","-",50000],["05.03.2017",3,900,633.33,266.67,49366.67],["05.04.2017",3,900,772.47,127.53,48594.2],["05.05.2017",3,900,778.51,121.49,47815.68],["05.06.2017",3,900,776.48,123.52,47039.21],["05.07.2017",3,900,782.4,117.6,46256.8],["05.08.2017",3,900,780.5,119.5,45476.3]]

// 2.

const init_2 = {"start_date":"01.01.2018","end_date":"01.01.2019","principal":50000,"rate":2,"day_count_method":"act/360","recurring":{"amount":464,"payment_method":"equal_installment","first_payment_date":"05.02.2018","payment_day":5}}

const events_2 = [{"date":"01.07.2018","rate":4,"recurring_amount":505}]

const rval_2 = {"sum_of_interests":1457.68,"sum_of_reductions":4030.23,"sum_of_installments":5350,"remaining_principal":45969.77,"days_calculated":366,"actual_end_date":"01.01.2019","latest_payment_date":"05.12.2018","unpaid_interest":137.91}

const out_2 = [["01.01.2018",2,"-","-","-",50000],["05.02.2018",2,464,364,100,49636],["05.03.2018",2,464,386.79,77.21,49249.21],["05.04.2018",2,464,379.18,84.82,48870.03],["05.05.2018",2,464,382.55,81.45,48487.48],["05.06.2018",2,464,380.49,83.51,48106.99],["01.07.2018",4,"-","-","-",48106.99],["05.07.2018",4,505,411.46,93.54,47695.53],["05.08.2018",4,505,340.72,164.28,47354.81],["05.09.2018",4,505,341.89,163.11,47012.92],["05.10.2018",4,505,348.29,156.71,46664.63],["05.11.2018",4,505,344.27,160.73,46320.37],["05.12.2018",4,505,350.6,154.4,45969.77],["01.01.2019",4,"-","-",137.91,45969.77]]

// 3.

const init_3 = {"start_date":"01.01.2019","end_date":"05.08.2019","principal":50000,"rate":3,"day_count_method":"act/360"}

const events_3 = [{"date":"01.07.2019","pay_reduction":5000}]

const rval_3 = {"sum_of_interests":889.58,"sum_of_reductions":5000,"sum_of_installments":5758.33,"remaining_principal":45000,"days_calculated":217,"actual_end_date":"05.08.2019","latest_payment_date":"01.07.2019","unpaid_interest":131.25}

//const out_3 = [["01.01.2019",3,"-","-","-",50000],["01.07.2019",3,5758.33,5000,758.33,45000,""],["05.08.2019",3,"-","-",131.25,45000]]
const out_3 = [["01.01.2019",3,"-","-","-",50000],["01.07.2019",3,5758.33,5000,758.33,45000],["05.08.2019",3,"-","-",131.25,45000]]

/*
console.log("start!")
console.log(JSON.stringify(init_1))
console.log(JSON.stringify(events_1))
console.log(JSON.stringify(rval_1))
console.log(JSON.stringify(out_1))

console.log(JSON.stringify(init_2))
console.log(JSON.stringify(events_2))
console.log(JSON.stringify(rval_2))
console.log(JSON.stringify(out_2))

console.log(JSON.stringify(init_3))
console.log(JSON.stringify(events_3))
console.log(JSON.stringify(rval_3))
console.log(JSON.stringify(out_3))
console.log("end!")
*/

const init_array = [init_1, init_2, init_3]
const event_array = [events_1, events_2, events_3]
const rval_array = [rval_1, rval_2, rval_3]
const output_array = [out_1, out_2, out_3]

const calculator = new Paydown()

var i
var rval_obj
var payments_array = []

for( i = 0; i < init_array.length; i++ )
  {
  console.log("Starting test with index " + i)
  try
    {
    rval_obj = calculator.calculate(init_array[i], event_array[i], payments_array)
    }
  catch(err)
    {
    throw(err)
    }

  judge(rval_obj, payments_array, rval_array[i], output_array[i], i)
  payments_array = []
  }

console.log("All tests passed!")

function judge(eval_obj, eval_array, expected_obj, expected_array, index)
  {
  //var eval_obj_str = JSON.stringify(eval_obj)
  //var expected_obj_str = JSON.stringify(expected_obj)

  if(!equal(eval_obj, expected_obj))
    {
    console.log("test result object: ")
    console.log(eval_obj)
    console.log("expected object: ")
    console.log(expected_obj)
    console.log("Object mismatch, index value: " + i)
    throw("Testing failed!")
    }

  var eval_array_str = JSON.stringify(eval_array)
  var expected_array_str = JSON.stringify(expected_array)

  if(eval_array_str !== expected_array_str)
    {
    console.log("test result array: ")
    console.log(eval_array)
    console.log("expected array: ")
    console.log(expected_array)
    console.log("Array mismatch, index value: " + i)
    throw("Testing failed!")
    }

  }
