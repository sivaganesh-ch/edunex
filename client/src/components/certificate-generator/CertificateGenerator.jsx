// import React, { Component } from "react";
// import { Rnd } from "react-rnd";
// import ReactQuill, { Quill } from "react-quill";
// import "react-quill/dist/quill.bubble.css"; // Import the Bubble theme

// import cert from "./CertificateTemplates/Python Full Stack.png"

// const BubbleTheme = Quill.import("themes/bubble");

// class ExtendBubbleTheme extends BubbleTheme {
//   constructor(quill, options) {
//     super(quill, options);

//     quill.on("selection-change", (range) => {
//       if (range) {
//         quill.theme.tooltip.show();
//         quill.theme.tooltip.position(quill.getBounds(range));
//       }
//     });
//   }
// }

// Quill.register("themes/bubble", ExtendBubbleTheme);

// const toolbarOptions = [
//     [{ 'header': [1,2,3,4,5,6,false]},
//         "bold", "italic", "underline", "strike",
//       { color: [] }, { background: [] },
//       "image",
//       {align:[]},
//       "clean",
//     ]
//   ];


// class CertificateGenerator extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//         lock: false,
//         certificateTemplate: "",
//         rndElements: [
//         {
//           id: 1,
//           text: "Text for <strong>Rnd 1</strong>",
//           position: { x: 0, y: 0 },
//           size: { width: 200, height: 100 },
//         },
//       ],
//     };
//   }

// setLock = (lockState) => {
//     this.setState({ lock: lockState });
// }

//   addRndElement = () => {
//     const { rndElements } = this.state;
//     const newElement = {
//       id: rndElements.length + 1,
//       text: `Text for <strong>Rnd ${rndElements.length + 1}</strong>`,
//       position: { x: 500, y: 500 },
//       size: { width: 200, height: 100 },
//     };
//     this.setState({ rndElements: [...rndElements, newElement] });
//   };

//   handleTextChange = (id, newText) => {
//     const updatedElements = this.state.rndElements.map((element) =>
//       element.id === id ? { ...element, text: newText } : element
//     );
//     this.setState({ rndElements: updatedElements });
//   };

//   render() {
//     const { rndElements } = this.state;

//     console.log("Lock: ", this.state.lock);
//     console.log("Certificate: ", this.state.certificateTemplate);
//     console.log("TextBoxes: ", this.state.rndElements);

//     return (
//       <div className="p-4 bg-gray-100 h-screen">
//         <button
//           onClick={this.addRndElement}
//           className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//         >
//           Add Rnd Element
//         </button>
//         <button className="bg-red-800" onClick={()=>this.setLock(true)}>Lock</button>
//           <button className="bg-green-800" onClick={()=>this.setLock(false)}>Unlock</button>
//           <input placeholder="Upload" type="file" accept="jpeg/png/jpg" onChange={(e)=> this.setState({certificateTemplate: URL.createObjectURL(e.target.files[0])})}/>
//         <div
//           className="relative justify-items-center w-full h-[calc(100vh-4rem)] overflow-auto scrollbar-hide hide-scrollbar"
//         >
//           <div className="h-[calc(100%)] w-auto">
//             <img src={cert} alt="certificate" className="h-[calc(100%-8px)] w-auto mb-2" style={{  }}/>
//             <img src={cert} alt="certificate" className="h-[calc(100%-8px)] w-auto mb-2" style={{  }}/>
//             {this.state.certificateTemplate!=="" && 
//             (
//               <img src={this.state.certificateTemplate} style={{position:"relative",height:"95%", width:"auto",margin:"3px"}}/>
//             )}
//           {rndElements.map((element, certificateCount) => (
//             <Rnd
//               key={element.id}
//               default={{
//                 x: element.position.x,
//                 y: element.position.y,
//                 width: element.size.width,
//                 height: element.size.height,
//               }}
//               // onResizeStop={}
//               bounds={rndElements.length!==0?"parent":""}
//               className={"border-blue-500 hover:border-[2px] absolute"}
//             >
//               <ReactQuill
//                 readOnly={this.state.lock}
//                 key={`editor-${element.id}`}
//                 theme="bubble"
//                 modules={{ toolbar: toolbarOptions }}
//                 value={element.text}
//                 onChange={(newText) => this.handleTextChange(element.id, newText)}
//                 className="custom-quill-editor w-full h-full text-black p-0 m-0"
//               />
//             </Rnd>
//           ))}
//         </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default CertificateGenerator;

