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
gotoTags.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const href = link.getAttribute("href");
    document.querySelector(href).scrollIntoView({
      behavior: "smooth",
    });
  });
});

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
  const day = date.getDate();

  // get the start and end dates
  let endDay = day - 8;
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
    data.reverse().forEach((apod) => {
      const apodArchiveItem = document.createElement("div");
      apodArchiveItem.classList.add(
        "apod-archive-item",
        "overflow-hidden",
        "hover:shadow-xl",
        "border",
        "h-80",
        "transition",
        "bg-customBlack"
      );
      const date = new Date(apod.date);
      const options = { year: "numeric", month: "long", day: "numeric" };
      const dateText = date.toLocaleDateString("en-US", options);
      apodArchiveItem.innerHTML = `
        <img src="${apod.url}" alt="${
        apod.title
      }" class="w-full h-1/2 object-cover" />
        <div class="p-3 h-1/2 font-Poppins overflow-hidden">
          <h3 class="text-customWhite">${dateText}</h3>
          <h2 class="text-lg font-bold text-customWhite">${apod.title}</h2>
          <p class="text-customWhite font-extralight text-sm text-ellipsis">${truncateString(
            apod.explanation,
            130
          )}</p>
        </div>
      `;
      apodArchive.appendChild(apodArchiveItem);
      body.classList.remove("overflow-y-hidden");
      loader.style.opacity = "0";
      loader.style.zIndex = "-1";
    });
  } else {
    console.log(data);
  }
};

getAPODArchive();

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
