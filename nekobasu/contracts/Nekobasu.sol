// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

contract Nekobasu {

    event NewTripOffer(uint tripId, Trip trip, address driver);
    event NewTripBid(uint tripId, Bid bid, address passenger);

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

    mapping(address => uint) driverToTrip;
    mapping(address => uint) passengerToBid;

    function offerTrip(string calldata info, uint8 seats) public {
        address driver = msg.sender;
        require (seats > 0, "needs seats");
        require (driverToTrip[driver] == 0, "driver has trip");

        Trip memory trip = Trip(driver, info, seats);
        trips.push(trip);

        uint tripId = trips.length;

        driverToTrip[driver] = tripId;

        emit NewTripOffer(tripId, trip, driver);
    }

    function makeBid(uint amount, uint tripId) public {
        address passenger = msg.sender;

        require (passengerToBid[passenger] == 0, "passenger has bid");
        require (amount <= msg.sender.balance, "insufficient funds");

        require (tripId <= trips.length, "trip not exist");

        Trip memory trip = trips[tripId-1];
        require (trip.driver != passenger, "self bid");
        require (trip.seats > 0, "no more seats");

        Bid memory bid = Bid(passenger, amount, tripId);
        bids.push(bid);

        uint bidId = bids.length;

        passengerToBid[passenger] = bidId;

        emit NewTripBid(tripId, bid, passenger);
    }

    /* TODO: Implement withdrawal
    function withdrawBid(uint passenger) public {
        require (passengerToBid[passenger] != 0, "no bid withdrawal")

    }
   */

}
