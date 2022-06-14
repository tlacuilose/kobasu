import { useNavigate } from 'react-router-dom';

import { getActiveBid } from '../../../../data/web3/nekobasu';
import { initDapp } from '../../../../data/web3/web3';

const PassengerHomeViewModel = () => {
  const navigate = useNavigate();

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
    checkIfPassengerHasBid,
  };
};

export default PassengerHomeViewModel;
