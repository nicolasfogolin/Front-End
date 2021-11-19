import Head from 'next/head';
import { Box, Container, Grid, Pagination } from '@mui/material';
import { ProductListToolbar } from '../components/productos/productos-lista-toolbar';
import { ProductCard } from '../components/productos/producto-card';
import { DashboardLayout } from '../components/dashboard-layout';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'


const Products = () => {

  const [products, setProducts] = useState([]);

  const { JWTToken } = useSelector(state => state.JWTToken);

  useEffect(
    () => {
      fetch('http://localhost:8085/PriceList/GetPriceLists', { 
        method: 'post', 
        headers: new Headers({
          'Authorization': JWTToken, 
          'Content-Type': 'application/json'
        }), 
        body: JSON.stringify({})
      }).then((resp)=>{
        resp.json().then((e)=>{
          if (e.Error != undefined){
            console.log(e.Error);
          }else{
            console.log(e);
            let products = e.PriceLists[0].DetailPriceList.map((c) => {
              return {
                id: c.Id,
                createdAt: c.Product.Descript,
                description: c.Product.Descript,
                media: c.Product.Images[0], //'/static/images/products/product_1.png',
                title: c.Product.Code,
                totalDownloads: c.Product.Quantity
              }
            })
            setProducts(products)
          }
        });
      }).catch((e)=>{
        console.log(e);
      })}
      , []);

  return (
    <>
    <Head>
      <title>
        Productos | Curso UTN React
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
        <ProductListToolbar />
        <Box sx={{ pt: 3 }}>
          <Grid
            container
            spacing={3}
          >
            {products.map((product) => (
              <Grid
                item
                key={product.id}
                lg={4}
                md={6}
                xs={12}
              >
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 3
          }}
        >
          <Pagination
            color="primary"
            count={3}
            size="small"
          />
        </Box>
      </Container>
    </Box>
  </>
  )
};

Products.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Products;
