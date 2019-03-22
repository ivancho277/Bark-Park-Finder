// Global Variables
let userProfilePic = "";
let db = firebase.firestore();
let auth = firebase.auth();
let storage = firebase.storage();


// Class declarations
class ParkCard {
    constructor(image, name, description, location, rating, reviews = []) {
        this.image = image;
        this.name = name;
        this.description = description;
        this.location = location;
        this.rating = rating;
        this.reviews = reviews;
        if (this.rating > 4.7) {
            this.rating = "assets/images/paws5.png"
        } else if (this.rating <= 4.7 && this.rating > 4.2) {
            this.rating = "assets/images/paws4-5.png"
        } else if (this.rating <= 4.2 && this.rating > 3.7) {
            this.rating = "assets/images/paws4.png"

        } else if (this.rating <= 3.7 && this.rating > 3.2) {
            this.rating = "assets/images/paws3-5.png"

        } else if (this.rating <= 3.2 && this.rating > 2.7) {
            this.rating = "assets/images/paws3.png"

        } else if (this.rating <= 2.7 && this.rating > 2.2) {
            this.rating = "assets/images/paws2-5.png"

        } else if (this.rating <= 2.2 && this.rating > 1.7) {
            this.rating = "assets/images/paws2.png"

        } else {
            this.rating = "assets/images/paws1.png"

        }
    }

    buildCard() {
        // Build Card
        let img = $('<img>').attr('src', this.image).addClass('card-image').attr('alt', this.name);
        let title = $('<h2>').addClass('card-title').text(this.name);
        let description = $('<p>').addClass('card-text').text(this.description)
        let reviews = $('<button>').addClass('card-reviews').attr('data-toggle', 'modal').attr('data-target', '#parkModal').text("Reviews")
        let rating = $('<img>').addClass('card-rating center').attr('src', this.rating)
        let check = $('<button>').addClass('card-checkin').text('Check In').attr('data-location', this.location)
        $(`#park-card`).empty()
        $(`#park-card`).append(img, title, description, reviews, rating, check)

        // Update modal
        $('#parkModalLabel').text(this.name)
        $('#modal-comments').empty()
        this.reviews.forEach(review => {
            review.buildReview()
        });
    }

    checkIn() {

    }
}

class Review {
    constructor(image, name, rating, review) {
        this.review = review;
        this.image = image;
        this.rating = rating;
        this.name = name;
        if (this.rating > 4.7) {
            this.rating = "assets/images/paws5.png"
        } else if (this.rating <= 4.7 && this.rating > 4.2) {
            this.rating = "assets/images/paws4-5.png"
        } else if (this.rating <= 4.2 && this.rating > 3.7) {
            this.rating = "assets/images/paws4.png"

        } else if (this.rating <= 3.7 && this.rating > 3.2) {
            this.rating = "assets/images/paws3-5.png"

        } else if (this.rating <= 3.2 && this.rating > 2.7) {
            this.rating = "assets/images/paws3.png"

        } else if (this.rating <= 2.7 && this.rating > 2.2) {
            this.rating = "assets/images/paws2-5.png"

        } else if (this.rating <= 2.2 && this.rating > 1.7) {
            this.rating = "assets/images/paws2.png"

        } else {
            this.rating = "assets/images/paws1.png"
        }
    }

    buildReview() {
        let review = $('<li>').addClass('media m-1')
        let image = $('<img>').attr('src', this.image).addClass('mr-3 review-image').attr('alt', this.name)
        let body = $('<div>').addClass('media-body')
        let text = $('<h5>').addClass('mt-0 mb-1').text(`${this.name}: `)
        text.append($('<img>').attr('src', this.rating).addClass('paw-rating'))
        let description = $('<p>').text(this.review)
        body.append(text, description)
        $('#modal-comments').append(review.append(image, body))
    }
}

class userCard {

    //constructor takes in a username, email, picture, bio, dog, and location
    constructor(username, contact, picture, bio, dog, uid) {
        this.username = username;
        this.contact = contact;
        this.picture = picture;
        this.bio = bio;
        this.dog = dog;
        this.uid = uid;
        this.buildTile("#buttonDiv", "#myModal");
        this.modalUserCard()
    }

    //buildTile takes in a parent ID that is a div where the cards are going to be placed
    //it also takes in a div to place modals with the information of the user
    buildTile(parentID, modalID) {
        let button = $("<button>")
            .attr("id", this.uid);
        let image = $("<img>")
            .addClass("user-image")
            .attr("src", this.picture);
        button.append(image);
        $(parentID).append(button);

        let modalContent = $("<div>")
            .addClass("modal-content mod-content");

        let modalHeader = $("<div>")
            .addClass("modal-header mod-header");
        let modalBody = $("<div>")
            .addClass("modal-body mod-body");
        let modalFooter = $("<div>")
            .addClass("modal-footer mod-footer");
        let span = $("<span>")
            .addClass("close")
            .html('&times;');

        let displayUser = $("<h2>")
            .text(this.username);
        let paraContact = $("<p>")
            .text("Email: " + this.contact);
        let paraDog = $("<p>")
            .text("Dog: " + this.dog);
        let paraBio = $("<p>")
            .text("My Bio: " + this.bio);
        let br = $("<br>");
        let profilePic = $("<img>")
            .attr("src", this.picture);

        modalHeader.append(span);
        modalHeader.append(displayUser);
        modalBody.append(paraContact);
        modalBody.append(br)
        modalBody.append(paraDog);
        modalBody.append(br)
        modalBody.append(paraBio);
        modalBody.append(br)
        modalBody.append(profilePic);
        modalContent.append(modalHeader);
        modalContent.append(modalBody);
        modalContent.append(modalFooter);
        $(modalID).append(modalContent);
    }

