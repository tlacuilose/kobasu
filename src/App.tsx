import React from 'react';
import { Route, Routes } from 'react-router-dom';

import LoggedInLayout from './presentation/global/components/loggedinlayout';
import NotFound from './presentation/global/components/notfound';
import RequireAuth from './presentation/global/components/requireAuth';
import DriverHomeView from './presentation/views/driver/home/driverhome';
import DriverTripView from './presentation/views/driver/trip/drivertrip';
import DriverWaitListView from './presentation/views/driver/waitlist/driverwaitlist';
import LandingView from './presentation/views/landing/landing';
import PassengerHomeView from './presentation/views/passenger/home/passengerhome';
import PassengerMakeBid from './presentation/views/passenger/makebid/passengermakebid';
import PassengerTripView from './presentation/views/passenger/trip/passengertrip';

const App = () => {
  if (window.ethereum) {
    window.ethereum.on('chainChanged', () => {
      window.location.reload();
    });

    window.ethereum.on('accountsChanged', () => {
      window.location.reload();
    });
  }

  return (
    <React.Fragment>
      <Routes>
        <Route index element={<LandingView />} />

        <Route element={<RequireAuth />}>
          <Route path='passenger' element={<LoggedInLayout user='Passenger' />}>
            <Route index element={<PassengerHomeView />} />
            <Route path='bid/:tripId' element={<PassengerMakeBid />} />
            <Route path='trip' element={<PassengerTripView />} />
          </Route>

          <Route path='driver' element={<LoggedInLayout user='Driver' />}>
            <Route index element={<DriverHomeView />} />
            <Route path='waitlist' element={<DriverWaitListView />} />
            <Route path='trip' element={<DriverTripView />} />
          </Route>
        </Route>

        <Route path='*' element={<NotFound />} />
      </Routes>
    </React.Fragment>
  );
};
export default App;
