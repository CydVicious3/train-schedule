console.log("javascript loaded")
// Your web app's Firebase configuration

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAOb6U3wlP12EcHiGByJrbm1cRskHyIb5Y",
  authDomain: "traincyd.firebaseapp.com",
  databaseURL: "https://traincyd.firebaseio.com",
  projectId: "traincyd",
  storageBucket: "",
  messagingSenderId: "723341098159",
  appId: "1:723341098159:web:086d2c8f7eb56f8f52e85a",
  measurementId: "G-QSYBQP8X9B"
};

//
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
    name: document.getElementById('trainName').value,
    trainDest: document.getElementById('destination').value,
    trainTime: document.getElementById('time').value,
    trainFreq: document.getElementById('frequency').value
  };

  console.log(train);
  db.ref().push(train);
});

// db.collection('traincyd')
//   .onSnapshot(({ docs }) => {
//     document.getElementById('trainTable').innerHTML = ' '
//     docs.forEach(traincyd => {
//       let { trainName, destination, time, frequency } = traincyd.data()
//       let trainElem = document.createElement('td')
//       trainElem.className = 'tbody'
//       trainElem.innerHTML = `
//     ${trainName}
//     ${destination}
//     ${time}
//     ${frequency}`

//       document.getElementById('trainTable').append(trainElem)
//     });
//   })

db.ref().on("child_added", function (snapshot) {
  console.log(snapshot.key, snapshot.val());

  var key = snapshot.key
  var trainName = snapshot.val().name;
  var destination = snapshot.val().trainDest;
  var frequency = parseInt(snapshot.val().trainFreq);
  var firstTrain = snapshot.val().trainTime;
  var originseconds = moment.duration(firstTrain).asSeconds()
  console.log("seconds", originseconds)
  var nextArrival = getNext(originseconds, frequency)
  console.log(nextArrival)
  var nowT = moment().unix()
  var next = moment(nextArrival).unix()
  console.log(nowT, next)
  //var minutesAway = moment.duration(nowT.diff(nextArrival));
  //console.log(minutesAway)
  var minutesAway = 0



  // add to the screnn the info the row  
  // you need to calculate the next train and the minites wasy 
  // then create a row in the htm table
  //document.getElementById("traintable > tbody" ).appendChild('<tr><td scope="col">#</td><td scope="col">' + trainName + '<///////td><td scope="col">' + destination + '</td><td scope="col">' + frequency + '</td><td scope="col">'  + nextArrival + ' </td><td //scope="col">' + minutesAway + '</td></tr>')

  $("#traintable > tbody").append(`<tr><td scope='col'>${trainName}</td><td scope='col'>${destination}</td><td scope='col'class='text-center' >${frequency}</td><td scope='col' class='text-center'>${nextArrival}</td><td scope='col' class='text-center' >${minutesAway}</td><td scope='col'><button key=${key} class="btn btn-outline-danger delete content-center">delete</button></td></tr>`)

});