    modalUserCard() {
        var modal = document.getElementById('myModal');
        var btn = document.getElementById(this.uid);
        var span = document.getElementsByClassName("close")[0];

        btn.onclick = function () {
            modal.style.display = "block";
        }

        span.onclick = function () {
            modal.style.display = "none";
        }

        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }
}


// Functions
function signUp() {
    let email = $("#supemail")
    let username = $("#supusername")
    let password = $("#suppassword")
    let breed = $("#supdog")
    let bio = $("#supbio")

    let userEmail = email.val();
    let userPass = password.val();

    auth.createUserWithEmailAndPassword(userEmail, userPass)
        .catch(e => console.log(e.message));

    auth.onAuthStateChanged(user => {
        if (user) {
            let file = userProfilePic
            var storageRef = storage.ref("userProfiles/" + user.uid + "/" + file.name);

            storageRef.put(file).then(function () {
                storageRef.getDownloadURL().then((img) => {
                    let userEmail = user.email;
                    let uid = user.uid;
                    let userName = username.val();
                    let dogBreed = breed.val();
                    let userBio = bio.val();

                    db.collection("users").doc(uid).set({
                        email: userEmail,
                        uid: uid,
                        username: userName,
                        dog: dogBreed,
                        bio: userBio,
                        pic: img
                    })

                    $(".sign-modal-body")
                        .empty()
                        .append("<h1>Thank you for signing up!");
                    $("#btnsignup").attr('id', 'return').text("Return").attr("data-dismiss", "modal")
                    $("#btnlogout").removeClass("d-none")
                    $("#login-collapse").addClass("d-none")
                })
            })
        }
    })
}

function changeProfilePic(e) {
    userProfilePic = e.target.files[0];
}

function logOut() {
    auth.signOut()
    $("#btnlogout").addClass("d-none")
    $("#login-collapse").removeClass("d-none")
}

function logIn() {
    let userEmail = $("#LIemail").val();
    let userPass = $("#LIpassword").val();
    let promise = auth.signInWithEmailAndPassword(userEmail, userPass);
    promise.catch(e => console.log(e.message));
    auth.onAuthStateChanged(user => {
        if (user) {
            $("#btnlogout").removeClass("d-none")
            $("#login-collapse").addClass("d-none")
        }
    })
}

let collapseNav = () => {
    if ($(".nav-expand").attr("state") === "collapsed") {
        $(".nav-expand").animate({
            height: "100%"
        })
        $(".nav-expand").attr("state", "open")
        $(".nav-button").addClass("d-none")
    } else {
        $(".nav-expand").animate({
            height: "0"
        })
        $(".nav-expand").attr("state", "collapsed")
    }
}

function checkIn() {
    let user = firebase.auth().currentUser;

    if (user) {
        let userId = user.uid;
        let park = $(this).attr('data-location');
        let date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let checkInTime = hours + (minutes / 60)

        db.collection('checkIn').doc(userId).set({
            uid: userId,
            location: park,
            checkInTime: checkInTime,
        })

    } else {
        console.log("no user signed in")
    }
}

function updateCurrentPark() {
    // Clear the buttonDiv and myModal ids
    db.collection('parkUsers').get(function (querySnapshot) {
        querySnapshot.forEach((doc) => {
            let val = doc.data()
            // returns val.bio, val.dog, val.email, val.location, val.pic, val.uid, val.username
            let hours = date.getHours();
            let minutes = date.getMinutes();
            let currentTime = hours + (minutes / 60);
            if (currentTime - val.checkInTime > .75 || currentTime - val.checkInTime < 0) {
                db.collection('parkUsers').doc(doc.id).update({
                    location: "",
                    checkInTime: ""
                })
                val.location = ""
            }
            if (val.location === $('#check-in').attr('data-location')) {
                let user = new userCard(val.username, val.email, val.pic, val.bio, val.dog, val.uid)
            }
        })

    })
}


// Document Listeners
$(document).ready(() => {
    $("#supprofilepic").on("change", changeProfilePic)

    $(document).on('click', '#btnlogout', logOut)

    $(document).on('click', '#btnsignup', signUp)

    $(document).on('click', '#btnlogin', logIn)

    $(document).on('click', '#login-collapse', collapseNav)

    $(document).on('click', '#check-in', checkIn)

    $(document).on('keyup', '#LIpassword', (event) => {
        if (event.key === "Enter" && $("#LIpassword") && $("#LIemail")) {
            $("#btnlogin").click()
        }
    })

    db.collection('parkUsers').onSnapshot(function (querySnapshot) {
        // Clear the buttonDiv and myModal ids
        querySnapshot.forEach((doc) => {
            let val = doc.data()
            // returns val.bio, val.dog, val.email, val.location, val.checkInTime val.pic, val.uid, val.username
            let hours = date.getHours();
            let minutes = date.getMinutes();
            let currentTime = hours + (minutes / 60)
            if (currentTime - val.checkInTime > .75 || currentTime - val.checkInTime < 0) {
                db.collection('parkUsers').doc(doc.id).update({
                    location: "",
                    checkInTime: ""
                })
                val.location = ""
            }
            if (val.location === $('#check-in').attr('data-location')) {
                let user = new userCard(val.username, val.email, val.pic, val.bio, val.dog, val.uid)
            }
        })

    })

    if (auth.currentUser) {
        $("#btnlogout").addClass("d-none")
        $("#login-collapse").removeClass("d-none")
    } else {
        $("#btnlogout").removeClass("d-none")
        $("#login-collapse").addClass("d-none")
    }
})