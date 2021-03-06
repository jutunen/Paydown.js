
import React, { Component, PureComponent } from 'react';
import ReactTooltip from 'react-tooltip';
import DatePicker from 'react-datepicker';
import Downshift from 'downshift';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { saveAs } from 'file-saver';
import * as cloneDeep from 'lodash.clonedeep';
import './react-datepicker.css';
import './App.css';
import delButton from './delete-button.png';
import menuButton from './hamburger-icon.png';
import { is_numeric } from './App.js';

export function Form (props) {
  return (
    <div className='init_data_container'>
      <div data-tip data-for='startDate' className='init_data'>
        Start date &nbsp;
        <DatePicker
          selected={props.values.startDate}
          onChange={x => props.callback(x, 0)}
          placeholderText="dd.mm.yyyy"
          dateFormat="dd.MM.yyyy"
          disabledKeyboardNavigation={true}
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          name="startDate"
        />
      </div>
      <ReactTooltip id='startDate' effect='solid' delayShow={350}>
        <span>Calculation start date</span>
      </ReactTooltip>
      <div data-tip data-for='endDate' className='init_data'>
        End date &nbsp;
        <DatePicker
          selected={props.values.endDate}
          onChange={x => props.callback(x, 1)}
          placeholderText="dd.mm.yyyy"
          dateFormat="dd.MM.yyyy"
          disabledKeyboardNavigation={true}
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          name="endDate"
        />
      </div>
      <ReactTooltip id='endDate' effect='solid' delayShow={350}>
        <span>Calculation end date</span>
      </ReactTooltip>
      <div data-tip data-for='principal' className='init_data'>
        Principal &nbsp;
        <input name="principal" value={props.values.principal} onChange={x => props.callback(x, 2)} type='text' className='amount_input_wide' maxLength='10' />
      </div>
      <ReactTooltip id='principal' effect='solid' delayShow={350}>
        <span>Principal amount at the start date</span>
      </ReactTooltip>
      <div data-tip data-for='rate' className='init_data'>
        Rate &nbsp;
        <input name="rate" value={props.values.rate} onChange={x => props.callback(x, 3)} type='text' className='amount_input_narrow' maxLength='5' /> %
      </div>
      <ReactTooltip id='rate' effect='solid' delayShow={350}>
        <span>Interest rate at the start date</span>
      </ReactTooltip>
      <div data-tip data-for='dayCountMethod' className='init_data'>
        Day count method &nbsp;
        <select name="dayCountMethod" value={props.values.dayCountMethod} onChange={x => props.callback(x, 4)}>
          <option value='act/360'>Act/360</option>
          <option value='act/365'>Act/365</option>
        </select>
      </div>
      <ReactTooltip id='dayCountMethod' effect='solid' delayShow={350}>
        <span>Determines how interest accrues over time</span>
      </ReactTooltip>
      <div data-tip data-for='recurringPayment' className='init_data'>
        Recurring payment &nbsp;
        <input name="recurringPayment" value={props.values.recurringPayment} onChange={x => props.callback(x, 5)} type='text' className='amount_input' maxLength='10' />
      </div>
      <ReactTooltip id='recurringPayment' effect='solid' delayShow={350}>
        <span>The amount of recurring payment</span>
      </ReactTooltip>
      <div data-tip data-for='paymentMethod' className='init_data'>
        Payment method &nbsp;
        <select name="paymentMethod" value={props.values.paymentMethod} onChange={x => props.callback(x, 6)}>
          <option value='equal_installment'>Equal Installment</option>
          <option value='equal_reduction'>Equal Reduction</option>
        </select>
      </div>
      <ReactTooltip id='paymentMethod' effect='solid' delayShow={350}>
        <span>Payment method for recurring payments</span>
      </ReactTooltip>
      <div data-tip data-for='firstPaymentDate' className='init_data'>
        1st recurring payment date &nbsp;
        <DatePicker
          selected={props.values.firstPaymentDate}
          onChange={x => props.callback(x, 7)}
          placeholderText="dd.mm.yyyy"
          dateFormat="dd.MM.yyyy"
          disabledKeyboardNavigation={true}
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          name="firstPaymentDate"
        />
      </div>
      <ReactTooltip id='firstPaymentDate' effect='solid' delayShow={350}>
        <span>First recurring payment date</span>
      </ReactTooltip>

      <div data-tip data-for='recurringPaymentDay' className='init_data'>
        Recurring payment day &nbsp;
        <select name="recurringPaymentDay" value={props.values.recurringPaymentDay} onChange={x => props.callback(x, 8)}>
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
      <ReactTooltip id='recurringPaymentDay' effect='solid' delayShow={350}>
        <span>Monthly payment day of the recurring payment</span>
      </ReactTooltip>

      <div data-tip data-for='recurringPaymentPeriod' className='init_data'>
        Recurring payment period &nbsp;
        <select name="recurringPaymentPeriod" value={props.values.recurringPaymentPeriod} onChange={x => props.callback(x, 11)}>
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
          <option value='4'>4</option>
          <option value='5'>5</option>
          <option value='6'>6</option>
          <option value='7'>7</option>
          <option value='8'>8</option>
          <option value='9'>9</option>
          <option value='10'>10</option>
          <option value='11'>11</option>
          <option value='12'>12</option>
        </select>
        &nbsp;months
      </div>
      <ReactTooltip id='recurringPaymentPeriod' effect='solid' delayShow={350}>
        <span>Recurring payment period length</span>
      </ReactTooltip>

      <div data-tip data-for='rec_fee' className='init_data'>
        Recurring payment fee &nbsp;
        <input name="recurringPaymentFee" value={props.values.recurringPaymentFee} onChange={x => props.callback(x, 10)} type='text' className='amount_input_narrow' maxLength='10' />
      </div>
      <ReactTooltip id='rec_fee' effect='solid' delayShow={350}>
        <span>Recurring payment fee</span>
      </ReactTooltip>

      <div data-tip data-for='init_fee' className='init_data'>
        Initial fee &nbsp;
        <input name="initFee" value={props.values.initFee} onChange={x => props.callback(x, 9)} type='text' className='amount_input_narrow' maxLength='10' />
      </div>
      <ReactTooltip id='init_fee' effect='solid' delayShow={350}>
        <span>Loan establishment fee</span>
      </ReactTooltip>
    </div>
  )
}

