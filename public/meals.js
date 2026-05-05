const mealsList = document.getElementById('meals');
const form = document.getElementById('mealForm');
const apiBase = window.location.origin;

function loadMeals() {
  fetch(`${apiBase}/api/meals`)
    .then(res => res.json())
    .then(data => {
      mealsList.innerHTML = '';
      if (data.length === 0) {
        mealsList.innerHTML = '<li class="meal-item" style="justify-content: center; color: #666;"><i class="fas fa-info-circle"></i> Няма добавени храни</li>';
        return;
      }
      data.forEach(m => {
        const li = document.createElement('li');
        li.className = 'meal-item';
        li.innerHTML = `
          <div class="meal-info">
            <h3><i class="fas fa-utensils"></i> ${m.meal_name}</h3>
            <p><i class="fas fa-fire"></i> ${m.calories_per_portion} калории на порция</p>
          </div>
          <div class="meal-actions">
            <button class="btn btn-danger btn-small" onclick="deleteMeal(${m.meal_id})">
              <i class="fas fa-trash"></i> Изтрий
            </button>
          </div>
        `;
        mealsList.appendChild(li);
      });
    })
    .catch(error => {
      console.error('Error loading meals:', error);
      mealsList.innerHTML = '<li class="meal-item" style="justify-content: center; color: #dc3545;"><i class="fas fa-exclamation-triangle"></i> Грешка при зареждане на храните</li>';
    });
}

form.addEventListener('submit', e => {
  e.preventDefault();

  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<span class="loading"></span> Добавяне...';
  submitBtn.disabled = true;

  const meal = {
    meal_name: document.getElementById('meal_name').value,
    calories: document.getElementById('calories').value
  };

  fetch(`${apiBase}/api/meals`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(meal)
  })
  .then(response => {
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  })
  .then(() => {
    form.reset();
    loadMeals();
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  })
  .catch(error => {
    console.error('Error adding meal:', error);
    alert('Грешка при добавяне на храната. Моля, опитайте отново.');
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  });
});

function deleteMeal(id) {
  if (!confirm('Сигурна ли си, че искаш да изтриеш тази храна?')) return;

  fetch(`${apiBase}/api/meals/${id}`, { method: 'DELETE' })
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      loadMeals();
    })
    .catch(error => {
      console.error('Error deleting meal:', error);
      alert('Грешка при изтриване на храната. Моля, опитайте отново.');
    });
}

loadMeals();