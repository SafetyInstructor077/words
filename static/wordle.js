function checkword(event) {
    event.preventDefault();

    const form = document.forms["wordle"]
    let l1 = form["l1"].value
    let l2 = form["l2"].value
    let l3 = form["l3"].value
    let l4 = form["l4"].value
    let l5 = form["l5"].value

    fetch("/insert", {
        method: "POST",
        body: JSON.stringify({
            "name": name,
            "username": username,
            "password": password
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
    setTimeout(function () {
        location.reload();
    }, 6000);
}