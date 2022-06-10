// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

contract Nekobasu {
    uint tripFee = 30;

    function getTripFee() public view returns (uint) {
        return tripFee;
    }

    event NewTripOffer(uint tripId, Trip trip, uint cost, address driver);
    event NewTripBid(uint tripId, uint bidId, Bid bid, address passenger);
    event SeatOccupied(uint tripId, uint bidId, Trip trip, Bid bid);
    event WithdrawBid(uint tripId, uint bidId, address passenger);
    event StartedTrip(uint tripId);
    event CancelledTrip(uint tripId);
    event FinishedTrip(uint tripId);

    struct Trip {
        address driver;
        string info;
        uint8 seats;
        uint cost;
        bool started;
    }

    struct Bid {
        address passenger;
        uint amount;
        uint tripId;
        bool accepted;
    }

    Trip[] trips;
    Bid[] bids;

    mapping(address => uint) driverToTripId;
    mapping(address => uint) driverToPool;
    mapping(address => uint) passengerToBidId;

    function getTrip(uint tripId) public view returns (Trip memory) {
        require (tripId <= trips.length, "trip not exists");

        Trip memory trip = trips[tripId - 1];
        return  trip;
    }

    function getBid(uint bidId) public view returns (Bid memory) {
        require (bidId <= trips.length, "bid not exists");

        Bid memory bid = bids[bidId - 1];
        return  bid;
    }

    function hasActiveTrip() public view returns (bool) {
        return driverToTripId[msg.sender] > 0;
    }

    function hasActiveBid() public view returns (bool) {
        return passengerToBidId[msg.sender] > 0;
    }

    function offerTrip(string calldata info, uint8 seats, uint cost) public payable {
        address driver = msg.sender;

        require (msg.value == tripFee, "cant pay trip fee");

        require (seats > 0, "needs seats");
        require (driverToTripId[driver] == 0, "driver has trip");

        Trip memory trip = Trip(driver, info, seats, cost, false);
        trips.push(trip);

        uint tripId = trips.length;

        driverToTripId[driver] = tripId;

        // Transactions
        // driver.tripFee -> contract done with payable.
        driverToPool[driver] = tripFee;

        emit NewTripOffer(tripId, trip, cost, driver);
    }

    function makeBid(uint tripId) public payable {
        address passenger = msg.sender;
        uint amount = msg.value;

        require (passengerToBidId[passenger] == 0, "passenger has bid");

        require (tripId <= trips.length, "trip not exist");

        Trip memory trip = trips[tripId-1];
        require (amount >= trip.cost, "insufficient funds");
        require (!trip.started, "trip has started");
        require (trip.driver != passenger, "self bid");
        require (trip.seats > 0, "no more seats");

        Bid memory bid = Bid(passenger, amount, tripId, false);
        bids.push(bid);

        uint bidId = bids.length;

        passengerToBidId[passenger] = bidId;

        // Transactions
        // passenger.amount -> contract done with payable.

        emit NewTripBid(tripId, bidId, bid, passenger);
    }

    function acceptBid(address passenger) public {
        uint bidId = passengerToBidId[passenger];

        require (bidId > 0, "passenger has no bid");

        Bid memory bid = bids[bidId-1];
        require (!bid.accepted, "bid has been accepted");


        Trip memory trip = trips[bid.tripId-1];
        address driver = msg.sender;
        require (trip.driver == driver, "bid is not for driver");
        require (!trip.started, "trip has started");
        require (trip.seats > 0, "no more seats");

        trip.seats--;
        trips[bid.tripId-1] = trip;

        // Transactions
        driverToPool[trip.driver] += bid.amount;

        bid.accepted = true;
        bids[bidId-1] = bid;


        emit SeatOccupied(bid.tripId, bidId, trip, bid);
    }

    function withdrawBid() public {
        address payable passenger = payable(msg.sender);
        uint bidId = passengerToBidId[passenger];

        require (bidId != 0, "passenger has no bid");

        Bid memory bid = bids[bidId - 1];

        require (!bid.accepted, "bid has been accepted");

        passengerToBidId[passenger] = 0;

        // Transactions
        passenger.transfer(bid.amount);

        emit WithdrawBid(bid.tripId, bidId, passenger);
    }

    function startTrip() public {
        address payable driver = payable(msg.sender);
        uint tripId = driverToTripId[driver];

        require (tripId != 0, "driver has no trip");
        require (driverToPool[driver] != tripFee, "trip has no passengers");

        // TODO: Check that the trip is on time.
        // https://cryptozombies.io/en/lesson/3/chapter/5

        Trip memory trip = trips[tripId-1];
        trip.started = true;
        trips[tripId-1] = trip;

        // Transactions
        // pool -> driver
        driver.transfer(driverToPool[driver]);
        driverToPool[driver] = 0;

        emit StartedTrip(tripId);
    }

    function cancelTrip() public {
        address driver = msg.sender;
        uint tripId = driverToTripId[driver];

        require (tripId != 0, "driver has no trip");
        require (driverToPool[driver] == tripFee, "trip already has passengers");

        driverToTripId[driver] = 0;

        // Transactions 
        // TripFee is not returned, driver should not cancel trip.
        driverToPool[driver] = 0;


        emit CancelledTrip(tripId);
    }

    function finishTrip() public {
        address driver = msg.sender;
        uint tripId = driverToTripId[driver];

        require (tripId != 0, "driver has no trip");

        Trip memory trip = trips[tripId-1];
        
        require (trip.started, "trip has not started");

        driverToTripId[driver] = 0;

        emit FinishedTrip(tripId);
    }

    /*
    TODO: Rules should be explicit on frontend, for driver and for passenger.
    Example cant withdraw bid when it has been accepted.
	Cancel incurss on a tripFee.
    Cannot cancel a trip if it has passengers.
    */

}
