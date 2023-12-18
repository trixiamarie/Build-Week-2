let api = "https://striveschool-api.herokuapp.com/api/deezer/search?q={no}";
let artistUrl =
  "https://striveschool-api.herokuapp.com/api/deezer/search?q={jimi hendrix}";
let params = new URLSearchParams(document.location.search);
let id = params.get("id");
// let id = 475;
console.log("ID from URL:", id);

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

function listsongs(song) {
  console.log(song.data);
  song.data.forEach((element) => {
    let div = document.querySelector("#listsongs");
    let a = document.createElement("a");
    a.href = element.link;
    let p = document.createElement("p");
    p.innerText = element.title;
    div.appendChild(a);
    a.appendChild(p);
  });
}

//sidebar
document.getElementById("toggleBtn").addEventListener("click", function () {
  const sidebar = document.getElementById("sidebar2");
  sidebar.classList.toggle("hidden");
});

document.getElementById("closeBtn").addEventListener("click", function () {
  const sidebar = document.getElementById("sidebar2");
  sidebar.classList.add("hidden");
});

document.addEventListener("DOMContentLoaded", () => {
  fetchArtist(id);
  let cardDiv = document.querySelector(".cardDiv");
  console.log(cardDiv);
});

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
      let aboutListen = document.querySelector(".aboutText p");
      console.log(aboutListen);
      console.log(data.tracklist);
      fetchTracklist(data.tracklist);
      about(data);
      artistHero.style.backgroundImage = `url(${data.picture_big})`;
      artistName.innerText = data.name;
      monthlyListen.innerHTML = `${data.nb_fan} ascoltatori mensili`;
      aboutListen.innerHTML = `${data.nb_fan} ascoltatori mensili`;

      document.title = data.name;
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
  console.log(tracks);
  let top50 = document.querySelector(
    "div.mx-1.text-light.lightBg div.row.m-auto div.col.m-auto"
  );
  let artistAlbums = [];
  let cardDiv = document.querySelector(".cardDiv");
  for (let c = 0; c < tracks.data.length; c++) {
    artistAlbums.push(tracks.data[c].album);
    console.log(tracks.data[c].album);
  }
  let filteredArr = filterDuplicateArrays(artistAlbums);
  for (let i = 0; i < 5; i++) {
    console.log(i);
    let time = tracks.data[i].duration;
    let minutes = Math.floor(time / 60);
    let seconds = time - minutes * 60;
    function str_pad_left(string, pad, length) {
      return (new Array(length + 1).join(pad) + string).slice(-length);
    }

    let finalTime =
      str_pad_left(minutes, "0", 2) + ":" + str_pad_left(seconds, "0", 2);
    // duration = duration.replace(".", ":");
    top50.innerHTML += `
              <div class="row">
                <div class="col d-flex py-2 justify-content-center">
                  <div class="col-6 d-flex justify-content-between">
                    <div class="d-flex align-items-center">
                        <p class="pe-2 m-auto">${i + 1}</p>
                        <img src="${
                          tracks.data[i].album.cover
                        }" alt="songImg" srcset="" style="height:3em" class="pe-2">
                        <a href ="#" class=" m-auto text-decoration-none">${
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
    let cutTitle = "";
    if (tracks.data[i].album.title.length > 20) {
      cutTitle = tracks.data[i].album.title.slice(0, 20) + "...";
    } else {
      cutTitle = tracks.data[i].album.title;
    }
    cardDiv.innerHTML += `
    <div class="card rounded bg-dark text-light" style="width: 15%;" id="${filteredArr[i].id}">
      <img src="${filteredArr[i].cover}" class="card-img-top rounded" alt="...">
        <div class="card-body">
          <p class="fs-6">${filteredArr[i].title}</p>
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
