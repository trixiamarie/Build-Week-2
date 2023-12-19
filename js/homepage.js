let api= "https://striveschool-api.herokuapp.com/api/deezer/search?q={no}";

let params = new URLSearchParams(document.location.search);
let id = params.get("id");
console.log("ID from URL:", id);

//LOCAL STORAGE PER ALBUM SALVATI
let storedAlbums = localStorage.getItem('AlbumLiked');
console.log('Stored Albums:', storedAlbums);
let arrayHeartAlbum = storedAlbums !== null ? JSON.parse(storedAlbums) : [];
console.log('Parsed Array Albums:', arrayHeartAlbum);

//LOCAL STORAGE PER ARTISTI SALVATI
let storedArtist = localStorage.getItem('ArtistLiked');
console.log('Stored Artist:', storedArtist);
let arrayHeartArtist = storedArtist !== null ? JSON.parse(storedArtist) : [];
console.log('Parsed Array Artist:', arrayHeartArtist);

//SIDEBAR FETCH
fetch(api, {
    method: "GET",
    
})
.then((response)=> response.json())
.then((data)=>{
    console.log(data);
    listsongs(data);
    createcardsong(data);
})
.catch((error) =>{
    console.error("Errore nella richiesta:", error);
});

//SIDEBAR SINISTRO SEARCH
let searchBtn = document.querySelectorAll('.searchElement');
searchBtn.forEach((x) =>{
    x.addEventListener('click', function() {
        const input = document.querySelector('#searchBar');
        input.classList.toggle('hidden');
        input.focus();
    })}
)


let btnSearch = document.querySelector('#btnSearch');
btnSearch.addEventListener('click', function(){
    let searchValue = document.querySelector('#searchValue').value;
    window.location = `./artistpage.html?artist=${searchValue}`;
    console.log(searchValue);
})

document.querySelector('#searchValue').addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
      let searchValue = document.querySelector('#searchValue').value;
      window.location = `./artistpage.html?artist=${searchValue}`;
      console.log(searchValue);
  }
});


//LISTA ALBUM SALVATI
let btnAlbum = document.querySelector('#btnAlbum');
btnAlbum.addEventListener('click',  function () {
    let div = document.querySelector('.listsongs');
    div.innerHTML = '';
    let divSearch = document.createElement('div');
    divSearch.classList.add('d-flex', 'justify-content-between', 'align-items-center');
    divSearch.innerHTML = `<i class="bi bi-search"></i>
    <div class="d-flex align-items-baseline">
      <p class="m-0 p-2">Recenti</p>
      <i class="bi bi-list-ul fs-4 mt-auto me-3"></i>
    </div>`

    div.appendChild(divSearch);
    arrayHeartAlbum.forEach((element) => {
    fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${element}`, {
            method: "GET",
        })
        .then((response)=> response.json())
        .then((data)=>{
            console.log(data);
            let div = document.querySelector('.listsongs');
            let a =document.createElement('a');
            a.href = `./album.html?id=${data.id}`;
            let p = document.createElement('p');
            p.innerText = data.title;
            div.appendChild(a);
            a.appendChild(p);
    })
        .catch((error) =>{
            console.error("Errore nella richiesta:", error);
        });

     });
    
});

//LISTA ARTISTI SALVATI
let btnArtist = document.querySelector('#btnArtist');
btnArtist.addEventListener('click', function () {
    let div = document.querySelector('.listsongs');
    div.innerHTML = '';
    let divSearch = document.createElement('div');
    divSearch.classList.add('d-flex', 'justify-content-between', 'align-items-center');
    divSearch.innerHTML = `<i class="bi bi-search"></i>
    <div class="d-flex align-items-baseline">
      <p class="m-0 p-2">Recenti</p>
      <i class="bi bi-list-ul fs-4 mt-auto me-3"></i>
    </div>`
    div.appendChild(divSearch);

    arrayHeartArtist.forEach((element) => {
        fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${element}`, {
                method: "GET",
            })
            .then((response)=> response.json())
            .then((data)=>{
                console.log(data);
                let div = document.querySelector('.listsongs');
                let a =document.createElement('a');
                a.href = `./artistpage.html?id=${data.id}`;
                let p = document.createElement('p');
                p.innerText = data.name;
                div.appendChild(a);
                a.appendChild(p);
        })
            .catch((error) =>{
                console.error("Errore nella richiesta:", error);
            });
    
         });
});

//LISTA PLAYLIST AL CLICK
let btnPlaylist = document.querySelector('#btnPlaylist');
btnPlaylist.addEventListener('click', function () {
    let div = document.querySelector('.listsongs');
    div.innerHTML = '';
    let divSearch = document.createElement('div');
    divSearch.classList.add('d-flex', 'justify-content-between', 'align-items-center');
    divSearch.innerHTML = `<i class="bi bi-search"></i>
    <div class="d-flex align-items-baseline">
      <p class="m-0 p-2">Recenti</p>
      <i class="bi bi-list-ul fs-4 mt-auto me-3"></i>
    </div>`

    div.appendChild(divSearch);

    fetch(api, {
        method: "GET",
        
    })
    .then((response)=> response.json())
    .then((data)=>{
        console.log(data);
        listsongs(data);
    })
    .catch((error) =>{
        console.error("Errore nella richiesta:", error);
    });
});

