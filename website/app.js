// ---------------------------------
// Showcases
// ---------------------------------

// ---------------------------------
// T- heat death of the universe
// ---------------------------------
function deaths(now) {
  const heatDeath = 31_557_600n * 10n ** 100n;
  const current = BigInt(Math.floor(now / 1000)); // Javascript does unix timestamp in mili??? ok dumb
  const time_unit = [
     225n * 31_557_600n * 1_000_000n, // Galactic year (225 million years)
     31_557_600n * 1_000n,           // Millennium
     31_557_600n,                    // Year (365.25 days)
     2_551_392n,                     // Month (29.53 days)
     86_400n,                        // Day
     3_600n,                         // Hour 
     60n,                            // Min
  ];
  let countdown = heatDeath - current;
  const time = time_unit.map((x) => {
    const value = countdown / BigInt(x);
		countdown %= BigInt(x);
    return value;
  });
	document.getElementById('heath_death').innerText = 
   `${time[0].toString().substring(0, 1)}.${time[0].toString().substring(1,2)} x 10^${time[0].toString().substring(1).length} gal
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
    //[ // B
    //  [(grid_size / 2), (grid_size / 2)],
    //  [(grid_size / 2), (grid_size / 2) - 1],
    //  [(grid_size / 2) + 1, (grid_size / 2)],
    //  [(grid_size / 2) - 1, (grid_size / 2)],
    //  [(grid_size / 2) - 1, (grid_size / 2) - 1],
    //  [(grid_size / 2) - 1, (grid_size / 2) + 1],
    //  [(grid_size / 2) + 1, (grid_size / 2) + 1],
    //  [(grid_size / 2), (grid_size / 2) + 2],
    //  [(grid_size / 2) - 1, (grid_size / 2) + 2],
    //  [(grid_size / 2) + 1, (grid_size / 2) + 2],
    //]
    ];

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
      timeoutId = setTimeout(game_of_life, 30);
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



