import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getActiveBid, getTrip } from '../../../../data/web3/nekobasu';
import { initDapp } from '../../../../data/web3/web3';

const PassengerMakeBidViewModel = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState(0);

  const getTripInfo = async (tripId: Number) => {
    try {
      await initDapp();
      let trip = (await getTrip(tripId)) as any;
      setAmount(Number(trip.cost));
    } catch (err: any) {
      console.log(err);
      alert('Could not get the trip info.');
    }
  };

  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target) {
      setAmount(Number(event.target.value));
    }
  };

  const callMakeBid = async () => {
    try {
      navigate('/passenger/trip');
    } catch (err: any) {
      console.log(err);
      if (err.message) {
        alert(err.message);
      }
    }
  };

  const checkIfPassengerHasBid = async () => {
    try {
      await initDapp();
      let bidId = await getActiveBid();
      if (bidId > 0) {
        navigate('/passenger/trip');
      }
    } catch (err: any) {
      console.log(err);
      alert(err);
    }
  };

  return {
    amount,
    getTripInfo,
    onChange,
    callMakeBid,
    checkIfPassengerHasBid,
  };
};

export default PassengerMakeBidViewModel;
