
// import React from "react";
// import { Quill } from "react-quill";

// // Custom Undo button icon component for Quill editor. You can import it directly
// // from 'quill/assets/icons/undo.svg' but I found that a number of loaders do not
// // handle them correctly
// const CustomUndo = () => (
//   <svg viewBox="0 0 18 18">
//     <polygon className="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10" />
//     <path
//       className="ql-stroke"
//       d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"
//     />
//   </svg>
// );

// // Redo button icon component for Quill editor
// const CustomRedo = () => (
//   <svg viewBox="0 0 18 18">
//     <polygon className="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10" />
//     <path
//       className="ql-stroke"
//       d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"
//     />
//   </svg>
// );

// // Undo and redo functions for Custom Toolbar
// function undoChange() {
//   this.quill.history.undo();
// }
// function redoChange() {
//   this.quill.history.redo();
// }

// // // Add sizes to whitelist and register them
// // const sizeList = ["extra-small", "small", "medium", "large"];
// // const Size = Quill.import("formats/size");
// // Size.whitelist = sizeList;
// // Quill.register(Size, true);

// // // Add fonts to whitelist and register them
// // const fontList = [
// //   "arial",
// //   "comic-sans",
// //   "courier-new",
// //   "georgia",
// //   "helvetica",
// //   "lucida",
// //   "Times New Roman",
// // ];

// // const Font = Quill.import("formats/font");
// // Font.whitelist = fontList;
// // Quill.register(Font, true);

// const sizeList = [
//     "8px",
//     "9px",
//     "10px",
//     "11px",
//     "12px",
//     "14px",
//     "16px",
//     "18px",
//     "20px",
//     "22px",
//     "24px",
//     "26px",
//     "28px",
//     "32px",
//     "36px",
//     "39px",
//     "40px",
//     "43px",
//     "46px",
//     "72px",
//   ];
  
//   const fontList = [
//     "Arial",
//     "Arial Black",
//     "Arial Unicode MS",
//     "Calibri",
//     "Cambria",
//     "Cambria Math",
//     "Candara",
//     // `Segoe UI, wf_segoe-ui_normal, helvetica, arial, sans-serif`,
//     "Comic Sans MS",
//     "Consolas",
//     "Constantia",
//     "Corbel",
//     "Courier New",
//     "Georgia",
//     "Lucida Sans Unicode",
//     "Tahoma",
//     "Times New Roman",
//     "Trebuchet MS",
//     "Verdana",
//   ];  

// let Size = Quill.import("attributors/style/size");
// Size.whitelist = sizeList;

// let Font = Quill.import("attributors/style/font");
// Font.whitelist = fontList;

// Quill.register(Font, true);
// Quill.register(Size, true);


// // Modules object for setting up the Quill editor
// export const modules = {
//   toolbar: {
//     container: "#toolbar",
//     handlers: {
//       undo: undoChange,
//       redo: redoChange
//     }
//   },
//   history: {
//     delay: 500,
//     maxStack: 100,
//     userOnly: true
//   }
// };

// // Formats objects for setting up the Quill editor
// export const formats = [
//   "header",
//   "font",
//   "size",
//   "bold",
//   "italic",
//   "underline",
//   "align",
//   "strike",
//   "script",
//   "blockquote",
//   "background",
//   "list",
//   "bullet",
//   "indent",
//   "link",
//   "image",
//   "color",
//   "code-block"
// ];

// // Quill Toolbar component
// export const QuillToolbar = () => true? (
//   <div id="toolbar">

//     {/* <span className="ql-formats">
//       <input type="text" className="w-[30px] bg-transparent rounded-sm border-2 border-white/20"/>
//       <select className="ql-size" defaultValue={sizeList[0]}>
//         {sizeList.map((fontSize, index)=>(
//           <option key={index} value={fontSize}>{fontSize}</option>
//         ))}
//       </select>
//     </span> */}
//     <span className="ql-formats">
//       <select className="ql-size" defaultValue={sizeList[0]}>
//         {sizeList.map((fontSize, index)=>(
//           <option key={index} value={fontSize}>{fontSize}</option>
//         ))}
//       </select>
//       <select className="ql-font" defaultValue={fontList[0]}>
//           {fontList.map((fontStyle, index)=> (
//           <option key={index} value={fontStyle}>{fontStyle}</option>
//           ))}
//       </select>
        
