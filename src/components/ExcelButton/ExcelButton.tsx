import { FC } from "react";
import { RiFileExcel2Fill } from "react-icons/ri";
import * as XLSX from "xlsx";

import './ExcelButton.css'

interface ExcelButtonProps {
  dataDownload: any;
  tituloDocumento: string;
  nombreArchivo: string;
}

export const ExcelButton: FC<ExcelButtonProps> = ({
  dataDownload,
  tituloDocumento,
  nombreArchivo,
}) => {
  function handleDownloadExcel() {
    const worksheet = XLSX.utils.json_to_sheet(dataDownload);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, tituloDocumento);
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = window.URL.createObjectURL(data);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${nombreArchivo}.xlsx`;
    link.click();
  }
  return (
    <button onClick={handleDownloadExcel} className="excelButton">
      <RiFileExcel2Fill />
    </button>
  );
};