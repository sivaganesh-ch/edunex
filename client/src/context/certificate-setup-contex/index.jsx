import { createContext, useState } from "react";

export const CertificateContext = createContext(null);

export default function CertificateProvider({ children }) {
  const [certificateConfig, setCertificateConfig] = useState({ textBoxesOrder: [] });
  const [textBoxes, setTextBoxes] = useState([]);
  const [template, setTemplate] = useState(null);
  const [templateSize, setTemplateSize] = useState({ width: 800, height: 600 });
  const [EditMode, setEditMode] = useState(true);

  return (
    <CertificateContext.Provider
      value={{
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
      }}
    >
      {children}
    </CertificateContext.Provider>
  );
}