//       {/* <select className="ql-header" defaultValue="3">
//         <option value="1">Heading</option>
//         <option value="2">Subheading</option>
//         <option value="3">Normal</option>
//       </select> */}
//     </span>
//     <span className="ql-formats">
//       <button className="ql-bold" />
//       <button className="ql-italic" />
//       <button className="ql-underline" />
//       <button className="ql-strike" />
//     </span>
//     {/* <span className="ql-formats">
//       <button className="ql-list" value="ordered" />
//       <button className="ql-list" value="bullet" />
//       <button className="ql-indent" value="-1" />
//       <button className="ql-indent" value="+1" />
//     </span>
//     <span className="ql-formats">
//       <button className="ql-script" value="super" />
//       <button className="ql-script" value="sub" />
//       <button className="ql-blockquote" />
//       <button className="ql-direction" />
//     </span> */}
//     <span className="ql-formats">
//       <select className="ql-align" />
//       <select className="ql-color" />
//       <select className="ql-background" />
//     </span>
//     <span className="ql-formats">
//       <button className="ql-link" />
//       <button className="ql-image" />
//       {/* <button className="ql-video" /> */}
//     </span>
//     <span className="ql-formats">
//       {/* <button className="ql-formula" /> */}
//       {/* <button className="ql-code-block" /> */}
//       <button className="ql-clean" />
//     </span>
//     <span className="ql-formats">
//       <button className="ql-undo">
//         <CustomUndo />
//       </button>
//       <button className="ql-redo">
//         <CustomRedo />
//       </button>
//     </span>
//   </div>
// ):(<div id="toolbar"></div>);

// export default QuillToolbar;


import React from "react";
import { Quill } from "react-quill";

// Custom Undo and Redo Button Components
const CustomUndo = () => (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10" />
    <path
      className="ql-stroke"
      d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"
    />
  </svg>
);

const CustomRedo = () => (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10" />
    <path
      className="ql-stroke"
      d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"
    />
  </svg>
);

// Undo and Redo Functions
function undoChange() {
  if (this.quill) this.quill.history.undo();
}

function redoChange() {
  if (this.quill) this.quill.history.redo();
}

// Font and Size Whitelisting
const sizeList = [
  "8px", "9px", "10px", "11px", "12px", "14px", "16px", "18px",
  "20px", "22px", "24px", "26px", "28px", "32px", "36px", "40px",
  "46px", "72px"
];

const fontList = [
  "Arial", "Arial Black", "Calibri", "Cambria", "Comic Sans MS",
  "Courier New", "Georgia", "Lucida Sans Unicode", "Tahoma",
  "Times New Roman", "Trebuchet MS", "Verdana"
];

let Size = Quill.import("attributors/style/size");
Size.whitelist = sizeList;

let Font = Quill.import("attributors/style/font");
Font.whitelist = fontList;

Quill.register(Font, true);
Quill.register(Size, true);

// Quill Modules and Formats
export const modules = {
  toolbar: {
    container: "#toolbar",
    handlers: {
      undo: undoChange,
      redo: redoChange
    }
  },
  history: {
    delay: 500,
    maxStack: 100,
    userOnly: true
  }
};

export const formats = [
  "header", "font", "size", "bold", "italic", "underline",
  "align", "strike", "script", "blockquote", "background",
  "list", "bullet", "indent", "link", "image", "color", "code-block"
];

// Quill Toolbar Component
export const QuillToolbar = () => (
  <div id="toolbar">
    <span className="ql-formats">
      <select className="ql-size" defaultValue={sizeList[0]}>
        {sizeList.map((fontSize, index) => (
          <option key={index} value={fontSize}>{fontSize}</option>
        ))}
      </select>
      <select className="ql-font" defaultValue={fontList[0]}>
        {fontList.map((fontStyle, index) => (
          <option key={index} value={fontStyle}>{fontStyle}</option>
        ))}
      </select>
    </span>

    <span className="ql-formats">
      <button className="ql-bold" />
      <button className="ql-italic" />
      <button className="ql-underline" />
      <button className="ql-strike" />
    </span>

    <span className="ql-formats">
      <select className="ql-align" />
      <select className="ql-color" />
      <select className="ql-background" />
    </span>

    <span className="ql-formats">
      <button className="ql-link" />
      <button className="ql-image" />
    </span>

    <span className="ql-formats">
      <button className="ql-clean" />
    </span>

    <span className="ql-formats">
      <button className="ql-undo">
        <CustomUndo />
      </button>
      <button className="ql-redo">
        <CustomRedo />
      </button>
    </span>
  </div>
);

export default QuillToolbar;
