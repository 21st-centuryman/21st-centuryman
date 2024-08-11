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


function death() {
  let heath_death = BigInt(Math.pow(10, 100)); // According to wikipedia 10^100 = death of universe
setInterval(() => {
  let countdown = heath_death - BigInt(Math.floor(Date.now() / 1000)); // Javascript does unix timestamp in mili??? ok dumb

  let galactic = countdown / BigInt(225000 * 31556952000);
  let afterGalactic = countdown - (galactic * BigInt(225000 * 31556952000));

  let millenium = afterGalactic / BigInt(31556952000);
  let afterMillenium = afterGalactic - (millenium * BigInt(31556952000));

  let years = afterMillenium / BigInt(31556952);
  let afterYears = afterMillenium - (years * BigInt(31556952));

  let months = afterYears / BigInt(2592000);
  let afterMonths = afterYears - (months * BigInt(2592000));

  let days = afterMonths / BigInt(86400);
  let afterDays = afterMonths - (days * BigInt(86400));

  let hours = afterDays / BigInt(3600);
  let afterHours = afterDays - (hours * BigInt(3600));

  let minutes = afterHours / BigInt(60);
  let seconds = afterHours - (minutes * BigInt(60));

  document.getElementById('heath_death').innerText = `${Number(galactic).toExponential(4).toString()} gal\n${millenium.toString()} millenium\n${years.toString()} years\n${months.toString()} months\n${days.toString()} days\n${hours.toString()}:${minutes.toString()}:${seconds.toString()} seconds`;
}, 1000);
}
death()
