'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var g_event_id_counter;

function get_new_id() {
  return String(g_event_id_counter++);
}

function Form(props) {
  return React.createElement(
    'div',
    { className: 'init_data_container' },
    React.createElement(
      'div',
      { 'data-tip': true, 'data-for': 'startDate', className: 'init_data' },
      'Start date',
      React.createElement('input', { value: props.values.startDate, onChange: function onChange(x) {
          return props.callback(x, 0);
        }, type: 'text', className: 'date_input', maxLength: '10', placeholder: 'dd.mm.yyyy' })
    ),
    React.createElement(
      ReactTooltip,
      { id: 'startDate', effect: 'solid' },
      React.createElement(
        'span',
        null,
        'Calculation start date'
      )
    ),
    React.createElement(
      'div',
      { 'data-tip': true, 'data-for': 'endDate', className: 'init_data' },
      'End date',
      React.createElement('input', { value: props.values.endDate, onChange: function onChange(x) {
          return props.callback(x, 1);
        }, type: 'text', className: 'date_input', maxLength: '10', placeholder: 'dd.mm.yyyy' })
    ),
    React.createElement(
      ReactTooltip,
      { id: 'endDate', effect: 'solid' },
      React.createElement(
        'span',
        null,
        'Calculation end date'
      )
    ),
    React.createElement(
      'div',
      { 'data-tip': true, 'data-for': 'principal', className: 'init_data' },
      'Principal',
      React.createElement('input', { value: props.values.principal, onChange: function onChange(x) {
          return props.callback(x, 2);
        }, type: 'text', className: 'amount_input_wide', maxLength: '10' })
    ),
    React.createElement(
      ReactTooltip,
      { id: 'principal', effect: 'solid' },
      React.createElement(
        'span',
        null,
        'Principal amount at the start date'
      )
    ),
    React.createElement(
      'div',
      { 'data-tip': true, 'data-for': 'rate', className: 'init_data' },
      'Rate',
      React.createElement('input', { value: props.values.rate, onChange: function onChange(x) {
          return props.callback(x, 3);
        }, type: 'text', className: 'amount_input_narrow', maxLength: '5' }),
      ' %'
    ),
    React.createElement(
      ReactTooltip,
      { id: 'rate', effect: 'solid' },
      React.createElement(
        'span',
        null,
        'Interest rate at the start date'
      )
    ),
    React.createElement(
      'div',
      { 'data-tip': true, 'data-for': 'dayCountMethod', className: 'init_data' },
      'Day count method',
      React.createElement(
        'select',
        { value: props.values.dayCountMethod, onChange: function onChange(x) {
            return props.callback(x, 4);
          } },
        React.createElement(
          'option',
          { value: 'act/360' },
          'Act/360'
        ),
        React.createElement(
          'option',
          { value: 'act/365' },
          'Act/365'
        )
      )
    ),
    React.createElement(
      ReactTooltip,
      { id: 'dayCountMethod', effect: 'solid' },
      React.createElement(
        'span',
        null,
        'Determines how interest accrues over time'
      )
    ),
    React.createElement(
      'div',
      { 'data-tip': true, 'data-for': 'recurringPayment', className: 'init_data' },
      'Recurring payment',
      React.createElement('input', { value: props.values.recurringPayment, onChange: function onChange(x) {
          return props.callback(x, 5);
        }, type: 'text', className: 'amount_input', maxLength: '10' })
    ),
    React.createElement(
      ReactTooltip,
      { id: 'recurringPayment', effect: 'solid' },
      React.createElement(
        'span',
        null,
        'The amount of recurring payment'
      )
    ),
    React.createElement(
      'div',
      { 'data-tip': true, 'data-for': 'paymentMethod', className: 'init_data' },
      'Payment method',
      React.createElement(
        'select',
        { value: props.values.paymentMethod, onChange: function onChange(x) {
            return props.callback(x, 6);
          } },
        React.createElement(
          'option',
          { value: 'equal_installment' },
          'Equal Installment'
        ),
        React.createElement(
          'option',
          { value: 'equal_reduction' },
          'Equal Reduction'
        )
      )
    ),
    React.createElement(
      ReactTooltip,
      { id: 'paymentMethod', effect: 'solid' },
      React.createElement(
        'span',
        null,
        'Payment method for recurring payments'
      )
    ),
    React.createElement(
      'div',
      { 'data-tip': true, 'data-for': 'firstPaymentDate', className: 'init_data' },
      '1st recurring payment date',
      React.createElement('input', { value: props.values.firstPaymentDate, onChange: function onChange(x) {
          return props.callback(x, 7);
        }, type: 'text', className: 'date_input', maxLength: '10', placeholder: 'dd.mm.yyyy' })
    ),
    React.createElement(
      ReactTooltip,
      { id: 'firstPaymentDate', effect: 'solid' },
      React.createElement(
        'span',
        null,
        'First recurring payment date'
      )
    ),
    React.createElement(
      'div',
      { 'data-tip': true, 'data-for': 'recurringPaymentDay', className: 'init_data' },
      'Recurring payment day',
      React.createElement(
        'select',
        { value: props.values.recurringPaymentDay, onChange: function onChange(x) {
            return props.callback(x, 8);
          } },
        React.createElement(
          'option',
          { value: '1' },
          '1.'
        ),
        React.createElement(
          'option',
          { value: '2' },
          '2.'
        ),
        React.createElement(
          'option',
          { value: '3' },
          '3.'
        ),
        React.createElement(
          'option',
          { value: '4' },
          '4.'
        ),
        React.createElement(
          'option',
          { value: '5' },
          '5.'
        ),
        React.createElement(
          'option',
          { value: '6' },
          '6.'
        ),
        React.createElement(
          'option',
          { value: '7' },
          '7.'
        ),
        React.createElement(
          'option',
          { value: '8' },
          '8.'
        ),
        React.createElement(
          'option',
          { value: '9' },
          '9.'
        ),
        React.createElement(
          'option',
          { value: '10' },
          '10.'
        ),
        React.createElement(
          'option',
          { value: '11' },
          '11.'
        ),
        React.createElement(
          'option',
          { value: '12' },
          '12.'
        ),
        React.createElement(
          'option',
          { value: '13' },
          '13.'
        ),
        React.createElement(
          'option',
          { value: '14' },
          '14.'
        ),
        React.createElement(
          'option',
          { value: '15' },
          '15.'
        ),
        React.createElement(
          'option',
          { value: '16' },
          '16.'
        ),
        React.createElement(
          'option',
          { value: '17' },
          '17.'
        ),
        React.createElement(
          'option',
          { value: '18' },
          '18.'
        ),
        React.createElement(
          'option',
          { value: '19' },
          '19.'
        ),
        React.createElement(
          'option',
          { value: '20' },
          '20.'
        ),
        React.createElement(
          'option',
          { value: '21' },
          '21.'
        ),
        React.createElement(
          'option',
          { value: '22' },
          '22.'
        ),
        React.createElement(
          'option',
          { value: '23' },
          '23.'
        ),
        React.createElement(
          'option',
          { value: '24' },
          '24.'
        ),
        React.createElement(
          'option',
          { value: '25' },
          '25.'
        ),
        React.createElement(
          'option',
          { value: '26' },
          '26.'
        ),
        React.createElement(
          'option',
          { value: '27' },
          '27.'
        ),
        React.createElement(
          'option',
          { value: '28' },
          '28.'
        ),
        React.createElement(
          'option',
          { value: '29' },
          '29.'
        ),
        React.createElement(
          'option',
          { value: '30' },
          '30.'
        ),
        React.createElement(
          'option',
          { value: '31' },
          'last'
        )
      )
    ),
    React.createElement(
      ReactTooltip,
      { id: 'recurringPaymentDay', effect: 'solid' },
      React.createElement(
        'span',
        null,
        'Monthly payment day of the recurring payment'
      )
    )
  );
}

