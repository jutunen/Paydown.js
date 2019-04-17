var Paydown = require('../dist/paydown-node.js')
var equal = require('deep-equal')

// 1. == Esimerkki 1

const init_1 = {"start_date":"01.01.2017","end_date":"05.08.2017","principal":50000,"rate":3,"day_count_method":"act/360","recurring":{"amount":900,"payment_method":"equal_installment","first_payment_date":"05.03.2017","payment_day":5}}

const events_1 = []

const rval_1 = {"sum_of_interests":876.3,"sum_of_reductions":4523.7,"sum_of_installments":5400,"remaining_principal":45476.3,"days_calculated":217,"actual_end_date":"05.08.2017","latest_payment_date":"05.08.2017","unpaid_interest":0}

const out_1 = [["01.01.2017",3,"-","-","-",50000],["05.03.2017",3,900,633.33,266.67,49366.67],["05.04.2017",3,900,772.47,127.53,48594.2],["05.05.2017",3,900,778.51,121.49,47815.68],["05.06.2017",3,900,776.48,123.52,47039.21],["05.07.2017",3,900,782.4,117.6,46256.8],["05.08.2017",3,900,780.5,119.5,45476.3]]

// 2. == Esimerkki 2

const init_2 = {"start_date":"01.01.2018","end_date":"01.01.2019","principal":50000,"rate":2,"day_count_method":"act/360","recurring":{"amount":464,"payment_method":"equal_installment","first_payment_date":"05.02.2018","payment_day":5}}

const events_2 = [{"date":"01.07.2018","rate":4,"recurring_amount":505}]

const rval_2 = {"sum_of_interests":1457.68,"sum_of_reductions":4030.23,"sum_of_installments":5350,"remaining_principal":45969.77,"days_calculated":366,"actual_end_date":"01.01.2019","latest_payment_date":"05.12.2018","unpaid_interest":137.91}

const out_2 = [["01.01.2018",2,"-","-","-",50000],["05.02.2018",2,464,364,100,49636],["05.03.2018",2,464,386.79,77.21,49249.21],["05.04.2018",2,464,379.18,84.82,48870.03],["05.05.2018",2,464,382.55,81.45,48487.48],["05.06.2018",2,464,380.49,83.51,48106.99],["01.07.2018",4,"-","-","-",48106.99],["05.07.2018",4,505,411.46,93.54,47695.53],["05.08.2018",4,505,340.72,164.28,47354.81],["05.09.2018",4,505,341.89,163.11,47012.92],["05.10.2018",4,505,348.29,156.71,46664.63],["05.11.2018",4,505,344.27,160.73,46320.37],["05.12.2018",4,505,350.6,154.4,45969.77],["01.01.2019",4,"-","-",137.91,45969.77]]

// 3. == Esimerkki 4

const init_3 = {"start_date":"01.01.2019","end_date":"05.08.2019","principal":50000,"rate":3,"day_count_method":"act/360"}

const events_3 = [{"date":"01.07.2019","pay_reduction":5000}]

const rval_3 = {"sum_of_interests":889.58,"sum_of_reductions":5000,"sum_of_installments":5758.33,"remaining_principal":45000,"days_calculated":217,"actual_end_date":"05.08.2019","latest_payment_date":"01.07.2019","unpaid_interest":131.25}

//const out_3 = [["01.01.2019",3,"-","-","-",50000],["01.07.2019",3,5758.33,5000,758.33,45000,""],["05.08.2019",3,"-","-",131.25,45000]]
const out_3 = [["01.01.2019",3,"-","-","-",50000],["01.07.2019",3,5758.33,5000,758.33,45000],["05.08.2019",3,"-","-",131.25,45000]]

// 4. == rel_tests_2/rel_test_1.html

const init_4 = {"start_date":"01.07.2018","end_date":"01.10.2020","principal":500000,"rate":1.25,"day_count_method":"act/360","recurring":{"amount":4000,"payment_method":"equal_installment","first_payment_date":"31.07.2018","payment_day":31}}

const events_4 = []

const rval_4 = {"sum_of_interests":13001.86,"sum_of_reductions":95012.21,"sum_of_installments":108000.01,"remaining_principal":404987.79,"days_calculated":824,"actual_end_date":"01.10.2020","latest_payment_date":"30.09.2020","unpaid_interest":14.06}

