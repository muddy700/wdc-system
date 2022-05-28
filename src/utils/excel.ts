// // import Excel from 'exceljs';

// export const generateExcel = async (columns: Array<object>, data: Array<object>, fileName: string, response: any) => {
//     // Create Excel workbook and worksheet
//     const workbook = new Excel.Workbook();
//     const worksheet = workbook.addWorksheet('data');

//     // Define columns in the worksheet, these columns are identified using a key.
//     worksheet.columns = columns;

//     // Add rows from database to worksheet 
//     for (const row of data) {
//         worksheet.addRow(row);
//     }

//     // Add auto-filter on each column
//     worksheet.autoFilter = 'A1:D1';
//     // Finally save the worksheet into the folder from where we are running the code. 
//     response.setHeader(
//         "Content-Type",
//         "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
//     );

//     response.setHeader(
//         "Content-Disposition",
//         "attachment; filename=" + fileName
//     );

//     await workbook.xlsx.write(response);

//     response.end();
// }