export const parseFeaturedStreamResponse = (data, state) => {
  if (!data || !data[0] || !data[0].embedCode) {
    return { ...state };
  }

  const [ featuredStream ] = data;

  const srcRegex = /src=\"(.*?)\"/;
  const src = featuredStream.embedCode.match(srcRegex)[1];

  return {
    ...state,
    featuredStream: {
      ...featuredStream,
      src
    }
  };
};
