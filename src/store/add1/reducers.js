import defaultState from './state'
import { SET_MUNBER } from './actionTypes'
// console.log(defaultState)
// const SET_MUNBER = 'SET_MUNBER'
//reducers 相当于 redux中的 state 命名名称
export const munber1 = function (state = defaultState.number1, action) {
    switch (action.type) {
        case SET_MUNBER:
            return ++action.data;
        default:
            // console.log(state)
            return state
    }
}

// export default {
//     munber1
// }