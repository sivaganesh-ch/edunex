import React, { useRef, useState } from "react";
// import html2canvas from "html2canvas";

const CertificatePage = ({ template, textBoxes }) => {
  const certificateRef = useRef();
  const [templateSize, setTemplateSize] = useState({ width: 800, height: 600 });

  const generateCertificate = () => {
    alert("Success");
    // html2canvas(certificateRef.current).then((canvas) => {
    //   const link = document.createElement("a");
    //   link.download = "certificate.png";
    //   link.href = canvas.toDataURL("image/png");
    //   link.click();
    // });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Certificate</h2>
      <div
        ref={certificateRef}
        className="relative border border-gray-300 mx-auto"
        style={{ width: "100%", maxWidth: "800px", height: "auto" }}
      >
        {template && (
          <img
            src={template}
            alt="Certificate Template"
            className="w-full h-auto"
            onLoad={(e) => {
              const element = e.target;
              setTemplateSize({
                width: element.clientWidth,
                height: element.clientHeight,
              });
            }}
          />
        )}

        {textBoxes.map((box) => (
          <div
            key={box.id}
            className="absolute font-bold text-black bg-white p-2 border border-gray-300"
            style={{
              top: `${(box.y / 100) * templateSize.height}px`,
              left: `${(box.x / 100) * templateSize.width}px`,
              width: `${(box.width / 100) * templateSize.width}px`,
              height: `${(box.height / 100) * templateSize.height}px`,
              overflow: "hidden",
            }}
            dangerouslySetInnerHTML={{ __html: box.text }}
          ></div>
        ))}
      </div>
      <button
        onClick={generateCertificate}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Generate Certificate
      </button>
    </div>
  );
};

export default CertificatePage;
