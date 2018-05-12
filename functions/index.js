const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.aggregateBalance = functions.firestore
  .document('orders/{orderId}')
  .onCreate(orderDoc => {
    // console.log(event);
    const orderId = doc.id;
    const order = doc.data();
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
        balance += price;
        console.log(`New balance : $${balance}`);
        // run update
        return userRef.update({
          balance: balance
        });
      })
      .catch(err => console.log(err))
  });