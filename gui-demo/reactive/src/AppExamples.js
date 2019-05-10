
  export function funcImportBasic () {
    var obj = {}
    obj.startDate = new Date(2019,0,1)
    obj.endDate = new Date(2019,5,30)
    obj.principal = '100000'
    obj.rate = '3.5'
    obj.dayCountMethod ='act/360'
    obj.recurringPayment ='1000'
    obj.paymentMethod ='equal_installment'
    obj.firstPaymentDate = new Date(2019,0,31)
    obj.recurringPaymentDay = 31
    return obj
  }

  export function funcImportAdvanced () {
    var obj = {}
    obj.startDate = new Date(2019,0,1)
    obj.endDate = new Date(2019,5,30)
    obj.principal = '100000'
    obj.rate = '3.5'
    obj.dayCountMethod ='act/365'
    obj.recurringPayment ='1000'
    obj.paymentMethod ='equal_reduction'
    obj.firstPaymentDate = new Date(2019,0,31)
    obj.recurringPaymentDay = 31
    obj.events = []

    var event = {}
    event.date = new Date(2019,2,15)
    event.rate = 5
    event.recurring_amount = 1500

    var event_2 = {}
    event_2.date = new Date(2019,4,15)
    event_2.pay_reduction = 4000

    obj.events.push(event)
    obj.events.push(event_2)
    return obj
  }

export function funcImportNoRecurringPayments () {
    var obj = {}
    obj.startDate = new Date(2019,0,1)
    obj.endDate = new Date(2019,11,31)
    obj.principal = '100000'
    obj.rate = '3.5'
    obj.dayCountMethod ='act/365'
    obj.recurringPayment =''
    obj.paymentMethod ='equal_reduction'
    obj.firstPaymentDate = null
    obj.recurringPaymentDay = 31
    obj.events = []

    var event = {}
    event.date = new Date(2019,5,30)
    event.pay_reduction = 5000

    var event_2 = {}
    event_2.date = new Date(2019,11,31)
    event_2.pay_reduction = 5000

    obj.events.push(event)
    obj.events.push(event_2)
    return obj
  }

export function funcImportInterestsOnlyPayments () {
    var obj = {}
    obj.startDate = new Date(2019,0,1)
    obj.endDate = new Date(2019,11,31)
    obj.principal = '100000'
    obj.rate = '3.5'
    obj.dayCountMethod ='act/365'
    obj.recurringPayment ='1000'
    obj.paymentMethod ='equal_reduction'
    obj.firstPaymentDate = new Date(2019,0,31)
    obj.recurringPaymentDay = 31
    obj.events = []

    var event = {}
    event.date = new Date(2019,4,31)
    event.recurring_amount = 0

    var event_2 = {}
    event_2.date = new Date(2019,9,31)
    event_2.recurring_amount = 1000

    obj.events.push(event)
    obj.events.push(event_2)
    return obj
  }
