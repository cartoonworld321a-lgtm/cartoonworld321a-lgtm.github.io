// Firebase Config aur Location Tracker Logic
const firebaseConfig = {
  // Apni Firebase configuration details yahan add karein
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const database = firebase.database();

// User Unique ID Generator
let userId = localStorage.getItem("tracker_user_id");
if (!userId) {
  userId = "user_" + Math.random().toString(36).substr(2, 9);
  localStorage.setItem("tracker_user_id", userId);
}

// Live Location Watcher
if ("geolocation" in navigator) {
  navigator.geolocation.watchPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      const accuracy = position.coords.accuracy;

      // Firebase database mein location save/update karein
      database.ref("locations/" + userId).set({
        latitude: lat,
        longitude: lng,
        accuracy: accuracy,
        timestamp: new Date().toISOString()
      });

      console.log("Location updated:", lat, lng);
    },
    (error) => {
      console.error("Geolocation Error:", error.message);
    },
    {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 5000
    }
  );
} else {
  alert("Geolocation aap ke browser mein supported nahi hai.");
        }