export function Summary (props) {

  if (!props.values.hasOwnProperty('sum_of_interests') || props.visible === false || props.error) {
    return null
  }

  return (
    <div id='output_summary_container'>
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
      <div className='output_value'>
        Sum of fees: {props.values.sum_of_fees}
      </div>
    </div>
  )
}

function TableRow (props) {

  if(!is_numeric(props[6])) {
    props[6] = 0
  }

  return (
    <tr key={get_new_id()}>
      <td>{ props[0] }</td>
      <td>{ props[1] }</td>
      <td>{ props[2] }</td>
      <td>{ props[3] }</td>
      <td>{ props[4] }</td>
      <td>{ props[5] }</td>
      <td>{ props[6] }</td>
    </tr>
  )
}

export function Table (props) {

  var saveTableTooltipText = 'The saved file shall also contain the table input<br />values, which can be imported back to this calculator.'

  var tableId = 'table_' + props.id;

  if (props.values.length === 0 || props.error) {
    return null
  }

  var handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      saveTableToFile()
    }
  }

  var saveTableToFile = () => {
    var stateCopy = cloneDeep(props.state)

    delete stateCopy.id
    delete stateCopy.removable
    delete stateCopy.store

    if(stateCopy.startDate instanceof Date) {
      stateCopy.startDate = date_obj_to_string(stateCopy.startDate)
    } else {
      throw "Error: stateCopy.startDate is not an instance of Date"
    }

    if(stateCopy.endDate instanceof Date) {
      stateCopy.endDate = date_obj_to_string(stateCopy.endDate)
    } else {
      throw "Error: stateCopy.endDate is not an instance of Date"
    }

    if(stateCopy.firstPaymentDate instanceof Date) {
      stateCopy.firstPaymentDate = date_obj_to_string(stateCopy.firstPaymentDate)
    }  else {
      stateCopy.firstPaymentDate = ""
    }

    if(stateCopy.events.length > 0) {
      for( let i = 0; i < stateCopy.events.length; i++) {
        stateCopy.events[i].date = date_obj_to_string(stateCopy.events[i].date)
        delete stateCopy.events[i].id
      }
    }

    var metadata_token = '¤¤00.01$$:' // contains metadata version number
    var metadata = replace_XML_special_chars(JSON.stringify(stateCopy))
    metadata = metadata_token + metadata

    var style = document.createElement('style');
    style.innerHTML = '#tableTitleTd{text-align:left;}.bold_class{font-weight:bold;}table,th,td{border-spacing:0;text-align:center;font-family:Arial,Helvetica,sans-serif;border:1px solid black;}td{padding:1px 15px;min-width:100px;}'

    var originalTableElement = document.getElementById(tableId)
    var tableElement = originalTableElement.cloneNode(true)

    var titleInputElement = tableElement.querySelector('#tableTitleInput')
    if(titleInputElement) {
      titleInputElement.remove()

      var titleTdElement = tableElement.querySelector('#tableTitleTd')

      if(titleTdElement) {
        if(props.state.tableTitle === '') {
          titleTdElement.remove()
        } else {
          titleTdElement.innerHTML = props.state.tableTitle
        }
      }
    }

    tableElement.appendChild(style)

    var data_uri = '<!DOCTYPE html>' +
                   '<html>' +
                   '<head>' +
                   '<meta charset=UTF-8">' +
                   "<meta name='paydown.js_gui' content='" + metadata + "'>" +
                   '<meta name="format-detection" content="telephone=no">' + // without this Edge might interpret number as telephone number and style it as link
                   '<title>Loan_payments</title>' +
                   '</head>' +
                   '<body>' +
                   tableElement.outerHTML +
                   '<div style="margin-top:3px;font-family:Arial,Helvetica,sans-serif;font-size:14px;"> Saving this table to file as HTML enables bringing table values back to calculator.</div>' +
                   '</body>' +
                   '</html>';

    var blob = new Blob([data_uri], {type: "text/html;charset=utf-8"})
    saveAs(blob, "paydown.html")
  };

  return (
    <div className='table_container'>
      <div className='table_resize_container'>
        <table id={tableId}>
          <tbody>
            <tr>
              <td id='tableTitleTd' colSpan='7'>
                <input id='tableTitleInput' value={props.state.tableTitle} onChange={x => props.callback(x)} className='table_title_input' type='text' maxLength='200' placeholder='Insert table title or other information here!' />
              </td>
            </tr>
            <tr className='bold_class'>
              <td>Date</td>
              <td>Rate</td>
              <td>Installment</td>
              <td>Reduction</td>
              <td>Interest</td>
              <td>Principal</td>
              <td>Fee</td>
            </tr>
            {props.values.map(TableRow)}
            <tr className='bold_class'>
              <td>Total</td>
              <td>-</td>
              <td>{props.sums.sum_of_installments}</td>
              <td>{props.sums.sum_of_reductions}</td>
              <td>{props.sums.sum_of_interests}</td>
              <td>-</td>
              <td>{props.sums.sum_of_fees}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div tabIndex='0' data-tip={saveTableTooltipText} data-for='saveTable' className='table_saver' onClick={saveTableToFile} onKeyPress={handleKeyPress}>
        Save table to file as HTML
      </div>
      <ReactTooltip id='saveTable' effect='solid' html={true} delayShow={350} />
    </div>
  )
}

