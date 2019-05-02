import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import DatePicker from 'react-datepicker';
import './react-datepicker.css';
import './App.css';
import delButton from './delete-button.png';

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
        />
      </div>
      <ReactTooltip id='startDate' effect='solid'>
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
        />
      </div>
      <ReactTooltip id='endDate' effect='solid'>
        <span>Calculation end date</span>
      </ReactTooltip>
      <div data-tip data-for='principal' className='init_data'>
        Principal &nbsp;
        <input value={props.values.principal} onChange={x => props.callback(x, 2)} type='text' className='amount_input_wide' maxLength='10' />
      </div>
      <ReactTooltip id='principal' effect='solid'>
        <span>Principal amount at the start date</span>
      </ReactTooltip>
      <div data-tip data-for='rate' className='init_data'>
        Rate &nbsp;
        <input value={props.values.rate} onChange={x => props.callback(x, 3)} type='text' className='amount_input_narrow' maxLength='5' /> %
      </div>
      <ReactTooltip id='rate' effect='solid'>
        <span>Interest rate at the start date</span>
      </ReactTooltip>
      <div data-tip data-for='dayCountMethod' className='init_data'>
        Day count method &nbsp;
        <select value={props.values.dayCountMethod} onChange={x => props.callback(x, 4)}>
          <option value='act/360'>Act/360</option>
          <option value='act/365'>Act/365</option>
        </select>
      </div>
      <ReactTooltip id='dayCountMethod' effect='solid'>
        <span>Determines how interest accrues over time</span>
      </ReactTooltip>
      <div data-tip data-for='recurringPayment' className='init_data'>
        Recurring payment &nbsp;
        <input value={props.values.recurringPayment} onChange={x => props.callback(x, 5)} type='text' className='amount_input' maxLength='10' />
      </div>
      <ReactTooltip id='recurringPayment' effect='solid'>
        <span>The amount of recurring payment</span>
      </ReactTooltip>
      <div data-tip data-for='paymentMethod' className='init_data'>
        Payment method &nbsp;
        <select value={props.values.paymentMethod} onChange={x => props.callback(x, 6)}>
          <option value='equal_installment'>Equal Installment</option>
          <option value='equal_reduction'>Equal Reduction</option>
        </select>
      </div>
      <ReactTooltip id='paymentMethod' effect='solid'>
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
        />
      </div>
      <ReactTooltip id='firstPaymentDate' effect='solid'>
        <span>First recurring payment date</span>
      </ReactTooltip>
      <div data-tip data-for='recurringPaymentDay' className='init_data'>
        Recurring payment day &nbsp;
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

export function Summary (props) {
  var klass = ''

  if (!props.values.hasOwnProperty('sum_of_interests') || props.visible === false) {
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

export function Table (props) {
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

export function ErrorMsg (props) {
  var splitted

  if (props.value) {
    splitted = props.value.split(':')
  } else {
    return null
  }

  return (
    <div id='error_container'>
      {'Fix input: ' + props.value}
    </div>
  )
}

export function Buttons (props) {
  return (
    <div id='buttons_container'>
      <button onClick={() => props.callback(1)} type='button'>Add event</button>
      <button data-tip data-for='importBasic' onClick={() => props.callback(2)} type='button'>Import basic</button>
      <ReactTooltip id='importBasic' effect='solid'>
        <span>Import basic example</span>
      </ReactTooltip>
      <button data-tip data-for='importAdvanced' onClick={() => props.callback(3)} type='button'>Import advanced</button>
      <ReactTooltip id='importAdvanced' effect='solid'>
        <span>Import advanced example</span>
      </ReactTooltip>
      <label>
        <div className='init_data'>
          Show summary
          <input type='checkbox' checked={props.checked} onChange={() => props.callback(6)} />
        </div>
      </label>
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
    return (
      <div ref={this.eventRef} className='event_container'>
        <div className='event_data'>
          Event Date
          <DatePicker
            selected={this.props.values.date}
            onChange={x => this.props.callback(x, this.props.values.id, 0)}
            placeholderText="dd.mm.yyyy"
            dateFormat="dd.MM.yyyy"
            disabledKeyboardNavigation={true}
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
          />
        </div>
        <div className='event_data'>
          New interest rate
          <input type='text' value={this.props.values.rate} onChange={x => this.props.callback(x, this.props.values.id, 1)} className='amount_input_narrow' maxLength='5' />
        </div>
        <div className='event_data'>
          New recurring amount
          <input type='text' value={this.props.values.recurring_amount} onChange={x => this.props.callback(x, this.props.values.id, 2)} className='amount_input' maxLength='10' />
        </div>
        <div className='event_data'>
          Single installment
          <input type='text' value={this.props.values.pay_installment} onChange={x => this.props.callback(x, this.props.values.id, 3)} className='amount_input' maxLength='10' />
        </div>
        <div className='event_data'>
          Single reduction
          <input type='text' value={this.props.values.pay_reduction} onChange={x => this.props.callback(x, this.props.values.id, 4)} className='amount_input' maxLength='10' />
        </div>
        <div className='event_data'>
          <img src={delButton} alt='Remove' height='25' width='25' onClick={x => this.props.callback(x, this.props.values.id, 5)} onMouseEnter={this.highLightEvent} onMouseLeave={this.unhighLightEvent} />
        </div>
      </div>
    )
  }
}

export function Events (props) {
  return (
    <div>
      {props.values.map( (value) => {
        return <CalcEvent values={value} callback={props.callback} key={value.id} />
        })
      }
    </div>
  )
}

export class RemoveButton extends Component {
  constructor (props) {
    super(props)
  }

  render() {
    console.log("rendering id: " + this.props.id)

    if(this.props.visible !== true) {
      return null
    }

    return (
      <>
      <img data-tip data-for='removeButton' src={delButton} id="app_remove_button" alt='Remove' height='35' width='35' onClick={x => this.props.callback(x, this.props.id)} onMouseEnter={x => this.props.highlightCallback(x,true)} onMouseLeave={x => this.props.highlightCallback(x,false)} />
      <ReactTooltip id='removeButton' effect='solid'>
        <span>Remove this side calculator</span>
      </ReactTooltip>
      </>
    )
  }
}

export function get_new_id () {
  var id = window.g_event_id_counter++
  console.log("new id: " + id)
  return String(id)
}
