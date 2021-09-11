import React from 'react';

import TextFieldCurrency from '../components/commons/TextFieldCurrency';

export default {
  title: 'Share Comp/TextField',
  component: TextFieldCurrency,
};

const Template = (args) => <TextFieldCurrency {...args} />;

export const Currency = Template.bind({});
Currency.args = {
  label: 'How much budget per campaign on average',
};
