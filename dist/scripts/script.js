function perfectpixel() {
  var el =  document.getElementById('perfectpixel');
  el.classList.toggle('show');
  el.classList.toggle('bg-index');

}
function monopod() {
  var el =  document.getElementById('perfectpixel');
  el.classList.toggle('show');
  el.classList.toggle('bg-monopod');

}
function grid() {
  var el =  document.getElementById('perfectpixel');
  el.classList.toggle('show');
  el.classList.toggle('bg-grid');

}

document.getElementById("btn--index").addEventListener("click", perfectpixel);

document.getElementById("btn--monopod").addEventListener("click", monopod);

document.getElementById("btn--grid").addEventListener("click", grid);