export function ErrorMsg (props) {
  var splitted

  if (props.value) {
    splitted = props.value.split(':')
  } else {
    return null
  }

  if(splitted.length > 1) {
    splitted = splitted[1]
  }

  return (
    <div id='error_container'>
      {'Fix input: ' + splitted}
    </div>
  )
}

export function RawIO (props) {

  if (props.visible === false || props.error ) {
    return null
  }

  return (
    <div id='raw_input_container'>
      <p>Init values:</p>
      <span>{JSON.stringify(props.init,null,1)}</span>
      <p>Events:</p>
      <span>{JSON.stringify(props.events,null,1)}</span>
      <p>Summary:</p>
      <span>{JSON.stringify(props.rval,null,1)}</span>
      <p>Payments:</p>
      <span>{JSON.stringify(props.payments,null,1)}</span>
    </div>
  )
}

function DownShiftSelect(props) {

  const items = [
    { value: 'Basic', tip: 'Example without events', id: 1 },
    { value: 'Advanced', tip: 'Example with 2 events', id: 2 },
    { value: 'No recurring payments', tip: 'Both payments in this<br />example are defined by events', id: 3 },
    { value: 'Interests only payments', tip: 'Setting recurring amount to<br />zero enables interests only payments', id: 4 },
    { value: 'Negative interest', tip: 'Example with negative interest', id: 5 }
  ]

  return (
    <Downshift
      onSelect={selection => props.callback(2, selection.id)}
      itemToString={item => (item ? item.value : '')}
    >
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        getMenuProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem,
        getToggleButtonProps
      }) => (
        <div>
          <button {...getToggleButtonProps()} >Import example</button>
          <ul {...getMenuProps()} style={{listStyleType:'none',position:'absolute',top:'40px',left:'180px',zIndex:'1'}}>
            {isOpen
              ? items
                  .map((item, index) => (
                    <React.Fragment key={item.id}>
                    <li
                      {...getItemProps({
                        key: item.value,
                        index,
                        item,
                        style: {
                          backgroundColor: highlightedIndex === index ? '#f2f9fc' : 'white',
                          textDecoration: highlightedIndex === index ? 'underline' : 'none',
                          padding:'10px',
                          cursor: 'pointer'
                        }
                      })}
                      data-tip={item.tip} data-for='importExampleItem'
                    >
                      {item.value}
                    </li>
                    <ReactTooltip id='importExampleItem' effect='solid' place='right' html={true} delayShow={350} />
                    </React.Fragment>
                  ))
              : null}
          </ul>
        </div>
      )}
    </Downshift>
  )
}


