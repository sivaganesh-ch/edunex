import React, { useState, useContext } from "react";
import { Rnd } from "react-rnd";
import parser from "html-react-parser";
import cert from "../certificate-generator/CertificateTemplates/Python Full Stack.png"
import TipTapEditorOne from "./TipTapEditorOne";
import { CertificateContext } from "@/context/certificate-setup-contex";

  const TipTapBubbleEditor = () => {
    const {
        certificateConfig, 
        setCertificateConfig,
        textBoxes,
        setTextBoxes,
        template,
        setTemplate,
        templateSize,
        setTemplateSize,
        EditMode,
        setEditMode
    } = useContext(CertificateContext);
  
    const addTextBox = () => {
      setEditMode(true);
      let textBoxName = prompt("Enter Text Box Name?");
      console.log(textBoxName)
      if(textBoxName !== null){
      setTextBoxes([
        ...textBoxes,
        { id: Date.now(), 
          textBoxName: textBoxName,
          x: 0, 
          y: 0, 
          width: 20, 
          height: 5, 
          text: "Enter", 
          fontSize: 16,
          // fontFamily: "Arial",
          // textAlign: "left",
          // color: "#000000",
        },
      ]);
    }
      certificateConfig.textBoxesOrder.push(textBoxName);
    };
  
    const handleTemplateUpload = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => setTemplate(reader.result);
      reader.readAsDataURL(file);
    };
  
    const saveConfiguration = () => {
      const configuration = textBoxes.map((box) => ({
        id: box.id,
        text: box.text,
        x: (box.x / templateSize.width) * 100, // Convert to percentage
        y: (box.y / templateSize.height) * 100, // Convert to percentage
        width: (box.width / templateSize.width) * 100, // Convert to percentage
        height: (box.height / templateSize.height) * 100, // Convert to percentage
        fontSize: box.fontSize,
        //   fontFamily: box.fontFamily,
        //   textAlign: box.textAlign,
        //   color: box.color,
        // fontSize: (box.height), // 36
      }));
      setEditMode(!EditMode);
      console.log("Saved Configuration:", configuration);
      // Save `configuration` and `template` to the backend
    };


    console.log("Template: ", templateSize)
    console.log("Certificate Config: ", certificateConfig)
    console.log("text Boxes: ", textBoxes);

    // const extractStyles = (index) => {
    //   if (quillEditorRef.current) {
    //     const editor = quillEditorRef.current.getEditor();
    //     const selection = editor.getSelection();
    //     if (selection) {
    //       const format = editor.getFormat(selection.index);
    //       const updatedTextBox = [...textBoxes];
    //       updatedTextBox[index].fontSize = format.size || "20px";
    //       updatedTextBox[index].fontFamily = format.font || "Arial";
    //       updatedTextBox[index].textAlign = format.align || "center";
    //       updatedTextBox[index].color = format.color || "#000000";
    //     }
    //   }
    // };
    return (
      <div className="p-4 h-screen overflow-auto">
        <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
        <input
          type="file"
          accept="image/*"
          onChange={handleTemplateUpload}
          className="mb-4"
        />
        <button
          onClick={addTextBox}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          Add Text Box
        </button>
        <button
          onClick={saveConfiguration}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          {EditMode?"Save Configuration":"Edit Configuration"}
        </button>
        <button
          onClick={()=>setEditMode(!EditMode)}
          className="bg-orange-600 text-white px-4 py-2 rounded"
        >
          {EditMode?"Disable Edit":"Edit Mode"}
        </button>
  
        <div
          className="relative mt-6 border border-gray-300 mx-auto"
          style={{ width: "100%", maxWidth: "800px", height: "auto" }}
        >
          {/* <img
              src={cert}
              alt="Certificate Template"
              className="w-full h-auto "
              onLoad={(e) => {
                const element = e.target;
                setTemplateSize({
                  width: element.clientWidth,
                  height: element.clientHeight,
                });
              }}
            /> */}
          {template && (
            <img
              src={template}
              alt="Certificate Template"
              className="w-full h-auto relative"
              onLoad={(e) => {
                const element = e.target;
                setTemplateSize({
                  width: element.clientWidth,
                  height: element.clientHeight,
                });
              }}
            />
          )}
  
          {textBoxes.map((box, index) =>  
          EditMode? (
            <Rnd
              // className={`w-[${(box.width / 100) * templateSize.width}px] h-[${(box.height / 100) * templateSize.height}px]`}
              className="w-full h-full border-2 border-black"
              key={box.id}
              bounds="parent"
              size={{
                width: `${(box.width / 100) * templateSize.width}px`,
                height: `${(box.height / 100) * templateSize.height}px`,
              }}
              position={{
                x: (box.x / 100) * templateSize.width,
                y: (box.y / 100) * templateSize.height,
              }}
              onDragStop={(e, data) => {
                const updatedBoxes = [...textBoxes];
                updatedBoxes[index].x = (data.x / templateSize.width) * 100; // Save as percentage
                updatedBoxes[index].y = (data.y / templateSize.height) * 100; // Save as percentage
                setTextBoxes(updatedBoxes);
              }}
              onResizeStop={(e, direction, ref, delta, position) => {
                const updatedBoxes = [...textBoxes];
                updatedBoxes[index].width =
                  (parseInt(ref.style.width) / templateSize.width) * 100; // Save as percentage
                updatedBoxes[index].height =
                  (parseInt(ref.style.height) / templateSize.height) * 100; // Save as percentage
                updatedBoxes[index].x = (position.x / templateSize.width) * 100; // Save as percentage
                updatedBoxes[index].y = (position.y / templateSize.height) * 100; // Save as percentage
                // updatedBoxes[index].fontSize = (parseInt(ref.style.width)) * 0.2;
                // console.log("Converted Font-Size: " ,updatedBoxes[index].fontSize);
                setTextBoxes(updatedBoxes);
              }}
              // disableDragging={lock}
              // enableResizing={!lock}
            >
              <div className="text-editor h-full w-full">
              <TipTapEditorOne boxIndex={index}/>
              </div>
            </Rnd>) : 
            // parser(box.text)
            (<div
            key={box.id}
            className="absolute text-black border-2 border-gray-300 p-1"
            style={{
              // display:"flex",
              top: `${(box.y) }%`,
              left: `${(box.x) }%`,
              width: `${(box.width) }%`,
              height: `${(box.height) }%`,
            //   justifyContent: box.textAlign,
            //   alignItems: "center",
              // fontSize: `clamp(1px, ${box.size ? box.size.replace("px", "") / 10 : 2}vw, 18px)`,
            //   fontFamily: box.fontFamily,
            //   color: box.color,
            //   overflow: "hidden",
              // fontSize: `${(box.fontSize) }px`,
              // padding: "12px 15px"
              
            }}
            // dangerouslySetInnerHTML={{ __html: box.text }}
          >
            <div className="bg-green-400 overflow-clip relative">
              {parser(box.text)}
            </div>
          </div>)
          
          )}
        </div>
      </div>
    );
  };
  
  export default TipTapBubbleEditor;