// Initialize Firebase with your Firebase configuration
// Replace with your actual Firebase configuration
firebase.initializeApp(firebaseConfig);

// Firebase Authentication
const auth1 = firebase.auth();

// Elements
const signOutButton1 = document.getElementById('sign-out');
const mainContent = document.querySelector('main');

// Event listener for Sign Out button
signOutButton.addEventListener('click', () => {
    auth.signOut();
});

// Listen for authentication state changes
auth.onAuthStateChanged((user) => {
    if (user) {
        // User is authenticated, show the admin dashboard
        showAdminDashboard();
    } else {
        // User is not authenticated, show the login form or redirect to login page
        showLoginForm();
    }
});

// Function to show the admin dashboard
function showAdminDashboard() {
    // Load and display the admin dashboard content here
    mainContent.innerHTML = '<h2>Welcome to the Admin Dashboard</h2>';
    // Include code for CRUD operations, class details, student details, etc.
}

// Function to show the login form
function showLoginForm() {
    // Implement your login form here
    mainContent.innerHTML = '<h2>Please sign in to access the admin portal</h2>';
    // Include the login form HTML and logic for user authentication
}
// Initialize Firebase with your Firebase configuration
// Replace with your actual Firebase configuration
firebase.initializeApp(firebaseConfig);

// Firebase Authentication
const auth = firebase.auth();
const db = firebase.firestore();

// Elements
const signOutButton = document.getElementById('sign-out');
const classDetailsForm = document.getElementById('class-details-form');
const classDetailsTable = document.getElementById('class-details-table').getElementsByTagName('tbody')[0];

// Event listener for Sign Out button
signOutButton.addEventListener('click', () => {
    auth.signOut();
});

// Function to add a class detail
function addClassDetailToDatabase(classTimings, schedule, teacherName, sectionName, courseName, batchNumber) {
    db.collection('classDetails').add({
        classTimings,
        schedule,
        teacherName,
        sectionName,
        courseName,
        batchNumber
    })
    .then(function (docRef) {
        console.log("Class detail added with ID: ", docRef.id);
    })
    .catch(function (error) {
        console.error("Error adding class detail: ", error);
    });
}

// Function to delete a class detail by ID
function deleteClassDetailFromDatabase(id) {
    db.collection('classDetails').doc(id).delete()
    .then(function () {
        console.log("Class detail deleted with ID: ", id);
    })
    .catch(function (error) {
        console.error("Error deleting class detail: ", error);
    });
}

// Function to render class details in the table
function renderClassDetailsInTable() {
    classDetailsTable.innerHTML = '';

    db.collection('classDetails').get()
    .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            const data = doc.data();
            const row = classDetailsTable.insertRow();
            row.innerHTML = `
                <td>${data.classTimings}</td>
                <td>${data.schedule}</td>
                <td>${data.teacherName}</td>
                <td>${data.sectionName}</td>
                <td>${data.courseName}</td>
                <td>${data.batchNumber}</td>
                <td><button data-id="${doc.id}" class="delete-button">Delete</button></td>
            `;

            // Add event listener for delete button
            const deleteButton = row.querySelector('.delete-button');
            deleteButton.addEventListener('click', function () {
                const id = this.getAttribute('data-id');
                deleteClassDetailFromDatabase(id);
            });
        });
    })
    .catch(function (error) {
        console.error("Error fetching class details: ", error);
    });
}

// Event listener for class details form submission
classDetailsForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const classTimings = document.getElementById('class-timings').value;
    const schedule = document.getElementById('schedule').value;
    const teacherName = document.getElementById('teacher-name').value;
    const sectionName = document.getElementById('section-name').value;
    const courseName = document.getElementById('course-name').value;
    const batchNumber = document.getElementById('batch-number').value;

    addClassDetailToDatabase(classTimings, schedule, teacherName, sectionName, courseName, batchNumber);

    // Clear form fields
    classDetailsForm.reset();
});

// Listen for authentication state changes
auth.onAuthStateChanged((user) => {
    if (user) {
        // User is authenticated, show the admin dashboard
        showAdminDashboard();
    } else {
        // User is not authenticated, show the login form or redirect to the login page
        showLoginForm();
    }
});

// Function to show the admin dashboard
function showAdminDashboard() {
    // Load and display class details in the table
    renderClassDetailsInTable();
    // You can add more functionality or content here
}

// Function to show the login form
function showLoginForm() {
    // Implement your login form here
    mainContent.innerHTML = '<h2>Please sign in to access the admin portal</h2>';
    // Include the login form HTML and logic for user authentication
}
// Function to add a student detail
function addStudentDetailToDatabase(name, fatherName, rollNumber, contactNumber, cnicNumber, picture, courseName, assignedClass) {
    // Here, you would use Firebase to store student details, including the picture.
    // You can use Firebase Storage for storing images.
    // Implement this part based on your Firebase setup.
    // Example:
    // db.collection('studentDetails').add({
    //     name,
    //     fatherName,
    //     rollNumber,
    //     contactNumber,
    //     cnicNumber,
    //     courseName,
    //     assignedClass
    // })
    // .then(function (docRef) {
    //     console.log("Student detail added with ID: ", docRef.id);
    // })
    // .catch(function (error) {
    //     console.error("Error adding student detail: ", error);
    // });
}

// Function to delete a student detail by ID
function deleteStudentDetailFromDatabase(id) {
    // Implement this part to delete a student detail by ID from Firebase.
}

// Function to render student details in the table
function renderStudentDetailsInTable() {
    // Implement this part to fetch and display student details from Firebase.
}

// Event listener for student details form submission
studentDetailsForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const fatherName = document.getElementById('father-name').value;
    const rollNumber = document.getElementById('roll-number').value;
    const contactNumber = document.getElementById('contact-number').value;
    const cnicNumber = document.getElementById('cnic-number').value;
    const picture = document.getElementById('picture').files[0]; // Handle file upload
    const courseName = document.getElementById('course-name').value;
    const assignedClass = document.getElementById('assigned-class').value;

    addStudentDetailToDatabase(name, fatherName, rollNumber, contactNumber, cnicNumber, picture, courseName, assignedClass);

    // Clear form fields
    studentDetailsForm.reset();
});

// ...

// Other functions and event listeners for CRUD operations should be implemented here.
