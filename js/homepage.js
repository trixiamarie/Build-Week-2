let api= "https://striveschool-api.herokuapp.com/api/deezer/search?q={no}";

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

function listsongs(song){
    console.log(song.data);
    song.data.forEach((element) => {
       let div = document.querySelector('#listsongs');
       let a =document.createElement('a');
       a.href = element.link;
       let p = document.createElement('p');
       p.innerText = element.title;
       div.appendChild(a);
       a.appendChild(p);
    });
}

//sidebar
document.getElementById('toggleBtn').addEventListener('click', function() {
    const sidebar = document.getElementById('sidebar2');
    sidebar.classList.toggle('hidden');
  });
  
  
  document.getElementById('closeBtn').addEventListener('click', function() {
    const sidebar = document.getElementById('sidebar2');
    sidebar.classList.add('hidden');
  });

  //card homepage

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
          <img class="img-fluid rounded-3" src=${
            songInfo.album.cover_big
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
        div.innerHTML=''
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
      
    for (let j = 0; j < genereRandomArtists.length; j++){
      handleArtist2(genereRandomArtists[j], idSec)
  }
  }
  
   function GoTo (id) {
    let albumId = id;
    //per controllare 
    console.log("AlbumID:", albumId);
    const newUrl = `./album.html?id=${albumId}`;
  console.log("New URL:", newUrl);
  window.location.href = newUrl;
  }
  


  function createcardsong(song, mostratutto) {
    /* mostratutto = 25 */
    let sectioncard = document.querySelector('#section-card1 .row');
    sectioncard.innerText = "";
    
    song.data.forEach((element,index) => {
        if(index <= mostratutto){let div = document.createElement('div');
        div.classList = "col-md-2 col-6 col-lg-2 col-xl-2 col-sm-6 p-1"
        div.innerHTML = `
    <div class="maincard  rounded-2 "><img class="w-100 rounded-3" src="${element.album.cover_big}"
        alt="">
      <p class="text-white m-0 mt-2 song-title">${element.title}</p>
      <div class="mb-3"><span class="text-white-50 artist-title mt-5">${element.artist.name}</span></div>
    </div>
  `;
        sectioncard.appendChild(div)}
    });
    
}

let mostratutto = document.querySelector('.mostratutto');
console.log(mostratutto)

mostratutto.addEventListener("click",  createcardsong(song, 17)  )