function Summary(props) {
  var klass = '';

  if (!props.values.hasOwnProperty('sum_of_interests')) {
    return null;
  }

  if (props.error) {
    klass = 'summary_shade';
  }

  return React.createElement(
    'div',
    { id: 'output_summary_container', className: klass },
    React.createElement(
      'div',
      { className: 'output_value' },
      'Sum of interests: ',
      props.values.sum_of_interests
    ),
    React.createElement(
      'div',
      { className: 'output_value' },
      'Sum of reductions: ',
      props.values.sum_of_reductions
    ),
    React.createElement(
      'div',
      { className: 'output_value' },
      'Sum of installments: ',
      props.values.sum_of_installments
    ),
    React.createElement(
      'div',
      { className: 'output_value' },
      'Remaining principal: ',
      props.values.remaining_principal
    ),
    React.createElement(
      'div',
      { className: 'output_value' },
      'Days calculated: ',
      props.values.days_calculated
    ),
    React.createElement(
      'div',
      { className: 'output_value' },
      'Actual end date: ',
      props.values.actual_end_date
    ),
    React.createElement(
      'div',
      { className: 'output_value' },
      'Latest payment date: ',
      props.values.latest_payment_date
    ),
    React.createElement(
      'div',
      { className: 'output_value' },
      'Unpaid interest: ',
      props.values.unpaid_interest
    )
  );
}

