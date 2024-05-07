window.friend = (event, uid, friende) => {
    event.preventDefault();
    // let friende = document.getElementById("uid");
    console.log(uid, friende);
    fetch("/friend", {
        method: "POST",
        body: JSON.stringify({
            "uid": uid,
            "friende": friende,
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
};