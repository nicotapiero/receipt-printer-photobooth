const DISCORD_MODE = false;

const NUM_OF_PHOTOS = 89;

const GOOGLE_SHEETS_MODE = false
const SHEET_ID = '1K09wowPa5-59vTt8UpQsntgMzoM9sradjhFQ6HwlnDY';
const SHEET_NAME = 'Desbi'

//------

const WEBSITE_TITLE = "SUMMER AT FRANKIE'S"
const FAVICON_LINK = "https://cdn.glitch.global/8124f84b-9401-4a2c-a15d-b6b72ca91c14/hotdog.png"



document.title = WEBSITE_TITLE;

var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
link.type = 'image/png';
link.rel = 'shortcut icon';
link.href = FAVICON_LINK;
document.getElementsByTagName('head')[0].appendChild(link);

