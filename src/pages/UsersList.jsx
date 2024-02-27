import React, { useEffect, useState } from 'react'
import authService from '../services/authService'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import NavBar from '../components/Navbar/Navbar'
import { Button, Chip, Container, Divider } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import Appbar from './../components/Appbar';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}))

function createData (name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein }
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9)
]

const UsersList = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    authService.getAllUsers().then(res => {
      if (res) {
        console.log('users liste', res)
        setUsers(res)
      }
    })
  }, [])
  return (
    <>
      <Appbar />
      <Container maxWidth='xl'>
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 700, marginBottom: '20%', marginTop: '4%' }}
            aria-label='customized table'
          >
            <TableHead>
              <TableRow>
                <StyledTableCell>Nom et prénom</StyledTableCell>
                <StyledTableCell align='right'>Email</StyledTableCell>
                <StyledTableCell align='right'>Role</StyledTableCell>
                <StyledTableCell align='right'>Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map(u => (
                <StyledTableRow key={u._id}>
                  <StyledTableCell component='th' scope='row'>
                    {u.name}
                  </StyledTableCell>
                  <StyledTableCell align='right'>{u.email}</StyledTableCell>
                  <StyledTableCell align='right'>{u.role}</StyledTableCell>
                  <StyledTableCell align='right'>
                    <Button variant='outlined' startIcon={<DeleteIcon />}>
                      Delete
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <Divider>
        <Chip label='Users list' size='small' />
      </Divider>
    </>
  )
}

export default UsersList
