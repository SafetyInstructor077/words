// function journal(event) {
//     event.preventDefault();

//     const form = document.forms["journal__right"]
//     let entry = form["journal__input"].value
//     let stat= form["stat"].value

//     fetch("/insert", {
//         method: "POST",
//         body: JSON.stringify({
//             "entry": entry,
//             "status": stat,
//         }),
//         headers: {
//             "Content-type": "application/json; charset=UTF-8"
//         }
//     })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then(data => {
//             console.log(data);
//         })
//         .catch(error => {
//             console.error('There was a problem with the fetch operation:', error);
//         });
//     setTimeout(function () {
//         location.reload();
//     }, 6000);
// }

function journal(event, user) {
    console.log('journal')
    // Prevent the default form submission
    event.preventDefault();

    // Get the form element
    const form = document.getElementById("journal");

    // Extract form data
    let entry = form.querySelector('input[name="[datetime]"]').value;
    console.log(entry)
    console.log(user)
    // let stat = form.querySelector('input[name="stat"]:checked').value;

    // Perform any validation if needed

    // Make the fetch request
    fetch("/journal", {
        method: "POST",
        body: JSON.stringify({
            "entry": entry,
            "user": user,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(response => {

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        location.reload()
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}
// .then(data => {
//     console.log(data);
//     // Optionally, you can perform any actions after successful submission
// })
