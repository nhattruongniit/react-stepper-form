import React from 'react';

// material core
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ListItem from '@material-ui/core/ListItem';

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

function AutoCompleteGroup({ label, inputRef, ...props}) {
  return (
    <Autocomplete
      fullWidth
      closeIcon=""
      groupBy={option => option.itemGroup}
      renderInput={(params) => <TextField {...params} inputRef={inputRef} label={label} variant="outlined" />}
      renderGroup={renderGroup}
      {...props}
    />
  )
}

export default AutoCompleteGroup
