import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  finishBid,
  getActiveBid,
  getBid,
  getTrip,
  subscribeSeatOccupied,
  subscribeStartedTrip,
  withdrawBid,
} from '../../../../data/web3/nekobasu';
import { initDapp } from '../../../../data/web3/web3';

const PassengerTripViewModel = () => {
  const navigate = useNavigate();
  const [bid, setBid] = useState<any>(undefined);
  const [trip, setTrip] = useState<any>(undefined);

  const checkIfPassengerHasBid = async () => {
    try {
      await initDapp();
      let bidId = await getActiveBid();
      if (bidId === 0) {
        navigate('/passenger');
      } else {
        let bid = (await getBid(bidId)) as any;
        setBid(bid);
        subscribeSeatOccupied(
          (event) => {
            console.log(event);
            if (event.returnValues) {
              let eventBid = event.returnValues;
              console.log(eventBid.bidId);
              console.log(bidId);
              console.log(bid);
              if (Number(eventBid.bidId) === bidId) {
                console.log('setting bid');
                setBid(eventBid);
              }
            }
          },
          (error) => {
            console.log(error);
            alert(error);
          },
        );

        let gotTrip = (await getTrip(bid.tripId)) as any;
        console.log('---');
        console.log(bid.tripId);
        console.log(gotTrip);
        setTrip(gotTrip);
        subscribeStartedTrip(
          (event) => {
            console.log(event);
            if (event.returnValues) {
              let eventTrip = event.returnValues;
              console.log(eventTrip.tripId);
              console.log(bid.tripId);
              console.log(bid);
              console.log(trip);
              if (eventTrip.tripId === bid.tripId) {
                trip.started = true;
                setTrip(trip);
              }
            }
          },
          (error) => {
            console.log(error);
            alert(error);
          },
        );
      }
    } catch (err: any) {
      console.log(err);
      alert(err);
    }
  };

  const callWithdrawBid = async () => {
    try {
      await withdrawBid();
      navigate('/passenger');
    } catch (err: any) {
      console.log(err);
      alert(err);
    }
  };

  const callFinishBid = async () => {
    try {
      await finishBid();
      navigate('/passenger');
    } catch (err: any) {
      console.log(err);
      alert(err);
    }
  };

  return {
    bid,
    trip,
    checkIfPassengerHasBid,
    callWithdrawBid,
    callFinishBid,
  };
};

export default PassengerTripViewModel;
