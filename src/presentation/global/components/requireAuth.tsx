import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { ethGetAccounts } from '../../../data/web3/web3';

const RequireAuth = () => {
  const navigate = useNavigate();

  const navigateLanding = () => navigate('/');

  const askMetamask = async () => {
    await ethGetAccounts().then(
      (accounts) => {
        if (accounts.length === 0) navigateLanding();
      },
      () => {
        navigateLanding();
      },
    );
  };

  useEffect(() => {
    askMetamask();
  });

  return <Outlet />;
};

export default RequireAuth;
