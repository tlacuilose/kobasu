import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  finishBid,
  getActiveBid,
  getBid,
  getTrip,
  subscribeCancelledTrip,
  subscribeFinishedTrip,
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

        /*
        subscribeFinishedTrip(
          (event) => {
            if (event.returnValues) {
              if (event.returnValues.tripId === bid.tripId) {
                alert('Your trip has finished.');
              }
            }
          },
          (error) => {
            console.log(error);
            alert(error);
          },
        );

        subscribeCancelledTrip(
          (event) => {
            if (event.returnValues) {
              if (event.returnValues.tripId === bid.tripId) {
                alert('Your trip has been cancelled.');
              }
            }
          },
          (error) => {
            console.log(error);
            alert(error);
          },
        );
        */
      }
    } catch (err: any) {
      alert('Could not get bid and trip info.');
    }
  };

  const callWithdrawBid = async () => {
    try {
      await withdrawBid();
      navigate('/passenger');
    } catch (err: any) {
      alert('Could not withdraw bid. Cannot withdraw an accepted bid.');
    }
  };

  const callFinishBid = async () => {
    try {
      await finishBid();
      navigate('/passenger');
    } catch (err: any) {
      alert('Could not finish a bid. Cannot finish a not accepted bid.');
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
