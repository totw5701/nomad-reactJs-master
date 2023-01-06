import { useState } from "react";
import { useForm } from "react-hook-form";

// function ToDoList() {
//   const [toDo, setToDo] = useState("");
//   const onChange = (event: React.FormEvent<HTMLInputElement>) => {
//     const {
//       currentTarget: { value },
//     } = event;
//     setToDo(value);
//   };
//   const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     console.log(toDo);
//   }

//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input value={toDo} onChange={onChange} placeholder="Write a to do" />
//         <button>Add</button>
//       </form>
//     </div>
//   );
// }

function ToDoList() {
  const { register, handleSubmit, formState } = useForm();
  const onValid = () => {};
  const onInValid = () => {};
  console.log(formState.errors);
  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid, onInValid)}
      >
        <input
          {...register("username", {
            required: { value: true, message: "required" },
            minLength: { value: 5, message: "minLength is 5" },
          })}
          placeholder="User name"
        />
        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;
