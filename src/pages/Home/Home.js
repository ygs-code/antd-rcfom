import React, { Suspense, lazy, Component } from "react";
// 引入action
import { setPageTitle, setInfoList } from "../../store/actions.js";
import { connect } from "react-redux";

import { Table,Input, Tag } from 'antd';


import Add from "../../store/add/containers.js";
import Add1 from "../../store/add1/containers.js";
console.log(Add)


class Home extends Component {
  constructor(props) {
    super(props);
    this.columns=[];
   
    this.state={
      columns:[

      ],
      data:[],
      attribute:[
        {
          value:'color',
          uuid:'123',
          children:[
            {
              value:'red',
              uuid:'1',
              
            },
            {
              value:'yellow',
              uuid:'1asdf',
              
            }
        ],
        },
        {
          value:'size',
          children:[
             {
                 value:'xxl',
                 uuid:'asdfsd'
              },
              {
                value:'xxll',
                uuid:'asdfsd'
             }
          ],
        },
        {
          value:'weight',
          children:[
             {
                 value:'0.5',
                 uuid:'345234sd'
              },
              {
                value:'1',
                uuid:'345234456sd'
             }
          ],
        },

        {
          value:'model',
          children:[
             {
                 value:'hose',
                 uuid:'345223453434sd'
              },
              {
                value:'shirt',
                uuid:'345234424354356sd'
             }
          ],
        }
    
      ],
    }

  }

  getData(data){
    let newData=[];
    let num=1;
    var count=0;
    // for(var i=0;i<data.length;i++){
       
    //   num*=data[i].children.length
    //   for(var y=0;y<data[i].children.length;y++){
    //     count++
    //   }
    //   // newData.push({

    //   // })
   
    // }




    for(let y0=0;y0<data[0].children.length;y0++){
      for(let y1=0;y1<data[1].children.length;y1++){
        for(let y2=0;y2<data[2].children.length;y2++){
          for(let y3=0;y3<data[3].children.length;y3++){
              newData.push({
                uuid:`${[data[0].children[y0].uuid]}-${[data[1].children[y1].uuid]}-${[data[2].children[y2].uuid]}-${[data[3].children[y3].uuid]}`,
                [data[0].value]:data[0].children[y0].value,
                [data[1].value]:data[1].children[y1].value,
                [data[2].value]:data[2].children[y2].value,
                [data[3].value]:data[3].children[y3].value,
              })
          }
        }
      }
    }

console.log('count=',count)
console.log('newData=',newData)
    // 3*2
    // data.map(item=>{
    //   console.log('item',item)
    //   item.children.map(_item=>{
    //     newData.push({
    //        [item.value]:'',
    //        [_item.value]:'',
    //     })
    //   })
    // })
    return num;
  }

  componentDidMount() {
    let { setPageTitle, setInfoList } = this.props;
  

    // 触发setPageTitle action
    // setPageTitle("新的标题");

    // 触发setInfoList action
    setInfoList([1, 2, 3, 4, 5, 6]);
    console.log('getData', this.getData(this.state.attribute))
   
  }

  render() {
    // 从props中解构store
    let { pageTitle, infoList } = this.props;
    console.log(infoList);
    console.log(this.props);

    const data = [
      {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
      },
      {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
      },
      {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
      },
    ];



    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: tags => (
          <span>
            {tags.map(tag => {
              let color = tag.length > 5 ? 'geekblue' : 'green';
              if (tag === 'loser') {
                color = 'volcano';
              }
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </span>
        ),
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <a style={{ marginRight: 16 }}>Invite {record.name}</a>
            <a>Delete</a>
          </span>
        ),
      },
    ];


    // 使用store
    return (
      <div>
        <ul>
           <li>+添加属性</li>
           <Input placeholder="Basic usage" />
        </ul>
        {/* <Add />
        <Add1 /> 
        <h1>{pageTitle}</h1>
        {infoList.length > 0 ? (
          <ul>
            {JSON.stringify(infoList)}
            {infoList.map((item, index) => {
              return (<li key={index}>{item}</li>);
 
            })}
          </ul>
        ) : null} */}

        <Table columns={columns} dataSource={data} />
      </div>
    );
  }
}


//把redux 中的state 映射到 组件props中
const mapStateToProps = state => {
  console.log(state)

  return {
    pageTitle: state.pageTitle,
    infoList: state.infoList
  };
};

//把redux 中的Dispatch 映射到 组件props中
const mapDispatchToProps = (dispatch, ownProps) => {
  console.log(dispatch)
  console.log(ownProps)


  return {
    setPageTitle(data) {
      // 如果不懂这里的逻辑可查看前面对redux-thunk的介绍
      dispatch(setPageTitle(data));
      // 执行setPageTitle会返回一个函数
      // 这正是redux-thunk的所用之处:异步action
      // 上行代码相当于
      /*dispatch((dispatch, getState) => {
             dispatch({ value: 'SET_PAGE_TITLE', data: data })
             )*/
    },
    setInfoList(data) {
      dispatch(setInfoList(data));
    }
  };
};

//容器连接
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

// export default Home;