const out_4 = [["01.07.2018",1.25,"-","-","-",500000],["31.07.2018",1.25,4000,3461.81,538.19,496538.19],["31.08.2018",1.25,4000,3465.53,534.47,493072.66],["30.09.2018",1.25,4000,3486.38,513.62,489586.28],["31.10.2018",1.25,4000,3473.01,526.99,486113.27],["30.11.2018",1.25,4000,3493.63,506.37,482619.63],["31.12.2018",1.25,4000,3480.51,519.49,479139.12],["31.01.2019",1.25,4000,3484.26,515.74,475654.86],["28.02.2019",1.25,4000,3537.56,462.44,472117.3],["31.03.2019",1.25,4000,3491.82,508.18,468625.48],["30.04.2019",1.25,4000,3511.85,488.15,465113.64],["31.05.2019",1.25,4000,3499.36,500.64,461614.28],["30.06.2019",1.25,4000,3519.15,480.85,458095.13],["31.07.2019",1.25,4000,3506.91,493.09,454588.22],["31.08.2019",1.25,4000,3510.69,489.31,451077.53],["30.09.2019",1.25,4000,3530.13,469.87,447547.4],["31.10.2019",1.25,4000,3518.26,481.74,444029.14],["30.11.2019",1.25,4000,3537.47,462.53,440491.67],["31.12.2019",1.25,4000,3525.86,474.14,436965.81],["31.01.2020",1.25,4000,3529.65,470.35,433436.15],["29.02.2020",1.25,4000,3563.55,436.45,429872.6],["31.03.2020",1.25,4000,3537.29,462.71,426335.31],["30.04.2020",1.25,4000,3555.9,444.1,422779.41],["31.05.2020",1.25,4000,3544.92,455.08,419234.48],["30.06.2020",1.25,4000,3563.3,436.7,415671.19],["31.07.2020",1.25,4000,3552.58,447.42,412118.61],["31.08.2020",1.25,4000,3556.4,443.6,408562.21],["30.09.2020",1.25,4000,3574.41,425.59,404987.79],["01.10.2020",1.25,"-","-",14.06,404987.79]]

// 5. == rel_tests/rel_test_2.html

const init_5 = {"start_date":"12.12.2021","end_date":"28.02.2022","principal":1005000,"rate":2.222,"day_count_method":"act/360","recurring":{"amount":5000,"payment_method":"equal_installment","first_payment_date":"01.01.2022","payment_day":1}}

const events_5 = []

const rval_5 = {"sum_of_interests":4882.06,"sum_of_reductions":6781.47,"sum_of_installments":10000,"remaining_principal":998218.53,"days_calculated":79,"actual_end_date":"28.02.2022","latest_payment_date":"01.02.2022","unpaid_interest":1663.53}

const out_5 = [["12.12.2021",2.222,"-","-","-",1005000],["01.01.2022",2.222,5000,3697.35,1302.65,1001302.65],["01.02.2022",2.222,5000,3084.12,1915.88,998218.53],["28.02.2022",2.222,"-","-",1663.53,998218.53]]


// 6. == rel_tests/rel_test_20.html

const init_6 = {"start_date":"12.12.2021","end_date":"31.12.2022","principal":1005000,"rate":2.222,"day_count_method":"act/360","recurring":{"amount":5000,"payment_method":"equal_installment","first_payment_date":"01.01.2022","payment_day":1}}

const events_6 = [{"date":"28.02.2022","rate":0},{"date":"01.06.2022","rate":2.222},{"date":"01.10.2022","rate":1.5}]

const rval_6 =  {"sum_of_interests":15857.89,"sum_of_reductions":45341.68,"sum_of_installments":60000,"remaining_principal":959658.32,"days_calculated":385,"actual_end_date":"31.12.2022","latest_payment_date":"01.12.2022","unpaid_interest":1199.57}

const out_6 = [["12.12.2021",2.222,"-","-","-",1005000],["01.01.2022",2.222,5000,3697.35,1302.65,1001302.65],["01.02.2022",2.222,5000,3084.12,1915.88,998218.53],["28.02.2022",0,"-","-","-",998218.53],["01.03.2022",0,5000,3398.08,1601.92,994820.45],["01.04.2022",0,5000,5000,0,989820.45],["01.05.2022",0,5000,5000,0,984820.45],["01.06.2022",2.222,"-","-","-",984820.45],["01.06.2022",2.222,5000,4939.21,60.79,979881.23],["01.07.2022",2.222,5000,3185.59,1814.41,976695.65],["01.08.2022",2.222,5000,3131.2,1868.8,973564.45],["01.09.2022",2.222,5000,3137.19,1862.81,970427.25],["01.10.2022",1.5,"-","-","-",970427.25],["01.10.2022",1.5,5000,3222.55,1777.45,967204.7],["01.11.2022",1.5,5000,3750.69,1249.31,963454],["01.12.2022",1.5,5000,3795.68,1204.32,959658.32],["31.12.2022",1.5,"-","-",1199.57,959658.32]]

// 7. == lainan_kuoletus_cases/kuoletus_cases_2.js 1. testi

