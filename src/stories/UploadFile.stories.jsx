import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import UploadFile from '../components/commons/UploadFile';

export default {
  title: 'Share Comp/UploadFile',
  component: UploadFile,
  argTypes: {},
};

const Template = (args) => {
  const { register, setValue } = useForm();

  useEffect(() => {
    setTimeout(() => {
      setValue(args.name, args.defaultImage);
    }, 2000);
  }, []);

  return <UploadFile values={args.defaultImage} {...args} {...register(args.name)} />;
};

const TemplateWithApi = (args) => {
  const { register, watch, setValue } = useForm();

  useEffect(() => {
    setTimeout(() => {
      setValue(args.name, args.defaultImage);
    }, 2000);
  }, []);

  return (
    <>
      <UploadFile values={args.defaultImage} {...args} {...register(args.name)} />
      <pre>
        <p>data will change after 2 seconds</p>
        <code>url image: {JSON.stringify(watch(args.name) || '', null, 2)}</code>
      </pre>
    </>
  );
};

export const UploadFileDefault = Template.bind({});
UploadFileDefault.args = {
  name: 'avatar',
};

export const UploadFileWithApi = TemplateWithApi.bind({});
UploadFileWithApi.args = {
  name: 'avatar',
  defaultImage: 'https://cdn.fakercloud.com/avatars/angelceballos_128.jpg',
};
