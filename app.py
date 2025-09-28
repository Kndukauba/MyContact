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


@app.route('/add_account', methods=['POST'])
def add_account():
    data = request.json
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("""
        INSERT INTO Accounts (bank, account_type, account_number, balance, account_currency, interest_rate, credit_limit)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
    """, (
        data['bank'], data['account_type'], data['account_number'],
        data['balance'], data['currency'], data['interest_rate'], data['credit_limit']
    ))
    conn.commit()
    cur.close()
    conn.close()
    return jsonify({"message": "Account added successfully!"})

@app.route('/accounts', methods=['GET'])
def get_accounts():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM Accounts")
    accounts = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify(accounts)

@app.route('/delete_accounts', methods=['DELETE'])
def delete_accounts():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("DELETE FROM Accounts")
    conn.commit()
    cur.close()
    conn.close()
    return jsonify({"message": "All accounts deleted."})


@app.route('/add_transaction', methods=['POST'])
def add_transaction():
    data = request.json
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("""
        INSERT INTO Transactions (amount, txn_type, merchant, description, txn_date, status, payment_method)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
    """, (
        data['amount'], data['txn_type'], data['merchant'],
        data['description'], data['txn_date'], data['status'], data['payment_method']
    ))
    conn.commit()
    cur.close()
    conn.close()
    return jsonify({"message": "Transaction added successfully!"})

@app.route('/transactions', methods=['GET'])
def get_transactions():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM Transactions")
    txns = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify(txns)

@app.route('/delete_transactions', methods=['DELETE'])
def delete_transactions():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("DELETE FROM Transactions")
    conn.commit()
    cur.close()
    conn.close()
    return jsonify({"message": "All transactions deleted."})


@app.route('/add_category', methods=['POST'])
def add_category():
    data = request.json
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("""
        INSERT INTO Categories (category_name, current_income)
        VALUES (%s, %s)
    """, (data['category_name'], data['current_income']))
    conn.commit()
    cur.close()
    conn.close()
    return jsonify({"message": "Category added successfully!"})

@app.route('/categories', methods=['GET'])
def get_categories():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM Categories")
    categories = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify(categories)

@app.route('/delete_categories', methods=['DELETE'])
def delete_categories():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("DELETE FROM Categories")
    conn.commit()
    cur.close()
    conn.close()
    return jsonify({"message": "All categories deleted."})

if __name__ == '__main__':
    app.run(debug=True)
