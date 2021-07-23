import { Button } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function App() {
  const classes = useStyles();
  const [row, setRow] = useState([])

  useEffect(() => {
    axios.get('https://reqres.in/api/users?page=1').then(res => {
      setRow(res.data.data)
    })
  }, [])

  function fetchData(page) {
    axios.get(`https://reqres.in/api/users?page=${page}`).then(res => {
      setRow(res.data.data)
    })
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Avatar</TableCell>
              <TableCell  >ID</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">First Name</TableCell>
              <TableCell align="right">Last Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {row.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <Avatar alt="Remy Sharp" src={row.avatar}></Avatar>
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.first_name}</TableCell>
                <TableCell align="right">{row.last_name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button onClick={() => fetchData(1)} variant="contained" color="primary">1</Button>
      <Button onClick={() => fetchData(2)} variant="contained" color="primary">2</Button>
    </div>
  );
}

export default App;
