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

//SEZIONE ALBUM
fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${id}`, {
    method: "GET",
})
.then((response)=> response.json())
.then((data)=>{
    console.log(data);
    creaAlbum(data);
    createContentAlbum(data.tracks.data);
    console.log(data.tracks.data);
    document.title = (data.title)

    let heart = document.querySelector('#AddAlbumToLiked');
    
    heart.addEventListener('click', function (){
        console.log(arrayHeartAlbum);
        if (!arrayHeartAlbum.includes(data.id)) {
            
            arrayHeartAlbum.push(data.id);
            
            localStorage.setItem('AlbumLiked', JSON.stringify(arrayHeartAlbum));
            console.log(data.id);
            
        } else {
            console.log("Album already in the liked list");
            const indexToRemove = arrayHeartAlbum.indexOf(data.id);

    
    if (indexToRemove !== -1) {
        arrayHeartAlbum.splice(indexToRemove, 1);
        localStorage.setItem('AlbumLiked', JSON.stringify(arrayHeartAlbum));
        console.log(`Removed album id ${data.id} from liked list`);
    }
            }})
        }
    )
.catch((error) =>{
    console.error("Errore nella richiesta:", error);
});

//CREA PARTE SUPERIORE ALBUM
function creaAlbum(id) {
    let albumContainer = document.querySelector('#imgalbumcontainer');
    let albumContainer1 = document.querySelector('#albumcontainer');
    albumContainer1.style.backgroundImage = `url('${id.cover_xl}')`;
    console.log(albumContainer);
    let imgAlbum = document.createElement('img');
    imgAlbum.src = id.cover;
    albumContainer.appendChild(imgAlbum);
    let tdalbum = document.querySelector('#albumtitleanddescription');
    let titleAlbum = document.createElement('h2');
    titleAlbum.innerText = id.title;
    tdalbum.appendChild(titleAlbum);
    let artist = document.createElement('h5');
    artist.innerHTML = `<img src="${id.artist.picture}" style="height: 1.5rem; width: 1.5rem; border-radius: 50%"><a href="./artistpage.html?id=${id.artist.id}" class="text-decoration-none" style="color: white" ><b>${id.artist.name}</b></a> • ${id.release_date} • ${id.nb_tracks} brani, ${Math.floor(id.duration/60)} min, ${Math.floor(id.duration%60)} sec.`;
    tdalbum.appendChild(artist);
}

//CREA TRACKLIST
function createContentAlbum(id){
    let i = 1;

    id.forEach(x => {
        console.log(x);
        let contentAlbum = document.querySelector('#contentalbum');
        let row = document.createElement('div');
        row.classList.add('row');
        let col1 = document.createElement('div');
        col1.classList.add('col-1', 'text-end');
        let index = document.createElement('p');
        index.style.color="#828282";

        index.innerText = i;

        let col10 = document.createElement('div');
        col10.classList.add('col-10','d-flex', 'flex-column' );
        let tSong = document.createElement('a');
        tSong.classList.add('text-decoration-none');
        tSong.addEventListener('click', function(){
            playAudio(x);
        })
        tSong.style.color="#e9e9e9";
        let tArtist = document.createElement('a');
        tArtist.style.color="#828282";
        tArtist.href= `./artistpage.html?id=${x.artist.id}`;
        tArtist.classList.add('text-decoration-none');
        tSong.innerText= x.title;
        tArtist.innerText = x.artist.name;

        let col1pt2 = document.createElement('div');
        col1pt2.classList.add('col-1');
        let durata = document.createElement('p');
        durata.style.color="#828282";
        durata.innerHTML = `${Math.floor(x.duration/60)}:${(x.duration%60)}`;

        contentAlbum.appendChild(row);
        row.appendChild(col1);
        col1.appendChild(index);
        row.appendChild(col10);
        col10.appendChild(tSong);
        col10.appendChild(tArtist);
        row.appendChild(col1pt2);
        col1pt2.appendChild(durata);

       

        
        i++
    });
}

