import { getSearchSuggestions, getSearchFeeds } from '@/services/tisearch';

export default {
  namespace: 'tisearch',
  state: {
    suggestions: ['sug', 'sugge', 'suggest'],
    feeds: [],
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
