import React from 'react';
import { useForm } from 'react-hook-form';

import TextFieldArea from '../components/commons/TextFieldArea';

export default {
  title: 'Share Comp/TextField',
  component: TextFieldArea,
};

const Template = (args) => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextFieldArea {...args} {...register('description')} />
      <button type="submit">Submit</button>
    </form>
  );
};

export const Area = Template.bind({});

Area.args = {
  label: 'PIK Description',
};
