import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  useMediaQuery,
  useTheme,
  Fade,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import PersonIcon from '@mui/icons-material/Person';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { isAuthenticated, user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    try {
      logout();
      handleUserMenuClose();
      setMobileMenuOpen(false);
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const navItems = [
    { label: 'Головна', path: '/' },
    { label: 'Моя бібліотека', path: '/my-books', requiresAuth: true },
    //{ label: 'Жанри', path: '/genres' },
  ];

  const renderUserSection = () => {
    if (isAuthenticated && user) {
      // User is authenticated
      return isMobile ? null : (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button 
            onClick={handleUserMenuOpen}
            sx={{
              borderRadius: '20px',
              padding: '6px 16px',
              color: 'white',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              },
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Avatar 
              sx={{ 
                width: 30, 
                height: 30,
                bgcolor: 'secondary.main',
                fontSize: '0.9rem',
                boxShadow: '0 0 10px rgba(0, 229, 255, 0.5)',
              }}
            >
              {user.name.charAt(0).toUpperCase()}
            </Avatar>
            <Typography variant="body2">
              {user.name}
            </Typography>
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleUserMenuClose}
            TransitionComponent={Fade}
            PaperProps={{
              elevation: 3,
              sx: {
                minWidth: 180,
                backgroundColor: 'background.paper',
                borderRadius: 2,
                mt: 1,
              },
            }}
          >
            <MenuItem onClick={() => {
              handleUserMenuClose();
              navigate('/profile');
            }}>
              <PersonIcon sx={{ mr: 1, color: 'primary.main' }} />
              Профіль
            </MenuItem>
            <MenuItem onClick={() => {
              handleUserMenuClose();
              navigate('/my-books');
            }}>
              <BookmarkIcon sx={{ mr: 1, color: 'primary.main' }} />
              Мої книги
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              Вийти
            </MenuItem>
          </Menu>
        </Box>
      );
    } else {
      // User is not authenticated
      return isMobile ? null : (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button 
            variant="outlined" 
            color="secondary" 
            onClick={() => navigate('/login')}
            sx={{
              borderRadius: '20px',
              fontWeight: 600,
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            Увійти
          </Button>
          <Button 
            variant="contained" 
            color="secondary" 
            onClick={() => navigate('/register')}
            sx={{
              borderRadius: '20px',
              fontWeight: 600,
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            Реєстрація
          </Button>
        </Box>
      );
    }
  };

  const mobileDrawer = (
    <Drawer
      anchor="right"
      open={mobileMenuOpen}
      onClose={handleMobileMenuToggle}
      PaperProps={{
        sx: {
          width: 250,
          backgroundColor: 'background.paper',
          backgroundImage: 'linear-gradient(rgba(142, 36, 170, 0.05), rgba(0, 229, 255, 0.05))',
        },
      }}
    >
      <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <LocalLibraryIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h6" color="primary.main" fontWeight="bold">
            Онлайн Бібліотека
          </Typography>
        </Box>
        <Divider sx={{ mb: 2 }} />
        
        {isAuthenticated && user && (
          <Box sx={{ mb: 2, p: 2, backgroundColor: 'rgba(142, 36, 170, 0.1)', borderRadius: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              {user.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user.email}
            </Typography>
          </Box>
        )}
        
        <List>
          {navItems.map((item) => {
            if (item.requiresAuth && !isAuthenticated) return null;
            return (
              <ListItem 
                button 
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setMobileMenuOpen(false);
                }}
                sx={{
                  borderRadius: 2,
                  mb: 1,
                  '&:hover': {
                    backgroundColor: 'rgba(142, 36, 170, 0.1)',
                  },
                }}
              >
                <ListItemText primary={item.label} />
              </ListItem>
            );
          })}
        </List>
        
        <Box sx={{ mt: 'auto', display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Divider sx={{ my: 2 }} />
          {isAuthenticated ? (
            <Button 
              variant="outlined" 
              color="primary" 
              onClick={handleLogout}
              fullWidth
              sx={{ borderRadius: 2 }}
            >
              Вийти
            </Button>
          ) : (
            <>
              <Button 
                variant="outlined" 
                color="primary" 
                onClick={() => {
                  navigate('/login');
                  setMobileMenuOpen(false);
                }}
                fullWidth
                sx={{ borderRadius: 2 }}
              >
                Увійти
              </Button>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={() => {
                  navigate('/register');
                  setMobileMenuOpen(false);
                }}
                fullWidth
                sx={{ borderRadius: 2 }}
              >
                Реєстрація
              </Button>
            </>
          )}
        </Box>
      </Box>
    </Drawer>
  );

  return (
    <AppBar 
      position="fixed"
      elevation={scrolled ? 4 : 0}
      sx={{
        background: 'linear-gradient(90deg, rgba(18,18,18,0.95) 0%, rgba(30,30,30,0.95) 100%)',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.3s ease',
        boxShadow: scrolled ? '0 4px 20px rgba(0, 0, 0, 0.3)' : 'none',
        borderBottom: scrolled ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        width: '100%',
        top: 0,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo and site name */}
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center',
            cursor: 'pointer',
            transition: 'transform 0.2s ease',
            '&:hover': { transform: 'scale(1.05)' },
          }}
          onClick={() => navigate('/')}
        >
          <LocalLibraryIcon 
            sx={{ 
              mr: 1, 
              color: 'primary.main',
              filter: 'drop-shadow(0 0 5px rgba(142, 36, 170, 0.5))',
            }} 
          />
          <Typography 
            variant="h6" 
            component="div"
            sx={{ 
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #8e24aa 30%, #00e5ff 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Онлайн Бібліотека
          </Typography>
        </Box>

        {/* Desktop navigation links */}
        {!isMobile && (
          <Box sx={{ display: 'flex', mx: 4, flexGrow: 1 }}>
            {navItems.map((item) => {
              if (item.requiresAuth && !isAuthenticated) return null;
              return (
                <Button 
                  key={item.path}
                  color="inherit" 
                  onClick={() => navigate(item.path)}
                  sx={{
                    mx: 1,
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: '50%',
                      width: '0%',
                      height: '2px',
                      bgcolor: 'secondary.main',
                      transition: 'all 0.3s ease',
                      transform: 'translateX(-50%)',
                    },
                    '&:hover::after': {
                      width: '70%',
                    },
                  }}
                >
                  {item.label}
                </Button>
              );
            })}
          </Box>
        )}

        {/* User section (avatar or login buttons) */}
        {renderUserSection()}

        {/* Mobile menu button */}
        {isMobile && (
          <IconButton 
            edge="end" 
            color="inherit" 
            aria-label="menu"
            onClick={handleMobileMenuToggle}
            sx={{
              color: 'text.primary',
              bgcolor: 'rgba(255, 255, 255, 0.1)',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.2)',
              },
            }}
          >
            <MenuIcon />
          </IconButton>
        )}

        {/* Mobile drawer */}
        {mobileDrawer}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
