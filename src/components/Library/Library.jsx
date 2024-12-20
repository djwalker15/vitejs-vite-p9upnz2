import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
// import ExerciseCard from '../exercise_card/exerciseCard';
import { useMeasure } from '@uidotdev/usehooks';
import './Library.css';
// import { HomeMaxOutlined } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
// import { ExpandMore } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

Library.propTypes = {
  exercises: PropTypes.array,
  size: PropTypes.number,
};

export default function Library({ exercises, size, handleClick }) {
  // const { isPending, error, data, isFetching } = useQuery({
  //   queryKey: ["exercises"],
  //   queryFn: async () => {
  //     const response = await axios.get(
  //       "https://us-central1-stack-alpha-01.cloudfunctions.net/exercises"
  //     );
  //     return response.data;
  //   },
  // });
  // const [ref, { width, height }] = useMeasure();

  const navigate = useNavigate();

  const [filters, setFilters] = useState([]);

  const handleFilterChange = (event) => {
    if (event.target.checked) {
      setFilters([...filters, event.target.value]);
    } else {
      filters.splice(filters.indexOf(event.target.value), 1);
      setFilters(Array.from(filters));
    }
  };

  const [difficultyFilters, setDifficultyFilters] = useState([]);

  const handleDifficultyFilterChange = (event) => {
    if (event.target.checked) {
      setDifficultyFilters([...difficultyFilters, event.target.value]);
    } else {
      difficultyFilters.splice(
        difficultyFilters.indexOf(event.target.value),
        1
      );
      setDifficultyFilters(Array.from(difficultyFilters));
      //   setFilters();
    }
  };

  const BODY_PARTS = Object.freeze({
    FullBody: { label: 'Full Body', color: 'Brown' },
    Cardio: { label: 'Cardio', color: 'Blue' },
    Legs: { label: 'Legs', color: 'Yellow' },
    Chest: { label: 'Chest', color: 'Green' },
    Back: { label: 'Back', color: 'Pink' },
    Shoulders: { label: 'Shoulders', color: 'Purple' },
    Arms: { label: 'Arms', color: 'Orange' },
    Core: { label: 'Core', color: 'Red' },
  });

  const DIFFICULTY_LEVELS = Object.freeze({
    All: 'All',
    Beginner: 'Beginner',
    Intermediate: 'Intermediate',
    Advanced: 'Advanced',
  });
  return (
    // <div id="library">
    //   <h1>Exercise Library</h1>
    size == null ? (
      <h2>Loading...</h2>
    ) : (
      <div>
        <Accordion>
          {/* <AccordionSummary expandIcon={<ExpandMore />}> */}
          <AccordionSummary>
            Filters:{' '}
            {difficultyFilters.concat(filters).length === 0 ? (
              'None'
            ) : (
              <>({difficultyFilters.concat(filters).join(', ')})</>
            )}
          </AccordionSummary>
          <AccordionDetails>
            <FormControl id="filters">
              <FormLabel component="legend">Body Parts Filter</FormLabel>
              <FormGroup className="filter">
                {Object.values(BODY_PARTS).map((value) => {
                  return (
                    <FormControlLabel
                      key={value.label}
                      control={
                        <Checkbox
                          onChange={handleFilterChange}
                          name={value.label}
                          value={value.label}
                        />
                      }
                      label={value.label}
                    />
                  );
                })}
              </FormGroup>
              <FormLabel component="legend">Difficulty Level Filter</FormLabel>
              <FormGroup className="filter">
                {Object.values(DIFFICULTY_LEVELS).map((value) => {
                  return (
                    <FormControlLabel
                      key={value}
                      control={
                        <Checkbox
                          onChange={handleDifficultyFilterChange}
                          name={value}
                          value={value}
                        />
                      }
                      label={value}
                    />
                  );
                })}
              </FormGroup>
            </FormControl>
          </AccordionDetails>
        </Accordion>
        <ImageList id="exerciseList" cols={Math.floor(size / 150)}>
          {/* <ImageList id="exerciseList" sx={{height: height}} cols={Math.floor(size / 150)}> */}

          {exercises
            .filter((item) => {
              return filters.length == 0 || filters.includes(item.BodyPart);
            })
            .filter((item) => {
              return (
                difficultyFilters.length == 0 ||
                item.Level.split(' - ').some((x) =>
                  difficultyFilters.includes(x)
                )
              );
            })
            .map((item) => {
              return (
                // <Link key={item.ID} to={`../exercises/${item.ID}`}>
                <ImageListItem
                  key={item.ID}
                  onClick={() => {
                    if (handleClick) {
                      // console.log(item)
                      handleClick(item);
                    }
                  }}
                >
                  <img src={item.ImageLink} alt={item.Name} loading='lazy' />
                  <ImageListItemBar title={item.Name}></ImageListItemBar>
                </ImageListItem>
                // <ImageListItem key={item.ID} onClick={() => handleClick(item)}>
                //   <img src={item.ImageLink} alt={item.Name} />
                //   <ImageListItemBar title={item.Name}></ImageListItemBar>
                // </ImageListItem>
                // </Link>
              );
            })}
        </ImageList>
      </div>
    )
    //   )}
    // </div>
  );
}
