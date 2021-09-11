import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import DatepickerRange from '../components/commons/DatepickerRange';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { subDays } from 'date-fns';

export default {
  title: 'Share Comp/DatePicker',
  component: DatepickerRange,
  argTypes: {},
};

const Template = (args) => {
  const { register, setValue, watch } = useForm();

  useEffect(() => {
    setTimeout(() => {
      setValue(args.name, [subDays(new Date(), 9), new Date()]);
    }, 2000);
  }, []);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div style={{ width: '500px' }}>
        <DatepickerRange {...args} {...register(args.name)} />
      </div>
      <pre>
        <p>data will change after 2 seconds</p>
        <code>{JSON.stringify(watch(args.name || []))}</code>
      </pre>
    </MuiPickersUtilsProvider>
  );
};

export const DatePickerRangeComponent = Template.bind({});
DatePickerRangeComponent.args = {
  name: 'campagnPeriodRange',
  label: 'Campagn Period',
  defaultValue: null,
  placeholder: 'This is placeholder when value is null',
};
