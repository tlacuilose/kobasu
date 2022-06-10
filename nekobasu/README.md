# Nekobasu contract

Truffle project for nekobasu.

## How to run

1. Open ganache and start a workplace
2. Verify that the host and port in ganache is the same as truffle-config.js
3. Verify that package.json has truffle-assertions

## Testing

- Run 'truffle test', to test contracts.

```bash
  Contract: Nekobasu
    ✔ should not offer trip with no seats available (1123ms)
    ✔ should require only one trip offered at the time (2095ms)
    ✔ should offer a new trip (1050ms)
    ✔ should not allow driver to bid on its offers (2100ms)
    ✔ should not allow passenger (not driver) to bid in an unexistent trip (1036ms)
    ✔ should not allow a passenger to bid again in a trip (4176ms)
    ✔ should not allow a passenger to bid in a trip with no seats (4180ms)
    ✔ should not allow a passenger to bid less than the cost of a trip (2075ms)
    ✔ should allow a passenger to bid in a trip (2086ms)
    ✔ should not allow a driver to accept a bid of a passenger with no bid (2060ms)
    ✔ should not allow a driver to accept a bid thats is not for them (4134ms)
    ✔ should allow a driver to accept a correct bid (3107ms)
    ✔ should not allow a driver to accept a bid if trip has no more seats (5185ms)
    ✔ should not allow passenger to withdraw an inexistent bid (1027ms)
    ✔ should not allow passenger to withdraw a bid that has been accepted (4142ms)
    ✔ should allow a passenger to withdraw a bid that has not been accepted (3103ms)
    ✔ should not allow a driver to start an unexistent trip (1028ms)
    ✔ should not allow a driver to start a trip with no passengers (2077ms)
    ✔ should allow a driver to start a trip with at least a passenger (4146ms)
    ✔ should not allow a driver to cancel an unexistent trip (1023ms)
    ✔ should not allow a driver to cancel a trip when they already accepted bids (4144ms)
    ✔ should allow a driver to cancel a trip when they have no accepted bids (3096ms)
    ✔ should not be able to finish an unexistent trip (1021ms)
    ✔ should not be able to finish a trip that has not started (4142ms)
    ✔ should be able to finish a trip that has started (5187ms)
    ✔ should not be able to get an unexistant trip by its id (118ms)
    ✔ should be able to get a trip by its id (1042ms)
    ✔ should not be able to get an unexistant bid by its id
    ✔ should be able to get a bid by its id (2080ms)
    ✔ should not have an active trip with out offering it
    ✔ should have an active trip when offer has been made (1061ms)
    ✔ should not have an active bid with out making a bid
    ✔ should have an active bid when a bid has been made (2074ms)
    ✔ should discount a tripFee from driver when they offer a new trip (1036ms)
    ✔ should discount bid amount when making a bid (2073ms)
    ✔ should refund the bid amount when withdrawing a bid (3096ms)
    ✔ should not refund a tripFee to driver when they cancel a trip (2054ms)
    ✔ should pay the driver all bids and refund tripFee when starting a trip (6229ms)
    ✔ should pay the driver all accepted bids and refund tripFee when starting a trip (5196ms)


  39 passing (2m)
```
