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