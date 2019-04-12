
function Paydown () {
  this.calculate = function (init_obj, events_array, payments_array) {
    var paydown = new _Paydown()

    paydown.set_init(init_obj)

    var local_array = []

    if (events_array) {
      local_array = events_array.slice()
    }

    while (local_array[0]) {
      paydown.add_event(local_array.shift())
    }

    var last_date = init_obj.end_date

    var interests, reductions, remaining_principal, actual_end_date, latest_payment_date, final_interest

    try {
      [interests, reductions, remaining_principal, actual_end_date, latest_payment_date, final_interest] = paydown.calculate_to_date(last_date, payments_array)
    } catch (err) {
      throw (err)
    }

    return {
      sum_of_interests: interests,
      sum_of_reductions: reductions,
      sum_of_installments: func_round(Number(interests + reductions - final_interest)),
      remaining_principal: remaining_principal,
      days_calculated: paydown.total_number_of_days,
      actual_end_date: actual_end_date,
      latest_payment_date: latest_payment_date,
      unpaid_interest: final_interest
    }
  }
}

function _Paydown () {
  this.event_array = []
  this.sum_of_interests = 0
  this.sum_of_reductions = 0
  this.latest_calculated_interest_date = ''
  this.latest_payment_date = ''
  this.current_rate = ''
  this.current_recurring_payment = ''
  this.current_principal = ''
  this.g_p_i_sum_of_interests = 0
  this.total_number_of_days = 0
  this.g_p_i_total_days = 0
  this.payment_log = []
  this.day_count_divisor = 0
  this.latest_period_end_date = 0
  this.init = {}
  this.round_values = true

  this.func_round = function (input) {

    if (typeof input !== 'number') {
      throw 'Error: this.func_round illegal parameter type'
    }
    if (this.round_values) {
      input = Math.round(input * 100) / 100
    }

    return input
  }

  this.log_payment = function (payment) {
    if (this.payment_logging_enabled) {
      if (payment[0].length !== 10) {
        payment[0] = zero_fill_date(payment[0])
      }
      this.payment_log.push(payment)
    }
  }

  // period lasts from the beginning of start date to the end of end_date
  this.get_period_interests = function (principal, rate, start_date, end_date) {
    var sum_of_interests = 0
    var rate_event

    if (!principal) { throw 'Error: this.get_period_interests invalid parameter: principal' }
    // rate is allowed to be zero
    if (!start_date) { throw 'Error: this.get_period_interests invalid parameter: start_date' }
    if (!end_date) { throw 'Error: this.get_period_interests invalid parameter: end_date' }

    if (date_to_integer(start_date) > date_to_integer(end_date)) {
      throw 'Error: invalid date: start_date ' + start_date + ' is after end_date ' + end_date
    }

    if (this.latest_period_end_date) {
      var date_difference = calculate_day_count(this.latest_period_end_date, start_date, true)
      if (date_difference !== 1) {
        throw_unexpected_exception('Date difference is not one day as expected, latest_period_end_date: ' + this.latest_period_end_date + ' start_date: ' + start_date)
      }
    }

    this.total_number_of_days += calculate_day_count(start_date, end_date)

    rate_event = this.check_if_date_has_event('rate', start_date)
    if (rate_event) {
      rate = rate_event.rate
      rate_event = {}
      this.log_payment([start_date,
                        rate,
                        '-',
                        '-',
                        '-',
                        this.func_round(this.current_principal)])
    }

    // lets check if interest rate changes during period
    rate_event = this.get_first_event_after_date('rate', start_date, end_date)

    if (rate_event) {
      var subperiod_start_date = start_date
      var rate_event_date = rate_event.date
      var current_rate = rate
      var number_of_days, factor, subperiod_interest

      while (rate_event) {
        // excluding the last day of the period, so that the rate event day shall be calculated with the new rate:
        number_of_days = calculate_day_count(subperiod_start_date, rate_event_date, true)
        this.g_p_i_total_days += number_of_days
        factor = number_of_days / this.day_count_divisor
        subperiod_interest = principal * (current_rate / 100) * factor
        sum_of_interests += subperiod_interest
        current_rate = rate_event.rate
        this.log_payment([rate_event.date,
                          rate_event.rate,
                          '-',
                          '-',
                          '-',
                          this.func_round(this.current_principal)])
        rate_event = this.get_first_event_after_date('rate', rate_event_date, end_date)
        subperiod_start_date = rate_event_date
        if (rate_event) {
          rate_event_date = rate_event.date
        }
      }

      // not excluding the last day of the period, so that the period end day interest will be included to the calculation:
      number_of_days = calculate_day_count(rate_event_date, end_date)
      this.g_p_i_total_days += number_of_days
      factor = number_of_days / this.day_count_divisor
      subperiod_interest = principal * (current_rate / 100) * factor
      sum_of_interests += subperiod_interest
      this.current_rate = current_rate
    } else {
      number_of_days = calculate_day_count(start_date, end_date)
      this.g_p_i_total_days += number_of_days
      factor = number_of_days / this.day_count_divisor
      subperiod_interest = principal * (rate / 100) * factor
      sum_of_interests += subperiod_interest
      this.current_rate = rate
    }

    this.g_p_i_sum_of_interests += sum_of_interests
    this.latest_period_end_date = end_date

    return sum_of_interests
  }

  // param property is a property of the seeked event
  this.get_first_event_after_date = function (property, date, boundary_date) {
    for (var index = 0; index < this.event_array.length; index++) {
      if (date_to_integer(this.event_array[index].date) > date_to_integer(date) && this.event_array[index].hasOwnProperty(property)) {
        if (!boundary_date) {
          return this.event_array[index]
        } else if (date_to_integer(this.event_array[index].date) <= date_to_integer(boundary_date)) {
          return this.event_array[index]
        }
      }
    }
    return false
  }

  // param property is a property of the seeked event
  this.check_if_date_has_event = function (property, date) {
    for (var index = 0; index < this.event_array.length; index++) {
      if (date_to_integer(this.event_array[index].date) === date_to_integer(date) && this.event_array[index].hasOwnProperty(property)) {
        return this.event_array[index]
      }
    }
    return false
  }

  this.check_date = function (date, context) {
    if(!context) {
      context = ""
    }

    if(!date) {
      throw 'Error: ' + context + ' date is missing'
    }

    if (typeof date !== 'string') {
      throw 'Error: ' + context + ' date must be of type string: ' + date
    }

    if(!check_date_validity(date)) {
      throw 'Error: ' + context + ' date is invalid: ' + date
    }
  }

  this.handle_last_payment = function (reduction, date, period_interest) {
    var installment
    // this.current_principal should be negative or zero here:
    reduction += this.current_principal

    installment = this.func_round(reduction + period_interest)

    this.sum_of_reductions += reduction
    this.log_payment([date,
                      this.current_rate,
                      installment,
                      this.func_round(reduction),
                      this.func_round(period_interest),
                      0])
    this.current_principal = 0
    this.latest_payment_date = date
  }

  this.func_pay_installment = function (index, date_obj, installment) {
    var period_interest
    var reduction
    var start_date, end_date

    if (this.latest_calculated_interest_date === this.event_array[index].date) {
      // period interests have already been calculated
      period_interest = 0
    } else {
      // period interests have not been calculated yet
      start_date = date_obj.set_current(this.latest_calculated_interest_date).get_next()
      end_date = this.event_array[index].date
      period_interest = this.get_period_interests(this.current_principal, this.current_rate, start_date, end_date)
    }

    if (!installment) { // FIX THIS!!!
      installment = this.current_recurring_payment
    }

    reduction = installment - period_interest

    if (reduction < 0) {
      // installment is smaller than the interest
      throw 'Exception: installment ' + this.func_round(installment) + ' is too small to cover the interest ' + this.func_round(period_interest) + ': ' + start_date + ' - ' + end_date
    }

    this.sum_of_interests += period_interest
    this.current_principal -= reduction
    this.latest_calculated_interest_date = this.event_array[index].date
    this.latest_payment_date = this.event_array[index].date

    if (this.current_principal <= 0) {
      this.handle_last_payment(reduction, this.event_array[index].date, period_interest)
      return false
    }

    this.sum_of_reductions += reduction

    this.log_payment([this.event_array[index].date,
                      this.current_rate,
                      this.func_round(reduction + period_interest),
                      this.func_round(reduction),
                      this.func_round(period_interest),
                      this.func_round(this.current_principal)])

    return true
  }

  this.func_pay_reduction = function (index, date_obj, reduction) {
    var period_interest

    if (this.latest_calculated_interest_date === this.event_array[index].date) {
      // period interests have already been calculated
      period_interest = 0
    } else {
      // period interests have not been calculated yet
      period_interest = this.get_period_interests(this.current_principal, this.current_rate, date_obj.set_current(this.latest_calculated_interest_date).get_next(), this.event_array[index].date)
    }

    if (!reduction) {
      reduction = this.current_recurring_payment
    }

    this.sum_of_interests += period_interest
    this.current_principal -= reduction
    this.latest_calculated_interest_date = this.event_array[index].date
    this.latest_payment_date = this.event_array[index].date

    if (this.current_principal <= 0) {
      this.handle_last_payment(reduction, this.event_array[index].date, period_interest)
      return false
    }

    this.sum_of_reductions += reduction

    this.log_payment([this.event_array[index].date,
                      this.current_rate,
                      this.func_round(reduction + period_interest),
                      this.func_round(reduction),
                      this.func_round(period_interest),
                      this.func_round(this.current_principal)])
    return true
  }

  this.calculate_to_date = function (end_date, array_of_events) {
    var index
    var period_interest
    var reduction, installment
    var final_interest = 0

    if (typeof this.init.principal !== 'number' || isNaN(this.init.principal)) { throw 'Error: principal must be number' }
    if (this.init.principal === 0) { throw 'Error: principal is missing' }
    if (typeof this.init.rate !== 'number' || isNaN(this.init.rate)) { throw 'Error: rate must be number' }

    if (Array.isArray(array_of_events)) {
      this.payment_logging_enabled = true
    } else {
      this.payment_logging_enabled = false
    }

    this.sum_of_interests = 0
    this.sum_of_reductions = 0
    this.g_p_i_sum_of_interests = 0

    var date_obj = new _Days()

    this.check_date(this.init.start_date, "start")
    this.check_date(this.init.end_date, "end")
    this.check_first_payment_date();

    if (is_numeric(this.init.amount) && this.init.amount > 0) {
      this.generate_payment_events_till(end_date)
    }

    this.add_event({ date: end_date, ending: true })

    this.merge_events()

    if (this.init.day_count_method === 'act/360') {
      this.day_count_divisor = 360
    } else if (this.init.day_count_method === 'act/365') {
      this.day_count_divisor = 365
    } else {
      throw 'Error: invalid day count method: ' + this.init.day_count_method
    }

  // rewind start date by one so that the interest gets calculated from the very beginning:
    this.latest_calculated_interest_date = date_obj.set_current(this.init.start_date).get_prev()
    this.latest_period_end_date = this.latest_calculated_interest_date
    this.total_number_of_days = 0
    this.g_p_i_total_days = 0

    // first line contains only the interest rate and principal:
    this.log_payment([this.init.start_date,
                      this.init.rate,
                      '-',
                      '-',
                      '-',
                      this.init.principal])

    this.current_principal = this.init.principal
    this.current_rate = this.init.rate
    this.current_recurring_payment = this.init.amount

    for (index = 0; index < this.event_array.length; index++) {
      if (this.event_array[index].hasOwnProperty('recurring_amount')) {
        // recurring payment amount changes
        this.current_recurring_payment = this.event_array[index].recurring_amount
      }

      if (this.event_array[index].hasOwnProperty('pay_recurring')) {
        // recurring payment transaction occurs
        if (this.init.payment_method === 'equal_installment') {
          if (!this.func_pay_installment(index, date_obj)) {
            break
          }
        } else if (this.init.payment_method === 'equal_reduction') {
          if (!this.func_pay_reduction(index, date_obj)) {
            break
          }
        } else {
          throw 'Error: invalid payment method: ' + this.init.payment_method
        }
      }

      if (this.event_array[index].hasOwnProperty('pay_reduction')) {
        reduction = this.event_array[index].pay_reduction

        if (!this.func_pay_reduction(index, date_obj, reduction)) {
          break
        }
      }

      if (this.event_array[index].hasOwnProperty('pay_installment')) {
        installment = this.event_array[index].pay_installment

        if (!this.func_pay_installment(index, date_obj, installment)) {
          break
        }
      }

      if (this.event_array[index].hasOwnProperty('ending')) {

        if (!this.event_array[index].hasOwnProperty('pay_reduction') &&
            !this.event_array[index].hasOwnProperty('pay_recurring') &&
            !this.event_array[index].hasOwnProperty('pay_installment')) {
              final_interest = this.get_period_interests(this.current_principal, this.current_rate, date_obj.set_current(this.latest_calculated_interest_date).get_next(), this.event_array[index].date)
              this.sum_of_interests += final_interest
              this.log_payment([this.event_array[index].date,
                                this.current_rate,
                                '-',
                                '-',
                                this.func_round(final_interest),
                                this.func_round(this.current_principal)])
              this.latest_calculated_interest_date = end_date
            } else {
              this.latest_calculated_interest_date = this.latest_payment_date
            }

        break
      }
    }

    if (this.func_round(this.g_p_i_sum_of_interests) !== this.func_round(this.sum_of_interests)) {
      throw_unexpected_exception('Sum of interests mismatch: ' + this.func_round(this.g_p_i_sum_of_interests) + ' vs. ' + this.func_round(this.sum_of_interests))
    }

    if (this.g_p_i_total_days !== this.total_number_of_days) {
      throw_unexpected_exception('Day count mismatch, this.g_p_i_total_days: ' + this.g_p_i_total_days + ' this.total_number_of_days: ' + this.total_number_of_days)
    }

    if (this.payment_logging_enabled) {
      for (let i = 0; i < this.payment_log.length; i++) {
        array_of_events.push(this.payment_log[i])
      }
    }

    return [this.func_round(this.sum_of_interests),
            this.func_round(this.sum_of_reductions),
            this.func_round(this.current_principal),
            this.latest_calculated_interest_date,
            this.latest_payment_date,
            this.func_round(final_interest)]
  }

  this.set_init = function (data) {
    this.init.start_date = data.start_date
    this.init.end_date = data.end_date
    this.init.principal = data.principal
    this.init.rate = data.rate

    if (data.hasOwnProperty('day_count_method')) {
      this.init.day_count_method = data.day_count_method
    } else {
      this.init.day_count_method = 'act/360'
    }

    if (data.hasOwnProperty('recurring')) {
      this.init.amount = data.recurring.amount
      this.init.first_payment_date = data.recurring.first_payment_date
      this.init.payment_day = data.recurring.payment_day
      if (data.recurring.hasOwnProperty('payment_method')) {
        this.init.payment_method = data.recurring.payment_method
      } else {
        this.init.payment_method = 'equal_installment'
        }
    } else {
      this.init.amount = ''
    }

    if (data.hasOwnProperty('round_values')) {
      this.round_values = data.round_values
    } else {
      this.round_values = true
    }

  }

  this.add_event = function (event) {
    if (!event.hasOwnProperty('date')) {
      throw 'Error: date property missing from event'
    }

    this.check_date(event.date,"event")

    this.event_array.push(Object.assign({}, event))
  }

  // combine all events with a same date to a single event
  this.merge_events = function () {
    this.event_array.sort(event_array_sorter)

    for (var index = 0; index < this.event_array.length - 1; index++) {
      if (date_to_integer(this.event_array[index].date) === date_to_integer(this.event_array[index + 1].date)) {
        // todo: here it should be checked that date property is the only common thing that the events to be merged share
        Object.assign(this.event_array[index], this.event_array[index + 1])
        this.event_array.splice(index + 1, 1)
        index = index - 1
      }
    }
  }

  this.check_first_payment_date = function () {

    this.check_date(this.init.first_payment_date,"1st recurring payment")
    if( date_to_integer(this.init.first_payment_date) <= date_to_integer(this.init.start_date) ) {
      throw 'Error: first payment date must be after start date'
    }

  }

  this.generate_payment_events_till = function (date) {

    var date_obj = new _Days(this.init.first_payment_date)
    var event

    event = { date: date_obj.get_current(), pay_recurring: true }

    this.add_event(event)

    while (date_to_integer(date_obj.get_next_month_nth_day(this.init.payment_day)) <= date_to_integer(date)) {
      event = { date: date_obj.get_current(), pay_recurring: true }
      this.add_event(event)
    }

    this.event_array.sort(event_array_sorter)
  }
}

