import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { CustomerListResults } from '../components/clientes/clientes-lista-resultados';
import { CustomerListToolbar } from '../components/clientes/clientes-lista-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';

const Customers = () => (
  <>
    <Head>
      <title>
        Clientes | Curso UTN React
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>
        <CustomerListToolbar />
        <Box sx={{ mt: 3 }}>
          <CustomerListResults />
        </Box>
      </Container>
    </Box>
  </>
);

Customers.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Customers;
