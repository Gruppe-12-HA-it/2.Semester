//her definerer vi vores User class som skal bruges som en template hvor alle user data bliver indsat i
class User {
    constructor(firstName, lastName, email, phoneNumber, password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.password = password;
    }
}

//Denne function bruges til tjekke det inputtede data fra user'en for at sikre det ikke er noget der ville forvirre programmet
//hvis data'en opfylder kravene kører functionen createUser

function checkInputs() {

    $.ajax({
        url: "http://localhost:4000/Users",
        async: false,
        type: 'GET',
        dataType: 'json', // added data type
        success: function(res) {
            //console.log(res);
            window.existingUser2 = res;
        }
    });

    var foundUser2 = existingUser2.find(function (user) {
        return user.email === document.getElementById("email").value
    });
        existingUser2 = !!foundUser2;


    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let email = document.getElementById("email").value;
    let phoneNumber = document.getElementById("phoneNumber").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirm_password").value;

    var passed = "true";

    if (existingUser2 === true){
        passed = "false";
        alert("That email is already registered to an account")
    }

    if (firstName.length < 1) {
        passed = "false";
        alert("You must provide a valid first name");
    }
    if (lastName.length < 1) {
        passed = "false";
        alert("You must provide a valid last name");
    }
    if (email.length < 1) {
        passed = "false";
        alert("You must provide a valid email");
    }
    if (isNaN(phoneNumber) && phoneNumber.length > 12){
        passed = "false";
        alert("You must provide a valid phone number");
    }
    if (password.length < 1) {
        passed = "false";
        alert("You must provide a valid password");
    }
    if (password != confirmPassword) {
        passed = "false";
        alert("Passwords do not match");
    }

    if (passed === "true") {
            createUser();

}
    else {
        return false;
    }

}



//Den function create en user fra det indtastede data og smider den i vores array som så bliver smidt i localstorage

document.getElementById("signUp").addEventListener("click", checkInputs);

function createUser() {
   //event.preventDefault();

    let htmlLogin = new User(
        document.getElementById("firstName").value,
        document.getElementById("lastName").value,
        document.getElementById("email").value,
        document.getElementById("phoneNumber").value,
        document.getElementById("password").value
    );

    $.ajax({
        url: "http://localhost:4000/Users",
        type: 'POST',
        data: JSON.stringify(htmlLogin),
        dataType: 'json',
        contentType: "application/json", // added data type
        success: function(res2) {
            console.log(res2);
        }
    });
    location.href = "../Login.html";
    alert(
        "Thank you for creating a user! We will now redirect you to our homepage!"
    );
    location.href = "../Login.html";
}
