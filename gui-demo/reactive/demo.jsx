'use strict'

var g_event_id_counter

function get_new_id () {
  return String(g_event_id_counter++)
}

function Form (props) {
  return (
    <div className='init_data_container'>
      <div data-tip data-for='startDate' className='init_data'>
        Start date
        <input value={props.values.startDate} onChange={x => props.callback(x, 0)} type='text' className='date_input' maxLength='10' placeholder='dd.mm.yyyy' />
      </div>
      <ReactTooltip id='startDate' effect='solid'>
        <span>Calculation start date</span>
      </ReactTooltip>
      <div data-tip data-for='endDate' className='init_data'>
        End date
        <input value={props.values.endDate} onChange={x => props.callback(x, 1)} type='text' className='date_input' maxLength='10' placeholder='dd.mm.yyyy' />
      </div>
      <ReactTooltip id='endDate' effect='solid'>
        <span>Calculation end date</span>
      </ReactTooltip>
      <div data-tip data-for='principal' className='init_data'>
        Principal
        <input value={props.values.principal} onChange={x => props.callback(x, 2)} type='text' className='amount_input_wide' maxLength='10' />
      </div>
      <ReactTooltip id='principal' effect='solid'>
        <span>Principal amount at the start date</span>
      </ReactTooltip>
      <div data-tip data-for='rate' className='init_data'>
        Rate
        <input value={props.values.rate} onChange={x => props.callback(x, 3)} type='text' className='amount_input_narrow' maxLength='5' /> %
      </div>
      <ReactTooltip id='rate' effect='solid'>
        <span>Interest rate at the start date</span>
      </ReactTooltip>
      <div data-tip data-for='dayCountMethod' className='init_data'>
        Day count method
        <select value={props.values.dayCountMethod} onChange={x => props.callback(x, 4)}>
          <option value='act/360'>Act/360</option>
          <option value='act/365'>Act/365</option>
        </select>
      </div>
      <ReactTooltip id='dayCountMethod' effect='solid'>
        <span>Determines how interest accrues over time</span>
      </ReactTooltip>
      <div data-tip data-for='recurringPayment' className='init_data'>
        Recurring payment
        <input value={props.values.recurringPayment} onChange={x => props.callback(x, 5)} type='text' className='amount_input' maxLength='10' />
      </div>
      <ReactTooltip id='recurringPayment' effect='solid'>
        <span>The amount of recurring payment</span>
      </ReactTooltip>
      <div data-tip data-for='paymentMethod' className='init_data'>
        Payment method
        <select value={props.values.paymentMethod} onChange={x => props.callback(x, 6)}>
          <option value='equal_installment'>Equal Installment</option>
          <option value='equal_reduction'>Equal Reduction</option>
        </select>
      </div>
      <ReactTooltip id='paymentMethod' effect='solid'>
        <span>Payment method for recurring payments</span>
      </ReactTooltip>
      <div data-tip data-for='firstPaymentDate' className='init_data'>
        1st recurring payment date
        <input value={props.values.firstPaymentDate} onChange={x => props.callback(x, 7)} type='text' className='date_input' maxLength='10' placeholder='dd.mm.yyyy' />
      </div>
      <ReactTooltip id='firstPaymentDate' effect='solid'>
        <span>First recurring payment date</span>
      </ReactTooltip>
      <div data-tip data-for='recurringPaymentDay' className='init_data'>
        Recurring payment day
        <select value={props.values.recurringPaymentDay} onChange={x => props.callback(x, 8)}>
          <option value='1'>1.</option>
          <option value='2'>2.</option>
          <option value='3'>3.</option>
          <option value='4'>4.</option>
          <option value='5'>5.</option>
          <option value='6'>6.</option>
          <option value='7'>7.</option>
          <option value='8'>8.</option>
          <option value='9'>9.</option>
          <option value='10'>10.</option>
          <option value='11'>11.</option>
          <option value='12'>12.</option>
          <option value='13'>13.</option>
          <option value='14'>14.</option>
          <option value='15'>15.</option>
          <option value='16'>16.</option>
          <option value='17'>17.</option>
          <option value='18'>18.</option>
          <option value='19'>19.</option>
          <option value='20'>20.</option>
          <option value='21'>21.</option>
          <option value='22'>22.</option>
          <option value='23'>23.</option>
          <option value='24'>24.</option>
          <option value='25'>25.</option>
          <option value='26'>26.</option>
          <option value='27'>27.</option>
          <option value='28'>28.</option>
          <option value='29'>29.</option>
          <option value='30'>30.</option>
          <option value='31'>last</option>
        </select>
      </div>
      <ReactTooltip id='recurringPaymentDay' effect='solid'>
        <span>Monthly payment day of the recurring payment</span>
      </ReactTooltip>
    </div>
  )
}

