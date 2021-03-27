import defaultState from './state'
import { SET_MUNBER } from './actionTypes'
//reducers 相当于 redux中的 state 命名名称
export const munber = function (state = defaultState.number, action) {
    switch (action.type) {
        case SET_MUNBER:
            return ++action.data;
        default:
            // console.log(state)

            return state
    }
}

// export default {
//     munber
// }