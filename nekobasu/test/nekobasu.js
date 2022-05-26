const Nekobasu = artifacts.require("Nekobasu")
const truffleAssert = require('truffle-assertions');

contract("Nekobasu", accounts => {
  var driver = accounts[0];
  var passenger = accounts[1];
  let nekobasu;

  beforeEach('setup contract', async function () {
    nekobasu = await Nekobasu.new();
  });

  it("should not offer trip with no seats available", async () => {
    var info = "New trip";
    var seats = 0;

    await truffleAssert.reverts(
      nekobasu.offerTrip(info, seats, {from: driver }),
      "needs seats"
    );
  });

  it("should offer a new trip", async () => {
    var info = "New trip"
    var seats = 1
    let tx = await nekobasu.offerTrip(info, seats, {from: driver});

    truffleAssert.eventEmitted(tx, 'NewTripOffer', (ev) => {
        return ev.tripId.toString() === "1" && ev.trip.info === info && ev.driver == driver;
    });
  });

  it("should require only one trip offered at the time", async () => {
    var info1 = "New trip"
    var seats1 = 1
    await nekobasu.offerTrip(info1, seats1, {from: driver});

    var info2 = "Another trip"
    var seats2 = 1
    await truffleAssert.reverts(
      nekobasu.offerTrip(info2, seats2, {from: driver}),
      "driver has trip"
    );
  });

  it("should not allow driver to bid on its offers.", async () => {
    var info = "New trip"
    var seats = 1
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

  it("should allow a passenger to bid in a trip.", async () => {
    var info = "New trip"
    var seats = 1
    await nekobasu.offerTrip(info, seats, {from: driver});

    const bid = 200;
    var tripId = 1;

    let tx = await nekobasu.makeBid(bid, tripId, {from: passenger});

    truffleAssert.eventEmitted(tx, "NewTripBid", (ev) => {
      return ev.tripId.toString() === tripId.toString() && ev.bid.amount.toString() === bid.toString() && ev.passenger === passenger;
    });
  });

});
