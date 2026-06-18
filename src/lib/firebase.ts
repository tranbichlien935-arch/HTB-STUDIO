import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Bro vào https://console.firebase.google.com/
// Bấm Create Project -> Đặt tên (ví dụ HTB-Studio).
// Sau khi tạo xong, bấm vào icon Web (</>) để thêm app web.
// Copy cái đoạn `firebaseConfig` của họ và chép đè vào đây nha!

const firebaseConfig = {
    apiKey: "AIzaSyB7POHvaMB05Yr_5ksQHSmqkhU-kRif3XI",
    authDomain: "htb-studio.firebaseapp.com",
    projectId: "htb-studio",
    storageBucket: "htb-studio.firebasestorage.app",
    messagingSenderId: "750022422133",
    appId: "1:750022422133:web:1f3a083053b605c9e1d23c",
    measurementId: "G-3KMS04PBEW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore, Authentication, and Storage
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
