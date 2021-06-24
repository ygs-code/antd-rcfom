/*
 * @Author: your name
 * @Date: 2021-06-16 17:24:20
 * @LastEditTime: 2021-06-23 10:56:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /antd-rcfom/src/pages/LogicFlow/index.js
 */
import React, { Component } from "react";
import "./index.less";
import { Icon, Input, Button, Checkbox, Drawer } from "antd";
import * as go from "gojs";
import LeftDrawer from "@/component/LeftDrawer";
import icons from "./icons.js";
import cat from "@/image/cat.jpeg";
import "@/css/font-awesome-4.7.0/css/font-awesome.css";
import "@/css/font_ alibaba/iconfont.css";
import "@/css/font_ alibaba/iconfont.css";
import sms from "@/image/sms.jpg";
import modeltplate from "@/image/modeltplate.jpg";
import quan from "@/image/quan.jpg";
import "./index.less";

function toLocation(data, node) {
  console.log("data.x=====", data.x);
  console.log("data.y=====", data.y);
  return new go.Point(data.x, data.y);
}

function fromLocation(loc, data, model) {
  console.log("loc.x=====", data.x);
  console.log("loc.y=====", data.y);
  model.setDataProperty(data, "x", loc.x);
  model.setDataProperty(data, "y", loc.y);
}

function geoFunc(geoname) {
  var geo = icons[geoname];
  if (geo === undefined) geo = icons["heart"]; // use this for an unknown icon name
  if (typeof geo === "string") {
    geo = icons[geoname] = go.Geometry.parse(geo, true); // fill each geometry
  }
  console.log("geo=", geo);
  return geo;
}

