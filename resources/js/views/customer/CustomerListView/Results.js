import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
    Avatar,
    Box,
    Card,
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
    makeStyles, IconButton
} from '@material-ui/core';
import getInitials from '../../../utils/getInitials';
import PersonIcon from "@material-ui/icons/Person";
import VisibilityIcon from "@material-ui/icons/Visibility";
import CreateIcon from "@material-ui/icons/Create";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";
import axios from "axios";
import swal from "sweetalert";

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, customers, deleteUser, ...rest }) => {
  const classes = useStyles();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
    // const [ss, setSS] = useState(customers);
    //
    // useEffect(() => {
    //     setSS(customers);
    // }, [customers]);

    const handleLimitChange = (event) => {
        setLimit(event.target.value);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    // console.log(customers);
    //console.log(ss);

  const onDelete = (id) => {
      //this.props.deleteUser(id);
      /*
      swal({
          title: "Are you sure?",
          text: "Once deleted, you will not be able to recover this!",
          icon: "warning",
          buttons: true,
          dangerMode: true,
      })
          .then((willDelete) => {
              if (willDelete) {
                  axios.post('/api/auth/user/delete', {id: id})
                      .then(json => {
                          if (json.data.success) {
                              swal("Success! Account has been deleted!", {
                                  icon: "success",
                              });
                              // let uusers = ss;
                              // let index = uusers.findIndex(user => user.id === id);
                              // uusers.splice(index, 1);
                              // console.log(uusers);
                              // setSS(uusers);

                              //window.location.href = "/app/customers";
                          }
                          else {
                              //actions.setSubmitting(false);
                              alert(json.data.message);
                          }
                      }).catch(error => {
                      alert("catch");
                      //actions.setSubmitting(false);
                      //values.isSubmitting = false;

                      if (error.response) {

                      }
                      else if (error.request) {

                      } else {

                      }
                  }).finally();

              } else {
                  swal("Delete is canceled!");
              }
          });
          */
  }

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <PerfectScrollbar>
        <Box minWidth={900}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell >
                    No
                </TableCell>
                <TableCell >
                  Name
                </TableCell>
                <TableCell >
                  Email
                </TableCell>
                <TableCell >
                  Registration date
                </TableCell>
                <TableCell>

                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.slice(0, limit).map((customer, key) => (
                <TableRow
                  hover
                  key={key}
                >
                  <TableCell>
                      {page*limit+key+1}
                  </TableCell>
                  <TableCell>
                    <Box
                        alignItems="center"
                        display="flex"
                    >
                        <Typography
                            color="textPrimary"
                            variant="body1"
                        >
                            {customer.name}
                        </Typography>
                    </Box>
                    </TableCell>
                    <TableCell>
                        {customer.email}
                    </TableCell>
                    <TableCell>
                        {moment(customer.created_at).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell>
                        {/*onClick={() => onEdit(customer.id)}*/}
                        <IconButton color="inherit">
                          <Link to={`/app/user/${customer.id}/edit`}>
                            <CreateIcon />

                          </Link>
                        </IconButton>
                        <IconButton color="inherit" onClick={() => deleteUser(customer.id)}>
                            <DeleteSweepIcon />
                        </IconButton>
                    </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={customers.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array.isRequired
};

export default Results;
