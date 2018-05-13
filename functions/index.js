const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.aggregateBalance = functions.firestore
  .document('orders/{orderId}')
  .onCreate(orderDoc => {
    const order = orderDoc.data();
    const userId = order.user.id;
    const price = order.price;
    // ref to the parent document
    const userRef = admin.firestore().collection('users').doc(userId)

    // get all comments and aggregate
    return userRef
      .get()
      .then(userDoc => {
        const user = userDoc.data();
        let balance = user.balance;
        let autoPay = false;
        if (balance >= price) {
          autoPay = true;
        }
        balance = balance - price;
        console.log(`New balance : $${balance}`);
        // run update
        if (autoPay) {
          return orderDoc.ref
            .update({
              paid: new Date()
            })
            .then(() => userRef
              .update({
                balance: balance
              }));
        }
        return userRef
          .update({
            balance: balance
          });
      })
      .catch(err => console.log(err))
  });