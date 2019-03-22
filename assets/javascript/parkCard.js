// class ParkCard {
//     constructor(image, name, description, location, rating, reviews = []) {
//         this.image = image;
//         this.name = name;
//         this.description = description;
//         this.location = location;
//         this.rating = rating;
//         this.reviews = reviews;

//     }

//     buildCard() {
//         // Build Card
//         let img = $('<img>').attr('src', this.image).addClass('card-image').attr('alt', this.name);
//         let title = $('<h2>').addClass('card-title').text(this.name);
//         let description = $('<p>').addClass('card-text').text(this.description)
//         let reviews = $('<button>').addClass('card-reviews').attr('data-toggle', 'modal').attr('data-target', '#parkModal').text("Reviews")
//         let rating = $('<div>').addClass('card-rating center').text(this.rating)
//         let check = $('<button>').addClass('card-checkin').text('Check In').attr('data-location', this.location)
//         $(`#park-card`).empty()
//         $(`#park-card`).append(img, title, description, reviews, rating, check)

//         // Update modal
//         $('#parkModalLabel').text(this.name)
//         $('#modal-comments').empty()
//         this.reviews.forEach(review => {
//             review.buildReview()
//         });
//     }

//     checkIn() {

//     }
// }

// class Review {
//     constructor(image, name, rating, review) {
//         this.review = review;
//         this.image = image;
//         this.rating = rating;
//         this.name = name;
//     }

//     buildReview() {
//         let review = $('<li>').addClass('media m-1')
//         let image = $('<img>').attr('src', this.image).addClass('mr-3 review-image').attr('alt', this.name)
//         let body = $('<div>').addClass('media-body')
//         let text = $('<h5>').addClass('mt-0 mb-1').text(`${this.name}: ${this.rating}`)
//         body = body.append(text)
//         body = body.text(this.review)
//         $('#modal-comments').append(review.append(image, body))
//     }
// }