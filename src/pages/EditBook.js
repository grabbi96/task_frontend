import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import useBookContext from '../providers/BookProvider';

const theme = createTheme();

export default function EditBook() {
  const params = useParams();
  const validationSchema = Yup.object({
    title: Yup.string().required(),
    price: Yup.string().required(),
    description: Yup.string().required(),
  });
  const { updateBook, bookLoading, getBook, book, singleLoading } =
    useBookContext();
  React.useEffect(() => {
    getBook(params.id);
  }, []);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: book.title,
      price: book.price,
      description: book.description,
    },
    validationSchema,
    onSubmit: (values) => {
      updateBook(values, params.id);
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Edit Book{' '}
          </Typography>{' '}
          {!singleLoading && (
            <form onSubmit={formik.handleSubmit}>
              <Box
                sx={{
                  mt: 3,
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      name="title"
                      fullWidth
                      id="title"
                      label="Title"
                      value={formik.values.title}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.title && Boolean(formik.errors.title)
                      }
                      helperText={formik.touched.title && formik.errors.title}
                    />{' '}
                  </Grid>{' '}
                  <Grid item xs={12}>
                    <TextField
                      name="price"
                      fullWidth
                      id="price"
                      label="Price"
                      value={formik.values.price}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.price && Boolean(formik.errors.price)
                      }
                      helperText={formik.touched.price && formik.errors.price}
                    />{' '}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="description"
                      fullWidth
                      id="description"
                      label="Description"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.description &&
                        Boolean(formik.errors.description)
                      }
                      helperText={
                        formik.touched.description && formik.errors.description
                      }
                    />{' '}
                  </Grid>{' '}
                </Grid>{' '}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                  }}
                  disabled={bookLoading}
                >
                  {bookLoading ? 'Loading' : 'Update'}{' '}
                </Button>
              </Box>{' '}
            </form>
          )}
        </Box>{' '}
      </Container>{' '}
    </ThemeProvider>
  );
}
