import React, { useRef, useState } from "react";
import styles from "./page.module.css";
import { Button, Card, CircularProgress, TextField } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import axiosInstanceAnonymous from "../../api/axiosInstanceAnonymous";


const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const emailRef = useRef();
    const passwordRef = useRef();
    const login = async () => {
        if (email === "") {
            emailRef.current.focus();
            setErrorEmail(true);

            return;
        }
        if (password === "") {
            passwordRef.current.focus();
            setErrorPassword(true);
            return;
        }
        try {
            setLoading(true);
            const data = {
                email: email,
                password: password,
            };
            const res = await axiosInstanceAnonymous.post("/auth/login", data);
            localStorage.setItem("token", res.data.token);
            const decoded = jwtDecode(res.data.token);
            window.location.href = "/";
        } catch (err) {
            console.log(err.response.data);
            if (err.response.status === 500) {
                setError("Internal Server Error");
            } else {
                setError(err.response.data.Message);
            }
            setLoading(false);
        }
    };

    return (
        <div className={styles.main}>
            <Card className={styles.loginCard}>
                <h1>{"login"}</h1>
                <TextField
                    ref={emailRef}
                    value={email}
                    onChange={(e) => {
                        if (errorEmail) {
                            setErrorEmail(false);
                        }
                        setEmail(e.target.value);
                    }}
                    error={errorEmail}
                    className={styles.inputLogin}
                    size="small"
                    label={"email"}
                />
                <TextField
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            login();
                        }
                    }}
                    ref={passwordRef}
                    value={password}
                    onChange={(e) => {
                        if (errorPassword) {
                            setPassword(false);
                        }
                        setPassword(e.target.value);
                    }}
                    error={errorPassword}
                    className={styles.inputLogin}
                    size="small"
                    label={"password"}
                    type="password"
                />
                <Button
                    variant="contained"
                    onClick={login}
                    disabled={loading}
                    className={styles.loginBtn}
                >
                    {loading ? <CircularProgress /> : "login"}
                </Button>
                {error && error != "" && <div className={styles.error}>{error}</div>}
                <div>
                    <span>{"haveAccount"}</span>
                    <a style={{ textDecoration: "none" }} href="register">
                        <Button sx={{ fontWeight: "550", ml: 1, color: "black" }}>
                            {"register"}
                        </Button>
                    </a>
                </div>
            </Card>
        </div>
    );
};

export default Login;