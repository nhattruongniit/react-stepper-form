import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import parse from 'autosuggest-highlight/parse';
import ListSubheader from '@material-ui/core/ListSubheader';
import match from 'autosuggest-highlight/match';
import { VariableSizeList as List } from 'react-window';

import TextField from '@material-ui/core/TextField';
const locales = [];
for (let i = 0; i < 500; i = i + 1) {
  locales.push({ 
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

const renderRow = (props) => {
  const { style, index, data } = props;
  console.log('renderRow', props)
  return (
    <div style={style}>{data[index]}</div>
  )
}

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef((props, ref) => {
  const outerProps = React.useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});

function useResetCache(data) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true);
    }
  }, [data]);
  return ref;
}

const ListboxComponent = React.forwardRef(function ListboxComponent(props, ref) {
  const { children, ...other } = props;
  const itemData = React.Children.toArray(children);
  const itemSize = 48;
  const itemCount = itemData.length;
  const LISTBOX_PADDING = 8;

  const getChildSize = (child) => {
    if (React.isValidElement(child) && child.type === ListSubheader) {
      return 48;
    }
    return itemSize;
  };

  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize;
    }
    return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
  };

  const gridRef = useResetCache(itemCount);

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <List
          itemData={itemData}
          height={getHeight() + 2 * LISTBOX_PADDING}
          width="100%"
          innerElementType="div"
          ref={gridRef}
          outerElementType={OuterElementType}
          itemSize={(index) => getChildSize(itemData[index])}
          overscanCount={5}
          itemCount={itemData.length}
        >
          {renderRow}
        </List>
      </OuterElementContext.Provider>
    </div>
  )
});

function AutoCompleteScroll() {
  return (
    <Autocomplete
      id="combo-box-demo"
      options={locales}
      getOptionLabel={(option) => option.language_region}
      ListboxComponent={ListboxComponent}
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
