import { getSearchSuggestions, getSearchFeeds } from '@/services/tisearch';

export default {
  namespace: 'tisearch',
  state: {
    suggestions: ['sug', 'sugge', 'suggest'],
    feeds: [
      {
        id: '1467812799',
        name: 'scotthamilton',
        content: 'about to file taxes ',
      },
      // {
      //   id: '1467810672',
      //   name: 'quanvu',
      //   content:
      //     "is upset that he can't update his Facebook by texting it... and might cry as a result  School today also. Blah!",
      // },
      {
        id: '1467813782',
        name: 'cozz',
        content: '@ngbscs ... and might cry as a result  School today also. Blah!',
      },
      // {
      //   id: '1467814192',
      //   name: 'mybirch',
      //   content: 'need a hug',
      // },
      // {
      //   id: '1467814142',
      //   name: 'mybirch',
      //   content: 'need a hug',
      // },
      {
        id: '1231',
        type: 'people',
        name: 'Mr Reitze',
        gender: 'male',
        place: 'Netherlands',
        coordinates: {
          latitude: 41.2243,
          longitude: -86.3201,
        },
        interests: [
          'volunteering_at_a_charity_center',
          'baseball',
          'painting',
          'camping',
          'chess',
          'boardgames',
        ],
        cars: ['bense'],
      },
    ],
  },
  effects: {
    *getSearchSuggestions({ payload }, { call, put }) {
      const response = yield call(getSearchSuggestions, payload);
      yield put({
        type: 'saveSearchSuggestions',
        payload: response,
      });
    },

    *getSearchFeeds({ payload }, { call, put }) {
      const response = yield call(getSearchFeeds, payload);
      yield put({
        type: 'saveSearchFeeds',
        payload: response,
      });
    },
  },
  reducers: {
    saveSearchSuggestions(state, action) {
      return {
        ...state,
        suggestions: action.payload,
      };
    },

    saveSearchFeeds(state, action) {
      return {
        ...state,
        feeds: action.payload,
      };
    },
  },
};
