import { formatRunner, formatEvent } from './format';

export const getPosts = async () => {
  const response = await fetch('/api/site/posts');
  const body = await response.json();
  if (response.status !== 200) {
    throw Error(body.message);
  }
  return body;
};

export const getPage = async (pageTitle) => {
  const response = await fetch(`/api/site/page/${pageTitle}`);
  const body = response.json();
  if (response.status !== 200) {
    throw Error(body.message);
  }
  return body;
};

export const getEvents = async (limit = 10) => {
  const response = await fetch(`/api/run/events?limit=${limit}`);
  const body = response.json();
  if (response.status !== 200) {
    throw Error(body.message);
  }
  return body;
};

export const getEvent = async (id) => {
  if (!id) {
    throw Error('Please provide an ID');
  }
  const response = await fetch(`/api/run/events/${id}`);
  const body = await response.json();
  if (response.status !== 200) {
    throw Error(body.message);
  }
  return formatEvent(body);
};

export const getRunner = async (id) => {
  if (!id) {
    throw Error('Please provide an ID');
  }
  const response = await fetch(`/api/run/runners/${id}`);
  const body = await response.json();
  if (response.status !== 200) {
    throw Error(body.message);
  }
  return formatRunner(body);
};

export const getRecords = async () => {
  const response = await fetch('/api/run/globalrecords');
  const body = await response.json();
  if (response.status !== 200) {
    throw Error(body.message);
  }
  return body;
};
