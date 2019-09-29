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


{/* <tr>
  <th scope="row">1</th>
  <td>Mark</td>
  <td>Otto</td>
  <td>@mdo</td>
</tr> */}

document.getElementById('addTrain').addEventListener('click', function () {
  event.preventDefault()
  console.log("click")
  let train = {
    name: document.getElementById("trainName").value,
    trainDest: document.getElementById("destination").value,
    trainTime: document.getElementById("time").value,
    trainFreq: document.getElementById("frequency").value
  }

  console.log(train)
  db.ref().push(train)
})