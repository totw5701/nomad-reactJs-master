import { atom, selector } from "recoil";

// export enum Categories {
//   "TO_DO" = "TO_DO",
//   "DOING" = "DOING",
//   "DONE" = "DONE",
// }

export interface ICategory {
  text: string;
  id: string;
}

export interface IToDo {
  text: string;
  id: number;
  category: ICategory;
}

export const toDoState = atom<IToDo[]>({
  key: "todo",
  default: [],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category.id === category.id);
  },
});

export const categoriesState = atom<ICategory[]>({
  key: "categories",
  default: [
    { text: "TO_DO", id: "TO_DO" },
    { text: "DOING", id: "DOING" },
    { text: "DONE", id: "DONE" },
  ],
});

export const categoryState = atom<ICategory>({
  key: "category",
  default: { text: "TO_DO", id: "TO_DO" },
});
