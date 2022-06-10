import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTrip, makeBid } from '../../../../data/web3/nekobasu';
import { initDapp } from '../../../../data/web3/web3';

const PassengerMakeBidViewModel = () => {
  const navigate = useNavigate();
  const [trip, setTrip] = useState<any>(undefined);
  const [tripId, setTripId] = useState<Number>(0);
  const [amount, setAmount] = useState(0);

  const getTripInfo = async (tripId: Number) => {
    try {
      await initDapp();
      let trip = (await getTrip(tripId)) as any;
      setTripId(Number(tripId));
      setTrip(trip);
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
      let receipt = await makeBid(tripId, amount);
      console.log(receipt);
      navigate('/passenger/trip');
    } catch (err: any) {
      console.log(err);
      if (err.message) {
        alert(err.message);
      }
    }
  };

  return {
    amount,
    getTripInfo,
    onChange,
    callMakeBid,
  };
};

export default PassengerMakeBidViewModel;
