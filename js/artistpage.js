let api = "https://striveschool-api.herokuapp.com/api/deezer/search?q={no}";
let artistUrl =
  "https://striveschool-api.herokuapp.com/api/deezer/search?q={bob dylan}";
function getdata() {
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
}

document.addEventListener("DOMContentLoaded", () => {
  getdata();
  getArtistData(artistUrl);
});

function listsongs(song) {
  console.log(song.data);
  song.data.forEach((element) => {
    let div = document.querySelector("#listsongs");
    let a = document.createElement("a");
    a.href = "#"; //element.link;
    let p = document.createElement("p");
    p.innerText = element.title;
    div.appendChild(a);
    a.appendChild(p);
  });
}
function getArtistData(url) {
  fetch(url, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      popArtistPage(data);
    })
    .catch((error) => {
      console.error("Errore nella richiesta:", error);
    });
}

function popArtistPage(data) {
  let artistId = data.data[0].artist.id;
  console.log(artistId);
  fetchArtist(artistId);
  // .catch((error) => {
  //   console.error("Errore nella richiesta:", error);
  // });
}
function fetchArtist(artistId) {
  fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}`,
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      let artistHero = document.querySelector(".artistHero");
      let artistName = document.querySelector("h1");
      let monthlyListen = document.querySelector("div.row p.offset-1");

      console.log(data.tracklist);
      fetchTracklist(data.tracklist);
      about(data);
      artistHero.style.backgroundImage = `url(${data.picture_big})`;
      artistName.innerText = data.name;
      monthlyListen.innerHTML = `${data.nb_fan} ascoltatori mensili`;
    });
}
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

function placeData(tracks) {
  let top50 = document.querySelector(
    "div.mx-1.text-light.lightBg div.row.m-auto div.col.m-auto"
  );
  let cardDiv = document.querySelectorAll(
    "div.row div.col.d-flex.justify-content-between"
  );
  for (i = 0; i < 5; i++) {
    console.log(tracks);
    top50.innerHTML += `
              <div class="row">
                <div class="col d-flex py-2 justify-content-center">
                  <div class="col-6 d-flex justify-content-between">
                    <div class="d-flex align-items-center">
                        <p class="pe-2 m-auto">${i + 1}</p>
                        <img src="${
                          tracks.data[i].album.cover
                        }" alt="songImg" srcset="" style="height:3em" class="pe-2">
                        <p class=" m-auto">${tracks.data[i].title}</p>
                    </div>
                  </div>
                  <div class="col-6 d-flex justify-content-around">
                    <p class=" m-auto">${tracks.data[i].rank}</p>
                    <p class=" m-auto">${tracks.data[i].duration}</p>
                  </div>
                </div>
              </div>
              `;
    let cutTitle = "";
    console.log(tracks.data[i].album.title.length);
    console.log(tracks.data[i].album);
    if (tracks.data[i].album.title.length > 20) {
      cutTitle = tracks.data[i].album.title.slice(0, 20) + "...";
    } else {
      cutTitle = tracks.data[i].album.title;
    }
    cardDiv[1].innerHTML += `
              <div class="card bg-dark text-light" style="width: 18rem; id="${tracks.data[i].album.id}">
                <img src="${tracks.data[i].album.cover}" class="card-img-top" alt="...">
                  <div class="card-body">
                    <p class="fs-6">${cutTitle}</p>
                    <p class="card-text-sm">
                  </div>
            </div>
  `;

    // aboutDiv.style.backgroundImage = `url(${})`
  }
}
function about(data) {
  console.log(data);
  let aboutDiv = document.querySelector(".about");
  console.log(aboutDiv);
  aboutDiv.style.backgroundImage = `url(${data.picture_big})`;
}
