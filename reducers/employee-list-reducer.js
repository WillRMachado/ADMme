const INITIAL_STATE = {
    data:[],
    sortBy:'',
    order:null,
    sorted:[]
}





export default (state = INITIAL_STATE, action) => {
    // console.log(state)
    switch (action.type) {

        case 'UPDATE_EMPLOYEE_LIST': return { ...state, data: action.data }
        case 'SORT_BY': return { ...state, sortBy: action.sortBy }
        case 'ORDER': return { ...state, order: action.order }
        case 'SORTED': return { ...state, sorted: action.sorted }


        case 'RESET': return INITIAL_STATE

        default: return state
    }
}