  const firebaseConfig = {
    apiKey: "AIzaSyASKwrxitavZdYswncnwIRxVkJARnktV9U",
    authDomain: "spiceeauthstorage.firebaseapp.com",
    databaseURL: "https://spiceeauthstorage-default-rtdb.firebaseio.com",
    projectId: "spiceeauthstorage",
    storageBucket: "spiceeauthstorage.appspot.com",
    messagingSenderId: "183905325189",
    appId: "1:183905325189:web:ac65db60a2c77025b959ec"
  };

  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
// Set database variable
var auth = firebase.auth()
var database = firebase.database()


//get all auth inputs
var first_namesu = document.getElementById('first_namesu')
var email=first_namesu.value+"@spiceeauth.co"
var last_namesu = document.getElementById('last_namesu')
var passwordsu = document.getElementById('passwordsu')

//join waitlist
document.getElementById('submitSignup').addEventListener('click', function(e){
    e.preventDefault();
    //if(validate_password(passwordsu.value) & validate_field(first_namesu.value) & validate_field(last_namesu.value)){
        //signup
        email=first_namesu.value.toLowerCase()+"@spiceeauth.co"
        auth.createUserWithEmailAndPassword(email, passwordsu.value)
            .then(function(){
                var user=auth.currentUser


                //add to detabase
                var database_ref = database.ref()

                //create user data
                var user_data={
                    first_name : document.getElementById('first_namesu').value,
                    email : document.getElementById('first_namesu').value+"@spiceeauth.co",
                    last_name : document.getElementById('last_namesu').value,
                    full_name : document.getElementById('first_namesu').value+" "+document.getElementById('last_namesu').value,
                    waitlist : true,
                    admin:false
                }

                database_ref.child('users/'+user.uid).set(user_data)




                alert('You are on the waitlist! \n Your account will be manually reviewed before you can use it.')
            })
            .catch(function(error){
                var error_code = error.code;
                var error_message = error.message;

                alert(error_message+'\n (Error Code: '+error_code+")")
            })









  //  }else{
 //       alert("Some errors were found in your information. \n   *Password must be at least 6 characters.\n   *None of the fields can be blank.")
   // }
})

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        setTimeout(() => {
            window.location.href='../dashboard'
        }, 3000);
        
    } else {
        //NOT signed in
    }
  });

//login
document.getElementById('submitLogin').addEventListener('click', function(e){
    e.preventDefault();
    var username = document.getElementById('emailli').value+"@spiceeauth.co";
var passli = document.getElementById('passwordli').value;
auth.signInWithEmailAndPassword(username.toLowerCase(), passli)
    .then(function(){
        var user = firebase.User.currentUser
        window.location.href='../dashboard'
        
    })
    .catch(function(error){
        var error_code = error.code;
        var error_message = error.message;

        alert(error_message+'\n (Error Code: '+error_code+")")
    })
})



function validate_password(password){
    if(password.legnth>5){
        //pass is good
        return true;
    }else{
        //pass is too short
        return false;
    }
}

function validate_field(field){
    if(field.legnth>0){
        //pass is good
        return true;
    }else{
        //pass is too short
        return false;
    }
}
