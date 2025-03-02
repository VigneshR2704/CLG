import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { 
    getFirestore, 
    setDoc, 
    doc 
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// ✅ Initialize Supabase
const SUPABASE_URL = "https://iywbymftznbmiecqvgce.supabase.co"; 
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5d2J5bWZ0em5ibWllY3F2Z2NlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA4OTkyNzksImV4cCI6MjA1NjQ3NTI3OX0.xv4ugc8uSe8gI2fnryCU3hRi-rfKkmeewF3vD2bdiGQ";
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ✅ Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDXVq14Z5dMumWhwo0V_Y-TOwEaa3ZTviU",
    authDomain: "cllg-622d4.firebaseapp.com",
    projectId: "cllg-622d4",
    storageBucket: "cllg-622d4.firebasestorage.app",
    messagingSenderId: "695814716804",
    appId: "1:695814716804:web:2d683df5cebdc5774231d1",
    measurementId: "G-Y1ZXF709H4",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); //  Fixed Firestore Initialization

//  Upload File Function
export async function uploadFile() {
    alert("Upload button clicked");

    const loggedInUserId = localStorage.getItem('loggedInUserId');
    if (!loggedInUserId) {
        alert("User not logged in.");
        return;
    }

    const fileInput = document.getElementById('fileInput');
    if (!fileInput || fileInput.files.length === 0) {
        alert("Please select a file.");
        return;
    }

    const file = fileInput.files[0];
    const filePath = `${file.name}`;

    //  Upload file to Supabase Storage
    let { data, error } = await supabaseClient.storage
        .from('CLG')
        .upload(filePath, file, { upsert: true });

    if (error) {
        console.error("Upload failed:", error.message);
        alert("Upload failed!");
        return;
    }

    console.log("File uploaded:", data);

    // Fetch Public URL for the uploaded file
    const { data: urlData } = await supabaseClient.storage
        .from('CLG')
        .getPublicUrl(filePath);

    const piclink = urlData.publicUrl;
    console.log("Public URL:", piclink);

    //  Get User Data from Inputs
    const fname = document.getElementById("name")?.value || "";
    const contact = document.getElementById("contact")?.value || "";
    const USN = document.getElementById("usn")?.value || "";
    const emailid = document.getElementById("gmail")?.value || "";
    const linkedin = document.getElementById("linkedin")?.value || "";
    const gitpro = document.getElementById("github")?.value || "";

    //  Create User Data Object
    const userData = {
        piclink,
        fname,
        contact,
        USN,
        emailid,
        linkedin,
        gitpro
    };

    // ✅ Save Data to Firestore
    try {
        const docRef = doc(db, "users", loggedInUserId);
        await setDoc(docRef, userData);
        alert("User data saved successfully!");
        window.location.href = "index.html";
    } catch (error) {
        console.error("Error writing document:", error);
    }
}

// ✅ Attach Event Listener for Upload Button
document.addEventListener("DOMContentLoaded", () => {
    const uploadButton = document.getElementById("uploadBtn");
    if (uploadButton) {
        uploadButton.addEventListener("click", uploadFile);
    }
});


// Get and display a file URL
// async function getFileUrl_upload() {
//     const fileName = "uploads/your-file.jpg"; // Change this to your uploaded file's path
//     const { data, error } = await supabase.storage
//         .from('my-bucket')
//         .getPublicUrl(fileName);

        

//     if (error) {
//         console.error("Error fetching file URL:", error.message);
//     } else {
//         document.getElementById('uploadedImage').src = data.publicUrl;
//         document.getElementById('uploadedImage').style.display = "block";
//         console.log("File URL:", data.publicUrl);
//     }
// }

