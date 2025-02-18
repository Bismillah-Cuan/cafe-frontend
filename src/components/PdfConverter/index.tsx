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
      const imgWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const pageWidth = pdf.internal.pageSize.getWidth();
      const x = (pageWidth - imgWidth) / 2; // Centering calculation
      pdf.addImage(imgData, "PNG", x, 0, imgWidth, imgHeight);
      pdf.save("form.pdf");
    });
  };

  return (
    <div className="flex flex-col items-center mt-5 gap-10">
      {/* Container for the HTML Content */}
      <div ref={pdfRef} dangerouslySetInnerHTML={{ __html: htmlContent }} className="text-slate-900"/>

      {/* Button to Generate PDF */}
      <button onClick={generatePdf} className="text-slate-900 font-light text-center bg-slate-400 hover:bg-slate-500 px-2 py-1 rounded-md">
        Download PDF
      </button>
    </div>
  );
};

export default PdfConverter;
