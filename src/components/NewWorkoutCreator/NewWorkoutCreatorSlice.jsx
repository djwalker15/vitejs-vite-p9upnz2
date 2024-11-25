import { createSlice } from "@reduxjs/toolkit";

export const newWorkoutCreatorSlice = createSlice({
    name: 'newWorkoutCreator',
    initialState: {
        value: {
            exercises: {}
        }
    },
    reducers: {
        addExercise: (state, action) => {
            let newObject = {}
            newObject[action.payload.id] = action.payload.exercise
            state.value["exercises"] = {
                ...state.value["exercises"],
                ...newObject
            }
        },
        setExercise: (state, action) => {
            state.value["exercises"][action.payload["id"]] = action.payload["exercise"]
        },
        removeLastExercise: (state) => {
            state.value["exercises"] = Object.fromEntries(Object.entries(state.value["exercises"]).slice(0, -1))
        }
    }
})

export const { addExercise, removeLastExercise, setExercise } = newWorkoutCreatorSlice.actions

export default newWorkoutCreatorSlice.reducer