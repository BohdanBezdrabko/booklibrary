import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  SelectChangeEvent,
  LinearProgress,
  Tooltip,
  Alert,
} from '@mui/material';
import { Book } from '../../types/book';
import { getBooks } from '../../services/api';
import { readingService } from '../../services/ReadingService';
import BookCover from '../BookCover';

const BookList: React.FC = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [authors, setAuthors] = useState<string[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [selectedAuthor, setSelectedAuthor] = useState<string>('');
  const [readingProgress, setReadingProgress] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Завантажуємо всі книги при першому рендері
  useEffect(() => {
    const loadAllBooks = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Loading all books');
        const booksData = await getBooks();
        console.log('Received books:', booksData);

        if (!Array.isArray(booksData)) {
          throw new Error('Invalid books data received');
        }

        // Зберігаємо всі книги
        setBooks(booksData);
        // Спочатку всі книги відфільтровані
        setFilteredBooks(booksData);

        // Отримуємо унікальні жанри та авторів з усіх книг
        const uniqueGenres = [...new Set(booksData.map((book: Book) => book.genre))] as string[];
        const uniqueAuthors = [...new Set(booksData.map((book: Book) => book.author))] as string[];

        setGenres(uniqueGenres);
        setAuthors(uniqueAuthors);
      } catch (err: any) {
        console.error('Error loading books:', err);
        setError(err.message || 'Failed to load books');
        setBooks([]);
        setFilteredBooks([]);
      } finally {
        setLoading(false);
      }
    };

    loadAllBooks();
  }, []); // Виконуємо тільки при першому рендері
  
  // Фільтруємо книги при зміні фільтрів
  useEffect(() => {
    if (books.length === 0) return;
    
    let result = [...books];
    
    if (selectedGenre) {
      result = result.filter(book => book.genre === selectedGenre);
    }
    
    if (selectedAuthor) {
      result = result.filter(book => book.author === selectedAuthor);
    }
    
    setFilteredBooks(result);
  }, [books, selectedGenre, selectedAuthor]);

  useEffect(() => {
    const loadProgress = async () => {
      try {
        const allProgress = await readingService.getAllProgress();
        const progressMap = Object.entries(allProgress).reduce((acc, [bookId, progress]) => {
          acc[bookId] = progress.progress;
          return acc;
        }, {} as Record<string, number>);
        setReadingProgress(progressMap);
      } catch (error) {
        console.error('Error loading reading progress:', error);
      }
    };

    loadProgress();
  }, []);

  const handleGenreChange = (event: SelectChangeEvent<string>) => {
    setSelectedGenre(event.target.value);
  };

  const handleAuthorChange = (event: SelectChangeEvent<string>) => {
    setSelectedAuthor(event.target.value);
  };

  const handleBookClick = (bookId: string) => {
    navigate(`/book/${bookId}`);
  };

  if (loading) {
    return (
      <Box sx={{ width: '100%', mt: 4 }}>
        <LinearProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 4 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 2 }}>
      <Grid container spacing={3}>
        {/* Sidebar with filters */}
        <Grid item xs={12} md={3} lg={2.5}>
          <Box 
            sx={{
              p: 3,
              borderRadius: 4,
              background: 'linear-gradient(135deg, rgba(142, 36, 170, 0.05) 0%, rgba(0, 229, 255, 0.05) 100%)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              position: 'sticky',
              top: 80,
            }}
          >
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 3, 
                fontWeight: 'bold',
                background: 'linear-gradient(45deg, #8e24aa 30%, #00e5ff 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textAlign: 'center',
              }}
            >
              Фільтри
            </Typography>
            
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>
              Жанр
            </Typography>
            <FormControl 
              fullWidth 
              variant="outlined"
              size="small"
              sx={{ 
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                }
              }}
            >
              <Select
                value={selectedGenre}
                onChange={handleGenreChange}
                displayEmpty
              >
                <MenuItem value="">Всі жанри</MenuItem>
                {genres.map((genre) => (
                  <MenuItem key={genre} value={genre}>
                    {genre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>
              Автор
            </Typography>
            <FormControl 
              fullWidth 
              variant="outlined"
              size="small"
              sx={{ 
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                }
              }}
            >
              <Select
                value={selectedAuthor}
                onChange={handleAuthorChange}
                displayEmpty
              >
                <MenuItem value="">Всі автори</MenuItem>
                {authors.map((author) => (
                  <MenuItem key={author} value={author}>
                    {author}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            {(selectedGenre || selectedAuthor) && (
              <Button 
                fullWidth 
                variant="outlined" 
                color="secondary"
                sx={{ mt: 2, borderRadius: 2 }}
                onClick={() => {
                  setSelectedGenre('');
                  setSelectedAuthor('');
                }}
              >
                Скинути фільтри
              </Button>
            )}
          </Box>
        </Grid>
        
        {/* Main content */}
        <Grid item xs={12} md={9} lg={9.5}>
          {filteredBooks.length === 0 ? (
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '30vh',
              p: 4,
              borderRadius: 4,
              background: 'rgba(0, 0, 0, 0.05)',
            }}>
              <Typography variant="h6" align="center" sx={{ mb: 2 }}>
                Книг не знайдено
              </Typography>
              <Typography variant="body2" align="center" color="text.secondary">
                Спробуйте змінити параметри фільтрації
              </Typography>
            </Box>
          ) : (
            <>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                mb: 3,
                pb: 2,
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
              }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  {filteredBooks.length} {filteredBooks.length === 1 ? 'книга' : 
                    filteredBooks.length > 1 && filteredBooks.length < 5 ? 'книги' : 'книг'}
                </Typography>
              </Box>
              
              <Grid container spacing={3}>
                {filteredBooks.map((book) => (
                  <Grid item key={book.id} xs={12} sm={6} md={6} lg={4}>
                    <Card
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'all 0.3s ease',
                        borderRadius: 4,
                        overflow: 'hidden',
                        background: 'rgba(30, 30, 30, 0.6)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
                        }
                      }}
                      onClick={() => handleBookClick(book.id)}
                    >
                      <Box sx={{ 
                        position: 'relative',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        p: 3,
                        pb: 0,
                        overflow: 'hidden',
                      }}>
                        <Box sx={{ 
                          position: 'relative',
                          width: '85%',
                          mx: 'auto',
                          display: 'flex',
                          justifyContent: 'center',
                          transition: 'transform 0.3s ease',
                          '&:hover': {
                            transform: 'scale(1.05)',
                          }
                        }}>
                          <BookCover
                            title={book.title}
                            author={book.author}
                            subtitle={book.genre}
                            year={book.publicationYear}
                            height={300}
                          />
                        </Box>
                      </Box>
                      
                      <CardContent sx={{ flexGrow: 1, pt: 2 }}>
                        <Typography 
                          variant="h6" 
                          component="div" 
                          align="center"
                          sx={{ 
                            fontWeight: 'bold',
                            mb: 0.5,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                          }}
                        >
                          {book.title}
                        </Typography>
                        
                        <Typography 
                          variant="body2" 
                          color="text.secondary" 
                          align="center"
                          sx={{ mb: 1 }}
                        >
                          {book.author}
                        </Typography>
                        
                        <Box sx={{ 
                          display: 'flex', 
                          justifyContent: 'center', 
                          gap: 1,
                          mb: 2,
                        }}>
                          <Typography 
                            variant="caption" 
                            sx={{
                              display: 'inline-block',
                              bgcolor: 'rgba(142, 36, 170, 0.1)',
                              color: 'primary.light',
                              px: 1.5,
                              py: 0.5,
                              borderRadius: 10,
                              fontWeight: 500,
                            }}
                          >
                            {book.genre}
                          </Typography>
                          
                          {book.publicationYear && (
                            <Typography 
                              variant="caption" 
                              sx={{
                                display: 'inline-block',
                                bgcolor: 'rgba(0, 229, 255, 0.1)',
                                color: 'secondary.light',
                                px: 1.5,
                                py: 0.5,
                                borderRadius: 10,
                                fontWeight: 500,
                              }}
                            >
                              {book.publicationYear}
                            </Typography>
                          )}
                        </Box>
                        
                        {readingProgress[book.id] && (
                          <Box sx={{ mt: 1 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                              <Typography variant="caption" color="text.secondary">
                                Прогрес читання
                              </Typography>
                              <Typography variant="caption" color="primary.light">
                                {Math.round(readingProgress[book.id])}%
                              </Typography>
                            </Box>
                            <LinearProgress
                              variant="determinate"
                              value={readingProgress[book.id]}
                              sx={{
                                height: 6,
                                borderRadius: 3,
                                backgroundColor: 'rgba(142, 36, 170, 0.1)',
                                '& .MuiLinearProgress-bar': {
                                  background: 'linear-gradient(90deg, #8e24aa, #00e5ff)'
                                }
                              }}
                            />
                          </Box>
                        )}
                      </CardContent>
                      
                      <CardActions sx={{ justifyContent: 'center', gap: 1, pb: 3, px: 3 }}>
                        <Button
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBookClick(book.id);
                          }}
                          sx={{
                            borderRadius: 2,
                            flex: 1,
                          }}
                          variant="outlined"
                          color="secondary"
                        >
                          Деталі
                        </Button>
                        <Button
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/read/${book.id}`);
                          }}
                          sx={{
                            borderRadius: 2,
                            flex: 1,
                          }}
                          variant="contained"
                          color="primary"
                        >
                          {readingProgress[book.id] ? 'Продовжити' : 'Читати'}
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default BookList;
