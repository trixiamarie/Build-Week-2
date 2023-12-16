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

// let params = new URLSearchParams(document.location.search);
// let id = params.get("id");
// console.log("ID from URL:", id);

fetch("https://striveschool-api.herokuapp.com/api/deezer/album/75621062", {
    method: "GET",
})
.then((response)=> response.json())
.then((data)=>{
    console.log(data);
    creaAlbum(data);
    createContentAlbum(data.tracks.data);
    console.log(data.tracks.data);
    document.title = (data.title)
})
.catch((error) =>{
    console.error("Errore nella richiesta:", error);
});


//SEZIONE ALBUM



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
    artist.innerHTML = `<img src="${id.artist.picture}" style="height: 1.5rem; width: 1.5rem; border-radius: 50%"><b>${id.artist.name}</b> • ${id.release_date} • ${id.nb_tracks} brani, ${Math.floor(id.duration/60)} min, ${Math.floor(id.duration%60)} sec.`;
    tdalbum.appendChild(artist);
}

function createContentAlbum(id){
    let i = 1;

    id.forEach(x => {
        let contentAlbum = document.querySelector('#contentalbum');
        let row = document.createElement('div');
        row.classList.add('row');
        let col1 = document.createElement('div');
        col1.classList.add('col-1', 'text-end');
        let index = document.createElement('p');
        index.style.color="#828282";

        index.innerText = i;

        let col10 = document.createElement('div');
        col10.classList.add('col-10');
        let tSong = document.createElement('p');
        tSong.style.color="#e9e9e9";
        let tArtist = document.createElement('p');
        tArtist.style.color="#828282";
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




//sidebar
document.getElementById('toggleBtn').addEventListener('click', function() {
    const sidebar = document.getElementById('sidebar2');
    sidebar.classList.toggle('hidden');
  });
  
  
  document.getElementById('closeBtn').addEventListener('click', function() {
    const sidebar = document.getElementById('sidebar2');
    sidebar.classList.add('hidden');
  });
  