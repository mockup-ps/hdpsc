import { createStore } from 'redux'

const initialState = {
  sidebarShow: 'responsive',
  simView : 1,
  datadetensi:{},
  trigger:0,
  forma:{},
  formb:{}
}

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return {...state, ...rest }
    default:
      return state
  }
}

const store = createStore(changeState)
export default store