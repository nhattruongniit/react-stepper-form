import React from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import CheckboxList from '../components/commons/CheckBoxList';

export default {
  title: 'Share Comp/CheckboxList',
  component: CheckboxList,
  argTypes: {},
};

const Template = (args) => {
  const { register, watch, setValue } = useForm();

  useEffect(() => {
    // Test set data default
    setTimeout(() => {
      setValue(args.name, [
        { value: 'fb', name: 'Facebook', checked: true },
        { value: 'inst', name: 'Instagram', checked: true },
        { value: 'yt', name: 'Youtube', checked: false },
        { value: 'tiktok', name: 'Tiktok', checked: false },
      ]);
    }, 2000);
  }, []);

  return (
    <>
      <CheckboxList {...args} {...register(args.name)} />
      <pre>
        <p>data will change after 2 seconds</p>
        <code>{JSON.stringify(watch(args.name) || {}, null, 2)}</code>
      </pre>
    </>
  );
};

const Template2 = (args) => {
  const { register, watch } = useForm();

  return (
    <>
      <CheckboxList {...args} {...register(args.name)} values={args.values} horizontal isCircle={false} />
      <pre>
        <code>{JSON.stringify(watch(args.name) || {}, null, 2)}</code>
      </pre>
    </>
  );
};

export const CheckboxListComponent = Template.bind({});
CheckboxListComponent.args = {
  name: 'Platform-selectboxlist',
  label: 'Platform',
  values: [
    { value: 'fb', name: 'Facebook', checked: false },
    { value: 'inst', name: 'Instagram', checked: true },
    { value: 'yt', name: 'Youtube', checked: false },
    { value: 'tiktok', name: 'Tiktok', checked: false },
  ],
};

export const CheckboxListHorizontalComponent = Template2.bind({});
CheckboxListHorizontalComponent.args = {
  name: 'Platform-selectboxlist',
  label: 'Platform',
  values: [
    { value: 'fb', name: 'Facebook', checked: false },
    { value: 'inst', name: 'Instagram', checked: true },
    { value: 'yt', name: 'Youtube', checked: false },
    { value: 'tiktok', name: 'Tiktok', checked: false },
  ],
};
