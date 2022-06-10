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
        resolve(receipt);
      })
      .on('error', (error: any) => {
        reject(error);
      });
  });
};

export const getTripFee = async () => {
  let tripFee = await callWrapper(window.nekobasu.methods.getTripFee());
  return tripFee as Number;
};

export const offerTrip = async (info: string, seats: Number, cost: Number) => {
  let tripFee = await getTripFee();
  return payableSendWrapper(
    window.nekobasu.methods.offerTrip(info, seats, cost),
    tripFee,
  );
};

export const startTrip = async () => {
  return callWrapper(window.nekobasu.methods.startTrip());
};
