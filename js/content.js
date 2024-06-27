let images = [
    "https://razu381.sirv.com/chrome%20extension/378537.jpg","https://razu381.sirv.com/chrome%20extension/551940.jpg","https://razu381.sirv.com/chrome%20extension/695763.jpg","https://razu381.sirv.com/chrome%20extension/137984.jpg","https://razu381.sirv.com/chrome%20extension/253312.jpg","https://razu381.sirv.com/chrome%20extension/417639.jpg","https://razu381.sirv.com/chrome%20extension/585606.jpg","https://razu381.sirv.com/chrome%20extension/634013.jpg","https://razu381.sirv.com/chrome%20extension/754303.jpg","https://razu381.sirv.com/chrome%20extension/833182.jpg"
];

let randomIndex = Math.floor(Math.random() * images.length);


let background = document.querySelector('html');
console.log(`${images[randomIndex]}`)
background.style.backgroundImage = `url(${images[randomIndex]})`;
background.style.backgroundSize = "cover";
background.style.backgroundPosition = "center center";
background.style.backgroundRepeat = "no-repeat";


//adding the overlay

const overlay = document.createElement('div');
overlay.classList.add('overlay');
overlay.style.position = 'absolute';
overlay.style.top = '0';
overlay.style.left = '0';
overlay.style.width = '100%';
overlay.style.height = '100%';
overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // Adjust opacity as needed
overlay.style.zIndex = 0;
overlay.style.filter = 'blur(10px)';


// Append the overlay to the html element
background.appendChild(overlay);

// Function to block the page
const blockPage = () => {
    document.body.innerHTML = '<h1>This page is blocked</h1>';
    document.body.style.backgroundColor = 'red';
  };
  
  // Function to inject CSS dynamically
  const injectCSS = (cssPath) => {
    const link = document.createElement("link");
    link.href = chrome.runtime.getURL(cssPath);
    link.type = "text/css";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  };
  
  // Get the current URL
  const currentURL = window.location.href;
  
  // Logic to allow or block the page
  chrome.runtime.sendMessage({ action: "getReferer" }, (response) => {
    if (response && response.referer && (response.referer.includes("mail.google.com") || response.referer.includes("clicks.aweber.com"))) {
      if (currentURL.includes('youtube.com')) {
       
        console.log('Access allowed to YouTube from an allowed referrer');
      } else if (currentURL.includes('facebook.com') || currentURL.includes('netflix.com')) {
        console.log('Blocking Facebook or Netflix');
        //blockPage();
      }
    } else {
      if (currentURL.includes('youtube.com')) {
        console.log('Injecting CSS to YouTube');
        injectCSS("css/style.css");
      } else if (currentURL.includes('facebook.com') || currentURL.includes('netflix.com')) {
        console.log('Blocking Facebook or Netflix');
        background.style.background = "radial-gradient(circle, #4F2D6B 0%, #131862 100%)";
        injectCSS("css/style.css");
        //blockPage();
      }
    }
  });
  
