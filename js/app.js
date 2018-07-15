// Függvény deklaráció
var userDatas = [];
var spaceImage = document.createElement('img');
spaceImage.className = 'space-image';
document.querySelector('.one-spaceship').appendChild(spaceImage);
var fallbackImage = 'img/millennium_falcon.jpg'; // default fallback kép

function getData(url, callbackFunc) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      callbackFunc(this);
    }
  };
  xhttp.open('GET', url, true);
  xhttp.send();
}

function successAjax(xhttp) {
  // Innen lesz elérhető a JSON file tartalma, tehát az adatok amikkel dolgoznod kell
  var data = JSON.parse(xhttp.responseText);
  // Innen lehet hívni.
  console.log(data);
  userDatas = data;
  showSpaceShip('Digger');
  var swDiv = document.querySelector('.spaceship-list');
  indexdiv(swDiv);

  var starDiv = document.querySelector('.one-spaceship');
  var swDiv = document.querySelector('.spaceship-list');
  var buttonSearch = document.querySelector('#search-button');
  var searchText = document.querySelector('#search-text');

  // Itt találhatóak a stasztikai kimutatások hívásai.

  document.querySelector('.space').innerHTML = createHTML(data);
  document.querySelector('.Hansolo').innerHTML = 'Egy fős (crew = 1) legénységgel rendelkező hajók darabszáma : ' + count(data) + '<br>' + 'A legnagyobb cargo_capacity-vel rendelkező hajó neve : ' + getMaximumCapacityShip(data) + '<br>' +
    'Az összes hajó utasainak (passengers) összesített száma : ' + allPassengers(data) + '<br>' + 'A leghosszabb(lengthiness) hajó képének a neve : ' + longest(data);

  // A különböző számításokat végző függvények itt kerülnek meghívásra.

  searchforShipByModel(data, searchText);
  bubbleSort(data);
  consumablesNull(data);
  consumablesNullrewriteUnknown(data);
  count(data);
  getMaximumCapacityShip(data);
  spacespec(data, i);
  createHTML(data);
  allPassengers(data);
  longest(data);
  divanddiv(starDiv);

  // A keresőgombhoz kapcsolódó eseményfigyelő.

  buttonSearch.addEventListener('click', function gomb() {
    searchforShipByModel(data, searchText);

    showSpaceShip(document.querySelector('#textbox').value);
    document.querySelector('.spacelist').innerHTML = getMaximumCapacityShip(data);
  })
  document.querySelector('.bar').innerHTML = ' ';
}

getData('json/spaceships.json', successAjax);

// A különböző div elemek gyermekei itt kerülnek kialakításra.

function indexdiv(swDiv) {
  var specification = document.createElement('div');
  specification.classList.add('spec');
  swDiv.appendChild(specification);

  var config = document.createElement('div');
  config.classList.add('config');
  swDiv.appendChild(config);

  var hawk = document.createElement('div');
  hawk.classList.add('Hansolo');
  swDiv.appendChild(hawk);

  var p = document.createElement('div');
  p.classList.add('space');
  swDiv.appendChild(p);

  var para = document.createElement('p');
  var node = document.createTextNode('Star Wars vehicles and spaceships');
  swDiv.appendChild(node);
  var element = document.getElementsByClassName('spacelist');
  swDiv.appendChild(para);
}

function divanddiv(starDiv) {
  var found = document.createElement('div');
  found.classList.add('bar');
  starDiv.appendChild(found);
}

function testImage(url, callBack) {
  var img = new Image();
  img.onload = function () {
    callBack(true);
  };
  img.onerror = function () {
    callBack(false);
  };
  img.src = url;
}

function showSpaceShip(model) {
  var ship = userDatas.filter(function (item) {
    return item.model.indexOf(model) > -1;
  })[0];

  var url = 'img/' + ship.image;
  testImage(url, function (done) {
    if (done) {
      spaceImage.src = url;
    } else {
      spaceImage.src = fallbackImage;
    }
  });
}

// Feladat megoldások

// 1.feladat

function bubbleSort(a, par) {
  var swapped;
  do {
    swapped = false;
    for (var i = 0; i < a.length - 1; i++) {
      if (a[i][par] > a[i + 1][par]) {
        var temp = a[i];
        a[i] = a[i + 1];
        a[i + 1] = temp;
        swapped = true;
      }
    }
  } while (swapped);
}


// 2.Feladat

function consumablesNull(data) {
  var jel = 0;
  for (var i = 0; i < data.length; i++) {
    for (var k in data[i]) {
      if (data[i][k] === null) {
        jel = 1
      }
    }
    if (jel == 1) {
      jel = 0;
      delete data[i]
    }
  }
  return data;
}


// 3. Feladat

function consumablesNullrewriteUnknown(data) {
  for (var i = 0; i < data.length; i++) {
    for (var k in data[i]) {
      if (data[i][k] === null) {
        data[i][k] = "unknown"
      }
    }
  }
  return data;
}


// 5. Feladat I.

function count(data) {
  var onecrew = 0;
  for (var i = 0; i < data.length; i++) {
    if (data[i].crew === "1") {
      onecrew = onecrew + 1;
    }
  }
  return onecrew;
}


// 5. Feladat II.

function getMaximumCapacityShip(data) {
  var biggestship = 0;
  var shipname = "";
  for (var i = 0; i < data.length; i++) {
    if (parseInt(data[i].cargo_capacity) > biggestship) {
      biggestship = parseInt(data[i].cargo_capacity)
      shipname = data[i].model;
    }
  }
  return shipname;
}


// 5. Feladat III.

function allPassengers(data) {
  var fullpass = 0; {
    for (var i = 0; i < data.length; i++) {
      fullpass = fullpass + Number(data[i].passengers);
    }
  }
  return fullpass;
}


// 5. Feladat IV.

function longest(data) {
  var longestship = 0;
  var shipname = "";
  for (var i = 0; i < data.length; i++) {
    if (parseInt(data[i].lengthiness) > longestship) {
      longestship = parseInt(data[i].lengthiness)
      shipname = data[i].image
    }
    return shipname;
  }
}


// 6. Feladat

function searchforShipByModel(data, searchText) {
  var x = 'Nincs találat! ';
  var tomb = document.querySelector('.spaceship-list').children;
  for (var i = 0; i < tomb.length; i++) {
    if (tomb[i].model == searchText) {
      x = tomb[i];
    }
  }
  return x;
}


// A hajók adatait tartalmazó táblázat, képpel illusztrálva.

function spacespec(data, i) {
  var hajoadatok;

  hajoadatok = `<p class="spacelist"><img src="img/${data[i].image}">
    <p>

    Model: ${data[i].model}<br>
    Denomination: ${data[i].denomination}<br>
    Manufacturer: ${data[i].manufacturer}<br>
    Crew: ${data[i].crew}<br>
    Passengers: ${data[i].passengers}<br>
    Cargo capacity: ${data[i].cargo_capacity}<br>
    Max atmosphering speed: ${data[i].max_atmosphering_speed}<br>
    Lengthiness: ${data[i].lengthiness}<br>
    Consumables: ${data[i].consumables}<br>
    Cost in credits: ${data[i].cost_in_credits}</p></p>`;

  return hajoadatok;
}

function createHTML(data) {
  var cols = '';
  for (var i = 0; i < data.length; i++) {
    cols += spacespec(data, i);
  }
  document.querySelector('.config').innerHTML = cols;
}

