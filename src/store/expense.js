
import { createSlice } from "@reduxjs/toolkit";




const initialExpenseState={expenses:[]};

const expenseSlice = createSlice({
    name:'expenses',
    initialState:initialExpenseState,
    reducers:{
        addExpense(state,action){
            state.expenses=[...state.expenses,...action.payload]
        },
        deleteExpense(state,action){
            state.expenses = state.expenses.filter(item => action.payload !== item.id);
            
        },
        editExpenses(state,action){
            // const expenseIndex = state.expenses.findIndex((exp) => exp.id === action.payload.id );
            // const updatedExpense = {
            //     ...state.users[expenseIndex],
            //     amount: action.payload.amount,
            //     description: action.payload.description,
            //     option: action.payload.option
            // };
            // const expenses = [...state.expenses];
            // expenses[expenseIndex]=updatedExpense;

            // state.expenses = expenses;
            
            state.expenses = state.expenses.map(exp =>
                exp.id === action.payload.id ? action.payload : exp)


        }
    }
})

export default expenseSlice.reducer;
export const expenseAction = expenseSlice.actions;