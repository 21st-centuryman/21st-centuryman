document.addEventListener('keydown', function (event) {
  switch (event.key) {
    case '0': window.location.href = '/'; break;
    case '1': window.location.href = '/about'; break;
    case '2': window.location.href = '/showcase'; break;
    case '3': window.location = 'https://blog.calexanderberg.com'; break;
    case '4': window.location.href = '/contact'; break;
    default: break;
  }
});

function deaths(current) {
  let heath_death = BigInt(Math.pow(10, 100)); // According to wikipedia 10^100 = death of universe
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