function Summary (props) {
  var klass = ''

  if (!props.values.hasOwnProperty('sum_of_interests')) {
    return null
  }

  if (props.error) {
    klass = 'summary_shade'
  }

  return (
    <div id='output_summary_container' className={klass}>
      <div className='output_value'>
        Sum of interests: {props.values.sum_of_interests}
      </div>
      <div className='output_value'>
        Sum of reductions: {props.values.sum_of_reductions}
      </div>
      <div className='output_value'>
        Sum of installments: {props.values.sum_of_installments}
      </div>
      <div className='output_value'>
        Remaining principal: {props.values.remaining_principal}
      </div>
      <div className='output_value'>
        Days calculated: {props.values.days_calculated}
      </div>
      <div className='output_value'>
        Actual end date: {props.values.actual_end_date}
      </div>
      <div className='output_value'>
        Latest payment date: {props.values.latest_payment_date}
      </div>
      <div className='output_value'>
        Unpaid interest: {props.values.unpaid_interest}
      </div>
    </div>
  )
}

function TableRow (props) {
  return (
    <tr key={get_new_id()}>
      <td>{ props[0] }</td>
      <td>{ props[1] }</td>
      <td>{ props[2] }</td>
      <td>{ props[3] }</td>
      <td>{ props[4] }</td>
      <td>{ props[5] }</td>
    </tr>
  )
}

function Table (props) {
  var klass = ''

  if (props.error) {
    klass = 'table_shade'
  }

  if (props.values.length === 0) {
    return null
  }

  return (
    <table className={klass}>
      <tr className='bold_class'>
        <td>Date</td>
        <td>Rate</td>
        <td>Installment</td>
        <td>Reduction</td>
        <td>Interest</td>
        <td>Principal</td>
      </tr>
      {props.values.map(TableRow)}
      <tr className='bold_class'>
        <td>Total</td>
        <td>-</td>
        <td>{props.sums.sum_of_installments}</td>
        <td>{props.sums.sum_of_reductions}</td>
        <td>{props.sums.sum_of_interests}</td>
        <td>-</td>
      </tr>
    </table>
  )
}

function Error (props) {
  var splitted

  if (props.value) {
    splitted = props.value.split(':')
  } else {
    return null
  }

  return (
    <div id='error_container'>
      {'Fix input: ' + splitted[1]}
    </div>
  )
}

function Buttons (props) {
  return (
    <div id='buttons_container'>
      <button onClick={() => props.callback(1)} type='button'>Add event</button>
      <button onClick={() => props.callback(2)} type='button'>Import basic</button>
      <button onClick={() => props.callback(3)} type='button'>Import advanced</button>
      <button onClick={() => props.callback(4)} type='button'>Clear all</button>
    </div>
  )
}

function Event (props, callback) {
  return (
    <div className='event_container' key={props.id}>
      <div className='event_data'>
        Event Date
        <input type='text' value={props.date} onChange={x => callback(x, props.id, 0)} className='date_input' maxLength='10' placeholder='dd.mm.yyyy' />
      </div>
      <div className='event_data'>
        New interest rate
        <input type='text' value={props.rate} onChange={x => callback(x, props.id, 1)} className='amount_input_narrow' maxLength='5' />
      </div>
      <div className='event_data'>
        New recurring amount
        <input type='text' value={props.recurring_amount} onChange={x => callback(x, props.id, 2)} className='amount_input' maxLength='10' />
      </div>
      <div className='event_data'>
        Single installment
        <input type='text' value={props.pay_installment} onChange={x => callback(x, props.id, 3)} className='amount_input' maxLength='10' />
      </div>
      <div className='event_data'>
        Single reduction
        <input type='text' value={props.pay_reduction} onChange={x => callback(x, props.id, 4)} className='amount_input' maxLength='10' />
      </div>
      <div className='event_data'>
        <img src='delete-button.png' alt='Remove' height='25' width='25' onClick={x => callback(x, props.id, 5)} />
      </div>
    </div>
  )
}

