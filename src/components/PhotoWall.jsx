"use client";

import { Box, Grid, Typography, Card, CardMedia, Container } from '@mui/material';
import { PhotoCamera as PhotoCameraIcon } from '@mui/icons-material';

const mockPhotos = [
  { id: 1, src: '/images/photo1.jpg', alt: 'Конференция 2025' },
  { id: 2, src: '/images/photo2.jpg', alt: 'Спикеры' },
  { id: 3, src: '/images/photo3.jpg', alt: 'Награждение' },
  { id: 4, src: '/images/photo4.jpg', alt: 'Участники' },
  { id: 5, src: '/images/photo5.jpg', alt: 'Панельная дискуссия' },
  { id: 6, src: '/images/photo6.jpg', alt: 'Стенд' },
];

export default function PhotoWall() {
  return (
    <Box id="photowall" sx={{ py: 10, background: 'rgba(0, 0, 0, 0.2)' }}>
      <Container maxWidth="lg">
        <Typography variant="h2" align="center" gutterBottom sx={{ mb: 6 }}>
          <PhotoCameraIcon sx={{ fontSize: 40, color: '#ec4899', mr: 2 }} />
          Фото-стена
        </Typography>
        <Grid container spacing={3}>
          {mockPhotos.map((photo, index) => (
            <Grid item xs={12} sm={6} md={4} key={photo.id}>
              <Card 
                sx={{ 
                  borderRadius: 3, 
                  overflow: 'hidden',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'scale(1.03)',
                    boxShadow: '0 10px 30px rgba(99, 102, 241, 0.4)',
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="250"
                  image={photo.src}
                  alt={photo.alt}
                  sx={{ objectFit: 'cover' }}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
        <Typography variant="body2" align="center" sx={{ mt: 4, color: 'text.secondary' }}>
          *Изображения являются примерами.
        </Typography>
      </Container>
    </Box>
  );
}
