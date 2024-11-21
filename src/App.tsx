import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import ExpenseList, { Expense } from "./components/ExpenseList";
import ExpenseFilter from "./components/ExpenseFilter";
import ExpenseForm, { FormData } from "./components/ExpenseForm";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const visibleExpenses = selectedCategory
    ? expenses.filter((e) => e.category === selectedCategory)
    : expenses;

  const handleFormSubmit = (data: FormData) => {
    setExpenses([...expenses, { ...data, id: Math.random() * 100 }]);
  };

  return (
    <>
      <h2>My Mini Expense App (V 1.0)</h2>
      <div className="mb-5">
        <ExpenseForm onSubmitForm={handleFormSubmit} />
      </div>
      <div className="mb-3">
        <ExpenseFilter onSelectCategory={(c) => setSelectedCategory(c)} />
      </div>
      <ExpenseList
        expenses={visibleExpenses}
        onDelete={(id) =>
          setExpenses(visibleExpenses.filter((e) => e.id !== id))
        }
      />
    </>
  );
}

export default App;
