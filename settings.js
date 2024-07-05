// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.0/firebase-app.js";
import { getAuth, reauthenticateWithCredential, updatePassword, EmailAuthProvider } from "https://www.gstatic.com/firebasejs/9.8.0/firebase-auth.js";
import { getDatabase, ref, update } from "https://www.gstatic.com/firebasejs/9.8.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCsEqGxxYPwhke45DcexAnO-rxxUu8G3gM",
    authDomain: "win-officials-login.firebaseapp.com",
    projectId: "win-officials-login",
    storageBucket: "win-officials-login.appspot.com",
    messagingSenderId: "771961855913",
    appId: "1:771961855913:web:35c89a8fe4228f165aeeb8"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

document.addEventListener('DOMContentLoaded', () => {
  const changePasswordForm = document.getElementById('changePasswordForm');

  changePasswordForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Basic validation
    if (newPassword !== confirmPassword) {
      alert('New password and confirm password do not match.');
      return;
    }

    try {
      // Reauthenticate user
      const user = auth.currentUser;
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);

      // Update password
      await updatePassword(user, newPassword);
      
      // Optionally update the password in the Realtime Database if needed (not recommended)
      // Assuming user data is stored under a "users" node with userId as the key
      const userRef = ref(database, 'users/' + user.uid);
      await update(userRef, { password: newPassword }); // Be cautious with this

      alert('Password changed successfully.');
    } catch (error) {
      console.error('Error changing password:', error);
      alert('Failed to change password. Please try again.');
    }
  });
});
