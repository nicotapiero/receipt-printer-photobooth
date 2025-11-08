/* globals DISCORD_MODE */
/* globals NUM_OF_PHOTOS */
/* globals GOOGLE_SHEETS_MODE */
/* globals SHEET_ID */
/* globals SHEET_NAME */


var photoIndex = undefined;
console.log("hiii", photoIndex);
var globalText = null;

var globalSheet = [];

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function updateGoogleSheetsImage() {
  photoIndex = getRandomInt(globalSheet.length)
  document.getElementById(
        "image"
      ).innerHTML = `<img src="${globalSheet[photoIndex]}">`;
}

function updateCDNImage() {
  photoIndex = getRandomInt(NUM_OF_PHOTOS)
  document.getElementById(
        "image"
      ).innerHTML = `<img src="CDN/${photoIndex}.png">`;
}

if (DISCORD_MODE) {
  // TODO
  
  // fetch("links.txt")
  //   .then((res) => res.text())
  //   .then((text) => {
  //     globalText = text;
  //     document.getElementById("image").innerHTML = `<img src="${
  //       text.split("\n")[photoIndex]
  //     }">`;
  //   })
  //   .catch((e) => console.error(e));
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
    
      console.log(globalSheet, photoIndex)
      
    
      setInterval(updateGoogleSheetsImage, 200)

  });
      
  
      
} else {
  setInterval(updateCDNImage, 200)
}