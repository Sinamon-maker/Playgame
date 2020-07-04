const SIZE_IKS = 'SIZE_IKS'
const SIZE_VERT = 'SIZE_VERT'
const SET_STATE = 'SET_STATE'
 const SET_TIME = 'SET_TIME'
const SET_CLEAR = 'SET_CLEAR'
const  SET_NULL = 'SET_NULL'
const SET_RANDOM = 'SET_RANDOM'


const initialState = {
  size: {
    iks: 5,
    vert: 5
  },
  array: new Array(25).fill(null).map((it, index) => {
    return {
      id: index + 1,
      stat: 'free'
    }
  }),
  selected: new Array(25).fill(null).map((it, index) => index+1)[Math.floor(Math.random() * 25)],
  tid: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SIZE_IKS:{
      const newArray =
        new Array([action.iks] * state.size.vert).fill(null).map((it, index) => {
          return {
            id: index + 1,
            stat: 'free'
          }
    })
      return {
        ...state,
        size: { ...state, iks: [action.iks]},
        array: newArray
      }
    }
    case SIZE_VERT:{
      const newArray =
        new Array(state.size.iks * [action.vert]).fill(null).map((it, index) => {
          return {
            id: index + 1,
            stat: 'free'
          }
        })
      return {
        ...state,
        size: { ...state, vert: action.vert },
        array: newArray
      }
    }
        case SET_STATE:
      return {
        ...state,
        array: state.array.map((it) => {
          return {
            ...it,
            stat: it.id === action.id ? action.st : it.stat
          }
        }),
        selected: action.selected,
        tid: action.timeoutID
                        }
    case SET_RANDOM:
      return {
        ...state,
        selected: action.selected,
        tid: action.timeoutID
      }
    case SET_TIME:
      return {
        ...state,
        tid: action.timeoutId
      }
        case SET_NULL:
      return {
        ...state,
        selected: action.selected
      }
          case SET_CLEAR:
      return {
        ...state,
        tid: clearTimeout(action.timeoutId)
      }
    default:
      return state
  }
}

export function setSizeone(iks){
  return { type: SIZE_IKS, iks }
}

export function setSiztwo(vert) {
  return { type: SIZE_VERT, vert }
}


export function updateState(id, st) {
  return (dispatch, getState) => {
    const { array, tid } = getState().play
    const arraymap = array.map((it) => {
      return {
        ...it,
        stat: it.id === id ? st : it.stat
      }
    })
    const userScore = arraymap.filter((it) => it.stat === 'user').length
    const computerScore = arraymap.filter((it) => it.stat === 'computer').length
    const timeoutID = clearTimeout(tid)
    let selected
    if (userScore < arraymap.length / 2 && computerScore < arraymap.length / 2) {
      const gameFieldFree = arraymap.filter((it) => it.stat === 'free')
      selected = gameFieldFree[Math.floor(Math.random() * gameFieldFree.length)].id

         }
    if (userScore >= arraymap.length / 2 && computerScore >= arraymap.length / 2) {
      selected = null
    }
    dispatch({ type: SET_STATE, id, st, selected, timeoutID })
  }
}
export function setTimeoutID(timeoutId) {
  return { type: SET_TIME, timeoutId }
}

export function clearT(timeoutId ){
  return { type: SET_CLEAR, timeoutId }
}

export function setSelectednull() {
  return (dispatch, getState) => {
    let { selected} = getState().play
    selected = null
    dispatch ({ type: SET_NULL, selected })
}}




