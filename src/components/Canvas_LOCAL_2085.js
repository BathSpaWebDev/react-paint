import "../App.css";
import { useEffect, useState } from "react";

const Canvas = (props) => {

  const canvasRef = props.canvasRef
  const contextRef = props.contextRef
    // state set when mouse is pressed and removed when mouse is released
  const [isDrawing, setIsDrawing] = useState(false);


  // useEffect initialises the default canvas styles when the component first runs
  // Add color and line width here from buttons (through props) and add as dependencies
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    contextRef.current = ctx;
  }, []);

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
    <canvas
      id={"paintcanvas"}
      className={"canvas"}
      onMouseDown={startDrawing}
      onMouseUp={endDrawing}
      onMouseMove={draw}
      ref={canvasRef}
      width={"1200px"}
      height={"500px"}
    />
  );
};

export default Canvas;
