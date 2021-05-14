import React, { useState, useEffect } from 'react';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { v4 as uuidv4 } from 'uuid';

// material core
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';

// material icon
import CloseIcon from '@material-ui/icons/Close';

// data
import { dataFoods } from 'data';

const foodObj = {
  index: uuidv4(),
  food: null
}

function Foods() {
  const [foods, setFoods] = useState([{...foodObj}]);
  const [foodSelected, setFoodSelected] = useState({})

  // group data
  const options = dataFoods.map(data => {
    const firstLetter = data.name.split('-')[0].trim();
    return {
      ...data,
      itemGroup: firstLetter
    }
  })

  // disabled food after chose
  useEffect(() => {
    foods.forEach(ele => {
      if(ele.food) {
        setFoodSelected(prevState => ({...prevState, [ele.food.id]: true}))
        Object.keys(foodSelected).forEach((key) => {
          if (ele.food.id === key) {
            foodSelected[ele.food.id] = true;
          } else {
            foodSelected[key] = false;
          }
        });
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [foods])

  function handleAddMore() {
    const newFood = {
      index: uuidv4(),
      food: null
    }
    setFoods(prevState => [...prevState, { ...newFood }]);
  }

  const handleRemove = (index, value) => () => {
    setFoods(prevState => prevState.filter(food => food.index !== index));
    // delete food seleted
    if(value.food) {
      const newFood = { ...foodSelected };
      delete newFood[value.food?.id];
      setFoodSelected(newFood)
    }
  }

  const renderGroup = params => {
    return [
      <ListItem key={params.key}>
        <span className="headerIndent">
          <span>
            {params.group}
          </span>
        </span>
      </ListItem>,
      params.children,
    ];
  }

  return (
    <div>
      {foods.map((ele, idx) => (
        <Grid key={ele.index} container item wrap="nowrap" xs={12} md={12} className="mb-20">
          <Autocomplete
            fullWidth
            closeIcon=""
            value={ele.food}
            options={options}
            getOptionLabel={(option) => option.name}
            getOptionDisabled={(option) => foodSelected[option.id]}
            getOptionSelected={(option) => option.id === ele.food?.id}
            groupBy={option => option.itemGroup}
            renderInput={(params) => (
              <TextField 
                {...params} 
                label="Select Food" 
                variant="outlined" 
                InputLabelProps={{
                  shrink: true,
                }} 
              />
            )}
            renderGroup={renderGroup}
            renderOption={(option, { inputValue }) => {
              const matches = match(option.name, inputValue);
              const parts = parse(option.name, matches);
              return (
                <div>
                  {parts.map((part, index) => (
                    <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                      {part.text}
                    </span>
                  ))}
                </div>
              );
            }}
            onChange={(_, value) => {
              const newFoods = [...foods];
              foods[idx].food = value;
              setFoods(newFoods)
            }}
          />
          {foods.length > 1 && (
            <IconButton 
              aria-label="remove"  
              color="secondary"
              onClick={handleRemove(ele.index, ele)}
            >
              <CloseIcon />
            </IconButton>
          )}
        </Grid>
      ))}

      <br />

      <Grid container justify="flex-end">
        <Button 
          variant="contained" 
          color="primary" 
          disabled={foods.length > 4}
          onClick={handleAddMore}
        >
          Add More
        </Button>
      </Grid>
    </div>
  )
}

export default Foods
