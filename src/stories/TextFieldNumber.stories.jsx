import React from 'react';
import { useForm } from 'react-hook-form';

import TextFieldNumber from '../components/commons/TextFieldNumber';

export default {
  title: 'Share Comp/TextField',
  component: TextFieldNumber,
};

const Template = (args) => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextFieldNumber {...args} {...register('number')} />
      <button type="submit">Submit</button>
    </form>
  );
};

export const Number = Template.bind({});

Number.args = {
  label: 'How many campaign annually',
  defaultValue: 0,
};
