import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  cancelTrip,
  getActiveTrip,
  getTrip,
  startTrip,
} from '../../../../data/web3/nekobasu';
import { initDapp } from '../../../../data/web3/web3';

const DriverWaitListViewModel = () => {
  const navigate = useNavigate();
  const [trip, setTrip] = useState<any>(undefined);
  const [tripId, setTripId] = useState<Number>(0);

  const callCancelTrip = async () => {
    try {
      await cancelTrip();
      navigate('/driver');
    } catch (err: any) {
      alert(err);
    }
  };

  const callStartTrip = async () => {
    try {
      await startTrip();
      navigate('/driver/trip');
    } catch (err: any) {
      alert(err);
    }
  };

  const checkIfDriverHasTrip = async () => {
    try {
      await initDapp();
      let tripId = await getActiveTrip();
      if (tripId === 0) {
        navigate('/driver');
      } else {
        let trip = (await getTrip(tripId)) as any;
        if (trip.started) {
          navigate('/driver/trip');
        } else {
          setTripId(tripId);
          setTrip(trip);
        }
      }
    } catch (err: any) {
      console.log(err);
      alert(err);
    }
  };

  return {
    tripId,
    trip,
    callCancelTrip,
    callStartTrip,
    checkIfDriverHasTrip,
  };
};

export default DriverWaitListViewModel;
