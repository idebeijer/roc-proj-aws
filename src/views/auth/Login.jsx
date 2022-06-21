import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import AuthContext from "../../contexts/AuthProvider";
import * as Yup from "yup";
import { useEffect } from "react";
import { emailIsValid } from "../../utils/auth.helper";
import { useFormik } from "formik";
import { Container } from "@mui/system";
import { axiosInstance } from "../../services/axios.service";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LoginDiscord } from "@/components/auth/LoginDiscord";

export const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from.pathname || "/";

  const formik = useFormik({
    initialValues: {
      email: "test@test.com",
      password: "test",
      confirmPassword: "test",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").max(255).required("Required"),
      password: Yup.string().min(0).max(255).required("Required"),
      confirmPassword: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axiosInstance.post(
          "/auth/login",
          JSON.stringify({ email: values.email, password: values.password }),
          {
            withCredentials: true,
          }
        );
        const accessToken = response?.data?.accessToken;
        setAuth({ accessToken });
      } catch (err) {
        if (!err?.response) {
          console.log("Something went wrong");
        } else {
          console.log(err);
        }
      }
      // if (from === "/") {
      //   navigate("/dashboard");
      // } else {
      //   navigate(from);
      // }
      navigate("/dashboard");
    },
  });

  return (
    <>
      <Container maxWidth="sm" sx={{ mt: 12 }}>
        <Paper sx={{ p: 4 }}>
          <Box sx={{ mb: 2 }}>
            <LoginDiscord />
          </Box>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                error={Boolean(formik.touched.email && formik.errors.email)}
                fullWidth
                helperText={formik.touched.email && formik.errors.email}
                label="Email"
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              <TextField
                error={Boolean(formik.touched.password && formik.errors.password)}
                fullWidth
                helperText={formik.touched.password && formik.errors.password}
                label="Password"
                name="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sign in
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </>
  );
};
