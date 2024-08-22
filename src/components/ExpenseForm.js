import React, { useRef, useState ,useCallback,useEffect} from "react";
import { Col, Row, Form, Button, Card } from "react-bootstrap";
import Expenses from "./Expenses";
import classes from "./ExpenseForm.module.css";
import { expenseAction } from "../store/expense";
import { useDispatch, useSelector } from "react-redux";
import PaginationComponent from "./PaginationComponent";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ExpenseForm = () => {
    const dispatch = useDispatch();
    const [editExpenses, setEditExpenses] = useState(false);
    const [expenseId, setExpenseId] = useState(null);
    const expenses = useSelector((state)=>state.expenses.expenses);


    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);


      // Expense refs
      const amountRef = useRef();
      const descriptionRef = useRef();
      const optionRef = useRef();

    // Get current expenses
    const indexOfLastExpense = currentPage * itemsPerPage;
    const indexOfFirstExpense = indexOfLastExpense - itemsPerPage;
    const currentExpenses = expenses.slice(indexOfFirstExpense, indexOfLastExpense);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

      //fetchexpense
      const fetchExpenses = useCallback(async () => {
        const localId = localStorage.getItem('localId');
  
        try {
            const response = await fetch(`https://expensetracker-744f6-default-rtdb.firebaseio.com/expenses/${localId}.json`);
            if (!response.ok) {
                throw new Error('Fetching expenses error, please check again');
            }
            const data = await response.json();
            const fetchedExpense = [];
  
            for (const key in data) {
                fetchedExpense.push({
                    key: key,
                    id: key,
                    description: data[key].description,
                    amount: data[key].amount,
                    option: data[key].option
                });
            }
            console.log(fetchedExpense)
            dispatch(expenseAction.addExpense(fetchedExpense));
            
        } catch (error) {
            console.log(error);
        }
    }, [dispatch]);



    useEffect(() => {
        fetchExpenses();
    }, [fetchExpenses]);






    const cancelEditHandler = () => {
        setEditExpenses(false);
        amountRef.current.value = '';
        descriptionRef.current.value = '';
        optionRef.current.value = 'Open this select menu';
    };


    //remove expense
    const userExpenseRemoveHandler = async (item) => {
        const localId = localStorage.getItem('localId')
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
              const response = await fetch(`https://expensetracker-744f6-default-rtdb.firebaseio.com/expenses/${localId}/${item.id}.json`, {
                method: "DELETE",
              });
      
              const data = await response.json();
      
              if (!response.ok) {
                throw new Error(`${data.message}`)
               
              }
              
              else {
                dispatch(expenseAction.deleteExpense(item.id));
                toast.success("Expense deleted successfully!");
                
              }
            } catch (error) {
              console.log("An error occurred:", error);
              toast.error(`${error}`);
            }
      
      
          }
        };



    //edit the expense
    const userExpenseEditHandler = async (item) => {
        setEditExpenses(true);
        amountRef.current.value = item.amount;
        descriptionRef.current.value = item.description;
        optionRef.current.value = item.option;
        setExpenseId(item.id);
        
    
    };



    const editHandler = async(e)=>{
        e.preventDefault();
        const localId = localStorage.getItem('localId')
        try {
          const response = await fetch(`https://expensetracker-744f6-default-rtdb.firebaseio.com/expenses/${localId}/${expenseId}.json`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                amount:amountRef.current.value,
                description:descriptionRef.current.value,
                option:optionRef.current.value
             }),
          });
    
          const data = await response.json();
    
    
          if (!response.ok) {
            throw new Error(`${data.message}`)
          } else {
            const updatedExpense = {
                id:expenseId,
                key:expenseId,
                amount:amountRef.current.value,
                description:descriptionRef.current.value,
                option:optionRef.current.value
            }
            dispatch(expenseAction.editExpenses(updatedExpense));

              // Reset the form and exit edit mode
             amountRef.current.value = "";
             descriptionRef.current.value = "";
             optionRef.current.value = "Open this select menu";
             setEditExpenses(false);
             setExpenseId(null);
           
        }
        } catch (error) {
            console.log("An error occurred:", error);
          alert("An error occurred. Please try again.");
        }
    }



  



    const addExpenseHandler = async (event) => {
        event.preventDefault();

        const amount = amountRef.current.value;
        const description = descriptionRef.current.value;
        const option = optionRef.current.value;
        const localId = localStorage.getItem("localId");

        try {
            const res = await fetch(
                `https://expensetracker-744f6-default-rtdb.firebaseio.com/expenses/${localId}.json`,
                {
                    method: "POST",
                    body: JSON.stringify({
                        amount,
                        description,
                        option,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!res.ok) {
                throw new Error("Expense not added Error!..check Again");
            }

            const data = await res.json();
            console.log(res, data);
            let expense = { id: data.name,key:data.name ,amount, description, option };
            dispatch(expenseAction.addExpense([expense]))
            // Clear form fields after submission
            amountRef.current.value = "";
            descriptionRef.current.value = "";
            optionRef.current.value = "Open this select menu";
        } catch (error) {
            alert(`Expense not added  ${error}`);
            console.log(error);
        }
    };





    
    console.log(expenses)
    // Render the list of expenses
    const ExpenseItems = currentExpenses.map((item) => (
    
        <Expenses
            key={item.key}
            id={item.id}
            amount={item.amount}
            description={item.description}
            option={item.option}
            onRemove={userExpenseRemoveHandler.bind(null, item)}
            onEditUser={userExpenseEditHandler.bind(null, item)}
        />

    ));


    return (<>
        <ToastContainer/>
        <div>
       
            <Form className="m-2 p-2" onSubmit={editExpenses?editHandler:addExpenseHandler}>
                <Row>
                    <Col xs={12} md={4}>
                        <Form.Group>
                            <Form.Label id="amountId">Amount</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter the Amount"
                                required
                                ref={amountRef}
                            />
                        </Form.Group>
                    </Col>

                    <Col xs={12} md={4}>
                        <Form.Group>
                            <Form.Label id="descId">Description</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter the Description"
                                required
                                ref={descriptionRef}
                            />
                        </Form.Group>
                    </Col>

                    <Col xs={12} md={4}>
                        <Form.Label id="optionId">Category</Form.Label>
                        <Form.Select ref={optionRef}>
                            <option>Open this select menu</option>
                            <option value="Food">Food</option>
                            <option value="Petrol">Petrol</option>
                            <option value="Electricity">Electricity</option>
                            <option value="Travel">Travel</option>
                        </Form.Select>
                    </Col>
                </Row>

                <Col className="d-flex justify-content-end mt-3">
                    <Button type="submit" variant="dark" className="m-1">
                        {editExpenses ? "Edit" : "Add Expense"}
                    </Button>
                    {editExpenses && (
                        <Button
                            className="m-1"
                            onClick={cancelEditHandler}
                            variant="dark"
                        >
                            Cancel
                        </Button>
                    )}
                </Col>
            </Form>

            <Card className={`${classes.expenses} mt-4`}>
                <h4 className="text-center text-light fw-bold fst-italic">Expenses</h4>
                {ExpenseItems}
            </Card>

            <PaginationComponent
                itemsPerPage={itemsPerPage}
                totalItems={expenses.length}
                paginate={paginate}
                currentPage={currentPage}
            />

        </div>

        </>
    );

   
};

export default ExpenseForm;



