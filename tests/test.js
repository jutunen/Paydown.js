var Paydown = require('../dist/paydown-node.js')
var equal = require('deep-equal')
var data = require('./data.js')

const calculator = new Paydown()

var i
var rval_obj
var payments_array = []

for( i = 0; i < data.init_array.length; i++ )
  {
  console.log("Starting test with index " + i)
  try
    {
    rval_obj = calculator.calculate(data.init_array[i], data.event_array[i], payments_array)
    }
  catch(err)
    {
    throw(err)
    }

  judge(rval_obj, payments_array, data.rval_array[i], data.output_array[i], i)
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
    console.log("Object mismatch, test index value: " + i)
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
    console.log("Array mismatch, test index value: " + i)
    throw("Testing failed!")
    }

  }
