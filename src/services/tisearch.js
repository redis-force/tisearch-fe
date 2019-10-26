import qs from 'qs';
import request from '@/utils/request';

export async function getSearchSuggestions(params) {
  return request(`/api/search_suggestions?${qs.stringify(params)}`);
}

export async function getSearchFeeds(params) {
  return request(`/api/v1/search?${qs.stringify(params)}`);
}
