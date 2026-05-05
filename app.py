from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__,
            static_folder='public',
            static_url_path='')
app.config['JSON_AS_ASCII'] = False
CORS(app)

@app.route('/')
def home():
    return app.send_static_file('index.html')

@app.route('/meals.html')
def meals_page():
    return app.send_static_file('meals.html')

# ===== DATABASE CONNECTION =====
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",  # сложи ако имаш
    database="fittrack"
)

cursor = db.cursor(dictionary=True)

# ===== WORKOUTS =====

@app.route('/api/workouts', methods=['GET'])
def get_workouts():
    cursor.execute("SELECT * FROM workouts")
    return jsonify(cursor.fetchall()), 200, {
        "Content-Type": "application/json; charset=utf-8"
    }


@app.route('/api/workouts', methods=['POST'])
def add_workout():
    data = request.json

    sql = """
    INSERT INTO workouts (workout_name, description, duration_minutes, calories_per_minute)
    VALUES (%s, %s, %s, %s)
    """

    cursor.execute(sql, (
        data['workout_name'],
        data.get('description'),
        data['duration_minutes'],
        data.get('calories_per_minute')
    ))

    db.commit()
    return jsonify({"message": "Workout added"})


@app.route('/api/workouts/<int:id>', methods=['PUT'])
def update_workout(id):
    data = request.json

    sql = """
    UPDATE workouts
    SET workout_name=%s, description=%s, duration_minutes=%s, calories_per_minute=%s
    WHERE workout_id=%s
    """

    cursor.execute(sql, (
        data['workout_name'],
        data['description'],
        data['duration_minutes'],
        data['calories_per_minute'],
        id
    ))

    db.commit()
    return jsonify({"message": "Updated"})


@app.route('/api/workouts/<int:id>', methods=['DELETE'])
def delete_workout(id):
    cursor.execute("DELETE FROM workouts WHERE workout_id=%s", (id,))
    db.commit()
    return jsonify({"message": "Deleted"})


# ===== MEALS =====

@app.route('/api/meals', methods=['GET'])
def get_meals():
    cursor.execute("SELECT * FROM meals")
    return jsonify(cursor.fetchall()), 200, {
        "Content-Type": "application/json; charset=utf-8"
    }


@app.route('/api/meals', methods=['POST'])
def add_meal():
    data = request.json or {}
    meal_name = data.get('meal_name')
    calories = data.get('calories')
    meal_type = data.get('meal_type', 'Снак')
    portion_size = data.get('portion_size', 1.00)

    if not meal_name or calories is None:
        return jsonify({"error": "meal_name and calories are required"}), 400

    sql = """
    INSERT INTO meals (meal_name, calories_per_portion, meal_type, portion_size)
    VALUES (%s, %s, %s, %s)
    """

    cursor.execute(sql, (
        meal_name,
        calories,
        meal_type,
        portion_size
    ))

    db.commit()
    return jsonify({"message": "Meal added"}), 201


@app.route('/api/meals/<int:id>', methods=['DELETE'])
def delete_meal(id):
    cursor.execute("DELETE FROM meals WHERE meal_id=%s", (id,))
    db.commit()
    return jsonify({"message": "Meal deleted"})


# ===== START =====
if __name__ == '__main__':
    app.run(debug=True, port=5000)