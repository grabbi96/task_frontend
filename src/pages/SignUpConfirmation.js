import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import useAuthContext from '../providers/AuthProvider';

const theme = createTheme();

export default function SignUpConfirmation() {
  const params = useParams();
  console.log(params);
  const validationSchema = Yup.object({
    code: Yup.string().required('Code is required'),
  });
  const { signUpLoading, signUpConfirmationHandler } = useAuthContext();
  const formik = useFormik({
    initialValues: {
      code: '',
    },
    validationSchema,
    onSubmit: (values) => {
      signUpConfirmationHandler(values, params.id);
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
          <Avatar
            sx={{
              m: 1,
              bgcolor: 'secondary.main',
            }}
          >
            <LockOutlinedIcon />
          </Avatar>{' '}
          <Typography component="h1" variant="h5">
            Confirm You account you code is {params.code}{' '}
          </Typography>{' '}
          <form onSubmit={formik.handleSubmit}>
            <Box
              sx={{
                mt: 1,
              }}
            >
              <TextField
                name="code"
                fullWidth
                id="code"
                label="Code"
                value={formik.values.code}
                onChange={formik.handleChange}
                error={formik.touched.code && Boolean(formik.errors.code)}
                helperText={formik.touched.code && formik.errors.code}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={signUpLoading}
              >
                {signUpLoading ? 'Loading' : 'Confirm'}
              </Button>
            </Box>{' '}
          </form>{' '}
        </Box>{' '}
        <Copyright
          sx={{
            mt: 8,
            mb: 4,
          }}
        />{' '}
      </Container>{' '}
    </ThemeProvider>
  );
}

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {' '}
      {'Copyright © '}{' '}
      <Link color="inherit" href="https://mui.com/">
        Your Website{' '}
      </Link>{' '}
      {new Date().getFullYear()} {'.'}{' '}
    </Typography>
  );
}
