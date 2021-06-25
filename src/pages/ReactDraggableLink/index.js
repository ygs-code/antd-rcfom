/*
 * @Author: your name
 * @Date: 2021-06-16 17:24:20
 * @LastEditTime: 2021-06-25 10:54:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /antd-rcfom/src/pages/LogicFlow/index.js
 */
import React, { Component } from "react";
import "./index.less";
import { Icon, Input, Button, Checkbox, Drawer } from "antd";
import * as go from "gojs";
import { ReactDiagram } from "gojs-react";
import LeftDrawer from "@/component/LeftDrawer";
import { v4 as uuidv4 } from "uuid";
import cat from "@/image/cat.jpeg";
import "@/css/font-awesome-4.7.0/css/font-awesome.css";
import "@/css/font_ alibaba/iconfont.css";
import "@/css/font_ alibaba/iconfont.css";
import sms from "@/image/sms.jpg";
import modeltplate from "@/image/modeltplate.jpg";
import quan from "@/image/quan.jpg";
import start from "@/image/start.jpg";
import "./index.less";

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.data = {
      highlightedData: null,
    };
    let key = this.getUuid();
    this.state = {
      nodeDataArray: [
        {
          xy: "0 0",
          topText: "开始",
          rightText: "每月每日",
          icon: "data:image/jpeg;base64,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",
          parentKey: null,
          key,
        },
      ],
      linkDataArray: [
        {
          key: this.getUuid(),
          from: key,
          to: "",
          points: [
            0, 38,
            // -1, 43.28239746093752,
            // -1,111.64119873046876,
            // -1, 111.64119873046876,
            0, 190, 0, 190,
          ],
        },
      ],
    };
  }
  getUuid = () => {
    return uuidv4();
  };
  documentDrag = () => {
    this.dragged = null;
    // This event should only fire on the drag targets.
    // Instead of finding every drag target,
    // we can add the event to the document and disregard
    // all elements that are not of class "draggable"
    //这个事件应该只在拖动目标上触发。
    //不是找到每个拖动目标，
    //我们可以将事件添加到文件中，然后忽略
    //所有不属于draggable类的元素
    document.addEventListener(
      "dragstart",
      (event) => {
        if (event.target.className !== "draggable") return;
        // Some data must be set to allow drag 一些数据必须设置为允许拖动 保存数据

        event.dataTransfer.setData(
          "data",
          JSON.stringify({
            text: event.target.getAttribute("text"),
            src: event.target.getAttribute("src"),
          })
        );

        // store a reference to the dragged element and the offset of the mouse from the center of the element 存储对被拖动元素的引用和鼠标离元素中心的偏移量
        this.dragged = event.target;
        this.dragged.offsetX = event.offsetX - this.dragged.clientWidth / 2;
        this.dragged.offsetY = event.offsetY - this.dragged.clientHeight / 2;
        // Objects during drag will have a red border
        event.target.style.border = "2px solid red";
      },
      false
    );

    // This event resets styles after a drag has completed (successfully or not)
    //这个事件在拖动完成后重置样式(成功与否)
    document.addEventListener(
      "dragend",
      (event) => {
        // reset the border of the dragged element 重置被拖动元素的边框
        this.dragged.style.border = "";
        // highlight(null);
      },
      false
    );
  };
  divDrag = () => {
    var _this = this;
    var div = this.diagramRef.divRef.current; //document.getElementById("myDiagramDiv");

    console.log("this.diagramRef====", this.diagramRef.divRef.current);
    div.addEventListener(
      "dragenter",
      function (event) {
        // Here you could also set effects on the Diagram,
        // such as changing the background color to indicate an acceptable drop zone

        // Requirement in some browsers, such as Internet Explorer
        event.preventDefault();
      },
      false
    );

    div.addEventListener(
      "dragover",
      function (event) {
        // We call preventDefault to allow a drop
        // But on divs that already contain an element,
        // we want to disallow dropping
        //我们调用preventDefault来允许删除
        //但是对于已经包含一个元素的div，
        //我们不允许删除
        if (this === _this.myDiagram.div) {
          var can = event.target;
          var pixelratio = _this.myDiagram.computePixelRatio();

          // if the target is not the canvas, we may have trouble, so just quit:
          // 如果目标不是画布，我们可能有麻烦，所以退出:
          if (!(can instanceof HTMLCanvasElement)) return;

          var bbox = can.getBoundingClientRect();
          var bbw = bbox.width;
          if (bbw === 0) bbw = 0.001;
          var bbh = bbox.height;
          if (bbh === 0) bbh = 0.001;
          var mx = event.clientX - bbox.left * (can.width / pixelratio / bbw);
          var my = event.clientY - bbox.top * (can.height / pixelratio / bbh);
          var point = _this.myDiagram.transformViewToDoc(new go.Point(mx, my));
          var curnode = _this.myDiagram.findPartAt(point, true);

          // console.log(' go.S=', go.S)

          if (curnode) {
            // console.log("curnode=====", curnode);
            // console.log("curnode=====", curnode && curnode.constructor);
            // console.log("curnode instanceof  go.TextBlock==", curnode instanceof  go.TextBlock);
            // 碰撞
            _this.highlight(curnode);
          } else {
            _this.highlight(null);
          }
        }

        if (event.target.className === "dropzone") {
          // Disallow a drop by returning before a call to preventDefault:
          return;
        }

        // Allow a drop on everything else
        event.preventDefault();
      },
      false
    );

    div.addEventListener(
      "dragleave",
      function (event) {
        // reset background of potential drop target
        if (event.target.className == "dropzone") {
          event.target.style.background = "";
        }
        _this.highlight(null);
      },
      false
    );

    // handle the user option for removing dragged items from the Palette
    var remove = document.getElementById("remove");

    div.addEventListener(
      "drop",
      function (event) {
        // prevent default action
        // (open as link for some elements in some browsers)
        event.preventDefault();
        // Dragging onto a Diagram
        console.log("_this.data.highlightedData=", _this.data.highlightedData);
        // console.log( _this.myDiagram.modelData)
        // console.log(_this.myDiagram.nodeDataArray)
        if (this === _this.myDiagram.div && _this.data.highlightedData) {
          console.log("添加节点");
          var can = event.target;
          var pixelratio = window.PIXELRATIO;

          // if the target is not the canvas, we may have trouble, so just quit:
          if (!(can instanceof HTMLCanvasElement)) return;

          var bbox = can.getBoundingClientRect();
          var bbw = bbox.width;
          if (bbw === 0) bbw = 0.001;
          var bbh = bbox.height;
          if (bbh === 0) bbh = 0.001;
          var mx =
            event.clientX -
            bbox.left * (can.width / pixelratio / bbw) -
            _this.dragged.offsetX;
          var my =
            event.clientY -
            bbox.top * (can.height / pixelratio / bbh) -
            _this.dragged.offsetY;
          var point = _this.myDiagram.transformViewToDoc(new go.Point(mx, my));
          // console.log("point===", point);
          // console.log("mx===", mx);
          // console.log("my===", my);
          // console.log("event.clientX===", event.clientX);
          // console.log("event.clientY===", event.clientY);
          point.x = point.x - 30;
          _this.myDiagram.startTransaction("new node");
          console.log(
            "_this.data.highlightedData==",
            _this.data.highlightedData
          );
          const { from: parentKey } = _this.data.highlightedData;
          // const JsonData = JSON.parse(_this.save());
          // const { nodeDataArray = [], linkDataArray = [] } = JsonData;
          const { nodeDataArray = [], linkDataArray = [] } = _this.state;
          // 找到父亲节点
          const parentNodeData = nodeDataArray.find((item) => {
            return item.key == parentKey;
          });
          // 找到父亲线节点
          const parentLinkIndex = linkDataArray.findIndex((item) => {
            return item.from == parentKey;
          });

          console.log("parentNodeData.xy====", parentNodeData);
          console.log("parentNodeData.xy====", parentNodeData.xy);
          const parentXY = parentNodeData.xy.split(" ");
          console.log("parentXY====", parentXY);
          console.log("parentNodeData====", parentNodeData);
          const parentX = parentXY[0];
          const parentY = parentXY[1];

          // const parentLinkData = nodeDataArray.find((item) => {
          //   return item.key == parentKey;
          // });

          // 插入节点
          const key = _this.getUuid();
          const { src, text } = JSON.parse(
            event.dataTransfer.getData("data") || "{}"
          );
          linkDataArray[parentLinkIndex].to = key;

          const newNodeData = {
            key,
            // topText: "新的节点",
            rightText: text,
            icon: src,
            xy: `${parentX} ${+parentY + 300}`,
          };

          const newLinkDataArray = {
            key: _this.getUuid(),
            from: key,
            to: "",
            points: [
              parentX,
              +parentY + 300 + 38,
              parentX,
              +parentY + 300 + 190,
              parentX,
              +parentY + 300 + 190,
            ],
          };

          // _this.myDiagram.model.commit(function (m) {
          //   // alternate between lightblue and lightgreen colors
          //   // 获取旧的数据颜色 多个的
          //   var oldcolor = m.modelData.color;
          //   console.log("m.modelData=", m.modelData);
          //   console.log("arguments=", arguments);
          //   console.log("nodeDataArray=", m.nodeDataArray);
          //   var data = m.nodeDataArray[1]
          //   // data.data={
          //   //     name: "香蕉"
          //   // }
          //   // data.text='banana'
          //   //切换颜色
          //   var newcolor =
          //     oldcolor === "lightblue" ? "lightgreen" : "lightblue";
          //   // 批量设置             key      value
          //    m.set([...nodeDataArray, newNodeData]);
          //   // // 单条改变数据  key   value
          //   // m.set(data, "text", 'banana');
          //   // m.set(data, "data", {
          //   //     name: "香蕉"
          //   // });
          // }, "changed shared color");

          _this.setState({
            nodeDataArray: [...nodeDataArray, newNodeData],
            linkDataArray: [...linkDataArray, newLinkDataArray],
          });

          // _this.load({
          //   ...JsonData,
          //   nodeDataArray: [...nodeDataArray, newNodeData],
          //   linkDataArray,
          // });
          console.log("getData==", event.dataTransfer.getData("data"));
          // event.dataTransfer.getData("data"),

          console.log("save==", _this.save());
          // //添加节点
          // _this.addNode({
          //   xy: "0 50",
          //   topText: "开始",
          //   rightText: "每月每日",
          //   icon: "data:image/jpeg;base64,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",
          //   key: -1,
          // })
          // _this.myDiagram.model.addNodeData({
          //   xy: `${point.x} ${point.y}`,
          //   // location: point,
          //   text: event.dataTransfer.getData("text"),
          //   color: "lightyellow",
          // });
          _this.myDiagram.commitTransaction("new node");
          console.log(_this.dragged);
          // remove dragged element from its old location
          // if (remove.checked) dragged.parentNode.removeChild(dragged);
        }

        // If we were using drag data, we could get it here, ie:
        // var data = event.dataTransfer.getData('text');
      },
      false
    );
  };
  //突出显示在外部拖放到图中的静态节点
  highlight = (node) => {
    // may be null
    var oldskips = this.myDiagram.skipsUndoManager;
    this.myDiagram.skipsUndoManager = true;
    this.myDiagram.startTransaction("highlight");
    // 触发节点isHighlight 事件
    if (node !== null) {
      this.myDiagram.highlight(node);
    } else {
      this.myDiagram.clearHighlighteds();
    }
    this.myDiagram.commitTransaction("highlight");
    this.myDiagram.skipsUndoManager = oldskips;
  };
  // 初始化
  init = () => {
    var $ = go.GraphObject.make; // for conciseness in defining templates
    this.$ = $;
    let myDiagram = null;
    // 获取myDiagram
    this.myDiagram = myDiagram = $(
      go.Diagram,
      "myDiagramDiv", // must name or refer to the DIV HTML element
      {
        ...{
          maxSelectionCount: 1, // users can select only one part at a time
          validCycle: go.Diagram.CycleDestinationTree, // make sure users can only create trees
          "clickCreatingTool.archetypeNodeData": {
            // allow double-click in background to create a new node
            name: "(new person)",
            title: "",
            comments: "",
          },
          "clickCreatingTool.insertPart": function (loc) {
            // scroll to the new node
            var node = go.ClickCreatingTool.prototype.insertPart.call(
              this,
              loc
            );
            if (node !== null) {
              this.diagram.select(node);
              this.diagram.commandHandler.scrollToPart(node);
              this.diagram.commandHandler.editTextBlock(
                node.findObject("NAMETB")
              );
            }
            return node;
          },
          layout: $(
            go.TreeLayout, // 树形状布局
            {
              treeStyle: go.TreeLayout.StyleLastParents,
              arrangement: go.TreeLayout.ArrangementHorizontal,
              // properties for most of the tree:
              angle: 90,
              layerSpacing: 100, // 父子与子节点之间距离
              nodeSpacing: 100, // 兄弟节点之间距离
              alignment: go.TreeLayout.AlignmentCenterChildren, //对齐:父节点与其子节点的相对位置。
              sorting: go.TreeLayout.SortingForwards, //获取或设置用于对顶点的直接子节点排序的默认排序策略。必须TreeLayout.SortingForwards, TreeLayout.SortingReverse, TreeLayout.SortingAscending, TreeLayout.SortingDescending.
              comparer: function (va, vb) {
                //指定父节点的直接子节点的顺序。
                var da = va.node.data;
                var db = vb.node.data;
                if (da.someProperty < db.someProperty) return -1;
                if (da.someProperty > db.someProperty) return 1;
                return 0;
              },
              layerStyle: go.TreeLayout.LayerIndividual, //获取或设置节点按层对齐的方式。必须   TreeLayout.LayerIndividual, TreeLayout.LayerSiblings, or TreeLayout.LayerUniform.
              setsPortSpot: true,
              setsChildPortSpot: true,

              // properties for the "last parents":
              alternateAngle: 90,
              alternateLayerSpacing: 35,
              alternateAlignment: go.TreeLayout.AlignmentBus,
              alternateNodeSpacing: 200,
              // columnSpacing: 10
            }
            // 横向布局
            // go.LayeredDigraphLayout, { columnSpacing: 10 }
          ),
          // $(go.LayeredDigraphLayout, { columnSpacing: 10 })
          "undoManager.isEnabled": true,
        },
        // grid: $(
        //   go.Panel,
        //   "Grid",
        //   $(go.Shape, "LineH", {
        //     stroke: "lightgray",
        //     strokeWidth: 0.5,
        //   }),
        //   $(go.Shape, "LineH", {
        //     stroke: "gray",
        //     strokeWidth: 0.5,
        //     interval: 10,
        //   }),
        //   $(go.Shape, "LineV", {
        //     stroke: "lightgray",
        //     strokeWidth: 0.5,
        //   }),
        //   $(go.Shape, "LineV", {
        //     stroke: "gray",
        //     strokeWidth: 0.5,
        //     interval: 10,
        //   })
        // ),
        // "draggingTool.dragsLink": true,
        // "draggingTool.isGridSnapEnabled": true,
        // "linkingTool.isUnconnectedLinkValid": true,
        // "linkingTool.portGravity": 20,
        // "relinkingTool.isUnconnectedLinkValid": true,
        // "relinkingTool.portGravity": 20,
        // "relinkingTool.fromHandleArchetype": $(go.Shape, "Diamond", {
        //   segmentIndex: 0,
        //   cursor: "pointer",
        //   desiredSize: new go.Size(8, 8),
        //   fill: "tomato",
        //   stroke: "darkred",
        // }),
        // "relinkingTool.toHandleArchetype": $(go.Shape, "Diamond", {
        //   segmentIndex: -1,
        //   cursor: "pointer",
        //   desiredSize: new go.Size(8, 8),
        //   fill: "darkred",
        //   stroke: "tomato",
        // }),
        // "linkReshapingTool.handleArchetype": $(go.Shape, "Diamond", {
        //   desiredSize: new go.Size(7, 7),
        //   fill: "lightblue",
        //   stroke: "deepskyblue",
        // }),
        // "rotatingTool.handleAngle": 270,
        // "rotatingTool.handleDistance": 30,
        // "rotatingTool.snapAngleMultiple": 15,
        // "rotatingTool.snapAngleEpsilon": 15,
        // "undoManager.isEnabled": true,
      }
    );
    // 当文档被修改时，添加一个“*”到标题并启用“保存”按钮
    // when the document is modified, add a "*" to the title and enable the "Save" button
    myDiagram.addDiagramListener("Modified", function (e) {
      var button = document.getElementById("SaveButton");
      if (button) button.disabled = !myDiagram.isModified;
      var idx = document.title.indexOf("*");
      if (myDiagram.isModified) {
        if (idx < 0) document.title += "*";
      } else {
        if (idx >= 0) document.title = document.title.substr(0, idx);
      }
    });
  };
  // 画端口
  makePort = (
    spot,
    output, // 是否是输出
    input // 是否是输入
  ) => {
    const $ = this.$;
    // the port is basically just a small transparent circle 这个端口基本上就是一个透明的小圆圈
    return $(
      go.Shape,
      "Circle",
      {
        fill: "rgba(0,0,0,.3)", // not seen, by default; set to a translucent gray by showSmallPorts, defined below 默认情况下，看不到;通过showSmallPorts设置为半透明的灰色，定义如下
        stroke: null,
        desiredSize: new go.Size(7, 7),
        alignment: spot, // align the port on the main Shape 将端口对准主形状
        alignmentFocus: spot, // just inside the Shape 就在Shape里面
        // portId: name, // declare this object to be a "port" declare this object to be a "port" 将此对象声明为“端口”
        fromSpot: spot,
        toSpot: spot, // declare where links may connect at this port //声明在这个端口可以连接的链接
        fromLinkable: output, // 是否是输出
        toLinkable: input, //  是否是输入 declare whether the user may draw links to/from here 声明用户是否可以从这里绘制链接
        cursor: "pointer", // show a different cursor to indicate potential link point //显示不同的游标来指示潜在的链接点
      },
      // 端口id
      new go.Binding("portId", "key", function (v, m) {
        // v 是当前uui数据，m中的
        const data = m?.part?.data;
        console.log("v=======", v);
        console.log("data=======", data);
        return v;
      })
    );
  };
  // 设置节点
  setNodeTemplate = () => {
    const $ = this.$;
    const myDiagram = this.myDiagram;
    var nodeSelectionAdornmentTemplate = $(
      go.Adornment,
      "Auto",
      $(go.Shape, {
        fill: null,
        stroke: "deepskyblue",
        strokeWidth: 1.5,
        strokeDashArray: [4, 2],
      }),
      $(go.Placeholder)
    );

    var nodeResizeAdornmentTemplate = $(
      go.Adornment,
      "Spot",
      { locationSpot: go.Spot.Right },
      $(go.Placeholder),
      $(go.Shape, {
        alignment: go.Spot.TopLeft,
        cursor: "nw-resize",
        desiredSize: new go.Size(6, 6),
        fill: "lightblue",
        stroke: "deepskyblue",
      }),
      $(go.Shape, {
        alignment: go.Spot.Top,
        cursor: "n-resize",
        desiredSize: new go.Size(6, 6),
        fill: "lightblue",
        stroke: "deepskyblue",
      }),
      $(go.Shape, {
        alignment: go.Spot.TopRight,
        cursor: "ne-resize",
        desiredSize: new go.Size(6, 6),
        fill: "lightblue",
        stroke: "deepskyblue",
      }),

      $(go.Shape, {
        alignment: go.Spot.Left,
        cursor: "w-resize",
        desiredSize: new go.Size(6, 6),
        fill: "lightblue",
        stroke: "deepskyblue",
      }),
      $(go.Shape, {
        alignment: go.Spot.Right,
        cursor: "e-resize",
        desiredSize: new go.Size(6, 6),
        fill: "lightblue",
        stroke: "deepskyblue",
      }),

      $(go.Shape, {
        alignment: go.Spot.BottomLeft,
        cursor: "se-resize",
        desiredSize: new go.Size(6, 6),
        fill: "lightblue",
        stroke: "deepskyblue",
      }),
      $(go.Shape, {
        alignment: go.Spot.Bottom,
        cursor: "s-resize",
        desiredSize: new go.Size(6, 6),
        fill: "lightblue",
        stroke: "deepskyblue",
      }),
      $(go.Shape, {
        alignment: go.Spot.BottomRight,
        cursor: "sw-resize",
        desiredSize: new go.Size(6, 6),
        fill: "lightblue",
        stroke: "deepskyblue",
      })
    );

    var nodeRotateAdornmentTemplate = $(
      go.Adornment,
      { locationSpot: go.Spot.Center, locationObjectName: "ELLIPSE" },
      $(go.Shape, "Ellipse", {
        name: "ELLIPSE",
        cursor: "pointer",
        desiredSize: new go.Size(7, 7),
        fill: "lightblue",
        stroke: "deepskyblue",
      }),
      $(go.Shape, {
        geometryString: "M3.5 7 L3.5 30",
        isGeometryPositioned: true,
        stroke: "deepskyblue",
        strokeWidth: 1.5,
        strokeDashArray: [4, 2],
      })
    );

    myDiagram.nodeTemplate = $(
      go.Node,
      "Table",
      // { fill: "rgba(0,0,0,.3)" },
      // 位置
      { locationSpot: go.Spot.Center },
      // 位置
      new go.Binding("location", "xy", go.Point.parse).makeTwoWay(
        go.Point.stringify
      ),
      // 是否选中
      {
        selectable: true,
        selectionAdornmentTemplate: nodeSelectionAdornmentTemplate,
      },

      // 是否可以编辑大小
      // {
      //   resizable: true,
      //   resizeObjectName: "PANEL",
      //   resizeAdornmentTemplate: nodeResizeAdornmentTemplate,
      // },
      // 是否可以旋转
      // {
      //   rotatable: true,
      //   rotateAdornmentTemplate: nodeRotateAdornmentTemplate,
      // },

      new go.Binding("angle").makeTwoWay(),
      // the main object is a Panel that surrounds a TextBlock with a Shape //主要对象是一个面板，围绕着一个TextBlock的形状
      $(
        go.Panel,
        "Table",
        {
          name: "PANEL",
          // { fill: "rgba(0,0,0,.3)" },
        },
        //如果您想更改desiredSize，则必须将此属性设置为不同的Size。
        new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(
          go.Size.stringify
        ),

        // $(
        //   go.Shape,
        //   "Rectangle", // default figure / /默认图
        //   {
        //     portId: "", // the default port: if no spot on link data, use closest side 默认端口:如果链路数据上没有点，使用最近的端口
        //     fromLinkable: true,
        //     toLinkable: true,
        //     cursor: "pointer",
        //     fill: "white", // default color  default color
        //     strokeWidth: 2,
        //     width:300,
        //     height:300,
        //   },
        //   new go.Binding("figure"),
        //   new go.Binding("fill"),
        // ),

        // $(
        //   go.TextBlock,
        //   {
        //     font: "bold 11pt Helvetica, Arial, sans-serif",
        //     margin: 8,
        //     maxSize: new go.Size(160, NaN),
        //     wrap: go.TextBlock.WrapFit,
        //     editable: true,
        //   },
        //   new go.Binding("text","topText").makeTwoWay(),
        // ),
        // 添加图片
        $(
          go.Picture,
          // Pictures should normally have an explicit width and height.
          // This picture has a red background, only visible when there is no source set
          // or when the image is partially transparent.
          {
            row: 2,
            column: 1,
            // margin: 10,
            width: 35,
            height: 35,
            background: "red",
          },
          // Picture.source is data bound to the "source" attribute of the model data
          new go.Binding("source", "icon")
        ),

        // 文字
        $(
          go.TextBlock,
          {
            // margin: 3,
            font: "bold 16px sans-serif",
            // width: 140,
            textAlign: "center",
            row: 1,
            column: 1,
          },
          // TextBlock.text is bound to Node.data.key
          // new go.Binding("text",(v)=>{
          //   console.log('v=========',v)
          //   return v.buttomText
          // })

          new go.Binding("text", "topText") // 映射key
        ),
        $(
          go.TextBlock,
          {
            // margin: 3,
            font: "bold 16px sans-serif",
            // width: 140,
            textAlign: "center",
            row: 3,
            column: 1,
          },
          // TextBlock.text is bound to Node.data.key
          // new go.Binding("text",(v)=>{
          //   console.log('v=========',v)
          //   return v.buttomText
          // })

          new go.Binding("text", "buttomText") // 映射key
        ),
        $(
          go.TextBlock,
          {
            // margin: 3,
            font: "bold 16px sans-serif",
            // width: 140,
            textAlign: "center",
            row: 2,
            column: 0,
          },
          // TextBlock.text is bound to Node.data.key
          // new go.Binding("text",(v)=>{
          //   console.log('v=========',v)
          //   return v.buttomText
          // })

          new go.Binding("text", "leftText") // 映射key
        ),
        $(
          go.TextBlock,
          {
            // margin: 3,
            font: "bold 16px sans-serif",
            // width: 140,
            textAlign: "center",
            row: 2,
            column: 2,
          },
          // TextBlock.text is bound to Node.data.key
          // new go.Binding("text",(v)=>{
          //   console.log('v=========',v)
          //   return v.buttomText
          // })
          new go.Binding("text", "rightText") // 映射key
        ),
        $(
          go.TextBlock,
          {
            // margin: 3,
            font: "bold 16px sans-serif",
            // width: 140,
            textAlign: "center",
            row: 1,
            column: 2,
          },
          // TextBlock.text is bound to Node.data.key
          // new go.Binding("text",(v)=>{
          //   console.log('v=========',v)
          //   return v.buttomText
          // })
          new go.Binding("text", "rightTopText") // 映射key
        ),
        $(
          go.TextBlock,
          {
            margin: 3,
            font: "bold 16px sans-serif",
            // width: 140,
            textAlign: "center",
            row: 3,
            column: 2,
          },
          // TextBlock.text is bound to Node.data.key
          // new go.Binding("text",(v)=>{
          //   console.log('v=========',v)
          //   return v.buttomText
          // })
          new go.Binding("text", "leftButtomText") // 映射key
        ),
        $(
          go.TextBlock,
          {
            // margin: 3,
            font: "bold 16px sans-serif",
            // width: 140,
            textAlign: "center",
            row: 1,
            column: 0,
          },
          // TextBlock.text is bound to Node.data.key
          // new go.Binding("text",(v)=>{
          //   console.log('v=========',v)
          //   return v.buttomText
          // })
          new go.Binding("text", "rightTopText") // 映射key
        ),
        $(
          go.TextBlock,
          {
            // margin: 3,
            font: "bold 16px sans-serif",
            // width: 140,
            textAlign: "center",
            row: 3,
            column: 0,
          },
          // TextBlock.text is bound to Node.data.key
          // new go.Binding("text",(v)=>{
          //   console.log('v=========',v)
          //   return v.buttomText
          // })
          new go.Binding("text", "leftButtomText") // 映射key
        )
      ),
      // four small named ports, one on each side: //四个连线端口

      this.makePort(go.Spot.Top, false, true),
      this.makePort(go.Spot.Left, true, true),
      this.makePort(go.Spot.Right, true, true),
      this.makePort(go.Spot.Bottom, true, false),

      {
        // handle mouse enter/leave events to show/hide the ports //处理鼠标输入/离开事件来显示/隐藏端口
        mouseEnter: function (e, node) {
          // showSmallPorts(node, true);
        },
        mouseLeave: function (e, node) {
          // showSmallPorts(node, false);
        },
      }
    );
  };

  //设置线
  setLinkTemplate = () => {
    const $ = this.$;
    const _this = this;
    const myDiagram = this.myDiagram;
    var linkSelectionAdornmentTemplate = $(
      go.Adornment,
      "Link",
      $(
        go.Shape,
        // isPanelMain declares that this Shape shares the Link.geometry // isPanelMain声明这个Shape共享Link.geometry
        {
          isPanelMain: true,
          fill: null,
          stroke: "deepskyblue",
          strokeWidth: 0,
        }
      ) // use selection object's strokeWidth //使用选择对象的strokeWidth
    );

    myDiagram.linkTemplate = $(
      go.Link, // the whole link panel //整个链接面板
      {
        selectable: true,
        selectionAdornmentTemplate: linkSelectionAdornmentTemplate,
      },
      { relinkableFrom: true, relinkableTo: true, reshapable: true },
      {
        routing: go.Link.AvoidsNodes,
        curve: go.Link.JumpOver,
        corner: 5,
        toShortLength: 4,
      },
      new go.Binding("points").makeTwoWay(),

      $(
        go.Panel,
        "Auto",
        {
          segmentIndex: -2,
          // segmentOffset: new go.Point(NaN, NaN),
          segmentOrientation: go.Link.OrientUpright,
          // segmentIndex: NaN,
          segmentFraction: 0.4,
        },

        // this whole Panel is a link label
        // $(go.Shape,  geoFunc, { fill: "yellow", stroke: "gray" }),
        // $(go.Shape, "TenPointedStar", { fill: "yellow", stroke: "gray" }),
        // $(
        //   go.Shape,
        //   { margin: 3, fill: colors["white"], strokeWidth: 0 },
        //   new go.Binding("geometry", "geo", geoFunc)
        // ),

        $(
          go.TextBlock,
          // {
          //     color:'red',
          // },
          // { margin: 5 },

          // Shape.fill is bound to Node.data.color
          // new go.Binding("fill", "color"),
          // this binding changes the Shape.fill when Node.isHighlighted changes value
          // new go.Binding("fill", "isHighlighted", function (h, shape) {
          //   console.log("h==", h);
          //   debugger;
          //   if (h) return "red";
          //   var c = shape.part.data.color;

          //   return c ? c : "white";
          // }).ofObject(),

          {
            // fill: "white" ,

            click: () => {
              console.log("click=");
            },
            // drag: () => {
            //   console.log("drag=");
            // },
            // dragstart: () => {
            //   console.log("dragstart=");
            // },
            // dragend: () => {
            //   console.log("dragend=");
            // },
            // dragover: () => {
            //   console.log("dragover=");
            // },
            // dragenter: () => {
            //   console.log("dragenter=");
            // },
            // dragleave: () => {
            //   console.log("dragleave=");
            // },
            // drop: () => {
            //   console.log("drop=");
            // },
            mouseEnter: () => {
              console.log("mouseEnter=");
            },
            mouseLeave: () => {
              console.log("mouseLeave=");
            },

            //FontAwesome
            text: "\uf055", // 文本内容 FontAwesome 图标
            font: "20pt FontAwesome",
          },

          new go.Binding("fill", "isHighlighted", function (h, shape) {
            console.log("h====", h);

            if (h) {
              const data = shape.part.data;
              _this.data.highlightedData = data;
              // 获取线的数据
              console.log("data========", data);
              return "red";
            } else {
              this.data.highlightedData = null;
              return "white";
              // return c ? c : "white";
            }
          }).ofObject()
        )

        //  $(go.TextBlock, {
        //     //FontAwesome
        //    text: "\ue63a", // 文本内容 阿里图标
        //    font: "10pt iconfont",
        //  }),
        // // $(go.Part, $(go.Picture, cat)),
        // $(go.TextBlock, { margin: 3 }, new go.Binding("text", "text"))
      ),
      $(
        go.Shape, // the link path shape //链接路径形状
        { isPanelMain: true, strokeWidth: 2 }
      ),
      $(
        go.Shape, // the arrowhead //箭头
        { toArrow: "Standard", stroke: null }
      ),
      $(
        go.Panel,
        "Auto",
        new go.Binding("visible", "isSelected").ofObject(),
        $(
          go.Shape,
          "RoundedRectangle", // the link shape //链接形状
          { fill: "#F8F8F8", stroke: null }
        ),
        $(
          go.TextBlock,
          {
            textAlign: "center",
            font: "10pt helvetica, arial, sans-serif",
            stroke: "#919191",
            margin: 2,
            minSize: new go.Size(10, NaN),
            editable: true,
          },
          new go.Binding("text").makeTwoWay()
        )
      )
    );
  };

  // 加载json 数据
  load = (json) => {
    const $ = this.$;

    console.log("json========", json);
    json = {
      ...json,
      // automatically update the model that is shown on this page
      Changed: function (e) {
        //
        // if (e.isTransactionFinished) console.log("Changed======");
        // showModel();
      },
    };
    // delete json.class;
    this.myDiagram.layout = new go.Layout();
    // this.myDiagram.model = go.Model.fromJson(
    //   json
    //   // document.getElementById("mySavedModel").value
    // );
    // this.myDiagram.layout = new go.Layout();
    // // this.myDiagram.model = $(go.GraphLinksModel, json);
    const { nodeDataArray, linkDataArray } = json;
    this.myDiagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);
    // this.loadDiagramProperties(); // do this after the Model.modelData has been brought into memory 在模型之后这样做。modelData已被带入内存
  };
  // 添加节点
  addNode = (data) => {
    this.myDiagram.model.addNodeData({
      // xy: `${point.x} ${point.y}`,
      // location: point,
      // text: event.dataTransfer.getData("text"),
      // color: "lightyellow",
    });
  };
  //鼠标放上去显示影藏端口
  showSmallPorts = (node, show) => {
    node.ports.each(function (port) {
      if (port.portId !== "") {
        // don't change the default port, which is the big shape //不改变默认端口，这是一个大的形状
        port.fill = show ? "rgba(0,0,0,.3)" : null;
      }
    });
  };
  // 在模型之后这样做。modelData已被带入内存
  loadDiagramProperties = (e) => {
    const myDiagram = this.myDiagram;
    // 设置图。initialPosition,不是图。位置，以处理初始化的副作用
    // set Diagram.initialPosition, not Diagram.position, to handle initialization side-effects
    var pos = myDiagram.model.modelData.position;
    if (pos) {
      myDiagram.initialPosition = go.Point.parse(pos);
    }
  };
  // 保存JSON
  save = () => {
    this.saveDiagramProperties(); // do this first, before writing to JSON 在写JSON之前先做这个
    // document.getElementById("mySavedModel").value
    //  =
    const Json = this.myDiagram.model.toJson();
    this.myDiagram.isModified = false;
    return Json;
  };
  saveDiagramProperties = () => {
    this.myDiagram.model.modelData.position = go.Point.stringify(
      this.myDiagram.position
    );
  };
  componentDidMount() {
    this.documentDrag();
    this.divDrag();
    // this.init();
    // //添加拖拽事件
    // this.documentDrag();
    // this.divDrag();
    // this.setNodeTemplate();
    // this.setLinkTemplate();
    // let uuid = this.getUuid();
    // this.load({
    //   class: "GraphLinksModel",
    //   // linkFromPortIdProperty: "fromPort",
    //   // linkToPortIdProperty: "toPort",
    //   // modelData: { position: "-890.5 5.717602539062497" },
    //   nodeDataArray: [
    //     {
    //       xy: "0 50",
    //       topText: "开始",
    //       rightText: "每月每日",
    //       icon: "data:image/jpeg;base64,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",
    //       key: -1,
    //       parentUuid: null,
    //       // loc: "0 40",
    //     },
    //     {
    //       xy: "0 250",
    //       topText: "开始",
    //       rightText: "每月每日",
    //       icon: "data:image/jpeg;base64,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",
    //       key: -1,
    //       // loc: "0 40",
    //     },
    //   ],
    //   linkDataArray: [
    //     {
    //       from: -1,
    //       points: [
    //         0, 89.2823974609375, -1, 139.64119873046874, -1, 180, -1, 190,
    //       ],
    //     },
    //   ],
    // });
    setInterval(() => {
      this.textareaRef.innerHTML = this.save();
    }, 5000);
    this.textareaRef.innerHTML = this.save();
  }
  initDiagram = () => {
    const $ = go.GraphObject.make;

    this.$ = $;
    let myDiagram = null;
    // 获取myDiagram
    this.myDiagram = myDiagram = $(go.Diagram, {
      "undoManager.isEnabled": true, // enable undo & redo
      "clickCreatingTool.archetypeNodeData": {
        text: "new node",
        color: "lightblue",
      },
      model: $(go.GraphLinksModel, {
        linkKeyProperty: "key", // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
      }),
    });
    this.setNodeTemplate();
    this.setLinkTemplate();

    // // define a simple Node template
    // diagram.nodeTemplate = $(
    //   go.Node,
    //   "Auto", // the Shape will go around the TextBlock
    //   new go.Binding("location", "loc", go.Point.parse).makeTwoWay(
    //     go.Point.stringify
    //   ),
    //   $(
    //     go.Shape,
    //     "RoundedRectangle",
    //     { name: "SHAPE", fill: "white", strokeWidth: 0 },
    //     // Shape.fill is bound to Node.data.color
    //     new go.Binding("fill", "color")
    //   ),
    //   $(
    //     go.TextBlock,
    //     { margin: 8, editable: true }, // some room around the text
    //     new go.Binding("text").makeTwoWay()
    //   )
    // );

    return myDiagram;
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };
  render() {
    const { nodeDataArray, linkDataArray } = this.state;
    return (
      <div>
        <LeftDrawer>
          <div className="menu">
            <div id="paletteZone">
              <div text="Water" className="draggable" draggable="true">
                Water
              </div>
              <div text="Coffee" className="draggable" draggable="true">
                Coffee
              </div>
              <div text="Tea" className="draggable" draggable="true">
                Tea
              </div>
            </div>
            <ul className="">
              <li draggable="true" className="draggable">
                <img
                  text="短信"
                  className="draggable"
                  draggable="true"
                  src={sms}
                />
                <div>短信</div>
              </li>
              <li>
                <img
                  text="模板信息"
                  className="draggable"
                  draggable="true"
                  src={modeltplate}
                />
                <div> 模板信息</div>
              </li>
              <li>
                <img
                  text="发券"
                  className="draggable"
                  draggable="true"
                  src={quan}
                />
                <div> 发券</div>
              </li>
            </ul>
          </div>
        </LeftDrawer>
        {/*    <i className="fa fa-plus-circle" aria-hidden="true"></i>*/}
        <div className="diagram-box">
          <div>
            {/*   <div
              id="myPaletteDiv"
              style={{
                width: "105px",
                marginRight: "2px",
                backgroundColor: " whitesmoke",
                border: "solid 1px black",
              }}
            ></div>

      
            <div
              id="myDiagramDiv"
              style={{
                border: "solid 1px blue",
                width: "1500px",
                height: "800px",
              }}
            ></div>
            */}
            <ReactDiagram
              initDiagram={this.initDiagram}
              ref={(ref) => {
                this.diagramRef = ref;
              }}
              divClassName="diagram-component"
              nodeDataArray={nodeDataArray}
              linkDataArray={linkDataArray}
              onModelChange={() => {}}
            />
          </div>

          <Button
            onClick={() => {
              this.myDiagram.commandHandler.zoomToFit();
            }}
          >
            {" "}
            Zoom to Fit
          </Button>
          <Button
            onClick={() => {
              // this.myDiagram.commandHandler.zoomToFit();
              this.myDiagram.scale = 1;
              this.myDiagram.commandHandler.scrollToPart(
                this.myDiagram.findNodeForKey(1)
              );
            }}
          >
            Center on root
          </Button>
          <div>
            <textarea
              id="mySavedModel"
              ref={(ref) => {
                this.textareaRef = ref;
              }}
              cols="200"
              rows="100"
            ></textarea>
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