function TableRow(props) {
  return React.createElement(
    'tr',
    { key: get_new_id() },
    React.createElement(
      'td',
      null,
      props[0]
    ),
    React.createElement(
      'td',
      null,
      props[1]
    ),
    React.createElement(
      'td',
      null,
      props[2]
    ),
    React.createElement(
      'td',
      null,
      props[3]
    ),
    React.createElement(
      'td',
      null,
      props[4]
    ),
    React.createElement(
      'td',
      null,
      props[5]
    )
  );
}

function Table(props) {
  var klass = '';

  if (props.error) {
    klass = 'table_shade';
  }

  if (props.values.length === 0) {
    return null;
  }

  return React.createElement(
    'table',
    { className: klass },
    React.createElement(
      'tr',
      { className: 'bold_class' },
      React.createElement(
        'td',
        null,
        'Date'
      ),
      React.createElement(
        'td',
        null,
        'Rate'
      ),
      React.createElement(
        'td',
        null,
        'Installment'
      ),
      React.createElement(
        'td',
        null,
        'Reduction'
      ),
      React.createElement(
        'td',
        null,
        'Interest'
      ),
      React.createElement(
        'td',
        null,
        'Principal'
      )
    ),
    props.values.map(TableRow),
    React.createElement(
      'tr',
      { className: 'bold_class' },
      React.createElement(
        'td',
        null,
        'Total'
      ),
      React.createElement(
        'td',
        null,
        '-'
      ),
      React.createElement(
        'td',
        null,
        props.sums.sum_of_installments
      ),
      React.createElement(
        'td',
        null,
        props.sums.sum_of_reductions
      ),
      React.createElement(
        'td',
        null,
        props.sums.sum_of_interests
      ),
      React.createElement(
        'td',
        null,
        '-'
      )
    )
  );
}

function Error(props) {
  var splitted;

  if (props.value) {
    splitted = props.value.split(':');
  } else {
    return null;
  }

  return React.createElement(
    'div',
    { id: 'error_container' },
    'Fix input: ' + splitted[1]
  );
}

function Buttons(props) {
  return React.createElement(
    'div',
    { id: 'buttons_container' },
    React.createElement(
      'button',
      { onClick: function onClick() {
          return props.callback(1);
        }, type: 'button' },
      'Add event'
    ),
    React.createElement(
      'button',
      { onClick: function onClick() {
          return props.callback(2);
        }, type: 'button' },
      'Import basic'
    ),
    React.createElement(
      'button',
      { onClick: function onClick() {
          return props.callback(3);
        }, type: 'button' },
      'Import advanced'
    ),
    React.createElement(
      'button',
      { onClick: function onClick() {
          return props.callback(4);
        }, type: 'button' },
      'Clear all'
    )
  );
}

