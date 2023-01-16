import CreateToDo from "./CreateToDo";
import { useRecoilState, useRecoilValue } from "recoil";
import { categoriesState, categoryState, ICategory, toDoState } from "../atoms";
import ToDo from "./ToDo";
import { toDoSelector } from "./../atoms";
import CreateCategory from "./CreateCategory";

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const [categories, setCategories] = useRecoilState(categoriesState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory({
      text: event.currentTarget.value,
      id: event.currentTarget.value
    });
  };
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <form>
        <select value={category.text} onInput={onInput}>
          {categories.map((category:ICategory) => (
            <option key={category.id} value={category.id}>{category.text}</option>
          ))}
        </select>
      </form>
      <CreateCategory />
      <CreateToDo />
      <hr />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}

export default ToDoList;
