var audioplayer = document.getElementById('audioplayer')



var loaded = false;

var playbtn = document.getElementById('playbtn')

var pausebtn = document.getElementById('pausebtn')

var range = document.getElementById('volume')

var volumeMaximo = document.getElementById('volume-maximo')
var volumeMutado = document.getElementById('volume-mutado')
var volumeBaixo = document.getElementById('volume-baixo')

var clicks = 0;
var clicks2 = 0;

var estaNaPlay = false

var tempo_total = document.getElementById('tempo_total')
let isPlaying = true;

let songIndex = 0;
var contadorDeindex = 0;
var contadorDeMusica = -1;
var contadorDeMusicaplay = -1;

var pagMain = document.getElementById('main')
var playerArtistComponent = document.getElementsByClassName('player-artist')
//<pegar os dados da musica e imagem
var popup_add_musica = document.getElementById('popup_add_musica')
var clicksADDmusica = 0;
function adicionarMusica(){
    clicksADDmusica++
    if (clicksADDmusica == 0) {
        popup_add_musica.style.display = 'none'
    }
    if (clicksADDmusica == 1) {
        popup_add_musica.style.display = 'inline'
    }
    if (clicksADDmusica == 2) {
        popup_add_musica.style.display = 'none'
    }
    if (clicksADDmusica == 2) {
        clicksADDmusica = 0
    }
}

function enviarArqDeADD(){
     contadorDeMusica++
     contadorDeindex++

     var imgADD = document.getElementById('imgADD').value;
     var audioADD = document.getElementById('audioADD').value;
     var NomeADD = document.getElementById('NomeADD').value
     var BandaADD = document.getElementById('BandaADD').value
     var startIndexIMG = (imgADD.indexOf('\\') >= 0 ? imgADD.lastIndexOf('\\') : imgADD.lastIndexOf('/'));
     var filenameIMG = imgADD.substring(startIndexIMG);
     if (filenameIMG.indexOf('\\') === 0 || filenameIMG.indexOf('/') === 0) {
         filenameIMG = filenameIMG.substring(1);
     }
    
     var startIndexArq = (audioADD.indexOf('\\') >= 0 ? audioADD.lastIndexOf('\\') : audioADD.lastIndexOf('/'));
     var filenameArq = audioADD.substring(startIndexArq);
     if (filenameArq.indexOf('\\') === 0 || filenameArq.indexOf('/') === 0) {
         filenameArq = filenameArq.substring(1);
     }

     songList.push({
         name: NomeADD,
         artist: BandaADD,
         source: "audio/" + filenameArq,
         cover: "img/" + filenameIMG
     })
     localStorage.setItem("songList", JSON.stringify(songList));
     let ultimo = songList[songList.length - 1]

         pagMain.children[0].children[0].innerHTML += `
         <div onclick="musica`+contadorDeMusica+`()" class="main-col">
             <img src="`+ultimo.cover+`" alt="">
             <h3>`+ultimo.artist+`</h3>
             <p>`+ultimo.name+`</p>
         </div>
     `
    
    





     popup_add_musica.style.display = 'none'
     clicksADDmusica = 0
     estaNaPlay = false
     window.location.reload()
}

//<pegar os dados da musica e imagem
var songList = JSON.parse(localStorage.getItem('songList') || '[]');

