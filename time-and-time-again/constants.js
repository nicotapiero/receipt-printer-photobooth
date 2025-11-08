const DISCORD_MODE = false;

const NUM_OF_PHOTOS = 104;

const GOOGLE_SHEETS_MODE = false
const SHEET_ID = '1K09wowPa5-59vTt8UpQsntgMzoM9sradjhFQ6HwlnDY';
const SHEET_NAME = 'Time and Time Again'

//------

const WEBSITE_TITLE = "TIME PARTY"
const FAVICON_LINK = "https://em-content.zobj.net/source/apple/114/mantelpiece-clock_1f570.png"



document.title = WEBSITE_TITLE;

var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
link.type = 'image/png';
link.rel = 'shortcut icon';
link.href = FAVICON_LINK;
document.getElementsByTagName('head')[0].appendChild(link);

document.getElementById("websiteTitleHeader").innerHTML = WEBSITE_TITLE



// ====== time and time again specific
let randIntForPast = Math.floor(Math.random() * 173);
document.getElementById("andTimeAgainATag").href = `https://time-party-photobooth.glitch.me/CDN/${randIntForPast}.png`
document.getElementById("andTimeAgainATag").href = "https://time-party-photobooth.glitch.me/"