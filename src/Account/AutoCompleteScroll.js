import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

import TextField from '@material-ui/core/TextField';
const numbs = [];
for (let i = 0; i < 500; i = i + 1) {
  numbs.push({ 
    createdAt: "2020-11-04 17:30:43",
    createdBy: null,
    description: null,
    id: i,
    language_region: `Afrikaans-${i}`,
    language_subtag: "af",
    updatedAt: "2020-11-04 17:30:43",
    updatedBy: null,
    version: 0,
  });
}

function AutoCompleteScroll() {
  return (
    <Autocomplete
      id="combo-box-demo"
      options={numbs}
      getOptionLabel={(option) => option.language_region}
      style={{ width: 300 }}
      renderOption={(option, { inputValue }) => {
        const matches = match(option.language_region, inputValue);
        const parts = parse(option.language_region, matches);

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
      renderInput={(params) => <TextField {...params} label="Locales" variant="outlined" />}
    />
  )
}

export default AutoCompleteScroll
