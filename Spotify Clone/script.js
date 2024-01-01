console.log("Let's Start");

function cursorFollower() {
  window.addEventListener("mousemove", (e) => {
    // console.log(e.clientX, e.clientY);
    document.querySelector(
      ".minicircle"
    ).style = `transform: translate(${e.clientX}px, ${e.clientY}px)`;
  });
}

cursorFollower();

// Change this value to start/stop the animation

function setAnimationState(shouldAnimate) {
  if (shouldAnimate) {
    document.documentElement.style.setProperty("--animation-state", "running");
  } else {
    document.documentElement.style.setProperty("--animation-state", "paused");
  }
}

function secondsToMinutesSeconds(seconds) {
  if (isNaN(seconds) || seconds < 0) {
    return "00:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
}

let currFolder;

const playMusic = async (track, songname) => {
  console.log(currFolder);
  currentSong.src = track;
  currentSong.play();
  console.log("play");

  const response2 = await fetch(`${currFolder}/info.json`);
  const data = await response2.json();
  const title = data.title;
  document.querySelector(
    ".detailsright"
  ).innerHTML = `<div class="detailsright">
    <div class="albumcover">
        <img class="img-config"
            src="${currFolder}/cover.jpeg"
            alt="" srcset="">
    </div>
    <div class="musicdisplay">
        <div class="volcontrols">
            <label class="slider">
                <input type="range" class="level">
                <svg class="volume" xmlns="http://www.w3.org/2000/svg" version="1.1"
                    xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0"
                    viewBox="0 0 24 24" style="enable-background:new 0 0 512 512" xml:space="preserve">
                    <g>
                        <path
                            d="M18.36 19.36a1 1 0 0 1-.705-1.71C19.167 16.148 20 14.142 20 12s-.833-4.148-2.345-5.65a1 1 0 1 1 1.41-1.419C20.958 6.812 22 9.322 22 12s-1.042 5.188-2.935 7.069a.997.997 0 0 1-.705.291z"
                            fill="currentColor" data-original="#000000"></path>
                        <path
                            d="M15.53 16.53a.999.999 0 0 1-.703-1.711C15.572 14.082 16 13.054 16 12s-.428-2.082-1.173-2.819a1 1 0 1 1 1.406-1.422A6 6 0 0 1 18 12a6 6 0 0 1-1.767 4.241.996.996 0 0 1-.703.289zM12 22a1 1 0 0 1-.707-.293L6.586 17H4c-1.103 0-2-.897-2-2V9c0-1.103.897-2 2-2h2.586l4.707-4.707A.998.998 0 0 1 13 3v18a1 1 0 0 1-1 1z"
                            fill="currentColor" data-original="#000000"></path>
                    </g>
                </svg>
            </label>
            <ul class="wave-menu">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>
        <div class="seekbar">
        <div class="circle">

        </div>
    </div>
    </div>
    <div class="musiccontroller">
        <div class="musicdetails">
            <h3>${songname}</h3>
            <p>${title}</p>
        </div>

        <div class="musicbuttons">
            <i class="ri-skip-back-line"></i>
            <i class="ri-pause-circle-line"></i>
            <i class="ri-skip-forward-line"></i>
            <i class="ri-heart-line"></i>
        </div>
    </div>
</div>`;

  // Select the range input
  const volumeSlider = document.querySelector(".level");

  console.log("Volume slider:", volumeSlider);

  if (volumeSlider) {
    // Add an input event listener to the range input
    volumeSlider.addEventListener("input", (e) => {
      // Update the volume of the song based on the input value
      // The input value is a string, so we convert it to a number by dividing by 100
      let volumeLevel = e.target.value / 100;
      currentSong.volume = volumeLevel;

      // Log the volume level
      console.log("Volume level:", volumeLevel);
    });
  } else {
    console.error('Element with class "level" not found');
  }




  function attachEventListener() {
    // Select the pause button
    const pauseButton = document.querySelector(".musicbuttons .ri-pause-circle-line");
    const playButton = document.querySelector(".musicbuttons .ri-play-circle-line");
    const nextButton = document.querySelector(".musicbuttons .ri-skip-forward-line");
    const prevButton = document.querySelector(".musicbuttons .ri-skip-back-line");
    if (nextButton) {
      // Add a click event listener to the next button
      nextButton.addEventListener("click", () => {
        // Code to play the next song
        if (currentSongIndex === songs.length - 1) {playMusic(songsplay[0], songs[0]);
          setAnimationState(true)
          currentSongIndex = 0;}
        else{
        currentSongIndex+=1
        playMusic(songsplay[currentSongIndex], songs[currentSongIndex]);
        setAnimationState(true)}
      });
    }
    if (prevButton) {
      // Add a click event listener to the previous button
      if(currentSongIndex === 0){
      prevButton.addEventListener("click", () => {
        // Code to play the previous song
        currentSongIndex=0
        playMusic(songsplay[0], songs[0]);
        setAnimationState(true)
        
      })}
      else{ 
        prevButton.addEventListener("click", () => {
        // Code to play the previous song
        currentSongIndex-=1
        playMusic(songsplay[0], songs[0]);
        setAnimationState(true)});
    }}
  
  
    if (pauseButton) {
      // Add a click event listener to the pause button
      pauseButton.addEventListener("click", () => {
        document.querySelector(
          ".musicbuttons"
        ).innerHTML = ` <i class="ri-skip-back-line"></i>
        <i class="ri-play-circle-line"></i>
        <i class="ri-skip-forward-line"></i>
        <i class="ri-heart-line"></i>`;
        currentSong.pause();
        setAnimationState(false)
        // Reattach event listener
        attachEventListener();
      });
    } 
    if (playButton) {
      // Add a click event listener to the play button
      playButton.addEventListener("click", () => {
        document.querySelector(
          ".musicbuttons"
        ).innerHTML = ` <i class="ri-skip-back-line"></i>
        <i class="ri-pause-circle-line"></i>
        <i class="ri-skip-forward-line"></i>
        <i class="ri-heart-line"></i>`;
        currentSong.play();
        setAnimationState(true)
        // Reattach event listener
        attachEventListener();
      });
    }
  }
    attachEventListener();
  };
  // Call the function to attach the event listener when the page loads
 

// play.src = "img/play.svg"

// document.querySelector(".songinfo").innerHTML = decodeURI(track)
// document.querySelector(".songtime").innerHTML = "00:00 / 00:00"
let currentSongIndex = null;

async function getSongs(folder) {
  currFolder = folder;
  let a = await fetch(folder);
  let response = await a.text();
  // console.log(response);
  let div = document.createElement("div");
  div.innerHTML = response;
  let as = div.getElementsByTagName("a");
  songs = [];
  songsplay = [];
  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith(".mp3")) {
      songs.push(
        element.href.split("/")[6].replaceAll("%20", " ").replace(".mp3", "")
      );
      songsplay.push(element.href);
    }
  }
  console.log(songs);
  console.log(songsplay);

  const response2 = await fetch(`${folder}/info.json`);
  const data = await response2.json();
  const title = data.title;

  let songqueue = document.querySelector(".detailsleft ");
  console.log(songqueue);
  songqueue.innerHTML = "";
  songqueue.innerHTML += " <h1>Album Details</h1>";
  for (const song of songs) {
    songqueue.innerHTML += `
        <div class="queue">
            <img class="img-config"
                src="${folder}/cover.jpeg"
                alt="" srcset="">
            <div class="queuedetails">
                <div>
                    <h3>${song}</h3>
                    <p>${title}</p>
                </div>
                <div class="queuemusicbuttons">
                    <i class="ri-play-circle-line"></i>
                    <i class="ri-heart-line"></i>
                </div>
            </div>
        </div>`;
  }

  var elements = document.querySelectorAll(".queue .ri-play-circle-line");
  //   let currentSongIndex = null;

  elements.forEach(function (element, i) {
    element.addEventListener("click", function () {
      if (currentSong && !currentSong.paused && currentSongIndex === i) {
        console.log("pause");
        currentSong.pause();
        setAnimationState(false);
      } else {
        if (currentSong && !currentSong.paused) {
          currentSong.pause();
          setAnimationState(false);
          document.querySelector(
            ".musicbuttons"
          ).innerHTML = `<i class="ri-skip-back-line"></i>
          <i class="ri-play-circle-line"></i>
          <i class="ri-skip-forward-line"></i>
          <i class="ri-heart-line"></i>`;
        }
        currentSongIndex = i;
        playMusic(songsplay[i], songs[i]);
        setAnimationState(true);
      }
    });
  });

  return songsplay; // console.log(songs);
}

