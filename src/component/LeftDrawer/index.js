/*
 * @Author: your name
 * @Date: 2021-06-16 17:24:20
 * @LastEditTime: 2021-06-23 10:51:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /antd-rcfom/src/pages/LogicFlow/index.js
 */
import React, { Component, useEffect, useRef, useState } from "react";
import { Icon } from "antd";
import "./index.less";

export default (props) => {
  const { children } = props;
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const getStyle = (ele, attr) => {
    var style = null;
    if (window.getComputedStyle) {
      style = window.getComputedStyle(ele, null);
    } else {
      style = ele.currentStyle;
    }
    return attr ? style[attr] : style;
  };
  useEffect(() => {
    // console.log("ref=====", ref.current);
    // console.log(
    //   " getStyle(ref.current,'width')=====",
    //   getStyle(ref.current, "width")
    // );
    getStyle(ref.current, "width");
  }, []);
  useEffect(() => {
    const width = getStyle(ref.current, "width");
    const left = getStyle(ref.current, "left");
    if (Math.abs(parseInt(width)) == Math.abs(parseInt(left)) && isOpen) {
      ref.current.style.left = "0px";
    } else {
      ref.current.style.left = -parseInt(width) + "px";
    }
  }, [isOpen]);

  return (
    <div ref={ref} className="left-drawer">
      <div className="left-box">
        {React.Children.map(children, (child, index) => {
          return child;
        })}
      </div>
      <div
        className="right-box"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {isOpen ? <Icon type="left-circle" /> : <Icon type="right-circle" />}
      </div>
    </div>
  );
};
