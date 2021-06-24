/*
 * @Author: your name
 * @Date: 2021-06-16 17:24:20
 * @LastEditTime: 2021-06-16 19:07:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /antd-rcfom/src/pages/LogicFlow/index.js
 */
import React, { Component } from "react";
import "./index.less";
import { Icon, Input, Button, Checkbox, Form } from "antd";
import LogicFlow from "@logicflow/core";
import "@logicflow/core/dist/style/index.css";

 
import { RectNode, RectNodeModel, h,LineEdge, LineEdgeModel } from "@/component/@logicflow/core";
// const { RectNode, RectNodeModel, h } = '@logicflow/core';
// 自定义节点的 model
class Model extends RectNodeModel {
  // setAttributes() {
  //   const size = 80;
  //   this.width = 100;
  //   this.height = 100;
  // }
}
// 自定义节点的 view
class View extends RectNode {
  getShape() {
    // 通过 getAttributes 获取 model 中的属性
    const { x, y, width, height, fill, stroke, strokeWidth } =
      this.getAttributes();
    console.log("this.getAttributes()=", this.getAttributes());
    const attrs = {
      // rect 标签的 x，y 对应的是图形的左上角
      // 所以我们要将矩形的中心移动到 x，y
      x: x - width / 2,
      y: y - height / 2,
      width: width / 100,
      height: height / 100,
      stroke,
      fill,
      strokeWidth,
    };
    // getShape 的返回值是一个通过 h 方法创建的 svg 元素
    return h("g", {}, [
      // h("rect", { ...attrs }),
      h(
        "svg",
        {
          x: x - width / 2 + 5,
          y: y - height / 2 + 5,
          width: 25,
          height: 25,
          viewBox: "0 0 1274 1024",
        },
        h("path", {
          fill: stroke,
          d: "M655.807326 287.35973m-223.989415 0a218.879 218.879 0 1 0 447.978829 0 218.879 218.879 0 1 0-447.978829 0ZM1039.955839 895.482975c-0.490184-212.177424-172.287821-384.030443-384.148513-384.030443-211.862739 0-383.660376 171.85302-384.15056 384.030443L1039.955839 895.482975z",
        })
      ),
    ]);
  }
}

class LineView extends LineEdge {
  getShape() {
    // 通过 getAttributes 获取 model 中的属性
    const { x, y, width, height, fill, stroke, strokeWidth } =
      this.getAttributes();
    console.log("this.getAttributes()=", this.getAttributes());
    const attrs = {
      // rect 标签的 x，y 对应的是图形的左上角
      // 所以我们要将矩形的中心移动到 x，y
      x: x - width / 2,
      y: y - height / 2,
      width: width ,
      height: height ,
      stroke,
      fill,
      strokeWidth,
    };
    // getShape 的返回值是一个通过 h 方法创建的 svg 元素
    return h("g", {}, [
         h("rect", { ...attrs }),
      h(
        "svg",
        {
          x: x - width / 2 + 5,
          y: y - height / 2 + 5,
          width: 50,
          height: 50,
          viewBox: "0 0 1274 1024",
        },
        h("path", {
          fill: stroke,
          d: "M655.807326 287.35973m-223.989415 0a218.879 218.879 0 1 0 447.978829 0 218.879 218.879 0 1 0-447.978829 0ZM1039.955839 895.482975c-0.490184-212.177424-172.287821-384.030443-384.148513-384.030443-211.862739 0-383.660376 171.85302-384.15056 384.030443L1039.955839 895.482975z",
        })
      ),
    ]);
  }
}


//  自定义线
class ProcessModel extends LineEdgeModel {
  setAttributes() {
    const { propteries: { isExecuted } } = this;

    if (isExecuted) {
      this.stroke = 'green';
    }
  }
}

class Index extends React.Component {
  componentDidMount() {
    const data = {
      // 节点
      nodes: [
        {
          id: 50,
          type: "rect",
          x: 100,
          y: 150,
          text: "你好",
        },
        {
          id: 21,
          type: "circle",
          x: 300,
          y: 150,
        },
        {
          id: 10,
          type: "customNodeType",
          x: 300,
          y: 200,
          text: "你好",
        },
      ],
      // 边
      edges: [
        {
          type: "polyline",
          sourceNodeId: 50,
          targetNodeId: 21,
        },
      ],
    };

    const lf = new LogicFlow({
      // 容器配置
      container: document.querySelector("#container"),
      // 画布配置
      width: 700,
      height: 600,
      // 背景颜色
      background: {
        color: "#F0F0F0",
      },
      //背景密度
      grid: {
        type: "dot",
        size: 10,
      },
      // 工具配置
      textEdit: true, // 文本编辑
      // 位置是否拖拽
      isSilentMode: false, //是静默模式
      edgeType: "line",
      snapline: true,
      // 样式配置
      style: {
        customNodeType: {
          width: 100,
          height: 100,
        },
        rect: {
          // rect?: RectStyle;
          // circle?: CircleStyle;
          // ellipse?: EllipseStyle;
          // diamond?: DiamondStyle;
          // polygon?: PolygonStyle;
          // anchor?: AnchorStyle;
          // text?: TextStyle;
          // nodeText?: NodeTextStyle;
          // edgeText?: EdgeTextStyle;
          // line?: LineStyle;
          // polyline?: PolylineStyle;
          // bezier?: BezierStyle;
          // arrow?: ArrowStyle;
          // anchorLine?: AnchorLineStyle;
          // anchorHover?: AnchorHoverStyle;

          // 弧度
          radius: 1,
          width: 100,
          height: 100,
        },
      },
    });

    lf.register({
      type: "customNodeType",
      view: View,
      model: Model,
    });

    lf.register({
      type: 'process',
      view: LineView,
      model: ProcessModel,
    });

    console.log("lf=========", lf);
    lf.render(data);
  }
  render() {
    return (
      <div>
        <div id="container"></div>
      </div>
    );
  }
}

export default Index;
