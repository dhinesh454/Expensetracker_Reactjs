import { createSlice} from "@reduxjs/toolkit";

const initialAuthState ={isLoggedin:false,token:'',profile:[],localId:''}

const authSlice  = createSlice({
    name:'authentication',
    initialState:initialAuthState,
    reducers:{
        loginHandler (state,action) {
            state.isLoggedin=true;
            state.token=action.payload.token;
            state.localId=action.payload.localId;
        },
        logoutHandler (state) {
            state.isLoggedin=false;
            state.token='';
            state.localId='';
        },
        setProfile (state,action) {
            state.profile=[...action.profile]
        }
    }

});


export default authSlice.reducer;

export const authActions = authSlice.actions;