function _Days (init_date) {
  if (init_date) {
    this.date = init_date
    this.split_table = this.date.split('.')
    this.day = Number(this.split_table[0])
    this.month = Number(this.split_table[1])
    this.year = Number(this.split_table[2])
  }

  this.get_current = function () {
    return zero_fill(this.day) + '.' + zero_fill(this.month) + '.' + this.year
  }

  this.set_current = function (current) {
    this.split_table = current.split('.')
    this.day = Number(this.split_table[0])
    this.month = Number(this.split_table[1])
    this.year = Number(this.split_table[2])

    return this
  }

  this.get_next = function () {
    var date = new Date(this.year, this.month - 1, this.day)
    date.setDate(date.getDate() + 1)

    this.day = String(date.getDate())
    this.month = String(date.getMonth() + 1)
    this.year = String(date.getFullYear())

    return zero_fill(this.day) + '.' + zero_fill(this.month) + '.' + this.year
  }

  this.get_prev = function () {
    var date = new Date(this.year, this.month - 1, this.day)
    date.setDate(date.getDate() - 1)

    this.day = String(date.getDate())
    this.month = String(date.getMonth() + 1)
    this.year = String(date.getFullYear())

    return zero_fill(this.day) + '.' + zero_fill(this.month) + '.' + this.year
  }

  this.get_next_month_nth_day = function (day_number) {
    if (day_number == 31 || (this.month === 1 && Number(day_number) > 28)) {
      return this.get_next_month_last_day()
    }

    var next_month = this.month
    var year = this.year

    if (next_month == 12) {
      next_month = 1
      ++year
    } else {
      ++next_month
    }

    this.day = day_number
    this.month = next_month
    this.year = year

    return zero_fill(day_number) + '.' + zero_fill(next_month) + '.' + year
  }

  this.get_next_month_last_day = function () {
    var next_month = this.month
    var year = this.year

    if (next_month == 12) {
      next_month = 1
      ++year
    } else {
      ++next_month
    }

    var last_day = days_in_month(next_month, year)

    this.day = last_day
    this.month = next_month
    this.year = year

    return last_day + '.' + zero_fill(this.month) + '.' + this.year
  }
}

