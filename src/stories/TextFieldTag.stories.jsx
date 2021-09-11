import React from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import TextFieldTag from '../components/commons/TextFieldTag';

export default {
  title: 'Share Comp/TextField',
  component: TextFieldTag,
};

const Template = (args) => {
  const { register, watch, setValue } = useForm();

  useEffect(() => {
    setTimeout(() => {
      setValue(args.name, args.tags);
    }, 2000);
  }, []);

  return (
    <>
      <TextFieldTag values={args.tags} {...args} {...register(args.name)} />
      <pre>
        <p>data will change after 2 seconds</p>
        <code>{JSON.stringify(watch(args.name) || {}, null, 2)}</code>
      </pre>
    </>
  );
};

export const FieldTag = Template.bind({});

FieldTag.args = {
  label: 'KOL Affinity',
  name: 'tags',
  tags: ['fashion', 'beauty', 'travel', 'photography'],
};
