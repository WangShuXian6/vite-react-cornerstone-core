import "./App.css";
import { CornerstoneElement } from "./components/cornerstone-element";

const imageId =
  "https://rawgit.com/cornerstonejs/cornerstoneWebImageLoader/master/examples/Renal_Cell_Carcinoma.jpg";

const stack = {
  imageIds: [imageId],
  currentImageIdIndex: 0,
};

function App() {
  return (
    <>
      <CornerstoneElement stack={{ ...stack }} />
    </>
  );
}

export default App;
