const INITIAL_STATE = {
    data:null
}





export default (state = INITIAL_STATE, action) => {
    // console.log(state.data)
    switch (action.type) {

        // case 'ADD_TOKEN': return { ...state, token: action.token };
        case 'SET_EMPLOYEE_INDEX': return { ...state, data: action.data }
        case 'RESET': return INITIAL_STATE

        default: return state
    }
}