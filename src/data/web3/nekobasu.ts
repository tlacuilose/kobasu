const callWrapper = async (methodCall: any) => {
  return new Promise((resolve, reject) => {
    methodCall.call({ from: window.account }, (err: Error, res: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

const sendWrapper = async (methodCall: any) => {
  return new Promise((resolve, reject) => {
    methodCall
      .send({ from: window.account })
      .on('receipt', (receipt: any) => {
        resolve(receipt);
      })
      .on('error', (error: any) => {
        reject(error);
      });
  });
};

const payableSendWrapper = async (methodCall: any, value: Number) => {
  return new Promise((resolve, reject) => {
    methodCall
      .send({ from: window.account, value: value })
      .on('receipt', (receipt: any) => {
        console.log(receipt);
        resolve(receipt);
      })
      .on('error', (error: any) => {
        console.log(error);
        reject(error);
      });
  });
};

export const getTripFee = async () => {
  let tripFee = await callWrapper(window.nekobasu.methods.getTripFee());
  return tripFee as Number;
};

export const getTrip = async (tripId: Number) => {
  let trip = await callWrapper(window.nekobasu.methods.getTrip(tripId));
  return trip;
};

export const offerTrip = async (info: string, seats: Number, cost: Number) => {
  let tripFee = await getTripFee();
  return payableSendWrapper(
    window.nekobasu.methods.offerTrip(info, seats, cost),
    tripFee,
  );
};

export const startTrip = async () => {
  let receipt = await sendWrapper(window.nekobasu.methods.startTrip());
  return receipt;
};

export const cancelTrip = async () => {
  let receipt = await sendWrapper(window.nekobasu.methods.cancelTrip());
  console.log(receipt);
  return receipt;
};

export const makeBid = async (tripId: Number, amount: Number) => {
  return payableSendWrapper(window.nekobasu.methods.makeBid(tripId), amount);
};

export const getAvailableOffers = async () => {
  var offers: Map<string, string[]> = new Map<string, string[]>();

  // Get all offers.
  let evs = await window.nekobasu.getPastEvents('NewTripOffer', {
    fromBlock: 0,
    toBlock: 'latest',
  });

  evs.forEach((ev: any) => {
    const res = ev.returnValues;
    offers.set(res.tripId, res);
  });

  // Remove started offers.
  evs = await window.nekobasu.getPastEvents('StartedTrip', {
    fromBlock: 0,
    toBlock: 'latest',
  });

  evs.forEach((ev: any) => {
    const res = ev.returnValues;
    offers.delete(res.tripId);
  });

  // Remove cancelled offers.
  evs = await window.nekobasu.getPastEvents('CancelledTrip', {
    fromBlock: 0,
    toBlock: 'latest',
  });

  evs.forEach((ev: any) => {
    const res = ev.returnValues;
    offers.delete(res.tripId);
  });

  return Array.from(offers.values());
};
