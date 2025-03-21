const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.updateBusLocation = functions.pubsub.schedule('every 1 minutes').onRun(async (context) => {
  const db = admin.firestore();
  const busesRef = db.collection('buses');

  // Simulate movement for bus1
  const busRef = busesRef.doc('bus1');
  const bus = await busRef.get();
  if (bus.exists) {
    let { latitude, longitude } = bus.data().location;
    // Simulate movement by adding a small offset
    latitude += 0.001; // Move north
    longitude += 0.001; // Move east

    await busRef.update({
      location: { latitude, longitude },
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    console.log(`Updated bus1 to lat: ${latitude}, lon: ${longitude}`);
  } else {
    // If bus1 doesn't exist, create it
    await busRef.set({
      location: { latitude: 26.9124, longitude: 75.7873 },
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    console.log('Created bus1');
  }

  return null;
});