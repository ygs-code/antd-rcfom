import React, { PureComponent } from "react";
import * as go from "gojs";
import { ReactDiagram } from "gojs-react";
import "./App.css";

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      nodeDataArray: [
        {
          key: 0,
          text: "开始",
          color: "lightblue",
          fig: "Ellipse",
          loc: "0 0",
        },
        {
          key: 1,
          text: "A/B",
          color: "orange",
          fig: "Diamond",
        },
        { key: 2, text: "节点1", color: "lightgreen" },
        { key: 3, text: "节点2", color: "pink" },
        { key: 4, text: "执行", color: "pink" },
        {
          key: 5,
          text: "结束",
          color: "pink",
          fig: "Ellipse",
          loc: "0 400",
        },
      ],
      linkDataArray: [
        {
          key: -1,
          from: 0,
          to: 1,
          text: "a label",
          routing: go.Link.Orthogonal,
        },
        { key: -2, from: 1, to: 2 },
        { key: -3, from: 1, to: 3 },
        { key: -4, from: 3, to: 4 },
        { key: -6, from: 4, to: 5, routing: go.Link.Orthogonal },
        { key: -5, from: 2, to: 5, routing: go.Link.Orthogonal },
      ],
    };
  }
  initDiagram() {
    const $ = go.GraphObject.make;
    const diagram = $(go.Diagram, {
      "undoManager.isEnabled": true, // enable undo & redo
      "clickCreatingTool.archetypeNodeData": {
        text: "new node",
        color: "lightblue",
      },
      model: $(go.GraphLinksModel, {
        linkKeyProperty: "key", // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
      }),
    });

    // 布局
    // diagram.layout = $(go.TreeLayout, {
    //   angle: 90,
    //   alignment: go.TreeLayout.AlignmentCenterChildren,
    //   arrangement: go.TreeLayout.ArrangementFixedRoots,
    // });

    // 节点
    diagram.nodeTemplate = $(
      go.Node,
      "Auto", // the Shape will go around the TextBlock
      new go.Binding("location", "loc", go.Point.parse).makeTwoWay(
        go.Point.stringify
      ),
      // 形状与颜色
      $(
        go.Shape,
        new go.Binding("figure", "fig"),
        new go.Binding("fill", "color")
      ),
      $(
        go.TextBlock,
        { margin: 8, editable: true }, // some room around the text
        new go.Binding("text").makeTwoWay()
      ),
      {
        click: (e, obj) => {
          console.log("点击节点---->", obj.part.data);
        },
        selectionChanged: (part) => {
          // console.log("选择----->", part);
        },
      }
    );

    // 连线
    diagram.linkTemplate = $(
      go.Link,
      new go.Binding("routing", "routing"),
      $(go.Shape),
      // $(go.Shape, { toArrow: "Standard" }),
      $(go.TextBlock, new go.Binding("text", "text"))
    );

    // 事件
    // diagram.addDiagramListener("ObjectSingleClicked", (e) => {
    //   const part = e.subject.part;
    //   console.log("点击----->", part.data);
    //   alert(`${part.data.text}`);
    // });

    return diagram;
  }

  // 流程图
  initFlowDiagram() {
    const $ = go.GraphObject.make;
    const myDiagram = $(go.Diagram, {
      model: $(go.GraphLinksModel, {
        linkKeyProperty: "key", // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
      }),
      "draggingTool.dragsLink": true,
      "draggingTool.isGridSnapEnabled": true,
      "linkingTool.isUnconnectedLinkValid": true,
      "linkingTool.portGravity": 20,
      "relinkingTool.isUnconnectedLinkValid": true,
      "relinkingTool.portGravity": 20,
      "relinkingTool.fromHandleArchetype": $(go.Shape, "Diamond", {
        segmentIndex: 0,
        cursor: "pointer",
        desiredSize: new go.Size(8, 8),
        fill: "tomato",
        stroke: "darkred",
      }),
      "relinkingTool.toHandleArchetype": $(go.Shape, "Diamond", {
        segmentIndex: -1,
        cursor: "pointer",
        desiredSize: new go.Size(8, 8),
        fill: "darkred",
        stroke: "tomato",
      }),
      "linkReshapingTool.handleArchetype": $(go.Shape, "Diamond", {
        desiredSize: new go.Size(7, 7),
        fill: "lightblue",
        stroke: "deepskyblue",
      }),
      "rotatingTool.handleAngle": 270,
      "rotatingTool.handleDistance": 30,
      "rotatingTool.snapAngleMultiple": 15,
      "rotatingTool.snapAngleEpsilon": 15,
      "undoManager.isEnabled": true,
    });
    // Define a function for creating a "port" that is normally transparent.
    // The "name" is used as the GraphObject.portId, the "spot" is used to control how links connect
    // and where the port is positioned on the node, and the boolean "output" and "input" arguments
    // control whether the user can draw links from or to the port.
    function makePort(name, spot, output, input) {
      // the port is basically just a small transparent circle
      return $(go.Shape, "Circle", {
        fill: null, // not seen, by default; set to a translucent gray by showSmallPorts, defined below
        stroke: null,
        desiredSize: new go.Size(7, 7),
        alignment: spot, // align the port on the main Shape
        alignmentFocus: spot, // just inside the Shape
        portId: name, // declare this object to be a "port"
        fromSpot: spot,
        toSpot: spot, // declare where links may connect at this port
        fromLinkable: output,
        toLinkable: input, // declare whether the user may draw links to/from here
        cursor: "pointer", // show a different cursor to indicate potential link point
      });
    }

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
      "Spot",
      { locationSpot: go.Spot.Center },
      new go.Binding("location", "loc", go.Point.parse).makeTwoWay(
        go.Point.stringify
      ),
      {
        selectable: true,
        selectionAdornmentTemplate: nodeSelectionAdornmentTemplate,
      },
      {
        resizable: true,
        resizeObjectName: "PANEL",
        resizeAdornmentTemplate: nodeResizeAdornmentTemplate,
      },
      { rotatable: true, rotateAdornmentTemplate: nodeRotateAdornmentTemplate },
      new go.Binding("angle").makeTwoWay(),
      // the main object is a Panel that surrounds a TextBlock with a Shape
      $(
        go.Panel,
        "Auto",
        { name: "PANEL" },
        new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(
          go.Size.stringify
        ),
        $(
          go.Shape,
          "Rectangle", // default figure
          {
            portId: "", // the default port: if no spot on link data, use closest side
            fromLinkable: true,
            toLinkable: true,
            cursor: "pointer",
            fill: "white", // default color
            strokeWidth: 2,
          },
          new go.Binding("figure"),
          new go.Binding("fill")
        ),
        $(
          go.TextBlock,
          {
            font: "bold 11pt Helvetica, Arial, sans-serif",
            margin: 8,
            maxSize: new go.Size(160, NaN),
            wrap: go.TextBlock.WrapFit,
            editable: true,
          },
          new go.Binding("text").makeTwoWay()
        )
      ),
      // four small named ports, one on each side:
      makePort("T", go.Spot.Top, false, true),
      makePort("L", go.Spot.Left, true, true),
      makePort("R", go.Spot.Right, true, true),
      makePort("B", go.Spot.Bottom, true, false),
      {
        // handle mouse enter/leave events to show/hide the ports
        mouseEnter: function (e, node) {
          showSmallPorts(node, true);
        },
        mouseLeave: function (e, node) {
          showSmallPorts(node, false);
        },
      }
    );

    function showSmallPorts(node, show) {
      node.ports.each(function (port) {
        if (port.portId !== "") {
          // don't change the default port, which is the big shape
          port.fill = show ? "rgba(0,0,0,.3)" : null;
        }
      });
    }

    var linkSelectionAdornmentTemplate = $(
      go.Adornment,
      "Link",
      $(
        go.Shape,
        // isPanelMain declares that this Shape shares the Link.geometry
        { isPanelMain: true, fill: null, stroke: "deepskyblue", strokeWidth: 0 }
      ) // use selection object's strokeWidth
    );

    myDiagram.linkTemplate = $(
      go.Link, // the whole link panel
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
        go.Shape, // the link path shape
        { isPanelMain: true, strokeWidth: 2 }
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

    return myDiagram;
  }

  handleModelChange = (changed) => {
    console.log("GoJS model changed!");
    this.setState({
      nodeDataArray: [],
      linkDataArray: [],
    });
  };

  // 渲染
  render() {
    const { nodeDataArray, linkDataArray } = this.state;
    return (
      <div className="App">
        <h3>测试gojs</h3>
        <div onClick={this.handleModelChange}>刷新</div>
        {/* <ReactDiagram
          initDiagram={this.initFlowDiagram}
          divClassName="palette-commponent"
        /> */}
        <ReactDiagram
          initDiagram={this.initFlowDiagram}
          divClassName="diagram-component"
          nodeDataArray={nodeDataArray}
          linkDataArray={linkDataArray}
          // onModelChange={this.handleModelChange}
        ></ReactDiagram>
      </div>
    );
  }
}

export default App;
