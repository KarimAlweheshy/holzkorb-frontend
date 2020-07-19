import React, { useState } from 'react';
//import { useFlexSearch } from 'react-use-flexsearch';
//import { Formik, Form, Field } from 'formik';

const SearchBar = () => {
  // const [query, setQuery] = useState('');
  const results = [];
  /*const results = useFlexSearch(query, index, JSON.parse(store), {
    encode: 'extra',
    rtl: true,
  });*/
  return (
    <div>
      {/*<Formik
        initialValues={{ query: '' }}
        onSubmit={(values, { setSubmitting }) => {
          setQuery(
            values.query.slice(-1) === 's'
              ? values.query.slice(0, -1)
              : values.query
          );
          setSubmitting(false);
        }}>
        <Form>
          <Field name="query" />
        </Form>
    </Formik>*/}
      <h1>Results</h1>
      <ul>
        {results.map((result) => (
          <li key={result.id}>{result.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
