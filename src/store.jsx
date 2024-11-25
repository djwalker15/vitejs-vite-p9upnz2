import { configureStore } from "@reduxjs/toolkit";
import newWorkoutCreatorReducer from './components/NewWorkoutCreator/NewWorkoutCreatorSlice';
export default configureStore({
    reducer: {
        newWorkoutCreator: newWorkoutCreatorReducer,
    }
})