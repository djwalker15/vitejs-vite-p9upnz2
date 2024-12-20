import ExerciseCard from "../ExerciseCard/ExerciseCard"
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { addExercise, removeLastExercise } from "./NewWorkoutCreatorSlice";
import {
    Box,
    IconButton,
    Input,
    Typography,
    ImageList,
    ImageListItem,
} from "@mui/material";
import "./NewWorkoutCreator.css";

export default function NewWorkoutCreator({ size, data }) {
    const dispatch = useDispatch()

    const exercises = useSelector((state) => state.newWorkoutCreator.value["exercises"])
    const exerciseCount = Object.keys(exercises).length
    const exerciseCards = Object.entries(exercises).map(([key, value]) => <ExerciseCard key={key} id={key} exercises={data} selectedExercise={value} />)
    const selectedExercises = Object.entries(exercises).filter(([key, value]) => value !== null)

    function handleIncrement() {
        dispatch(addExercise({
            id: uuidv4(),
            exercise: null
        }))
    }

    function handleDecrement() {
        dispatch(removeLastExercise())
    }

    return (
        <>
            <div className="top">
                <Box className="creator-settings">
                    <Box id="creator-settings-label">
                        <Typography id="input-slider" gutterBottom>
                            Number of Exercises
                        </Typography>
                    </Box>
                    <Box className="creator-inputs">
                        <IconButton
                            aria-label="Decrement Exercise Count"
                            size="large"
                            color="primary"
                            onClick={handleDecrement}
                            disabled={exerciseCount == 0}
                        >
                            -
                            {/* <RemoveCircleIcon /> */}
                        </IconButton>

                        <Input
                            sx={{ textAlignLast: "center", margin: "8px" }}
                            value={exerciseCount}
                            disabled
                            inputProps={{
                                min: 0,
                                max: 10,
                                type: "number",
                            }}
                        />

                        <IconButton
                            aria-label="Decrement Exercise Count"
                            size="large"
                            color="primary"
                            onClick={handleIncrement}
                            disabled={exerciseCount == 10}
                        >
                            +
                            {/* <AddCircleIcon /> */}
                        </IconButton>
                    </Box>
                </Box>
                {/* {exercises &&
                    <Box>
                        <h2>Selected Exercises</h2>
                        <div className="selected-exercises">
                            {selectedExercises.length > 0 &&
                                <ImageList  rowHeight={200}>
                                    {selectedExercises.map(([key, value]) => {
                                        return <ImageListItem key={key}>
                                            <img 
                                                src={`${value.ImageLink}?w=200&h=200&fit=crop&auto=format`}
                                                srcSet={`${value.ImageLink}?w=200&h=200&fit=crop&auto=format&dpr=2 2x`}
                                                // src={value.ImageLink}
                                                alt={value.Name}
                                                 />
                                        </ImageListItem>
                                    })}
                                </ImageList>
                            }
                        </div>
                    </Box>} */}
            </div>
            {size == null ? (
                <h2>Loading...</h2>
            ) : (
                <ImageList cols={Math.floor(size / 400)}>{exerciseCards}</ImageList>
            )}
        </>
    )
}