// alert('ciao');

let api = "https://striveschool-api.herokuapp.com/api/deezer/search?q={no}";
let artistUrl =
  "https://striveschool-api.herokuapp.com/api/deezer/search?q={jimi hendrix}";
let params = new URLSearchParams(document.location.search);
let id = params.get("id");
// let id = 475;
let artistName = params.get("artist");
console.log("ID from URL:", id);
console.log("artist from URL:", artistName);

//LOCAL STORAGE PER ALBUM SALVATI
let storedAlbums = localStorage.getItem("AlbumLiked");
console.log("Stored Albums:", storedAlbums);
let arrayHeartAlbum = storedAlbums !== null ? JSON.parse(storedAlbums) : [];
console.log("Parsed Array Albums:", arrayHeartAlbum);

//LOCAL STORAGE PER ARTISTI SALVATI
let storedArtist = localStorage.getItem("ArtistLiked");
console.log("Stored Artist:", storedArtist);
let arrayHeartArtist = storedArtist !== null ? JSON.parse(storedArtist) : [];
console.log("Parsed Array Artist:", arrayHeartArtist);

//SIDEBAR FETCH
fetch(api, {
  method: "GET",
})
  .then((response) => response.json())
  .then((data) => {
    // console.log(data);
    listsongs(data);
  })
  .catch((error) => {
    console.error("Errore nella richiesta:", error);
  });

//SIDEBAR SINISTRO SEARCH
let searchBtn = document.querySelectorAll(".searchElement");
searchBtn.forEach((x) => {
  x.addEventListener("click", function () {
    const input = document.querySelector("#searchBar");
    input.classList.toggle("hidden");
    input.focus();
  });
});

let btnSearch = document.querySelector("#btnSearch");
btnSearch.addEventListener("click", function () {
  let searchValue = document.querySelector("#searchValue").value;
  window.location = `./artistpage.html?artist=${searchValue}`;
  console.log(searchValue);
});

document
  .querySelector("#searchValue")
  .addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      let searchValue = document.querySelector("#searchValue").value;
      window.location = `./artistpage.html?artist=${searchValue}`;
      console.log(searchValue);
    }
  });

//LISTA ALBUM SALVATI
let btnAlbum = document.querySelector("#btnAlbum");
btnAlbum.addEventListener("click", function () {
  let div = document.querySelector(".listsongs");
  div.innerHTML = "";
  let divSearch = document.createElement("div");
  divSearch.classList.add(
    "d-flex",
    "justify-content-between",
    "align-items-center"
  );
  divSearch.innerHTML = `<i class="bi bi-search"></i>
    <div class="d-flex align-items-baseline">
      <p class="m-0 p-2">Recenti</p>
      <i class="bi bi-list-ul fs-4 mt-auto me-3"></i>
    </div>`;

  div.appendChild(divSearch);
  arrayHeartAlbum.forEach((element) => {
    fetch(
      `https://striveschool-api.herokuapp.com/api/deezer/album/${element}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        let div = document.querySelector(".listsongs");
        let a = document.createElement("a");
        a.href = `./album.html?id=${data.id}`;
        let p = document.createElement("p");
        p.innerText = data.title;
        div.appendChild(a);
        a.appendChild(p);
      })
      .catch((error) => {
        console.error("Errore nella richiesta:", error);
      });
  });
});

//LISTA ARTISTI SALVATI
let btnArtist = document.querySelector("#btnArtist");
btnArtist.addEventListener("click", function () {
  let div = document.querySelector(".listsongs");
  div.innerHTML = "";
  let divSearch = document.createElement("div");
  divSearch.classList.add(
    "d-flex",
    "justify-content-between",
    "align-items-center"
  );
  divSearch.innerHTML = `<i class="bi bi-search"></i>
    <div class="d-flex align-items-baseline">
      <p class="m-0 p-2">Recenti</p>
      <i class="bi bi-list-ul fs-4 mt-auto me-3"></i>
    </div>`;
  div.appendChild(divSearch);

  arrayHeartArtist.forEach((element) => {
    fetch(
      `https://striveschool-api.herokuapp.com/api/deezer/artist/${element}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        let div = document.querySelector(".listsongs");
        let a = document.createElement("a");
        a.href = `./artistpage.html?id=${data.id}`;
        let p = document.createElement("p");
        p.innerText = data.name;
        div.appendChild(a);
        a.appendChild(p);
      })
      .catch((error) => {
        console.error("Errore nella richiesta:", error);
      });
  });
});

