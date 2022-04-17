export const ACTION_CITY = 'Action_CITY';

const initialState = {
    city: "Нур-Султан",
}

export const rootReducer = (state = initialState, action: { type: any; payload: any; }) =>{

    switch(action.type){
        case ACTION_CITY : return{ ...state, city: action.payload};
    }
    
return state;
}