if (songList == 0) {
    songList.push({
        name: "Heavenly",
        artist:"Cigarettes After Sex",
        source: "audio/Heavenly.mp3",
        cover: "img/logo-musica3.jpg"
    },
    {
        name: "Sweet",
        artist:"Cigarettes After Sex",
        source: "audio/Sweet.mp3",
        cover: "img/logo-musica1.jpg"
    },
    {
        name: "Apocalypse",
        artist:"Cigarettes After Sex",
        source: "audio/Apocalypse.mp3",
        cover: "img/logo-musica4.jpg"
    },
    {
        name: "Heat Waves",
        artist:"Glass Animals",
        source: "audio/HeatWaves.mp3",
        cover: "img/heatwaves.jpg"
    },
    {
        name: "Clocks",
        artist:"Coldplay",
        source: "audio/Clocks.mp3",
        cover: "img/clocks.jpg"
    },
    {
        name: "Demons",
        artist:"Imagine Dragons",
        source: "audio/Demons.mp3",
        cover: "img/demons.jpg"
    },
    {
        name: "Seven Nation Army",
        artist:"The White Stripes",
        source: "audio/SevenNationArmy.mp3",
        cover: "img/sevennationarmy.jpg"
    },
    {
        name: "Notion",
        artist:"The Rare Occasions",
        source: "audio/Notion.mp3",
        cover: "img/notion.jpg"
    },
    {
        name: "Blood Water",
        artist:"Grandson",
        source: "audio/BloodWater.mp3",
        cover: "img/bloodWater.jpg"
    },
    {
        name: "Mind Over Matter",
        artist:"Young The Giant",
        source: "audio/MindOverMatter.mp3",
        cover: "img/MindOverMatter.jpg"
    },
    {
        name: "Daddy Issues",
        artist:"The Neighbourhood",
        source: "audio/daddyIssues.mp3",
        cover: "img/theneighbourhood.jpg"
    });
    localStorage.setItem("songList", JSON.stringify(songList));
    
}

for (let index = 0; index < songList.length; index++) {
    let song = songList[index]
    contadorDeMusica++

    pagMain.children[0].children[0].innerHTML += `
        <div data-id="`+contadorDeMusica+`" class="main-col">
        <img src="`+song.cover+`" alt="">
        <h3>`+song.artist+`</h3>
        <p>`+song.name+`</p>
        </div>
    `
}


document.querySelectorAll('.main-col').forEach(item =>{
    item.addEventListener('click', event=>{
        estaNaPlay = false
        let id = item.getAttribute('data-id')
        console.log(id);
        songIndex = id
        iniciarMusica()
    })
})


var main_playlist = document.getElementById('main-playlist')

var songListPlaylist = JSON.parse(localStorage.getItem('songListPlaylist') || '[]');




var popupAddPlaylist = document.getElementById('popupAddPlaylist')
var clicksADDplaylis = 0
function ADDplaylis(){
    clicksADDplaylis++
    if (clicksADDplaylis == 0) {
        popupAddPlaylist .style.display = 'none'
    }
    if (clicksADDplaylis == 1) {
        popupAddPlaylist .style.display = 'inline'
    }
    if (clicksADDplaylis  == 2) {
        popupAddPlaylist .style.display = 'none'
    }
    if (clicksADDplaylis  == 2) {
        clicksADDplaylis  = 0
    }
}


var ADDplaylist = document.getElementById('ADDplaylist')

for (let index = 0; index < songList.length; index++) {


        popupAddPlaylist.innerHTML += `
        <input class="playADDMusica" data-id="`+index+`" type="button" value="`+songList[index].name+`"> <br>
    `


}



