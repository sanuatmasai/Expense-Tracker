from sqlalchemy.orm import Session
import models
from datetime import date

# Sample data list
sample_expenses = [
    {"title": "Lunch", "amount": 12.50, "category": "Food", "date": date(2025, 7, 1)},
    {"title": "Bus Ticket", "amount": 2.75, "category": "Transport", "date": date(2025, 7, 2)},
    {"title": "July Rent", "amount": 800.00, "category": "Rent", "date": date(2025, 7, 1)},
    {"title": "Electricity Bill", "amount": 60.00, "category": "Utilities", "date": date(2025, 7, 3)},
    {"title": "Coffee", "amount": 3.50, "category": "Food", "date": date(2025, 7, 4)},
    {"title": "Internet", "amount": 45.00, "category": "Utilities", "date": date(2025, 7, 2)},
]

def insert_sample_data(db: Session):
    # Only insert if table is empty (avoid duplicate entries)
    if db.query(models.Expense).first():
        return

    for exp in sample_expenses:
        expense = models.Expense(**exp)
        db.add(expense)

    db.commit()
    print("✅ Sample data inserted.")
