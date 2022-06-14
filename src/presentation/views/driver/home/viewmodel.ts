import { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { getActiveTrip, offerTrip } from '../../../../data/web3/nekobasu';
import { SelectChangeEvent } from '@mui/material';
import { initDapp } from '../../../../data/web3/web3';

const DriverHomeViewModel = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [formValues, setFormValues] = useState({
    from: '',
    to: '',
    meetingtime: '2022-06-17T19:00',
    seats: 0,
    cost: 0,
  });

  const validateFormValues = () => {
    if (formValues.from === '') {
      throw new SyntaxError('Please select a destination to depart from.');
    }
    if (formValues.to === '') {
      throw new SyntaxError('Please select a destination to arrive to.');
    }
    if (formValues.seats <= 0) {
      throw new SyntaxError('Please select a positive amount of seats.');
    }
    if (formValues.cost < 0) {
      throw new SyntaxError('Please select a positive cost.');
    }
  };

  const onChangeInput = (
    event:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>,
  ) => {
    if (event.target) {
      setFormValues({ ...formValues, [event.target.name]: event.target.value });
    }
  };

  const onChangeSlider = (event: Event, value: number | number[]) => {
    if (event.target) {
      const element = event.target as HTMLInputElement;
      setFormValues({ ...formValues, [element.name]: value });
    }
  };

  const callOfferTrip = async () => {
    try {
      validateFormValues();
      let info = 'From: ' + formValues.from + ', to: ' + formValues.to;
      let receipt = await offerTrip(
        info,
        formValues.meetingtime,
        formValues.seats,
        formValues.cost,
      );
      console.log(receipt);
      navigate('/driver/waitlist');
    } catch (err: any) {
      // TODO: Catch TypeError mistake from library.
      console.log(err);
      if (err.message) {
        alert(err.message);
        setError(err.message);
      }
    }
  };

  const checkIfDriverHasTrip = async () => {
    try {
      await initDapp();
      let tripId = await getActiveTrip();
      if (tripId > 0) {
        navigate('/driver/waitlist');
      }
    } catch (err: any) {
      console.log(err);
      alert(err);
    }
  };

  return {
    ...formValues,
    onChangeInput,
    onChangeSlider,
    callOfferTrip,
    checkIfDriverHasTrip,
    error,
  };
};

export default DriverHomeViewModel;
