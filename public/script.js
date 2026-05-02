const workoutsList = document.getElementById('workouts');
const form = document.getElementById('workoutForm');

/* ===== LOAD WORKOUTS ===== */
function loadWorkouts() {
  fetch('/api/workouts')
    .then(res => res.json())
    .then(data => {
      workoutsList.innerHTML = '';
      data.forEach(w => {
        const li = document.createElement('li');
        li.innerHTML = `
          <strong>${w.workout_name}</strong>
          (${w.duration_minutes} мин)
          <button onclick="editWorkout(
            ${w.workout_id},
            '${w.workout_name}',
            '${w.description || ''}',
            ${w.duration_minutes},
            ${w.calories_per_minute || 0}
          )">✏️</button>
          <button onclick="deleteWorkout(${w.workout_id})">❌</button>
        `;
        workoutsList.appendChild(li);
      });
    });
}

/* ===== ADD WORKOUT ===== */
form.addEventListener('submit', e => {
  e.preventDefault();

  const workout = {
    workout_name: document.getElementById('name').value,
    description: document.getElementById('description').value,
    duration_minutes: document.getElementById('duration').value,
    calories_per_minute: document.getElementById('calories').value
  };

  fetch('/api/workouts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(workout)
  }).then(() => {
    form.reset();
    loadWorkouts();
  });
});

/* ===== DELETE WORKOUT ===== */
function deleteWorkout(id) {
  if (!confirm('Сигурна ли си, че искаш да изтриеш тази тренировка?')) return;

  fetch(`/api/workouts/${id}`, {
    method: 'DELETE'
  }).then(() => loadWorkouts());
}

/* ===== EDIT WORKOUT ===== */
function editWorkout(id, name, description, duration, calories) {
  const newName = prompt('Име на тренировка:', name);
  if (newName === null) return;

  const newDescription = prompt('Описание:', description);
  if (newDescription === null) return;

  const newDuration = prompt('Минути:', duration);
  if (newDuration === null) return;

  const newCalories = prompt('Калории/минута:', calories);
  if (newCalories === null) return;

  fetch(`/api/workouts/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      workout_name: newName,
      description: newDescription,
      duration_minutes: Number(newDuration),
      calories_per_minute: Number(newCalories)
    })
  }).then(() => loadWorkouts());
}

/* ===== INITIAL LOAD ===== */
loadWorkouts();