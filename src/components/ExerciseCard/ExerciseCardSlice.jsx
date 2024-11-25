import { createSlice } from "@reduxjs/toolkit";

export const exerciseCardSlice = createSlice({
    name: 'exerciseCard',
    initialState: {
        value: {
            selectedExercises: {}
        }
    },
    reducers: {
        selectExercise: (state, action) => {
            let payload = {}
            payload[action.payload["id"]] = action.payload["exercise"]
            state.value["selectedExercises"] = {
                ...state.value["selectedExercises"],
                ...payload
            }
        }
    }
})

export const {selectExercise} = exerciseCardSlice.actions

export default exerciseCardSlice.reducer