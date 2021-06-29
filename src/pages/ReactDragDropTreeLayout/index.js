/*
 * @Author: your name
 * @Date: 2021-06-16 17:24:20
 * @LastEditTime: 2021-06-28 14:58:14
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
import { v4 as uuidv4 } from "uuid";
import { ReactDiagram } from "gojs-react";
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
  constructor(props) {
    super(props);
    this.data = {
      highlightedData: null,
    };
    let key = this.getUuid();
    this.state = {
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
        // {
        //   xy: "0 0",
        //   topText: "开始",
        //   // buttomText: "buttomText",
        //   rightText: "每月每日",
        //   // leftText: "leftText",
        //   // rightTopText: "rightTopText",
        //   // rightButtomText: "rightButtomText",
        //   // leftButtomText: "leftButtomText",
        //   // lrftTopText: "lrftTopText",
        //   icon: start,
        // },
        // {
        //   text: "Gamma",
        //   color: "lightgreen",
        //   xy: "0 100",
        //   topText: "topText",
        //   buttomText: "buttomText",
        //   rightText: "rightText",
        //   leftText: "leftText",
        //   rightTopText: "rightTopText",
        //   rightButtomText: "rightButtomText",
        //   leftButtomText: "leftButtomText",
        //   lrftTopText: "lrftTopText",
        //   name: "name",
        // },
        // {
        //   text: "Delta",
        //   color: "pink",
        //   xy: "0 200",
        //   topText: "topText",
        //   buttomText: "buttomText",
        //   rightText: "rightText",
        //   leftText: "leftText",
        //   rightTopText: "rightTopText",
        //   rightButtomText: "rightButtomText",
        //   leftButtomText: "leftButtomText",
        //   lrftTopText: "lrftTopText",
        //   name: "name",
        // },
        // {
        //   text: "Delta",
        //   color: "pink",
        //   xy: "0 300",
        //   topText: "topText",
        //   buttomText: "buttomText",
        //   rightText: "rightText",
        //   leftText: "leftText",
        //   rightTopText: "rightTopText",
        //   rightButtomText: "rightButtomText",
        //   leftButtomText: "leftButtomText",
        //   lrftTopText: "lrftTopText",
        //   name: "name",
        // },
        // {
        //   text: "Delta",
        //   color: "pink",
        //   xy: "0 400",
        //   topText: "topText",
        //   buttomText: "buttomText",
        //   rightText: "rightText",
        //   leftText: "leftText",
        //   rightTopText: "rightTopText",
        //   rightButtomText: "rightButtomText",
        //   leftButtomText: "leftButtomText",
        //   lrftTopText: "lrftTopText",
        //   name: "name",
        // },
        // {
        //   text: "Delta",
        //   color: "pink",
        //   xy: "0 500",
        //   topText: "topText",
        //   buttomText: "buttomText",
        //   rightText: "rightText",
        //   leftText: "leftText",
        //   rightTopText: "rightTopText",
        //   rightButtomText: "rightButtomText",
        //   leftButtomText: "leftButtomText",
        //   lrftTopText: "lrftTopText",
        //   name: "name",
        // },

        {
          points:[100,100],
          // xy: "0 0",
          topText: "开始",
          rightText: "每月每日",
          icon: "data:image/jpeg;base64,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",
          parentKey: null,
          key,
        },
      ],
      linkDataArray: [
        // {
        //   key: this.getUuid(),
        //   from: key,
        //   to: "",
        //   points: [
        //     0, 38,
        //     // -1, 43.28239746093752,
        //     // -1,111.64119873046876,
        //     // -1, 111.64119873046876,
        //     0, 190, 0, 190,
        //   ],
        // },
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

    // console.log("this.diagramRef====", this.diagramRef.divRef.current);
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
          // 找到父亲线节点Index
          const parentLinkIndex = linkDataArray.findIndex((item) => {
            return item.from == parentKey;
          });

          // 找到父亲线节点
          const parentLinkData = linkDataArray.find((item) => {
            return item.from == parentKey;
          });

          const { to, from, key: linkKey, points } = parentLinkData;
          // 插入节点
          const key = _this.getUuid();
          const { src, text } = JSON.parse(
            event.dataTransfer.getData("data") || "{}"
          );
          let newLinkDataArray = {};
          const parentXY = parentNodeData.xy.split(" ");
          const parentX = parentXY[0];
          const parentY = parentXY[1];
          const newNodeData = {
            parentKey,
            key,
            // topText: "新的节点",
            rightText: text,
            icon: src,
            xy: `${parentX} ${+parentY + 230}`,
          };

          if (to) {
            const nextNodeData = nodeDataArray.find((item) => {
              return item.key == to;
            });

            const nextNodeLinkData = linkDataArray.find((item) => {
              return item.from == to;
            });
            const nextNodeLinkIndex = linkDataArray.findIndex((item) => {
              return item.from == to;
            });
            console.log("nextNodeLinkData======", nextNodeLinkData);
            console.log("nextNodeData======", nextNodeData);
            //已经有子节点
            linkDataArray[parentLinkIndex].to = key;
            newLinkDataArray = {
              key: key, // _this.getUuid(),
              from: key,
              to: nextNodeLinkData.from,
              points: [
                +parentX,
                +parentY + 230 + 38,
                +parentX,
                +parentY + 230 + 190,
                +parentX,
                +parentY + 230 + 190,
              ],
            };
            // 算坐标
          } else {
            //没有子节点
            linkDataArray[parentLinkIndex].to = key;
            newLinkDataArray = {
              key: _this.getUuid(),
              from: key,
              to: "",
              points: [
                +parentX,
                +parentY + 230 + 38,
                +parentX,
                +parentY + 230 + 190,
                +parentX,
                +parentY + 230 + 190,
              ],
            };
          }

          console.log("parentLinkData==", parentLinkData);
          // debugger;

          console.log("parentNodeData.xy====", parentNodeData);
          console.log("parentNodeData.xy====", parentNodeData.xy);

          console.log("parentXY====", parentXY);
          console.log("parentNodeData====", parentNodeData);

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

          _this.setState(
            {
              nodeDataArray: [...nodeDataArray, newNodeData],
              linkDataArray: [...linkDataArray, newLinkDataArray],
            },
            () => {
              setTimeout(() => {
                _this.lastNodeLinkXY();
              }, 2000);
            }
          );

          // _this.load({
          //   ...JsonData,
          //   nodeDataArray: [...nodeDataArray, newNodeData],
          //   linkDataArray,
          // });
          console.log("getData==", event.dataTransfer.getData("data"));
          // event.dataTransfer.getData("data"),

          // //添加节点
          // _this.addNode({
          //   xy: "0 50",
          //   topText: "开始",
          //   rightText: "每月每日",
          //   icon: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAkACQAAD/4QB0RXhpZgAATU0AKgAAAAgABAEaAAUAAAABAAAAPgEbAAUAAAABAAAARgEoAAMAAAABAAIAAIdpAAQAAAABAAAATgAAAAAAAACQAAAAAQAAAJAAAAABAAKgAgAEAAAAAQAAAFCgAwAEAAAAAQAAAE4AAAAA/+0AOFBob3Rvc2hvcCAzLjAAOEJJTQQEAAAAAAAAOEJJTQQlAAAAAAAQ1B2M2Y8AsgTpgAmY7PhCfv/iDVxJQ0NfUFJPRklMRQABAQAADUxhcHBsAhAAAG1udHJSR0IgWFlaIAflAAYACgANACcAOWFjc3BBUFBMAAAAAEFQUEwAAAAAAAAAAAAAAAAAAAAAAAD21gABAAAAANMtYXBwbAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEmRlc2MAAAFcAAAAYmRzY20AAAHAAAAB7mNwcnQAAAOwAAAAI3d0cHQAAAPUAAAAFHJYWVoAAAPoAAAAFGdYWVoAAAP8AAAAFGJYWVoAAAQQAAAAFHJUUkMAAAQkAAAIDGFhcmcAAAwwAAAAIHZjZ3QAAAxQAAAAMG5kaW4AAAyAAAAAPmNoYWQAAAzAAAAALG1tb2QAAAzsAAAAKHZjZ3AAAA0UAAAAOGJUUkMAAAQkAAAIDGdUUkMAAAQkAAAIDGFhYmcAAAwwAAAAIGFhZ2cAAAwwAAAAIGRlc2MAAAAAAAAACERpc3BsYXkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABtbHVjAAAAAAAAACYAAAAMaHJIUgAAABYAAAHYa29LUgAAABYAAAHYbmJOTwAAABYAAAHYaWQAAAAAABYAAAHYaHVIVQAAABYAAAHYY3NDWgAAABYAAAHYZGFESwAAABYAAAHYbmxOTAAAABYAAAHYZmlGSQAAABYAAAHYaXRJVAAAABYAAAHYZXNFUwAAABYAAAHYcm9STwAAABYAAAHYZnJDQQAAABYAAAHYYXIAAAAAABYAAAHYdWtVQQAAABYAAAHYaGVJTAAAABYAAAHYemhUVwAAABYAAAHYdmlWTgAAABYAAAHYc2tTSwAAABYAAAHYemhDTgAAABYAAAHYcnVSVQAAABYAAAHYZW5HQgAAABYAAAHYZnJGUgAAABYAAAHYbXMAAAAAABYAAAHYaGlJTgAAABYAAAHYdGhUSAAAABYAAAHYY2FFUwAAABYAAAHYZW5BVQAAABYAAAHYZXNYTAAAABYAAAHYZGVERQAAABYAAAHYZW5VUwAAABYAAAHYcHRCUgAAABYAAAHYcGxQTAAAABYAAAHYZWxHUgAAABYAAAHYc3ZTRQAAABYAAAHYdHJUUgAAABYAAAHYcHRQVAAAABYAAAHYamFKUAAAABYAAAHYAEwARwAgAFUAbAB0AHIAYQAgAEgARAAAdGV4dAAAAABDb3B5cmlnaHQgQXBwbGUgSW5jLiwgMjAyMQAAWFlaIAAAAAAAAPPYAAEAAAABFghYWVogAAAAAAAAczAAADqNAAABcFhZWiAAAAAAAABdFAAAtGgAAA5jWFlaIAAAAAAAACaSAAARCwAAw1pjdXJ2AAAAAAAABAAAAAAFAAoADwAUABkAHgAjACgALQAyADYAOwBAAEUASgBPAFQAWQBeAGMAaABtAHIAdwB8AIEAhgCLAJAAlQCaAJ8AowCoAK0AsgC3ALwAwQDGAMsA0ADVANsA4ADlAOsA8AD2APsBAQEHAQ0BEwEZAR8BJQErATIBOAE+AUUBTAFSAVkBYAFnAW4BdQF8AYMBiwGSAZoBoQGpAbEBuQHBAckB0QHZAeEB6QHyAfoCAwIMAhQCHQImAi8COAJBAksCVAJdAmcCcQJ6AoQCjgKYAqICrAK2AsECywLVAuAC6wL1AwADCwMWAyEDLQM4A0MDTwNaA2YDcgN+A4oDlgOiA64DugPHA9MD4APsA/kEBgQTBCAELQQ7BEgEVQRjBHEEfgSMBJoEqAS2BMQE0wThBPAE/gUNBRwFKwU6BUkFWAVnBXcFhgWWBaYFtQXFBdUF5QX2BgYGFgYnBjcGSAZZBmoGewaMBp0GrwbABtEG4wb1BwcHGQcrBz0HTwdhB3QHhgeZB6wHvwfSB+UH+AgLCB8IMghGCFoIbgiCCJYIqgi+CNII5wj7CRAJJQk6CU8JZAl5CY8JpAm6Cc8J5Qn7ChEKJwo9ClQKagqBCpgKrgrFCtwK8wsLCyILOQtRC2kLgAuYC7ALyAvhC/kMEgwqDEMMXAx1DI4MpwzADNkM8w0NDSYNQA1aDXQNjg2pDcMN3g34DhMOLg5JDmQOfw6bDrYO0g7uDwkPJQ9BD14Peg+WD7MPzw/sEAkQJhBDEGEQfhCbELkQ1xD1ERMRMRFPEW0RjBGqEckR6BIHEiYSRRJkEoQSoxLDEuMTAxMjE0MTYxODE6QTxRPlFAYUJxRJFGoUixStFM4U8BUSFTQVVhV4FZsVvRXgFgMWJhZJFmwWjxayFtYW+hcdF0EXZReJF64X0hf3GBsYQBhlGIoYrxjVGPoZIBlFGWsZkRm3Gd0aBBoqGlEadxqeGsUa7BsUGzsbYxuKG7Ib2hwCHCocUhx7HKMczBz1HR4dRx1wHZkdwx3sHhYeQB5qHpQevh7pHxMfPh9pH5Qfvx/qIBUgQSBsIJggxCDwIRwhSCF1IaEhziH7IiciVSKCIq8i3SMKIzgjZiOUI8Ij8CQfJE0kfCSrJNolCSU4JWgllyXHJfcmJyZXJocmtyboJxgnSSd6J6sn3CgNKD8ocSiiKNQpBik4KWspnSnQKgIqNSpoKpsqzysCKzYraSudK9EsBSw5LG4soizXLQwtQS12Last4S4WLkwugi63Lu4vJC9aL5Evxy/+MDUwbDCkMNsxEjFKMYIxujHyMioyYzKbMtQzDTNGM38zuDPxNCs0ZTSeNNg1EzVNNYc1wjX9Njc2cjauNuk3JDdgN5w31zgUOFA4jDjIOQU5Qjl/Obw5+To2OnQ6sjrvOy07azuqO+g8JzxlPKQ84z0iPWE9oT3gPiA+YD6gPuA/IT9hP6I/4kAjQGRApkDnQSlBakGsQe5CMEJyQrVC90M6Q31DwEQDREdEikTORRJFVUWaRd5GIkZnRqtG8Ec1R3tHwEgFSEtIkUjXSR1JY0mpSfBKN0p9SsRLDEtTS5pL4kwqTHJMuk0CTUpNk03cTiVObk63TwBPSU+TT91QJ1BxULtRBlFQUZtR5lIxUnxSx1MTU19TqlP2VEJUj1TbVShVdVXCVg9WXFapVvdXRFeSV+BYL1h9WMtZGllpWbhaB1pWWqZa9VtFW5Vb5Vw1XIZc1l0nXXhdyV4aXmxevV8PX2Ffs2AFYFdgqmD8YU9homH1YklinGLwY0Njl2PrZEBklGTpZT1lkmXnZj1mkmboZz1nk2fpaD9olmjsaUNpmmnxakhqn2r3a09rp2v/bFdsr20IbWBtuW4SbmtuxG8eb3hv0XArcIZw4HE6cZVx8HJLcqZzAXNdc7h0FHRwdMx1KHWFdeF2Pnabdvh3VnezeBF4bnjMeSp5iXnnekZ6pXsEe2N7wnwhfIF84X1BfaF+AX5ifsJ/I3+Ef+WAR4CogQqBa4HNgjCCkoL0g1eDuoQdhICE44VHhauGDoZyhteHO4efiASIaYjOiTOJmYn+imSKyoswi5aL/IxjjMqNMY2Yjf+OZo7OjzaPnpAGkG6Q1pE/kaiSEZJ6kuOTTZO2lCCUipT0lV+VyZY0lp+XCpd1l+CYTJi4mSSZkJn8mmia1ZtCm6+cHJyJnPedZJ3SnkCerp8dn4uf+qBpoNihR6G2oiailqMGo3aj5qRWpMelOKWpphqmi6b9p26n4KhSqMSpN6mpqhyqj6sCq3Wr6axcrNCtRK24ri2uoa8Wr4uwALB1sOqxYLHWskuywrM4s660JbSctRO1irYBtnm28Ldot+C4WbjRuUq5wro7urW7LrunvCG8m70VvY++Cr6Evv+/er/1wHDA7MFnwePCX8Lbw1jD1MRRxM7FS8XIxkbGw8dBx7/IPci8yTrJuco4yrfLNsu2zDXMtc01zbXONs62zzfPuNA50LrRPNG+0j/SwdNE08bUSdTL1U7V0dZV1tjXXNfg2GTY6Nls2fHadtr724DcBdyK3RDdlt4c3qLfKd+v4DbgveFE4cziU+Lb42Pj6+Rz5PzlhOYN5pbnH+ep6DLovOlG6dDqW+rl63Dr++yG7RHtnO4o7rTvQO/M8Fjw5fFy8f/yjPMZ86f0NPTC9VD13vZt9vv3ivgZ+Kj5OPnH+lf65/t3/Af8mP0p/br+S/7c/23//3BhcmEAAAAAAAMAAAACZmYAAPKnAAANWQAAE9AAAApbdmNndAAAAAAAAAABAAEAAAAAAAAAAQAAAAEAAAAAAAAAAQAAAAEAAAAAAAAAAQAAbmRpbgAAAAAAAAA2AACnAAAAVcAAAE4AAACjAAAAJgAAAA/AAABQQAAAVEAAAjMzAAIzMwACMzMAAAAAAAAAAHNmMzIAAAAAAAELtwAABZb///NXAAAHKQAA/df///u3///9pgAAA9oAAMD2bW1vZAAAAAAAAB5tAABbCAAAAADQyj6AAAAAAAAAAAAAAAAAAAAAAHZjZ3AAAAAAAAMAAAACZmYAAwAAAAJmZgADAAAAAmZmAAAAAjMzNAAAAAACMzM0AAAAAAIzMzQA/8AAEQgATgBQAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/bAEMAAQEBAQEBAgEBAgMCAgIDBAMDAwMEBQQEBAQEBQYFBQUFBQUGBgYGBgYGBgcHBwcHBwgICAgICQkJCQkJCQkJCf/bAEMBAQEBAgICBAICBAkGBQYJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCf/dAAQABf/aAAwDAQACEQMRAD8A/os1HUdX/bQ1e/8AiP8AEe/uv+EO+1T22h6HbTyQWzW0Ehj+0XHllWklkZSeT8vIB24Ap/8ADHn7Of8A0Lv/AJN3f/x+j9jz/k3Pw7/29/8ApZNX0xX7JxvxvnGWZxissyzFTo0aM504xpzlBJQk4q6i1eTteUndt3bZ8Lw/w/gcXgaOLxdGNSpUipNySk7ySfVOyV9EtEj5mP7Hn7OeP+Rd/wDJu7/+P1VtP2Qf2dpY9z+Hsn/r7u//AI/X1EehqjYf6r86+W/4ijxP/wBDGv8A+DZ//JHsf6oZT/0C0/8AwCP+R87f8Mefs5/9C7/5N3f/AMfo/wCGPP2c/wDoXf8Aybu//j9fTFFH/EUeJ/8AoY1//Bs//kg/1Qyn/oFp/wDgEf8AI+X7r9j/APZ1jgLp4eweP+Xu7/8Aj9SRfse/s6MgJ8O/+Td3/wDH6+kb7/j2b8P51ND/AKsUf8RR4n/6GNf/AMGz/wDkg/1Qyn/oFp/+AR/yPmz/AIY8/Zz/AOhd/wDJu7/+P1c07UdX/Yv1ew+I/wAOL+6/4Q77VBba5odzPJPbLbTyCP7Rb+YWaOWNmB4PzcAnbkH6Mr5n/bD/AOTc/EX/AG6f+lkNfU8Ecb5xmecYXLMzxU61GtOFOUak5TTU5KLspN2kr3jJWadmmePxBw/gcJga2LwlGNOpTi5JxSi7xTfRK6dtU9Gj/9D+h/8AY9I/4Zz8O/8Ab3/6WTV9MZWvl79kC0il/Z28PO3U/a//AErmr6V+wwV934pf8lPmP/X+r/6ckfO8If8AIpwv/XuH/pKLbMuDzVGwI8r86cbGDBqraWsUkeW618IfRGNofxA8HeI7l7PRr5JpY8bl2svX/eAz+FdhuX1r8LdE8SazoGoJqWmzskqHOcmv0A+D37Rmj+IVj0TxYfIuuFEhP3/8KAPse+Zfsx59KmhI8sVlSRWktp9ptmDKcEEHI5q3HZQFAaAL+Vr5n/bCI/4Zz8Rf9un/AKWQ19GfYYK+av2v7SKL9nbxC69R9k/9K4a+78Lf+Sny7/r/AEv/AE5E+d4v/wCRTiv+vc//AEln/9H+iD9jz/k3Pw7/ANvf/pZNX0xXzP8Asef8m5+Hf+3v/wBLJq+mK+78Uv8Akp8x/wCv9X/05I+d4Q/5FOF/69w/9JQh6GqNh/qvzq8ehqjYf6r86+EPoj8HqfHJJE4kjJVh0I4plSwwy3EgihUszcAAZoA+nfhP+0TrnhUpomusbizJAGT92v0z8OazZ+IdFg1jT23QzglT06HB/UV+cnwm/Zs1XXVj1/xQDBbAgqh/i5/Sv0e0HSbLQtJh0rT12QwjCj6nJ/U0AbFfM/7Yf/JufiL/ALdP/SyGvpivmf8AbD/5Nz8Rf9un/pZDX3fhb/yU+Xf9f6X/AKcifO8X/wDIpxX/AF7n/wCks//S/oR/ZC1G2g/Z38PRSHkfa+3/AE9zV9J/2vaep/Kvnf8AY+jRv2dPDpI/5+//AEsmr6X8mP0/Svu/FL/kp8x/6/1f/Tkj53hD/kU4X/r3D/0lGedXtMdT+VVbPU7RI8En8q2Whj2nj9KpWEUZi6etfCH0R+JHh/wjrviTUk0zToGaRjjkEYr9C/hD8BPDPhBI9W8Q/wCk3nUAg4X+hr6a0zwf4a0ad7nTbRInk+8eT0+pOPwroPJj9P0oAxJtQsFtfJh+VRjAAwKsx6raKgGT+VT3sMf2cnHpViKKMoDj9KAKf9r2nqfyr5s/a91G2n/Z38QxRnk/ZO3/AE9w19ReTH6fpXzR+2DGi/s6eIiB/wA+n/pZDX3fhb/yU+Xf9f6X/pyJ87xf/wAinFf9e5/+ks//0/6IP2PP+Tc/Dv8A29/+lk1fTFfMHhK6i/Z9+NOtfsmaiDdw2M73uk3MI+VbO7InWGYMQQ6eZyVyCc9Mc/T9fovivhJwz/E4l/DWlKrB94VG5xfk7NXT1TPmODa8ZZbSpLemlCX+KK5X+KEPQ1RsP9V+dXj0NUbD/VfnX50fTl+iiigCpff8ezfh/Opof9WKhvv+PZvw/nU0P+rFAEtfM/7Yf/JufiL/ALdP/SyGvpivmDxbdRftBfGnRf2TNOBtIb6dL3VrmYfK1naEztDCFJJd/L4LYAOOueP0Xwowk55/hsSvhoyjVm+0KbU5Pzdk7JatnzHGVeMctq0nvUThH/FJcq/Fn//Z",
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

  // 设置节点
  setNodeTemplate = () => {
    var $ = this.$;
    var _this = this;
    this.myDiagram.nodeTemplate = $(
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
      // new go.Binding("location", "xy", go.Point.parse),
      new go.Binding("points").makeTwoWay(),

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
  };

  lastNodeLinkXY = () => {
    const { linkDataArray, nodeDataArray } = JSON.parse(this.save());
    for (let [index, item] of linkDataArray.entries()) {
      const { to, from } = item;
      if (!to) {
        // 最后一个节点的to
        const lastNode = nodeDataArray.find((item) => {
          return item.key == from;
        });
        const lastNodeXY = lastNode.xy.split(" ");
        const lastNodeX = lastNodeXY[0];
        const lastNodeY = lastNodeXY[1];
        linkDataArray[index].points = [
          +lastNodeX,
          +lastNodeY +250 + 38,
          +lastNodeX,
          +lastNodeY +250+ 190,
          +lastNodeX,
          +lastNodeY  +250+ 190,
        ];

        this.setState({
          linkDataArray,
        });
      }
    }
    console.log("dataJSON==", nodeDataArray);
    console.log("dataJSON==", linkDataArray);
  };

  //设置线
  setLinkTemplate = () => {
    var $ = this.$;
    var _this = this;
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
    this.myDiagram.linkTemplate = $(
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
  };
  init = () => {
    const { nodeDataArray, linkDataArray } = this.state;
    var _this = this;
    var $ = null;
    this.$ = $ = go.GraphObject.make; // for conciseness in defining templates
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
    this.setNodeTemplate();
    this.setLinkTemplate();
    // but use the default Link template, by not setting Diagram.linkTemplate

    // create the model data that will be represented by Nodes and Links
    myDiagram.model = $(go.GraphLinksModel, {
      // linkFromPortIdProperty: "fromPort", // required information:
      // linkToPortIdProperty: "toPort", // identifies data property names
      nodeDataArray,
      linkDataArray,
    });

    return myDiagram;
    // this.myDiagram.commandHandler.zoomToFit();
    // setInterval(() => {
    //   var modelAsText = myDiagram.model.toJson();
    //   // console.log("modelAsText==", modelAsText);

    //   this.textareaRef.innerHTML = modelAsText;

    //   // console.log("this.textareaRef=====", this.textareaRef);
    // }, 3000);
  };

  initDiagram = () => {
    const $ = go.GraphObject.make;

    this.$ = $;
    let myDiagram = null;
    // 获取myDiagram
    this.myDiagram = myDiagram = $(go.Diagram, {
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
            layerSpacing: 300, // 父子与子节点之间距离
            nodeSpacing: 300, // 兄弟节点之间距离
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

    setInterval(() => {
      this.textareaRef.innerHTML = this.save();
    }, 5000);
    this.textareaRef.innerHTML = this.save();
    // this.init();
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
    const { nodeDataArray, linkDataArray } = this.state;
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
          {/* <div
            id="myDiagramDiv"
            style={{
              border: "solid 1px blue",
              width: "1500px",
              height: "800px",
            }}
          ></div>*/}

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
