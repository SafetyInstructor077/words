document.getElementById("btn").addEventListener("click", function() {
    // Trouver la valeur de display (video)
    var video = document.getElementById("video");
    var currentDisplay = video.style.display;

    if (currentDisplay === "none") {
        // Si display == block alors cacher video, montrer image et changer le texte
        video.style.display = "block";
        document.getElementById("video2").style.display = "none";
        document.getElementById("text__swap").innerHTML = "Si vous voulez apprendre plus sur le JS :";
    } else {
        // Si non, faire l'inverse
        video.style.display = "none";
        document.getElementById("video2").style.display = "block";
        document.getElementById("text__swap").innerHTML = "Pour retourner au code commenter, veuillez appuyer ci-dessous : ";
    }
    });