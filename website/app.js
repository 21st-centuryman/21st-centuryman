// ---------------------------------
// Showcases
// ---------------------------------

// ---------------------------------
// T- heat death of the universe
// ---------------------------------
function deaths(current) {
  let heath_death = BigInt(Math.pow(10, 100) * 31556952); // According to wikipedia 10^100 years = death of universe
	let countdown = heath_death - BigInt(Math.floor(current / 1000)); // Javascript does unix timestamp in mili??? ok dumb
  const unix_time = [
    { value: 225000 * 31556952000, name: 'galactic' },
    { value: 31556952000, name: 'millennium' },
    { value: 31556952, name: 'years' },
    { value: 2592000, name: 'months' },
    { value: 86400, name: 'days' },
    { value: 3600, name: 'hours' },
    { value: 60, name: 'minutes' },
  ];
	let time = unix_time.reduce((acc, unit) => {
		let value = countdown / BigInt(unit.value);
		countdown = countdown - (value * BigInt(unit.value));
		acc.push(Number(value));
		return acc;
	}, []);
	document.getElementById('heath_death').innerText = 
   `${time[0].toExponential(1).replace(/e\+?/, ' x 10^')} gal
    ${time[1]} millenium
    ${time[2]} year(s)
    ${time[3]} month(s)
    ${time[4]} day(s)
    ${time[5]}:${time[6]}:${Number(countdown)}
  `;
}

setInterval(() => {
	deaths(Date.now());
}, 1000);


// ---------------------------------
// Conways game of life
// ---------------------------------
function conways() {
  // Grid initalization stuff
  const grid_size = 50;
  const grid = document.getElementById('grid');
  const start = document.getElementById('start');
  const restart = document.getElementById('restart');
  for (let i = 0; i < grid_size; i++) {
    const row = grid.insertRow(i);
    for (let j = 0; j < grid_size; j++) {
      const cell = row.insertCell(j);
    }
  }

  const directions = [[1, 1], [0, 1], [1, 0], [-1, -1], [-1, 0], [0, -1], [-1, 1], [1, -1]];

  function initial() {
    let list = [[ // L-pentomino
      [(grid_size / 2), (grid_size / 2)],
      [(grid_size / 2), (grid_size / 2) - 1],
      [(grid_size / 2), (grid_size / 2) + 1],
      [(grid_size / 2) + 1, (grid_size / 2) + 1],
      [(grid_size / 2) - 1, (grid_size / 2)],
    ],
    [ // acorn
      [(grid_size / 2) - 2, (grid_size / 2) - 1],
      [(grid_size / 2), (grid_size / 2)],
      [(grid_size / 2) - 3, (grid_size / 2) + 1],
      [(grid_size / 2) - 2, (grid_size / 2) + 1],
      [(grid_size / 2) + 1, (grid_size / 2) + 1],
      [(grid_size / 2) + 2, (grid_size / 2) + 1],
      [(grid_size / 2) + 3, (grid_size / 2) + 1],
    ],
    [ // Diehard
      [(grid_size / 2) - 2, (grid_size / 2)],
      [(grid_size / 2) - 3, (grid_size / 2)],
      [(grid_size / 2) - 2, (grid_size / 2) + 1],
      [(grid_size / 2) + 2, (grid_size / 2) + 1],
      [(grid_size / 2) + 3, (grid_size / 2) + 1],
      [(grid_size / 2) + 4, (grid_size / 2) + 1],
      [(grid_size / 2) + 3, (grid_size / 2) - 1],
    ],
    [ // B
      [(grid_size / 2), (grid_size / 2)],
      [(grid_size / 2), (grid_size / 2) - 1],
      [(grid_size / 2) + 1, (grid_size / 2)],
      [(grid_size / 2) - 1, (grid_size / 2)],
      [(grid_size / 2) - 1, (grid_size / 2) - 1],
      [(grid_size / 2) - 1, (grid_size / 2) + 1],
      [(grid_size / 2) + 1, (grid_size / 2) + 1],
      [(grid_size / 2), (grid_size / 2) + 2],
      [(grid_size / 2) - 1, (grid_size / 2) + 2],
      [(grid_size / 2) + 1, (grid_size / 2) + 2],
    ]];

    let start = list[(Math.floor(Math.random() * list.length))];

    let grid = Array.from({length: grid_size * grid_size}, (_, i) => [Math.floor(i / grid_size), i % grid_size]);
    next_frame(grid, start); // Clear the game

    return start
  }

  function next_frame(vals, next_vals) {
    vals.forEach(val => {
      if (val[0] >= 0 && val[0] < grid_size && val[1] >= 0 && val[1] < grid_size) {
        grid.rows[val[1]].cells[val[0]].classList.remove('filled');
      }
    });

    next_vals.forEach(next_val => {
      if (grid_size > next_val[0] >= 0 && grid_size > next_val[1] >= 0) {
        grid.rows[next_val[1]].cells[next_val[0]].classList.add('filled');
      }
    })
    return next_vals
  }

  function next_values(values) {
    const valuesSet = new Set(values.map(val => `${val[0]},${val[1]}`));
    const neighborsMap = new Map();

    values.forEach(val => {
      directions.forEach(dir => {
        const vals = [val[0] + dir[0],val[1] + dir[1]];
        const within_grid = vals[0] >= 0 && vals[1] >= 0 && vals[0] < grid_size && vals[1] < grid_size;
        const neighbor = `${vals[0]},${vals[1]}`;
        if (!neighborsMap.has(neighbor) && within_grid) {
          neighborsMap.set(neighbor, 0);
        }
        neighborsMap.set(neighbor, neighborsMap.get(neighbor) + 1);
      });
    });

    const nextVals = [];
    neighborsMap.forEach((count, neighbor) => {
      const isAlive = valuesSet.has(neighbor);
      if (count === 3 || (isAlive && count === 2)) {   // Conways rules
        nextVals.push(neighbor.split(',').map(Number));
      }
    });

    return nextVals;
  }

  function game_of_life() {
    values = next_frame(values, next_values(values))
    if (running) {
      timeoutId = setTimeout(game_of_life, 1);
    }
  }

  let values = initial();
  let timeoutId;
  let running = true

  document.getElementById('start').addEventListener('click', () => {
    grid.style.visibility = 'visible';
    start.style.display = 'none';
    restart.style.display = 'inline';
    game_of_life()
  });

  document.getElementById('restart').addEventListener('click', () => {
    running = false;
    clearTimeout(timeoutId); // Clear the previous timeout
    values = initial();
    running = true;
    game_of_life();
  });
}

document.addEventListener('DOMContentLoaded', function() {
  conways();
});



