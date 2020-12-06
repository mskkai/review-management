import React, { Component } from "react";
import XLSX from "xlsx";
import { FileUpload } from "primereact/fileupload";
import { Button } from "primereact/button";
export default class ImportData extends Component {
  excelToJson(reader) {
    let fileData = reader.result;
    let wb = XLSX.read(fileData, { type: "binary" });
    let data = [];
    let count = 0;

    wb.SheetNames.forEach(function (sheetName) {
      var rowObj = XLSX.utils.sheet_to_row_object_array(wb.Sheets[sheetName]);
      data[count++] = rowObj;
    });
    this.props.importedDataHandler(data);
  }
  loadFileXLSX(event) {
    var input = event.target;
    var reader = new FileReader();
    reader.onload = this.excelToJson.bind(this, reader);
    reader.readAsBinaryString(input.files[0]);
  }
  render() {
    return (
      <div>
        <Button onClick={() => document.getElementById("getFile").click()}>
          IMPORT DATA
        </Button>

        <FileUpload
          name="demo[]"
          url="./upload.php"
          onUpload={this.loadFileXLSX.bind(this)}
          multiple
          accept="image/*"
          maxFileSize={1000000}
          emptyTemplate={
            <p className="p-m-0">Drag and drop files to here to upload.</p>
          }
        />
      </div>
    );
  }
}
