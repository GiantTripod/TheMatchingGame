var cardsArray = [
    {    'name': 'CSS',    'img': 'https://source.unsplash.com/150x150/?current-events',  },
    {    'name': 'HTML',    'img': 'https://source.unsplash.com/150x150/?nature',  },
    {    'name': 'jQuery',    'img': 'https://source.unsplash.com/150x150/?sports',  },
    {    'name': 'JS',    'img': 'https://source.unsplash.com/150x150/?film',  },
    {    'name': 'Node',    'img': 'https://source.unsplash.com/150x150/?technology',  },
    {    'name': 'Photo Shop',    'img': 'https://source.unsplash.com/150x150/?wallpapers',  },
    {    'name': 'PHP',    'img': 'https://source.unsplash.com/150x150/?animals',  },
    {    'name': 'Python',    'img': 'https://source.unsplash.com/150x150/?architecture',  },
    {    'name': 'Ruby',    'img': 'https://source.unsplash.com/150x150/?experimental',  },
    {    'name': 'Sass',    'img': 'https://source.unsplash.com/150x150/?innovation',  },
    {    'name': 'Sublime',    'img': 'https://source.unsplash.com/150x150/?history',  },
    {    'name': 'Wordpress',    'img': 'https://source.unsplash.com/150x150/?random',  },
  ];

  var gameGrid = cardsArray.concat(cardsArray);

  gameGrid.sort(function() {
      return 0.5 - Math.random();
  })

  var game = document.getElementById('game-board');
  var grid = document.createElement('section');

  grid.setAttribute('class', 'grid');
  game.appendChild(grid);


  for (i = 0; i < gameGrid.length; i++) {
    var card = document.createElement('div');
    card.classList.add('card');
    card.dataset.name = gameGrid[i].name;
    var front = document.createElement('div');
    front.classList.add('front');
    var back = document.createElement('div');
    back.classList.add('back');
    back.style.backgroundImage = `url(${gameGrid[i].img})`;
    grid.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);
  };

  var firstGuess = '';
  var secondGuess = '';
  var count = 0;
  var previousTarget = null;
  var delay = 800;

  var match = function() {
    var selected = document.querySelectorAll('.selected');
    for (i = 0; i < selected.length; i++) {
      selected[i].classList.add('match');
    }
  };

  var resetGuesses = function() {
    firstGuess = '';
    secondGuess = '';
    count = '0';
    previousTarget = null;

    var selected = document. querySelectorAll('.selected');
    for (i = 0; i < selected.length; i++) {
      selected[i].classList.remove('selected');
    }
  } 


  grid.addEventListener('click', function(event) {
    var clicked = event.target;
    if (clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('match') || clicked.parentNode.classList.contains('selected')
    ) {
      return;
    }
    if (count < 2) {
      count++;
      if (count === 1) {
        firstGuess = clicked.parentNode.dataset.name;
        clicked.parentNode.classList.add('selected');
      } else {
        secondGuess = clicked.parentNode.dataset.name;
        clicked.parentNode.classList.add('selected');
      }
      if (firstGuess !== '' && secondGuess !== '') {
        if (firstGuess === secondGuess) {
          setTimeout(match, delay);
          setTimeout(resetGuesses, delay);
        } else {
          setTimeout(resetGuesses, delay);
        }
      }
      previousTarget = clicked;
    }
  });