//LISTA PLAYLIST AL CLICK
let btnPlaylist = document.querySelector("#btnPlaylist");
btnPlaylist.addEventListener("click", function () {
  let div = document.querySelector(".listsongs");
  div.innerHTML = "";
  let divSearch = document.createElement("div");
  divSearch.classList.add(
    "d-flex",
    "justify-content-between",
    "align-items-center"
  );
  divSearch.innerHTML = `<i class="bi bi-search"></i>
    <div class="d-flex align-items-baseline">
      <p class="m-0 p-2">Recenti</p>
      <i class="bi bi-list-ul fs-4 mt-auto me-3"></i>
    </div>`;

  div.appendChild(divSearch);

  fetch(api, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      listsongs(data);
    })
    .catch((error) => {
      console.error("Errore nella richiesta:", error);
    });
});

//LISTA PLAYLIST AL CARICAMENTO DELLA PAGINA
function listsongs(song) {
  console.log(song.data);
  song.data.forEach((element) => {
    let div = document.querySelectorAll(".listsongs");
    div.forEach((div) => {
      let a = document.createElement("a");
      a.addEventListener("click", function () {
        playAudio(element);
      });
      let p = document.createElement("p");
      p.innerText = element.title;
      div.appendChild(a);
      a.appendChild(p);
    });
  });
}

//SIDEBAR ATTIVITÀ AMICI
document.getElementById("toggleBtn").addEventListener("click", function () {
  const sidebar = document.getElementById("sidebar2");
  sidebar.classList.toggle("hidden");
});

document.getElementById("closeBtn").addEventListener("click", function () {
  const sidebar = document.getElementById("sidebar2");
  sidebar.classList.add("hidden");
});

document.addEventListener("DOMContentLoaded", () => {
  if (id == null) {
    fetchSearch(artistName);
  } else {
    fetchArtist(id);
  }
  let cardDiv = document.querySelector(".cardDiv");
  // console.log(cardDiv);
});

//BOTTONI AVANTI E INDIETRO
document.querySelector("#btnBack").addEventListener("click", function () {
  window.history.back();
});
document.querySelector("#btnForward").addEventListener("click", function () {
  window.history.forward();
});

//PLAYER AUDIO

const audioElement = new Audio();

