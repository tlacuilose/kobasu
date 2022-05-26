// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

contract Nekobasu {

    event NewTripOffer(uint tripId, Trip trip, address driver);
    event NewTripBid(uint tripId, Bid bid, address passenger);
    event SeatOccupied(uint tripId, uint8 seats);

    struct Trip {
        address driver;
        string info;
        uint8 seats;
    }

    struct Bid {
        address passenger;
        uint amount;
        uint tripId;
    }

    Trip[] public trips;
    Bid[] public bids;

    mapping(uint => bool) startedTrips;
    mapping(uint => bool) acceptedBids;
    mapping(address => uint) driverToTripId;
    mapping(address => uint) passengerToBidId;

    function offerTrip(string calldata info, uint8 seats) public {
        address driver = msg.sender;
        require (seats > 0, "needs seats");
        require (driverToTripId[driver] == 0, "driver has trip");

        Trip memory trip = Trip(driver, info, seats);
        trips.push(trip);

        uint tripId = trips.length;

        driverToTripId[driver] = tripId;

        emit NewTripOffer(tripId, trip, driver);
    }

    function makeBid(uint amount, uint tripId) public {
        address passenger = msg.sender;

        require (passengerToBidId[passenger] == 0, "passenger has bid");
        require (amount <= msg.sender.balance, "insufficient funds");

        require (tripId <= trips.length, "trip not exist");
        require (!startedTrips[tripId], "trip has started");

        Trip memory trip = trips[tripId-1];
        require (trip.driver != passenger, "self bid");
        require (trip.seats > 0, "no more seats");

        Bid memory bid = Bid(passenger, amount, tripId);
        bids.push(bid);

        uint bidId = bids.length;

        passengerToBidId[passenger] = bidId; // TODO: Withdraw bid

        emit NewTripBid(tripId, bid, passenger);
    }

    function acceptBid(address passenger) public {
        uint bidId = passengerToBidId[passenger];

        require (bidId > 0, "passenger has no bid");
        require (!acceptedBids[bidId], "bid has been accepted");

        Bid memory bid = bids[bidId];
        Trip memory trip = trips[bid.tripId];
        address driver = msg.sender;

        require (trip.driver == driver, "bid is not for driver");
        require (!startedTrips[bid.tripId], "trip has started");
        require (trip.seats > 0, "no more seats.");

        trip.seats--;
        trips[bid.tripId] = trip;

        acceptedBids[bidId] = true;

        emit SeatOccupied(bid.tripId, trip.seats);
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
