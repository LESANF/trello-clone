import { atom, selector } from 'recoil';

export const toDoState = atom({
    key: 'toDoState',
    default: ['a', 'b', 'c', 'd', 'e'],
});
