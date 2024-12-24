import React from 'react'
import styles from './page.module.css'
import { Button, Card, CircularProgress, TextField } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axiosInstanceAnonymous from "../../api/axiosInstanceAnonymous";
import { jwtDecode } from "jwt-decode";



const Register = () => {
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required('Required'),
            lastName: Yup.string().required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
            phoneNumber: Yup.string().required('Required'),
            password: Yup.string()
                .min(8, 'Must be at least 8 characters')
                .required('Required'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Required'),
        }),
        onSubmit: values => {
            handleRegister(values)
        },
    });

    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState('')
    const handleRegister = async (values) => {
        setLoading(true)
        const data ={
            "firstname": values.firstName,
            "lastname": values.lastName,
            "email": values.email,
            "phone": values.phoneNumber,
            "password": values.password
        }
        try {
            const res = await axiosInstanceAnonymous.post('/auth/register', data)
            localStorage.setItem('token', res.data.token)
            const decoded = jwtDecode(res.data.token);

            window.location.href = '/'
        } catch (err) {
            console.log(err.response.data)
            if (err.response.status === 500) {
                setError("Internal Server Error")
            } else {
                setError(err.response.data.Message)
            }
            setLoading(false)
        }
    }

    return (
        <div className={styles.main}>
            <Card className={styles.loginCard}>
                <h1>{"register"}</h1>
                <form className={styles.loginCard} onSubmit={formik.handleSubmit}>
                    <TextField
                        className={styles.inputLogin}
                        size='small'
                        label={"firstName"}
                        id="firstName"
                        name="firstName"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                        helperText={formik.touched.firstName && formik.errors.firstName}
                    />
                    <TextField
                        className={styles.inputLogin}
                        size='small'
                        label={"lastName"}
                        id="lastName"
                        name="lastName"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                        helperText={formik.touched.lastName && formik.errors.lastName}
                    />
                    <TextField
                        className={styles.inputLogin}
                        size='small'
                        label={"email"}
                        id="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                    <TextField
                        className={styles.inputLogin}
                        size='small'
                        label={"phoneNumber"}
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formik.values.phoneNumber}
                        onChange={formik.handleChange}
                        error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                        helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}

                    />
                    <TextField
                        className={styles.inputLogin}
                        size='small'
                        label={"password"}
                        id="password"
                        name="password"
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                    <TextField
                        className={styles.inputLogin}
                        size='small'
                        label={"confirmPassword"}
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                        helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                    />

                    <Button variant='contained' type="submit" className={styles.loginBtn}>
                        {
                            loading ? <CircularProgress/> : "register"
                        }
                    </Button>
                    {
                        error && error !== "" && <div className={styles.error}>{error}</div>
                    }
                </form>
                <div>
                    <span>{"alreadyHaveAccount"}</span>
                    <a style={{ textDecoration: "none" }} href="login"><Button sx={{ fontWeight: "550", ml: 1, color: "black" }} >{"login"}</Button></a>
                </div>
            </Card>
        </div>
    )
}

export default Register