import { DragSource, DropTarget } from "react-dnd";
import "react-dnd-html5-backend";
import "react-dnd-touch-backend";

let DraggableComponent = createReactClass({
  render() {
    let { connectDragSource, children, isDragging, id, className, style } = this.props;
    return connectDragSource(
      <div id={id} className={"demo-circle " + (className || "")} style={style}>
        {children || this.props.id}
      </div>
    );
  }
});
const dragSpec = {
  beginDrag(props, monitor, component) {
    return { id: props.id }; // represents "item"
  }
};
const dragCollect = function (connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: !!monitor.isDragging()
  };
};
DraggableComponent = DragSource("item", dragSpec, dragCollect)(DraggableComponent);
DraggableComponent = UU5.Common.DnD.withContext(DraggableComponent);


let ContainerForDrops = createReactClass({
  getInitialState() {
    return { items: [] };
  },
  onItemDrop(item) {
    this.setState(state => ({ items: state.items.concat([item]) }));
  },
  render() {
    let { connectDropTarget, children, isDragOver, id, className, style } = this.props;
    return connectDropTarget(
      <div id={id} className={"demo-square " + (className || "")} style={{...style, backgroundColor: isDragOver ? "green" : "gray"}}>
        {children}
        Dropped items: {this.state.items.map(it => it.id).join(", ") || "-"}
      </div>
    );
  }
});
const dropSpec = {
  drop(props, monitor, component) {
    let item = monitor.getItem();
    component.onItemDrop(item);
    return item;
  }
};
const dropCollect = function (connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isDragOver: !!monitor.isOver()
  };
};
ContainerForDrops = DropTarget("item", dropSpec, dropCollect)(ContainerForDrops);
ContainerForDrops = UU5.Common.DnD.withContext(ContainerForDrops);

const Page = createReactClass({
  render() {
    return (
      <UU5.Bricks.Page useDnD>
        Drag&drop circles to the square.
        <UU5.Bricks.Div style={{width: 150, height: 150, position: "relative"}}>
          <DraggableComponent id="1" style={{ background: "red", left: Math.random() * 100, top: Math.random() * 100 }} />
          <DraggableComponent id="2" style={{ background: "yellow", left: Math.random() * 100, top: Math.random() * 100 }} />
          <DraggableComponent id="3" style={{ background: "lightblue", left: Math.random() * 100, top: Math.random() * 100 }} />
        </UU5.Bricks.Div>
        <ContainerForDrops />
      </UU5.Bricks.Page>
    );
  }
});