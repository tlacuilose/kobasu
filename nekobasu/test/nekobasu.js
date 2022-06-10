const Nekobasu = artifacts.require("Nekobasu")
const { assert } = require('console');
const truffleAssert = require('truffle-assertions');

contract("Nekobasu", accounts => {
  var driver = accounts[1];
  var otherDriver = accounts[3];
  var passenger = accounts[2];
  var otherPassenger = accounts[4];

  let nekobasu;
  let tripFee;

  beforeEach('setup contract', async function () {
    nekobasu = await Nekobasu.new();
    tripFee = await nekobasu.getTripFee();
  });

  // Offer trip

  it("should not offer trip with no seats available", async () => {
    var info = "New trip";
    var seats = 0;
    var cost = 200;

    await truffleAssert.reverts(
      nekobasu.offerTrip(info, seats, cost, {from: driver, value: tripFee}),
      "needs seats"
    );
  });

  it("should require only one trip offered at the time", async () => {
    var info1 = "New trip";
    var seats1 = 1;
    var cost1 = 200;
    await nekobasu.offerTrip(info1, seats1, cost1, {from: driver, value: tripFee});

    var info2 = "Another trip";
    var seats2 = 1;
    var cost2 = 400;
    await truffleAssert.reverts(
      nekobasu.offerTrip(info2, seats2, cost2, {from: driver, value: tripFee}),
      "driver has trip"
    );
  });

  it("should offer a new trip", async () => {
    var info = "New trip";
    var seats = 1;
    var cost = 200;
    let tx = await nekobasu.offerTrip(info, seats, cost, {from: driver, value: tripFee});

    truffleAssert.eventEmitted(tx, 'NewTripOffer', (ev) => {
        return ev.tripId.toString() === "1" && ev.trip.info === info && ev.driver == driver;
    });
  });

  // Make Bid

  it("should not allow driver to bid on its offers", async () => {
    var info = "New trip";
    var seats = 1;
    var cost = 200;
    await nekobasu.offerTrip(info, seats, cost, {from: driver, value: tripFee});

    var bid = 234;
    await truffleAssert.reverts(
      nekobasu.makeBid(1, {from: driver, value: bid.toString()}),
      "self bid"
    );
  });

  it("should not allow passenger (not driver) to bid in an unexistent trip", async () => {
    const nekobasu = await Nekobasu.deployed();

    var bid = 200;
    var tripId = 2;

    await truffleAssert.reverts(
      nekobasu.makeBid(tripId, {from: passenger, value: bid.toString()}),
      "trip not exist"
    );
  });

  it("should not allow a passenger to bid again in a trip", async () => {
    var info = "New trip";
    var seats = 1;
    var cost = 200;
    await nekobasu.offerTrip(info, seats, cost, {from: driver, value: tripFee});

    info = "Other trip";
    seats = 1;
    cost = 200;
    await nekobasu.offerTrip(info, seats, cost, {from: otherDriver, value: tripFee});

    var bid = 200;
    var tripId = 1;

    let tx = await nekobasu.makeBid(tripId, {from: passenger, value: bid.toString()});

    truffleAssert.eventEmitted(tx, "NewTripBid", (ev) => {
      return ev.tripId.toString() === tripId.toString() && ev.bid.amount.toString() === bid.toString() && ev.passenger === passenger;
    });

    bid = 200;
    tripId = 2;

    await truffleAssert.reverts(
      nekobasu.makeBid(tripId, {from: passenger, value: bid.toString()}),
      "passenger has bid"
    );
  });

  it("should not allow a passenger to bid in a trip with no seats", async ()=> {
    var info = "New trip";
    var seats = 1;
    var cost = 200;

    let tx = await nekobasu.offerTrip(info, seats, cost, {from: driver, value: tripFee});

    var tripId = 0;
    truffleAssert.eventEmitted(tx, "NewTripOffer", (ev) => {
      tripId = ev.tripId;
      return ev.driver.toString() === driver;
    });

    var bid = 200;
    await nekobasu.makeBid(tripId, {from: passenger, value: bid.toString()});
    
    await nekobasu.acceptBid(passenger, {from: driver});

    var bid2 = 200;

    await truffleAssert.reverts(
      nekobasu.makeBid(tripId, {from: otherPassenger, value: bid2.toString()}),
      "no more seats"
    );
  });

  it("should not allow a passenger to bid less than the cost of a trip", async () => {
    var info = "New trip";
    var seats = 1;
    var cost = 200;

    let tx = await nekobasu.offerTrip(info, seats, cost, {from: driver, value: tripFee});
    let tripId = 0;
    truffleAssert.eventEmitted(tx, "NewTripOffer", (ev) => {
      tripId = ev.tripId;
      return ev.driver.toString() === driver;
    });

    const bid = 100;

    await truffleAssert.reverts(
      nekobasu.makeBid(tripId, {from: passenger, value: bid.toString()}),
      "insufficient funds"
    );
  });

  it("should allow a passenger to bid in a trip", async () => {
    var info = "New trip";
    var seats = 1;
    var cost = 200;
    await nekobasu.offerTrip(info, seats, cost, {from: driver, value: tripFee});

    const bid = 200;
    var tripId = 1;

    let tx = await nekobasu.makeBid(tripId, {from: passenger, value: bid.toString()});

    truffleAssert.eventEmitted(tx, "NewTripBid", (ev) => {
      return ev.tripId.toString() === tripId.toString() && ev.bid.amount.toString() === bid.toString() && ev.passenger === passenger;
    });
  });

  // Accept bid

  it("should not allow a driver to accept a bid of a passenger with no bid", async () => {
    var info = "New trip";
    var seats = 1;
    var cost = 200;
    await nekobasu.offerTrip(info, seats, cost, {from: driver, value: tripFee});

    await truffleAssert.reverts(
      nekobasu.acceptBid(passenger, {from: driver}),
      "passenger has no bid"
    );
  });

  it("should not allow a driver to accept a bid thats is not for them", async ()=> {
    var info = "New trip";
    var seats = 1;
    var cost = 200;
    await nekobasu.offerTrip(info, seats, cost, {from: driver, value: tripFee});

    var infoOther = "Other trip";
    var seatsOther = 2;
    var costOther = 200;

    let tx = await nekobasu.offerTrip(infoOther, seatsOther, costOther, {from: otherDriver, value: tripFee});

    var tripIdOther = 0;

    truffleAssert.eventEmitted(tx, "NewTripOffer", (ev) => {
      tripIdOther = ev.tripId;
      return ev.driver.toString() === otherDriver;
    });

    var bid = 200;

    await nekobasu.makeBid(tripIdOther, {from: passenger, value: bid.toString()});

    await truffleAssert.reverts(
      nekobasu.acceptBid(passenger, {from: driver}),
      "bid is not for driver"
    );
  });

  it("should allow a driver to accept a correct bid", async ()=> {
    var info = "New trip";
    var seats = 1;
    var cost = 200;

    let tx = await nekobasu.offerTrip(info, seats, cost, {from: driver, value: tripFee});

    var tripId = 0;
    truffleAssert.eventEmitted(tx, "NewTripOffer", (ev) => {
      tripId = ev.tripId;
      return ev.driver.toString() === driver;
    });

    var bid = 200;
    await nekobasu.makeBid(tripId, {from: passenger, value: bid.toString()});

    let tx2 = await nekobasu.acceptBid(passenger, {from: driver});

    truffleAssert.eventEmitted(tx2, "SeatOccupied", (ev) => {
      return ev.tripId.toString() === tripId.toString() && ev.seats.toString() === (seats - 1).toString();
    });
  });

  it("should not allow a driver to accept a bid if trip has no more seats", async ()=> {
    var info = "New trip";
    var seats = 1;
    var cost = 200;

    let tx = await nekobasu.offerTrip(info, seats, cost, {from: driver, value: tripFee});

    var tripId = 0;
    truffleAssert.eventEmitted(tx, "NewTripOffer", (ev) => {
      tripId = ev.tripId;
      return ev.driver.toString() === driver;
    });

    var bid = 200;
    await nekobasu.makeBid(tripId, {from: passenger, value: bid.toString()});

    var bid2 = 200;
    await nekobasu.makeBid(tripId, {from: otherPassenger, value: bid2.toString()});

    await nekobasu.acceptBid(passenger, {from: driver});

    await truffleAssert.reverts(
      nekobasu.acceptBid(otherPassenger, {from: driver}),
      "no more seats"
    );
  });

  // Withdraw bid

  it("should not allow passenger to withdraw an inexistent bid", async () => {
    await truffleAssert.reverts(
      nekobasu.withdrawBid({from: passenger}),
      "passenger has no bid"
    );
  });


  it("should not allow passenger to withdraw a bid that has been accepted", async () => {
    var info = "New trip";
    var seats = 1;
    var cost = 200;

    let tx = await nekobasu.offerTrip(info, seats, cost, {from: driver, value: tripFee});

    var tripId = 0;
    truffleAssert.eventEmitted(tx, "NewTripOffer", (ev) => {
      tripId = ev.tripId;
      return ev.driver.toString() === driver;
    });

    var bid = 200;
    await nekobasu.makeBid(tripId, {from: passenger, value: bid.toString()});

    await nekobasu.acceptBid(passenger, {from: driver});

    await truffleAssert.reverts(
      nekobasu.withdrawBid({from: passenger}),
      "bid has been accepted"
    );
  });


  it("should allow a passenger to withdraw a bid that has not been accepted", async () => {
    var info = "New trip";
    var seats = 1;
    var cost = 200;

    let tx = await nekobasu.offerTrip(info, seats, cost, {from: driver, value: tripFee});

    var tripId = 0;
    truffleAssert.eventEmitted(tx, "NewTripOffer", (ev) => {
      tripId = ev.tripId;
      return ev.driver.toString() === driver;
    });

    var bid = 200;
    let tx2 = await nekobasu.makeBid(tripId, {from: passenger, value: bid.toString()});

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

  // Start trip

  it("should not allow a driver to start an unexistent trip", async () => {
    await truffleAssert.reverts(
      nekobasu.startTrip({from: driver}),
      "driver has no trip"
    );
  });

  it("should not allow a driver to start a trip with no passengers", async () => {
    var info = "New trip";
    var seats = 1;
    var cost = 200;

    let tx = await nekobasu.offerTrip(info, seats, cost, {from: driver, value: tripFee});
    truffleAssert.eventEmitted(tx, "NewTripOffer", (ev) => {
      return ev.driver.toString() === driver;
    });

    await truffleAssert.reverts(
      nekobasu.startTrip({from: driver}),
      "trip has no passengers"
    );
  });

  it("should allow a driver to start a trip with at least a passenger", async () => {
    var info = "New trip";
    var seats = 2;
    var cost = 200;

    let tx = await nekobasu.offerTrip(info, seats, cost, {from: driver, value: tripFee});

    var tripId = 0;
    truffleAssert.eventEmitted(tx, "NewTripOffer", (ev) => {
      tripId = ev.tripId;
      return ev.driver.toString() === driver;
    });

    var bid = 200;
    await nekobasu.makeBid(tripId, {from: passenger, value: bid.toString()});

    await nekobasu.acceptBid(passenger, {from: driver});

    let tx2 = await nekobasu.startTrip({from: driver});

    truffleAssert.eventEmitted(tx2, "StartedTrip", (ev) => {
      return ev.tripId.toString() === tripId.toString();
    });
  });

  // Cancel trip

  it("should not allow a driver to cancel an unexistent trip", async () => {
    await truffleAssert.reverts(
      nekobasu.cancelTrip({from: driver}),
      "driver has no trip"
    );
  });

  it("should not allow a driver to cancel a trip when they already accepted bids", async () => {
    let info = "New Trip";
    let seats = 2;
    var cost = 200;

    let tx = await nekobasu.offerTrip(info, seats, cost, {from: driver, value: tripFee});
    let tripId = 0;
    truffleAssert.eventEmitted(tx, "NewTripOffer", (ev) => {
      tripId = ev.tripId;
      return ev.driver.toString() === driver;
    });


    let amount = 200;
    await nekobasu.makeBid(tripId, {from: passenger, value: amount.toString()});

    await nekobasu.acceptBid(passenger, {from: driver});

    await truffleAssert.reverts(
      nekobasu.cancelTrip({from: driver}),
      "trip already has passengers"
    );
  });
  
  it("should allow a driver to cancel a trip when they have no accepted bids", async () => {
    let info = "New Trip";
    let seats = 2;
    var cost = 200;

    let tx = await nekobasu.offerTrip(info, seats, cost, {from: driver, value: tripFee});
    let tripId = 0;
    truffleAssert.eventEmitted(tx, "NewTripOffer", (ev) => {
      tripId = ev.tripId;
      return ev.driver.toString() === driver;
    });


    let amount = 200;
    await nekobasu.makeBid(tripId, {from: passenger, value: amount.toString()});

    let tx2 = await nekobasu.cancelTrip({from: driver});
    truffleAssert.eventEmitted(tx2, "CancelledTrip", (ev) => {
      return ev.tripId.toString() === tripId.toString();
    });

  });

  // Finish trip

  it("should not be able to finish an unexistent trip", async () => {
    await truffleAssert.reverts(
      nekobasu.finishTrip({from: driver}),
      "driver has no trip"
    );
  });

  it("should not be able to finish a trip that has not started", async () => {
    let tx = await nekobasu.offerTrip("New trip", 2, 200, {from: driver, value: tripFee});
    var tripId;
    truffleAssert.eventEmitted(tx, "NewTripOffer", (ev) => {
      tripId = ev.tripId;
      return ev.driver.toString() === driver;
    });

    let bid1 = 200;
    await nekobasu.makeBid(tripId, {from: passenger, value: bid1});

    await nekobasu.acceptBid(passenger, {from: driver});

    await truffleAssert.reverts(
      nekobasu.finishTrip({from: driver}),
      "trip has not started"
    );
  });

  it("should be able to finish a trip that has started", async () => {
    let tx = await nekobasu.offerTrip("New trip", 2, 200, {from: driver, value: tripFee});
    var tripId;
    truffleAssert.eventEmitted(tx, "NewTripOffer", (ev) => {
      tripId = ev.tripId;
      return ev.driver.toString() === driver;
    });

    let bid1 = 200;
    await nekobasu.makeBid(tripId, {from: passenger, value: bid1});

    await nekobasu.acceptBid(passenger, {from: driver});

    await nekobasu.startTrip({from: driver});

    let tx2 = await nekobasu.finishTrip({from: driver});

    truffleAssert.eventEmitted(tx2, "FinishedTrip", (ev) => {
      return ev.tripId.toString() === tripId.toString();
    })
  });

  // View Functions

  it("should not be able to get an unexistant trip by its id", async () => {
    await truffleAssert.reverts(
      nekobasu.getTrip(2),
      "trip not exists"
    );
  });

  it("should be able to get a trip by its id", async () => {
    let tx = await nekobasu.offerTrip("New trip", 2, 200, {from: driver, value: tripFee});
    var tripId;
    var info;
    truffleAssert.eventEmitted(tx, "NewTripOffer", (ev) => {
      tripId = ev.tripId;
      info = ev.trip.info;
      return ev.driver.toString() === driver;
    });

    let trip = await nekobasu.getTrip(tripId);

    assert(trip.info === info);
  });

  it("should not be able to get an unexistant bid by its id", async () => {
    await truffleAssert.reverts(
      nekobasu.getBid(2),
      "bid not exists"
    );
  });

  it("should be able to get a bid by its id", async () => {
    let tx = await nekobasu.offerTrip("New trip", 2, 200, {from: driver, value: tripFee});
    var tripId;
    var cost;
    truffleAssert.eventEmitted(tx, "NewTripOffer", (ev) => {
      tripId = ev.tripId;
      cost = ev.cost;
      return ev.driver.toString() === driver;
    });
    
    let tx2 = await nekobasu.makeBid(tripId, {from: passenger, value: cost});
    var bidId;
    truffleAssert.eventEmitted(tx2, "NewTripBid", (ev) => {
      bidId = ev.bidId;
      return ev.passenger.toString() === passenger;
    });

    let bid = await nekobasu.getBid(bidId);

    assert(bid.tripId == tripId);
  });

  it("should not have an active trip with out offering it", async () => {
    let activeTrip = await nekobasu.hasActiveTrip({from: driver});
    assert(!activeTrip);
  });

  it("should have an active trip when offer has been made", async () => {
    await nekobasu.offerTrip("New trip", 2, 200, {from: driver, value: tripFee});

    let activeTrip = await nekobasu.hasActiveTrip({from: driver});
    assert(activeTrip);
  });

  it("should not have an active bid with out making a bid", async () => {
    let activeBid = await nekobasu.hasActiveBid({from: passenger});
    assert(!activeBid);
  });

  it("should have an active bid when a bid has been made", async () => {
    let tx = await nekobasu.offerTrip("New trip", 2, 200, {from: driver, value: tripFee});
    var tripId;
    var cost;
    truffleAssert.eventEmitted(tx, "NewTripOffer", (ev) => {
      tripId = ev.tripId;
      cost = ev.cost;
      return ev.driver.toString() === driver;
    });
    
    await nekobasu.makeBid(tripId, {from: passenger, value: cost});

    let activeBid = await nekobasu.hasActiveBid({from: passenger});
    assert(activeBid);
  });

  // Transactions

  const checkPayment = async (previousBalance, afterBalance, tx, payed) => {
    let previous = BigInt(previousBalance);
    let after = BigInt(afterBalance);

    let gasUsed = BigInt(tx.receipt.gasUsed);

    let transaction = await web3.eth.getTransaction(tx.tx);
    let gasPrice = BigInt(transaction.gasPrice);

    let amountPayed = BigInt(payed);

    let totalPayed = gasPrice * gasUsed + amountPayed;

    return after == (previous - totalPayed);
  }

  it("should discount a tripFee from driver when they offer a new trip", async () => {
    let driverBalance = await web3.eth.getBalance(driver);

    let tx = await nekobasu.offerTrip("New trip", 2, 200, {from: driver, value: tripFee});

    let driverBalanceAfter = await web3.eth.getBalance(driver);

    let desiredPayment =  await checkPayment(driverBalance, driverBalanceAfter, tx, tripFee);
    assert(desiredPayment);
  });

  it("should discount bid amount when making a bid", async () => {
    let txt = await nekobasu.offerTrip("New Trip", 2, 200, {from: driver, value: tripFee});
    let tripId = 0;
    let cost = 0;
    truffleAssert.eventEmitted(txt, "NewTripOffer", (ev) => {
      tripId = ev.tripId;
      cost = ev.cost;
      return ev.driver.toString() === driver;
    });

    let passengerBalance = await web3.eth.getBalance(passenger);
    let tx = await nekobasu.makeBid(tripId, {from: passenger, value: cost});
    let passengerBalanceAfter = await web3.eth.getBalance(passenger);

    let desiredPayment = await checkPayment(passengerBalance, passengerBalanceAfter, tx, cost);
    assert(desiredPayment);
  });

  it("should refund the bid amount when withdrawing a bid", async () => {
    let txt = await nekobasu.offerTrip("New Trip", 2, 200, {from: driver, value: tripFee});
    let tripId = 0;
    let cost = 0;
    truffleAssert.eventEmitted(txt, "NewTripOffer", (ev) => {
      tripId = ev.tripId;
      cost = ev.cost;
      return ev.driver.toString() === driver;
    });

    let passengerBalance = await web3.eth.getBalance(passenger);
    let tx = await nekobasu.makeBid(tripId, {from: passenger, value: cost});
    let passengerBalanceAfter = await web3.eth.getBalance(passenger);

    let desiredPayment = await checkPayment(passengerBalance, passengerBalanceAfter, tx, cost);
    assert(desiredPayment);

    passengerBalance = await web3.eth.getBalance(passenger);
    tx = await nekobasu.withdrawBid({from: passenger});
    passengerBalanceAfter = await web3.eth.getBalance(passenger);

    desiredPayment = await checkPayment(passengerBalance, passengerBalanceAfter, tx, (-cost.toNumber()).toString());
    assert(desiredPayment);
  });

  it("should not refund a tripFee to driver when they cancel a trip", async () => {
    let driverBalance = await web3.eth.getBalance(driver);
    let tx = await nekobasu.offerTrip("New trip", 2, 200, {from: driver, value: tripFee});
    let driverBalanceAfter = await web3.eth.getBalance(driver);

    driverBalance = await web3.eth.getBalance(driver);
    tx = await nekobasu.cancelTrip({from: driver});
    driverBalanceAfter = await web3.eth.getBalance(driver);

    let desiredPayment =  await checkPayment(driverBalance, driverBalanceAfter, tx, "0");
    assert(desiredPayment);
  });

  it("should pay the driver all bids and refund tripFee when starting a trip", async () => {
    let tx = await nekobasu.offerTrip("New trip", 2, 200, {from: driver, value: tripFee});
    var tripId;
    truffleAssert.eventEmitted(tx, "NewTripOffer", (ev) => {
      tripId = ev.tripId;
      return ev.driver.toString() === driver;
    });

    let bid1 = 200;
    await nekobasu.makeBid(tripId, {from: passenger, value: bid1});

    await nekobasu.acceptBid(passenger, {from: driver});

    let bid2 = 300;
    await nekobasu.makeBid(tripId, {from: otherPassenger, value: bid2});

    await nekobasu.acceptBid(otherPassenger, {from: driver});

    let driverBalance = await web3.eth.getBalance(driver);
    tx = await nekobasu.startTrip({from: driver});
    let driverBalanceAfter = await web3.eth.getBalance(driver);

    let desiredPayment = await checkPayment(driverBalance, driverBalanceAfter, tx, (-(tripFee.toNumber() + bid1 + bid2)).toString());
    assert(desiredPayment);
  });

  it("should pay the driver all accepted bids and refund tripFee when starting a trip", async () => {
    let tx = await nekobasu.offerTrip("New trip", 2, 200, {from: driver, value: tripFee});
    var tripId;
    truffleAssert.eventEmitted(tx, "NewTripOffer", (ev) => {
      tripId = ev.tripId;
      return ev.driver.toString() === driver;
    });

    let bid1 = 200;
    await nekobasu.makeBid(tripId, {from: passenger, value: bid1});

    await nekobasu.acceptBid(passenger, {from: driver});

    let bid2 = 300;
    await nekobasu.makeBid(tripId, {from: otherPassenger, value: bid2});

    let driverBalance = await web3.eth.getBalance(driver);
    tx = await nekobasu.startTrip({from: driver});
    let driverBalanceAfter = await web3.eth.getBalance(driver);

    let desiredPayment = await checkPayment(driverBalance, driverBalanceAfter, tx, (-(tripFee.toNumber() + bid1)).toString()); // Not bid2
    assert(desiredPayment);
  });

});
