import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import LoggedInLayout from './presentation/global/components/loggedinlayout';

import DriverHomeView from './presentation/views/driver/home/driverhome';
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
        </Route>
      </Routes>
    </React.Fragment>
  );
}

export default App;
