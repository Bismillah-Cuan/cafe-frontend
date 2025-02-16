import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const PdfConverter = ({ htmlContent }: { htmlContent: string }) => {
  const pdfRef = useRef<HTMLDivElement | null>(null);

  const generatePdf = () => {
    const element = pdfRef.current;
    html2canvas(element!, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 150;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("form.pdf");
    });
  };

  return (
    <div>
      {/* Container for the HTML Content */}
      <div ref={pdfRef} dangerouslySetInnerHTML={{ __html: htmlContent }} />

      {/* Button to Generate PDF */}
      <button onClick={generatePdf} style={{ marginTop: "20px" }}>
        Download PDF
      </button>
    </div>
  );
};

export default PdfConverter;
