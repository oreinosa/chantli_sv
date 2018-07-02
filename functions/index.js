const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.aggregateBalance = functions.firestore
  .document('ordenes/{orderId}')
  .onCreate(orderDoc => {
    const order = orderDoc.data();
    const userId = order.user.id;
    const price = order.price;
    // ref to the parent document
    const userRef = admin.firestore().collection('usuarios').doc(userId)

    // get all comments and aggregate
    return userRef
      .get()
      .then(userDoc => {
        const user = userDoc.data();
        let debit = user.debit;
        let credit = user.credit;
        console.log(credit, 'vs', price);
        if (credit >= price) {
          credit -= price;
          console.log(`New credit : $${credit}`);
          return orderDoc.ref
            .update({
              paid: {
                flag: true,
                by: new Date()
              }
            })
            .then(() => userRef.update({
              credit: credit,
            }));
        } else {
          debit += price;
          console.log(`New debit : $${debit}`);
          return userRef
            .update({
              debit: debit
            });
        }
      })
      .catch(err => console.log(err))
  });

// exports.returnPaidOrder = functions
//   .https
//   .onCall((data, context) => {
//     const userId = data.userId; // user id 
//     const orderId = data.orderId; // order id 
    
//     const tokens = data.tokens;
//     const orderBefore = change.before.data();
//     const orderAfter = change.after.data();
//     let flag = false;
//     console.log(orderBefore.status, ' vs ', orderAfter.status);
//     if (orderBefore.status !== orderAfter.status) {
//       switch (orderBefore.status) {
//         case "Cancelado (reembolso)":
//           break;
//         default:
//           if (orderAfter.paid.flag) {
//             switch (orderAfter.status) {
//               case "Cancelado (reembolso)":
//                 flag = true;
//                 break;
//             }
//           }
//       }
//       if (flag) {
//         const userId = orderAfter.user.id;
//         const price = orderAfter.price;
//         const userRef = admin.firestore().collection('usuarios').doc(userId);

//         return userRef
//           .get()
//           .then(userDoc => {
//             const user = userDoc.data();
//             let credit = user.credit;
//             credit += price;
//             console.log(`New credit : $${credit}`);
//             return userRef
//               .update({
//                 credit: credit
//               });
//           })
//           .catch(err => console.log(err));
//       }
//     }
//     return false;
//   });

exports.notifyArrival = functions.firestore
  .document('/llegadas/{arrivalId}')
  .onWrite((change, context) => {

    const arrival = change.after.data();

    const message = {
      notification: {
        title: `Alerta! (${change.after.id})`,
        body: arrival.message + `(${arrival.timestamp})`,
      },
      data: {
        test: 'test'
      },
      topic: 'arrival'
    };

    return admin
      .messaging()
      .send(message)
      .then(payload => {
        console.log('Successfully sent message:', payload);
      })
      .catch(error => {
        console.log('Error sending message:', error);
      })
  });

exports.subscribeToTopic = functions
  .https
  .onCall((data, context) => {
    const topic = data.topic;
    const tokens = data.tokens;
    console.log(tokens);
    // Subscribe the devices corresponding to the registration tokens to the
    // topic
    return admin
      .messaging()
      .subscribeToTopic(tokens, topic)
      .then(function (response) {
        // See the MessagingTopicManagementResponse reference documentation
        // for the contents of response.
        const message = 'Successfully subscribed to topic: ' + response.successCount;
        console.log(response);
        return {
          response: message
        }
        // res.status(200).end();
      })
      .catch(function (error) {
        console.log('Error subscribing to topic:', error);
        // res.status(400).end();
        return {
          response: error
        }
      });
  });