function throw_unexpected_exception (string) {
  throw 'Unexpected exception: ' + string
}

function event_array_sorter (a, b) {
  if (date_to_integer(a.date) > date_to_integer(b.date)) { return 1 }
  if (date_to_integer(a.date) < date_to_integer(b.date)) { return -1 }
  return 0
}

function date_to_integer (date) {
  var day = split_date(date)[0]
  var month = split_date(date)[1]
  var year = split_date(date)[2]

  day = zero_fill(Number(day))
  month = zero_fill(Number(month))

  return Number(year + month + day)
}

function zero_fill_date (date) {
  var day = split_date(date)[0]
  var month = split_date(date)[1]
  var year = split_date(date)[2]

  day = zero_fill(Number(day))
  month = zero_fill(Number(month))

  return day + '.' + month + '.' + year
}

// parameter i must be of type number
function zero_fill (i) {
  return (i < 10 ? '0' : '') + i
}

function split_date (date) {
  var splitted = date.split('.')
  return [splitted[0], splitted[1], splitted[2]]
}

function calculate_day_count (first_date, second_date, exclude_last_day) {
  var last_day

  if (exclude_last_day) {
    last_day = 0
  } else {
    last_day = 1
  }

  var first_date_array = first_date.split('.')
  var second_date_array = second_date.split('.')

  var date_1 = new Date(Number(first_date_array[2]), Number(first_date_array[1]) - 1, Number(first_date_array[0]))
  var date_2 = new Date(Number(second_date_array[2]), Number(second_date_array[1] - 1), Number(second_date_array[0]))

  // must round here because of daylight saving time changes:
  return Math.round((date_2 - date_1) / (1000 * 60 * 60 * 24)) + last_day
}

function is_numeric (n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}

function is_it_leap_year (year) {
  return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)
}

function days_in_month (month, year) {
  if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) {
    return 31
  } else if (month === 4 || month === 6 || month === 9 || month === 11) {
    return 30
  } else if (month === 2 && is_it_leap_year(year)) {
    return 29
  } else if (month === 2 && !(is_it_leap_year(year))) {
    return 28
  } else {
    throw_unexpected_exception('days_in_month')
  }
}

function func_round(input) {
  input = Math.round(input * 100) / 100
  return input
}

function check_date_validity(date) {
  var result = date.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/)

  if(!result) {
    return false
  }

  var day = Number(result[1])
  var month = Number(result[2])
  var year = Number(result[3])

  if(month < 1 || month > 12 ) {
    return false
  }

  var last_day_of_month = days_in_month(month,year)

  if(day < 1 || day > last_day_of_month) {
    return false
  }

  return true
}

module.exports = Paydown