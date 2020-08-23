const SET_HARD = 'SET_HARD'
const SIZE_IKS = 'SIZE_IKS'
const SIZE_VERT = 'SIZE_VERT'
const SET_STATE = 'SET_STATE'

const  SET_NULL = 'SET_NULL'

const CREATE_ARRAY = 'CREATE_ARRAY'


const initialState = {
  hard: false,
  iks: 5,
  vert: 5,
  gameFild: [],
  selected: '',
  tid: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_HARD: {
      return {
        ...state,
        hard: action.z
                   }
        }
    case SIZE_IKS:{
          return {
        ...state,
      iks: action.iks
          }
    }
    case SIZE_VERT:{
          return {
        ...state,
        vert: action.vert,
            }
    }
    case CREATE_ARRAY: {
      return {
        ...state,
        gameFild: action.array,
        selected: action.selected
            }
    }
        case SET_STATE:
      return {
        ...state,
        gameFild: state.gameFild.map((it) => {
          return {
            ...it,
            stat: it.id === action.id ? action.st : it.stat
          }
        }),
        selected: action.selected
                               }

    default:
      return state
  }
}

export function setHardMode(z) {
   return { type: SET_HARD, z }
}

export function createArray(){
  return (dispatch, getState) => {
  const {iks, vert} = getState().play
  const array = new Array(iks * vert).fill(null).map((it, index) => {
    return {
      id: index + 1,
      stat: 'free'
    }
  })
   const selected = array[Math.floor(Math.random() * array.length)].id
  dispatch ({ type: CREATE_ARRAY, array, selected })
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
    const { gameFild } = getState().play
    const arraymap = gameFild.map((it) => {
      return {
        ...it,
        stat: it.id === id ? st : it.stat
      }
    })
    const userScore = arraymap.filter((it) => it.stat === 'user').length
    const computerScore = arraymap.filter((it) => it.stat === 'computer').length

    let selected
    if (userScore < arraymap.length / 2 && computerScore < arraymap.length / 2) {
      const gameFieldFree = arraymap.filter((it) => it.stat === 'free')
      selected = gameFieldFree[Math.floor(Math.random() * gameFieldFree.length)].id

         }
    if (userScore >= arraymap.length / 2 && computerScore >= arraymap.length / 2) {
      selected = null
    }
    dispatch({ type: SET_STATE, id, st, selected })
  }
}


export function setSelectednull() {
  return (dispatch, getState) => {
    let { selected} = getState().play
    selected = null
    dispatch ({ type: SET_NULL, selected })
}}




