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
        let credit = user.balance;
        console.log(credit, 'vs', price);
        if (credit >= price) {
          credit -= price;
          console.log(`New credit : $${credit}`);
          return orderDoc.ref
            .update({
              paid: new Date()
            })
            .then(() => userRef.update({
              credit: credit,
            }));
        } else {
          balance -= price;
          console.log(`New balance : $${balance}`);

          return userRef
            .update({
              balance: balance
            });
        }
      })
      .catch(err => console.log(err))
  });

  exports.notifyArrival = functions.firestore
  .document('/arrivals/{arrivalId}')
  .onWrite(doc => {
    
      const arrival = doc.data();
    
      const payload = {
            notification: {
              title: `Alerta! (${doc.id})`,
              body: arrival.message,
            },
            topic: 'arrival'
          };

      return admin
      .messaging()
      .send(payload);         
      .then(payload => console.log(payload))
      .catch(err => console.log(err))
    });

    exports.subscribeToTopic = functions.https.onCall((data, context) => {
      const topic = data.topic;
      const tokens = data.tokens;
      
      // Subscribe the devices corresponding to the registration tokens to the
      // topic.
      return admin
        .messaging()
        .subscribeToTopic(tokens, topic)
          .then(function(response) {
            // See the MessagingTopicManagementResponse reference documentation
            // for the contents of response.
            const message = 'Successfully subscribed to topic: '+response;
            console.log(message);
            return {
              message: message;
            };
          })
          .catch(function(error) {
            console.log('Error subscribing to topic:', error);
            return {
              error: error;
            };
          });
    });

   