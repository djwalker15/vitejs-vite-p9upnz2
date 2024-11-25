import React from "react";
import { useDispatch } from "react-redux";
import { setExercise } from "../NewWorkoutCreator/NewWorkoutCreatorSlice";
import {
    Box,
    Card,
    CardHeader,
    ImageListItem,
    CardContent,
} from "@mui/material";
import Library from "../Library/Library";
import { useMeasure } from "@uidotdev/usehooks";

export default function ExerciseCard({ exercises, id }) {
    const dispatch = useDispatch()
    const [ref, { width, height }] = useMeasure();
    return (
        <ImageListItem>
            <Card>
                <CardHeader title="Select Exercise" />
                <CardContent>
                    {exercises &&
                        <Box ref={ref}>
                            <Library
                                exercises={exercises}
                                size={width}
                                handleClick={(x) => {
                                    dispatch(setExercise({
                                        "id": id,
                                        "exercise": x
                                    }))
                                }}
                            />
                        </Box>}
                </CardContent>
            </Card>
        </ImageListItem>
    )
}