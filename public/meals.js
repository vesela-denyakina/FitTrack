const mealsList = document.getElementById('meals');
const form = document.getElementById('mealForm');

function loadMeals() {
  fetch('/api/meals')
    .then(res => res.json())
    .then(data => {
      mealsList.innerHTML = '';
      data.forEach(m => {
        const li = document.createElement('li');
        li.innerHTML = `
          ${m.meal_name} – ${m.calories} kcal
          <button onclick="deleteMeal(${m.id})">❌</button>
        `;
        mealsList.appendChild(li);
      });
    });
}

form.addEventListener('submit', e => {
  e.preventDefault();

  const meal = {
    meal_name: document.getElementById('meal_name').value,
    calories: document.getElementById('calories').value
  };

  fetch('/api/meals', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(meal)
  }).then(() => {
    form.reset();
    loadMeals();
  });
});

function deleteMeal(id) {
  fetch(`/api/meals/${id}`, { method: 'DELETE' })
    .then(() => loadMeals());
}

loadMeals();