var popupAdicionadoSucesso = document.getElementById('popupAdicionadoSucesso')
var textopopup = document.getElementById('textopopup')
document.querySelectorAll('.playADDMusica').forEach(item4 =>{
    item4.addEventListener('click', event=>{
        let id = item4.getAttribute('data-id')
        songListPlaylist.push(
            {
            name: songList[id].name,
            artist:songList[id].artist,
            source: songList[id].source,
            cover: songList[id].cover
        },)
        localStorage.setItem("songListPlaylist", JSON.stringify(songListPlaylist));
        
        textopopup.innerHTML = `<span>Sucesso!</span> Musica `+songList[id].name+` adicionada com sucesso!` 
        popupAdicionadoSucesso.style.display = 'inline'
        setTimeout( function() {
            document.getElementById('popupAdicionadoSucesso').style.display = 'none';
        }, 4000);
        let ultimo = songListPlaylist[songListPlaylist.length - 1]
        
            contadorDeMusicaplay++
        
            main_playlist.children[0].children[0].innerHTML += `
                <div data-id="`+contadorDeMusicaplay+`" class="main-col-playlist">
                    <span id="mover" class="material-icons-outlined">drag_handle</span>
                    <img src="`+ultimo.cover+`" alt="">
                    <h3 class="musica-playlist">`+ultimo.name+`</h3>
                    <p class="banda-playlist">`+ultimo.artist+`</p>
                    
                </div>
            `
            setInterval(()=>{
                location.reload()
            }, 2000)
            
    })
})
ADDdmusica() 
function ADDdmusica() {
    for (let index = 0; index < songListPlaylist.length; index++) {
        contadorDeMusicaplay++
    
        main_playlist.children[0].children[0].innerHTML += `
            <div data-id="`+contadorDeMusicaplay+`" class="main-col-playlist">
                <span id="mover" class="material-icons-outlined">drag_handle</span>
                <img src="`+songListPlaylist[index].cover+`" alt="">
                <h3 class="musica-playlist">`+songListPlaylist[index].name+`</h3>
                <p class="banda-playlist">`+songListPlaylist[index].artist+`</p>
            </div>
        `
    }
}
function deletarMusicaPlay(){
    songListPlaylist.splice(songIndex, 1);
    localStorage.setItem("songListPlaylist", JSON.stringify(songListPlaylist));
    location.reload()
}
iniciarMusicaplay()
function iniciarMusicaplay() {
    document.querySelectorAll('.main-col-playlist').forEach(item3 =>{
        item3.addEventListener('click', event=>{
            console.log('click');
            let id2 = item3.getAttribute('data-id')
            songIndex = id2
            iniciarMusica()
        })
    })
}





console.log(songList);
console.log(songListPlaylist);
//<mudar para playlist


var top_playlist = document.getElementById('top_playlist')

var tituloDaPagina = document.getElementById('tituloDaPagina')

var main_principal = document.getElementById('main')

var removerMusicaPlay = document.getElementById('removerMusicaPlay')

var ADDplaylistID = document.getElementById('ADDplaylist')



function playlist1(){
    estaNaPlay = true
    tituloDaPagina.innerHTML = 'playlist1'
    removerMusicaPlay.style.display = 'inline'
    ADDplaylistID.style.display = "inline"
    main_principal.style.display = "none"
    main_playlist.style.display = "inline"
}
function tela_principal(){
    estaNaPlay = false
    tituloDaPagina.innerHTML = 'Spotify'
    removerMusicaPlay.style.display = 'none'
    ADDplaylistID.style.display = "none"
    main_principal.style.display = "inline"
    main_playlist.style.display = "none"
    top_playlist.style.display = "none"
}
//>mudar para playlist

function voltar() {
    songIndex--
    iniciarMusica()
}

function avancar() {
    songIndex++
    iniciarMusica()
    
}
function iniciarMusica(){
    if (estaNaPlay === true) {
        audioplayer.src = songListPlaylist[songIndex].source
        playerArtistComponent[0].innerHTML = `<img src="`+songListPlaylist[songIndex].cover+`" /> <h3>`+songListPlaylist[songIndex].artist+`<br/><span>`+songListPlaylist[songIndex].name+`</span></h3>`
        if (songIndex > songListPlaylist.length) {
            songIndex = 0
        }
    }
    if(estaNaPlay === false){
        audioplayer.src = songList[songIndex].source
        playerArtistComponent[0].innerHTML = `<img src="`+songList[songIndex].cover+`" /> <h3>`+songList[songIndex].artist+`<br/><span>`+songList[songIndex].name+`</span></h3>`
        
        if (songIndex > songList.length) {
            songIndex = 0
        }
    }
    audioplayer.play()
    audioplayer.onloadeddata = function() {
        let data = new Date(null);
        data.setSeconds(audioplayer.duration);
        let duracao = data.toISOString().substr(14, 5);
        tempo_total.innerHTML = duracao
    };
    playbtn.style.display = "none"
    pausebtn.style.display = "inline"
    
}


pausebtn.addEventListener('click', (e)=>{
    e.preventDefault();

    playbtn.style.display = "inline"
    pausebtn.style.display = "none"

    audioplayer.pause()

    return false;
})

