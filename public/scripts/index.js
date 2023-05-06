const blob = document.getElementById("blob");
const jupiter = document.getElementById("jupiter");
const secondSection = document.getElementById("second-section");
const thirdSection = document.getElementById("third-section");
const body = document.getElementsByTagName("body")[0];
const gotoTags = document.querySelectorAll(".goto-tag");
const apodImage = document.getElementById("apodImage");
const apodTitle = document.getElementById("apodTitle");
const apodImageLink = document.getElementById("apodImageLink");
const apodExplanation = document.getElementById("apodExplanation");
const apodDate = document.getElementById("apodDate");
const apodCredits = document.getElementById("apodCredits");
const loader = document.getElementById("loader");
const goToTop = document.getElementById("goToTop");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("after:animate-reveal");
      entry.target.classList.remove("after:w-full");
    }
  });
});
// document.onload(() => {
//   window.scrollTo({
//     top: 0,
//   });
// });
const revealingElements = document.querySelectorAll(".reveal");
revealingElements.forEach((element) => {
  observer.observe(element);
});
gotoTags.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const href = link.getAttribute("href");
    document.querySelector(href).scrollIntoView({
      behavior: "smooth",
    });
  });
});
window.onscroll = function () {
  scrollFunction();
};
function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    goToTop.style.display = "flex";
  } else {
    goToTop.style.display = "none";
  }
}

function topFunction() {
  if ("scrollTo" in window) {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  } else {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}

// document.body.onpointermove = (event) => {
//   const { clientX, clientY } = event;

//   blob.animate(
//     {
//       left: `${clientX}px`,
//       top: `${clientY + window.scrollY}px`,
//     },
//     { duration: 3000, fill: "forwards" }
//   );
// };

const getAPOD = async () => {
  const response = await fetch(
    "https://api.nasa.gov/planetary/apod?api_key=cPYp7upZ0mgZjxQlcrzM22XoZ436m1ELyhbPmhIE"
  );
  const data = await response.json();
  console.log(data);
  apodTitle.innerHTML = data.title;
  apodImage.src = data.url;
  apodImageLink.href = data.hdurl;
  apodExplanation.innerHTML = data.explanation;
  apodCredits.innerHTML = data.copyright
    ? "Image Credits: " + data.copyright
    : "";
  //parse the date to text
  const date = new Date(data.date);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const dateText = date.toLocaleDateString("en-US", options);
  apodDate.innerHTML = dateText;
};

getAPOD();

function truncateString(str, maxLength) {
  if (str.length <= maxLength) {
    return str;
  }

  let truncated = str.substring(0, maxLength - 3);
  let lastSpaceIndex = truncated.lastIndexOf(" ");

  if (lastSpaceIndex === -1) {
    return truncated + "...";
  } else {
    return truncated.substring(0, lastSpaceIndex) + "...";
  }
}

const getAPODArchive = async () => {
  // get the current date in format YYYY-MM-DD
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate() - 1;

  // get the start and end dates
  let endDay = day - 7;
  let endMonth = month;
  if (endDay <= 0) {
    endDay = 30 + endDay;
    endMonth--;
  }
  const startDay = day - 7;

  // fetch request to get the archive
  const response = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=cPYp7upZ0mgZjxQlcrzM22XoZ436m1ELyhbPmhIE&start_date=${year}-${endMonth}-${endDay}&end_date=${year}-${month}-${day}`
  );

  const data = await response.json();
  if (response.ok) {
    console.log(data);
    const apodArchive = document.getElementById("archiveContainer");
    var count = 1;
    data.reverse().forEach((apod) => {
      const linkToPost = document.createElement("a");
      const apodArchiveItem = document.createElement("div");
      linkToPost.classList.add(
        "apod-archive-item",
        "overflow-hidden",
        "hover:shadow-xl",
        "border",
        "h-80",
        "transition",
        "bg-customBlack",
        "group",
        "hover:bg-black",
        "hover:-mt-1",
        "transition-all",
        "duration-500"
      );
      linkToPost.setAttribute("data-aos", "fade-right");
      linkToPost.setAttribute("data-aos-delay", `${count * 100 + 50}`);
      linkToPost.setAttribute("data-aos-duration", "1000");
      linkToPost.setAttribute("data-aos-easing", "ease-in-out");
      linkToPost.setAttribute("data-aos-once", "true");
      count++;
      const date = new Date(apod.date);
      const options = { year: "numeric", month: "long", day: "numeric" };
      const dateText = date.toLocaleDateString("en-US", options);
      linkToPost.innerHTML = `
        <img src="${apod.url}" alt="${
        apod.title
      }" class="w-full h-1/2 object-cover" loading="lazy"/>
        <div class="p-3 h-1/2 font-Poppins overflow-hidden">
          <h3 class="text-customWhite">${dateText}</h3>
          <h2 class="text-lg font-bold text-customWhite">${apod.title}</h2>
          <p class="text-customWhite font-extralight text-sm text-ellipsis">${truncateString(
            apod.explanation,
            130
          )}</p>
        </div>
      `;
      apodArchiveItem.appendChild(linkToPost);
      const year = apod.date.substring(0, 4);
      const month = apod.date.substring(5, 7);
      const day = apod.date.substring(8, 10);
      const newDate = year - 2000 + month + day;
      linkToPost.href = `https://apod.nasa.gov/apod/ap${newDate}.html`;
      linkToPost.target = "_blank";
      apodArchive.appendChild(linkToPost);
    });
  } else {
    console.log(data);
  }
};

