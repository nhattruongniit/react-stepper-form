import React from 'react';
import * as Yup from 'yup';
import { Formik, Field, Form, FieldArray } from 'formik';

// material core
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import AutoCompleteScroll from './AutoCompleteScroll';
import CustomLabelSelect from './CustomLabelSelect';

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
      <h2>Autocomplete Visualize List</h2>
      <AutoCompleteScroll />

      <h2>Custome Label React Select</h2>
      <CustomLabelSelect />

      <h2>Friends FieldArray</h2>

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
                                  errornpm={meta.error && meta.touched ? 1 : 0}
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
