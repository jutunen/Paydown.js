import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import './App.css';
import Paydown from 'paydown'
import { RawIO, Form, Summary, Table, ErrorMsg, Buttons, Events, RemoveButton, HamburgerMenu, get_new_id, date_obj_to_string  } from './AppComponents.js'
import { connect } from 'react-redux';
import { setStartDate, setEndDate, setRate, setPrincipal, setDayCountMethod, setRecurringPayment, setPaymentMethod, setFirstRecurringPaymentDate, setRecurringPaymentDay, clearAll, addEvent, deleteEvent, setEventDate, setEventRate, setEventReduction, setEventInstallment, setEventRecurringAmount, setEventPaymentMethod, importExample1, importExample2, importExample3, importExample4, toggleEventInclude, importFromFile, setTableTitle, toggleSummary, toggleRawIO, sortEventsByDate, setSinglePaymentFee, setRecurringPaymentFee, setInitFee, setInitRecurringPaymentFee, setRecurringPaymentPeriod } from './actions.js';
import { ActionCreators } from 'redux-undo';
import { initState } from './reducer.js';
import * as cloneDeep from 'lodash.clonedeep';

class App extends Component {
  constructor (props) {
    super(props)

    this.handleInput = this.handleInput.bind(this)
    this.handleEvents = this.handleEvents.bind(this)
    this.handleButtons = this.handleButtons.bind(this)
    this.getState = this.getState.bind(this)
    this.handleTableTitle = this.handleTableTitle.bind(this)
    this.handleMenu = this.handleMenu.bind(this)

    this.input_data = []
    this.payments_array = []
    this.events_array = []
    this.rval_obj = {}
    this.error = ''
    this.eventsAction = ''
    this.calculateInRender = true

    this.appRef = React.createRef()
    this.eventsRef = React.createRef()
  }

  componentDidMount () {
    this.props.stateGetterCb(this.getState, this.props.id)
    this.props.dispatch(ActionCreators.clearHistory())
    // this is just to get redux undo state correct:
    this.forceUpdate()
  }

  componentWillUnmount() {
    this.props.stateGetterCb(null, this.props.id)
  }

  getState () {
    return this.props.store.getState()
  }

  addEvent () {
    this.props.dispatch(addEvent(get_new_id()))
  }

  handleEvents (synthEvent, event_id, field_id) {

    if (field_id === 0) { // date
      this.props.dispatch(setEventDate(event_id, synthEvent))
    } else if (field_id === 1) { // rate
      this.props.dispatch(setEventRate(event_id, synthEvent.target.value))
    } else if (field_id === 2) { // amount
      this.props.dispatch(setEventRecurringAmount(event_id, synthEvent.target.value))
    } else if (field_id === 3) { // installment
      this.props.dispatch(setEventInstallment(event_id, synthEvent.target.value))
    } else if (field_id === 4) { // reduction
      this.props.dispatch(setEventReduction(event_id, synthEvent.target.value))
    } else if (field_id === 5) { // remove event
      this.eventsAction = 'REMOVE'
      this.props.dispatch(deleteEvent(event_id))
    } else if (field_id === 6) { // new payment method
      this.props.dispatch(setEventPaymentMethod(event_id, synthEvent.target.value))
    } else if (field_id === 7) { // included
      this.props.dispatch(toggleEventInclude(event_id))
    } else if (field_id === 8) {
      this.props.dispatch(setRecurringPaymentFee(event_id, synthEvent.target.value))
    } else if (field_id === 9) {
      this.props.dispatch(setSinglePaymentFee(event_id, synthEvent.target.value))
    }

  }

  handleTableTitle (synthEvent) {
    this.calculateInRender = false
    this.props.dispatch(setTableTitle(synthEvent.target.value))
  }

  handleButtons (param, synthEvent) {
    if (param === 1) {
      this.calculateInRender = false
      this.eventsAction = 'ADD'
      this.addEvent()
    } else if (param === 2) {
      this.eventsAction = 'IMPORT'
      if (synthEvent === 1) {
        this.props.dispatch(importExample1())
      } else if (synthEvent === 2) {
        this.props.dispatch(importExample2())
      } else if(synthEvent === 3) {
        this.props.dispatch(importExample3())
      } else if(synthEvent === 4) {
        this.props.dispatch(importExample4())
      }
    } else if (param === 4) {
      this.props.dispatch(clearAll())
    } else if (param === 5) {
      this.props.dispatch(toggleRawIO())
    } else if (param === 6) {
      this.props.dispatch(toggleSummary())
    } else if (param === 7) {
      this.eventsAction = 'IMPORT'
      this.handleFileImport(synthEvent)
    }
  }

