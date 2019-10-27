import { getSearchSuggestions, getSearchFeeds } from '@/services/tisearch';
import { message } from 'antd';

export default {
  namespace: 'tisearch',
  state: {
    suggestions: [],
    feeds: {
      data: [],
      type: '',
    },
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
      if (response.code === 204) {
        message.info(`Affected ${response.row_affected} Rows`);
      }

      if (response.code === 0) {
        yield put({
          type: 'saveSearchFeeds',
          payload: response,
        });
      }
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
