import "./App.css";
import List from "./Components/List";
import { BrowserRouter } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <List />
    </BrowserRouter>
  );
}

export default App;
