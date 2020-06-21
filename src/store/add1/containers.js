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
        addMunber(this.props.munber1)
        // console.log(addMunber)
        e.preventDefault()
    }

    render() {
        return (
            <div>

                <button onClick={this.handleRefreshClick}>按钮</button>
                <div>{this.props.munber1}</div>
            </div>)

    }
}





//把redux 中的state 映射到 组件props中
const mapStateToProps = state => {
    return {
        munber1: state.munber1,

    };
};

//把redux 中的Dispatch 映射到 组件props中
const mapDispatchToProps = (dispatch, ownProps) => {
    // console.log(dispatch)
    return {
        addMunber(data) {
            // console.log(data)
            //传递actions进来
            dispatch(clickAdd(data));
        }
    }

};

//容器连接
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Add)
