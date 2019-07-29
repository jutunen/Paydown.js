
import { SET_START_DATE, SET_END_DATE, SET_RATE, SET_PRINCIPAL, SET_PAYMENT_METHOD, SET_DAY_COUNT_METHOD, SET_RECURRING_PAYMENT, SET_RECURRING_PAYMENT_DAY, SET_FIRST_RECURRING_PAYMENT_DATE, CLEAR_ALL, ADD_EVENT, DELETE_EVENT, SET_EVENT_DATE, SET_EVENT_RATE, SET_EVENT_REDUCTION, SET_EVENT_INSTALLMENT, SET_EVENT_PAYMENT_METHOD, SET_EVENT_RECURRING_AMOUNT, IMPORT_EXAMPLE_1, IMPORT_EXAMPLE_2, IMPORT_EXAMPLE_3, IMPORT_EXAMPLE_4, TOGGLE_EVENT_INCLUDE, IMPORT_FROM_FILE, SET_TABLE_TITLE, TOGGLE_SUMMARY, TOGGLE_RAWIO, SORT_EVENTS_BY_DATE, SET_INIT_FEE, SET_EVENT_RECURRING_PAYMENT_FEE, SET_EVENT_SINGLE_PAYMENT_FEE, SET_INIT_RECURRING_PAYMENT_FEE, SET_RECURRING_PAYMENT_PERIOD } from './actions.js';
import { funcImportBasic, funcImportAdvanced, funcImportNoRecurringPayments, funcImportInterestsOnlyPayments } from './AppExamples.js'
import { get_new_id  } from './AppComponents.js'
import * as cloneDeep from 'lodash.clonedeep';

export const initState = {
  startDate: null,
  endDate: null,
  principal: '',
  rate: '',
  dayCountMethod: 'act/360',
  recurringPayment: '',
  paymentMethod: 'equal_installment',
  firstPaymentDate: null,
  recurringPaymentDay: 1,
  initFee: '',
  recurringPaymentFee: '',
  recurringPaymentPeriod: 1,
  events: [],
  tableTitle: '',
  showSummary: false,
  showRawIO: false
}