  handleMenu (param) {
    if(param === 1) {
      // undo
      this.props.dispatch(ActionCreators.undo())
    } else if(param === 2) {
      // redo
      this.props.dispatch(ActionCreators.redo())
    } else if(param === 3) {
      // sort events by date
      this.props.dispatch(sortEventsByDate())
    } else if(param === 4) {
      // shrink events
      this.eventsRef.current.shrinkHeight()
    } else if(param === 5) {
      // expand events
      this.eventsRef.current.disableResizing()
      this.eventsRef.current.enableResizing()
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
        let stateAsObj = Object.assign(cloneDeep(initState), JSON.parse(stateFromFile))
        fixObjDates(stateAsObj)
        fixObjTableTitle(stateAsObj)
        if(stateAsObj.events.length > 0) {
          fixObjEvent(stateAsObj)
        }
        this.props.dispatch(importFromFile(stateAsObj))
        }
      else
        {
        alert("File import failed!");
        }
    } catch (e) {
        alert(e.message)
    }
  }

  handleInput (event, id) {
    if (id === 0) {
      this.props.dispatch(setStartDate(event))
    } else if (id === 1) {
      this.props.dispatch(setEndDate(event))
    } else if (id === 2) {
      this.props.dispatch(setPrincipal(event.target.value))
    } else if (id === 3) {
      this.props.dispatch(setRate(event.target.value))
    } else if (id === 4) {
      this.props.dispatch(setDayCountMethod(event.target.value))
    } else if (id === 5) {
      this.props.dispatch(setRecurringPayment(event.target.value))
    } else if (id === 6) {
      this.props.dispatch(setPaymentMethod(event.target.value))
    } else if (id === 7) {
      this.props.dispatch(setFirstRecurringPaymentDate(event))
    } else if (id === 8) {
      this.props.dispatch(setRecurringPaymentDay(event.target.value))
    } else if (id === 9) {
      this.props.dispatch(setInitFee(event.target.value))
    } else if (id === 10) {
      this.props.dispatch(setInitRecurringPaymentFee(event.target.value))
    } else if (id === 11) {
      this.props.dispatch(setRecurringPaymentPeriod(event.target.value))
    }
    ReactTooltip.hide()
  }

  // copy events from App to Paydown event array
  copyEvents (array_ref) {
    var i = 0
    var obj = {}
    for (i = 0; i < this.props.events.length; i++) {
      if( this.props.events[i].hasOwnProperty('included') ) {
        if (this.props.events[i].included === false) {
          continue
        }
      }
      if (this.props.events[i].date) {
        obj.date = date_obj_to_string(this.props.events[i].date)
      } else {
        continue
      }
      if (is_numeric(this.props.events[i].rate)) {
        obj.rate = Number(this.props.events[i].rate)
      }
      if (is_numeric(this.props.events[i].recurring_amount)) {
        obj.recurring_amount = Number(this.props.events[i].recurring_amount)
      }
      if (is_numeric(this.props.events[i].pay_installment)) {
        obj.pay_installment = Number(this.props.events[i].pay_installment)
      }
      if (is_numeric(this.props.events[i].pay_reduction)) {
        obj.pay_reduction = Number(this.props.events[i].pay_reduction)
      }
      if (is_numeric(this.props.events[i].single_payment_fee)) {
        obj.pay_single_fee = Number(this.props.events[i].single_payment_fee)
      }
      if (is_numeric(this.props.events[i].recurring_payment_fee)) {
        obj.recurring_fee_amount = Number(this.props.events[i].recurring_payment_fee)
      }
      if (this.props.events[i].payment_method) {
        obj.payment_method = this.props.events[i].payment_method
      }
      array_ref.push(Object.assign({}, obj))
      obj = {}
    }
  }

  calculateInput () {
    this.input_data = {}
    this.input_data.recurring = {}

    if(this.props.startDate instanceof Date) {
      this.input_data.start_date = date_obj_to_string(this.props.startDate)
    } else {
      this.setError(":Invalid start date!")
      return
    }

    if(this.props.endDate instanceof Date) {
      this.input_data.end_date =  date_obj_to_string(this.props.endDate)
    } else {
      this.setError(":Invalid end date!")
      return
    }

    this.input_data.principal = Number(this.props.principal)
    this.input_data.rate = Number(this.props.rate)
    this.input_data.day_count_method = this.props.dayCountMethod
    this.input_data.initial_fee = Number(this.props.initFee)

    this.input_data.recurring.payment_method = this.props.paymentMethod
    if(this.props.firstPaymentDate instanceof Date) {
      this.input_data.recurring.first_payment_date = date_obj_to_string(this.props.firstPaymentDate)
    } else {
      this.input_data.recurring.first_payment_date = '';
    }
    this.input_data.recurring.payment_day = Number(this.props.recurringPaymentDay)
    this.input_data.recurring.payment_period = Number(this.props.recurringPaymentPeriod)
    this.input_data.recurring.payment_fee = Number(this.props.recurringPaymentFee)
    if(is_numeric(this.props.recurringPayment)) {
      this.input_data.recurring.amount = Number(this.props.recurringPayment)
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
  }

  setError (str) {
    this.error = str
  }

  clearOutput (func) {
    if (func) {
      this.setState(func)
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

    if( this.calculateInRender ) {
      this.calculateInput()
    } else {
      this.calculateInRender = true
    }

    return (
        <div ref={this.appRef} className='calc_container_container'>
          <HamburgerMenu callback={this.handleMenu} store={this.props.store} />
          <RemoveButton id={this.props.id} visible={this.props.removable} callback={this.props.removerCb} highlightCallback={this.calcHighlighter} />
          <div className='calc_container'>
            <Form callback={this.handleInput} values={this.props} />
            <Buttons callback={this.handleButtons} id={this.props.id} summary={this.props.showSummary} internal={this.props.showRawIO} />
            <Events ref={this.eventsRef} values={this.props.events} callback={this.handleEvents} eventsAction={this.eventsAction} />
            <ErrorMsg value={this.error} />
            <RawIO error={this.error} init={this.input_data} events={this.events_array} rval={this.rval_obj} payments={this.payments_array} visible={this.props.showRawIO} />
            <Summary values={this.rval_obj} error={this.error} visible={this.props.showSummary} />
            <Table values={this.payments_array} error={this.error} sums={this.rval_obj} id={this.props.id} state={this.props} callback={this.handleTableTitle} />
          </div>
        </div>
    )
  }
}

export function is_numeric (n) {
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

function fixObjTableTitle(obj) {
  if( !obj.hasOwnProperty('tableTitle') ) {
    obj.tableTitle = ''
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

function mapStateToProps(state) {
  return Object.assign( {}, state.present )
}

export default connect(mapStateToProps)(App);
