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
    ✔ should not offer trip with no seats available (1111ms)
    ✔ should require only one trip offered at the time (2097ms)
    ✔ should offer a new trip (1048ms)
    ✔ should not allow driver to bid on its offers (2094ms)
    ✔ should not allow passenger (not driver) to bid in an unexistent trip (1052ms)
    ✔ should not allow a passenger to bid again in a trip (4160ms)
    ✔ should not allow a passenger to bid in a trip with no seats (4171ms)
    ✔ should not allow a passenger to bid less than the cost of a trip (2059ms)
    ✔ should allow a passenger to bid in a trip (2076ms)
    ✔ should not allow a driver to accept a bid of a passenger with no bid (2066ms)
    ✔ should not allow a driver to accept a bid thats is not for them (4145ms)
    ✔ should allow a driver to accept a correct bid (3126ms)
    ✔ should not allow a driver to accept a bid if trip has no more seats (5196ms)
    ✔ should not allow passenger to withdraw an inexistent bid (1027ms)
    ✔ should not allow passenger to withdraw a bid that has been accepted (4147ms)
    ✔ should allow a passenger to withdraw a bid that has not been accepted (3082ms)
    ✔ should not allow a driver to start an unexistent trip (1031ms)
    ✔ should not allow a driver to start a trip with no passengers (2069ms)
    ✔ should allow a driver to start a trip with at least a passenger (4151ms)
    ✔ should not allow a driver to cancel an unexistent trip (1024ms)
    ✔ should not allow a driver to cancel a trip when they already accepted bids (4139ms)
    ✔ should allow a driver to cancel a trip when they have no accepted bids (3110ms)
    ✔ should not be able to finish an unexistent trip (1031ms)
    ✔ should not be able to finish a trip that has not started (4138ms)
    ✔ should be able to finish a trip that has started (5171ms)
    ✔ should discount a tripFee from driver when they offer a new trip (1047ms)
    ✔ should discount bid amount when making a bid (2071ms)
    ✔ should refund the bid amount when withdrawing a bid (3077ms)
    ✔ should not refund a tripFee to driver when they cancel a trip (2063ms)
    ✔ should pay the driver all bids and refund tripFee when starting a trip (6225ms)
    ✔ should pay the driver all accepted bids and refund tripFee when starting a trip (5185ms)


  31 passing (2m)
```
