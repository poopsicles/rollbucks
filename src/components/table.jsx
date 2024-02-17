import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import  paidicon from '../assets/icons/paid.svg'
import ellipses from '../assets/icons/ellipsess.svg'
/*import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import ArrowRightIcon from '@radix-ui/react-icons';*/



const styles = {
  paperContainer: {
      backgroundImage: `url(${paidicon})`
  }
}
function createData(name, calories, fat, carbs, svg) {
  return { name, calories, fat, carbs, svg };
}

const rows = [
  createData('01', '#89763', 6.0,'21/05/2023 09:31', {paidicon}),
  createData('02', '#34578', 9.0, '23/06/2023 05:21', {paidicon}),
  createData('03', '#65321', 16.0, '12/02/2022 02:12',{paidicon}),
  createData('04', '#56233', 3.7, '24/02/2022 11:00', {paidicon}),
  createData('05', '#56233', 16.0, '17/08/2022 12:31', {paidicon}),
];

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ 
        minWidth: 650,
        '& .MuiTableCell-root': {
        fontFamily: 'Inter',
        fontWeight: 500,
        fontSize: 12
      },
      borderRadius: 10,
      
    }}  
      aria-label="simple table" >
        <TableHead>
          <TableRow>
            <TableCell align="right" className='opacity-50'>#</TableCell>
            <TableCell align="center" className='opacity-50'>Transaction ID</TableCell>
            <TableCell align="center" className='opacity-50'>Company name</TableCell>
            <TableCell align="center" className='opacity-50'>Payment Date</TableCell>
            <TableCell align="left" className='opacity-50'>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }
            }
            >
              <TableCell component="th" scope="row" align="right">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.calories}</TableCell>
              <TableCell align="center"><div className= 'flex gap-x-3 justify-center items-center'>
                <img src={ ellipses}></img>
                <p> Financial Trade FC</p>
                </div></TableCell>
              <TableCell align="center">{row.carbs}</TableCell>
              <TableCell align="center" className='bg-no-repeat bg-left' style={ styles.paperContainer }></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}