import React, { useState, useRef } from "react";
import { Rnd } from "react-rnd";
import { Button } from "@/components/ui/button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

const CertificateGenerator = () => {
  const [template, setTemplate] = useState(null);
  const [fields, setFields] = useState([]);
  const fileInputRef = useRef(null);

  const handleTemplateUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setTemplate(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const addField = (type) => {
    setFields([...fields, { id: Date.now(), type, x: 0.1, y: 0.1, width: 0.2, height: 0.05, text: "Sample Text", fontSize: 16, fontFamily: "Arial", textColor: "#000000", minSize: 50, maxSize: 300 }]);
  };

  const updateField = (id, data) => {
    setFields(fields.map((field) => (field.id === id ? { ...field, ...data } : field)));
  };

  const handleTextChange = (id, text) => {
    setFields(fields.map((field) => {
      if (field.id === id) {
        const newSize = Math.max(12, Math.min(150 / text.length, field.maxSize));
        return { ...field, text, fontSize: newSize };
      }
      return field;
    }));
  };

  const saveTemplate = () => {
    console.log("Saved Positions:", fields);
    alert("Template configuration saved successfully!");
  };

  return (
    <div className="flex flex-col items-center p-5 w-full">
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleTemplateUpload}
        className="hidden"
      />
      <Button onClick={() => fileInputRef.current.click()} className="mb-4">Upload Certificate Template</Button>
      <div className="flex gap-2 mb-4">
        <Button onClick={() => addField("text")} className="bg-blue-500">Add Text Box</Button>
        <Button onClick={() => addField("qr")} className="bg-green-500">Add QR Code</Button>
      </div>
      <div className="relative border w-full max-w-4xl h-auto aspect-[4/3] bg-gray-100 flex justify-center items-center">
        {template && <img src={template} alt="Certificate Template" className="absolute w-full h-full object-contain" />}
        {fields.map((field) => (
          <Rnd
            key={field.id}
            default={{ x: field.x * 500, y: field.y * 500, width: field.width * 500, height: field.height * 500 }}
            bounds="parent"
            enableResizing={true}
            dragHandleClassName="drag-handle"
            onDragStop={(e, d) => updateField(field.id, { x: d.x / 500, y: d.y / 500 })}
            onResizeStop={(e, dir, ref, delta, position) => updateField(field.id, { width: ref.offsetWidth / 500, height: ref.offsetHeight / 500, ...position })}
            className="absolute bg-white p-2 border shadow-md flex justify-center items-center text-center overflow-hidden"
          >
            {field.type === "text" ? (
              <ReactQuill
                theme="bubble"
                value={field.text}
                onChange={(text) => handleTextChange(field.id, text)}
                className="w-full h-full drag-handle"
                style={{ fontSize: `${field.fontSize}px`, fontFamily: field.fontFamily, color: field.textColor }}
              />
            ) : (
              <div className="w-full h-full flex justify-center items-center border bg-gray-200">
                QR Code
              </div>
            )}
            <div className="absolute bottom-0 left-0 w-full bg-white p-1 flex space-x-2 opacity-75">
              <input
                type="color"
                value={field.textColor}
                onChange={(e) => updateField(field.id, { textColor: e.target.value })}
              />
              <select
                value={field.fontFamily}
                onChange={(e) => updateField(field.id, { fontFamily: e.target.value })}
              >
                <option value="Arial">Arial</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Courier New">Courier New</option>
                <option value="Verdana">Verdana</option>
              </select>
            </div>
          </Rnd>
        ))}
      </div>
      <Button onClick={saveTemplate} className="mt-4 bg-red-500">Save Template</Button>
    </div>
  );
};

export default CertificateGenerator;
