const blob = document.getElementById("blob");
const jupiter = document.getElementById("jupiter");
const secondSection = document.getElementById("second-section");
const thirdSection = document.getElementById("third-section");

const gotoTags = document.querySelectorAll(".goto-tag");
const apodImage = document.getElementById("apodImage");
const apodTitle = document.getElementById("apodTitle");
const apodImageLink = document.getElementById("apodImageLink");
const apodExplanation = document.getElementById("apodExplanation");

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
};

getAPOD();

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
