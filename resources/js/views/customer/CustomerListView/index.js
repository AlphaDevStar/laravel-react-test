import React, {useEffect, useState} from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from '../../../components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import data from './data';
import axios from 'axios';
import swal from "sweetalert";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const CustomerListView = () => {

    const classes = useStyles();
    const [customers, setCustomers] = useState([]);

    const loadCustomers = () => {
        axios.get('/api/auth/user/showall')
            .then(response => {
                return response;
            }).then(json => {
            setCustomers(json.data);
        });
    }

    useEffect(() => {
        loadCustomers();
    }, []);

    const deleteUser = (id) => {
        swal({
            title: "Are you sure adsfasdf asdf ds as?",
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
                                // let uusers = customers;
                                // let index = uusers.findIndex(user => user.id === id);
                                // uusers.splice(index, 1);
                                // console.log(uusers);
                                // setCustomers(uusers);
                                loadCustomers();
                                //window.location.href = "/app/customers";
                            }
                            else {
                                //actions.setSubmitting(false);
                                swal("Delete Failed!", json.data.message, "error");
                                //alert(json.data.message);
                            }
                        }).catch(error => {
                            swal("Server Error!", "Connection is failed", "error");
                        //alert("catch");
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
    }

    return (

        <Page
          className={classes.root}
          title="Customers"
        >
            <Container maxWidth={false}>
                <Toolbar/>
                <Box mt={3}>
                    <Results customers={customers} deleteUser={deleteUser}/>
                </Box>
            </Container>
        </Page>
      );
};

export default CustomerListView;
