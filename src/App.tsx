import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import LoggedInLayout from './presentation/global/components/loggedinlayout';
import NotFound from './presentation/global/components/notfound';

import DriverHomeView from './presentation/views/driver/home/driverhome';
import DriverTripStartedView from './presentation/views/driver/tripstarted/drivertripstarted';
import DriverWaitListView from './presentation/views/driver/waitlist/driverwaitlist';
import LandingView from './presentation/views/landing/landing';
import PassengerHomeView from './presentation/views/passenger/home/passengerhome';

function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route index element={<LandingView />} />
        <Route path="passenger" element={<LoggedInLayout user="Passenger"/>}>
          <Route index element={<PassengerHomeView />} />
        </Route>
        <Route path="driver" element={<LoggedInLayout user="Driver"/>}>
          <Route index element={<DriverHomeView />} />
          <Route path="waitlist" element={<DriverWaitListView />} />
          <Route path="trip" element={<DriverTripStartedView />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
