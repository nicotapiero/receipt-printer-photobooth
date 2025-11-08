const DISCORD_MODE = false;
const NUM_OF_PHOTOS = 173;

if (DISCORD_MODE) {
  fetch("links.txt")
    .then((res) => res.text())
    .then((text) => {
      renderDiscordPhotos(text);
    })
    .catch((e) => console.error(e));
} else {
  for (let i = 0; i < NUM_OF_PHOTOS; i++) {
    document.getElementById(`column${(i % 4) + 1}`).innerHTML += renderCDNPhoto(i);
  }
}

/// ---------

function renderDiscordPhotos(text) {
  console.log(text);
  let lines = text.split("\n")
  lines.forEach((row, idx) => {
    if (row) {
      // idx%4 is to keep the titles aligned in each of the 3 columns displayed
      document.getElementById(`column${(idx % 4) + 1}`).innerHTML +=
        renderDiscordPhoto(row, idx);
    }
  });
}

function renderDiscordPhoto(link, idx) {
  var html = `<a href="${link}"><img alt="image${idx + 1}" src="${link}"/></a>`;
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
    return `<a href="CDN/${idx}.png"><img alt="image${idx}" src="CDN/${idx}.png"/></a>`;
  }
