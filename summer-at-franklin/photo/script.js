/* globals DISCORD_MODE */
/* globals NUM_OF_PHOTOS */
/* globals GOOGLE_SHEETS_MODE */
/* globals SHEET_ID */
/* globals SHEET_NAME */


const urlParams = new URLSearchParams(window.location.search);

var photoIndex = parseInt(urlParams.get("id"));
console.log("hiii", photoIndex);
var globalText = null;

var globalSheet = [];

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
} else if (GOOGLE_SHEETS_MODE) {
  var url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&range=${SHEET_NAME}!A:A`;

  fetch(url)
    .then((response) => response.text())
    .then((text) => JSON.parse(text.substring(47).slice(0, -2)))
    .then((data) => {
      console.log(data);

      data.table.rows.forEach((item, idx) => {
        let content = item.c[0].v;
        globalSheet.push(content);
      });

      document.getElementById(
        "image"
      ).innerHTML = `<img src="${globalSheet[photoIndex]}">`;
    });
} else {
  document.getElementById(
    "image"
  ).innerHTML = `<img src="/CDN/${photoIndex}.png">`;
}

function trueMod(x, n) {
  return ((x % n) + n) % n;
}

$(document).keydown(function(e) {
    console.log(e.keyCode);
  if (e.keyCode === 37) {
    // left arrow
    progressImage(-1)
  } else if (e.keyCode === 39) {
    progressImage(1)
  }
});

function progressImage(delta) {
  photoIndex = GOOGLE_SHEETS_MODE
    ? trueMod(photoIndex + delta, globalSheet.length)
    : trueMod(photoIndex + delta, NUM_OF_PHOTOS);
  window.history.replaceState(undefined, undefined, `/photo?id=${photoIndex}`);
  updateImageHTML(globalText, photoIndex);
}

$("body").on("swipeleft", function () {
  progressImage(1)
});

console.log(trueMod(photoIndex + 1, NUM_OF_PHOTOS));

$("body").on("swiperight", function () {
  progressImage(-1)
});


function updateImageHTML(textVar, photoIndex) {
  if (DISCORD_MODE) {
    document.getElementById("image").innerHTML = `<img src="${
      textVar.split("\n")[photoIndex]
    }">`;
  } else if (GOOGLE_SHEETS_MODE) {
    document.getElementById(
      "image"
    ).innerHTML = `<img src="${globalSheet[photoIndex]}">`;
  } else {
    document.getElementById(
      "image"
    ).innerHTML = `<img src="/CDN/${photoIndex}.png">`;
  }
}
