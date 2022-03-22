import "../App.css";
import { useEffect, useState } from "react";
import Menu from "./Menu";

const Canvas = (props) => {
  //changes Canvas size with screen width 
  const screenWidth = window.innerWidth - window.innerWidth/10 + "px";
  const screenHeight = window.screen.height - window.screen.height/2 + "px";
  const width = screenWidth;
  const height = screenHeight;
  // const height = "500px";

  const lineWidth = props.lineWidth;
  const lineColor = props.lineColor;

  const canvasRef = props.canvasRef;
  const contextRef = props.contextRef;
  // state set when mouse is pressed and removed when mouse is released
  const [isDrawing, setIsDrawing] = useState(false);
  // state set line width and line color
  // const [lineWidth, setLineWidth] = useState(5);
  // const [lineColor, setLineColor] = useState("black");

  // useEffect initialises the default canvas styles when the component first runs
  // Add color and line width here from buttons (through props) and add as dependencies
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = lineColor;
    contextRef.current = ctx;
  }, [lineWidth, lineColor]);

  // function runs when mouse button is pressed.
  // updates canvas context to set position to be drawn on
  const startDrawing = (event) => {
    contextRef.current.beginPath();
    contextRef.current.moveTo(
      event.nativeEvent.offsetX,
      event.nativeEvent.offsetY
    );
    setIsDrawing(true);
  };

  // function runs when mouse button is released.
  // updates canvas context to stop drawing
  const endDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  // function runs while mouse is moving. If isDrawing state is false function returns without making any change
  // else canvas context is updated to fill in a line on the current point on the page
  const draw = (event) => {
    if (!isDrawing) {
      return;
    }
    contextRef.current.lineTo(
      event.nativeEvent.offsetX,
      event.nativeEvent.offsetY
    );

    contextRef.current.stroke();
  };



  return (
    <>
      <canvas
        id={"paintcanvas"}
        className={"canvas"}
        onMouseDown={startDrawing}
        onMouseUp={endDrawing}
        onMouseMove={draw}
        ref={canvasRef}
        width={width}
        height={height}
      />
    </>
  );
};

export default Canvas;