function Event(props, callback) {
  return React.createElement(
    'div',
    { className: 'event_container', key: props.id },
    React.createElement(
      'div',
      { className: 'event_data' },
      'Event Date',
      React.createElement('input', { type: 'text', value: props.date, onChange: function onChange(x) {
          return callback(x, props.id, 0);
        }, className: 'date_input', maxLength: '10', placeholder: 'dd.mm.yyyy' })
    ),
    React.createElement(
      'div',
      { className: 'event_data' },
      'New interest rate',
      React.createElement('input', { type: 'text', value: props.rate, onChange: function onChange(x) {
          return callback(x, props.id, 1);
        }, className: 'amount_input_narrow', maxLength: '5' })
    ),
    React.createElement(
      'div',
      { className: 'event_data' },
      'New recurring amount',
      React.createElement('input', { type: 'text', value: props.recurring_amount, onChange: function onChange(x) {
          return callback(x, props.id, 2);
        }, className: 'amount_input', maxLength: '10' })
    ),
    React.createElement(
      'div',
      { className: 'event_data' },
      'Single installment',
      React.createElement('input', { type: 'text', value: props.pay_installment, onChange: function onChange(x) {
          return callback(x, props.id, 3);
        }, className: 'amount_input', maxLength: '10' })
    ),
    React.createElement(
      'div',
      { className: 'event_data' },
      'Single reduction',
      React.createElement('input', { type: 'text', value: props.pay_reduction, onChange: function onChange(x) {
          return callback(x, props.id, 4);
        }, className: 'amount_input', maxLength: '10' })
    ),
    React.createElement(
      'div',
      { className: 'event_data' },
      React.createElement('img', { src: 'delete-button.png', alt: 'Remove', height: '25', width: '25', onClick: function onClick(x) {
          return callback(x, props.id, 5);
        } })
    )
  );
}

function Events(props) {
  return React.createElement(
    'div',
    null,
    props.values.map(function (x) {
      return Event(x, props.callback);
    })
  );
}

