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

function journal(event) {
    event.preventDefault();

    const form = document.getElementById("journal");
    let entry = document.getElementById("input").value;
    let stat = form["stat"].value;

    fetch("/journal", {
        method: "POST",
        body: JSON.stringify({
            "entry": entry,
            "status": stat,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}
