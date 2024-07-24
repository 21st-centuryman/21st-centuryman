document.addEventListener('keydown', function (event) {
  switch (event.key) {
    case '0': window.location.href = '/'; break;
    case '1': window.location.href = '/about'; break;
    case '2': window.location.href = '/showcase'; break;
    case '3': window.location.assign('https://blog.calexanderberg.com'); break;
    case '4': window.location.href = '/contact'; break;
    default: break;
  }
});
