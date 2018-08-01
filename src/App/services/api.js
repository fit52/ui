const getPosts = async () => {
  const response = await fetch('/api/site/posts');
  const body = await response.json();
  if (response.status !== 200) throw Error(body.message);
  return body;
};

const getPage = async (pageTitle) => {
  const response = await fetch(`/api/site/page/${pageTitle}`);
  return response.json();
};

export default {
  getPosts,
  getPage,
};
