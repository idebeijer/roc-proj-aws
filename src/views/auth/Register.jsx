import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import * as Yup from "yup";
import { useEffect } from "react";
import { emailIsValid } from "../../utils/auth.helper";
import { useFormik } from "formik";
import { Container } from "@mui/system";
import { axiosInstance } from "../../services/axios.service";

export const Register = () => {
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
          "/auth/register",
          JSON.stringify({ email: values.email, password: values.password })
        );
      } catch (error) {
        if (!err?.response) {
          console.log("Something went wrong");
        } else {
          console.log("erro");
        }
      }
    },
  });

  return (
    <>
      <Container maxWidth="sm" sx={{ mt: 12 }}>
        <Paper sx={{ p: 4 }}>
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
              <TextField
                error={Boolean(formik.touched.confirmPassword && formik.errors.confirmPassword)}
                fullWidth
                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                label="Confirm Password"
                name="confirmPassword"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
              />
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sign up
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </>
  );
};