export function Buttons (props) {
  var fileImportTooltipText = 'When a payments table is saved to file as HTML, the<br />table input values can be imported back to this calculator.'

  return (
    <div id='buttons_container'>
      <button name="addEvent" onClick={() => props.callback(1)} type='button'>Add event</button>
      <DownShiftSelect callback={props.callback} />
      <input className='fileImport' id={'fileImport_' + props.id} type='file' accept='.html,.htm,.pdf' onChange={ x => props.callback(7, x) }></input>
      <label data-tip={fileImportTooltipText} data-for='labelFileImport' className='fileImportLabel' htmlFor={'fileImport_' + props.id}>
        Import from file
      </label>
      <ReactTooltip id='labelFileImport' effect='solid' html={true} delayShow={350} />
      <div id='checkboxes'>
        <label>
          <div className='showhide_checkbox_container'>
            <input type='checkbox' checked={props.summary} onChange={() => props.callback(6)} />
            Show summary
          </div>
        </label>
        <label>
          <div className='showhide_checkbox_container'>
            <input type='checkbox' checked={props.internal} onChange={() => props.callback(5)} />
            Show raw I/O
          </div>
        </label>
      </div>
      <button onClick={() => props.callback(4)} type='button'>Clear all</button>
    </div>
  )
}

class CalcEvent extends Component {
  constructor (props) {
    super(props)
    this.eventRef = React.createRef()
  }

  highLightEvent = () => {
    this.eventRef.current.classList.add("highlight_container");
  };

  unhighLightEvent = () => {
    this.eventRef.current.classList.remove("highlight_container");
  };

