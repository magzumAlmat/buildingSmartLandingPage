"use client";

import React from "react";
import Slider from "react-slick";
import { Box, Typography, Card, CardMedia, Container } from '@mui/material';
import { ArrowForwardIos as NextArrowIcon, ArrowBackIos as PrevArrowIcon } from '@mui/icons-material';

// Import slick carousel styles
// Note: These styles need to be imported globally, but for the sake of this component, 
// we'll assume they are handled in globals.css or by the user.

const mockSlides = [
  { id: 1, title: 'Цифровая трансформация', text: 'Ключевые тренды в BIM и openBIM технологиях.', src: '/images/slide1.jpg' },
  { id: 2, title: 'Международный опыт', text: 'Выступления ведущих экспертов со всего мира.', src: '/images/slide2.jpg' },
  { id: 3, title: 'Награждение победителей', text: 'Церемония BuildingSMART Kazakhstan Awards 2025.', src: '/images/slide3.jpg' },
  { id: 4, title: 'Студенческий Кубок', text: 'Поддержка молодых специалистов и инноваций.', src: '/images/slide4.jpg' },
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

  return (
    <Box id="slider" sx={{ py: 10, background: 'rgba(30, 41, 59, 0.6)' }}>
      <Container maxWidth="lg">
        <Typography variant="h2" align="center" gutterBottom sx={{ mb: 6 }}>
          Моменты конференции
        </Typography>
        <Slider {...settings}>
          {mockSlides.map((slide) => (
            <Box key={slide.id} sx={{ px: 1 }}>
              <Card 
                sx={{ 
                  borderRadius: 3, 
                  overflow: 'hidden',
                  position: 'relative',
                  height: { xs: 300, md: 500 },
                }}
              >
                <CardMedia
                  component="img"
                  image={slide.src}
                  alt={slide.title}
                  sx={{ 
                    height: '100%', 
                    objectFit: 'cover',
                    filter: 'brightness(0.6)',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    p: 4,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)',
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
      </Container>
    </Box>
  );
}
