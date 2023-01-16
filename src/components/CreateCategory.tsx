import { useForm } from "react-hook-form";
import { categoriesState } from "./../atoms";
import { useRecoilState } from "recoil";

interface ICreateCategory {
  category: string;
}

function CreateCategory() {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm<ICreateCategory>();
  const [categories, setCategories] = useRecoilState(categoriesState);
  const handleValid = ({ category }: ICreateCategory) => {
    if (categories.filter((cat) => cat.id == category).length > 0) {
      setError(
        "category",
        {
          message: `Category '${category}' is already exist.`,
        },
        { shouldFocus: true }
      );
    } else {
      setCategories((oldCategories) => [
        { text: category, id: category },
        ...oldCategories,
      ]);
    }
    setValue("category", "");
  };
  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("category", { required: "Please write Category" })}
        placeholder="Write a Category"
      ></input>
      <span>{errors.category ? errors.category.message : null}</span>
      <button>Add</button>
    </form>
  );
}

export default CreateCategory;
