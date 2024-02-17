import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import profilepic from '../assets/icons/profpic.svg';
import pencil from '../assets/icons/edit.svg'



const styles = {
  paperContainer: {
      backgroundImage: `url(${pencil})`
  }
}
function createData(name, calories, fat, carbs, nextdate) {
  return { name, calories, fat, carbs, nextdate };
}

const rows = [
  createData('Wade Warren', 'Developer', 150.0,'28/02/2023 09:31', '28/03/2023 09:31'),
  createData('Robs Clearson', 'Project Manager', 200.0, '28/02/2023 05:21', '28/03/2023 09:31'),
  createData('Anthony Bush', 'Developer', 150.0, '31/02/2023 02:12','28/03/2023 09:31'),
  createData('Mike Maddson', 'Designer', 137.0, '28/02/2023 11:00', '28/03/2023 09:31'),
  createData('Royy Thomas', 'Intern', 100.0, '31/02/2023 12:31', '28/03/2023 09:31'),
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
            <TableCell align="center" className='opacity-50'>Employee details</TableCell>
            <TableCell align="center" className='opacity-50'>Job Role</TableCell>
            <TableCell align="center" className='opacity-50'>Pay Rate(in ICP)</TableCell>
            <TableCell align="center" className='opacity-50'>Last pay date</TableCell>
            <TableCell align="center" className='opacity-50'>Next pay date</TableCell>
            <TableCell align="center" className='opacity-50'>pay individually</TableCell>
            <TableCell align="center" className='opacity-50'>terminate</TableCell>
            <TableCell align="center" className='opacity-50'></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }
            }
            >
              <TableCell scope="row" align="center">
                <div className= 'flex flex-row gap-x-3 items-center justify-center'>
                    <img src={profilepic} className='w-[50px]'></img>
                    <p> {row.name} </p>
                </div>
              </TableCell>
              <TableCell align="center">{row.calories}</TableCell>
              <TableCell align="center">{row.fat}</TableCell>
              <TableCell align="center">{row.carbs}</TableCell>
              <TableCell align="center">{row.nextdate}</TableCell>
              <TableCell align="center">
                <div className='px-[2px] py-2 bg-green-300 align-middle rounded-xl'>
                    <p className='text-green-400 font-semibold'>Pay</p>
                </div>
              </TableCell>
              <TableCell align="center">
                <div className='px-[2px] py-2 bg-red-300 align-middle rounded-xl'>
                    <p className='text-red-400 font-semibold'> terminate </p>
                </div>
              </TableCell>
              <TableCell className='bg-no-repeat bg-center'>
                <div className= "w-[16px]">
                  <img src={pencil}/>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}