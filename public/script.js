const workoutsList = document.getElementById('workouts');
const form = document.getElementById('workoutForm');
const editModal = document.getElementById('editModal');
const editForm = document.getElementById('editForm');
let currentEditId = null;

/* ===== LOAD WORKOUTS ===== */
function loadWorkouts() {
  fetch('http://127.0.0.1:5000/api/workouts')
    .then(res => res.json())
    .then(data => {
      workoutsList.innerHTML = '';
      if (data.length === 0) {
        workoutsList.innerHTML = '<li class="workout-item" style="justify-content: center; color: #666;"><i class="fas fa-info-circle"></i> Няма добавени тренировки</li>';
        return;
      }
      data.forEach(w => {
        const li = document.createElement('li');
        li.className = 'workout-item';
        const totalCalories = w.duration_minutes * (w.calories_per_minute || 0);
        li.innerHTML = `
          <div class="workout-info">
            <h3><i class="fas fa-dumbbell"></i> ${w.workout_name}</h3>
            <p><i class="fas fa-clock"></i> ${w.duration_minutes} минути</p>
            ${w.description ? `<p><i class="fas fa-comment"></i> ${w.description}</p>` : ''}
            ${w.calories_per_minute ? `<p><i class="fas fa-fire"></i> ${totalCalories.toFixed(1)} общо калории (${w.calories_per_minute}/мин)</p>` : ''}
          </div>
          <div class="workout-actions">
            <button class="btn btn-secondary btn-small" onclick="editWorkout(${w.workout_id}, '${w.workout_name}', '${w.description || ''}', ${w.duration_minutes}, ${w.calories_per_minute || 0})">
              <i class="fas fa-edit"></i> Редактирай
            </button>
            <button class="btn btn-danger btn-small" onclick="deleteWorkout(${w.workout_id})">
              <i class="fas fa-trash"></i> Изтрий
            </button>
          </div>
        `;
        workoutsList.appendChild(li);
      });
    })
    .catch(error => {
      console.error('Error loading workouts:', error);
      workoutsList.innerHTML = '<li class="workout-item" style="justify-content: center; color: #dc3545;"><i class="fas fa-exclamation-triangle"></i> Грешка при зареждане на тренировките</li>';
    });
}

/* ===== ADD WORKOUT ===== */
form.addEventListener('submit', e => {
  e.preventDefault();

  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<span class="loading"></span> Добавяне...';
  submitBtn.disabled = true;

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
  })
  .then(response => {
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  })
  .then(() => {
    form.reset();
    loadWorkouts();
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  })
  .catch(error => {
    console.error('Error adding workout:', error);
    alert('Грешка при добавяне на тренировката. Моля, опитайте отново.');
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  });
});

/* ===== DELETE WORKOUT ===== */
function deleteWorkout(id) {
  if (!confirm('Сигурна ли си, че искаш да изтриеш тази тренировка?')) return;

  fetch(`/api/workouts/${id}`, {
    method: 'DELETE'
  })
  .then(response => {
    if (!response.ok) throw new Error('Network response was not ok');
    loadWorkouts();
  })
  .catch(error => {
    console.error('Error deleting workout:', error);
    alert('Грешка при изтриване на тренировката. Моля, опитайте отново.');
  });
}

/* ===== EDIT WORKOUT ===== */
function editWorkout(id, name, description, duration, calories) {
  currentEditId = id;
  document.getElementById('editName').value = name;
  document.getElementById('editDescription').value = description;
  document.getElementById('editDuration').value = duration;
  document.getElementById('editCalories').value = calories;
  editModal.style.display = 'block';
}

function closeModal() {
  editModal.style.display = 'none';
  currentEditId = null;
  editForm.reset();
}

// Close modal when clicking outside
window.onclick = function(event) {
  if (event.target == editModal) {
    closeModal();
  }
}

editForm.addEventListener('submit', e => {
  e.preventDefault();

  const submitBtn = editForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<span class="loading"></span> Запазване...';
  submitBtn.disabled = true;

  const updatedWorkout = {
    workout_name: document.getElementById('editName').value,
    description: document.getElementById('editDescription').value,
    duration_minutes: Number(document.getElementById('editDuration').value),
    calories_per_minute: Number(document.getElementById('editCalories').value)
  };

  fetch(`/api/workouts/${currentEditId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedWorkout)
  })
  .then(response => {
    if (!response.ok) throw new Error('Network response was not ok');
    closeModal();
    loadWorkouts();
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  })
  .catch(error => {
    console.error('Error updating workout:', error);
    alert('Грешка при обновяване на тренировката. Моля, опитайте отново.');
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  });
});

/* ===== INITIAL LOAD ===== */
loadWorkouts();