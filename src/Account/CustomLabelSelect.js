import React from 'react';
import Select from "react-select";

const options = [
  { value: "Abe", label: "Abe", customAbbreviation: "A" },
  { value: "John", label: "John", customAbbreviation: "J" },
  { value: "Dustin", label: "Dustin", customAbbreviation: "D" }
];

const Option = (props) => {
  console.log("props", props);
  const { innerProps, innerRef, data } = props;
  return (
    <article ref={innerRef} {...innerProps}>
      <h4>{data.label}</h4> component
      <h5>Genre: {data.value}</h5>
      <h6>
        {data.customAbbreviation}
      </h6>
    </article>
  );
};

const formatOptionLabel = ({ value, label, customAbbreviation }) => (
  <div style={{ display: "flex" }}>
    <div>{label}</div>
    truong
    <br/>
    <div style={{ marginLeft: "10px", color: "#ccc" }}>
      {customAbbreviation}
    </div>
  </div>
);

function CustomLabelSelect() {
  return (
    <Select
      defaultValue={options[0]}
      formatOptionLabel={formatOptionLabel}
      components={{ Option }}
      options={options}
    /> 
  )
}

export default CustomLabelSelect
