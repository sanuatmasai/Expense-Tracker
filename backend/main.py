from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List, Optional
from fastapi.middleware.cors import CORSMiddleware
from datetime import date
import models, schemas, crud, seed_data
from database import engine, SessionLocal

# Create tables in the database
models.Base.metadata.create_all(bind=engine)
# Insert sample data (only once)
with SessionLocal() as db:
    seed_data.insert_sample_data(db)

# Initialize FastAPI app
app = FastAPI()

# Allow CORS for frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency to get a DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ----------------------
# API Endpoints
# ----------------------

@app.get("/expenses", response_model=List[schemas.Expense])
def read_expenses(start_date: Optional[date] = None, end_date: Optional[date] = None, db: Session = Depends(get_db)):
    return crud.get_expenses(db, start_date, end_date)

@app.get("/expenses/category/{category}", response_model=List[schemas.Expense])
def filter_expenses(category: str, db: Session = Depends(get_db)):
    return crud.get_expenses_by_category(db, category)

@app.get("/expenses/total")
def get_total_and_breakdown(db: Session = Depends(get_db)):
    return crud.get_total_and_breakdown(db)

@app.post("/expenses", response_model=schemas.Expense)
def create_expense(expense: schemas.ExpenseCreate, db: Session = Depends(get_db)):
    return crud.create_expense(db, expense)

@app.put("/expenses/{expense_id}", response_model=schemas.Expense)
def update_expense(expense_id: int, expense: schemas.ExpenseCreate, db: Session = Depends(get_db)):
    return crud.update_expense(db, expense_id, expense)

@app.delete("/expenses/{expense_id}")
def delete_expense(expense_id: int, db: Session = Depends(get_db)):
    return crud.delete_expense(db, expense_id)