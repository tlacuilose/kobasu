// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

contract Nekobasu {
    uint tripFee = 30;

    event NewTripOffer(uint tripId, Trip trip, address driver);
    event NewTripBid(uint tripId, uint bidId, Bid bid, address passenger);
    event SeatOccupied(uint tripId, uint8 seats);
    event WithdrawBid(uint tripId, uint bidId, address passenger);
    event StartedTrip(uint tripId);

    struct Trip {
        address driver;
        string info;
        uint8 seats;
        bool started;
    }

    struct Bid {
        address passenger;
        uint amount;
        uint tripId;
        bool accepted;
    }

    Trip[] public trips;
    Bid[] public bids;

    mapping(address => uint) driverToTripId;
    mapping(address => uint) driverToPool;
    mapping(address => uint) passengerToBidId;

    function offerTrip(string calldata info, uint8 seats) public {
        address driver = msg.sender;

        require (driver.balance > tripFee, "cant pay trip fee");

        require (seats > 0, "needs seats");
        require (driverToTripId[driver] == 0, "driver has trip");

        Trip memory trip = Trip(driver, info, seats, false);
        trips.push(trip);

        uint tripId = trips.length;

        driverToTripId[driver] = tripId;

        // Transactions
        // driver.tripFee -> contract
        driverToPool[driver] = tripFee;

        emit NewTripOffer(tripId, trip, driver);
    }

    function makeBid(uint amount, uint tripId) public {
        address passenger = msg.sender;

        require (passengerToBidId[passenger] == 0, "passenger has bid");
        require (amount <= msg.sender.balance, "insufficient funds");

        require (tripId <= trips.length, "trip not exist");

        Trip memory trip = trips[tripId-1];
        require (!trip.started, "trip has started");
        require (trip.driver != passenger, "self bid");
        require (trip.seats > 0, "no more seats");

        Bid memory bid = Bid(passenger, amount, tripId, false);
        bids.push(bid);

        uint bidId = bids.length;

        passengerToBidId[passenger] = bidId;

        // Transactions
        // passenger.amount -> contract

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

        emit SeatOccupied(bid.tripId, trip.seats);
    }

    function withdrawBid() public {
        address passenger = msg.sender;
        uint bidId = passengerToBidId[passenger];

        require (bidId != 0, "passenger has no bid");

        Bid memory bid = bids[bidId - 1];

        require (!bid.accepted, "bid has been accepted");

        passengerToBidId[passenger] = 0;

        // Transactions
        // contract -> passenger.amount

        emit WithdrawBid(bid.tripId, bidId, passenger);
    }

    function startTrip() public {
        address driver = msg.sender;
        uint tripId = driverToTripId[driver];

        require (tripId != 0, "driver has no trip");
        require (driverToPool[driver] != tripFee, "trip has no passengers");

        driverToTripId[driver] = 0;

        // Transactions
        // pool -> driver
        driverToPool[driver] = 0;

        emit StartedTrip(tripId);
    }

    /*
    FIXME: Choose when to withdraw money.
    Set a pool amount. driverPool += bid.amount;
    On start get money from pool
    On cancell remove pool, return
    How to return from pool to persons. Apply a penalty for bid.
    Driver pays to make ando ffer which should be taken from statted.
    Driver is meant to start trip.
    TODO: Implement withdrawal
    function withdrawBid(uint passenger) public {
        require (passengerToBidId[passenger] != 0, "no bid withdrawal")

    }
   */

}
