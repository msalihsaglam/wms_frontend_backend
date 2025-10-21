
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

function renderTable(tasks) {
  const tbody = document.querySelector('#taskTable tbody');
  tbody.innerHTML = '';

  if (tasks.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4">Görev bulunamadı.</td></tr>';
    return;
  }

  tasks.forEach(task => {
    let badgeClass = 'priority-low';
    if (task.priority === 'Yüksek') badgeClass = 'priority-high';
    else if (task.priority === 'Orta') badgeClass = 'priority-medium';
    else if (task.priority === 'Düşük') badgeClass = 'priority-low';

    const row = `<tr>
      <td>${task.id}</td>
      <td>${task.source}</td>
      <td>${task.destination}</td>
      <td><span class="priority-badge ${badgeClass}">${task.priority}</span></td>
    </tr>`;
    tbody.insertAdjacentHTML('beforeend', row);
  });
}


