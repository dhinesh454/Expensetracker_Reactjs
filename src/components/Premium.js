import { useState } from "react";
import ToogleSwitch from "./ToogleSwitch";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Premium = () => {
    const [premiumClicked, setPremiumClicked] = useState(false);
    const expenses = useSelector((state) => state.expenses.expenses);

    const premiumHandler = () => {
        setPremiumClicked(true);
    };

    const downloadHandler = () => {
        const doc = new jsPDF();
        const tableColumn = ["Amount", "Description", "Category"];
        const tableRows = [];

        expenses.forEach(expense => {
            const expenseData = [
                expense.amount,
                expense.description,
                expense.option
            ];
            tableRows.push(expenseData);
        });

        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 20,
            theme: "striped"
        });

        doc.text("Expenses Report", 14, 15);
        doc.save("expenses.pdf");
    };

    return (
        <div className="d-flex justify-content-between m-1 p-1 align-items-center">
            <Button onClick={premiumClicked ? downloadHandler : premiumHandler} variant={premiumClicked ? "success" : "warning"}>
                {premiumClicked ? 'Download Expenses as PDF' : 'Activate Premium'}
            </Button>
           {premiumClicked &&  <ToogleSwitch/>}

        </div>
    );
};

export default Premium;