class Index extends React.Component {
  componentDidMount() {
    var colors = {
      blue: "#2a6dc0",
      orange: "#ea2857",
      green: "#1cc1bc",
      gray: "#5b5b5b",
      white: "#F5F5F5",
    };
    var $ = go.GraphObject.make;
    // var diagram = new go.Diagram(
    //   "myDiagramDiv",
    //   {
    //     "undoManager.isEnabled": true,
    //   }
    // );
    var diagram = $(
      go.Diagram,
      "myDiagramDiv", // create a Diagram for the DIV HTML element
      {
        "undoManager.isEnabled": true,
      }
    );
    window.PIXELRATIO = diagram.computePixelRatio();

    diagram.nodeTemplate = $(
      go.Node,
      "Auto",
      new go.Binding("location", "loc", go.Point.parse),
      $(go.Shape, "RoundedRectangle", { fill: "lightgray" }),
      $(
        go.TextBlock,
        { margin: 0, width: 40, height: 30 },
        new go.Binding("text", "key")
      ),
      $(
        go.Panel,
        "Horizontal",
        { column: 0, row: 1 },
        $(
          go.Shape, // the "A" port
          { width: 6, height: 6, portId: "A", toSpot: go.Spot.Left }
        ),
        $(go.TextBlock, "A") // "A" port label
      ),
    );

    // diagram.linkTemplate = $(
    //   go.Link,
    //   $(go.Shape), // the link shape
    //   new go.Binding("points").makeTwoWay(),
    //   $(
    //     go.Shape, // the arrowhead
    //     { toArrow: "OpenTriangle", fill: null }
    //   )
    // );

    var linkSelectionAdornmentTemplate = $(
      go.Adornment,
      "Link",
      $(
        go.Shape,
        // isPanelMain declares that this Shape shares the Link.geometry
        { isPanelMain: true, fill: null, stroke: "deepskyblue", strokeWidth: 0 }
      ) // use selection object's strokeWidth
    );

    diagram.linkTemplate = $(
      go.Link, // the whole link panel
      {
        selectable: false, //是否被选中
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
      // new go.Binding("location", "loc", go.Point.parse).makeTwoWay(
      //   go.Point.stringify
      // ),
      // new go.Binding("location", "", toLocation).makeTwoWay(fromLocation),
      $(
        go.Shape, // the link path shape
        { isPanelMain: true, strokeWidth: 2 }
      ),
      $(go.Shape, { toArrow: "Standard" }),
      $(
        go.Panel,
        "Auto", // this whole Panel is a link label
        // $(go.Shape,  geoFunc, { fill: "yellow", stroke: "gray" }),
        // $(go.Shape, "TenPointedStar", { fill: "yellow", stroke: "gray" }),
        // $(
        //   go.Shape,
        //   { margin: 3, fill: colors["white"], strokeWidth: 0 },
        //   new go.Binding("geometry", "geo", geoFunc)
        // ),
        
        $(go.TextBlock, 
          {
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
          text: "\uf030", // 文本内容 FontAwesome 图标
          font: "20pt FontAwesome",
        })

        //  $(go.TextBlock, {
        //     //FontAwesome
        //    text: "\ue63a", // 文本内容 阿里图标
        //    font: "10pt iconfont",
        //  }),
        // // $(go.Part, $(go.Picture, cat)),
        // $(go.TextBlock, { margin: 3 }, new go.Binding("text", "text"))
      ),
      $(
        go.Shape, // the arrowhead
        { toArrow: "Standard", stroke: null }
      ),
      $(
        go.Panel,
        "Auto",
        new go.Binding("visible", "isSelected").ofObject(),
        $(
          go.Shape,
          "RoundedRectangle", // the link shape
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

    var nodeDataArray = [
      {
        uuid: "123123321324qafqwef",
        key: "Alpha",
        loc: "0 0",
        text: "hellsdfo!",
        links: {
          linksArr: [
            {
              // text: "hffellsdffsdfo!",
              geo: "file",
              color: colors["blue"],
              points: [
                45, // 开始点x
                20, // 开始点y
                //  -0, 0, -311, 60, -311, 61, -229.5, 61, //多少个点多少个转折点
                200, // 结束点x
                20, // 结束点y
                // 100, // 结束点x
                // 100, // 结束点y
              ],
            },
            // {
            //   // text: "hffel324lsdffsdfo!",
            //   geo: "alarm",
            //   color: colors["orange"],
            //   points: [
            //     0, // 开始点x
            //     0, // 开始点y
            //     //  -0, 0, -311, 60, -311, 61, -229.5, 61, //多少个点多少个转折点
            //     100, // 结束点x
            //     0, // 结束点y
            //     100, // 结束点x
            //     100, // 结束点y
            //   ],
            // },
          ],
        },
      },
      {
        uuid: "asdfsdf32453245twgsdv",
        key: "Beta",
        loc: "100 50",
        text: "hello!",
        links: {
          linksArr: [
            // {
            //   // text: "hellsdfo!",
            //   geo: "lab",
            //   color: colors["blue"],
            //   points: [
            //     0, // 开始点x
            //     0, // 开始点y
            //     //  -0, 0, -311, 60, -311, 61, -229.5, 61, //多少个点多少个转折点
            //     100, // 结束点x
            //     0, // 结束点y
            //     100, // 结束点x
            //     100, // 结束点y
            //   ],
            // },
            // {
            //   // text: "hffellsdfo!",
            //   geo: "earth",
            //   color: colors["blue"],
            //   points: [-382, 413, -352, 413, -352, 453, -322, 453],
            // },
          ],
        },
      },
    ];

    const newLinkDataArray = nodeDataArray.reduce((acc, item) => {
      const { uuid, links: { linksArr = [] } = {} } = item;
      for (let [index, _item] of linksArr.entries()) {
        console.log("index=", index);
        linksArr[index].uuid = uuid;
      }
      acc = [...acc, ...linksArr];
      return acc;
    }, []);

    // console.log('newLinkDataArray=',newLinkDataArray)
    var linkDataArray = [
      { key: 1, items: ["one", "two", "three"] },
      {
        from: -1,
        fromPort: "R",
        toPort: "",
        loc: "100 50",
        points: [
          0, // 开始点x
          0, // 开始点y
          //  -0, 0, -311, 60, -311, 61, -229.5, 61, //多少个点多少个转折点
          100, // 结束点x
          0, // 结束点y
          100, // 结束点x
          100, // 结束点y
        ],
      },
      { points: [-382, 413, -352, 413, -352, 453, -322, 453] },
    ];
    console.log('newLinkDataArray===',newLinkDataArray)
    diagram.model = new go.GraphLinksModel(nodeDataArray, newLinkDataArray);

    var dragged = null; // A reference to the element currently being dragged

    /* 可拖动的目标元素会触发事件 */
    document.addEventListener(
      "drag",
      function (event) {
        // console.log('drag=',event)
        // console.log(
        //   "event.dataTransfer.getData=",
        //   event.dataTransfer.getData("text")
        // );
      },
      false
    );

    document.addEventListener(
      "dragstart",
      function (event) {
        if (event.target.className !== "draggable") return;
        // Some data must be set to allow drag
        event.dataTransfer.setData("text", event.target.textContent);

        // store a reference to the dragged element and the offset of the mouse from the center of the element
        dragged = event.target;
        dragged.offsetX = event.offsetX - dragged.clientWidth / 2;
        dragged.offsetY = event.offsetY - dragged.clientHeight / 2;
        // Objects during drag will have a red border
        event.target.style.border = "2px solid red";
      },
      false
    );

    // 结束
    document.addEventListener(
      "dragend",
      function (event) {
        dragged.style.border = "";
        // console.log("dragend=", event);
        // 重置透明度
        // event.target.style.opacity = "";
        // console.log(' event.dataTransfer=', event.dataTransfer)
        // console.log(
        //   "event.dataTransfer.getData=",
        //   event.dataTransfer.getData("text")

        // );
        // event.dataTransfer.clearData();
      },
      false
    );

    // /* 放下目标节点时触发事件 */
    // document.addEventListener(
    //   "dragover",
    //   function (event) {
    //     // console.log('dragover=',event)
    //     // 阻止默认动作
    //     event.preventDefault();
    //   },
    //   false
    // );

    document.addEventListener(
      "dragenter",
      function (event) {
        // console.log('dragenter=',event)
        // 当可拖动的元素进入可放置的目标高亮目标节点
        // if (event.target.className == "dropzone") {
        //   event.target.style.background = "purple";
        // }
      },
      false
    );

    document.addEventListener(
      "dragleave",
      function (event) {
        // console.log('dragleave=',event)
        // 当拖动元素离开可放置目标节点，重置其背景
        if (event.target.className == "dropzone") {
          event.target.style.background = "";
        }
      },
      false
    );

    // // 移动拖动的元素到所选择的放置目标节点
    // document.addEventListener(
    //   "drop",
    //   function (event) {
    //     console.log("drop=", event.target);
    //     // 阻止默认动作（如打开一些元素的链接）
    //     event.preventDefault();
    //     console.log(
    //       "event.dataTransfer.getData=",
    //       event.dataTransfer.getData("text")
    //     );
    //     console.log("this==", this);
    //     // if (this === diagram.div) {
    //     var can = event.target;
    //     var pixelratio = window.PIXELRATIO;

    //     // if the target is not the canvas, we may have trouble, so just quit:
    //     if (!(can instanceof HTMLCanvasElement)) return;

    //     var bbox = can.getBoundingClientRect();
    //     var bbw = bbox.width;
    //     if (bbw === 0) bbw = 0.001;
    //     var bbh = bbox.height;
    //     if (bbh === 0) bbh = 0.001;
    //     var mx =
    //       event.clientX -
    //       bbox.left * (can.width / pixelratio / bbw) -
    //       dragged.offsetX;
    //     var my =
    //       event.clientY -
    //       bbox.top * (can.height / pixelratio / bbh) -
    //       dragged.offsetY;
    //     var point = diagram.transformViewToDoc(new go.Point(mx, my));
    //     console.log("point======", point);
    //     // }

    //     // event.dataTransfer.clearData();
    //     // 移动拖动的元素到所选择的放置目标节点
    //     // if (event.target.className == "dropzone") {
    //     //   event.target.style.background = "";
    //     //   dragged.parentNode.removeChild(dragged);
    //     //   event.target.appendChild(dragged);
    //     // }
    //   },
    //   false
    // );

    var div = document.getElementById("myDiagramDiv");

    /* 可拖动的目标元素会触发事件 */
    div.addEventListener(
      "drag",
      function (event) {
        // console.log('drag=',event)
        // console.log(
        //   "event.dataTransfer.getData=",
        //   event.dataTransfer.getData("text")
        // );
      },
      false
    );

    // 开始
    div.addEventListener("dragstart", function (event) {}, false);

    // 结束
    div.addEventListener(
      "dragend",
      function (event) {
        // console.log("dragend=", event);
        // 重置透明度
        event.target.style.opacity = "";
        // console.log(' event.dataTransfer=', event.dataTransfer)
        // console.log(
        //   "event.dataTransfer.getData=",
        //   event.dataTransfer.getData("text")

        // );
        // event.dataTransfer.clearData();
        event.preventDefault();
      },
      false
    );

    /* 放下目标节点时触发事件 */
    div.addEventListener(
      "dragover",
      function (event) {
        if (this === diagram.div) {
          var can = event.target;
          var pixelratio = diagram.computePixelRatio();

          // if the target is not the canvas, we may have trouble, so just quit:
          if (!(can instanceof HTMLCanvasElement)) return;

          var bbox = can.getBoundingClientRect();
          var bbw = bbox.width;
          if (bbw === 0) bbw = 0.001;
          var bbh = bbox.height;
          if (bbh === 0) bbh = 0.001;
          var mx = event.clientX - bbox.left * (can.width / pixelratio / bbw);
          var my = event.clientY - bbox.top * (can.height / pixelratio / bbh);
          var point = diagram.transformViewToDoc(new go.Point(mx, my));
          var curnode = diagram.findPartAt(point, true);
          if (curnode instanceof go.Node) {
            // highlight(curnode);
          } else {
            // highlight(null);
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
      "dragenter",
      function (event) {
        // console.log('dragenter=',event)
        // 当可拖动的元素进入可放置的目标高亮目标节点
        // if (event.target.className == "dropzone") {
        //   event.target.style.background = "purple";
        // }
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
      },
      false
    );

    // 移动拖动的元素到所选择的放置目标节点
    div.addEventListener(
      "drop",
      function (event) {
        console.log("drop=", event.target);
        // 阻止默认动作（如打开一些元素的链接）
        event.preventDefault();
        console.log(
          "event.dataTransfer.getData=",
          event.dataTransfer.getData("text")
        );
        console.log("this==", this);
        if (this === diagram.div) {
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
            dragged.offsetX;
          var my =
            event.clientY -
            bbox.top * (can.height / pixelratio / bbh) -
            dragged.offsetY;
          var point = diagram.transformViewToDoc(new go.Point(mx, my));
          console.log("point===", point);
          console.log("point======", point);


          diagram.startTransaction('new node');
          diagram.model.addNodeData({
            location: point,
            text: event.dataTransfer.getData('text'),
            color: "lightyellow"
          });
          diagram.commitTransaction('new node');

          // remove dragged element from its old location
          // if (remove.checked) dragged.parentNode.removeChild(dragged);

          // }

          // event.dataTransfer.clearData();
          // 移动拖动的元素到所选择的放置目标节点
          // if (event.target.className == "dropzone") {
          //   event.target.style.background = "";
          //   dragged.parentNode.removeChild(dragged);
          //   event.target.appendChild(dragged);
        }
      },
      false
    );
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
              <div className="draggable" draggable="true">
                Water
              </div>
              <div className="draggable" draggable="true">
                Coffee
              </div>
              <div className="draggable" draggable="true">
                Tea
              </div>
            </div>
            <ul className="">
              <li
              // draggable="true"
              >
                <img className="draggable" textcontent="短信" draggable="true" src={sms} />
                <div>短信</div>
              </li>
              <li>
                <img
                  textcontent="模板信息"
                  draggable="true"
                  src={modeltplate}
                  draggable="true"
                />
                <div> 模板信息</div>
              </li>
              <li>
                <img textcontent="发券" draggable="true" src={quan} />
                <div> 发券</div>
              </li>
            </ul>
          </div>
        </LeftDrawer>
        <div className="diagram-box">
          <div
            id="myDiagramDiv"
            style={{
              border: "solid 1px blue",
              width: "1500px",
              height: "800px",
            }}
          ></div>
        </div>
      </div>
    );
  }
}

export default Index;
