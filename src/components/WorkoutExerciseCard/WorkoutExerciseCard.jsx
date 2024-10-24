import {
    Box,
    Grid2,
    IconButton,
    Input,
    Slider,
    Typography,
    Card,
    CardHeader,
    ImageList,
    ImageListItem,
    CardContent,
    Button,
    Checkbox,
    FormControl,
    FormLabel,
    FormGroup,
    FormControlLabel,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    ImageListItemBar,
  } from "@mui/material";
  import { useState } from "react";
  import Library from "../Library/Library";
  import { useMeasure } from "@uidotdev/usehooks";
  
  export default function WorkoutExerciseCard({ exercises, handleExerciseChange, id }) {
    const [isBrowse, setIsBrowse] = useState(true);
    const [item, setItem] = useState();
    const [imageLink, setImageLink] = useState(
      "https://storage.googleapis.com/exercises_bucket_1/dumbbell/20240430_104249.jpg"
    );
  
    const [ref, { width, height }] = useMeasure();
  
    const BODY_PARTS = Object.freeze({
      FullBody: { label: "Full Body", color: "Brown" },
      Cardio: { label: "Cardio", color: "Blue" },
      Legs: { label: "Legs", color: "Yellow" },
      Chest: { label: "Chest", color: "Green" },
      Back: { label: "Back", color: "Pink" },
      Shoulders: { label: "Shoulders", color: "Purple" },
      Arms: { label: "Arms", color: "Orange" },
      Core: { label: "Core", color: "Red" },
    });
  
    const DIFFICULTY_LEVELS = Object.freeze({
      All: "All",
      Beginner: "Beginner",
      Intermediate: "Intermediate",
      Advanced: "Advanced",
    });
  
    const handleWorkoutExerciseTypeChange = (event) => {
      console.log(event);
      if (event.target.value === "Browse") {
        setIsBrowse(true);
      } else if (event.target.value === "Random") {
        setIsBrowse(false);
      }
    };
  
    return (
      <ImageListItem>
        <Card>
          <CardHeader title="Select Exercise" />
          <CardContent>
            <Box>
              <Button
                variant={isBrowse ? "contained" : "outlined"}
                value="Browse"
                onClick={handleWorkoutExerciseTypeChange}
              >
                Browse
              </Button>
              <Button
                variant={isBrowse ? "outlined" : "contained"}
                value="Random"
                onClick={handleWorkoutExerciseTypeChange}
              >
                Random
              </Button>
            </Box>
            {isBrowse ? (
              <Box ref={ref}>
                <Library
                  exercises={exercises}
                  size={width}
                  // handleClick={(item) => {
                  //   handleExerciseChange(item, id)
                  // }}
                  handleClick={(item) => setItem(item)}
  
                />
              </Box>
            ) : (
              <h2>Random</h2>
            )}
            {/* {isBrowse ? (
                !isPending && !error ? (
                  <Box ref={ref}>
                    <Library exercises={data} size={width} />
                  </Box>
                ) : (
                  <></>
                )
              ) : (
                <h2>Random</h2>
              )} */}
  
            <Box>
              {!item ? (
                <></>
              ) : (
                <ImageList>
                  <ImageListItem>
                    <img src={item.ImageLink} alt={item.Name} />
                    <ImageListItemBar title={item.Name}></ImageListItemBar>
                  </ImageListItem>
                </ImageList>
              )}
            </Box>
          </CardContent>
        </Card>
      </ImageListItem>
    );
  }
  