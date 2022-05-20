import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FolderIcon from '@mui/icons-material/Folder';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Pagination from '@mui/material/Pagination';
import Skeleton from '@mui/material/Skeleton';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import useBookContext from '../providers/BookProvider';
const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function BookList() {
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState('');
  const { fetchBook, books, loading, deleteBook } = useBookContext();
  const router = useNavigate();

  const deleteHandler = (id) => {
    deleteBook(id);
    fetchBook(page, search);
  };

  React.useEffect(() => {
    fetchBook(page, search);
  }, [page, search]);

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752, margin: 'auto' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}
          >
            <TextField
              label="Search input"
              InputProps={{
                type: 'search',
              }}
              value={search}
              onChange={(e) => {
                console.log(e.target.value);
                setSearch(e.target.value);
              }}
            />
            <Button
              color="primary"
              variant="contained"
              onClick={() => router('/create-book')}
            >
              {' '}
              Create Book{' '}
            </Button>
          </div>
          <Demo>
            <List dense={dense}>
              {loading && (
                <Box sx={{ width: 800 }}>
                  <Skeleton height={100} />
                  <Skeleton height={100} />
                  <Skeleton height={100} />
                  <Skeleton height={100} />
                  <Skeleton height={100} />
                </Box>
              )}
              {!loading &&
                books?.data?.map((book) => {
                  return (
                    <ListItem
                      kay={book._id}
                      secondaryAction={
                        <>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => router(`/edit-book/${book._id}`)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => deleteHandler(book._id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </>
                      }
                    >
                      <ListItemAvatar>
                        <Avatar>
                          <FolderIcon />
                        </Avatar>
                      </ListItemAvatar>

                      <p style={{ margin: 0 }}>
                        <ListItemText
                          primary={book.title}
                          secondary={secondary ? 'Secondary text' : null}
                        />
                        <p style={{ margin: 0 }}>{book.description}</p>
                      </p>
                    </ListItem>
                  );
                })}

              <Pagination
                count={Math.ceil(books.total / 5)}
                page={page}
                onChange={(currentPage, page) => {
                  console.log(currentPage.target, page);
                  setPage(page);
                }}
              />
            </List>
          </Demo>
        </Grid>
      </Grid>
    </Box>
  );
}