  render() {

    var name_of_class = 'event_inclusion_container'
    if(this.props.included === false) {
      name_of_class = 'event_exclusion_container'
    }

    var eventCheckboxTooltipText = 'Unchecked checkbox excludes<br />the event from the calculation.'

    return (
      <div ref={this.eventRef} className='event_container'>
        <label data-tip={eventCheckboxTooltipText} data-for='eventCheckbox' className='event_checkbox_container'>
          <div className='event_data'>
            <input type='checkbox' checked={this.props.included} onChange={x => this.props.callback(x, this.props.values.id, 7)}/>
          </div>
        </label>
        <ReactTooltip id='eventCheckbox' effect='solid' delayShow={350} place='right' html={true} />
        <div className={name_of_class}>
          <div className='event_data'>
            <div className='event_descriptor'>Event Date</div>
            <DatePicker
              selected={this.props.values.date}
              onChange={x => this.props.callback(x, this.props.values.id, 0)}
              placeholderText="dd.mm.yyyy"
              dateFormat="dd.MM.yyyy"
              disabledKeyboardNavigation={true}
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              disabled={!this.props.included}
              name="eventDate"
            />
          </div>
          <div className='event_data'>
            <div className='event_descriptor'>New interest rate</div>
            <input name="eventRate" disabled={!this.props.included} type='text' value={this.props.values.rate} onChange={x => this.props.callback(x, this.props.values.id, 1)} className='amount_input_narrow' maxLength='5' />
          </div>
          <div className='event_data'>
            <div className='event_descriptor'>New recurring amount</div>
            <input name="eventAmount" disabled={!this.props.included} type='text' value={this.props.values.recurring_amount} onChange={x => this.props.callback(x, this.props.values.id, 2)} className='amount_input' maxLength='10' />
          </div>
          <div className='event_data'>
            <div className='event_descriptor'>Single installment</div>
            <input name='eventInstallment' disabled={!this.props.included} type='text' value={this.props.values.pay_installment} onChange={x => this.props.callback(x, this.props.values.id, 3)} className='amount_input' maxLength='10' />
          </div>
          <div className='event_data'>
            <div className='event_descriptor'>Single reduction</div>
            <input name='eventReduction' disabled={!this.props.included} type='text' value={this.props.values.pay_reduction} onChange={x => this.props.callback(x, this.props.values.id, 4)} className='amount_input' maxLength='10' />
          </div>
          <div className='event_data'>
            <div className='event_descriptor'>New payment method</div>
            <select name='eventMethod' disabled={!this.props.included} value={this.props.values.payment_method} onChange={x => this.props.callback(x, this.props.values.id, 6)}>
              <option value=''></option>
              <option value='equal_installment'>Eq.Ins.</option>
              <option value='equal_reduction'>Eq.Red.</option>
            </select>
          </div>
          <div className='event_data'>
            <div className='event_descriptor'>New recurring payment fee</div>
            <input name='eventRecurringPaymentFee' disabled={!this.props.included} type='text' value={this.props.values.recurring_payment_fee} onChange={x => this.props.callback(x, this.props.values.id, 8)} className='amount_input' maxLength='10' />
          </div>
          <div className='event_data'>
            <div className='event_descriptor'>Single fee</div>
            <input name='eventSinglePaymentFee' disabled={!this.props.included} type='text' value={this.props.values.single_payment_fee} onChange={x => this.props.callback(x, this.props.values.id, 9)} className='amount_input' maxLength='10' />
          </div>
        </div>
        <div className='event_data'>
          <input type='image' name="eventRemove" src={delButton} alt='Remove' height='25' width='25' onClick={x => this.props.callback(x, this.props.values.id, 5)} onMouseEnter={this.highLightEvent} onMouseLeave={this.unhighLightEvent} />
        </div>
      </div>
    )
  }
}

export class Events extends PureComponent {
  constructor (props) {
    super(props)
    this.eventRef = React.createRef()
    this.timeout = 200
  }

  shrinkHeight = () => {
    this.eventRef.current.style.height = '15px'
  }

  scrollToBottom = () => {
    this.eventRef.current.scrollTop = this.eventRef.current.scrollHeight
  };

  scrollToBottomWrapper = () => {
    setTimeout(this.scrollToBottom, this.timeout);
  };

  disableResizing = () => {
    this.eventRef.current.style.resize = 'none'
    this.eventRef.current.style.overflow = 'visible'
    this.eventRef.current.style.height = 'auto'
  };

  enableResizing = (autoHeight) => {
    this.eventRef.current.style.resize = 'vertical'
    this.eventRef.current.style.overflow = 'scroll'
    if(autoHeight) {
      this.eventRef.current.style.height = 'auto'
    } else {
      let height = parseInt(this.eventRef.current.style.height)
      if(height < 20) {
        this.eventRef.current.style.height = '105px'
      }
    }
  };

  componentDidUpdate() {
    if(this.props.eventsAction === 'ADD') {
      this.enableResizing()
      this.scrollToBottomWrapper()
    } else if (this.props.eventsAction === 'IMPORT') {
      this.enableResizing(true)
    }

    if(this.props.values.length === 0) {
      this.disableResizing()
    } else {
      this.enableResizing()
    }
  }

  componentDidMount() {
    if(this.props.values.length > 0) {
      this.enableResizing()
    }
  }

  render() {

    if(!this.props.values) {
      return null
    }

    return (
      <div ref={this.eventRef} className='events_container'>
        <TransitionGroup component={null}>
          {this.props.values.map(
            (value) => {
              return (
                       <CSSTransition classNames="event-transition" timeout={this.timeout} key={value.id}>
                         <CalcEvent values={value} callback={this.props.callback} included={value.included} />
                       </CSSTransition>
                     )
            })
          }
        </TransitionGroup>
      </div>
    )
  }
}

