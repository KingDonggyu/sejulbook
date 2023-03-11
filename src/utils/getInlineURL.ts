interface GetInlineURLProps {
  baseURL: string;
  query: { [key: string]: unknown };
}

const getInlineURL = ({ baseURL, query }: GetInlineURLProps) => {
  let inlineURL = `${baseURL}?`;

  Object.entries(query).forEach(([key, value]) => {
    inlineURL += `${key}=${value}`;
  });

  return inlineURL;
};

export default getInlineURL;
