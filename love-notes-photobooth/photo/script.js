/* globals DISCORD_MODE */
/* globals NUM_OF_PHOTOS */

const urlParams = new URLSearchParams(window.location.search);



var photoIndex = parseInt(urlParams.get("id"));
console.log("hiii", photoIndex);
var globalText = null;

if (DISCORD_MODE) {
  fetch("links.txt")
    .then((res) => res.text())
    .then((text) => {
      globalText = text;
      document.getElementById("image").innerHTML = `<img src="${
        text.split("\n")[photoIndex]
      }">`;
    })
    .catch((e) => console.error(e));
} else {
  document.getElementById(
    "image"
  ).innerHTML = `<img src="/CDN/${photoIndex}.png">`;
}

function trueMod(x, n) {
  return ((x % n) + n) % n;
}

$("body").on("swipeleft", function () {
  photoIndex = trueMod(photoIndex + 1, NUM_OF_PHOTOS);
  window.history.replaceState(undefined, undefined, `/photo?id=${photoIndex}`);
  updateImageHTML(globalText, photoIndex);
});

console.log(trueMod(photoIndex + 1, NUM_OF_PHOTOS));

$("body").on("swiperight", function () {
  photoIndex = trueMod(photoIndex - 1, NUM_OF_PHOTOS);
  window.history.replaceState(undefined, undefined, `/photo?id=${photoIndex}`);
  updateImageHTML(globalText, photoIndex);
});

function updateImageHTML(textVar, photoIndex) {
  if (DISCORD_MODE) {
    document.getElementById("image").innerHTML = `<img src="${
      textVar.split("\n")[photoIndex]
    }">`;
  } else {
    document.getElementById(
      "image"
    ).innerHTML = `<img src="/CDN/${photoIndex}.png">`;
  }
}
