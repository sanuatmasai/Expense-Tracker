from pydantic import BaseModel, Field
from datetime import date
from typing import Optional

# Allowed categories for validation
ALLOWED_CATEGORIES = ["Food", "Transport", "Rent", "Utilities", "Other"]

# Shared properties
class ExpenseBase(BaseModel):
    title: str
    amount: float = Field(..., gt=0, description="Amount must be greater than 0")
    category: str = Field(..., description="Must be a valid category")
    date: date

    # Custom validation (optional: could add validator if needed)

# Used when creating a new expense
class ExpenseCreate(ExpenseBase):
    pass

# Used when returning an expense with ID
class Expense(ExpenseBase):
    id: int

    class Config:
        orm_mode = True
