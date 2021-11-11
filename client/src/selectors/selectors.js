import { createSelector } from 'reselect';
const name = (state) => state.chat.currentPerson.name;

export const current = createSelector(name, (person) => person);