export function reducer(state = initState, action) {

  var events_clone, index

  function event_array_sorter (a, b) {
    if (a.date > b.date) { return 1 }
    if (a.date < b.date) { return -1 }
    return 0
  }

  function func_filter(event) {
    if(event.id === action.id)
      {
      return false;
      }
    return true;
  }

  switch(action.type) {

    case ADD_EVENT:
      return Object.assign({}, state, {
          events: [
            ...state.events,
            {
              id: action.id,
              date: null,
              rate: '',
              recurring_amount: '',
              pay_installment: '',
              pay_reduction: '',
              payment_method: '',
              single_payment_fee: '',
              recurring_payment_fee: '',
              included: true
            }
          ]
        })

    case DELETE_EVENT:
      return Object.assign( {}, state, { events: state.events.filter(func_filter) } )

    case SET_EVENT_DATE:
      events_clone = cloneDeep(state.events)
      index = events_clone.findIndex(x => x.id === action.id)
      events_clone[index].date = action.value
      return Object.assign({}, state, { events: events_clone } )

    case SET_EVENT_RATE:
      events_clone = cloneDeep(state.events)
      index = events_clone.findIndex(x => x.id === action.id)
      events_clone[index].rate = action.value
      return Object.assign({}, state, { events: events_clone } )

    case SET_EVENT_RECURRING_AMOUNT:
      events_clone = cloneDeep(state.events)
      index = events_clone.findIndex(x => x.id === action.id)
      events_clone[index].recurring_amount = action.value
      return Object.assign({}, state, { events: events_clone } )

    case SET_EVENT_REDUCTION:
      events_clone = cloneDeep(state.events)
      index = events_clone.findIndex(x => x.id === action.id)
      events_clone[index].pay_reduction = action.value
      return Object.assign({}, state, { events: events_clone } )

    case SET_EVENT_INSTALLMENT:
      events_clone = cloneDeep(state.events)
      index = events_clone.findIndex(x => x.id === action.id)
      events_clone[index].pay_installment = action.value
      return Object.assign({}, state, { events: events_clone } )

    case SET_EVENT_PAYMENT_METHOD:
      events_clone = cloneDeep(state.events)
      index = events_clone.findIndex(x => x.id === action.id)
      events_clone[index].payment_method = action.value
      return Object.assign({}, state, { events: events_clone } )

    case TOGGLE_EVENT_INCLUDE:
      events_clone = cloneDeep(state.events)
      index = events_clone.findIndex(x => x.id === action.id)
      events_clone[index].included = !events_clone[index].included
      return Object.assign({}, state, { events: events_clone } )

    case SET_EVENT_RECURRING_PAYMENT_FEE:
      events_clone = cloneDeep(state.events)
      index = events_clone.findIndex(x => x.id === action.id)
      events_clone[index].recurring_payment_fee = action.value
      return Object.assign({}, state, { events: events_clone } )

    case SET_EVENT_SINGLE_PAYMENT_FEE:
      events_clone = cloneDeep(state.events)
      index = events_clone.findIndex(x => x.id === action.id)
      events_clone[index].single_payment_fee = action.value
      return Object.assign({}, state, { events: events_clone } )

    case SET_START_DATE:
      return Object.assign({}, state, { startDate: action.value })

    case SET_END_DATE:
      return Object.assign({}, state, { endDate: action.value })

    case SET_PRINCIPAL:
      return Object.assign({}, state, { principal: action.value })

    case SET_RATE:
      return Object.assign({}, state, { rate: action.value })

    case SET_DAY_COUNT_METHOD:
      return Object.assign({}, state, { dayCountMethod: action.value })

    case SET_RECURRING_PAYMENT:
      return Object.assign({}, state, { recurringPayment: action.value })

    case SET_PAYMENT_METHOD:
      return Object.assign({}, state, { paymentMethod: action.value })

    case SET_FIRST_RECURRING_PAYMENT_DATE:
      return Object.assign({}, state, { firstPaymentDate: action.value })

    case SET_RECURRING_PAYMENT_DAY:
      return Object.assign({}, state, { recurringPaymentDay: action.value })

    case SET_RECURRING_PAYMENT_PERIOD:
      return Object.assign({}, state, { recurringPaymentPeriod: action.value })

    case SET_INIT_RECURRING_PAYMENT_FEE:
      return Object.assign({}, state, { recurringPaymentFee: action.value })

    case SET_INIT_FEE:
      return Object.assign({}, state, { initFee: action.value })

    case CLEAR_ALL:
      return Object.assign({}, initState)

    case IMPORT_EXAMPLE_1:
      return Object.assign( {}, funcImportBasic() )

    case IMPORT_EXAMPLE_2:
      return Object.assign( {}, funcImportAdvanced(get_new_id) )

    case IMPORT_EXAMPLE_3:
      return Object.assign( {}, funcImportNoRecurringPayments(get_new_id) )

    case IMPORT_EXAMPLE_4:
      return Object.assign( {}, funcImportInterestsOnlyPayments(get_new_id) )

    case IMPORT_FROM_FILE:
      return Object.assign( {}, action.value )

    case SET_TABLE_TITLE:
      return Object.assign( {}, state, { tableTitle: action.value })

    case TOGGLE_SUMMARY:
      return Object.assign( {}, state, { showSummary: !state.showSummary } )

    case TOGGLE_RAWIO:
      return Object.assign( {}, state, { showRawIO: !state.showRawIO } )

    case SORT_EVENTS_BY_DATE:
      events_clone = cloneDeep(state.events)
      events_clone.sort(event_array_sorter)
      return Object.assign({}, state, { events: events_clone } )

    default:
      return state;
  }
}
