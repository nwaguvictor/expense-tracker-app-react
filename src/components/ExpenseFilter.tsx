import { categories } from "../constants";

interface Props {
  onSelectCategory: (category: string) => void;
}

const ExpenseFilter = ({ onSelectCategory }: Props) => {
  return (
    <select
      className="form-select form-control"
      onChange={(e) => onSelectCategory(e.target.value)}
    >
      <option value="">All Categories</option>
      {categories.map((category, index) => (
        <option key={index} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
};

export default ExpenseFilter;
