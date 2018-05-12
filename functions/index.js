const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.aggregateBalance = functions.firestore
  .document('orders/{orderId}')
  .onWrite(event => {
    console.log(event);
    const orderId = event.params.orderId;
    const userId = event.params.user.id;
    const price = event.params.price;
    // ref to the parent document
    const docRef = admin.firestore().collection('users').doc(userId)

    // get all comments and aggregate
    return docRef
      .get()
      .then(querySnapshot => {
        const user = doc.data();
        let balance = user.balance;
        balance += price;
        console.log(balance);
        // run update
        return docRef.update({
          balance: balance
        });
      })
      .catch(err => console.log(err))
  });