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
  } from "@mui/material";
  import { useState } from "react";
  import { useMeasure } from "@uidotdev/usehooks";
  import { useQuery } from "@tanstack/react-query";
  import axios from "axios";
//   import AddIcon from "@mui/icons-material/Add";
//   import RemoveIcon from "@mui/icons-material/Remove";
//   import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
//   import AddCircleIcon from "@mui/icons-material/AddCircle";
  import { v4 as uuidv4 } from "uuid";
  import "./WorkoutCreator.css";
  import Library from "../Library/Library";
//   import { ExpandMore } from "@mui/icons-material";
  import WorkoutExerciseCard from "../WorkoutExerciseCard/WorkoutExerciseCard";
  
  export default function WorkoutCreator({ size }) {
    const { isPending, error, data, isFetching } = useQuery({
      queryKey: ["exercises"],
      queryFn: async () => {
        const response = await axios.get(
          "https://us-central1-stack-alpha-01.cloudfunctions.net/exercises"
        );
        return response.data;
      },
    });
    const [value, setValue] = useState(1);
    const [exerciseCards, setExerciseCards] = useState(
      Array(1).fill(...provideExerciseCard(1))
    );
    const [selectedExercises, setSelectedExercises] = useState({})
  
    function provideExerciseCard(count) {
      let exerciseCards = [];
      for (let index = 0; index < count; index++) {
        let id = uuidv4();
        exerciseCards.push(
          <WorkoutExerciseCard
            key={id}
            id={id}
            exercises={data}
            handleExerciseChange={handleExerciseChange}
          />
        );
      }
      return exerciseCards;
    }
  
    const handleDecrement = () => {
      if (value > 0) {
        console.log(exerciseCards);
        setValue(value - 1);
        let newExerciseCards = exerciseCards.slice(0, exerciseCards.length - 1);
        setExerciseCards(newExerciseCards);
        console.log(`Exercise cards after decrement:`, newExerciseCards);
      }
    };
  
    const handleIncrement = () => {
      if (value < 10) {
        setValue(value + 1);
        let newExerciseCards = null;
        console.log(exerciseCards);
        newExerciseCards = [...exerciseCards, ...provideExerciseCard(1)]
        setExerciseCards(newExerciseCards);
  
        console.log(`Exercise cards after increment:`, newExerciseCards);
      }
    };
  
    const handleInputChange = (event) => {
      setValue(event.target.value === "" ? 0 : Number(event.target.value));
    };
  
    const handleBlur = () => {
      if (value < 0) {
        setValue(1);
      } else if (value > 10) {
        setValue(10);
      }
    };
  
    function handleExerciseChange(exercise, id) {
      console.log(exercise.ID);
      console.log(`Test`, id);
      console.log(`Exercise Cards: `, exerciseCards)
      let card = exerciseCards.find((x) => x.props.id === id)
      console.log(card);
      if (Object.prototype.hasOwnProperty.call(selectedExercises, card.props.id)) {
        let selectedExercisesObject = selectedExercises
        selectedExercisesObject[card.props.id] = exercise
        setSelectedExercises(selectedExercisesObject)
      } else {
        let selectedExercisesObject = selectedExercises
        selectedExercisesObject[card.props.id] = exercise
        setSelectedExercises(selectedExercisesObject)
      }
      console.log(selectedExercises)
    }
  
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
  
    // const cards = [];
  
    // for (let i = 0; i < value; i++) {
    //   // console.log(value)
    //   const id = uuidv4();
    //   console.log(id);
    //   cards.push(
    //     // <WorkoutExerciseCard exercises={JSON.parse(JSON.stringify(data))}/>
    //     <WorkoutExerciseCard
    //       // key={id}
    //       exercises={data}
    //       handleExerciseChange={handleExerciseChange}
    //     />
    //   );
    // }
  
    return (
      <>
        <Box id="creator-settings">
          <Box id="creator-settings-label">
            <Typography id="input-slider" gutterBottom>
              Number of Exercises
            </Typography>
          </Box>
          <Box id="creator-inputs">
            <IconButton
              aria-label="Decrement Exercise Count"
              size="large"
              color="primary"
              onClick={handleDecrement}
              disabled={value == 0}
            >
              {/* <RemoveCircleIcon /> */}
            </IconButton>
  
            <Input
              sx={{ textAlignLast: "center", margin: "8px" }}
              value={value}
              onChange={handleInputChange}
              onBlur={handleBlur}
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
              disabled={value == 10}
            >
              {/* <AddCircleIcon /> */}
            </IconButton>
          </Box>
        </Box>
        {size == null ? (
          <h2>Loading...</h2>
        ) : (
          <ImageList cols={Math.floor(size / 400)}>{exerciseCards}</ImageList>
          // <ImageList cols={Math.floor(size / 400)}>{cards}</ImageList>
        )}
      </>
    );
  }
  