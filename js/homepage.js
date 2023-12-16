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

  function createcardsong(song, mostratutto) {
    /* mostratutto = 25 */
    let sectioncard = document.querySelector('#section-card1 .row');
    sectioncard.innerText = "";
    
    song.data.forEach((element,index) => {
        if(index <= mostratutto){let div = document.createElement('div');
        div.classList = "col-md-2 col-sm-3 p-1"
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
