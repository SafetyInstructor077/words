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

