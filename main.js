import "./css/bootstrap.min.css";
import "./js/bootstrap.bundle.min";


const dynamicDataContainer = document.querySelector(".dynamic_data");
const spinnerContainer = document.querySelector(".spinner-container");
const alertContainer = document.querySelector(".alert");


const displayData = (games) => {
  dynamicDataContainer.innerHTML = "";

  games.forEach((game) => {
    const imageUrl = game.imgUrl ? game.imgUrl : 'https://via.placeholder.com/150'; 
    const description = game.reviewSummary ? game.reviewSummary : 'Description not available'; 
    const steamUrl = game.url; // Use the provided Steam URL directly

    const gameCard = `
      <div class="col">
        <article class="card">
          <img src="${imageUrl}" class="card-img-top" alt="${game.title}" />
          <div class="card-body">
            <h5 class="card-title">
              <a href="${steamUrl}" target="_blank">
                ${game.title}
              </a>
            </h5>
            <p class="card-text"><strong>Description:</strong> ${description}</p>
          </div>
        </article>
      </div>`;
    dynamicDataContainer.innerHTML += gameCard;
  });
};

const fetchData = async (query) => {
  const url = `https://steam2.p.rapidapi.com/search/${query}/page/1`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
      "x-rapidapi-host": "steam2.p.rapidapi.com",
    },
  };

  try {
    // Show the spinner
    spinnerContainer.classList.remove("d-none");
    alertContainer.classList.add("d-none"); 

    const response = await fetch(url, options);
    const result = await response.json();

    // Hide the spinner once the data is fetched
    spinnerContainer.classList.add("d-none");

    if (result && result.length > 0) {
      console.log(result);
      displayData(result); 
    } else {
     
      alertContainer.classList.remove("d-none");
    }
  } catch (error) {
    console.error(error);
   
    spinnerContainer.classList.add("d-none");
    alertContainer.textContent = "An error occurred. Please try again.";
    alertContainer.classList.remove("d-none");
  }
};


document.getElementById("searchButton").addEventListener("click", () => {

  const query = document.getElementById("searchInput").value;
  if (query) {
    fetchData(query);
  } else {
    console.log("Please enter a search term.");
  }
});
