import React, { useState } from "react";
import { FaUser } from "react-icons/fa";

import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import { MdLogout } from "react-icons/md";
import {GoPerson } from "react-icons/go";
import styles from './navbar.module.css'


const UserMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/";
    };


    return (
        <div>
            <IconButton
                aria-controls="user-menu"
                aria-haspopup="true"
                onClick={handleMenuOpen}
                color="inherit"
            >
                <FaUser />
            </IconButton>
            <Menu
                id="user-menu"
                slotProps={{
                    root: { sx: { ".MuiList-root": { padding: 0 } } },
                }}
                disableScrollLock={true}

                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleMenuClose} sx={{color:"green"}}>
                    <a className={styles.menuItem} style={{textDecoration:"none",color:"#0E46A3"}} href="/user"><GoPerson style={{fontSize:"24px"}}/> test</a>
                </MenuItem>
                {/* <MenuItem onClick={handleMenuClose}>
          <Link className={styles.menuItem}  style={{textDecoration:"none"}} href="/user/orders"><GoPackage/> My Orders</Link>
        </MenuItem> */}
                <MenuItem sx={{p:0}} onClick={handleLogout}>
                    <Button
                        color="error"
                        variant="contained"
                        fullWidth
                        sx={{ fontWeight: 600 }}
                    >
                        {" "}
                        <MdLogout style={{ fontSize: "20px" }} />
                    </Button>
                </MenuItem>
            </Menu>
        </div>
    );
};

export default UserMenu;