import React from 'react';
import RadioInput from '../components/commons/RadioInput';
import { useForm } from 'react-hook-form';

export default {
  title: 'Share Comp/RadioInput',
  component: RadioInput,
};

const Template = (args) => {
  const { register, watch, setValue } = useForm();

  React.useEffect(() => {
    setTimeout(() => {
      setValue(args.name, '0');
    }, 2000);
  }, []);

  return (
    <div>
      <RadioInput {...args} {...register(args.name)} />
      <pre>
        <p>data will change after 2 seconds</p>
        <code>{JSON.stringify(watch(args.name, null, 2))}</code>
      </pre>
    </div>
  );
};

export const RadioInputYesNoQuestion = Template.bind({});
RadioInputYesNoQuestion.args = {
  name: 'group-radio',
  defaultValue: '1',
  label: 'Have you or are currently running influencer marketing campaigns?',
  options: [
    {
      name: 'Yes',
      value: '1',
    },
    {
      name: 'No',
      value: '0',
    },
  ],
  gap: '15px',
};
