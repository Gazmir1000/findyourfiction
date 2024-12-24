import styles from "./navbar.module.css";
import {Dialog, IconButton, Slide, useMediaQuery} from "@mui/material";
import React, {useState} from "react";
import {MdOutlineLocalMall, MdMenu, MdClose} from "react-icons/md";
import UserMenu from "./UserMenu";
import {LuUser} from "react-icons/lu";
import  logo from '../../utils/images/logo.png'

const Navbar = () => {

    const matches = useMediaQuery("(min-width:1050px)");
    const [openDrawer, setOpenDrawer] = useState(false);

    const toggleDrawer = (open) => {
        setOpenDrawer(open);
    };

    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="down" ref={ref} {...props} />;
    });
    const[token, setToken] = useState(false)

    return (
        <nav>
            <>
                <div className={styles.nav_container}>
                    <div className={styles.navItem}>
                        <a style={{textDecoration: "none"}} href="/">
                            <img src={logo} height={60} width={60} style={{borderRadius:"50%"}} />
                        </a>

                    </div>
                    <div className={styles.right_side}>

                        <div className={styles.navItem}>
                        </div>

                        <div className={styles.navItem}>
                            {token ? (
                                <UserMenu/>
                            ) : (
                                <a style={{textDecoration: "none"}} href="/login">
                                    <IconButton sx={{color: "black", fontSize: "30px"}}>
                                        <LuUser/>
                                    </IconButton>
                                </a>
                            )}
                        </div>

                        {!matches && (
                            <div className={styles.navItem}>
                                <IconButton
                                    onClick={() => toggleDrawer(!openDrawer)}
                                    sx={{color: "black", fontSize: "30px"}}
                                >
                                    {!openDrawer ? <MdMenu/> : <MdClose/>}
                                </IconButton>
                            </div>
                        )}
                    </div>
                    {!matches && openDrawer && (
                        <Dialog
                            sx={{zIndex: 100}}
                            fullScreen
                            open={openDrawer}
                            onClose={() => toggleDrawer(false)}
                            TransitionComponent={Transition}
                        >
                            <div className={styles.mobile_nav}>

                            </div>
                        </Dialog>
                    )}
                </div>
            </>
        </nav>
    );
}
export default Navbar;