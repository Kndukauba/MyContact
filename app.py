import psycopg2 
from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

def get_db_connection():
    return psycopg2.connect(
        dbname="mydatabase",
        user="postgres",
        password="Pizzapizz12!",
        host="localhost",
        port="5432"
    )

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/add_user', methods=['POST'])
def add_user():
    data = request.json
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("SELECT * FROM Users WHERE email = %s", (data['email'],))
    if cur.fetchone():
        cur.close()
        conn.close()
        return jsonify({"error": "Email already registered"}), 400

    cur.execute("""
        INSERT INTO Users (name, email, age, income_level, currency, risk_tolerance, retirement_age_target)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
    """, (
        data['name'], data['email'], data['age'], data['income_level'],
        data['currency'], data['risk_tolerance'], data['retirement_age_target']
    ))

    conn.commit()
    cur.close()
    conn.close()
    return jsonify({"message": "User added successfully!"})

@app.route('/users', methods=['GET'])
def get_users():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM Users")
    users = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify(users)

@app.route('/delete_users', methods=['DELETE'])
def delete_users():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("DELETE FROM Users")
    conn.commit()
    cur.close()
    conn.close()
    return jsonify({"message": "All users deleted."})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)   

