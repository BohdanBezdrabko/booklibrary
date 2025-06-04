import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Container,
  Grid,
  Button,
  Paper,
  useTheme,
} from '@mui/material';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import { useAuth } from '../context/AuthContext';

const HomePage: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <Container maxWidth="xl">
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          height: '50vh',
          minHeight: '400px',
          borderRadius: 4,
          overflow: 'hidden',
          mb: 6,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(142, 36, 170, 0.7) 0%, rgba(0, 229, 255, 0.7) 100%)',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url('https://source.unsplash.com/random?library,books')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.3,
            zIndex: 0,
          }}
        />
        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            p: 4,
            maxWidth: '800px',
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 'bold',
              color: 'white',
              mb: 2,
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
            }}
          >
            Ласкаво просимо до бібліотеки
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: 'white',
              mb: 4,
              textShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
            }}
          >
            {user ? `Вітаємо, ${user.name}! ` : ''}
            Знаходьте, читайте та насолоджуйтесь вашими улюбленими книгами
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => navigate('/my-books')}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 6,
              fontSize: '1.1rem',
              fontWeight: 'bold',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
              '&:hover': {
                transform: 'translateY(-3px)',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
              },
            }}
          >
            Перейти до всіх книг
          </Button>
        </Box>
      </Box>

      {/* Stats and Feature Overview */}
      <Grid container spacing={4} sx={{ mb: 6 }}>
        <Grid item xs={12} md={6} lg={3}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              borderRadius: 4,
              height: '100%',
              background: 'linear-gradient(135deg, rgba(142, 36, 170, 0.1) 0%, rgba(142, 36, 170, 0.05) 100%)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <LibraryBooksIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
              <Typography variant="h5" fontWeight="bold">
                Бібліотека
              </Typography>
            </Box>
            <Typography color="text.secondary" paragraph>
              Доступ до понад 100 книг різних жанрів та авторів у нашій постійно оновлюваній колекції.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              borderRadius: 4,
              height: '100%',
              background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.1) 0%, rgba(0, 229, 255, 0.05) 100%)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <LocalLibraryIcon color="secondary" sx={{ fontSize: 40, mr: 2 }} />
              <Typography variant="h5" fontWeight="bold">
                Читання
              </Typography>
            </Box>
            <Typography color="text.secondary" paragraph>
              Зручний інтерфейс читання з можливістю налаштування відображення та автоматичним збереженням прогресу.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              borderRadius: 4,
              height: '100%',
              background: 'linear-gradient(135deg, rgba(142, 36, 170, 0.1) 0%, rgba(0, 229, 255, 0.05) 100%)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <BookmarkIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
              <Typography variant="h5" fontWeight="bold">
                Закладки
              </Typography>
            </Box>
            <Typography color="text.secondary" paragraph>
              Зберігайте улюблені книги та створюйте закладки для швидкого доступу до важливих сторінок.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              borderRadius: 4,
              height: '100%',
              background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.1) 0%, rgba(142, 36, 170, 0.05) 100%)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <EqualizerIcon color="secondary" sx={{ fontSize: 40, mr: 2 }} />
              <Typography variant="h5" fontWeight="bold">
                Статистика
              </Typography>
            </Box>
            <Typography color="text.secondary" paragraph>
              Відстежуйте свій прогрес читання та отримуйте рекомендації на основі ваших уподобань.
            </Typography>
          </Paper>
        </Grid>
      </Grid>


    </Container>
  );
};

export default HomePage;
