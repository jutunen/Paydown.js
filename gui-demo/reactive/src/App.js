import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import './App.css';
import Paydown from 'paydown'
import { RawIO, Form, Summary, Table, ErrorMsg, Buttons, Events, RemoveButton, get_new_id, date_obj_to_string  } from './AppComponents.js'
import * as cloneDeep from 'lodash.clonedeep';
import { funcImportBasic, funcImportAdvanced, funcImportNoRecurringPayments, funcImportInterestsOnlyPayments } from './AppExamples.js'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      values: [],
      summary: {},
      error: '',
      startDate: null,
      endDate: null,
      principal: '',
      rate: '',
      dayCountMethod: 'act/360',
      recurringPayment: '',
      paymentMethod: 'equal_installment',
      firstPaymentDate: null,
      recurringPaymentDay: 1,
      events: [],
      showSummary: true,
      showRawIO: false
    }

    this.handleInput = this.handleInput.bind(this)
    this.handleEvents = this.handleEvents.bind(this)
    this.handleButtons = this.handleButtons.bind(this)
    this.getState = this.getState.bind(this)

    this.input_data = []
    this.payments_array = []
    this.events_array = []
    this.rval_obj = {}

    this.appRef = React.createRef()
  }

  componentDidMount () {
    if(this.props.initState) {
      this.setState(this.props.initState, this.calculateInput)
    }
    this.props.stateGetterCb(this.getState, this.props.id)
  }

  componentWillUnmount() {
    this.props.stateGetterCb(null, this.props.id)
  }

  getState () {
    return this.state;
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
        payment_method: '',
        id: get_new_id(),
        included: true
      }
    } else {
      event = {
        date: '',
        rate: '',
        recurring_amount: '',
        pay_installment: '',
        pay_reduction: '',
        payment_method: '',
        id: get_new_id(),
        included: true
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
      event.payment_method = ''
      event.id = get_new_id()
      events.push(event)
    }
    this.setState({events: events})
  }

  handleEvents (synthEvent, event_id, field_id) {
    var events_clone = [...this.state.events]
    var index = events_clone.findIndex(x => findEventById(x, event_id))

    if (field_id === 0) { // date
      events_clone[index].date = synthEvent
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
    } else if (field_id === 6) { // new payment method
      events_clone[index].payment_method = synthEvent.target.value
    }
    this.setState({events: events_clone}, this.calculateInput)
  }

  handleButtons (param, synthEvent) {
    if (param === 1) {
      this.addEvent()
    } else if (param === 2) {
      if (synthEvent.value === 1) {
        this.clearAll(funcImportBasic)
      } else if (synthEvent.value === 2) {
        this.clearAll(funcImportAdvanced(get_new_id))
      } else if(synthEvent.value === 3) {
        this.clearAll(funcImportNoRecurringPayments(get_new_id))
      } else if(synthEvent.value === 4) {
        this.clearAll(funcImportInterestsOnlyPayments(get_new_id))
      }
    } else if (param === 4) {
      this.clearAll()
    } else if (param === 5) {
      this.setState({showRawIO: !this.state.showRawIO});
    } else if (param === 6) {
      this.setState({showSummary: !this.state.showSummary});
    } else if (param === 7) {
      this.handleFileImport(synthEvent)
    }
  }

  readUploadedFile (inputFile) {
    const fileReader = new FileReader()

    return new Promise((resolve, reject) => {
      fileReader.onerror = () => {
        fileReader.abort()
        reject(new DOMException("File read error."))
      }

      fileReader.onload = () => {
        resolve(fileReader.result);
      }
      fileReader.readAsText(inputFile);
    })
  }

  async handleFileImport (event) {
    const file = event.target.files[0];

    try {
      var text = await this.readUploadedFile(file)
      var match_array = text.match(/¤¤(\d\d)\.(\d\d)\$\$:(.*?)('>|">|<\/jspdf)(<|\n|:)/);
      if(match_array)
        {
        let stateFromFile = replace_XML_entities(match_array[3]);
        let stateAsObj = JSON.parse(stateFromFile)
        fixObjDates(stateAsObj)
        if(stateAsObj.events.length > 0) {
          fixObjEvent(stateAsObj)
        }
        this.setState(stateAsObj, this.calculateInput)
        }
      else
        {
        alert("File import failed!");
        }
    } catch (e) {
        alert(e.message)
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
    this.input_data = {}
    this.events_array = []
    this.rval_obj = {}
    this.payments_array = []
    this.clearOutput(func)
  }

  handleInput (event, id) {
    if (id === 0) {
      this.setState({startDate: event}, this.calculateInput)
    } else if (id === 1) {
      this.setState({endDate: event}, this.calculateInput)
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
      this.setState({firstPaymentDate: event}, this.calculateInput)
    } else if (id === 8) {
      this.setState({recurringPaymentDay: event.target.value}, this.calculateInput)
    }
    ReactTooltip.hide()
  }

  copyEvents (array_ref) {
    var i = 0
    var obj = {}
    for (i = 0; i < this.state.events.length; i++) {
      if (this.state.events[i].date) {
        obj.date = date_obj_to_string(this.state.events[i].date)
      }
      if (is_numeric(this.state.events[i].rate)) {
        obj.rate = Number(this.state.events[i].rate)
      }
      if (is_numeric(this.state.events[i].recurring_amount)) {
        obj.recurring_amount = Number(this.state.events[i].recurring_amount)
      }
      if (is_numeric(this.state.events[i].pay_installment)) {
        obj.pay_installment = Number(this.state.events[i].pay_installment)
      }
      if (is_numeric(this.state.events[i].pay_reduction)) {
        obj.pay_reduction = Number(this.state.events[i].pay_reduction)
      }
      if (this.state.events[i].payment_method) {
        obj.payment_method = this.state.events[i].payment_method
      }
      array_ref.push(Object.assign({}, obj))
      obj = {}
    }
  }

  calculateInput () {
    this.input_data = {}
    this.input_data.recurring = {}

    if(this.state.startDate instanceof Date) {
      this.input_data.start_date = date_obj_to_string(this.state.startDate)
    } else {
      this.setError(":Invalid start date!")
      return
    }

    if(this.state.endDate instanceof Date) {
      this.input_data.end_date =  date_obj_to_string(this.state.endDate)
    } else {
      this.setError(":Invalid end date!")
      return
    }

    this.input_data.principal = Number(this.state.principal)
    this.input_data.rate = Number(this.state.rate)
    this.input_data.day_count_method = this.state.dayCountMethod

    this.input_data.recurring.payment_method = this.state.paymentMethod
    if(this.state.firstPaymentDate instanceof Date) {
      this.input_data.recurring.first_payment_date = date_obj_to_string(this.state.firstPaymentDate)
    } else {
      this.input_data.recurring.first_payment_date = '';
    }
    this.input_data.recurring.payment_day = Number(this.state.recurringPaymentDay)
    if(is_numeric(this.state.recurringPayment)) {
      this.input_data.recurring.amount = Number(this.state.recurringPayment)
    } else {
      delete this.input_data.recurring
    }

    var paydown = new Paydown()

    this.payments_array = []
    this.events_array = []

    this.copyEvents(this.events_array)

    try {
      this.rval_obj = paydown.calculate(this.input_data, this.events_array, this.payments_array)
    } catch (err) {
      this.setError(err.message)
      return
    }
    this.setError('')
    this.setArrayValues(this.payments_array)
    this.setObjectValues(this.rval_obj)
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
      this.setState({ values: [], summary: {} })
      this.setState(func, this.calculateInput)
    } else {
      this.setState({ values: [], summary: {} })
    }
  }

  calcHighlighter = (event, param) => {
    if(param) {
      this.appRef.current.classList.add("highlight_container");

    } else {
      this.appRef.current.classList.remove("highlight_container");
    }
  }

  render () {

    return (
      <div ref={this.appRef} className='calc_container_container'>
        <RemoveButton id={this.props.id} visible={this.props.removable} callback={this.props.removerCb} highlightCallback={this.calcHighlighter} />
        <div className='calc_container'>
          <Form callback={this.handleInput} values={this.state} />
          <Buttons callback={this.handleButtons} summary={this.state.showSummary} id={this.props.id} internal={this.state.showRawIO} />
          <Events values={this.state.events} callback={this.handleEvents} />
          <ErrorMsg value={this.state.error} />
          <RawIO error={this.state.error} init={this.input_data} events={this.events_array} rval={this.rval_obj} payments={this.payments_array} visible={this.state.showRawIO} />
          <Summary values={this.state.summary} error={this.state.error} visible={this.state.showSummary} />
          <Table values={this.state.values} error={this.state.error} sums={this.state.summary} id={this.props.id} state={this.state} />
        </div>
      </div>
    )
  }
}

function Apps (props) {
  return (
    <>
      {props.ids.map( (value) => {
        return <App key={value} id={value} removable={props.ids.length > 1 ? true : false} removerCb={props.removerCb} stateGetterCb={props.stateGetterCb} initState={props.initState} />
        })
      }
    </>
  )
}

function Duplicator (props) {

  if(props.visible !== true) {
    return null
  }
  return (
    <div id='duplicator'>
      <p id='duplicator_p'>One calculator isn't enough?</p>
      <button onClick={props.callback} id='duplicate_button'>Make it double!</button>
    </div>
  )
}

class AppContainer extends Component {
  constructor (props) {
    super(props)
    this.state = { appIds: [0] }
    this.newAppId = 1
    this.duplicateApp = this.duplicateApp.bind(this)
    this.removeApp = this.removeApp.bind(this)
    this.getStateGetterFunction = this.getStateGetterFunction.bind(this)
    this.copyOfState = null
    this.stateGetters = []

    window.g_event_id_counter = 0
  }

  getStateGetterFunction(stateGetter, id) {
    if(stateGetter !== null) {
      this.stateGetters.push({func:stateGetter, id:id})
    } else {
      let indexToBeRemoved = this.stateGetters.findIndex(x => { if(x.id === id) {return true}; return false }  )
      this.stateGetters.splice(indexToBeRemoved, 1)
    }
  }

  duplicateApp () {
    this.copyOfState = cloneDeep(this.stateGetters[0].func())
    var newIds = [...this.state.appIds]
    newIds.push(this.newAppId++)
    this.setState({ appIds: newIds })
  }

  removeApp (synthEvent, id) {
    var newIds = [...this.state.appIds]
    var index = newIds.indexOf(id)
    newIds.splice(index, 1)
    this.setState({ appIds: newIds })
  }

  render () {
    return (
      <>
      <div id='app_container'>
        <Apps ids={this.state.appIds} removerCb={this.removeApp} stateGetterCb={this.getStateGetterFunction} initState={this.copyOfState}/>
      </div>
      <Duplicator callback={this.duplicateApp} visible={this.state.appIds.length > 1 ? false : true} />
      </>
    )
  }
}

function findEventById (x, event_id) {
  if (x.id == event_id) {
    return true
  }
  return false
}

function is_numeric (n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}

function replace_XML_entities(string)
{
  var temp_str = string.replace(/&gt;/g,'>');
  var temp_str_2 = temp_str.replace(/&lt;/g,'<');
  var temp_str_3 = temp_str_2.replace(/&amp;/g,'&');
  var temp_str_4 = temp_str_3.replace(/&apos;/g,"'");
  var temp_str_5 = temp_str_4.replace(/&quot;/g ,'"');
  return temp_str_5;
}

function fixObjDates(obj) {
  obj.startDate = stringToDate(obj.startDate)
  obj.endDate = stringToDate(obj.endDate)
  if(obj.firstPaymentDate) {
    obj.firstPaymentDate = stringToDate(obj.firstPaymentDate)
  }
}

function fixObjEvent(obj) {
  for( let i = 0; i < obj.events.length; i++) {
    obj.events[i].date = stringToDate(obj.events[i].date)
    if(!obj.events[i].hasOwnProperty('included')) {
      obj.events[i].included = true
    }
    obj.events[i].id = get_new_id()
  }
}

function stringToDate( str ) {
  var match_array = str.match(/(\d{1,2})\.(\d{1,2})\.(\d\d\d\d).*/);
  var dateObj = new Date()
  dateObj.setFullYear(Number(match_array[3]))
  dateObj.setMonth(Number(match_array[2]) - 1)
  dateObj.setDate(Number(match_array[1]))
  return dateObj
}

export default AppContainer;
