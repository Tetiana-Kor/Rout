import { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import * as bookShelfAPI from '../service/bookshelf-api';
import PageHeading from '../component/PageHeading/PageHeading';

export default function BooksView() {
  const { url } = useRouteMatch();
  const [books, setBooks] = useState(null);

  useEffect(() => {
    bookShelfAPI.fetchBooks().then(setBooks);
  }, []);

  return (
    <>
      <PageHeading text="Книги" />

      {books && (
        <ul>
          {books.map(book => (
            <li key={book.id}>
              <Link to={`${url}/${book.id}`}>{book.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
