import explorer from './data'
import { useState } from 'react'
import FileExplorer from "./FileExplorer"
function App() {
  const [explorerData,setExplorerData]=useState(explorer);
  return (
    <div>
      <FileExplorer explorer={explorerData}/>
    </div>
  );
}

export default App;
