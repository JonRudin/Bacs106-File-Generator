import fs from 'fs';
import Chance from "chance";
const chance = new Chance();

interface BACSRow {
    destinationSortCode: string;
    destinationAccountNumber: string;
    destinationAccountType: string;
    bacsCode: string;
    debitSortCode: string;
    debitAccountNumber: string;
    freeFormatText: string;
    amount: string;
    originatorName: string;
    paymentReference: string;
    destinationAccountName: string;
    processingDate: string;
}

export default class BACS106FileGenerator {
    private static generateBACS106File(rows: BACSRow[]): string {
        // Build the BACS 106 file content here using the rows provided
        const fileContent = rows.map((row) => {
            // Format the row data based on the TXT format specification
            return `${row.destinationSortCode.padEnd(6)}${row.destinationAccountNumber.padEnd(8)}${row.destinationAccountType.padEnd(1)}${row.bacsCode.padEnd(2)}${row.debitSortCode.padEnd(6)}${row.debitAccountNumber.padEnd(8)}${row.freeFormatText.padEnd(4)}${row.amount.padEnd(11)}${row.originatorName.padEnd(18)}${row.paymentReference.padEnd(18)}${row.destinationAccountName.padEnd(18)}${row.processingDate.padEnd(6)}\n`;
        });

        // Join all the rows into a single string
        return fileContent.join('');
    }

    private static generate100CollectionRows(): BACSRow[] {
        const rows: BACSRow[] = [];
        const bacsCollectionCodes = ['01', '17', '18', '19', '99']

        // Generate 100 rows of collection data (placeholder values)
        for (let i = 0; i < 100; i++) {
            const destinationSortCode = '123456';
            const destinationAccountNumber = '123456789';
            const destinationAccountType = '0'
            const bacsCode = bacsCollectionCodes[Math.floor(Math.random() * bacsCollectionCodes.length)];;
            const debitSortCode = '000000'
            const debitAccountNumber ='00000000'
            const freeFormatText = 'TES'
            const amount = chance.integer({ min: 1, max: 99999999999 }).toString();
            const originatorName = 'TES'
            const paymentReference = `OHS-${i + 1}`;
            const destinationAccountName = chance.name()
            const processingDate = '010101'
            rows.push({ destinationSortCode, destinationAccountNumber, destinationAccountType, bacsCode, debitSortCode, debitAccountNumber, freeFormatText, amount, originatorName, paymentReference, destinationAccountName, processingDate});
        }

        return rows;
    }

    public static generateBACS106FileWith100Collections(): void {
        const rows = BACS106FileGenerator.generate100CollectionRows();
        const fileContent = BACS106FileGenerator.generateBACS106File(rows);

        // Save the BACS 106 file to disk
        fs.writeFile('bacs106file.txt', fileContent, (err) => {
            if (err) {
                console.error('Error writing BACS 106 file:', err);
            } else {
                console.log('BACS 106 file generated successfully.');
            }
        });
    }
}


