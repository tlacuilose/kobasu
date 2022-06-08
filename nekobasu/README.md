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
    ✔ should not offer trip with no seats available (1107ms)
    ✔ should require only one trip offered at the time (2091ms)
    ✔ should offer a new trip (1046ms)
    ✔ should not allow driver to bid on its offers. (2090ms)
    ✔ should not allow passenger (not driver) to bid in an unexistent trip. (1050ms)
    ✔ should not allow a passenger to bid again in a trip. (4167ms)
    ✔ should not allow a passenger to bid in a trip with no seats. (4154ms)
    ✔ should not allow a passenger to bid less than the cost of a trip. (2098ms)
    ✔ should allow a passenger to bid in a trip. (2067ms)
    ✔ should not allow a driver to accept a bid of a passenger with no bid (2080ms)
    ✔ should not allow a driver to accept a bid thats is not for them (4164ms)
    ✔ should allow a driver to accept a correct bid (3140ms)
    ✔ should not allow a driver to accept a bid if trip has no more seats (5185ms)
    ✔ should not allow passenger to withdraw an inexistent bid (1021ms)
    ✔ should not allow passenger to withdraw a bid that has been accepted (4139ms)
    ✔ should allow a passenger to withdraw a bid that has not been accepted (3079ms)
    ✔ should not allow a driver to start an unexistent trip (1027ms)
    ✔ should not allow a driver to start a trip with no passengers (2060ms)
    ✔ should allow a driver to start a trip with at least a passenger (4162ms)
    ✔ should not allow a driver to cancel an unexistent trip (1041ms)
    ✔ should not allow a driver to cancel a trip when they already accepted bids (4158ms)
    ✔ should allow a driver to cancel a trip when they have no accepted bids (3100ms)
    ✔ should discount a tripFee from driver when they offer a new trip (1042ms)
    ✔ should discount bid amount when making a bid (2083ms)
    ✔ should refund the bid amount when withdrawing a bid (3127ms)
    ✔ should not refund a tripFee to driver when they cancel a trip (2072ms)
    ✔ should pay the driver all bids and refund tripFee when starting a trip (6285ms)
    ✔ should pay the driver all accepted bids and refund tripFee when starting a trip (5228ms)


  28 passing (2m)
```
