const ADD_MESSAGE = 'ADD_MESSAGE';
const SET_CURRENT_PERSON = 'SET_CURRENT_PERSON';
const CLEAR_CURRENT_PERSON = 'CLEAR_CURRENT_PERSON';
let index;

const defaultState = {
  chats: [
    {
      id: 2,
      person: 'Bob',
      messages: [
        ['Здравствуйте', '27.09.2021, 08:03:09', 'userMessage'],
        ['За 10 заберу', '27.09.2021, 08:03:29', 'userMessage'],
      ],
    },
    {
      id: 1,
      person: 'Ben',
      messages: [
        ['Добрый день', '29.09.2021, 12:03:02', 'userMessage'],
        ['Какое время доставки?', '29.09.2021, 12:03:07', 'userMessage'],
        ['по Минску', '29.09.2021, 12:03:11', 'userMessage'],
      ],
    },
  ],
  currentPerson: {},
};

export default function chatReducer(state = defaultState, { type, payload }) {
  switch (type) {
    case SET_CURRENT_PERSON:
      return {
        ...state,
        currentPerson: { id: payload.id, name: payload.name },
      };

    case ADD_MESSAGE:
      index = state.chats.findIndex((chat) => chat.person === payload.person);
      if (index >= 0) {
        state.chats[index].messages.push(payload.message);
        return {
          ...state,
          chats: [...state.chats],
        };
      } else {
        return {
          ...state,
          chats: [
            ...state.chats,
            {
              id: payload.id,
              person: payload.person,
              messages: [payload.message],
            },
          ],
        };
      }

    case CLEAR_CURRENT_PERSON:
      return {
        ...state,
        currentPerson: {},
      };

    default:
      return state;
  }
}

export const addMessage = (id, person, message) => ({
  type: ADD_MESSAGE,
  payload: { id, person, message },
});
export const setCurrentPerson = (id, name) => ({
  type: SET_CURRENT_PERSON,
  payload: { id, name },
});
export const clearCurrentPerson = () => ({
  type: CLEAR_CURRENT_PERSON,
});
