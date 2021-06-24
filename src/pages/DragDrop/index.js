/*
 * @Author: your name
 * @Date: 2021-06-16 17:24:20
 * @LastEditTime: 2021-06-24 15:52:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /antd-rcfom/src/pages/LogicFlow/index.js
 */
import React, { Component } from "react";
import "./index.less";
import { Icon, Input, Button, Checkbox, Drawer } from "antd";
import * as go from "gojs";
import LeftDrawer from "@/component/LeftDrawer";
// import icons from "./icons.js";
import cat from "@/image/cat.jpeg";
import "@/css/font-awesome-4.7.0/css/font-awesome.css";
import "@/css/font_ alibaba/iconfont.css";
import "@/css/font_ alibaba/iconfont.css";
import sms from "@/image/sms.jpg";
import modeltplate from "@/image/modeltplate.jpg";
import quan from "@/image/quan.jpg";
import start from "@/image/start.jpg";
import "./index.less";

// console.log("start=", start);

function toLocation(data, node) {
  // console.log("data.x=====", data.x);
  // console.log("data.y=====", data.y);
  return new go.Point(data.x, data.y);
}

function fromLocation(xy, data, model) {
  // console.log("xy.x=====", data.x);
  // console.log("xy.y=====", data.y);
  model.setDataProperty(data, "x", xy.x);
  model.setDataProperty(data, "y", xy.y);
}

// function geoFunc(geoname) {
//   // var geo = icons[geoname];
//   // if (geo === undefined) geo = icons["heart"]; // use this for an unknown icon name
//   // if (typeof geo === "string") {
//   //   geo = icons[geoname] = go.Geometry.parse(geo, true); // fill each geometry
//   // }
//   // console.log("geo=", geo);
//   // return geo;
// }