//LISTA PLAYLIST AL CARICAMENTO DELLA PAGINA
function listsongs(song){

    console.log(song.data);
    song.data.forEach((element) => {
       let div = document.querySelectorAll('.listsongs');
       div.forEach((div)=>{
       let a = document.createElement('a');
       a.addEventListener('click', function(){
        playAudio(element);
    })
       let p = document.createElement('p');
       p.innerText = element.title;
       div.appendChild(a);
       a.appendChild(p);}
    )});
}

//SIDEBAR ATTIVITÀ AMICI
document.getElementById('toggleBtn').addEventListener('click', function() {
    const sidebar = document.getElementById('sidebar2');
    sidebar.classList.toggle('hidden');
});
  
document.getElementById('closeBtn').addEventListener('click', function() {
    const sidebar = document.getElementById('sidebar2');
    sidebar.classList.add('hidden');
});

//BOTTONI AVANTI E INDIETRO
document.querySelector('#btnBack').addEventListener('click', function(){
  window.history.back();
})
document.querySelector('#btnForward').addEventListener('click', function(){
  window.history.forward();
})

//PLAYER AUDIO

const audioElement = new Audio();

function playAudio(data) {
  // Stop and hide the current audio
  stopAndHideCurrentAudio();

  document.getElementById('current_album').innerHTML = `
    <img src="${data.album.cover_medium}" class="mx-2" height="80px" alt="${data.title}" />
    <div class="flex-column">
      <h4 class="fw-bold text-white">${data.title}</h4>
      <p class="fw-bold text-white">${data.artist.name}</p>
    </div>
  `;

  console.log("Playing audio:", data);

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

      audioElement.currentTime = (clickedOffsetX / progressValue) * MusicDuration;
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

//card homepage

let rockArtists = [
  'queen',
  'u2',
  'thepolice',
  'oasis',
  'thewho',
  'bonjovi',
  'Ozzy Osbourne',
  'AC/DC',
  'Pink Floyd',
  'metallica',
  'Red Hot Chili Peppers',
  'nirvana',
  'Black Sabbath',
  'Avenged Sevenfold',
  'Judas Priest'
]

let popArtists = [
  'maroon5',
  'coldplay',
  'onerepublic',
  'jamesblunt',
  'katyperry',
  'arianagrande',
  'Lady Gaga',
  'onedirection',
  'rihanna',
  'taylorswift',
  'edsheeran',
  'theweekend',
  'adele',
  'justintimberlake',
  'britneyspears'
]

let hipHopArtists = [
  'eminem',
  'snoopdogg',
  'lilwayne',
  'drake',
  'kanyewest',
  'travisscott',
  'postmalone',
  'xxxtentacion',
  'jay-z',
  '6ix9ine',
  'djkhaled',
  'cardib',
  'lilnasx',
  'logic',
  'nf'
];

function albumCard(songInfo) {
  // songInfo represents the info for the current song
  // creating the wrapper div

  return `
      <button class="text-center btn pt-3 pb-0 px-3 my-2 me-1 ms-4 rounded-3" id=${songInfo.album.id} style="background-color: #272727; font-size: 0.75rem; color: #A7A7A7;" onclick="GoTo(${songInfo.album.id})">
          <img class="img-fluid rounded-3" src=${songInfo.album.cover_big
    } alt="1" />
        <p class="text-white m-0 mt-2 p-0">
            ${songInfo.album.title}
        </p>
        <p class="descrizione">
            ${songInfo.artist.name}
        </p>
      </button>`
}

handleArtist = async (artistName, domQuerySelector) => {
  // artistName = "eminem", "metallica", etc...
  // domQuerySelector = "#rockSection" etc...
  try {
    let response = await fetch(
      'https://striveschool-api.herokuapp.com/api/deezer/search?q=' +
      artistName,
      {
        method: 'GET'
      }
    )
    if (response.ok) {
      let result = await response.json() // transforms the response to json
      let songInfo = result.data
      let div = document.querySelector(domQuerySelector)
      div.innerHTML += albumCard(songInfo[0]) // create a new album tyle
    } else {
      console.log('error')
    }
  } catch (err) {
    console.log(err)
  }
}

window.onload = async () => {
  let rockRandomArtists = []
  let popRandomArtists = []
  let hipHopRandomArtists = []

  while (rockRandomArtists.length < 5) {
    // pushes elements inside the array until it has 5 strings
    let artist =
      rockArtists[Math.floor(Math.random() * rockArtists.length)] // select an element from the array with an index between 0 and 7
    if (!rockRandomArtists.includes(artist)) {
      // checks if the artist is not already present in the array
      rockRandomArtists.push(artist) // pushes the artist in the array
    }
  }

  while (popRandomArtists.length < 5) {
    let artist = popArtists[Math.floor(Math.random() * popArtists.length)]
    if (!popRandomArtists.includes(artist)) {
      popRandomArtists.push(artist)
    }
  }

  while (hipHopRandomArtists.length < 5) {
    let artist =
      hipHopArtists[Math.floor(Math.random() * hipHopArtists.length)]
    if (!hipHopRandomArtists.includes(artist)) {
      hipHopRandomArtists.push(artist)
    }
  }

  for (let j = 0; j < rockRandomArtists.length; j++)
    await handleArtist(rockRandomArtists[j], '#rockSection')

  for (let k = 0; k < popRandomArtists.length; k++)
    await handleArtist(popRandomArtists[k], '#popSection')

  for (let l = 0; l < hipHopRandomArtists.length; l++)
    await handleArtist(hipHopRandomArtists[l], '#hipHopSection')
}

handleArtist2 = async (artistName, domQuerySelector) => {
  // artistName = "eminem", "metallica", etc...
  // domQuerySelector = "#rockSection" etc...
  let div = document.querySelector(domQuerySelector)
  div.innerHTML = ''
  try {
    let response = await fetch(
      'https://striveschool-api.herokuapp.com/api/deezer/search?q=' +
      artistName,
      {
        method: 'GET'
      }
    )
    if (response.ok) {
      let result = await response.json() // transforms the response to json
      let songInfo = result.data
      div.innerHTML += albumCard(songInfo[0]) // create a new album tyle
    } else {
      console.log('error')
    }
  } catch (err) {
    console.log(err)
  }
}

function MTbutton(idSec, genere) {
  let genereRandomArtists = [];
  while (genereRandomArtists.length < 15) {
    // pushes elements inside the array until it has 15 strings
    switch (genere) {
      case 'rock':
        artist =
          rockArtists[Math.floor(Math.random() * 15)] // select an element from the array with an index between 0 and 7
        if (!genereRandomArtists.includes(artist)) {
          // checks if the artist is not already present in the array
          genereRandomArtists.push(artist) // pushes the artist in the array
        }
        break;
      case 'pop':
        artist =
          popArtists[Math.floor(Math.random() * 15)] // select an element from the array with an index between 0 and 7
        if (!genereRandomArtists.includes(artist)) {
          // checks if the artist is not already present in the array
          genereRandomArtists.push(artist) // pushes the artist in the array
        }
        break;
      case 'hiphop':
        artist =
          hipHopArtists[Math.floor(Math.random() * 15)] // select an element from the array with an index between 0 and 7
        if (!genereRandomArtists.includes(artist)) {
          // checks if the artist is not already present in the array
          genereRandomArtists.push(artist) // pushes the artist in the array
        }
        break;
    }

  }

  for (let j = 0; j < genereRandomArtists.length; j++) {
    handleArtist2(genereRandomArtists[j], idSec)
  }
}

function GoTo(id) {
  let albumId = id;
  //per controllare 
  console.log("AlbumID:", albumId);
  const newUrl = `./album.html?id=${albumId}`;
  console.log("New URL:", newUrl);
  window.location.href = newUrl;
}


//crea un array di 45 keyword e ne prende 5 casuali che verranno iterate in ogni
function createcardsong() {
  let ricercheRandom = rockArtists.concat(popArtists).concat(hipHopArtists);

  let sections = document.querySelectorAll('.section-card');

  sections.forEach((section, index) => {
    for (let index = 0; index < 10; index++) {
      let indiceCasuale = Math.floor(Math.random() * ricercheRandom.length);
      fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${ricercheRandom[indiceCasuale]}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((song) => {
          let sectioncard = section.querySelector('div.row');
          /*  sectioncard.innerText = ""; */

          song.data.forEach((element, index) => {
            if (index <= 0) {
              let div = document.createElement('div');
              div.classList = "col-md-2 col-6 col-lg-2 col-xl-2 col-sm-6 p-1";
              div.innerHTML = `
            <div class="maincard  rounded-2 ">
              <a href="album.html?id=${element.album.id}">
                <img class="w-100 rounded-3" src="${element.album.cover_big}" alt="">
              </a>
              <p class="text-white m-0 mt-2 song-title">${element.title}</p>
              <div class="mb-3">
                <a href="artistpage.html?id=${element.artist.id}">
                  <span class="text-white-50 artist-title mt-5">${element.artist.name}</span>
                </a>
              </div>
            </div>
          `;
              sectioncard.appendChild(div);
            }
          });
        })
        .catch((error) => {
          console.error("Errore nella richiesta:", error);
        });

    }

  });
}

let mostratutto = document.querySelector('.mostratutti')