function playAudio(data) {
  // Stop and hide the current audio
  stopAndHideCurrentAudio();

  document.getElementById("current_album").innerHTML = `
    <img src="${data.album.cover_medium}" class="mx-2" height="80px" alt="${data.title}" />
    <div class="flex-column">
      <h4 class="fw-bold text-white">${data.title}</h4>
      <p class="fw-bold text-white">${data.artist.name}</p>
    </div>
  `;

  // console.log("Playing audio:", data);

  const content = document.querySelector(".content");
  const playBtn = content.querySelector(".play-pause");
  const playBtnIcon = playBtn.querySelector("span");
  const progressBar = content.querySelector(".progress-bar");
  const progressDetails = content.querySelector(".progress-details");
  const repeatBtn = content.querySelector("#repeat");

  // Set the new audio source
  audioElement.src = data.preview;

  // Play the new audio
  playSong();

  playBtn.addEventListener("click", () => {
    const isMusicPaused = content.classList.contains("paused");
    if (isMusicPaused) {
      pauseSong();
    } else {
      playSong();
    }
  });

  function playSong() {
    content.classList.add("paused");
    playBtnIcon.innerHTML = "pause";
    audioElement.play();
  }

  function pauseSong() {
    content.classList.remove("paused");
    playBtnIcon.innerHTML = "play_arrow";
    audioElement.pause();
  }

  audioElement.addEventListener("timeupdate", (e) => {
    const initialTime = e.target.currentTime;
    const finalTime = e.target.duration;
    let BarWidth = (initialTime / finalTime) * 100;
    progressBar.style.width = BarWidth + "%";

    progressDetails.addEventListener("click", (e) => {
      let progressValue = progressDetails.clientWidth;
      let clickedOffsetX = e.offsetX;
      let MusicDuration = audioElement.duration;

      audioElement.currentTime =
        (clickedOffsetX / progressValue) * MusicDuration;
    });

    audioElement.addEventListener("loadeddata", () => {
      let finalTimeData = content.querySelector(".final");
      let AudioDuration = audioElement.duration;
      let finalMinutes = Math.floor(AudioDuration / 60);
      let finalSeconds = Math.floor(AudioDuration % 60);
      if (finalSeconds < 10) {
        finalSeconds = "0" + finalSeconds;
      }
      finalTimeData.innerText = finalMinutes + ":" + finalSeconds;
    });

    let currentTimeData = content.querySelector(".current");
    let CurrentTime = audioElement.currentTime;
    let currentMinutes = Math.floor(CurrentTime / 60);
    let currentSeconds = Math.floor(CurrentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    currentTimeData.innerText = currentMinutes + ":" + currentSeconds;
  });

  repeatBtn.addEventListener("click", () => {
    audioElement.currentTime = 0;
  });
}

// Funzione per fermare e nascondere l'audio corrente
function stopAndHideCurrentAudio() {
  audioElement.pause();
  audioElement.src = ""; // Imposta il sorgente vuoto
}

// function listsongs(song) {
//   console.log(song.data);
//   song.data.forEach((element) => {
//     let div = document.querySelector("#listsongs");
//     let a = document.createElement("a");
//     a.href = "#"; //element.link;
//     let p = document.createElement("p");
//     p.innerText = element.title;
//     div.appendChild(a);
//     a.appendChild(p);
//   });
// }

//fetch per la ricerca
function fetchSearch(name) {
  fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/search?q={${name}}`,
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      // console.log(data.data[0].artist.id);
      fetchArtist(data.data[0].artist.id);
    })
    .catch((error) => {
      document.querySelector("h1").innerText = "404";
      document.querySelector(
        "div.row p.offset-1"
      ).innerHTML = `${404} ascoltatori mesnsili`;
    });
}

//fetch tramite id
function fetchArtist(artistId) {
  fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}`,
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((data) => {
      // console.log(data.tracklist);
      fetchTracklist(data.tracklist);
      about(data);
      document.querySelector(
        ".artistHero"
      ).style.backgroundImage = `url(${data.picture_big})`;
      document.querySelector("h1").innerText = data.name;
      document.querySelector(
        "div.row p.offset-1"
      ).innerHTML = `${data.nb_fan} ascoltatori mensili`;
      document.querySelector(
        ".aboutText p"
      ).innerHTML = `${data.nb_fan} ascoltatori mensili`;

      document.title = data.name;

      document
        .querySelector("button#followperartisti")
        .addEventListener("click", () => {
          console.log(arrayHeartArtist);
          if (!arrayHeartArtist.includes(data.id)) {
            arrayHeartArtist.push(data.id);

            localStorage.setItem(
              "ArtistLiked",
              JSON.stringify(arrayHeartArtist)
            );
            console.log(data.id);
          } else {
            console.log("Artist already in the liked list");
            const indexToRemove = arrayHeartArtist.indexOf(data.id);

            if (indexToRemove !== -1) {
              arrayHeartArtist.splice(indexToRemove, 1);
              localStorage.setItem(
                "ArtistLiked",
                JSON.stringify(arrayHeartArtist)
              );
              console.log(`Removed artist id ${data.id} from liked list`);
            }
          }
        });
      // console.log(data);
    });
}

//fetch per tracklist
function fetchTracklist(trackList) {
  fetch(trackList, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((tracks) => {
      placeData(tracks);
    })
    .catch((error) => {
      console.error("Errore nella richiesta:", error);
    });
}

//SALVA ARTISTI
// let follow = document.querySelector(".followperartisti");
// console.log(follow);

//insersci i dati nella pagina
function placeData(tracks) {
  // console.log(tracks);
  //array degli album da filtrare
  let artistAlbums = [];
  for (let c = 0; c < tracks.data.length; c++) {
    artistAlbums.push(tracks.data[c].album);
    // console.log(tracks.data[c].album);
  }
  let filteredArr = filterDuplicateArrays(artistAlbums);
  for (let i = 0; i < 5; i++) {
    // console.log(i);
    //converte i secondi in minutaggio
    let time = tracks.data[i].duration;
    let minutes = Math.floor(time / 60);
    let seconds = time - minutes * 60;
    function str_pad_left(string, pad, length) {
      return (new Array(length + 1).join(pad) + string).slice(-length);
    }
    let finalTime =
      str_pad_left(minutes, "0", 2) + ":" + str_pad_left(seconds, "0", 2);

    // duration = duration.replace(".", ":");
    //canzoni piu sentite
    document.querySelector(
      "div.mx-1.text-light.lightBg div.row.m-auto div.col.m-auto"
    ).innerHTML += `
              <div class="row">
                <div class="col d-flex py-2 justify-content-center">
                  <div class="col-6 d-flex justify-content-between">
                    <div class="d-flex align-items-center">
                        <p class="pe-2 m-auto">${i + 1}</p>
                        <img src="${
                          tracks.data[i].album.cover
                        }" alt="songImg" srcset="" style="height:3em" class="pe-2">
                        <a href="#" class="m-auto text-decoration-none">${
                          tracks.data[i].title
                        }</a>
                    </div>
                  </div>
                  <div class="col-6 d-flex justify-content-around">
                    <p class=" m-auto">${tracks.data[i].rank}</p>
                    <p class=" m-auto">${finalTime}</p>
                  </div>
                </div>
              </div>
              `;
    let topSongs = document.querySelectorAll(
      "div.mx-1.text-light.lightBg div.row.m-auto div.col.m-auto a.m-auto.text-decoration-none"
    );
    // console.log(topSongs[0]);
    let count = 0;
    topSongs.forEach((element) => {
      // console.log(element);
      element.addEventListener("click", () => {
        // console.log("object");
        playAudio(tracks.data[count]);
        count++;
      });
    });
    // console.log(tracks.data[i]);
    let cutTitle = "";
    if (filteredArr[i].title.length > 20) {
      cutTitle = filteredArr[i].title.slice(0, 20) + "...";
    } else {
      cutTitle = filteredArr[i].title;
    }
    //album cards
    document.querySelector(".cardDiv").innerHTML += `
    <button class="card rounded bg-dark text-light" style="width: 20%;" id="${filteredArr[i].id}" onclick="GoTo(${filteredArr[i].id})">
      <img src="${filteredArr[i].cover}" class="card-img-top rounded" alt="...">
        <div class="card-body text-start">
          <p class="fs-6">${cutTitle}</p>
        </div>
   </button>
`;

    // aboutDiv.style.backgroundImage = `url(${})`
  }
  // let src = document.querySelectorAll('a');
  //   src.forEach((x) => {
  //     x.addEventListener('click', function(){
  //       playAudio(tracks.data[i]);
  //     })
  //   })
  // CI HO PROVATO
}
//set about background
function about(data) {
  // console.log(data);
  let aboutDiv = document.querySelector(".about");
  // console.log(aboutDiv);
  aboutDiv.style.backgroundImage = `url(${data.picture_big})`;
}
//filtra l'arrai di album per evitare i duplicati
function filterDuplicateArrays(arrayOfArrays) {
  return arrayOfArrays.filter((arr, index, self) => {
    return (
      index ===
      self.findIndex((otherArr) => {
        return JSON.stringify(arr) === JSON.stringify(otherArr);
      })
    );
  });
}
function GoTo(id) {
  let albumId = id;
  //per controllare
  // console.log("AlbumID:", albumId);
  const newUrl = `./album.html?id=${albumId}`;
  // console.log("New URL:", newUrl);
  window.location.href = newUrl;
}
function playAudio(data) {
  // Stop and hide the current audio
  stopAndHideCurrentAudio();

  document.getElementById("current_album").innerHTML = `
    <img src="${data.album.cover_medium}" class="mx-2" height="80px" alt="${data.title}" />
    <div class="flex-column">
      <h4 class="fw-bold text-white">${data.title}</h4>
      <p class="fw-bold text-white">${data.artist.name}</p>
    </div>
  `;

  // console.log("Playing audio:", data);

  const content = document.querySelector(".content");
  const playBtn = content.querySelector(".play-pause");
  const playBtnIcon = playBtn.querySelector("span");
  const progressBar = content.querySelector(".progress-bar");
  const progressDetails = content.querySelector(".progress-details");
  const repeatBtn = content.querySelector("#repeat");

  // Set the new audio source
  audioElement.src = data.preview;

  // Play the new audio
  playSong();

  playBtn.addEventListener("click", () => {
    const isMusicPaused = content.classList.contains("paused");
    if (isMusicPaused) {
      pauseSong();
    } else {
      playSong();
    }
  });

  function playSong() {
    content.classList.add("paused");
    playBtnIcon.innerHTML = "pause";
    audioElement.play();
  }

  function pauseSong() {
    content.classList.remove("paused");
    playBtnIcon.innerHTML = "play_arrow";
    audioElement.pause();
  }

  audioElement.addEventListener("timeupdate", (e) => {
    const initialTime = e.target.currentTime;
    const finalTime = e.target.duration;
    let BarWidth = (initialTime / finalTime) * 100;
    progressBar.style.width = BarWidth + "%";

    progressDetails.addEventListener("click", (e) => {
      let progressValue = progressDetails.clientWidth;
      let clickedOffsetX = e.offsetX;
      let MusicDuration = audioElement.duration;

      audioElement.currentTime =
        (clickedOffsetX / progressValue) * MusicDuration;
    });

    audioElement.addEventListener("loadeddata", () => {
      let finalTimeData = content.querySelector(".final");
      let AudioDuration = audioElement.duration;
      let finalMinutes = Math.floor(AudioDuration / 60);
      let finalSeconds = Math.floor(AudioDuration % 60);
      if (finalSeconds < 10) {
        finalSeconds = "0" + finalSeconds;
      }
      finalTimeData.innerText = finalMinutes + ":" + finalSeconds;
    });

    let currentTimeData = content.querySelector(".current");
    let CurrentTime = audioElement.currentTime;
    let currentMinutes = Math.floor(CurrentTime / 60);
    let currentSeconds = Math.floor(CurrentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    currentTimeData.innerText = currentMinutes + ":" + currentSeconds;
  });

  repeatBtn.addEventListener("click", () => {
    audioElement.currentTime = 0;
  });
}
