import React from 'react';
import TextFieldPhone from '../components/commons/TextFieldPhone';
import { useForm } from 'react-hook-form';

export default {
  title: 'Share Comp/TextField',
  component: TextFieldPhone,
  argTypes: {},
};

const Template = (args) => {
  const { register } = useForm();
  return <TextFieldPhone {...args} {...register(args.name)} />;
};

export const Phone = Template.bind({});
Phone.args = {
  name: 'phone-input',
  placeholder: 'Enter your phone number',
};
