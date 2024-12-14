import React, { useState } from 'react';
import PropTypes from 'prop-types';
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
  ThemeProvider,
  createTheme,
} from '@mui/material';
import { Menu as MenuIcon, Brightness4, Brightness7 } from '@mui/icons-material';

const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact'];

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false); // Dark mode state

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  // Drawer 内容
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Simin Wu | Skyrim
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className="flex">
        {/* AppBar 顶部导航栏 */}
<AppBar
  position="fixed"
  sx={{
    backgroundColor: '#1f2937',
    height: 80,
  }}
>
  <Toolbar className="flex justify-between items-center py-8">
    {/* 左侧：MenuIcon */}
    <IconButton
      color="inherit"
      aria-label="open drawer"
      edge="start"
      onClick={handleDrawerToggle}
      sx={{
        display: { xs: 'block', sm: 'none' }, // 仅在小屏显示
      }}
    >
      <MenuIcon />
    </IconButton>

    {/* 标题 */}
    <Typography
      variant="h5"
      component="div"
      sx={{
        ml: 2,
        display: { xs: 'none', sm: 'block' }, // 仅在中等及以上屏幕显示
      }}
    >
      Simin Wu (Skyrim)
    </Typography>

    {/* 普通菜单和暗黑模式切换 */}
    <Box
      sx={{
        display: { xs: 'none', sm: 'flex' },
        alignItems: 'center',
        gap: 2,
      }}
    >
      {/* 普通菜单 */}
      {navItems.map((item) => (
        <Button key={item} sx={{ color: '#fff' }}>
          {item}
        </Button>
      ))}

      {/* 暗黑模式切换按钮 */}
      <IconButton onClick={toggleDarkMode} color="inherit">
        {darkMode ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </Box>

    {/* 移动端暗黑模式按钮 */}
    <IconButton
      onClick={toggleDarkMode}
      color="inherit"
      sx={{
        display: { xs: 'block', sm: 'none' }, // 仅在小屏显示
        ml: 'auto', // 将按钮靠右对齐
      }}
    >
      {darkMode ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  </Toolbar>
</AppBar>



        {/* Drawer 侧边菜单，仅在小屏显示 */}
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
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
        </nav>
      </Box>
    </ThemeProvider>
  );
}

DrawerAppBar.propTypes = {
  window: PropTypes.func,
};

export default DrawerAppBar;
