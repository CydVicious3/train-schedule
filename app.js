console.log("javascript loaded")
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyC-3DzIsWMmmpNOWtgss2Ccz6N9BjwL7Xs",
  authDomain: "project-1-7ce6c.firebaseapp.com",
  databaseURL: "https://project-1-7ce6c.firebaseio.com",
  projectId: "project-1-7ce6c",
  storageBucket: "project-1-7ce6c.appspot.com",
  messagingSenderId: "960504237153",
  appId: "1:960504237153:web:bd84d8c71bc05502726e20",
  measurementId: "G-70ZN6GLLNE"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();
var db = firebase.database()

// pass original date in seconds (unix) and rate in minutes
const getNext = (original, rate) => {

  const rateInSeconds = rate * 60

  const now = moment().unix()

  let lapse = original

  while (lapse < now) {
    lapse += rateInSeconds
  }

  return moment((lapse + rate), 'X').format('MMMM, Do YYYY hh:mm a')
}


document.getElementById('addTrain').addEventListener('click', function () {
  event.preventDefault()
  console.log("click")
  let train = {
    name: document.getElementById("trainName").value,
    trainDest: document.getElementById("destination").value,
    trainTime: document.getElementById("time").value,
    trainFreq: document.getElementById("frequency").value
  };

  console.log(train);
  db.ref().push(train);
});


db.ref().on("child_added", function (snapshot) {
  console.log(snapshot.key, snapshot.val());

  var key = snapshot.key
  var trainName = snapshot.val().trainName;
  var destination = snapshot.val().destination;
  var frequency = parseInt(snapshot.val().frequency);
  var firstTrain = snapshot.val().firstTrain;
});