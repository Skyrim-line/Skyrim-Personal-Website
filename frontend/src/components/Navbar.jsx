import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  IconButton,
  Typography,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useTheme } from "../context/theme";

const drawerWidth = 240;
const navItems = ["Home", "About", "Contact"];

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const { darkMode, toggleTheme } = useTheme();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        textAlign: "center",
        backgroundColor: darkMode ? "#121212" : "#ffffff", // Drawer背景颜色
        color: darkMode ? "#ffffff" : "#000000", // Drawer文字颜色
        height: "100%",
      }}
    >
      <Typography variant="h6" sx={{ my: 2 }}>
        Simin Wu | Skyrim
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton
              sx={{
                textAlign: "center",
                color: darkMode ? "#ffffff" : "#000000", // 切换文字颜色
              }}
            >
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div>
      <CssBaseline />
      <Box>
        {/* 顶部导航栏 */}
        <AppBar
          position="fixed"
          sx={{
            backgroundColor: darkMode ? "#1f1f1f" : "#ffffff", // 切换背景颜色
            color: darkMode ? "#ffffff" : "#000000", // 切换文字颜色
            height: 80,
          }}
        >
          <Toolbar
            sx={{ display: "flex", justifyContent: "space-between", py: 2 }}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                display: { xs: "block", sm: "none" }, // 小屏显示
              }}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              variant="h5"
              component="div"
              sx={{
                ml: 2,
                display: { xs: "none", sm: "block" }, // 中等屏幕以上显示
              }}
            >
              Simin Wu (Skyrim)
            </Typography>

            <Box
              sx={{
                display: { xs: "none", sm: "flex" },
                alignItems: "center",
                gap: 2,
              }}
            >
              {navItems.map((item) => (
                <Button
                  key={item}
                  sx={{
                    color: darkMode ? "#ffffff" : "#000000", // 按钮文字颜色
                  }}
                >
                  {item}
                </Button>
              ))}

              {/* 暗黑模式切换按钮 */}
              <IconButton
                onClick={toggleTheme}
                sx={{ color: darkMode ? "#ffffff" : "#000000" }}
              >
                {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Box>

            <IconButton
              onClick={toggleTheme}
              sx={{
                color: darkMode ? "#ffffff" : "#000000",
                display: { xs: "block", sm: "none" }, // 小屏显示
                ml: "auto",
              }}
            >
              {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Drawer 侧边菜单 */}
        <nav>
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                backgroundColor: darkMode ? "#121212" : "#ffffff", // Drawer背景颜色
                color: darkMode ? "#ffffff" : "#000000", // Drawer文字颜色
              },
            }}
          >
            {drawer}
          </Drawer>
        </nav>
      </Box>
    </div>
  );
}

DrawerAppBar.propTypes = {
  window: PropTypes.func,
};

export default DrawerAppBar;
