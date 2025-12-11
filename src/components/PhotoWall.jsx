"use client";

import { useState, useEffect } from 'react';
import { Box, Grid, Typography, Card, CardMedia, Container, Skeleton, Dialog, IconButton } from '@mui/material';
import { PhotoCamera as PhotoCameraIcon, Close as CloseIcon } from '@mui/icons-material';

export default function PhotoWall() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    async function fetchPhotos() {
      try {
        const res = await fetch('/api/images');
        const data = await res.json();
        
        if (data.images && data.images.length > 0) {
          // Shuffle and pick up to 15 images
          const shuffled = [...data.images].sort(() => 0.5 - Math.random());
          const selected = shuffled.slice(0, 15);
          setPhotos(selected);
        }
      } catch (error) {
        console.error('Failed to fetch photos:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPhotos();
  }, []);

  const handlePhotoClick = (src) => {
    setSelectedPhoto(src);
  };

  const handleClose = () => {
    setSelectedPhoto(null);
  };

  if (!loading && photos.length === 0) {
    return (
      <Box id="photowall" sx={{ py: 10, background: 'rgba(0, 0, 0, 0.2)' }}>
        <Container maxWidth="lg">
          <Typography variant="h2" align="center" gutterBottom sx={{ mb: 6 }}>
            <PhotoCameraIcon sx={{ fontSize: 40, color: '#ec4899', mr: 2 }} />
            Фото-стена
          </Typography>
          <Box sx={{ textAlign: 'center', py: 8, border: '2px dashed rgba(255,255,255,0.1)', borderRadius: 2 }}>
            <Typography variant="h6" color="text.secondary">
              Галерея пока пуста
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Добавьте фотографии в папку public/images/gallery
            </Typography>
          </Box>
        </Container>
      </Box>
    );
  }

  return (
    <Box id="photowall" sx={{ py: 10, background: 'rgba(0, 0, 0, 0.2)' }}>
      <Container maxWidth="lg">
        <Typography variant="h2" align="center" gutterBottom sx={{ mb: 6 }}>
          <PhotoCameraIcon sx={{ fontSize: 40, color: '#ec4899', mr: 2 }} />
          Фото-стена
        </Typography>
        <Grid container spacing={3} columns={{ xs: 1, sm: 2, md: 4, lg: 4 }}>
          {loading ? (
            // Loading Skeletons
            Array.from(new Array(15)).map((_, index) => (
              <Grid item xs={1} sm={1} md={1} lg={1} key={index}>
                <Skeleton variant="rectangular" height={250} sx={{ borderRadius: 3, bgcolor: 'rgba(255,255,255,0.1)' }} />
              </Grid>
            ))
          ) : (
            photos.map((src, index) => (
              <Grid item xs={1} sm={1} md={1} lg={1} key={index}>
                <Card 
                  onClick={() => handlePhotoClick(src)}
                  sx={{ 
                    borderRadius: 3, 
                    overflow: 'hidden',
                    cursor: 'pointer',
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
                    image={src}
                    alt={`Photo ${index + 1}`}
                    sx={{ objectFit: 'cover' }}
                  />
                </Card>
              </Grid>
            ))
          )}
        </Grid>

        {/* Lightbox Modal */}
        <Dialog 
          open={!!selectedPhoto} 
          onClose={handleClose}
          maxWidth="lg"
          PaperProps={{
            style: {
              backgroundColor: 'transparent',
              boxShadow: 'none',
            },
          }}
        >
          <Box sx={{ position: 'relative', outline: 'none' }}>
            <IconButton
              onClick={handleClose}
              sx={{
                position: 'absolute',
                top: -40,
                right: 0,
                color: 'white',
              }}
            >
              <CloseIcon />
            </IconButton>
            {selectedPhoto && (
              <img 
                src={selectedPhoto} 
                alt="Full size" 
                style={{ 
                  maxWidth: '100%', 
                  maxHeight: '90vh', 
                  borderRadius: '12px',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.5)' 
                }} 
              />
            )}
          </Box>
        </Dialog>
      </Container>
    </Box>
  );
}
