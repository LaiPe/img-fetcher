console.log("aaa");

const form = document.querySelector("#input-container");
const urlInput = document.querySelector("#url");
const feedbackText = document.querySelector("#feedback");
const imgContainer = document.querySelector("#img-container");

urlInput.addEventListener("change", () => {
  feedbackText.style.color = "black";
  feedbackText.textContent = "";
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!urlInput.value.match(/^https?:\/\//)) {
    feedbackText.style.color = "red";
    feedbackText.textContent = "Veuillez entrer une URL valide";
    return;
  }
  const url = encodeURIComponent(urlInput.value);

  const proxyUrl = encodeURIComponent(`./curl.php?url=${url}`);
  const imgPromise = fetch(proxyUrl);

  imgPromise
    .then(() => {
      const contentType = response.headers.get("Content-Type");

      if (contentType && contentType.startsWith("image/")) {
        return response.blob();
      } else {
        feedbackText.style.color = "red";
        feedbackText.textContent = "Cet URL ne pointe pas vers une image.";
      }
    })
    .then((imageBlob) => {
      const imageUrl = URL.createObjectURL(imageBlob);
      imgContainer.innerHTML = `<img src="${imageUrl}" />`;
    })
    .catch((error) => {
      console.log(error);
      feedbackText.style.color = "red";
      feedbackText.textContent =
        "Un problème à eu lieu lors de l'accès à cet URL. Veuillez vérifier que la ressource existe.";
    });
});