const init_7 = {"start_date":"01.01.2018","end_date":"01.01.2019","principal":12365,"rate":2,"day_count_method":"act/360","recurring":{"amount":2000,"payment_method":"equal_installment","first_payment_date":"01.02.2018","payment_day":1}}

const events_7 = []

const rval_7 = {"sum_of_interests":75.75,"sum_of_reductions":12365,"sum_of_installments":12440.75,"remaining_principal":0,"days_calculated":213,"actual_end_date":"01.08.2018","latest_payment_date":"01.08.2018","unpaid_interest":0}

const out_7 = [["01.01.2018",2,"-","-","-",12365],["01.02.2018",2,2000,1978.02,21.98,10386.98],["01.03.2018",2,2000,1983.84,16.16,8403.14],["01.04.2018",2,2000,1985.53,14.47,6417.61],["01.05.2018",2,2000,1989.3,10.7,4428.31],["01.06.2018",2,2000,1992.37,7.63,2435.93],["01.07.2018",2,2000,1995.94,4.06,439.99],["01.08.2018",2,440.75,439.99,0.76,0]]

// 8. == lainan_kuoletus_cases/kuoletus_cases_2.js 4. testi

const init_8 = {"start_date":"01.01.2018","end_date":"01.01.2019","principal":12365,"rate":2,"day_count_method":"act/360","recurring":{"amount":2000,"payment_method":"equal_installment","first_payment_date":"01.02.2018","payment_day":1}}

const events_8 = [{"date":"01.06.2018","pay_reduction":1000,"annuity":true},{"date":"01.08.2018","rate":10,"recurring_amount":400}]

const rval_8 = {"sum_of_interests":73.33,"sum_of_reductions":12365,"sum_of_installments":12438.33,"remaining_principal":0,"days_calculated":182,"actual_end_date":"01.07.2018","latest_payment_date":"01.07.2018","unpaid_interest":0}

const out_8 = [["01.01.2018",2,"-","-","-",12365],["01.02.2018",2,2000,1978.02,21.98,10386.98],["01.03.2018",2,2000,1983.84,16.16,8403.14],["01.04.2018",2,2000,1985.53,14.47,6417.61],["01.05.2018",2,2000,1989.3,10.7,4428.31],["01.06.2018",2,2000,1992.37,7.63,2435.93],["01.06.2018",2,1000,1000,0,1435.93],["01.07.2018",2,1438.33,1435.93,2.39,0]]

// 9. == lainan_kuoletus_cases/kuoletus_cases_2.js 5. testi

const init_9 = {"start_date":"01.01.2018","end_date":"01.01.2019","principal":12365,"rate":2,"day_count_method":"act/360","recurring":{"amount":600,"payment_method":"equal_installment","first_payment_date":"01.02.2018","payment_day":1}}

const events_9 = [{"date":"01.06.2018","pay_reduction":1000,"annuity":true},{"date":"01.08.2018","rate":5.5,"recurring_amount":1350}]

const rval_9 = {"sum_of_interests":213.9,"sum_of_reductions":12365,"sum_of_installments":12578.9,"remaining_principal":0,"days_calculated":366,"actual_end_date":"01.01.2019","latest_payment_date":"01.01.2019","unpaid_interest":0}

const out_9 = [["01.01.2018",2,"-","-","-",12365],["01.02.2018",2,600,578.02,21.98,11786.98],["01.03.2018",2,600,581.66,18.34,11205.32],["01.04.2018",2,600,580.7,19.3,10624.62],["01.05.2018",2,600,582.29,17.71,10042.32],["01.06.2018",2,600,582.7,17.3,9459.62],["01.06.2018",2,1000,1000,0,8459.62],["01.07.2018",2,600,585.9,14.1,7873.72],["01.08.2018",5.5,"-","-","-",7873.72],["01.08.2018",5.5,1350,1335.67,14.33,6538.04],["01.09.2018",5.5,1350,1319.04,30.96,5219.01],["01.10.2018",5.5,1350,1326.08,23.92,3892.93],["01.11.2018",5.5,1350,1331.56,18.44,2561.37],["01.12.2018",5.5,1350,1338.26,11.74,1223.11],["01.01.2019",5.5,1228.9,1223.11,5.79,0]]

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

const init_array = [init_1, init_2, init_3, init_4, init_5, init_6, init_7, init_8, init_9]
const event_array = [events_1, events_2, events_3, events_4, events_5, events_6, events_7, events_8, events_9]
const rval_array = [rval_1, rval_2, rval_3, rval_4, rval_5, rval_6, rval_7, rval_8, rval_9]
const output_array = [out_1, out_2, out_3, out_4, out_5, out_6, out_7, out_8, out_9]

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
