import { categoriesState, IToDo, toDoState } from "./../atoms";
import { useSetRecoilState, useRecoilValue } from "recoil";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const categories = useRecoilValue(categoriesState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = {
        text: text,
        id: id,
        category: {
          text: name,
          id: name,
        },
      };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  return (
    <li>
      <span>{text}</span>
      {categories.map((cat) => {
        if(cat.id !== category.id)
        return (
          <button key={cat.id} name={cat.id} onClick={onClick}>
            {cat.text}
          </button>
        );
      })}
    </li>
  );
}

export default ToDo;
