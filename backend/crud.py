
from sqlalchemy.orm import Session
from sqlalchemy import func
from fastapi import HTTPException
import models, schemas

# Get all expenses, optionally filter by date range
def get_expenses(db: Session, start_date=None, end_date=None):
    query = db.query(models.Expense)
    if start_date:
        query = query.filter(models.Expense.date >= start_date)
    if end_date:
        query = query.filter(models.Expense.date <= end_date)
    return query.order_by(models.Expense.date.desc()).all()

# Get expenses by category
def get_expenses_by_category(db: Session, category: str):
    return db.query(models.Expense).filter(models.Expense.category == category).all()

# Get total spending and breakdown by category
def get_total_and_breakdown(db: Session):
    total = db.query(func.sum(models.Expense.amount)).scalar() or 0
    breakdown = (
        db.query(models.Expense.category, func.sum(models.Expense.amount))
        .group_by(models.Expense.category)
        .all()
    )
    return {
        "total": round(total, 2),
        "breakdown": {cat: round(amount, 2) for cat, amount in breakdown}
    }

# Create a new expense
def create_expense(db: Session, expense: schemas.ExpenseCreate):
    db_expense = models.Expense(**expense.dict())
    db.add(db_expense)
    db.commit()
    db.refresh(db_expense)
    return db_expense

# Update an existing expense
def update_expense(db: Session, expense_id: int, expense: schemas.ExpenseCreate):
    db_expense = db.query(models.Expense).filter(models.Expense.id == expense_id).first()
    if not db_expense:
        raise HTTPException(status_code=404, detail="Expense not found")
    for key, value in expense.dict().items():
        setattr(db_expense, key, value)
    db.commit()
    db.refresh(db_expense)
    return db_expense

# Delete an expense
def delete_expense(db: Session, expense_id: int):
    db_expense = db.query(models.Expense).filter(models.Expense.id == expense_id).first()
    if not db_expense:
        raise HTTPException(status_code=404, detail="Expense not found")
    db.delete(db_expense)
    db.commit()
    return {"message": "Expense deleted"}
