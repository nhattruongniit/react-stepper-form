import React from 'react';
import { VariableSizeList as List } from 'react-window';

// material core
import Autocomplete from '@material-ui/lab/Autocomplete';
import ListSubheader from '@material-ui/core/ListSubheader';
import TextField from '@material-ui/core/TextField';

const renderRow = (props) => {
  const { style, index, data } = props;
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


function AutoCompleteSimple({ label, inputRef, ...props }) {
  return (
    <Autocomplete
      id={label}
      ListboxComponent={ListboxComponent}
      renderInput={(params) => <TextField {...params} inputRef={inputRef} label={label} variant="outlined" />}
      {...props}
    />
  )
}

export default AutoCompleteSimple;
