const form = document.querySelector('#task-form');
const input = document.querySelector('#task-input');
const list = document.querySelector('#task-list');
const filters = document.querySelector('#filters');
const count = document.querySelector('#count');
const clearBtn = document.querySelector('#clear-completed');

let tasks = [];
let filter = 'all';
let editingId = null;
let nextId = 1;

function render() {
  list.replaceChildren();

  const visible = tasks.filter(task => {
    if (filter === 'active') return !task.done;
    if (filter === 'completed') return task.done;
    return true;
  });

  visible.forEach(task => {
    const li = document.createElement('li');
    li.dataset.id = task.id;
    li.classList.toggle('completed', task.done);

    if (task.id === editingId) {
      const edit = document.createElement('input');
      edit.type = 'text';
      edit.className = 'edit-input';
      edit.value = task.text;
      li.append(edit);
    } else {
      const span = document.createElement('span');
      span.className = 'task-text';
      span.textContent = task.text;

      const del = document.createElement('button');
      del.className = 'delete';
      del.textContent = 'Delete';

      li.append(span, del);
    }
    list.append(li);
  });

  const left = tasks.filter(t => !t.done).length;
  count.textContent = `${left} ${left === 1 ? 'item' : 'items'} left`;

  filters.querySelectorAll('button').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === filter);
  });

  const editInput = list.querySelector('.edit-input');
  if (editInput) {
    editInput.focus();
    editInput.select();
  }
}

form.addEventListener('submit', event => {
  event.preventDefault();
  const text = input.value.trim();
  if (text === '') return;
  tasks.push({ id: nextId++, text, done: false });
  input.value = '';
  input.focus();
  render();
});

list.addEventListener('click', event => {
  if (event.target.matches('.edit-input')) return;
  const li = event.target.closest('li');
  if (!li) return;
  const id = Number(li.dataset.id);

  if (event.target.closest('.delete')) {
    tasks = tasks.filter(t => t.id !== id);
  } else {
    const task = tasks.find(t => t.id === id);
    task.done = !task.done;
  }
  render();
});

list.addEventListener('dblclick', event => {
  const li = event.target.closest('li');
  if (!li || event.target.closest('.delete')) return;
  editingId = Number(li.dataset.id);
  render();
});

list.addEventListener('keydown', event => {
  if (!event.target.matches('.edit-input')) return;
  if (event.key === 'Enter') {
    const text = event.target.value.trim();
    if (text !== '') {
      tasks.find(t => t.id === editingId).text = text;
    }
    editingId = null;
    render();
  } else if (event.key === 'Escape') {
    editingId = null;
    render();
  }
});

filters.addEventListener('click', event => {
  const btn = event.target.closest('button');
  if (!btn) return;
  filter = btn.dataset.filter;
  render();
});

clearBtn.addEventListener('click', () => {
  tasks = tasks.filter(t => !t.done);
  render();
});

render();