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
            if (event.returnValues) {
              let eventValues = event.returnValues;
              if (Number(eventValues.bidId) === bidId) {
                setBid(eventValues.bid);
              }
            }
          },
          (error) => {
            console.log(error);
            alert(error);
          },
        );

        var gotTrip = (await getTrip(bid.tripId)) as any;
        setTrip(gotTrip);
        subscribeStartedTrip(
          (event) => {
            if (event.returnValues) {
              if (event.returnValues.tripId === bid.tripId) {
                var tripClone = Object.assign({}, gotTrip, { started: true });
                setTrip(tripClone);
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
