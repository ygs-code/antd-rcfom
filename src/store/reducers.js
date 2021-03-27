
import defaultState from './state.js'
import { SET_INFO_LIST, SET_PAGE_TITLE } from './actionTypes.js'


//公共 reducers
// 一个reducer就是一个函数
export const pageTitle = function (state = defaultState.pageTitle, action) {
    // 不同的action有不同的处理逻辑
    switch (action.type) {
        case SET_PAGE_TITLE:
            return action.data
        default:
            return state
    }
}

export const infoList = function (state = defaultState.infoList, action) {
    switch (action.type) {
        case SET_INFO_LIST:
            return action.data
        default:
            // console.log(state)
            return state
    }
}


 