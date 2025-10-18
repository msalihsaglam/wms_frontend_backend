
function loadPage(page, el) {
  document.getElementById('iframeContent').src = page;
  document.querySelectorAll('.sidebar a').forEach(a => a.classList.remove('active'));
  el.classList.add('active');
}
