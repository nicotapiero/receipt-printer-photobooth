/* globals DISCORD_MODE */
/* globals NUM_OF_PHOTOS */
/* globals GOOGLE_SHEETS_MODE */
/* globals SHEET_ID */
/* globals SHEET_NAME */

if (DISCORD_MODE) {
  fetch("links.txt")
    .then((res) => res.text())
    .then((text) => {
      renderDiscordPhotos(text);
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
        console.log(content, idx);

        document.getElementById(`column${(idx % 4) + 1}`).innerHTML +=
          renderDiscordPhoto(content, idx);
      });
    });
} else {
  for (let i = 0; i < NUM_OF_PHOTOS; i++) {
    document.getElementById(`column${(i % 4) + 1}`).innerHTML +=
      renderCDNPhoto(i);
  }
}

/// ---------

function renderDiscordPhotos(text) {
  console.log(text);
  let lines = text.split("\n");
  lines.forEach((row, idx) => {
    if (row) {
      // idx%4 is to keep the titles aligned in each of the 3 columns displayed
      document.getElementById(`column${(idx % 4) + 1}`).innerHTML +=
        renderDiscordPhoto(row, idx);
    }
  });
}

function renderDiscordPhoto(link, idx) {
  var html = `<a href="/photo?id=${idx}"><img alt="image${
    idx + 1
  }" src="${link}"/></a>`;
  return html;
}

// -----------

function renderCDNPhotos(text) {
  console.log(text);
  let lines = text.split("\n");
  lines.forEach((row, idx) => {
    if (row) {
      // idx%4 is to keep the titles aligned in each of the 3 columns displayed
      document.getElementById(`column${(idx % 4) + 1}`).innerHTML +=
        renderCDNPhoto(row, idx);
    }
  });
}

function renderCDNPhoto(idx) {
  return `<a href="/photo?id=${idx}"><img alt="image${idx}" src="CDN/${idx}.png"/></a>`;
}
