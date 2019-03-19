//class for the cards from users
class userCard {

    //constructor takes in a username, email, picture, bio, dog, and location
    constructor(username, contact, picture, bio, dog, location) {
        this.username = username;
        this.contact = contact;
        this.picture = picture;
        this.bio = bio;
        this.dog = dog;
        this.location = location;
    }

    //buildTile takes in a parent ID that is a div where the cards are going to be placed
    //it also takes in a div to place modals with the information of the user
    buildTile(parentID, modalID) {
        let button = $("<button>")
            .attr("id", this.username);
        let image = $("<img>")
            .addClass("user-image")
            .attr("src", this.picture);
        button.append(image);
        $(parentID).append(button);

        let modalContent = $("<div>")
            .addClass("modal-content");

        let modalHeader = $("<div>")
            .addClass("modal-header");
        let modalBody = $("<div>")
            .addClass("modal-body");
        let modalFooter = $("<div>")
            .addClass("modal-footer");
        let span = $("<span>")
            .addClass("close")
            .html('&times;');

        let displayUser = $("<h2>")
            .text(this.username);
        let para = $("<p>")
            .text(this.bio + this.dog + this.contact);
        let profilePic = $("<img>")
            .attr("src", this.picture);

        modalHeader.append(span);
        modalHeader.append(displayUser);
        modalBody.append(para);
        modalBody.append(profilePic);
        modalContent.append(modalHeader);
        modalContent.append(modalBody);
        modalContent.append(modalFooter);
        $(modalID).append(modalContent);
    }
}

//modalUserCard takes a user and adds info to their modal based on user information
function modalUserCard(user) {
    var modal = document.getElementById('myModal');
    var btn = document.getElementById(user.username);
    var span = document.getElementsByClassName("close")[0];

    btn.onclick = function () {
        modal.style.display = "block";
        console.log("work")
    }

    span.onclick = function () {
        modal.style.display = "none";
        console.log("work")
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            console.log("work")
        }
    }
}