class Index extends React.Component {
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
        event.dataTransfer.setData("text", event.target.textContent);

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
    var div = document.getElementById("myDiagramDiv");
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
            console.log("curnode=====", curnode);
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
        // console.log("this=======", this);
        // Dragging onto a Diagram
        if (this === _this.myDiagram.div && _this.isCollision && go.TextBlock) {
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
          _this.myDiagram.model.addNodeData({
            xy: `${point.x} ${point.y}`,
            // location: point,
            text: event.dataTransfer.getData("text"),
            color: "lightyellow",
          });
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
  init = () => {
    var _this = this;
    var $ = go.GraphObject.make; // for conciseness in defining templates
    let myDiagram = null;
    this.isCollision = false; // 是否碰撞
    this.myDiagram = myDiagram = $(
      go.Diagram,
      "myDiagramDiv", // create a Diagram for the DIV HTML element

      {
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
          var node = go.ClickCreatingTool.prototype.insertPart.call(this, loc);
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
      }
    );

    //添加事件
    this.documentDrag();
    this.divDrag();

    myDiagram.nodeTemplate = $(
      go.Node,
      // "Horizontal",
      "Table",
      // { background: "#44CCFF" },

      // 端口
      $(
        go.Panel,
        "Horizontal",
        { column: 1, row: 0 },
        $(
          go.Shape, // the "A" port
          {
            width: 6, //  端口样式大小
            height: 6, // 端口样式大小
            portId: "Input",
            toSpot: go.Spot.Top,
            toLinkable: true, //属性设置为true允许用户以交互方式在端口之间绘制新链接。
            toMaxLinks: 1,
          }
        ), // allow user-drawn links from here
        $(go.TextBlock, "Input") // "A" port label
      ),

      $(
        go.Panel,
        "Horizontal",
        {
          column: 1,
          row: 4,
          // rowSpan: 2
        },
        $(go.TextBlock, "out"), // "Out" port label
        $(
          go.Shape, // the "Out" port
          {
            width: 6,
            height: 6,
            portId: "Out",
            fromSpot: go.Spot.Bottom,
            fromLinkable: true, //属性设置为true允许用户以交互方式在端口之间绘制新链接。
          }
        ) // allow user-drawn links to here
      ),

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
      // 位置 
      // { locationSpot: go.Spot.Center },
      // new go.Binding("location"),
      new go.Binding("location", "xy", go.Point.parse),

      // $(
      //   go.Shape,
      //   "Rectangle",
      //   { fill: "white" },
      //   // Shape.fill is bound to Node.data.color
      //   new go.Binding("fill", "color"),
      //   // this binding changes the Shape.fill when Node.isHighlighted changes value
      //   new go.Binding("fill", "isHighlighted", function (h, shape) {
      //     if (h) return "red";
      //     var c = shape.part.data.color;

      //     return c ? c : "white";
      //   }).ofObject()
      // ), // binding source is Node.isHighlighted
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

      // topText: "topText",
      // buttomText: "buttomText",
      // rightText: "rightText",
      // leftText: "leftText",
      // rightTopText: "rightTopText",
      // rightButtomText: "rightButtomText",
      // leftButtomText: "leftButtomText",
      // lrftTopText: "lrftTopText",
    );

    var linkSelectionAdornmentTemplate = $(
      go.Adornment,
      "Link"
      // { locationSpot: go.Spot.Center },
      // new go.Binding("location"),
      // $(
      //   go.Shape,
      //   // isPanelMain declares that this Shape shares the Link.geometry
      //   {
      //     isPanelMain: true,
      //     // fill: null,
      //     stroke: "deepskyblue",
      //     strokeWidth: 0,
      //     fill: "white",
      //   },
      //   // { fill: "white" },
      //   // Shape.fill is bound to Node.data.color
      //   new go.Binding("fill", "color"),
      //   // this binding changes the Shape.fill when Node.isHighlighted changes value
      //   new go.Binding("fill", "isHighlighted", function (h, shape) {
      //     debugger
      //     if (h) return "red";
      //     var c = shape.part.data.color;

      //     return c ? c : "white";
      //   }).ofObject()
      // ) // use selection object's strokeWidth
    );
    // 连线之后自动布局
    // myDiagram.layout = $(go.LayeredDigraphLayout, { columnSpacing: 10 });
    myDiagram.linkTemplate = $(
      go.Link, // the whole link panel

      {
        selectable: true, //是否被选中
        selectionAdornmentTemplate: linkSelectionAdornmentTemplate,
      },
      {
        relinkableFrom: true,
        relinkableTo: true,
        reshapable: true,
      },
      {
        // routing: go.Link.AvoidsNodes,
        routing: go.Link.Orthogonal,
        curve: go.Link.JumpOver,
        // routing: go.Link.Orthogonal,
        // curve: go.Link.JumpOver,
        corner: 10,
        toShortLength: 20,
      },

      // { locationSpot: go.Spot.Center },
      // new go.Binding("location"),
      // $(go.Shape, { figure: "RoundedRectangle", fill: "white" }),
      //碰撞事件
      $(
        go.Shape,
        "RoundedRectangle"
        // {
        //   figure: "RoundedRectangle",
        //   fill: "red",
        //   width: 300,
        //   height: 300,
        // },
        // Shape.fill is bound to Node.data.color
        // new go.Binding("fill", "color"),
        // this binding changes the Shape.fill when Node.isHighlighted changes value
        // new go.Binding("fill", "isHighlighted", function (h, shape) {
        //   console.log("h=====", h);
        //   if (h) return "red";
        //   return c ? c : "white";
        // }).ofObject()
      ), // binding source is Node.isHighlighted

      // 位置
      new go.Binding("points").makeTwoWay(),
      // new go.Binding("location", "loc", go.Point.parse).makeTwoWay(
      //   go.Point.stringify
      // ),
      // new go.Binding("location", "", toLocation).makeTwoWay(fromLocation),
      // $(
      //   go.Shape, // the link path shape
      //   {
      //     isPanelMain: true,
      //     strokeWidth: 2,
      //   }
      // ),
      // $(go.Shape, { toArrow: "Standard", scale:1.5 }), // bigger arrowhead 设置箭头大小
      { toShortLength: 6 }, // shortens path to avoid interfering with arrowhead 线与箭头的位置
      // $(go.Shape, { strokeWidth: 8 }), // thick path 线大小
      $(go.Shape, { toArrow: "Standard", scale: 1 }), // bigger arrowhead 箭头大小
      // 箭头设置
      // $(go.Shape, { toArrow: "Standard" }),
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
            if (h) {
              console.log("shape==", shape);
              console.log("h=====", h);
              //  shape.part.data.color;
              _this.isCollision = true;
              debugger;
              return "red";
            } else {
              return c ? c : "white";
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
      // $(go.TextBlock, "to", { segmentIndex: 1, segmentFraction: 0.8 }),

      $(
        go.Shape, // the arrowhead
        { toArrow: "Standard", stroke: null }
      ),
      $(
        go.Panel,
        "Auto",
        // 选中才会显示
        // new go.Binding("visible", "isSelected").ofObject(),
        $(
          go.Shape,
          "RoundedRectangle", // the link shape
          { fill: "#ccc", stroke: null }
        ),
        $(
          go.TextBlock,
          {
            textAlign: "center",
            font: "10pt helvetica, arial, sans-serif",
            stroke: "white",
            margin: 2,
            minSize: new go.Size(10, NaN),
            editable: true,
          },
          new go.Binding("text").makeTwoWay()
        )
      )
    );

    // but use the default Link template, by not setting Diagram.linkTemplate

    // create the model data that will be represented by Nodes and Links
    myDiagram.model = $(go.GraphLinksModel, {
      linkFromPortIdProperty: "fromPort", // required information:
      linkToPortIdProperty: "toPort", // identifies data property names
      nodeDataArray: [
        // {
        //   text: "Alpha",
        //   color: "lightblue",
        //   xy: "0 0",
        //   topText: "topText",
        //   buttomText: "buttomText",
        //   rightText: "rightText",
        //   leftText: "leftText",
        //   rightTopText: "rightTopText",
        //   rightButtomText: "rightButtomText",
        //   leftButtomText: "leftButtomText",
        //   lrftTopText: "lrftTopText",
        //   source: start,
        // },
        {
          xy: "0 0",
          topText: "开始",
          // buttomText: "buttomText",
          rightText: "每月每日",
          // leftText: "leftText",
          // rightTopText: "rightTopText",
          // rightButtomText: "rightButtomText",
          // leftButtomText: "leftButtomText",
          // lrftTopText: "lrftTopText",
          icon: start,
        },
        {
          text: "Gamma",
          color: "lightgreen",
          xy: "0 100",
          topText: "topText",
          buttomText: "buttomText",
          rightText: "rightText",
          leftText: "leftText",
          rightTopText: "rightTopText",
          rightButtomText: "rightButtomText",
          leftButtomText: "leftButtomText",
          lrftTopText: "lrftTopText",
          name: "name",
        },
        {
          text: "Delta",
          color: "pink",
          xy: "0 200",
          topText: "topText",
          buttomText: "buttomText",
          rightText: "rightText",
          leftText: "leftText",
          rightTopText: "rightTopText",
          rightButtomText: "rightButtomText",
          leftButtomText: "leftButtomText",
          lrftTopText: "lrftTopText",
          name: "name",
        },
        {
          text: "Delta",
          color: "pink",
          xy: "0 300",
          topText: "topText",
          buttomText: "buttomText",
          rightText: "rightText",
          leftText: "leftText",
          rightTopText: "rightTopText",
          rightButtomText: "rightButtomText",
          leftButtomText: "leftButtomText",
          lrftTopText: "lrftTopText",
          name: "name",
        },
        {
          text: "Delta",
          color: "pink",
          xy: "0 400",
          topText: "topText",
          buttomText: "buttomText",
          rightText: "rightText",
          leftText: "leftText",
          rightTopText: "rightTopText",
          rightButtomText: "rightButtomText",
          leftButtomText: "leftButtomText",
          lrftTopText: "lrftTopText",
          name: "name",
        },
        {
          text: "Delta",
          color: "pink",
          xy: "0 500",
          topText: "topText",
          buttomText: "buttomText",
          rightText: "rightText",
          leftText: "leftText",
          rightTopText: "rightTopText",
          rightButtomText: "rightButtomText",
          leftButtomText: "leftButtomText",
          lrftTopText: "lrftTopText",
          name: "name",
        },
      ],
      linkDataArray: [
        {
          color: "#2a6dc0",
          geo: "file",
          points: [45, 20, 200, 20],
          uuid: "123123321324qafqwef",
        },
      ],
    });
    this.myDiagram.commandHandler.zoomToFit();
    setInterval(() => {
      var modelAsText = myDiagram.model.toJson();
      // console.log("modelAsText==", modelAsText);

      this.textareaRef.innerHTML = modelAsText;

      // console.log("this.textareaRef=====", this.textareaRef);
    }, 3000);
  };
  componentDidMount() {
    this.init();
    // window.PIXELRATIO = myDiagram.computePixelRatio(); // constant needed to determine mouse coordinates on the canvas

    // function init() {
    //   // Next, events intended for the drop target - the Diagram div

    //   // *********************************************************
    //   // Second, set up a GoJS Diagram
    //   // *********************************************************

    //   // var $ = go.GraphObject.make;  // for conciseness in defining templates

    //   // myDiagram = $(go.Diagram, "myDiagramDiv",  // create a Diagram for the DIV HTML element
    //   //   {
    //   //     "undoManager.isEnabled": true
    //   //   });
    //   // window.PIXELRATIO = myDiagram.computePixelRatio(); // constant needed to determine mouse coordinates on the canvas

    //   // topText: "topText",
    //   // buttomText: "buttomText",
    //   // rightText: "rightText",
    //   // leftText: "leftText",
    //   // rightTopText: "rightTopText",
    //   // rightButtomText: "rightButtomText",
    //   // leftButtomText: "leftButtomText",
    //   // lrftTopText: "lrftTopText",
    //   // define a simple Node template

    //   // new go.GraphLinksModel(
    //   //   [
    //   //     // {
    //   //     //   text: "Alpha",
    //   //     //   color: "lightblue",
    //   //     //   xy: "0 0",
    //   //     //   topText: "topText",
    //   //     //   buttomText: "buttomText",
    //   //     //   rightText: "rightText",
    //   //     //   leftText: "leftText",
    //   //     //   rightTopText: "rightTopText",
    //   //     //   rightButtomText: "rightButtomText",
    //   //     //   leftButtomText: "leftButtomText",
    //   //     //   lrftTopText: "lrftTopText",
    //   //     //   source: start,
    //   //     // },
    //   //     {
    //   //       text: "Beta",
    //   //       color: "orange",
    //   //       xy: "0 0",
    //   //       topText: "topText",
    //   //       buttomText: "buttomText",
    //   //       rightText: "rightText",
    //   //       leftText: "leftText",
    //   //       rightTopText: "rightTopText",
    //   //       rightButtomText: "rightButtomText",
    //   //       leftButtomText: "leftButtomText",
    //   //       lrftTopText: "lrftTopText",
    //   //       icon: start,
    //   //     },
    //   //     {
    //   //       text: "Gamma",
    //   //       color: "lightgreen",
    //   //       xy: "0 200",
    //   //       topText: "topText",
    //   //       buttomText: "buttomText",
    //   //       rightText: "rightText",
    //   //       leftText: "leftText",
    //   //       rightTopText: "rightTopText",
    //   //       rightButtomText: "rightButtomText",
    //   //       leftButtomText: "leftButtomText",
    //   //       lrftTopText: "lrftTopText",
    //   //       name: "name",
    //   //     },
    //   //     {
    //   //       text: "Delta",
    //   //       color: "pink",
    //   //       xy: "0 300",
    //   //       topText: "topText",
    //   //       buttomText: "buttomText",
    //   //       rightText: "rightText",
    //   //       leftText: "leftText",
    //   //       rightTopText: "rightTopText",
    //   //       rightButtomText: "rightButtomText",
    //   //       leftButtomText: "leftButtomText",
    //   //       lrftTopText: "lrftTopText",
    //   //       name: "name",
    //   //     },
    //   //   ],
    //   //   [
    //   //     {
    //   //       color: "#2a6dc0",
    //   //       geo: "file",
    //   //       points: [45, 20, 200, 20],
    //   //       uuid: "123123321324qafqwef",
    //   //     },
    //   //   ]
    //   // );
    // }
    // init();

    // window.addEventListener('DOMContentLoaded', init);
  }
  onClose = () => {
    this.setState({
      visible: false,
    });
  };
  render() {
    return (
      <div>
        <LeftDrawer>
          <div className="menu">
            <div id="paletteZone">
              <div textcontent="Water" className="draggable" draggable="true">
                Water
              </div>
              <div textcontent="Coffee" className="draggable" draggable="true">
                Coffee
              </div>
              <div textcontent="Tea" className="draggable" draggable="true">
                Tea
              </div>
            </div>
            <ul className="">
              <li draggable="true" className="draggable">
                <img
                  textcontent="短信"
                  className="draggable"
                  draggable="true"
                  src={sms}
                />
                <div>短信</div>
              </li>
              <li>
                <img
                  textcontent="模板信息"
                  className="draggable"
                  draggable="true"
                  src={modeltplate}
                />
                <div> 模板信息</div>
              </li>
              <li>
                <img
                  textcontent="发券"
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
          <div
            id="myDiagramDiv"
            style={{
              border: "solid 1px blue",
              width: "1500px",
              height: "800px",
            }}
          ></div>
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
