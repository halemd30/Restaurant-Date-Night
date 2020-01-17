let apiKey = 'bdf061b7ff13160c0b5ed3be06170ae7';

function getRestaurants(location) {  
    let endpoint = 'https://developers.zomato.com/api/v2.1/search';
    let params = {
        entity_type: 'city',
        entity_id: location
    }

    console.log(params)
    const queryString = $.param(params);
    const url = endpoint + '?' + queryString;

    fetch(url, {
        headers: {
            'user-key': apiKey
        }
    }) 
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            throw new Error(response.statusText)
        })
        .then(responseJson => {
            displayResults(responseJson); 
        })
        .catch(err => {
            $('jsErrorMsg').text(`Uh oh, something went wrong: ${err.message}`)
        })
};

function getLocations(city) {  
    let endpoint = 'https://developers.zomato.com/api/v2.1/locations';
    let params = {
        query: city
    }

    console.log(params)
    const queryString = $.param(params);
    const url = endpoint + '?' + queryString;

    fetch(url, {
        headers: {
            'user-key': apiKey
        }
    }) 
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            throw new Error(response.statusText)
        })
        .then(responseJson => {
            const id = responseJson.location_suggestions[0].entity_id
            getRestaurants(id)
        })
        .catch(err => {
            $('jsErrorMsg').text(`Uh oh, something went wrong: ${err.message}`)
        })
};

function displayResults(responseJson) {
    console.log(responseJson);
    $('#resultsList').empty();
    for (let i = 0; i < responseJson.restaurants.length; i++) {
        $('#resultsList').append(
            `<button class="accordion">${responseJson.restaurants[i].restaurant.name}</button>
            <div class="details">
                <p>lorem ipsum...</p>
            </div>`
        )
    }
    
    $('#results').removeClass('hidden');
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const location = $('#jsLocation').val();
        const city = $('#jsLocation').val();
        //const maxResults = $('#numBooks').val();
        //getRestaurants(location)
        getLocations(city)
    })
}

$(watchForm);