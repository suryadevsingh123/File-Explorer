import { useState } from "react";

const FileExplorer = (explorer) => {
  const [show, setShow] = useState(false);
  const [showAdd, setShowAdd] = useState({
    visible: false,
    isFolder: null,
  });
  const [rerender, setRerender] = useState(false);
  const [error,setError]=useState(false);
  const handelAddFolder = (e, isFolder, name) => {
    e.stopPropagation();
    setShowAdd({ visible: true, isFolder: isFolder });
    setShow(!show);
  };
  const handleAdd = (e, name) => {
    setError(false);
    console.log("enter")
    let ok=true;
    for(let i=0;i<explorer.explorer.items.length;i++){
        console.log(explorer.explorer.items[i]);
        if(explorer.explorer.items[i].name===e.target.value)ok=false;
    }
    console.log(ok,"is there")
    if(ok){explorer.explorer.items.push({
      id: "4",
      name: e.target.value,
      isFolder: showAdd.isFolder,
      items: [],
    });}
    else{
        setError(true);
    }
    console.log(explorer.explorer.items);
    setRerender(!rerender);
  };
  if (explorer.explorer.isFolder) {
    return (
      <div style={{ padding: "5px" }}>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            setShow(!show);
            console.log("hey");
          }}
        >
          <span>
            📁{explorer.explorer.name}{" "}
            <button onClick={(e) => handelAddFolder(e, true)}>Folder +</button>
            <button onClick={(e) => handelAddFolder(e, false)}>File +</button>
          </span>
        </div>
        {showAdd.visible && (
          <span style={{ display: show ? "block" : "none" }}>
            <div style={{display: error?"block":"none", fontSize:"small",color:"red"}}>This file/folder already exist</div>
            {showAdd.isFolder ? "📁" : "📄"}
            <input
              autoFocus="true"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAdd(e, explorer.explorer.name);
                }
              }}
              type="text"
            />
          </span>
        )}
        <div style={{ display: show ? "block" : "none" }}>
          {explorer.explorer.items.map((exp, i) => (
            <FileExplorer explorer={exp} />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div style={{ display: "flex", marginLeft: "5px" }}>
        <span>📄{explorer.explorer.name}</span>
      </div>
    );
  }
};
export default FileExplorer;
