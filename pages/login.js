import {
  Button,
  Link,
  List,
  ListItem,
  TextField,
  Typography,
} from "@material-ui/core";
import NextLink from "next/link";
import React,{useContext, useState, useEffect} from "react";
import Layout from "../components/Layout";
import useStyles from "../utils/styles";
import axios from "axios";
import { Store } from "../utils/Store";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
function Login() {
  const router = useRouter();
  const {redirect} = router.query
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  useEffect(() => {
    if(userInfo) {
      router.push('/')
    }
  }, []);

  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/users/login", {
        email,
        password,
      });
      dispatch({type:'USER_LOGIN', payload : data })
      Cookies.set('userInfo',data)
      router.push(redirect || '/')
    } catch (err) {
        alert(err.response.data ? err.response.data.message : err.message);
    }
  };
  return (
    <div>
      <Layout title="Login">
        <form onSubmit={submitHandler} className={classes.form}>
          <Typography component="h1" variant="h1">
            Login
          </Typography>
          <List>
            <ListItem>
              <TextField
                variant="outlined"
                fullWidth
                id="email"
                label="Email"
                inputProps={{ type: "email" }}
                onChange={(e) => setEmail(e.target.value)}
              ></TextField>
            </ListItem>
            <ListItem>
              <TextField
                variant="outlined"
                fullWidth
                id="password"
                label="Password"
                inputProps={{ type: "password" }}
                onChange={(e) => setPassword(e.target.value)}
              ></TextField>
            </ListItem>
            <ListItem>
              <Button
                variant="contained"
                type="submit"
                fullWidth
                color="primary"
              >
                Login
              </Button>
            </ListItem>
            <ListItem>
              Don't have an account? &nbsp;
              <NextLink href="/register" passHref>
                <Link>Register</Link>
              </NextLink>
            </ListItem>
          </List>
        </form>
      </Layout>
    </div>
  );
}

export default Login;
