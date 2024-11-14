import React, { useEffect, useRef, useState } from "react";
import * as cornerstone from "cornerstone-core";
import * as cornerstoneMath from "cornerstone-math";
import * as cornerstoneTools from "cornerstone-tools";
import Hammer from "hammerjs";
import * as cornerstoneWebImageLoader from "cornerstone-web-image-loader";

// 为外部模块赋值，类型定义假设这些模块的结构符合实际使用情况
cornerstoneTools.external.cornerstone = cornerstone;
cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
cornerstoneWebImageLoader.external.cornerstone = cornerstone;
cornerstoneTools.external.Hammer = Hammer;

// 定义div样式的类型
type DivStyleType = {
  width: string;
  height: string;
  position: string;
  color: string;
};

// 定义底部左边样式的类型
type BottomLeftStyleType = {
  bottom: string;
  left: string;
  position: string;
  color: string;
};

// 定义底部右边样式的类型
type BottomRightStyleType = {
  bottom: string;
  right: string;
  position: string;
  color: string;
};

// 假设stack有特定的结构，这里简单定义一下包含imageIds属性的类型，可根据实际情况细化
type StackType = {
  imageIds: string[];
  // 可以补充更多stack实际包含的属性
};

// 定义组件的props类型
type CornerstoneElementProps = {
  stack: StackType;
};

export const CornerstoneElement = (props: CornerstoneElementProps) => {
  // 使用useState来管理组件状态
  const [state, setState] = useState({
    stack: props.stack,
    viewport: cornerstone.getDefaultViewport(null, undefined),
    imageId: props.stack.imageIds[0],
  });

  // 使用useRef来获取DOM元素引用
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (element) {
      // Enable the DOM Element for use with Cornerstone
      cornerstone.enable(element);

      // Load the first image in the stack
      cornerstone.loadImage(state.imageId).then((image) => {
        // Display the first image
        cornerstone.displayImage(element, image);

        // Add the stack tool state to the enabled element
        const stack = props.stack;
        cornerstoneTools.addStackStateManager(element, ["stack"]);
        cornerstoneTools.addToolState(element, "stack", stack);

        cornerstoneTools.mouseInput.enable(element);
        cornerstoneTools.mouseWheelInput.enable(element);
        cornerstoneTools.wwwc.activate(element, 1); // ww/wc is the default tool for left mouse button
        cornerstoneTools.pan.activate(element, 2); // pan is the default tool for middle mouse button
        cornerstoneTools.zoom.activate(element, 4); // zoom is the default tool for right mouse button
        cornerstoneTools.zoomWheel.activate(element); // zoom is the default tool for middle mouse wheel

        cornerstoneTools.touchInput.enable(element);
        cornerstoneTools.panTouchDrag.activate(element);
        cornerstoneTools.zoomTouchPinch.activate(element);

        element.addEventListener("cornerstoneimagerendered", onImageRendered);
        element.addEventListener("cornerstonenewimage", onNewImage);
        window.addEventListener("resize", onWindowResize);
      });
    }
    return () => {
      if (element) {
        element.removeEventListener(
          "cornerstoneimagerendered",
          onImageRendered
        );
        element.removeEventListener("cornerstonenewimage", onNewImage);
        window.removeEventListener("resize", onWindowResize);
        cornerstone.disable(element);
      }
    };
  }, [props.stack]);

  useEffect(() => {
    const stackData = cornerstoneTools.getToolState(
      elementRef.current,
      "stack"
    );
    if (stackData && stackData.data.length > 0) {
      const stack = stackData.data[0];
      stack.currentImageIdIndex = state.stack.currentImageIdIndex;
      stack.imageIds = state.stack.imageIds;
      cornerstoneTools.addToolState(elementRef.current, "stack", stack);
    }
  }, [state.stack]);

  const onWindowResize = () => {
    console.log("onWindowResize");
    if (elementRef.current) {
      cornerstone.resize(elementRef.current);
    }
  };

  const onImageRendered = () => {
    if (elementRef.current) {
      const viewport = cornerstone.getViewport(elementRef.current);
      console.log(viewport);
      setState((prevState) => ({
        ...prevState,
        viewport,
      }));
      console.log(state.viewport);
    }
  };

  const onNewImage = () => {
    if (elementRef.current) {
      const enabledElement = cornerstone.getEnabledElement(elementRef.current);
      setState((prevState) => ({
        ...prevState,
        imageId: enabledElement.image.imageId,
      }));
    }
  };

  const divStyle: DivStyleType = {
    width: "512px",
    height: "512px",
    position: "relative",
    color: "white",
  };

  const bottomLeftStyle: BottomLeftStyleType = {
    bottom: "5px",
    left: "5px",
    position: "absolute",
    color: "white",
  };

  const bottomRightStyle: BottomRightStyleType = {
    bottom: "5px",
    right: "5px",
    position: "absolute",
    color: "white",
  };

  return (
    <div>
      <div className="viewportElement" style={divStyle} ref={elementRef}>
        <canvas className="cornerstone-canvas" />
        <div style={bottomLeftStyle}>Zoom: {state.viewport.scale}</div>
        <div style={bottomRightStyle}>
          WW/WC: {state.viewport.voi.windowWidth} /{" "}
          {state.viewport.voi.windowCenter}
        </div>
      </div>
    </div>
  );
};
