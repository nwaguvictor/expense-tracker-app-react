import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { categories } from "../constants";

const schema = z.object({
  description: z
    .string({ required_error: "Description field is required" })
    .min(3, { message: "Description must be at least 3 characters" })
    .max(50, { message: "Description must be at most 50 characters" }),
  amount: z
    .number({
      required_error: "Amount field is required",
      invalid_type_error: "Amount field is required",
    })
    .min(0.01, { message: "Amount must be at least 0.01" })
    .max(100_000, { message: "Amount must be at most 100_000" }),
  category: z.enum(categories, {
    errorMap: () => ({ message: "Category is required" }),
  }),
});

export type FormData = z.infer<typeof schema>;

interface Props {
  onSubmitForm: (data: FormData) => void;
}

const ExpenseForm = ({ onSubmitForm }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid, errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmitForm(data);
        reset();
      })}
    >
      <div className="form-group mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <input
          {...register("description")}
          id="description"
          type="text"
          className="form-control"
        />
        {errors.description && (
          <p className="text-danger">{errors.description.message}</p>
        )}
      </div>
      <div className="form-group mb-3">
        <label htmlFor="amount" className="form-label">
          Amount
        </label>
        <input
          {...register("amount", { valueAsNumber: true })}
          id="amount"
          type="number"
          className="form-control"
        />
        {errors.amount && (
          <p className="text-danger">{errors.amount.message}</p>
        )}
      </div>
      <div className="form-group mb-3">
        <label htmlFor="category" className="form-label">
          Category
        </label>
        <select
          {...register("category")}
          id="category"
          className="form-select form-control"
        >
          <option value="">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-danger">{errors.category.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="btn btn-outline-primary"
        onSubmit={(e) => e.preventDefault()}
      >
        Submit
      </button>
    </form>
  );
};

export default ExpenseForm;
