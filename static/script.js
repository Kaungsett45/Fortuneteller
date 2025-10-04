function capture() {
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataURL = canvas.toDataURL("image/jpeg");

    loadingDiv.style.display = "block";

    fetch("/capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: dataURL })
    })
    .then(res => res.json())
    .then(data => {
        loadingDiv.style.display = "none";

        if (data.status === "success") {
            // Store both palm image + AI reading
            localStorage.setItem("palmImage", data.image);
            localStorage.setItem("palmReading", data.reading);

            window.location.href = "/result";
        } else {
            alert(data.message);
        }
    })
    .catch(err => {
        loadingDiv.style.display = "none";
        alert("Error: " + err.message);
    });
}
