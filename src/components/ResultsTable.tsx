import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import React from 'react';
import { Dayjs } from 'dayjs';

type ageObj = {
  age: number;
  censusName: string;
  censusDate: Dayjs;
  dateWritten: string;
}

type propsObj = {
  agesData: Array<ageObj>;
}

function ResultsTable(props: propsObj) {
  const agesData = props.agesData;

  const rows: React.ReactElement[] = agesData.map((oneCensus, idx) => {
    return (
      <TableRow
        key={idx}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {oneCensus.censusName}
        </TableCell>
        <TableCell align="right">{oneCensus.dateWritten}</TableCell>
        <TableCell align="right">{oneCensus.age}</TableCell>
      </TableRow>
    )
  });

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Census Name</TableCell>
            <TableCell align="right">Census Date</TableCell>
            <TableCell align="right">Age on Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { rows }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ResultsTable
