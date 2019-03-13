'use strict'

var g_event_id_counter

function func_init () {
  g_event_id_counter = 0
}

function get_events (events_array) {
  var i
  var container = document.getElementById('events_container')
  var events = container.querySelectorAll('.event_container')
  for (i = 0; i < events.length; i++) {
    get_event_data(events[i], events_array)
  }
}

function remove_all_events () {
  var i
  var container = document.getElementById('events_container')
  while (container.firstChild) {
    container.removeChild(container.firstChild)
  }
}

function get_event_data (event, events_array) {
  var event_obj = {}
  var rate, recurring_amount, installment, reduction

  event_obj.date = event.querySelector('#event_date').value

  rate = event.querySelector('#event_rate').value
  if (is_numeric(rate)) {
    rate = Number(rate)
    event_obj.rate = rate
  }

  recurring_amount = event.querySelector('#event_recurring_amount').value
  if (is_numeric(recurring_amount)) {
    recurring_amount = Number(recurring_amount)
    event_obj.recurring_amount = recurring_amount
  }

  installment = event.querySelector('#event_installment').value
  if (is_numeric(installment)) {
    installment = Number(installment)
    event_obj.pay_installment = installment
  }

  reduction = event.querySelector('#event_reduction').value
  if (is_numeric(reduction)) {
    reduction = Number(reduction)
    event_obj.pay_reduction = reduction
  }

  events_array.push(event_obj)
}

function add_event (values) {
  var id
  var template = document.getElementById('event_template')
  var clone = template.cloneNode(true)
  var container = document.getElementById('events_container')

  id = g_event_id_counter++
  clone.id = 'eve_' + id

  if (values) {
    clone.querySelector('#event_date').value = values.date
    clone.querySelector('#event_rate').value = values.rate
    clone.querySelector('#event_recurring_amount').value = values.amount
    clone.querySelector('#event_installment').value = values.installment
    clone.querySelector('#event_reduction').value = values.reduction
  }

  container.appendChild(clone)

  var img_element = clone.querySelector('img')
  img_element.id = 'img_' + id
}

function remove_event (img_id) {
  var event_container_id = 'eve_' + img_id.split('_')[1]
  var events_container = document.getElementById('events_container')
  var event_container = document.getElementById(event_container_id)
  events_container.removeChild(event_container)
}

function import_basic_values () {
  clear_init_input()
  remove_all_events()

  document.getElementById('id_start_date').value = '1.1.2019'
  document.getElementById('id_end_date').value = '30.06.2019'
  document.getElementById('id_principal').value = '100000'
  document.getElementById('id_rate').value = '3.5'
  document.getElementById('id_day_count_method').value = 'act/360'
  document.getElementById('id_payment').value = '1000'
  document.getElementById('id_payment_method').value = 'equal_installment'
  document.getElementById('id_first_payment').value = '31.01.2019'
  document.getElementById('id_payment_day').value = 31
}

function import_advanced_values () {
  clear_init_input()
  remove_all_events()

  document.getElementById('id_start_date').value = '1.1.2019'
  document.getElementById('id_end_date').value = '30.06.2019'
  document.getElementById('id_principal').value = '100000'
  document.getElementById('id_rate').value = '3.5'
  document.getElementById('id_day_count_method').value = 'act/365'
  document.getElementById('id_payment').value = '1000'
  document.getElementById('id_payment_method').value = 'equal_reduction'
  document.getElementById('id_first_payment').value = '31.01.2019'
  document.getElementById('id_payment_day').value = 31

  var values = {}
  values.date = '15.3.2019'
  values.rate = 5
  values.amount = 1500
  values.installment = ''
  values.reduction = ''
  add_event(values)

  values.date = '15.5.2019'
  values.rate = ''
  values.amount = ''
  values.installment = ''
  values.reduction = 4000
  add_event(values)
}

function clear_init_input () {
  document.getElementById('id_start_date').value = ''
  document.getElementById('id_end_date').value = ''
  document.getElementById('id_principal').value = ''
  document.getElementById('id_rate').value = ''
  document.getElementById('id_day_count_method').value = 'act/360'
  document.getElementById('id_payment').value = ''
  document.getElementById('id_payment_method').value = 'equal_installment'
  document.getElementById('id_first_payment').value = ''
  document.getElementById('id_payment_day').value = 1
}

