
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
  import { getDatabase ,set,ref , update} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";
  import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBrtAQRnHlZ1LcNsJ0oY1UviaUdCk8AyMg",
    authDomain: "hackaton-b73e9.firebaseapp.com",
    databaseURL: "https://hackaton-b73e9-default-rtdb.firebaseio.com",
    projectId: "hackaton-b73e9",
    storageBucket: "hackaton-b73e9.appspot.com",
    messagingSenderId: "1056747407552",
    appId: "1:1056747407552:web:5e34578a297c87c50cc525",
    measurementId: "G-4BRZM5GJ5S"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  const auth = getAuth();
const signUp = document.getElementById('signUp');
  signUp && signUp.addEventListener('click',(e)=>{

    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirmPassword').value;
    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;

    set(ref(database, 'users/'+user.uid),{
      firstName:firstName,
      lastName:lastName,
      email:email,
      confirmPassword:confirmPassword
    })
    alert('User Created');
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    alert(errorMessage);
    // ..
  });

  });

  login && login.addEventListener('click',(e)=>{
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;

      const dt=new Date();
      update(ref(database, 'users/'+user.uid),{
        last_login:dt,
      })

      alert('User Logged In');
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      alert(errorMessage);
    });
  
  });















