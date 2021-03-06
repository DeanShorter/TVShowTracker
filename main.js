let addButton = document.querySelector('.add-button');
let filter = document.querySelector('.search-bar');
filter.addEventListener('keyup',fetchShows);
addButton.addEventListener('click', submitShow);


// Submit TV Show to list
function submitShow(e){    
    let nameOfShow = document.querySelector('.name-of-show').value;
    let seasonNumber = document.querySelector('.season-number').value;
    let epNumber = document.querySelector('.episode-number').value;
    let url = document.querySelector('.site-url').value;    
    
     if(!validateForm(nameOfShow, seasonNumber, epNumber, url)){
        return false;
       }
    
    let savedShow = {
        name: nameOfShow,
        season: seasonNumber,
        episode: epNumber,
        url: url        
    }
    
    
    if (localStorage.getItem('shows') === null) {
        let shows = [];
        shows.push(savedShow);
        localStorage.setItem('shows', JSON.stringify(shows));
    } else {
        let shows = JSON.parse(localStorage.getItem('shows'));
        shows.unshift(savedShow);
        localStorage.setItem('shows', JSON.stringify(shows));
    }
    
    fetchShows();
    e.preventDefault();
    document.querySelector('.entry-form').reset();
}


function removeShow(url) {
    let shows = JSON.parse(localStorage.getItem('shows'));
    for (let i = 0; i < shows.length; i++) {
        if (shows[i].url === url) {
            shows.splice(i, 1);
        }
    }
    localStorage.setItem('shows', JSON.stringify(shows));

    // re-fetch bookmarks
    fetchShows();
    
}

function fetchShows(){
    let shows = JSON.parse(localStorage.getItem('shows'));
    let showList = document.querySelector('.show-list');    
    showList.innerHTML = '';

    let targetString = filter.value;
    
    for (let i = 0; i < shows.length; i++) {
        let name = shows[i].name;
        let season = shows[i].season;
        let episode = shows[i].episode;
        let url = shows[i].url;
        showList.style.display = "block";
        
        if (name.startsWith(targetString)){
            
            showList.innerHTML +=                       
                '<div class="show-item">' +
                '<p class="show-name">' +
                '<span class="show-data">' +
                name +
                '</span>' + 
                '</p>' + 
                '<p class="show-season"><span class="title-style">Season: </span>' + 
                '<input type="number" min="1" id="' + name + '" onchange="seasonUpdated(this)" class="updated-season update-field" value='+season+'>' +
//                season +
                '</p>' +
                '<p class="show-episode"><span class="title-style">Episode: </span>' + 
                '<input type="number" min="1" id="' + name + '" onchange="episodeUpdated(this)" class="updated-episode update-field" value='+episode+'>' +
//                episode + 
                '</p>' +
                '<div class="new-buttons">'+
                ' <a class="watch-ep-btn btn" target="_blank" href="' + url + '"><span>Watch Episode</span></a> ' +
                ' <a class="remove-btn btn" onclick="removeShow(\'' + url + '\')" href="#"><span>Remove</span></a> ' +
                '</div>' +
                '</div>';
        } 
        
    }
             
}

function seasonUpdated(e){
    shows = JSON.parse(localStorage.getItem("shows"))
    for (var i = 0; i < shows.length; i++)
    {
        if(shows[i].name == e.id){
                shows[i].season = e.value;
                break;
            }
    }
    localStorage.setItem("shows",JSON.stringify(shows));
}

function episodeUpdated(e){
    shows = JSON.parse(localStorage.getItem("shows"))
    for (var i = 0; i < shows.length; i++)
    {
        if(shows[i].name == e.id){
                shows[i].episode = e.value;
                break;
            }
    }
    localStorage.setItem("shows",JSON.stringify(shows));
}


// Form validation
function validateForm(nameOfShow, seasonNumber, epNumber, url) {
    if (!nameOfShow || !seasonNumber || !epNumber || !url) {
        alert("Please fill in the form.");
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if (!url.match(regex)) {
        alert("Please use a valid URL");
        return false;
    }
    return true;
}




