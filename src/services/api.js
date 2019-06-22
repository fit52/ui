import * as format from './format';

export const getPosts = async () => {
  const response = await fetch('/api/site/posts');
  const body = await response.json();
  if (response.status !== 200) {
    throw Error(body.message);
  }
  return body;
};

export const getPage = async pageTitle => {
  const response = await fetch(`/api/site/page/${pageTitle}`);
  let body = null;
  if (response.status !== 404) {
    body = await response.json();
  }
  if (response.status !== 200 && response.status !== 404) {
    throw Error(body.message);
  }
  return body;
};

export const getEvents = async (limit = 50, offset = 0) => {
  const response = await fetch(`/api/run/events?limit=${limit}&offset=${offset}`);
  const body = await response.json();
  if (response.status !== 200) {
    throw Error(body.message);
  }
  return format.formatEvents(body.events);
};

export const getEvent = async id => {
  if (!id) {
    throw Error('Please provide an ID');
  }
  const response = await fetch(`/api/run/events/${id}`);
  const body = await response.json();
  if (response.status !== 200) {
    throw Error(body.message);
  }
  return format.formatEvent(body);
};

export const getRunners = async (limit = 30, offset = 0) => {
  const response = await fetch(`/api/run/runners?limit=${limit}&offset=${offset}`);
  const body = await response.json();
  if (response.status !== 200) {
    throw Error(body.message);
  }
  return {
    ...body,
    runners: body.runners.map(format.formatRunners),
  };
};

export const getRunner = async id => {
  if (!id) {
    throw Error('Please provide an ID');
  }
  const response = await fetch(`/api/run/runners/${id}`);
  const body = await response.json();
  if (response.status !== 200) {
    throw Error(body.message);
  }
  return format.formatRunner(body);
};

export const getRecords = async () => {
  const response = await fetch('/api/run/globalrecords');
  const body = await response.json();
  if (response.status !== 200) {
    throw Error(body.message);
  }
  const records = format.formatRecords(body);
  return records;
};
