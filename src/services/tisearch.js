import request from '@/utils/request';

export async function getSearchSuggestions(query) {
  return request(`/api/search_suggestions?query=${query}`);
}

export async function getSearchFeeds(query) {
  return request(`/api/search_feeds?query=${query}`);
}