function clear_all () {
  clear_init_input()
  remove_all_events()
  clear_output()
}

function clear_output () {
  var input_container = document.getElementById('input_container')

  while (input_container.nextElementSibling) {
    input_container.nextElementSibling.remove()
  }
}

function calculate_it () {
  var input_data = {}
  input_data.recurring = {}
  input_data.start_date = document.getElementById('id_start_date').value
  input_data.end_date = document.getElementById('id_end_date').value
  input_data.principal = Number(document.getElementById('id_principal').value)
  input_data.rate = Number(document.getElementById('id_rate').value)
  input_data.day_count_method = document.getElementById('id_day_count_method').value
  input_data.recurring.amount = Number(document.getElementById('id_payment').value)
  input_data.recurring.payment_method = document.getElementById('id_payment_method').value
  input_data.recurring.first_payment_date = document.getElementById('id_first_payment').value
  input_data.recurring.payment_day = Number(document.getElementById('id_payment_day').value)

  var paydown = new Paydown()

  var payments_array = []
  var events_array = []
  var rval_obj

  get_events(events_array)

  try {
    rval_obj = paydown.calculate(input_data, events_array, payments_array)
  } catch (err) {
    display_error(err)
    return
  }

  display_output(rval_obj, payments_array)
}

function display_error (error) {
  var input_container = document.getElementById('input_container')
  var template = document.getElementById('error_template')
  var error_container = template.cloneNode(true)

  var id = g_event_id_counter++
  error_container.id = 'out_' + id

  var error_msg_container = error_container.querySelector('#error_msg_container')
  error_msg_container.innerHTML = error

  input_container.insertAdjacentElement('afterend', error_container)
}

function display_output (rval_obj, payments_array) {
  var i, tblRow
  var input_container = document.getElementById('input_container')
  var template = document.getElementById('output_template')
  var output_container = template.cloneNode(true)

  var id = g_event_id_counter++
  output_container.id = 'out_' + id

  output_container.querySelector('#interests').innerHTML = 'Sum of interests: ' + rval_obj.sum_of_interests
  output_container.querySelector('#reductions').innerHTML = 'Sum of reductions: ' + rval_obj.sum_of_reductions
  output_container.querySelector('#installments').innerHTML = 'Sum of installments: ' + rval_obj.sum_of_installments
  output_container.querySelector('#rem_principal').innerHTML = 'Remaining principal: ' + rval_obj.remaining_principal
  output_container.querySelector('#days_count').innerHTML = 'Days calculated: ' + rval_obj.days_calculated
  output_container.querySelector('#act_end_date').innerHTML = 'Actual end date: ' + rval_obj.actual_end_date
  output_container.querySelector('#latest_payment_date').innerHTML = 'Latest payment date: ' + rval_obj.latest_payment_date
  output_container.querySelector('#unpaid_interest').innerHTML = 'Unpaid interest: ' + rval_obj.unpaid_interest

  input_container.insertAdjacentElement('afterend', output_container)

  var table_container = output_container.querySelector('#output_table_container')
  var tbl = document.createElement('table')
  tbl.style.border = '1px solid black'
  tbl.style.margin = 'auto'
  tbl.style.backgroundColor = 'white'
  tbl.style.borderSpacing = 0
  tbl.style.textAlign = 'center'
  tbl.setAttribute('border', '1')

  var tblBody = document.createElement('tbody')
  tblRow = generate_table_row(['Date', 'Rate', 'Installment', 'Reduction', 'Interest', 'Principal'])
  tblBody.appendChild(tblRow)

  for (i = 0; i < payments_array.length; i++) {
    tblRow = generate_table_row(payments_array[i])
    tblBody.appendChild(tblRow)
  }

  tbl.appendChild(tblBody)
  table_container.appendChild(tbl)
}

function generate_table_row (values_array) {
  var i, row, cell, cellText

  row = document.createElement('tr')

  for (i = 0; i < values_array.length; i++) {
    cell = document.createElement('td')
    cell.style.padding = '1px 15px'
    cellText = document.createTextNode(values_array[i])
    cell.appendChild(cellText)
    row.appendChild(cell)
  }

  return row
}

function is_numeric (n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}
