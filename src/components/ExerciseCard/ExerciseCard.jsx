import React from "react";
import { useDispatch } from "react-redux";
import { setExercise } from "../NewWorkoutCreator/NewWorkoutCreatorSlice";
import {
    Box,
    Card,
    CardHeader,
    ImageListItem,
    ImageList,
    ImageListItemBar,
    CardContent,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import Library from "../Library/Library";
import { useMeasure } from "@uidotdev/usehooks";
import './ExerciseCard.css'

export default function ExerciseCard({ exercises, id, selectedExercise }) {
    const dispatch = useDispatch()
    const [ref, { width, height }] = useMeasure();
    const [open, setOpen] = React.useState(false)
    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }
    // console.log(selectedExercise)
    return (
        <ImageListItem>
            <Card
                ref={ref}>
                <CardHeader title="Select Exercise" />
                <CardContent>
                    <Button onClick={handleClickOpen}>Select Exercise</Button>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                    >
                        <DialogTitle>
                            Select Exercise
                        </DialogTitle>
                        <DialogContent>
                            <Library
                                exercises={exercises}
                                size={width}
                                handleClick={(x) => {
                                    dispatch(setExercise({
                                        "id": id,
                                        "exercise": x
                                    }))
                                    handleClose()
                                }}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} autoFocus>Cancel</Button>
                        </DialogActions>
                    </Dialog>
                    <Box>
                        {selectedExercise === null ? (
                            <></>
                        ) : (
                            // <ImageList>
                            //     <ImageListItem>
                            //         <img src={selectedExercise.ImageLink} alt={selectedExercise.Name} />
                            //         <ImageListItemBar title={selectedExercise.Name}></ImageListItemBar>
                            //     </ImageListItem>
                            // </ImageList>
                            <Box className="selectedExercise" component="img" src={selectedExercise.ImageLink} alt={selectedExercise.Name} />
                        )}
                    </Box>
                    {/* {exercises &&
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
                        </Box>} */}
                </CardContent>
            </Card>
        </ImageListItem>
    )
}