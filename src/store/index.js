// index.js
// applyMiddleware: redux通过该函数来使用注入中间件
// createStore: 用于创建store实例
// 合并多个Reducers
import { applyMiddleware,combineReducers, createStore } from 'redux';
// 中间件，作用：如果不使用该中间件，当我们dispatch一个action时，需要给dispatch函数传入action对象；但如果我们使用了这个中间件，那么就可以传入一个函数，这个函数接收两个参数:dispatch和getState。这个dispatch可以在将来的异步请求完成后使用，对于异步action很有用
import thunk from 'redux-thunk';
//日志中间件
import { createLogger } from 'redux-logger';

// 引入actionTypes 主要是要校验是否是唯一的值
import *  as   actionTypes from './actionTypes'
import *  as   addActionTypes from './add/actionTypes'
import *  as   addActionTypes1 from './add1/actionTypes'

// 引入reducer
import *  as reducers from './reducers.js'
import *  as addReducers from './add/reducers'
import *  as addReducers1 from './add1/reducers'



//日志
const middleware = [thunk];
if (process.env.NODE_ENV !== 'production') { //不是生产环境打开日志
    middleware.push(createLogger()) //日志
}

//判断是否有相同的 reducers
function checkReducersRepetitionName() {
    let obj = {};
    let arrArguments = arguments;
    for (var i = 0; i < arrArguments.length; i++) {
        for (var key in arrArguments[i]) {
            if (arrArguments[i].hasOwnProperty(key)) {
                if (key in obj) {
                    throw key + ' reducers repetition'
                } else {
                    obj[key] = arrArguments[i][key];
                }
            }
        }
    }
    return obj;
}
//合并多个Reducers   工具函数，用于组织多个reducer，并返回reducer集合
let Reducers = combineReducers(
    //判断是否有相同的 reducers
    checkReducersRepetitionName(
        reducers,
        addReducers,
        addReducers1
    )
)









//判断是否有相同的 ActionTypes
function checkActionTypesRepetitionName() {
    let obj = {};
    let arrArguments = arguments;
    for (var i = 0; i < arrArguments.length; i++) {
        for (var key in arrArguments[i]) {
            if (arrArguments[i].hasOwnProperty(key)) {

                if (obj[key] == arrArguments[i][key]) {
                    throw arrArguments[i][key] + ' reducers repetition'
                } else {
                    obj[key] = arrArguments[i][key];
                }
            }
        }
    }
    return obj;
}


//判断是否有相同的 ActionTypes
checkActionTypesRepetitionName(
    actionTypes,
    addActionTypes,
    addActionTypes1
);

// 创建store实例
let store = createStore(
    //判断是否有相同的 reducers
    Reducers,
    applyMiddleware(...middleware)
)

export default store