let currentSong = new Audio();

async function getAlbum() {
  console.log("displaying albums");
  let a = await fetch(`songs`);
  let response = await a.text();
  console.log(response);
  let div = document.createElement("div");
  div.innerHTML = response;
  let As = div.getElementsByTagName("a");
  albums = [];
  for (let index = 0; index < As.length; index++) {
    const element = As[index];
    // if (element.href) {
    //     albums.push(element.href.split("/")[5]);
    // }
    let albumName = element.href.split("/")[5];
    if (albumName) {
      albums.push(albumName);
    }
  }
  console.log(albums);

  let albumdet = document.querySelector(".albums");

  for (const album of albums) {
    albumdet.innerHTML += `<div class="album">
        <img class="img-config"
            src="songs/${album}/cover.jpeg"
            alt="" srcset="">
        <h3>${album}</h3>
        <p></p>
    </div>
</div>`;
  }
document.querySelectorAll(".album").forEach((album) => {
  album.addEventListener("click", () => {
    const albumName = album.querySelector("h3").textContent;
    console.log(albumName);
    getSongs(`songs/${albumName}`).then(() => {
      playMusic(songsplay[0], songs[0]);
      setAnimationState(true);
    });
  });
});
}

function main() {
  const songtime = document.querySelector(".seekbar");
  if (songtime) {
    currentSong.addEventListener("timeupdate", () => {
      songtime.innerHTML = `${secondsToMinutesSeconds(
        currentSong.currentTime
      )} / ${secondsToMinutesSeconds(currentSong.duration)}`;
      document.querySelector(".circle").style.left =
        (currentSong.currentTime / currentSong.duration) * 100 + "%";
      const seekbar = document.querySelector(".seekbar");
      const circle = document.querySelector(".circle");

      seekbar.addEventListener("click", (e) => {
        // Calculate the percentage of the seekbar that was clicked
        let percent = e.offsetX / seekbar.offsetWidth;

        // Set the circle's position
        circle.style.left = percent * 100 + "%";

        // Set the current time of the song to the clicked position
        currentSong.currentTime = percent * currentSong.duration;
      });
    });
    
  }
  currentSong.addEventListener('ended', function() {
    if (currentSongIndex === songs.length - 1) {
      playMusic(songsplay[0], songs[0]);
      setAnimationState(true);
      currentSongIndex = 0;
    } else {
      currentSongIndex += 1;
      playMusic(songsplay[currentSongIndex], songs[currentSongIndex]);
      setAnimationState(true);
    }
  });
  // Select the volume icon  // Select the pause button

  getAlbum();
}

main();
