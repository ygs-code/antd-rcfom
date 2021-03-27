import { get } from "http";
import { SET_INFO_LIST, SET_PAGE_TITLE } from "./actionTypes";


//公共 actions.js
// action也是函数
export function setPageTitle(data) {
  return (dispatch, getState) => {
    dispatch({ type: "SET_PAGE_TITLE", data: data });
  };
}



//可以嵌套n层
const getList = (data) => {
  return dispatch => {
    return dispatch({ type: SET_INFO_LIST, data: data });
  }
}

//异步更新数据
const fetchPosts = data => {
  return dispatch => {
    //return dispatch({ type: SET_INFO_LIST, data: data });  //可以做异步嵌套二层
    return dispatch(getList(data)); //也可以做异步嵌套n层
  }
}

//异步更新   dispatch 可以设置一层 或者n层都行
export function setInfoList(data) {
  return (dispatch, getState) => { //里面回调，会传递给dispatch和getState进来
    // console.log(getState())
    // 使用fetch实现异步请求
    //     window.fetch('/api/getInfoList', {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     }).then(res => {
    //         return res.json()
    //     }).then(data => {
    //         let { code, data } = data
    //         if (code === 0) {
    //         dispatch({ type: 'SET_INFO_LIST', data: data })
    //     }
    // })
    // return dispatch(fetchPosts(data)) //也可以做异步嵌套n层
    // dispatch({ type: SET_INFO_LIST, data: data }); //可以做异步嵌套一层
    return dispatch((dispatch, getState) => {
      // dispatch({ type: SET_INFO_LIST, data: data });
      return dispatch((dispatch, getState) => {
        return dispatch({ type: SET_INFO_LIST, data: data });
      });//也可以做异步嵌套n层

    })

  };
}
