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
    ✔ should not offer trip with no seats available (1114ms)
    ✔ should require only one trip offered at the time (2096ms)
    ✔ should offer a new trip (1047ms)
    ✔ should not allow driver to bid on its offers (2097ms)
    ✔ should not allow passenger (not driver) to bid in an unexistent trip (1054ms)
    ✔ should not allow a passenger to bid again in a trip (4158ms)
    ✔ should not allow a passenger to bid in a trip that has been cancelled (3094ms)
    ✔ should not allow a passenger to bid in a trip with no seats (4191ms)
    ✔ should not allow a passenger to bid less than the cost of a trip (2080ms)
    ✔ should allow a passenger to bid in a trip (2072ms)
    ✔ should not allow a driver to accept a bid of a passenger with no bid (2073ms)
    ✔ should not allow a driver to accept a bid thats is not for them (4146ms)
    ✔ should allow a driver to accept a correct bid (3105ms)
    ✔ should not allow a driver to accept a bid if trip has no more seats (5175ms)
    ✔ should not allow passenger to withdraw an inexistent bid (1026ms)
    ✔ should not allow passenger to withdraw a bid that has been accepted (4152ms)
    ✔ should allow a passenger to withdraw a bid that has not been accepted (3102ms)
    ✔ should not allow a passenger to finish an unexistent bid (1027ms)
    ✔ should not allow a passenger to finish a bid that was not accepted (3110ms)
    ✔ should allow a passenger to finish a bid that was accepted (4142ms)
    ✔ should not allow a driver to start an unexistent trip (1023ms)
    ✔ should not allow a driver to start a trip with no passengers (2050ms)
    ✔ should allow a driver to start a trip with at least a passenger (4157ms)
    ✔ should not allow a driver to cancel an unexistent trip (1024ms)
    ✔ should not allow a driver to cancel a trip when they already accepted bids (4137ms)
    ✔ should allow a driver to cancel a trip when they have no accepted bids (3093ms)
    ✔ should not be able to finish an unexistent trip (1026ms)
    ✔ should not be able to finish a trip that has not started (4146ms)
    ✔ should be able to finish a trip that has started (5180ms)
    ✔ should not be able to get an unexistant trip by its id (116ms)
    ✔ should be able to get a trip by its id (1040ms)
    ✔ should not be able to get an unexistant bid by its id
    ✔ should be able to get a bid by its id (2078ms)
    ✔ should not have an active trip with out offering it
    ✔ should have an active trip when offer has been made (1030ms)
    ✔ should not have an active bid with out making a bid
    ✔ should have an active bid when a bid has been made (2076ms)
    ✔ should discount a tripFee from driver when they offer a new trip (1039ms)
    ✔ should discount bid amount when making a bid (2070ms)
    ✔ should refund the bid amount when withdrawing a bid (3095ms)
    ✔ should not refund a tripFee to driver when they cancel a trip (2078ms)
    ✔ should pay the driver all bids and refund tripFee when starting a trip (6240ms)
    ✔ should pay the driver all accepted bids and refund tripFee when starting a trip (5179ms)


  43 passing (3m)
```
