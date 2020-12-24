import { useState, useEffect } from 'react';
import { NavLink, Route, useRouteMatch } from 'react-router-dom';
import * as bookShelfAPI from '../service/bookshelf-api';
import PageHeading from '../component/PageHeading/PageHeading';
import AuthorSubView from './AuthorSubView';

export default function AuthorsView() {
  const { url, path } = useRouteMatch();
  const [authors, setAuthors] = useState(null);

  useEffect(() => {
    bookShelfAPI.fetchAuthors().then(setAuthors);
  }, []);

  return (
    <>
      <PageHeading text="Авторы" />

      {authors && (
        <ul>
          {authors.map(author => (
            <li key={author.id}>
              <NavLink to={`${url}/${author.id}`}>{author.name}</NavLink>
            </li>
          ))}
        </ul>
      )}
      <hr />

      <Route path={`${path}/:authorId`}>
        {authors && <AuthorSubView authors={authors} />}
      </Route>
    </>
  );
}
