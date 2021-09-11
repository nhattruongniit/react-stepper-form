import React from 'react';

import TextField from '../components/commons/TextField';

export default {
  title: 'Share Comp/TextField',
  component: TextField,
  argTypes: {},
};

const Template = (args) => <TextField {...args} />;

export const TextFieldEmail = Template.bind({});
TextFieldEmail.args = {
  name: 'email',
  label: 'Email',
  placeholder: 'Enter your email address',
  type: 'email',
};
export const TextFieldPassword = Template.bind({});
TextFieldPassword.args = {
  name: 'password',
  label: 'Password',
  placeholder: 'Enter your password',
  type: 'password',
};
