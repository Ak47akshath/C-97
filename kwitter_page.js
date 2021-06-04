var firebaseConfig = {
      apiKey: "AIzaSyBBLlK2RadnHyPz13w6aqgsMgZEJbmXwCI",
      authDomain: "kwitter-a1108.firebaseapp.com",
      databaseURL: "https://kwitter-a1108-default-rtdb.firebaseio.com",
      projectId: "kwitter-a1108",
      storageBucket: "kwitter-a1108.appspot.com",
      messagingSenderId: "239522316835",
      appId: "1:239522316835:web:b362f73303d11963f5e796"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");

function send() {
      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name: user_name,
            message: msg,
            like: 0
      });
      document.getElementById("msg").value = "";
}

function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  childData = childSnapshot.val();
                  if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        //Start code
                        console.log(firebase_message_id);
                        console.log(message_data);
                        name=message_data['name'];
                        message=message_data['message'];
                        like=message_data['like'];
                        name_with_tag="<h4>"+name+"<img class='user_tick' src='tick.png'></h4>";
                        message_in_tag="<h4 class='message_h4'>"+message+ "</h4>";
                        like_button="<button class='btn btn-danger'id="+firebase_message_id+" value="+like+" onclick = 'updateLike(this.id)'>";
                        span_width_tag="<span class='glyphicon glyphicon-thumbs-up'>Like:"+like+"</span></button><hr>";
                        row=name_with_tag+message_in_tag+like_button+span_width_tag;
                        document.getElementById("output").innerHTML+=row;

                        //End code
                  }
            });
      });
}
getData();
function updateLike(message_id){
       console.log("click on like button"+message_id);
       button_id=message_id;
       like=document.getElementById(button_id).value;
       update_Like=Number(like)+1;
       console.log(update_Like);
       firebase.database().ref(room_name).child(message_id).update({
             like:update_Like
       });
}

function logout() {
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location = "index.html";

}