import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { clickAdd } from './actions'




class Add extends Component {
    // static propTypes = {

    //     selectedSubreddit: PropTypes.string.isRequired,
    //     posts: PropTypes.array.isRequired,
    //     isFetching: PropTypes.bool.isRequired,
    //     lastUpdated: PropTypes.number,
    //     dispatch: PropTypes.func.isRequired,
    //     // subscribe: PropTypes.func.isRequired,
    // }

    componentDidMount() {


        // console.log(this.props)

    }

    componentWillReceiveProps(nextProps) {

    }

    handleChange = nextSubreddit => {

    }


    handleRefreshClick = e => {
        // console.log('handleRefreshClick')
        const { addMunber } = this.props

        addMunber(this.props.munber)
        // console.log(this.props)
        // console.log(addMunber)
        // debugger

        e.preventDefault()


    }

    render() {

        return (
            <div>

                <button onClick={this.handleRefreshClick}>按钮</button>
                <div>{this.props.munber}</div>
            </div>)

    }
}





//把redux 中的state 映射到 组件props中
const mapStateToProps = state => {
    // console.log('==add==')
    // console.log(state)



    return {
        munber: state.munber,

    };
};

//把redux 中的Dispatch 映射到 组件props中
const mapDispatchToProps = (dispatch, ownProps) => {
    // console.log(dispatch)
    // debugger;

    return {
        addMunber(data) {
            // console.log(data)
            //传递actions进来
            dispatch(clickAdd(data));
        }
    }
    // return {
    //     setPageTitle(data) {
    //         // 如果不懂这里的逻辑可查看前面对redux-thunk的介绍
    //         dispatch(setPageTitle(data));
    //         // 执行setPageTitle会返回一个函数
    //         // 这正是redux-thunk的所用之处:异步action
    //         // 上行代码相当于
    //         /*dispatch((dispatch, getState) => {
    //                dispatch({ type: 'SET_PAGE_TITLE', data: data })
    //                )*/
    //     },
    //     setInfoList(data) {
    //         dispatch(setInfoList(data));
    //     }
    // };
};

//容器连接
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Add)
