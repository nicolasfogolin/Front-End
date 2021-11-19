import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { useEffect } from 'react'; 
import * as Yup from 'yup';
import { Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useDispatch } from 'react-redux'
import { signIn, signOut } from '../actions'

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const formik = useFormik({
    
    initialValues: {
      email: 'nfg',
      password: 'samsung'
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        //.email(
        //  'Debería se un email válido')
        .max(255)
        .required(
          'Email es requerido'),
      password: Yup
        .string()
        .max(255)
        .required(
          'Password es requerido')
    }),
    onSubmit: (e) => {
      if (true){
        fetch('http://localhost:8085/Authorization/AuthorizationUser', { 
          method: 'post', 
          headers: new Headers({
            'connectionId': '1bf8f674610b0f3eb6bbb795061807c19b6ef5xz', 
            'Content-Type': 'application/json'
          }), 
          body: JSON.stringify({ Usuario: e.email, Password: e.password })
        }).then((resp)=>{
          resp.json().then((e)=>{
            if (e.Error != undefined){
              
            }else{
              localStorage.setItem('X-Token', e.Data.Token);
              dispatch(signIn(localStorage.getItem('X-Token'), e.Data.sUserNameReal));
              router.push('/');
            }
          });
        }).catch((e)=>{
          console.log(e);
        });
      }
    }
  });

  useEffect(
    () => {
      dispatch(signOut());
      localStorage.removeItem('X-Token');
  },[]);

  return (
    <>
      <Head>
        <title>Login | Curso UTN React</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%'
        }}
      >
        <Container maxWidth="sm">
          <NextLink
            href="/"
            passHref
          >
            <Button
              component="a"
              startIcon={<ArrowBackIcon fontSize="small" />}
            >
              Clientes
            </Button>
          </NextLink>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography
                color="textPrimary"
                variant="h4"
              >
                Ingresar
              </Typography>
            </Box>
            <Box
              sx={{
                pb: 1,
                pt: 3
              }}
            >
              <Typography
                align="center"
                color="textSecondary"
                variant="body1"
              >
                Ingresá en nuestra plataforma interna
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Dirección de Email"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.email}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Ingresar Ahora!
              </Button>
            </Box>
            <Typography
              color="textSecondary"
              variant="body2"
            >
              No tenés una cuenta?
              {' '}
              <NextLink
                href="/registrar"
              >
                <Link
                  to="/register"
                  variant="subtitle2"
                  underline="hover"
                  sx={{
                    cursor: 'pointer'
                  }}
                >
                  Registrarme!
                </Link>
              </NextLink>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Login;
