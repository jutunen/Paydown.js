export const SET_START_DATE = 'SET_START_DATE'
export const SET_END_DATE = 'SET_END_DATE'
export const SET_PRINCIPAL = 'SET_PRINCIPAL'
export const SET_RATE = 'SET_RATE'
export const SET_DAY_COUNT_METHOD = 'SET_DAY_COUNT_METHOD'
export const SET_RECURRING_PAYMENT = 'SET_RECURRING_PAYMENT'
export const SET_PAYMENT_METHOD = 'SET_PAYMENT_METHOD'
export const SET_FIRST_RECURRING_PAYMENT_DATE = 'SET_FIRST_RECURRING_PAYMENT_DATE'
export const SET_RECURRING_PAYMENT_DAY = 'SET_RECURRING_PAYMENT_DAY'
export const ADD_EVENT = 'ADD_EVENT'
export const DELETE_EVENT = 'DELETE_EVENT'
export const SET_EVENT_DATE = 'SET_EVENT_DATE'
export const SET_EVENT_RATE = 'SET_EVENT_RATE'
export const SET_EVENT_RECURRING_AMOUNT = 'SET_EVENT_RECURRING_AMOUNT'
export const SET_EVENT_INSTALLMENT = 'SET_EVENT_INSTALLMENT'
export const SET_EVENT_REDUCTION = 'SET_EVENT_REDUCTION'
export const SET_EVENT_PAYMENT_METHOD = 'SET_EVENT_PAYMENT_METHOD'
export const TOGGLE_EVENT_INCLUDE = 'TOGGLE_EVENT_INCLUDE'
export const CLEAR_ALL = 'CLEAR_ALL'
export const IMPORT_EXAMPLE_1 = 'IMPORT_EXAMPLE_1'
export const IMPORT_EXAMPLE_2 = 'IMPORT_EXAMPLE_2'
export const IMPORT_EXAMPLE_3 = 'IMPORT_EXAMPLE_3'
export const IMPORT_EXAMPLE_4 = 'IMPORT_EXAMPLE_4'
export const IMPORT_FROM_FILE = 'IMPORT_FROM_FILE'
export const SET_TABLE_TITLE = 'SET_TABLE_TITLE'
export const TOGGLE_SUMMARY = 'TOGGLE_SUMMARY'
export const TOGGLE_RAWIO = 'TOGGLE_RAWIO'
export const SORT_EVENTS_BY_DATE = 'SORT_EVENTS_BY_DATE'

export function setStartDate(value) {
  return { type: SET_START_DATE, value }
}

export function setEndDate(value) {
  return { type: SET_END_DATE, value }
}

export function setPrincipal(value) {
  return { type: SET_PRINCIPAL, value }
}

export function setRate(value) {
  return { type: SET_RATE, value }
}

export function setDayCountMethod(value) {
  return { type: SET_DAY_COUNT_METHOD, value }
}

export function setRecurringPayment(value) {
  return { type: SET_RECURRING_PAYMENT, value }
}

export function setPaymentMethod(value) {
  return { type: SET_PAYMENT_METHOD, value }
}

export function setFirstRecurringPaymentDate(value) {
  return { type: SET_FIRST_RECURRING_PAYMENT_DATE, value }
}

export function setRecurringPaymentDay(value) {
  return { type: SET_RECURRING_PAYMENT_DAY, value }
}

export function addEvent(id) {
  return { type: ADD_EVENT, id }
}

export function deleteEvent(id) {
  return { type: DELETE_EVENT, id }
}

export function setEventDate(id, value) {
  return { type: SET_EVENT_DATE, id, value}
}

export function setEventRate(id, value) {
  return { type: SET_EVENT_RATE, id, value}
}

export function setEventRecurringAmount(id, value) {
  return { type: SET_EVENT_RECURRING_AMOUNT, id, value}
}

export function setEventInstallment(id, value) {
  return { type: SET_EVENT_INSTALLMENT, id, value}
}

export function setEventReduction(id, value) {
  return { type: SET_EVENT_REDUCTION, id, value}
}

export function setEventPaymentMethod(id, value) {
  return { type: SET_EVENT_PAYMENT_METHOD, id, value}
}

export function toggleEventInclude(id) {
  return { type: TOGGLE_EVENT_INCLUDE, id }
}

export function clearAll() {
  return { type: CLEAR_ALL }
}

export function importExample1 () {
  return { type: IMPORT_EXAMPLE_1 }
}

export function importExample2 () {
  return { type: IMPORT_EXAMPLE_2 }
}

export function importExample3 () {
  return { type: IMPORT_EXAMPLE_3 }
}

export function importExample4 () {
  return { type: IMPORT_EXAMPLE_4 }
}

export function importFromFile (value) {
  return { type: IMPORT_FROM_FILE, value }
}

export function setTableTitle (value) {
  return { type: SET_TABLE_TITLE, value }
}

export function toggleSummary () {
  return { type: TOGGLE_SUMMARY }
}

export function toggleRawIO () {
  return { type: TOGGLE_RAWIO }
}

export function sortEventsByDate () {
  return { type: SORT_EVENTS_BY_DATE }
}
