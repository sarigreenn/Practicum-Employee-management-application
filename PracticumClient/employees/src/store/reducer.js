import * as actionsName from './action';

const initializeState = {
    worker: null,
    workers: [],
    count: 1


}

const reducer = (state = initializeState, action) => {
    switch (action.type) {
        case actionsName.SET_WORKER:
            {
                return {
                    ...state,
                    user: action.user

                }
            }
        case actionsName.ADD_WORKER:
            {


                return {
                    ...state,
                    workers: [...state.workers, action.data],


                }
            }
        
        case actionsName.DELETE_WORKER:
            {
                console.log("DELETE_WORKER")
                const workers2 = state.workers?.filter(x => x.id != action.worker)
                return {

                    ...state, workers2

                }
            }

        default:
            return { ...state }
    }
}
export default reducer;

