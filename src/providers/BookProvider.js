import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserAxios from '../components/UserAxios';

const BookContext = createContext(undefined);

export const BookProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [singleLoading, setSingleLoading] = useState(true);
  const [bookLoading, setBookLoading] = useState(false);
  const [books, setBooks] = useState({});
  const [book, setBook] = useState({});
  const router = useNavigate();

  const fetchBook = async (page, search) => {
    try {
      setLoading(true);
      let result = await UserAxios.get(
        `/v1/book/myBooks?page=${page}&search=${search}`
      );
      setBooks(result.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const createBook = async (values) => {
    try {
      setBookLoading(true);
      let result = await UserAxios.post('/v1/book/create', values);
      router('/profile');
      setBookLoading(false);
    } catch (err) {
      setBookLoading(false);
    }
  };
  const updateBook = async (values, id) => {
    try {
      setBookLoading(true);
      let result = await UserAxios.patch(`/v1/book/${id}`, values);
      router('/profile');
      setBookLoading(false);
    } catch (err) {
      setBookLoading(false);
    }
  };

  const deleteBook = async (id) => {
    try {
      setLoading(true);
      let result = await UserAxios.delete(`/v1/book/${id}`);
    } catch (err) {
      setLoading(false);
    }
  };
  const getBook = async (id) => {
    try {
      setSingleLoading(true);
      let result = await UserAxios.get(`/v1/book/${id}`);
      setBook(result.data);
      setSingleLoading(false);
    } catch (err) {
      setSingleLoading(false);
    }
  };

  return (
    <BookContext.Provider
      value={{
        createBook,
        bookLoading,
        fetchBook,
        books,
        loading,
        deleteBook,
        getBook,
        book,
        singleLoading,
        updateBook,
      }}
    >
      {' '}
      {children}{' '}
    </BookContext.Provider>
  );
};

export default function useBookContext() {
  const context = useContext(BookContext);

  if (!context) {
    throw new Error('useBookContext must be used within a BookContext');
  }

  return context;
}
