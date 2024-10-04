const searchForm=document.querySelector("form");
const mname=document.querySelector("#mname");
// const btn=document.querySelector("#btn");
 const movieContainer=document.querySelector(".movie-container")
const left=document.querySelector(".left")
const right=document.querySelector(".right")

// function to fetch movie details using OMDB API
const getMovie=async(movie)=>
 {
    try {
        const myApiKey="448ec487";
        const url=`http://www.omdbapi.com/?apikey=${myApiKey}&t=${movie}`
        const response= await fetch(url);
        if(!response.ok)
        {
            throw new Error("Unable to fetch movie data.");
        }
        const data= await response.json();
        showMovie(data);
        
    } catch (error) {
        showErrorMessage("No movie Found!!!")
    }
   
    
    
    
 }


 // function to show movie data on screen
 const showMovie=(data)=>{
    movieContainer.innerHTML="";
    
    movieContainer.classList.remove('noBackground');


    const{Title,imdbRating,Genre,Released,Runtime,Actors,Plot,Poster}= data;

    const movieElement=document.createElement('div');
    movieElement.classList.add('movie-info');
    movieElement.innerHTML=`<h1>${Title}</h1>
                            <p><strong>Rating:&#11088;</strong>${imdbRating}</p>`;

    const movieGenre=document.createElement('div');
    movieGenre.classList.add('movie-genre');
    Genre.split(",").forEach(element => {
        const p=document.createElement('p');
        p.innerText=element;   
        movieGenre.appendChild(p);  
    });
    movieElement.appendChild(movieGenre)

    movieElement.innerHTML +=`<p><strong>Released Date:</strong>${Released}</p>
                            <p><strong>Duration:</strong>${Runtime}</p>
                            <p><strong>Cast:</strong>${Actors}</p>
                            <p><strong>Plot:</strong>${Plot}</p>`;


     const moviePoster=document.createElement('div');
     moviePoster.classList.add('movie-poster');
     moviePoster.innerHTML=`<img src="${Poster}"/>`
     movieContainer.appendChild(moviePoster);
    movieContainer.appendChild(movieElement);
 }



 // function to display error message
 const showErrorMessage=(message)=>{
    movieContainer.innerHTML=`<h1>${message}</h1>`;
    movieContainer.classList.add('noBackground');
 }


//  function to handle searchForm submission
const handleFormSubmission=(e)=>{
    
    e.preventDefault();
    const movieName=mname.value.trim();
    if(movieName !== "")
    {
        showErrorMessage("Fetching Movie Information....")
        getMovie(movieName);
        mname.value="";
       
    }
    else{
          showErrorMessage("Enter movie name to get movie insearch formation");      
    }
}
 // adding event listener to search searchForm
searchForm.addEventListener('submit', handleFormSubmission);