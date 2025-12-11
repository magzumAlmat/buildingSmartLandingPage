
"use client";

import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { Box, Typography, Card, CardMedia, Container, Skeleton } from '@mui/material';
import { ArrowForwardIos as NextArrowIcon, ArrowBackIos as PrevArrowIcon } from '@mui/icons-material';

// Import slick carousel styles
// Note: These styles need to be imported globally, but for the sake of this component, 
// we'll assume they are handled in globals.css or by the user.

const SLIDE_TEXTS = [
  { title: 'Цифровая трансформация', text: 'Ключевые тренды в BIM и openBIM технологиях.' },
  { title: 'Международный опыт', text: 'Выступления ведущих экспертов со всего мира.' },
  { title: 'Награждение победителей', text: 'Церемония BuildingSMART Kazakhstan Awards.' },
  { title: 'Студенческий Кубок', text: 'Поддержка молодых специалистов и инноваций.' },
];

// Custom Arrow Components
const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <Box
      className={className}
      onClick={onClick}
      sx={{
        ...style,
        display: 'block',
        right: 25,
        zIndex: 1,
        '&::before': {
          content: '""',
        },
      }}
    >
      <NextArrowIcon sx={{ color: 'white', fontSize: 30 }} />
    </Box>
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <Box
      className={className}
      onClick={onClick}
      sx={{
        ...style,
        display: 'block',
        left: 25,
        zIndex: 1,
        '&::before': {
          content: '""',
        },
      }}
    >
      <PrevArrowIcon sx={{ color: 'white', fontSize: 30 }} />
    </Box>
  );
};

export default function ImageSlider() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    customPaging: i => (
      <Box
        sx={{
          width: 10,
          height: 10,
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.5)',
          transition: 'background 0.3s',
          '&.slick-active': {
            background: '#6366f1',
          },
        }}
      />
    ),
  };

  useEffect(() => {
    async function fetchImages() {
      try {
        const res = await fetch('/api/images');
        const data = await res.json();
        
        if (data.images && data.images.length > 0) {
          // Shuffle images
          const shuffledImages = [...data.images].sort(() => 0.5 - Math.random());
          
          // Map images to texts. If more images than texts, just use texts looping or limit to texts length.
          // Let's create slides based on available images, reusing texts.
          const newSlides = shuffledImages.slice(0, 5).map((imgSrc, index) => {
             const textContent = SLIDE_TEXTS[index % SLIDE_TEXTS.length];
             return {
               id: index,
               src: imgSrc,
               ...textContent
             };
          });
          setSlides(newSlides);
        }
      } catch (error) {
        console.error('Failed to fetch slider images:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchImages();
  }, []);

  if (!loading && slides.length === 0) {
    return (
      <Box id="slider" sx={{ py: 10, background: 'rgba(30, 41, 59, 0.6)' }}>
        <Container maxWidth="lg">
          <Typography variant="h2" align="center" gutterBottom sx={{ mb: 6 }}>
            Моменты конференции
          </Typography>
          <Box sx={{ textAlign: 'center', py: 8, border: '2px dashed rgba(255,255,255,0.1)', borderRadius: 2 }}>
            <Typography variant="h6" color="text.secondary">
              Слайдер пуст
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
    <Box id="slider" sx={{ py: 10, background: 'rgba(30, 41, 59, 0.6)' }}>
      <Container maxWidth="lg">
        <Typography variant="h2" align="center" gutterBottom sx={{ mb: 6 }}>
          Моменты конференции
        </Typography>
        
        {loading ? (
             <Skeleton variant="rectangular" height={500} sx={{ borderRadius: 3, bgcolor: 'rgba(255,255,255,0.1)' }} />
        ) : (
          <Slider {...settings}>
            {slides.map((slide) => (
              <Box key={slide.id} sx={{ px: 1 }}>
                <Card 
                  sx={{ 
                    borderRadius: 3, 
                    overflow: 'hidden',
                    position: 'relative',
                    height: { xs: 300, md: 500 },
                    bgcolor: '#0f172a', // Dark background for letterboxing
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <CardMedia
                    component="img"
                    image={slide.src}
                    alt={slide.title}
                    sx={{ 
                      height: '100%', 
                      width: '100%',
                      objectFit: 'contain', // Fit image by height/width without cropping
                      filter: 'brightness(0.8)',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      p: 4,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%)', // Darker gradient for text readability
                      color: 'white',
                    }}
                  >
                    <Typography variant="h3" sx={{ fontWeight: 700 }}>
                      {slide.title}
                    </Typography>
                    <Typography variant="h6">
                      {slide.text}
                    </Typography>
                  </Box>
                </Card>
              </Box>
            ))}
          </Slider>
        )}
      </Container>
    </Box>
  );
}