function Events (props) {
  return (
    <div>
      {props.values.map(x => Event(x, props.callback))}
    </div>
  )
}

class Container extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      values: [],
      summary: {},
      error: '',
      startDate: '',
      endDate: '',
      principal: '',
      rate: '',
      dayCountMethod: 'act/360',
      recurringPayment: '',
      paymentMethod: 'equal_installment',
      firstPaymentDate: '',
      recurringPaymentDay: '1',
      events: []
    }

    this.handleInput = this.handleInput.bind(this)
    this.handleEvents = this.handleEvents.bind(this)
    this.handleButtons = this.handleButtons.bind(this)
  }

  addEvent (obj_ref) {
    var event
    if (obj_ref) {
      event = {
        date: obj_ref.date,
        rate: obj_ref.rate,
        recurring_amount: obj_ref.recurring_amount,
        pay_installment: obj_ref.pay_installment,
        pay_reduction: obj_ref.pay_reduction,
        id: get_new_id()
      }
    } else {
      event = {
        date: '',
        rate: '',
        recurring_amount: '',
        pay_installment: '',
        pay_reduction: '',
        id: get_new_id()
      }
    }
    var events = [...this.state.events]
    events.push(event)
    this.setState({events: events})
  }

  addEvents (array_ref) {
    var event, i
    var events = [...this.state.events]

    for (i = 0; i < array_ref.length; i++) {
      event = {}
      event.date = array_ref[i].date
      event.rate = array_ref[i].rate
      event.recurring_amount = array_ref[i].recurring_amount
      event.pay_installment = array_ref[i].pay_installment
      event.pay_reduction = array_ref[i].pay_reduction
      event.id = get_new_id()
      events.push(event)
    }
    this.setState({events: events})
  }

  handleEvents (synthEvent, event_id, field_id) {
    var events_clone = [...this.state.events]
    var index = events_clone.findIndex(x => findEventById(x, event_id))

    if (field_id === 0) { // date
      events_clone[index].date = synthEvent.target.value
    } else if (field_id === 1) { // rate
      events_clone[index].rate = synthEvent.target.value
    } else if (field_id === 2) { // amount
      events_clone[index].recurring_amount = synthEvent.target.value
    } else if (field_id === 3) { // installment
      events_clone[index].pay_installment = synthEvent.target.value
    } else if (field_id === 4) { // reduction
      events_clone[index].pay_reduction = synthEvent.target.value
    } else if (field_id === 5) { // remove event
      events_clone.splice(index, 1)
    }
    this.setState({events: events_clone}, this.calculateInput)
  }

  handleButtons (param) {
    if (param === 1) {
      this.addEvent()
    } else if (param === 2) {
      this.clearAll(this.importBasic)
    } else if (param === 3) {
      this.clearAll(this.importAdvanced)
    } else if (param === 4) {
      this.clearAll()
    }
  }

  clearAll (func) {
    this.setState({startDate: ''})
    this.setState({endDate: ''})
    this.setState({principal: ''})
    this.setState({rate: ''})
    this.setState({recurringPayment: ''})
    this.setState({firstPaymentDate: ''})
    this.setState({events: []})
    this.setError('')
    this.clearOutput(func)
  }

  importBasic () {
    this.setState({startDate: '1.1.2019'})
    this.setState({endDate: '30.6.2019'})
    this.setState({principal: '100000'})
    this.setState({rate: '3.5'})
    this.setState({dayCountMethod: 'act/360'})
    this.setState({recurringPayment: '1000'})
    this.setState({paymentMethod: 'equal_installment'})
    this.setState({firstPaymentDate: '31.1.2019'})
    this.setState({recurringPaymentDay: '31'}, this.calculateInput)
  }

  importAdvanced () {
    this.setState({startDate: '1.1.2019'})
    this.setState({endDate: '30.6.2019'})
    this.setState({principal: '100000'})
    this.setState({rate: '3.5'})
    this.setState({dayCountMethod: 'act/365'})
    this.setState({recurringPayment: '1000'})
    this.setState({paymentMethod: 'equal_reduction'})
    this.setState({firstPaymentDate: '31.1.2019'})
    this.setState({recurringPaymentDay: '31'}, this.calculateInput)

    var obj = {}
    obj.date = '15.3.2019'
    obj.rate = 5
    obj.recurring_amount = 1500
    obj.pay_installment = ''
    obj.pay_reduction = ''

    var obj_2 = {}
    obj_2.date = '15.5.2019'
    obj_2.rate = ''
    obj_2.recurring_amount = ''
    obj_2.pay_installment = ''
    obj_2.pay_reduction = 4000

    var obj_array = []
    obj_array.push(obj)
    obj_array.push(obj_2)
    this.addEvents(obj_array)
  }

  handleInput (event, id) {
    if (id === 0) {
      this.setState({startDate: event.target.value}, this.calculateInput)
    } else if (id === 1) {
      this.setState({endDate: event.target.value}, this.calculateInput)
    } else if (id === 2) {
      this.setState({principal: event.target.value}, this.calculateInput)
    } else if (id === 3) {
      this.setState({rate: event.target.value}, this.calculateInput)
    } else if (id === 4) {
      this.setState({dayCountMethod: event.target.value}, this.calculateInput)
    } else if (id === 5) {
      this.setState({recurringPayment: event.target.value}, this.calculateInput)
    } else if (id === 6) {
      this.setState({paymentMethod: event.target.value}, this.calculateInput)
    } else if (id === 7) {
      this.setState({firstPaymentDate: event.target.value}, this.calculateInput)
    } else if (id === 8) {
      this.setState({recurringPaymentDay: event.target.value}, this.calculateInput)
    }
  }

  copyEvents (array_ref) {
    var i = 0
    var obj = {}
    for (i = 0; i < this.state.events.length; i++) {
      if (this.state.events[i].date) {
        obj.date = this.state.events[i].date
      }
      if (is_numeric(this.state.events[i].rate)) {
        obj.rate = Number(this.state.events[i].rate)
      }
      if (this.state.events[i].recurring_amount) {
        obj.recurring_amount = Number(this.state.events[i].recurring_amount)
      }
      if (this.state.events[i].pay_installment) {
        obj.pay_installment = Number(this.state.events[i].pay_installment)
      }
      if (this.state.events[i].pay_reduction) {
        obj.pay_reduction = Number(this.state.events[i].pay_reduction)
      }
      array_ref.push(Object.assign({}, obj))
      obj = {}
    }
  }

  calculateInput () {
    var input_data = {}
    input_data.recurring = {}
    input_data.start_date = this.state.startDate
    input_data.end_date = this.state.endDate
    input_data.principal = Number(this.state.principal)
    input_data.rate = Number(this.state.rate)
    input_data.day_count_method = this.state.dayCountMethod
    input_data.recurring.amount = Number(this.state.recurringPayment)
    input_data.recurring.payment_method = this.state.paymentMethod
    input_data.recurring.first_payment_date = this.state.firstPaymentDate
    input_data.recurring.payment_day = this.state.recurringPaymentDay

    var paydown = new Paydown()

    var payments_array = []
    var events_array = []
    var rval_obj

    this.copyEvents(events_array)

    try {
      rval_obj = paydown.calculate(input_data, events_array, payments_array)
    } catch (err) {
      this.setError(err)
      return
    }
    this.setError('')
    this.setArrayValues(payments_array)
    this.setObjectValues(rval_obj)
  }

  setError (str) {
    this.setState({error: str})
  }

  setArrayValues (array_ref) {
    var clonedArray = [...array_ref]
    this.setState({
      values: clonedArray
    })
  }

  setObjectValues (obj_ref) {
    this.setState({
      summary: Object.assign({}, obj_ref)
    })
  }

  clearOutput (func) {
    if (func) {
      this.setState({ values: [], summary: {} }, func)
    } else {
      this.setState({ values: [], summary: {} })
    }
  }

  render () {
    return (
      <div>
        <Form callback={this.handleInput} values={this.state} />
        <Buttons callback={this.handleButtons} />
        <Events values={this.state.events} callback={this.handleEvents} />
        <Error value={this.state.error} />
        <Summary values={this.state.summary} error={this.state.error} />
        <Table values={this.state.values} error={this.state.error} sums={this.state.summary} />
      </div>
    )
  }
}

function func_init () {
  g_event_id_counter = 0
  ReactDOM.render(<Container />, document.getElementById('react_container'))
}

function is_numeric (n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}

function findEventById (x, event_id) {
  if (x.id == event_id) {
    return true
  }
  return false
}
