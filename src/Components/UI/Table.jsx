import * as React from "react";

// --- Table Components (Named Exports) ---
// The 'export const' syntax allows these components to be imported by name { Table, TableHeader, ... }
export const Table = ({ children, className, ...props }) => 
    <div className="relative w-full overflow-auto">
        <table className={`w-full caption-bottom text-sm ${className || ''}`} {...props}>{children}</table>
    </div>;
    
export const TableHeader = ({ children, className, ...props }) => 
    <thead className={`[&_tr]:border-b ${className || ''}`} {...props}>{children}</thead>;
    
export const TableBody = ({ children, className, ...props }) => 
    <tbody className={`[&_tr:last-child]:border-0 ${className || ''}`} {...props}>{children}</tbody>;
    
export const TableFooter = ({ children, className, ...props }) => 
    <tfoot className={`border-t bg-gray-100/50 dark:bg-gray-700/50 font-medium [&>tr]:last:border-b-0 ${className || ''}`} {...props}>{children}</tfoot>;
    
export const TableRow = ({ children, className, ...props }) => 
    <tr className={`border-b transition-colors data-[state=selected]:bg-gray-100 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 ${className || ''}`} {...props}>{children}</tr>;
    
export const TableHead = ({ children, className, ...props }) => 
    <th className={`h-12 px-4 text-left align-middle font-medium text-gray-500 dark:text-gray-400 [&:has([role=checkbox])]:pr-0 ${className || ''}`} {...props}>{children}</th>;
    
export const TableCell = ({ children, className, ...props }) => 
    <td className={`p-4 align-middle [&:has([role=checkbox])]:pr-0 ${className || ''}`} {...props}>{children}</td>;
    
export const TableCaption = ({ children, className, ...props }) => 
    <caption className={`mt-4 text-sm text-gray-500 dark:text-gray-400 ${className || ''}`} {...props}>{children}</caption>;




const MOCK_INVOICES = [
    {
        invoice: "INV001",
        paymentStatus: "Paid",
        method: "Credit Card",
        amount: 250.00,
    },
    {
        invoice: "INV002",
        paymentStatus: "Pending",
        method: "Bank Transfer",
        amount: 150.00,
    },
    {
        invoice: "INV003",
        paymentStatus: "Unpaid",
        method: "PayPal",
        amount: 350.00,
    },
    {
        invoice: "INV004",
        paymentStatus: "Paid",
        method: "Credit Card",
        amount: 450.00,
    },
];

const getStatusBadge = (status) => {
    let badgeClass = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium";
    
    switch (status) {
        case "Paid":
            return <span className={`${badgeClass} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300`}>{status}</span>;
        case "Pending":
            return <span className={`${badgeClass} bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300`}>{status}</span>;
        case "Unpaid":
            return <span className={`${badgeClass} bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300`}>{status}</span>;
        default:
            return <span className={`${badgeClass} bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300`}>{status}</span>;
    }
};


// --- Main Component (Default Export) ---

const InvoiceTable = () => {
    // Note: Since all the Table components are now exported, 
    // we can use them directly here.
    const totalAmount = MOCK_INVOICES.reduce((sum, invoice) => sum + invoice.amount, 0);

    return (
        <div className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-4xl mx-auto my-12">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Recent Invoices</h2>
            <Table className="border dark:border-gray-700 rounded-lg">
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow className="bg-gray-50 dark:bg-gray-700">
                        <TableHead className="w-[100px] font-bold text-gray-900 dark:text-white">Invoice</TableHead>
                        <TableHead className="font-bold text-gray-900 dark:text-white">Status</TableHead>
                        <TableHead className="font-bold text-gray-900 dark:text-white">Method</TableHead>
                        <TableHead className="text-right font-bold text-gray-900 dark:text-white">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {MOCK_INVOICES.map((invoice) => (
                        <TableRow key={invoice.invoice} className="dark:border-gray-700">
                            <TableCell className="font-medium text-gray-900 dark:text-white">{invoice.invoice}</TableCell>
                            <TableCell>{getStatusBadge(invoice.paymentStatus)}</TableCell>
                            <TableCell className="text-gray-600 dark:text-gray-400">{invoice.method}</TableCell>
                            <TableCell className="text-right font-medium text-gray-900 dark:text-white">${invoice.amount.toFixed(2)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3} className="text-right font-bold text-gray-900 dark:text-white">Total</TableCell>
                        <TableCell className="text-right font-extrabold text-lg text-gray-900 dark:text-white">${totalAmount.toFixed(2)}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    );
};

export default InvoiceTable;