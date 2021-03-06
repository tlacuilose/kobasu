import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getActiveBid, getTrip, makeBid } from '../../../../data/web3/nekobasu';
import { initDapp } from '../../../../data/web3/web3';

const PassengerMakeBidViewModel = () => {
  const navigate = useNavigate();
  const [tripId, setTripId] = useState<Number>(0);
  const [amount, setAmount] = useState(0);

  const getTripInfo = async (tripId: Number) => {
    try {
      await initDapp();
      let trip = (await getTrip(tripId)) as any;
      setTripId(Number(tripId));
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
      await makeBid(tripId, amount);
      navigate('/passenger/trip');
    } catch (err: any) {
      console.log(err);
      if (err.message) {
        alert(
          'Could not make bid. Cannot make a bid to a trip with no available seats.',
        );
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
      alert('Could not find if passenger has a bid.');
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