var Container = function (_React$Component) {
  _inherits(Container, _React$Component);

  function Container(props) {
    _classCallCheck(this, Container);

    var _this = _possibleConstructorReturn(this, (Container.__proto__ || Object.getPrototypeOf(Container)).call(this, props));

    _this.state = {
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
    };

    _this.handleInput = _this.handleInput.bind(_this);
    _this.handleEvents = _this.handleEvents.bind(_this);
    _this.handleButtons = _this.handleButtons.bind(_this);
    return _this;
  }

  _createClass(Container, [{
    key: 'addEvent',
    value: function addEvent(obj_ref) {
      var event;
      if (obj_ref) {
        event = {
          date: obj_ref.date,
          rate: obj_ref.rate,
          recurring_amount: obj_ref.recurring_amount,
          pay_installment: obj_ref.pay_installment,
          pay_reduction: obj_ref.pay_reduction,
          id: get_new_id()
        };
      } else {
        event = {
          date: '',
          rate: '',
          recurring_amount: '',
          pay_installment: '',
          pay_reduction: '',
          id: get_new_id()
        };
      }
      var events = [].concat(_toConsumableArray(this.state.events));
      events.push(event);
      this.setState({ events: events });
    }
  }, {
    key: 'addEvents',
    value: function addEvents(array_ref) {
      var event, i;
      var events = [].concat(_toConsumableArray(this.state.events));

      for (i = 0; i < array_ref.length; i++) {
        event = {};
        event.date = array_ref[i].date;
        event.rate = array_ref[i].rate;
        event.recurring_amount = array_ref[i].recurring_amount;
        event.pay_installment = array_ref[i].pay_installment;
        event.pay_reduction = array_ref[i].pay_reduction;
        event.id = get_new_id();
        events.push(event);
      }
      this.setState({ events: events });
    }
  }, {
    key: 'handleEvents',
    value: function handleEvents(synthEvent, event_id, field_id) {
      var events_clone = [].concat(_toConsumableArray(this.state.events));
      var index = events_clone.findIndex(function (x) {
        return findEventById(x, event_id);
      });

      if (field_id === 0) {
        // date
        events_clone[index].date = synthEvent.target.value;
      } else if (field_id === 1) {
        // rate
        events_clone[index].rate = synthEvent.target.value;
      } else if (field_id === 2) {
        // amount
        events_clone[index].recurring_amount = synthEvent.target.value;
      } else if (field_id === 3) {
        // installment
        events_clone[index].pay_installment = synthEvent.target.value;
      } else if (field_id === 4) {
        // reduction
        events_clone[index].pay_reduction = synthEvent.target.value;
      } else if (field_id === 5) {
        // remove event
        events_clone.splice(index, 1);
      }
      this.setState({ events: events_clone }, this.calculateInput);
    }
  }, {
    key: 'handleButtons',
    value: function handleButtons(param) {
      if (param === 1) {
        this.addEvent();
      } else if (param === 2) {
        this.clearAll(this.importBasic);
      } else if (param === 3) {
        this.clearAll(this.importAdvanced);
      } else if (param === 4) {
        this.clearAll();
      }
    }
  }, {
    key: 'clearAll',
    value: function clearAll(func) {
      this.setState({ startDate: '' });
      this.setState({ endDate: '' });
      this.setState({ principal: '' });
      this.setState({ rate: '' });
      this.setState({ recurringPayment: '' });
      this.setState({ firstPaymentDate: '' });
      this.setState({ events: [] });
      this.setError('');
      this.clearOutput(func);
    }
  }, {
    key: 'importBasic',
    value: function importBasic() {
      this.setState({ startDate: '1.1.2019' });
      this.setState({ endDate: '30.6.2019' });
      this.setState({ principal: '100000' });
      this.setState({ rate: '3.5' });
      this.setState({ dayCountMethod: 'act/360' });
      this.setState({ recurringPayment: '1000' });
      this.setState({ paymentMethod: 'equal_installment' });
      this.setState({ firstPaymentDate: '31.1.2019' });
      this.setState({ recurringPaymentDay: '31' }, this.calculateInput);
    }
  }, {
    key: 'importAdvanced',
    value: function importAdvanced() {
      this.setState({ startDate: '1.1.2019' });
      this.setState({ endDate: '30.6.2019' });
      this.setState({ principal: '100000' });
      this.setState({ rate: '3.5' });
      this.setState({ dayCountMethod: 'act/365' });
      this.setState({ recurringPayment: '1000' });
      this.setState({ paymentMethod: 'equal_reduction' });
      this.setState({ firstPaymentDate: '31.1.2019' });
      this.setState({ recurringPaymentDay: '31' }, this.calculateInput);

      var obj = {};
      obj.date = '15.3.2019';
      obj.rate = 5;
      obj.recurring_amount = 1500;
      obj.pay_installment = '';
      obj.pay_reduction = '';

      var obj_2 = {};
      obj_2.date = '15.5.2019';
      obj_2.rate = '';
      obj_2.recurring_amount = '';
      obj_2.pay_installment = '';
      obj_2.pay_reduction = 4000;

      var obj_array = [];
      obj_array.push(obj);
      obj_array.push(obj_2);
      this.addEvents(obj_array);
    }
  }, {
    key: 'handleInput',
    value: function handleInput(event, id) {
      if (id === 0) {
        this.setState({ startDate: event.target.value }, this.calculateInput);
      } else if (id === 1) {
        this.setState({ endDate: event.target.value }, this.calculateInput);
      } else if (id === 2) {
        this.setState({ principal: event.target.value }, this.calculateInput);
      } else if (id === 3) {
        this.setState({ rate: event.target.value }, this.calculateInput);
      } else if (id === 4) {
        this.setState({ dayCountMethod: event.target.value }, this.calculateInput);
      } else if (id === 5) {
        this.setState({ recurringPayment: event.target.value }, this.calculateInput);
      } else if (id === 6) {
        this.setState({ paymentMethod: event.target.value }, this.calculateInput);
      } else if (id === 7) {
        this.setState({ firstPaymentDate: event.target.value }, this.calculateInput);
      } else if (id === 8) {
        this.setState({ recurringPaymentDay: event.target.value }, this.calculateInput);
      }
    }
  }, {
    key: 'copyEvents',
    value: function copyEvents(array_ref) {
      var i = 0;
      var obj = {};
      for (i = 0; i < this.state.events.length; i++) {
        if (this.state.events[i].date) {
          obj.date = this.state.events[i].date;
        }
        if (is_numeric(this.state.events[i].rate)) {
          obj.rate = Number(this.state.events[i].rate);
        }
        if (this.state.events[i].recurring_amount) {
          obj.recurring_amount = Number(this.state.events[i].recurring_amount);
        }
        if (this.state.events[i].pay_installment) {
          obj.pay_installment = Number(this.state.events[i].pay_installment);
        }
        if (this.state.events[i].pay_reduction) {
          obj.pay_reduction = Number(this.state.events[i].pay_reduction);
        }
        array_ref.push(Object.assign({}, obj));
        obj = {};
      }
    }
  }, {
    key: 'calculateInput',
    value: function calculateInput() {
      var input_data = {};
      input_data.recurring = {};
      input_data.start_date = this.state.startDate;
      input_data.end_date = this.state.endDate;
      input_data.principal = Number(this.state.principal);
      input_data.rate = Number(this.state.rate);
      input_data.day_count_method = this.state.dayCountMethod;
      input_data.recurring.amount = Number(this.state.recurringPayment);
      input_data.recurring.payment_method = this.state.paymentMethod;
      input_data.recurring.first_payment_date = this.state.firstPaymentDate;
      input_data.recurring.payment_day = this.state.recurringPaymentDay;

      var paydown = new Paydown();

      var payments_array = [];
      var events_array = [];
      var rval_obj;

      this.copyEvents(events_array);

      try {
        rval_obj = paydown.calculate(input_data, events_array, payments_array);
      } catch (err) {
        this.setError(err);
        return;
      }
      this.setError('');
      this.setArrayValues(payments_array);
      this.setObjectValues(rval_obj);
    }
  }, {
    key: 'setError',
    value: function setError(str) {
      this.setState({ error: str });
    }
  }, {
    key: 'setArrayValues',
    value: function setArrayValues(array_ref) {
      var clonedArray = [].concat(_toConsumableArray(array_ref));
      this.setState({
        values: clonedArray
      });
    }
  }, {
    key: 'setObjectValues',
    value: function setObjectValues(obj_ref) {
      this.setState({
        summary: Object.assign({}, obj_ref)
      });
    }
  }, {
    key: 'clearOutput',
    value: function clearOutput(func) {
      if (func) {
        this.setState({ values: [], summary: {} }, func);
      } else {
        this.setState({ values: [], summary: {} });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(Form, { callback: this.handleInput, values: this.state }),
        React.createElement(Buttons, { callback: this.handleButtons }),
        React.createElement(Events, { values: this.state.events, callback: this.handleEvents }),
        React.createElement(Error, { value: this.state.error }),
        React.createElement(Summary, { values: this.state.summary, error: this.state.error }),
        React.createElement(Table, { values: this.state.values, error: this.state.error, sums: this.state.summary })
      );
    }
  }]);

  return Container;
}(React.Component);

function func_init() {
  g_event_id_counter = 0;
  ReactDOM.render(React.createElement(Container, null), document.getElementById('react_container'));
}

function is_numeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function findEventById(x, event_id) {
  if (x.id == event_id) {
    return true;
  }
  return false;
}