getAPODArchive();

const getRoverRecent = async () => {
  const response = await fetch(
    "https://mars-photos.herokuapp.com/api/v1/rovers/perseverance/latest_photos?api_key=WhspPXsnLxXRXHc5vDt6uLxoT3B6FcbGUf9yszdR"
  );
  if (response.ok) {
    const data = await response.json();
    const allData = data.latest_photos;
    const roverRecent = document.getElementById("perseveranceRecent");
    const firstEight = allData.slice(0, 8);
    var count = 0;
    firstEight.forEach((rover) => {
      const date = new Date(rover.earth_date);
      const options = { year: "numeric", month: "long", day: "numeric" };
      const dateText = date.toLocaleDateString("en-US", options);
      const roverRecentItemDiv = document.createElement("div");
      const roverRecentItem = document.createElement("a");
      roverRecentItem.classList.add(
        "rover-recent-item",
        "overflow-hidden",
        "hover:shadow-xl",
        "border",
        "h-80",
        "transition-all",
        "duration-500",
        "bg-customBlack",
        "hover:-mt-4",
        "hover:bg-black"
      );
      roverRecentItem.setAttribute("data-aos", "fade-right");
      roverRecentItem.setAttribute("data-aos-delay", `${count * 100 + 50}`);
      roverRecentItem.setAttribute("data-aos-duration", "1000");
      roverRecentItem.setAttribute("data-aos-easing", "ease-in-out");
      roverRecentItem.setAttribute("data-aos-once", "true");
      count++;
      roverRecentItem.innerHTML = `
        <img src="${rover.img_src}" alt="${rover.camera.full_name}" class="w-full h-2/3 object-cover" loading="lazy" />
        <div class="p-3 h-1/3 font-Poppins overflow-hidden">
          <h3 class="text-customWhite font-bold">${rover.camera.full_name}</h3>          
          <p class="text-customWhite font-base text-sm text-ellipsis">Sol: ${rover.sol}</p>
          <p class="text-customWhite font-base text-sm text-ellipsis"> ${dateText}</p>
        </div>
      `;
      roverRecentItemDiv.appendChild(roverRecentItem);
      roverRecentItem.href = `${rover.img_src}`;
      roverRecentItem.target = "_blank";
      roverRecent.appendChild(roverRecentItem);
      body.classList.remove("overflow-y-hidden");
      loader.style.opacity = "0";
      loader.style.zIndex = "-1";
    });
  }
};

getRoverRecent();

const showMenuBtn = document.getElementById("showMenu");
const hideMenuBtn = document.getElementById("hideMenu");
const navbar = document.getElementById("nav-bar-menu");
const navBarLinks = document.querySelectorAll(".navbar-links");
navBarLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navbar.classList.remove("top-0");
    navbar.classList.add("-top-[100vh]");
    body.classList.remove("overflow-y-hidden");
  });
});
showMenuBtn.addEventListener("click", () => {
  navbar.classList.remove("-top-[100vh]");
  navbar.classList.add("top-0");
  body.classList.add("overflow-y-hidden");
});
hideMenuBtn.addEventListener("click", () => {
  navbar.classList.remove("top-0");
  navbar.classList.add("-top-[100vh]");
  body.classList.remove("overflow-y-hidden");
});
// function moveScroller() {
//   var move = function () {
//     var st = window.pageYOffset || document.documentElement.scrollTop;
//     var ot = secondSection.offsetTop;
//     var s = secondSection;
//     if (st > ot) {
//       s.style.position = "fixed";
//       s.style.top = "0px";
//     } else {
//       if (st <= ot) {
//         s.style.position = "relative";
//         s.style.top = "";
//       }
//     }
//   };
//   window.addEventListener("scroll", move);
//   move();
// }

// moveScroller();
