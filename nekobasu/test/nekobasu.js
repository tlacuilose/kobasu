const Nekobasu = artifacts.require("Nekobasu")
const truffleAssert = require('truffle-assertions');

contract("Nekobasu", accounts => {
  var driver = accounts[0];
  var otherDriver = accounts[2];
  var passenger = accounts[1];
  var otherPassenger = accounts[3];

  let nekobasu;

  beforeEach('setup contract', async function () {
    nekobasu = await Nekobasu.new();
  });

  // Offer trip

  it("should not offer trip with no seats available", async () => {
    var info = "New trip";
    var seats = 0;

    await truffleAssert.reverts(
      nekobasu.offerTrip(info, seats, {from: driver }),
      "needs seats"
    );
  });

  it("should require only one trip offered at the time", async () => {
    var info1 = "New trip";
    var seats1 = 1;
    await nekobasu.offerTrip(info1, seats1, {from: driver});

    var info2 = "Another trip";
    var seats2 = 1;
    await truffleAssert.reverts(
      nekobasu.offerTrip(info2, seats2, {from: driver}),
      "driver has trip"
    );
  });

  it("should offer a new trip", async () => {
    var info = "New trip";
    var seats = 1;
    let tx = await nekobasu.offerTrip(info, seats, {from: driver});

    truffleAssert.eventEmitted(tx, 'NewTripOffer', (ev) => {
        return ev.tripId.toString() === "1" && ev.trip.info === info && ev.driver == driver;
    });
  });

  // Make Bid

  it("should not allow driver to bid on its offers.", async () => {
    var info = "New trip";
    var seats = 1;
    await nekobasu.offerTrip(info, seats, {from: driver});

    var bid = 234;
    await truffleAssert.reverts(
      nekobasu.makeBid(bid, 1, {from: driver}),
      "self bid"
    );
  });

  it("should not allow passenger (not driver) to bid more than its balance.", async () => {
    const nekobasu = await Nekobasu.deployed();

    const passengerBalance = await web3.eth.getBalance(passenger);

    var bid = passengerBalance + 1;
    var tripId = 2;

    await truffleAssert.reverts(
      nekobasu.makeBid(bid, tripId, {from: passenger}),
      "insufficient funds"
    );
  });

  it("should not allow passenger (not driver) to bid in an unexistant trip.", async () => {
    const nekobasu = await Nekobasu.deployed();

    var bid = 200;
    var tripId = 2;

    await truffleAssert.reverts(
      nekobasu.makeBid(bid, tripId, {from: passenger}),
      "trip not exist"
    );
  });

  it("should not allow a passenger to bid again in a trip.", async () => {
    var info = "New trip";
    var seats = 1;
    await nekobasu.offerTrip(info, seats, {from: driver});

    info = "Other trip";
    seats = 1;
    await nekobasu.offerTrip(info, seats, {from: otherDriver});

    var bid = 200;
    var tripId = 1;

    let tx = await nekobasu.makeBid(bid, tripId, {from: passenger});

    truffleAssert.eventEmitted(tx, "NewTripBid", (ev) => {
      return ev.tripId.toString() === tripId.toString() && ev.bid.amount.toString() === bid.toString() && ev.passenger === passenger;
    });

    bid = 200;
    tripId = 2;

    await truffleAssert.reverts(
      nekobasu.makeBid(bid, tripId, {from: passenger}),
      "passenger has bid"
    );
  });

  it("should not allow a passenger to bid in a trip with no seats.", async ()=> {
    var info = "New trip";
    var seats = 1;

    let tx = await nekobasu.offerTrip(info, seats, {from: driver});

    var tripId = 0;
    truffleAssert.eventEmitted(tx, "NewTripOffer", (ev) => {
      tripId = ev.tripId;
      return ev.driver.toString() === driver;
    });

    var bid = 200;
    await nekobasu.makeBid(bid, tripId, {from: passenger});
    
    await nekobasu.acceptBid(passenger, {from: driver});

    var bid2 = 200;

    truffleAssert.reverts(
      nekobasu.makeBid(bid2, tripId, {from: otherPassenger}),
      "no more seats"
    );
  });

  it("should allow a passenger to bid in a trip.", async () => {
    var info = "New trip";
    var seats = 1;
    await nekobasu.offerTrip(info, seats, {from: driver});

    const bid = 200;
    var tripId = 1;

    let tx = await nekobasu.makeBid(bid, tripId, {from: passenger});

    truffleAssert.eventEmitted(tx, "NewTripBid", (ev) => {
      return ev.tripId.toString() === tripId.toString() && ev.bid.amount.toString() === bid.toString() && ev.passenger === passenger;
    });
  });

  // Accept bid

  it("should not allow a driver to accept a bid of a passenger with no bid", async () => {
    var info = "New trip";
    var seats = 1;

    await nekobasu.offerTrip(info, seats, {from: driver});

    await truffleAssert.reverts(
      nekobasu.acceptBid(passenger, {from: driver}),
      "passenger has no bid"
    );
  });

  it("should not allow a driver to accept a bid thats is not for them", async ()=> {
    var info = "New trip";
    var seats = 1;

    await nekobasu.offerTrip(info, seats, {from: driver});

    var infoOther = "Other trip";
    var seatsOther = 2;

    let tx = await nekobasu.offerTrip(infoOther, seatsOther, {from: otherDriver});

    var tripIdOther = 0;

    truffleAssert.eventEmitted(tx, "NewTripOffer", (ev) => {
      tripIdOther = ev.tripId;
      return ev.driver.toString() === otherDriver;
    });

    var bid = 200;

    await nekobasu.makeBid(bid, tripIdOther, {from: passenger});

    await truffleAssert.reverts(
      nekobasu.acceptBid(passenger, {from: driver}),
      "bid is not for driver"
    );
  });

  it("should allow a driver to accept a correct bid", async ()=> {
    var info = "New trip";
    var seats = 1;

    let tx = await nekobasu.offerTrip(info, seats, {from: driver});

    var tripId = 0;
    truffleAssert.eventEmitted(tx, "NewTripOffer", (ev) => {
      tripId = ev.tripId;
      return ev.driver.toString() === driver;
    });

    var bid = 200;
    await nekobasu.makeBid(bid, tripId, {from: passenger});

    let tx2 = await nekobasu.acceptBid(passenger, {from: driver});

    truffleAssert.eventEmitted(tx2, "SeatOccupied", (ev) => {
      return ev.tripId.toString() === tripId.toString() && ev.seats.toString() === (seats - 1).toString();
    });
  });

  it("should not allow a driver to accept a bid if trip has no more seats", async ()=> {
    var info = "New trip";
    var seats = 1;

    let tx = await nekobasu.offerTrip(info, seats, {from: driver});

    var tripId = 0;
    truffleAssert.eventEmitted(tx, "NewTripOffer", (ev) => {
      tripId = ev.tripId;
      return ev.driver.toString() === driver;
    });

    var bid = 200;
    await nekobasu.makeBid(bid, tripId, {from: passenger});

    var bid2 = 200;
    await nekobasu.makeBid(bid2, tripId, {from: otherPassenger});

    await nekobasu.acceptBid(passenger, {from: driver});

    truffleAssert.reverts(
      nekobasu.acceptBid(otherPassenger, {from: driver}),
      "no more seats"
    );
  });

  // Withdraw bid

  it("should not allow passenger to withdraw an inexistent bid", async () => {
    truffleAssert.reverts(
      nekobasu.withdrawBid({from: passenger}),
      "passenger has no bid"
    );
  });


  it("should not allow passenger to withdraw a bid that has been accepted", async () => {
    var info = "New trip";
    var seats = 1;

    let tx = await nekobasu.offerTrip(info, seats, {from: driver});

    var tripId = 0;
    truffleAssert.eventEmitted(tx, "NewTripOffer", (ev) => {
      tripId = ev.tripId;
      return ev.driver.toString() === driver;
    });

    var bid = 200;
    await nekobasu.makeBid(bid, tripId, {from: passenger});

    await nekobasu.acceptBid(passenger, {from: driver});

    truffleAssert.reverts(
      nekobasu.withdrawBid({from: passenger}),
      "bid has been accepted"
    );
  });


  it("should allow a passenger to withdraw a bid that has not been accepted", async () => {
    var info = "New trip";
    var seats = 1;

    let tx = await nekobasu.offerTrip(info, seats, {from: driver});

    var tripId = 0;
    truffleAssert.eventEmitted(tx, "NewTripOffer", (ev) => {
      tripId = ev.tripId;
      return ev.driver.toString() === driver;
    });

    var bid = 200;
    let tx2 = await nekobasu.makeBid(bid, tripId, {from: passenger});

    var bidId = 0;
    truffleAssert.eventEmitted(tx2, "NewTripBid", (ev) => {
      bidId = ev.bidId;
      return ev.passenger.toString() === passenger;
    });

    let tx3 = await nekobasu.withdrawBid({from: passenger});

    truffleAssert.eventEmitted(tx3, "WithdrawBid", (ev) => {
      return ev.tripId.toString() === tripId.toString() && ev.bidId.toString() === bidId.toString() && ev.passenger.toString() === passenger;
    });
  });

});
