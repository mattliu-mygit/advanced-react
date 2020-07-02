import React, { useState } from 'react';
import DataApi from '../DataApi';
import { data } from '../testData';
import ArticleList from './ArticleList';

const api = new DataApi(data);

const App = () => {
  const [articles, setArticles] = useState(api.getArticles());
  const [authors, setAuthors] = useState(api.getAuthors());

  let articleActions = {
    lookupAuthor: (authorId) => authors[authorId],
  };

  return <ArticleList articles={articles} articleActions={articleActions} />;
};

export default App;
