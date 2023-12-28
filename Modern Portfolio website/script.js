const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
  // multiplier: 0.5,
});

function firstPageAnimations() {
  var tl = gsap.timeline();

  tl.from(".navbar", {
    y: "-10",
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInOut,
  })
    .to(".innerclass", {
      y: 0,
      ease: Expo.easeInOut,
      duration: 2,
      delay: -1,
      stagger: 0.2,
    })
    .to(".smallheadings", {
      y: 0,
      ease: Expo.easeInOut,
      duration: 2,
      delay: -1.5,
      stagger: 0.2,
    })
    .from(".bottombar", {
      y: -10,
      opacity: 0,
      duration: 1.5,
      delay: -1.2,
      ease: Expo.easeInOut,
    });
}

function cursorFollower() {
  window.addEventListener("mousemove", (e) => {
    // console.log(e.clientX, e.clientY);
    document.querySelector(
      ".minicircle"
    ).style = `transform: translate(${e.clientX}px, ${e.clientY}px)`;
  });
}

document.querySelectorAll(".tile").forEach((e) => {
  var rotation = 0;
  var diff_rotation = 0;
  console.log(e); 

  e.addEventListener("mouseleave", (dets) => {  
    gsap.to(e.querySelector("img"), {
    opacity: 0,
    ease: Power3,
    duration: 0.5,
  }); });

  e.addEventListener("mousemove", (dets) => {
    var diff = dets.clientY - e.getBoundingClientRect().top;
    diff_rotation = dets.clientX - rotation;
    rotation = dets.clientX;
    gsap.to(e.querySelector("img"), {
      opacity: 1,
      ease: Power3,
      top: diff,
      left: dets.clientX,
      rotate: gsap.utils.clamp(-20, 20, diff_rotation * 0.5),
    });
  });
});

let downArrows = document.getElementsByClassName("ri-arrow-down-circle-fill");
for (let i = 0; i < downArrows.length; i++) {
  downArrows[i].addEventListener("click", () => {
    console.log("clicked");
    scroll.scrollTo('#dummy');
  });
}



cursorFollower();
firstPageAnimations();
