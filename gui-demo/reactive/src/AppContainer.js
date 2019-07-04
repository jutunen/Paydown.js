import React, { Component } from 'react';
import './App.css';
import * as cloneDeep from 'lodash.clonedeep';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducer, initState } from './reducer.js'
import { TOGGLE_SUMMARY, TOGGLE_RAWIO, TOGGLE_EVENT_INCLUDE } from './actions.js'
import undoable, { excludeAction } from 'redux-undo';
import App from './App.js'

function Apps (props) {
  return (
    <>
      {props.ids.map( (value) => {
        return <ReduxApp key={value} id={value} removable={props.ids.length > 1 ? true : false} removerCb={props.removerCb} stateGetterCb={props.stateGetterCb} initState={props.initState} />
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
    this.copyOfState = cloneDeep(initState)
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
    delete this.copyOfState.initState // otherwise this grows and grows
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

class ReduxApp extends Component {
  constructor(props) {
    super(props)
    this.undoableReducer = undoable(reducer, { limit: 100, filter: excludeAction([TOGGLE_SUMMARY, TOGGLE_RAWIO, TOGGLE_EVENT_INCLUDE]) })
    this.store = createStore(this.undoableReducer, this.props.initState);
  }

  render() {
    return (
      <Provider store={this.store}>
        <App id={this.props.id} removable={this.props.removable} removerCb={this.props.removerCb} stateGetterCb={this.props.stateGetterCb} store={this.store} />
      </Provider>
    )
  }
}

export default AppContainer;
