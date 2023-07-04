const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const gameInfoContainer = document.getElementById('game-info');

searchButton.addEventListener('click', () => searchGameAndRetrieveGUID(searchInput.value));

function searchGameAndRetrieveGUID(gameName) {
    window.handleAPIData = function (data) {
        const games = data.results;
        console.log(games);
        if (games.length !== 0) {
            const firstGame = games[0];
            const gameGUID = firstGame.guid;
            searchGameGUID(gameGUID);
        } else {
            gameInfoContainer.innerHTML = 'No game found.';
        }
    };

    const script = document.createElement('script');
    script.src = `https://www.giantbomb.com/api/search/?api_key=a3ed24058c6960422612f376ca988d6bdc6d4a67&format=jsonp&query=${gameName}&resources=game&json_callback=handleAPIData`;

    document.head.appendChild(script);
}

function searchGameGUID(gameGUID) {
    window.handleAPIData = function (data) {
        const game = data.results;
        if (game.length !== 0) {
            console.log(game);
            const name = game.name;
            const releaseYear = game.original_release_date;
            const description = game.deck;
            const image = game.image.medium_url;
            const similar = game.similar_games;
            console.log(game);
            createCards(name, releaseYear, description, image, similar);
        } else {
            gameInfoContainer.innerHTML = 'No game found.';
        }
    };

    const script = document.createElement('script');
    script.src = `https://www.giantbomb.com/api/game/${gameGUID}/?api_key=a3ed24058c6960422612f376ca988d6bdc6d4a67&format=jsonp&json_callback=handleAPIData`;

    document.head.appendChild(script);
}

function createCards(name, releaseYear, description, image, similar) {
    const gameCard1 = document.createElement('div');
    const gameCard2 = document.createElement('div');
    const gameCard3 = document.createElement('div');
    const gameCard4 = document.createElement('div');
    const gameCard5 = document.createElement('div');

    gameCard1.innerHTML = `
    <h1>${name}</h1>
  `;

    gameCard2.innerHTML = `
    <h2>Release Year</h2>
    <h2>${releaseYear}</h2>
    `;

    gameCard3.innerHTML = `
    <h2>Description</h2>
    <h3>${description}</h3>
    `;

    gameCard5.innerHTML = `
    <h2>Similar Games</h2>
    `;

    for (let i = 0; i < similar.length && i < 6; i++) {
        const similarGame = similar[i].name;
        const game = document.createElement('a');
        game.addEventListener('click', () => searchGameAndRetrieveGUID(similar[i].name));
        game.innerHTML = similarGame;
        gameCard5.appendChild(game);
    };

    gameInfoContainer.innerHTML = '';
    gameInfoContainer.appendChild(gameCard1);
    gameInfoContainer.appendChild(gameCard2);
    gameInfoContainer.appendChild(gameCard3);
    gameInfoContainer.appendChild(gameCard4);
    gameInfoContainer.appendChild(gameCard5);
    gameCard1.classList.add('game-card');
    gameCard2.classList.add('game-card');
    gameCard3.classList.add('game-card');
    gameCard4.classList.add('game-card', 'game-card-image');
    gameCard5.classList.add('game-card', 'game-card-similar');
    gameCard1.style.gridArea = "title";
    gameCard2.style.gridArea = "release";
    gameCard3.style.gridArea = "description";
    gameCard4.style.gridArea = "image";
    gameCard4.style.backgroundImage = `url(${image})`;
    gameCard5.style.gridArea = "similar";
};



