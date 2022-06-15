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
      alert(
        'Error cancelling trip. Cannot cancel if a bid already has been accepted.',
      );
    }
  };

  const callStartTrip = async () => {
    try {
      await startTrip();
      navigate('/driver/trip');
    } catch (err: any) {
      alert('Error starting trip. Cannot start without accepting a bid.');
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
      alert('Could not check wether the driver has a trip.');
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
