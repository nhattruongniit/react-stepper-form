import React from 'react';
import TextFieldSelect from '../components/commons/TextFieldSelect';
import { useForm } from 'react-hook-form';

export default {
  title: 'Share Comp/SelectField',
  component: TextFieldSelect,
  argTypes: {},
};

const Template = (args) => {
  const { register, watch, setValue } = useForm();

  React.useEffect(() => {
    setTimeout(() => {
      setValue(args.name, 'vn');
    }, 2000);
  }, []);

  return (
    <div>
      <TextFieldSelect {...args} {...register(args.name)} defaultValue="bre" canInput renderOption={(item) => item.name} />
      <pre>
        <p>data will change after 2 seconds</p>
        <code>{JSON.stringify(watch(args.name, null, 2))}</code>
      </pre>
    </div>
  );
};

export const Select = Template.bind({});
Select.args = {
  name: 'contry-selectbox',
  label: 'Country',
  options: [
    { value: 'us', name: 'United States' },
    { value: 'bre', name: 'Brazil' },
    { value: 'vn', name: 'VietNam' },
  ],
  placeholder: 'Select your country',
};
