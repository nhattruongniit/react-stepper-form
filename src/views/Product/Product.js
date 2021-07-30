import React, { useRef, useState } from 'react';

import Divider from '@material-ui/core/Divider';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import ProductForm from './ProductForm';

function Product() {
  // States
  const [result, setResult] = useState({})

  // Refs
  const productFormRefs = useRef({})

  function onSubmit(e) {
    e.preventDefault();
    setResult(productFormRefs.current.getData())
  }

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Food</h1>
      <br />
      <h3 className="mb-3">Simple</h3>
      
      <ProductForm 
        ref={productFormRefs}
        onSubmit={onSubmit}
      />

      <br />
      <Divider />
      <h3>List</h3>
      Name: {result?.productList?.name} <br /><br />
      Category: {result?.productList?.category}
      <br /><br /><br />
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Order</TableCell>
              <TableCell align="right">Sub Name</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Category</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {result?.productList?.length > 0 ? (
              <>
                {result.productList.map(row => (
                  <TableRow key={row.order}>
                    <TableCell component="th" scope="row">
                      {row.order}
                    </TableCell>
                    <TableCell align="right">
                      {row.subName}
                    </TableCell>
                    <TableCell align="right">
                      {row.price}
                    </TableCell>
                    <TableCell align="right">
                      {row.category}
                    </TableCell>
                  </TableRow>
                ))}
              </>
            ) : (
              <TableRow>
                <TableCell colSpan={4}>no product data</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Product
