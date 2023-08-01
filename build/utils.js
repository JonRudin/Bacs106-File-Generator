"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
class BACS106FileGenerator {
    static generateBACS106File(rows) {
        // Build the BACS 106 file content here using the rows provided
        const fileContent = rows.map((row) => {
            // Format the row data based on the TXT format specification
            const formattedRow = `${row.destinationSortCode.padEnd(6)}${row.destinationAccountNumber.padEnd(9)}${row.bacsCode.padEnd(19)}${row.amount.padEnd(28)}${row.paymentReference.padEnd(80)}${row.destinationAccountName}\n`;
            return formattedRow;
        });
        // Join all the rows into a single string
        return fileContent.join('');
    }
    static generate100CollectionRows() {
        const rows = [];
        // Generate 100 rows of collection data (placeholder values)
        for (let i = 0; i < 100; i++) {
            const destinationSortCode = '123456';
            const destinationAccountNumber = '123456789';
            const bacsCode = 'ABC1234';
            const amount = '1000.00';
            const paymentReference = `REF-${i + 1}`;
            const destinationAccountName = 'John Doe';
            rows.push({ destinationSortCode, destinationAccountNumber, bacsCode, amount, paymentReference, destinationAccountName });
        }
        return rows;
    }
    static generateBACS106FileWith100Collections() {
        const rows = BACS106FileGenerator.generate100CollectionRows();
        const fileContent = BACS106FileGenerator.generateBACS106File(rows);
        // Save the BACS 106 file to disk
        fs_1.default.writeFile('bacs106file.txt', fileContent, (err) => {
            if (err) {
                console.error('Error writing BACS 106 file:', err);
            }
            else {
                console.log('BACS 106 file generated successfully.');
            }
        });
    }
}
// Generate the BACS 106 file using the class method
BACS106FileGenerator.generateBACS106FileWith100Collections();
