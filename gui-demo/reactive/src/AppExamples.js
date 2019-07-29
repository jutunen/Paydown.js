
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
    obj.tableTitle = 'Basic example'
    obj.showSummary = false
    obj.showRawIO = false
    obj.events = []
    obj.recurringPaymentFee = 0
    obj.recurringPaymentPeriod = 1
    obj.initFee = 0
    return obj
  }

  export function funcImportAdvanced (get_new_id) {
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
    obj.tableTitle = 'Advanced example'
    obj.showSummary = false
    obj.showRawIO = false
    obj.events = []
    obj.recurringPaymentFee = 0
    obj.recurringPaymentPeriod = 1
    obj.initFee = 0

    var event = {}
    event.date = new Date(2019,2,15)
    event.rate = 5
    event.recurring_amount = 1500
    event.pay_reduction = ''
    event.pay_installment = ''
    event.payment_method = ''
    event.id = get_new_id()
    event.included = true
    event.single_payment_fee = ''
    event.recurring_payment_fee = ''

    var event_2 = {}
    event_2.date = new Date(2019,4,15)
    event_2.pay_reduction = 4000
    event_2.recurring_amount = ''
    event_2.pay_installment = ''
    event_2.payment_method = ''
    event_2.rate = ''
    event_2.id = get_new_id()
    event_2.included = true
    event_2.single_payment_fee = ''
    event_2.recurring_payment_fee = ''


    obj.events.push(event)
    obj.events.push(event_2)
    return obj
  }

export function funcImportNoRecurringPayments (get_new_id) {
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
    obj.tableTitle = 'No recurring payments example'
    obj.showSummary = false
    obj.showRawIO = false
    obj.events = []
    obj.recurringPaymentFee = 0
    obj.recurringPaymentPeriod = 1
    obj.initFee = 0

    var event = {}
    event.date = new Date(2019,5,30)
    event.pay_reduction = 5000
    event.recurring_amount = ''
    event.pay_installment = ''
    event.payment_method = ''
    event.rate = ''
    event.id = get_new_id()
    event.included = true
    event.single_payment_fee = ''
    event.recurring_payment_fee = ''

    var event_2 = {}
    event_2.date = new Date(2019,11,31)
    event_2.pay_reduction = 5000
    event_2.recurring_amount = ''
    event_2.pay_installment = ''
    event_2.payment_method = ''
    event_2.rate = ''
    event_2.id = get_new_id()
    event_2.included = true
    event_2.single_payment_fee = ''
    event_2.recurring_payment_fee = ''

    obj.events.push(event)
    obj.events.push(event_2)
    return obj
  }

export function funcImportInterestsOnlyPayments (get_new_id) {
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
    obj.tableTitle = 'Interests only payments example'
    obj.showSummary = false
    obj.showRawIO = false
    obj.events = []
    obj.recurringPaymentFee = 0
    obj.recurringPaymentPeriod = 1
    obj.initFee = 0

    var event = {}
    event.date = new Date(2019,4,31)
    event.recurring_amount = 0
    event.pay_reduction = ''
    event.pay_installment = ''
    event.payment_method = ''
    event.rate = ''
    event.id = get_new_id()
    event.included = true
    event.single_payment_fee = ''
    event.recurring_payment_fee = ''

    var event_2 = {}
    event_2.date = new Date(2019,9,31)
    event_2.recurring_amount = 1000
    event_2.pay_reduction = ''
    event_2.pay_installment = ''
    event_2.payment_method = ''
    event_2.rate = ''
    event_2.id = get_new_id()
    event_2.included = true
    event_2.single_payment_fee = ''
    event_2.recurring_payment_fee = ''

    obj.events.push(event)
    obj.events.push(event_2)
    return obj
  }
