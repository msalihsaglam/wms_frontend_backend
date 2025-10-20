
function loadPage(page, el) {
  document.getElementById('iframeContent').src = page;
  document.querySelectorAll('.sidebar a').forEach(a => a.classList.remove('active'));
  el.classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('toggleBtn');
  const sidebar = document.getElementById('sidebar');
  toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
  });
});

function openModal() {
  document.getElementById('taskModal').style.display = 'block';
}

function closeModal() {
  document.getElementById('taskModal').style.display = 'none';
  document.getElementById('taskId').value = '';
  document.getElementById('taskSource').value = '';
  document.getElementById('taskDestination').value = '';
}

function addTask() {
  const id = document.getElementById('taskId').value.trim();
  const source = document.getElementById('taskSource').value.trim();
  const destination = document.getElementById('taskDestination').value.trim();
  const priority = document.getElementById('taskPriority').value;

  if (!id || !source || !destination) {
    alert("Lütfen tüm alanları doldurun.");
    return;
  }

  allTasks.push({ id, source, destination, priority });
  renderTable(allTasks);
  closeModal();
}


