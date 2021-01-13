import React from 'react';
import * as Yup from 'yup';
import { Formik, Field, Form, FieldArray } from 'formik';
import Select from "react-select";

// material core
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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

function Account() {
  const initialValues = {
    friends: [
      {
        name: '',
        email: ''
      }
    ]
  }

  const validationSchema = Yup.object().shape({
    friends: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Email is invalid').required('Email is required'),
      })
    )
  })

  return (
    <>
      <b>Friends FieldArray</b>
      <Select
        defaultValue={options[0]}
        formatOptionLabel={formatOptionLabel}
        components={{ Option }}
        options={options}
      />
      <br/>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={values => {
          console.log('onSubmit: ', values)
        }}
        render={({ values, errors }) => {
          return (
            <Form>
              <FieldArray
                name="friends"
                render={({ remove, push }) => {
                  return (
                    <div>
                      {values.friends.map((_, index) => (
                        <div key={index}>
                          <Field name={`friends.${index}.name`}>
                            {({ field, meta}) => {
                              return (
                                <TextField 
                                  margin="normal" 
                                  fullWidth 
                                  id="name" 
                                  type="text" 
                                  label="Name" 
                                  variant="outlined" 
                                  error={meta.error && meta.touched ? 1 : 0}
                                  helperText={meta.error && meta.touched ? meta.error : ''}
                                  {...field} 
                                />
                              )
                            }}
                          </Field>
                          <Field name={`friends.${index}.email`}>
                            {({ field, meta}) => {
                              return (
                                <TextField
                                  margin="normal" 
                                  fullWidth id="email" 
                                  type="text" 
                                  label="Email Address" 
                                  variant="outlined"
                                  error={meta.error && meta.touched ? 1 : 0}
                                  helperText={meta.error && meta.touched ? meta.error : ''}
                                  {...field}
                                />
                              )
                            }}
                          </Field>
                          {index > 0 && (
                            <Button variant="contained" color="primary" onClick={() => remove(index)}>
                              Remove
                            </Button>
                          )}
                        </div>
                      ))}
                      <Button variant="contained" color="primary" onClick={() => push({ name: '', email: '' })}>
                        Add
                      </Button>
                     
                    </div>
                  )
                }}
              />
             <Button type="submit" variant="contained" color="primary">Submit</Button>
            </Form>
          )
        }}
      />
    </>
  )
}

export default Account
