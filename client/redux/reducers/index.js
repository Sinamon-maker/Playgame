import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import play from './play'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    play
  })

export default createRootReducer