export function RemoveButton (props) {
  if(props.visible !== true) {
    return null
  }

  return (
    <>
    <input type='image' data-tip data-for='removeButton' src={delButton} id="app_remove_button" alt='Remove' height='35' width='35' onClick={x => props.callback(x, props.id)} onMouseEnter={x => props.highlightCallback(x,true)} onMouseLeave={x => props.highlightCallback(x,false)} />
    <ReactTooltip id='removeButton' effect='solid' delayShow={350}>
      <span>Remove this side calculator</span>
    </ReactTooltip>
    </>
  )
}

// this is just to keep the menu open on undo/redo clicks:
function stateReducer(state, changes)
{
  if( ( changes.inputValue === 'Undo' || changes.inputValue === 'Redo' ) && ( changes.type === Downshift.stateChangeTypes.clickItem || changes.type === Downshift.stateChangeTypes.keyDownEnter ) ) {
    return {
      ...changes,
      isOpen: true
    }
  }

  return changes
}

export function HamburgerMenu (props) {
  const items = [
    { value: 'Undo', tip: 'Undo last action', id: 1, clickable: true },
    { value: 'Redo', tip: 'Redo last action', id: 2, clickable: true },
    { value: 'Arrange events by date', tip: 'Arrange events by date', id: 3, clickable: true },
    { value: 'Shrink events', tip: 'Shrink events view', id: 4, clickable: true },
    { value: 'Expand events', tip: 'Expand events view', id: 5, clickable: true }
  ]

  var state
  if(props.store) {
    state = props.store.getState()
    if(state.past.length === 0) {
      // set Undo to unclickable
      items[0].clickable = false
    }
    if(state.future.length === 0) {
      // set Redo to unclickable
      items[1].clickable = false
    }
  }

  return (
    <Downshift
      onSelect={selection => props.callback(selection ? selection.id : null)}
      itemToString={item => (item ? item.value : '')}
      stateReducer={stateReducer}
    >
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        getMenuProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem,
        getToggleButtonProps
      }) => (
        <div>
          <input {...getToggleButtonProps()} type='image' data-tip data-for='menuButton' src={menuButton} id="app_menu_button" alt='Menu' height='35' width='35' />
          <ReactTooltip id='menuButton' effect='solid' place='right' delayShow={350}>
            <span>Show menu</span>
          </ReactTooltip>
          <ul {...getMenuProps()} style={{listStyleType:'none',position:'absolute',top:'25px',left:'-30px',zIndex:'1'}}>
            {isOpen
              ? items
                  .map((item, index) => (
                    <React.Fragment key={item.id}>
                    <li
                      {...getItemProps({
                        key: item.value,
                        index,
                        item,
                        style: {
                          backgroundColor: highlightedIndex === index ? '#f2f9fc' : 'white',
                          textDecoration: highlightedIndex === index && item.clickable ? 'underline' : 'none',
                          padding:'10px',
                          cursor: item.clickable ? 'pointer' : 'initial',
                          color: item.clickable ? 'black' : 'gray'
                        }
                      })}
                      data-tip={item.tip} data-for='importExampleItem'
                    >
                      {item.value}
                    </li>
                    <ReactTooltip id='importExampleItem' effect='solid' place='right' html={true} delayShow={350} />
                    </React.Fragment>
                  ))
              : null}
          </ul>
        </div>
      )}
    </Downshift>
  )
}

export function get_new_id () {
  var id = window.g_event_id_counter++
  return String(id)
}

export function date_obj_to_string( date_obj ) {
  var date_str = String(date_obj.getDate()) + '.' + String(date_obj.getMonth() + 1) + '.' + String(date_obj.getFullYear())
  return date_str
}

function replace_XML_special_chars(string)
{
  var temp_str = string.replace(/&/g,'&amp;');
  var temp_str_2 = temp_str.replace(/</g,'&lt;');
  var temp_str_3 = temp_str_2.replace(/>/g,'&gt;');
  var temp_str_4 = temp_str_3.replace(/'/g,'&apos;');
  var temp_str_5 = temp_str_4.replace(/"/g ,'&quot;');
  return temp_str_5;
}
