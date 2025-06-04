import React, { useMemo } from 'react';
import { Paper, Typography, Box } from '@mui/material';

interface BookCoverProps {
  title: string;
  author: string;
  subtitle?: string;
  publisher?: string;
  publisherLocation?: string;
  year?: number;
  width?: number | string;
  height?: number | string;
}

const BookCover: React.FC<BookCoverProps> = ({
  title,
  author,
  subtitle,
  publisher,
  publisherLocation,
  year,
  width = 300,
  height = 400,
}) => {
  // Generate a unique gradient based on the title
  const coverGradient = useMemo(() => {
    // Generate a deterministic but seemingly random color based on book title
    const generateColor = (seed: string, offset: number = 0): string => {
      let hash = 0;
      for (let i = 0; i < seed.length; i++) {
        hash = seed.charCodeAt(i) + ((hash << 5) - hash);
      }
      hash = (hash + offset) % 360;
      return `hsl(${hash}, 70%, 30%)`;
    };

    const baseColor = generateColor(title);
    const secondColor = generateColor(title, 180);
    return `linear-gradient(135deg, ${baseColor} 0%, #121212 100%)`;
  }, [title]);

  // Generate a different pattern based on book genre
  const patternStyle = useMemo(() => {
    const patterns = [
      // Dots pattern
      {
        background: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '10px 10px',
      },
      // Lines pattern
      {
        background: 'linear-gradient(90deg, transparent 9px, rgba(255,255,255,0.05) 10px)',
        backgroundSize: '10px 10px',
      },
      // Diagonal pattern
      {
        background: 'linear-gradient(45deg, rgba(255,255,255,0.05) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.05) 75%)',
        backgroundSize: '20px 20px',
        backgroundPosition: '0 0, 10px 10px',
      },
    ];
    
    // Use the first character of the title to select a pattern
    const patternIndex = title.charCodeAt(0) % patterns.length;
    return patterns[patternIndex];
  }, [title]);

  return (
    <Paper
      elevation={6}
      sx={{
        width,
        height,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        p: 3,
        backgroundColor: '#121212',
        background: coverGradient,
        borderRadius: 3,
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        transition: 'all 0.3s ease',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          ...patternStyle,
          opacity: 0.5,
          pointerEvents: 'none',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '60%',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 100%)',
          pointerEvents: 'none',
        }
      }}
    >
      <Box 
        sx={{ 
          textAlign: 'center', 
          mt: 2, 
          position: 'relative', 
          zIndex: 1,
          px: 1,
        }}
      >
        <Typography
          variant="h5"
          component="h1"
          sx={{
            fontFamily: '"Quicksand", serif',
            fontWeight: 'bold',
            mb: 1.5,
            color: 'white',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            textShadow: '0 2px 4px rgba(0,0,0,0.5)',
            lineHeight: 1.2,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {title}
        </Typography>

        {subtitle && (
          <Typography
            variant="subtitle1"
            sx={{
              fontFamily: '"Quicksand", serif',
              mb: 1.5,
              color: 'rgba(255,255,255,0.8)',
              fontStyle: 'italic',
              textShadow: '0 2px 4px rgba(0,0,0,0.5)',
              fontSize: '0.85rem',
            }}
          >
            {subtitle}
          </Typography>
        )}
      </Box>

      <Box 
        sx={{ 
          position: 'relative',
          zIndex: 1,
          mt: 'auto',
          background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)',
          p: 2,
          pt: 3,
          borderBottomLeftRadius: 12,
          borderBottomRightRadius: 12,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontFamily: '"Quicksand", serif',
            color: 'white',
            textAlign: 'center',
            fontWeight: 500,
            textShadow: '0 2px 4px rgba(0,0,0,0.5)',
            fontSize: '1rem',
          }}
        >
          {author}
        </Typography>

        {(publisher || year) && (
          <Box sx={{ 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mt: 1,
            gap: 1,
          }}>
            {year && (
              <Typography
                variant="body2"
                sx={{
                  fontFamily: '"Quicksand", serif',
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  padding: '2px 8px',
                  borderRadius: 10,
                  background: 'rgba(0,0,0,0.3)',
                }}
              >
                {year}
              </Typography>
            )}
            
            {publisher && (
              <Typography
                variant="body2"
                sx={{
                  fontFamily: '"Quicksand", serif',
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  padding: '2px 8px',
                  borderRadius: 10,
                  background: 'rgba(0,0,0,0.3)',
                }}
              >
                {publisher}
              </Typography>
            )}
          </Box>
        )}
      </Box>
      
      {/* Decorative elements */}
      <Box 
        sx={{ 
          position: 'absolute',
          top: 10,
          right: 10,
          width: 40,
          height: 40,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)',
          boxShadow: 'inset 0 0 10px rgba(255,255,255,0.2)',
          zIndex: 0,
        }}
      />
      <Box 
        sx={{ 
          position: 'absolute',
          bottom: 20,
          left: 15,
          width: 20,
          height: 20,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)',
          boxShadow: 'inset 0 0 5px rgba(255,255,255,0.1)',
          zIndex: 0,
        }}
      />
    </Paper>
  );
};

export default BookCover;