playbtn.addEventListener('click', (e)=>{
    e.preventDefault();

    playbtn.style.display = "none"
    pausebtn.style.display = "inline"

    audioplayer.play()

    return false;
})

document.getElementById("volume").oninput = function() {
    var value = (this.value-this.min)/(this.max-this.min)*100
    this.style.background = 'linear-gradient(to right, #1DB954 0%, #1DB954 ' + value + '%, #fff ' + value + '%, white 100%)'
  };

range.addEventListener('input', function() {
    document.getElementById('audioplayer').volume=this.value
    if (this.value == 0) {
        audioplayer.muted = true
        volumeMaximo.style.display = "none"
        volumeMutado.style.display = "inline"
        volumeBaixo.style.display = "none"
        console.log("mutado");
    }else{
        audioplayer.muted = false
        console.log("desmutado");
    }
    if (this.value > 0.5 && this.value <= 1) {
        volumeMaximo.style.display = "inline"
        volumeMutado.style.display = "none"
        volumeBaixo.style.display = "none"
    }

    if (this.value <= 0.5 && this.value > 0 ) {
        volumeMaximo.style.display = "none"
        volumeMutado.style.display = "none"
        volumeBaixo.style.display = "inline"
    }
});

function mutar() {
    audioplayer.muted = true
    volumeMaximo.style.display = "none"
    volumeMutado.style.display = "inline"
    volumeBaixo.style.display = "none"
    console.log("mutado");
}
function desmutar() {
    audioplayer.muted = false
    volumeMaximo.style.display = "inline"
    volumeMutado.style.display = "none"
    volumeBaixo.style.display = "none"
    console.log("desmutado");
}

function loopAtv() {
    clicks++
    if (clicks2 == 2 || clicks2 == 0) {
        console.log(clicks);
        if (clicks == 1) {
        document.getElementById('loop').style.color = "#00ff37"
        audioplayer.loop = true
        }
        if (clicks == 2) {
        document.getElementById('loop').style.color = "rgb(180, 179, 179)"
        audioplayer.loop = false
        clicks = 0
        }
    }
}
function alearioAtv() {
    clicks2++
    if (clicks == 2 || clicks == 0) {
        console.log(clicks2);
        if (clicks2 == 1) {
            document.getElementById('aleario').style.color = "#00ff37"
        }
        if (clicks2 == 2) {
            document.getElementById('aleario').style.color = "rgb(180, 179, 179)"
            clicks2 = 0
        }
    }
}


var progress = document.getElementById('player-control-progress')
var progress2 = document.getElementById('player-control-progress-2')


audioplayer.ontimeupdate = (e) =>{
    progress2.style.width = audioplayer.currentTime*100 / audioplayer.duration + "%";
}

progress.onclick = (e)=>{
    audioplayer.currentTime = ((e.offsetX/progress.offsetWidth) * audioplayer.duration)
}


var audio = document.getElementById('audioplayer')

			

audio.addEventListener('play', play_evento , false);
audio.addEventListener('timeupdate', atualizar , false);

function play(){
    audio.play();
}

function pause(){
    audio.pause();
}

function stop(){
    audio.pause();
    audio.currentTime = 0;
}

function play_evento(){
    document.getElementById('tempo_atual').innerHTML = secToStr( audio.currentTime) ;

}

function atualizar(){
    document.getElementById('tempo_atual').innerHTML = secToStr( audio.currentTime);
    
}



function secToStr( sec_num ) {
    sec_num = Math.floor( sec_num );
    var horas   = Math.floor(sec_num / 3600);
    var minutos = Math.floor((sec_num - (horas * 3600)) / 60);
    var segundos = sec_num - (horas * 3600) - (minutos * 60);

    if (horas   < 10) {horas   = "0"+horas;}
    if (minutos < 10) {minutos = "0"+minutos;}
    if (segundos < 10) {segundos = "0"+segundos;}
    var tempo    = minutos+':'+segundos;
    return tempo;
}