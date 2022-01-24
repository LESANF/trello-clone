import { atom } from 'recoil';

export interface IToDo {
    id: number;
    text: string;
}

interface IToDoState {
    [key: string]: IToDo[];
}

export const toDoState = atom<IToDoState>({
    key: 'toDoState',
    default: {
        TO_DO: [],
        DOING: [],
        DONE: [],
    },
});
