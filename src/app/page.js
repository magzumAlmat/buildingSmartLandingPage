"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Alert,
  Chip,
  Paper,
  List,
  ListItem,
  useTheme,
  useMediaQuery,
  Link,
  IconButton,
  Drawer,
} from "@mui/material";
import {
  LocationOn as LocationIcon,
  Event as EventIcon,
  Phone as PhoneIcon,
  People as PeopleIcon,
  Menu as MenuIcon,
  Forum as ForumIcon,
  AutoStories as AutoStoriesIcon,
  Construction as ConstructionIcon,
  Public as PublicIcon,
  AccountBalance as AccountBalanceIcon,
  School as SchoolIcon,
  Business as BusinessIcon,
  Close as CloseIcon,
  EmojiEvents as EmojiEventsIcon,
} from '@mui/icons-material';

// Components
import ContactForm from "../components/ContactForm";
import ParticipantForm from "../components/ParticipantForm";
import SpeakerForm from "../components/SpeakerForm";
import SponsorForm from "../components/SponsorForm";
import ImageSlider from "../components/ImageSlider";
import PhotoWall from "../components/PhotoWall";

// Custom styled components or common styles
const glassStyle = {
  background: 'rgba(255, 255, 255, 0.03)',
  backdropFilter: 'blur(16px)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  borderRadius: 4,
  overflow: 'hidden',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    boxShadow: '0 8px 40px rgba(0, 0, 0, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
  },
};

const gradientText = {
  background: 'linear-gradient(45deg, #6366f1 30%, #ec4899 90%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

const sectionSpacing = { py: { xs: 8, md: 12 } };

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleFormSuccess = () => {
    setFormSubmitted(true);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  const navItems = [
    { label: 'О конференции', id: 'about' },
    { label: 'Итоги 2025', id: 'retrospective' },
    { label: 'Спикеры', id: 'speakers' },
    { label: 'Спонсорство', id: 'sponsorship' },
    { label: 'Регистрация', id: 'contact' },
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      bgcolor: '#0f172a',
      color: 'white',
      fontFamily: 'Inter, sans-serif',
      overflowX: 'hidden',
      backgroundImage: `
        radial-gradient(circle at 15% 50%, rgba(99, 102, 241, 0.08) 0%, transparent 25%),
        radial-gradient(circle at 85% 30%, rgba(236, 72, 153, 0.08) 0%, transparent 25%)
      `
    }}>
      {/* Header */}
      <AppBar 
        position="sticky" 
        elevation={0}
        sx={{ 
          background: 'rgba(255, 255, 255, 0.9)', 
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between', height: 80 }}>
            <Box 
              onClick={() => scrollToSection('hero')}
              sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            >
              <Image 
                src="/images/logo.png" 
                alt="BuildingSMART Logo" 
                width={200} 
                height={60} 
                style={{ objectFit: 'contain' }}
              />
            </Box>

            {/* Desktop Nav */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  sx={{ 
                    color: '#1e293b',
                    fontWeight: 600,
                    px: 2,
                    '&:hover': { color: '#0f172a', background: 'rgba(0,0,0,0.05)' }
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>

            {/* Mobile Menu Icon */}
            <IconButton
              aria-label="open drawer"
              edge="start"
              onClick={() => setMobileOpen(true)}
              sx={{ display: { xs: 'flex', md: 'none' }, color: '#1e293b' }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{
          sx: { width: '80%', maxWidth: 300, bgcolor: '#0f172a', borderLeft: '1px solid rgba(255,255,255,0.1)' }
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton onClick={() => setMobileOpen(false)} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          {navItems.map((item) => (
            <ListItem key={item.id} disablePadding>
              <Button 
                fullWidth 
                onClick={() => scrollToSection(item.id)}
                sx={{ 
                  justifyContent: 'flex-start', 
                  py: 2, 
                  px: 3, 
                  color: 'white',
                  fontWeight: 600
                }}
              >
                {item.label}
              </Button>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Hero Section */}
      <Box id="hero" sx={{ 
        pt: { xs: 15, md: 25 }, 
        pb: { xs: 15, md: 20 },
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Glow */}
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '60vw',
          height: '60vw',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 60%)',
          filter: 'blur(60px)',
          zIndex: -1
        }} />

        <Container maxWidth="lg">
          <Chip 
            label="2026 • Дата и место уточняются" 
            sx={{ 
              mb: 4, 
              bgcolor: 'rgba(255,255,255,0.05)', 
              color: '#a5b4fc', 
              border: '1px solid rgba(99,102,241,0.2)',
              fontWeight: 600,
              backdropFilter: 'blur(5px)'
            }} 
          />
          <Typography
            variant="h1"
            sx={{
              fontWeight: 900,
              fontSize: { xs: '2.5rem', sm: '4rem', md: '5.5rem' },
              lineHeight: 1.1,
              mb: 3,
              background: 'linear-gradient(180deg, #ffffff 0%, #94a3b8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            BuildingSMART <br />
            <Box component="span" sx={gradientText}>Kazakhstan Awards 2026</Box>
          </Typography>
          
          <Typography variant="h5" sx={{ mb: 6, color: 'text.secondary', maxWidth: '800px', mx: 'auto', lineHeight: 1.6 }}>
            Вторая Национальная Премия и Конференция по цифровой трансформации и инновациям в строительной отрасли.
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => scrollToSection('contact')}
              sx={{
                px: 5,
                py: 2,
                fontSize: '1.1rem',
                fontWeight: 700,
                borderRadius: '50px',
                background: 'linear-gradient(45deg, #6366f1 0%, #ec4899 100%)',
                boxShadow: '0 20px 40px -10px rgba(99, 102, 241, 0.5)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #4f46e5 0%, #db2777 100%)',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              Предварительная регистрация
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => scrollToSection('about')}
              sx={{
                px: 5,
                py: 2,
                fontSize: '1.1rem',
                fontWeight: 700,
                borderRadius: '50px',
                borderColor: 'rgba(255,255,255,0.2)',
                color: 'white',
                '&:hover': {
                  borderColor: 'white',
                  background: 'rgba(255,255,255,0.05)'
                },
              }}
            >
              Подробнее
            </Button>
          </Box>
        </Container>
      </Box>

      {/* About Section */}
      <Box id="about" sx={sectionSpacing}>
        <Container maxWidth="xl">
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} md={5}>
              <Typography variant="overline" sx={{ color: '#ec4899', fontWeight: 700, letterSpacing: 2 }}>
                О СОБЫТИИ
              </Typography>
              <Typography variant="h2" sx={{ fontWeight: 800, mb: 4, mt: 1 }}>
                Цифровое будущее <br />строительства
              </Typography>
              <Typography variant="body1" paragraph sx={{ color: 'text.secondary', fontSize: '1.1rem', lineHeight: 1.8 }}>
                Национальная Премия и конференция, посвящённая <strong>цифровому строительству</strong> и <strong>openBIM</strong>. Мы объединяем лидеров индустрии, экспертов и новаторов для обсуждения стратегий трансформации отрасли.
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.1rem', lineHeight: 1.8 }}>
                В программе — ключевые доклады, панельные дискуссии и обмен передовым опытом внедрения технологий.
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={7}>
              <Box sx={{ 
                ...glassStyle, 
                p: { xs: 3, md: 5 },
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(236, 72, 153, 0.05) 100%)'
              }}>
                <Grid container spacing={4}>
                  {[
                    { icon: <ForumIcon color="primary" />, title: 'Экспертные доклады', text: 'Выступления спикеров из Казахстана и зарубежья' },
                    { icon: <AutoStoriesIcon color="secondary" />, title: 'Тематические сессии', text: 'Глубокое погружение в технологии openBIM' },
                    { icon: <PeopleIcon color="success" />, title: 'Networking', text: 'Обмен опытом и деловые встречи' },
                    { icon: <EmojiEventsIcon color="warning" />, title: 'Awards', text: 'Церемония награждения лучших проектов' },
                  ].map((item, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Box sx={{ display: 'flex', gap: 2 }}>
                        <Box sx={{ 
                          p: 1.5, 
                          borderRadius: '12px', 
                          bgcolor: 'rgba(255,255,255,0.05)', 
                          height: 'fit-content' 
                        }}>
                          {item.icon}
                        </Box>
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>{item.title}</Typography>
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>{item.text}</Typography>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Retrospective Section */}
      <Box id="retrospective" sx={{ py: 10, bgcolor: 'rgba(0,0,0,0.2)' }}>
        <Container maxWidth="lg">
          <Box sx={{ 
            textAlign: 'center', 
            maxWidth: 700, 
            mx: 'auto', 
            mb: 8 
          }}>
            <Typography variant="overline" sx={{ color: '#6366f1', fontWeight: 700, letterSpacing: 2 }}>
              РЕТРОСПЕКТИВА
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 800, mt: 1 }}>
              Итоги 2025 года
            </Typography>
          </Box>

          <Paper sx={{ ...glassStyle, p: { xs: 4, md: 6 } }}>
            <Box sx={{ columnCount: { xs: 1, md: 2 }, columnGap: 6 }}>
              <Typography paragraph sx={{ fontSize: '1.05rem', color: 'text.secondary', lineHeight: 1.8 }}>
                В Алматы прошла Первая Национальная Премия и Конференция BuildingSMART Kazakhstan Awards & StudentSMART Cup 2025. Событие стало важной вехой в цифровой трансформации строительной отрасли страны.
              </Typography>
              <Typography paragraph sx={{ fontSize: '1.05rem', color: 'text.secondary', lineHeight: 1.8 }}>
                Организованное АО «КазНИИСА» и buildingSMART Kazakhstan, мероприятие объединило госструктуры, бизнес и науку. Особое внимание было уделено приветственному слову вице-министра промышленности и строительства, подчеркнувшего важность курса на цифровизацию.
              </Typography>
              <Typography paragraph sx={{ fontSize: '1.05rem', color: 'text.secondary', lineHeight: 1.8 }}>
                Награждение BuildingSMART Kazakhstan Awards отметило лучшие инновационные проекты, а StudentSMART Cup выявил таланты среди молодежи. Панельные дискуссии и мастер-классы затронули острые вопросы интероперабельности и госэкспертизы.
              </Typography>
              <Typography sx={{ fontSize: '1.05rem', fontWeight: 600, color: 'white' }}>
                Это был мощный импульс для формирования единой экосистемы openBIM в Казахстане.
              </Typography>
            </Box>
          </Paper>
        </Container>
      </Box>

      {/* Slider */}
      <Box sx={{ py: 8 }}>
        <ImageSlider />
      </Box>

      {/* Details Grid */}
      <Box id="details" sx={sectionSpacing}>
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            {[
              { 
                icon: <EventIcon fontSize="large" />, 
                title: 'Дата', 
                content: '2026 год',
                sub: 'Дата уточняется',
                color: '#6366f1'
              },
              { 
                icon: <LocationIcon fontSize="large" />, 
                title: 'Локация', 
                content: 'Уточняется',
                sub: 'Казахстан',
                color: '#ec4899'
              },
              { 
                icon: <PhoneIcon fontSize="large" />, 
                title: 'Контакты', 
                content: '+7 (747) 793 16 65',
                link: 'tel:+77477931665',
                color: '#a855f7'
              },
              { 
                icon: <PeopleIcon fontSize="large" />, 
                title: 'Аудитория', 
                content: 'Эксперты и Лидеры',
                sub: 'Госсектор и Бизнес',
                color: '#10b981'
              }
            ].map((card, i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <Card sx={{ 
                  ...glassStyle, 
                  height: '100%', 
                  textAlign: 'center',
                  p: 3, // Increased padding
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.05)',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: `0 20px 40px -10px ${card.color}40`, // Colored glow on hover
                    borderColor: `${card.color}50`
                  },
                  '&::before': { // Gradient shine effect
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: `linear-gradient(90deg, transparent, ${card.color}, transparent)`,
                    opacity: 0,
                    transition: 'opacity 0.3s'
                  },
                  '&:hover::before': {
                    opacity: 1
                  }
                }}>
                  <CardContent>
                    <Box sx={{ 
                      mb: 3, 
                      display: 'inline-flex', 
                      p: 2.5, 
                      borderRadius: '24px', // Softer radius
                      bgcolor: `${card.color}15`, // Subtle colored background
                      color: card.color,
                      boxShadow: `0 8px 24px ${card.color}20`,
                      border: `1px solid ${card.color}20`
                    }}>
                      {card.icon}
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 800, mb: 1.5, letterSpacing: '-0.01em' }}>{card.title}</Typography>
                    {card.link ? (
                      <Link href={card.link} underline="none" sx={{ 
                        color: 'rgba(255,255,255,0.9)', 
                        fontWeight: 600, 
                        display: 'block', 
                        mb: 0.5, 
                        fontSize: '1.1rem',
                        transition: 'color 0.2s',
                        '&:hover': { color: card.color } 
                      }}>
                        {card.content}
                      </Link>
                    ) : (
                      <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5, fontSize: '1.1rem', color: 'rgba(255,255,255,0.9)' }}>{card.content}</Typography>
                    )}
                    {card.sub && <Typography variant="caption" sx={{ 
                      color: 'text.secondary', 
                      bgcolor: 'rgba(255,255,255,0.05)', 
                      px: 1.5, 
                      py: 0.5, 
                      borderRadius: '12px',
                      display: 'inline-block',
                      mt: 1
                    }}>
                      {card.sub}
                    </Typography>}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Speakers */}
      <Box sx={{ bgcolor: 'rgba(0,0,0,0.2)', py: 4 }}>
        <PhotoWall />
      </Box>
      
      <Box id="speakers" sx={sectionSpacing}>
        <Container maxWidth="xl">
          <Typography variant="h2" align="center" sx={{ fontWeight: 800, mb: 8 }}>
            Наши Спикеры
          </Typography>
          <Grid container spacing={4}>
             {[
              { icon: <PublicIcon sx={{ fontSize: 48 }} />, title: 'Международные эксперты', desc: 'Ведущие специалисты BIM и openBIM', color: '#6366f1' },
              { icon: <AccountBalanceIcon sx={{ fontSize: 48 }} />, title: 'Государственный сектор', desc: 'Представители Министерств РК', color: '#a855f7' },
              { icon: <ConstructionIcon sx={{ fontSize: 48 }} />, title: 'Бизнес Лидеры', desc: 'Руководители строительных компаний', color: '#ec4899' },
              { icon: <SchoolIcon sx={{ fontSize: 48 }} />, title: 'Академическая среда', desc: 'Профильные вузы и наука', color: '#10b981' },
            ].map((item, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper sx={{ 
                  ...glassStyle,
                  p: 4, 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  borderTop: `4px solid ${item.color}`
                }}>
                  <Box sx={{ color: item.color, mb: 3 }}>
                    {item.icon}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>{item.title}</Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                    {item.desc}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Sponsor Call */}
      <Box id="sponsorship" sx={{ py: 10 }}>
        <Container maxWidth="lg">
          <Box sx={{ 
            ...glassStyle, 
            p: { xs: 4, md: 8 }, 
            textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(244, 243, 240, 0.1) 0%, rgba(245, 158, 11, 0.05) 100%)',
            borderColor: 'rgba(251, 191, 36, 0.2)'
          }}>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
               <Box sx={{  px: 3, py: 1, borderRadius: 3 }}>
                <Image 
                  src="/images/logo.png" 
                  alt="BuildingSMART Sponsor Logo" 
                  width={300} 
                  height={90} 
                  style={{ objectFit: 'contain', width: 'auto', height: '90px' }}
                />
               </Box>
            </Box>
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 3 }}>
              Станьте Спонсором 2026
            </Typography>
            <Typography variant="body1" sx={{ maxWidth: 700, mx: 'auto', mb: 4, fontSize: '1.2rem', color: 'rgba(255,255,255,0.9)' }}>
              Продемонстрируйте свои достижения лидерам отрасли на главном событии 2026 года.
            </Typography>
            <Button 
              component="a"
              href="https://wa.me/77021884565?text=%D0%AF%20%D0%BF%D0%BE%20%D0%BF%D0%BE%D0%B2%D0%BE%D0%B4%D1%83%20%D0%BA%D0%BE%D0%BD%D1%84%D0%B5%D1%80%D0%B5%D0%BD%D1%86%D0%B8%D0%B8%20BS2026"
              target="_blank"
              rel="noopener noreferrer"
              variant="outlined" 
              size="large"
              sx={{ 
                color: '#fbbf24', 
                borderColor: '#fbbf24', 
                borderWidth: 2,
                fontSize: '1.1rem',
                fontWeight: 700,
                px: 4,
                '&:hover': { borderWidth: 2, borderColor: '#f59e0b', background: 'rgba(251, 191, 36, 0.1)' }
              }}
            >
              Узнать условия
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Registration Section */}
      <Box id="contact" sx={{ ...sectionSpacing, bgcolor: 'rgba(0,0,0,0.3)' }}>
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="overline" sx={{ color: '#a855f7', fontWeight: 700 }}>
              РЕГИСТРАЦИЯ
            </Typography>
            <Typography variant="h2" sx={{ fontWeight: 800, mt: 1 }}>
              Присоединяйтесь к нам
            </Typography>
          </Box>

          <Paper sx={{ 
            bgcolor: 'rgba(30, 41, 59, 0.7)', 
            backdropFilter: 'blur(20px)',
            borderRadius: 4,
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <Tabs 
              value={activeTab} 
              onChange={handleTabChange}
              variant={isMobile ? "scrollable" : "fullWidth"}
              scrollButtons="auto"
              sx={{
                bgcolor: 'rgba(0,0,0,0.2)',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                '& .MuiTab-root': {
                  py: 3,
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  color: 'rgba(255,255,255,0.5)',
                  '&.Mui-selected': { color: 'white' }
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: '#6366f1',
                  height: 3
                }
              }}
            >
              <Tab label="Участник" />
              <Tab label="Спикер" />
              <Tab label="Спонсор" />
            </Tabs>

            <Box sx={{ p: { xs: 3, md: 5 } }}>
              {formSubmitted ? (
                <Alert 
                  severity="success" 
                  variant="outlined"
                  sx={{ 
                    color: '#4ade80', 
                    borderColor: '#4ade80',
                    '& .MuiAlert-icon': { color: '#4ade80' }
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>Заявка принята!</Typography>
                  <Typography>Мы свяжемся с вами в ближайшее время.</Typography>
                </Alert>
              ) : (
                <>
                  {activeTab === 0 && <ParticipantForm onSuccess={handleFormSuccess} />}
                  {activeTab === 1 && <SpeakerForm onSuccess={handleFormSuccess} />}
                  {activeTab === 2 && <SponsorForm onSuccess={handleFormSuccess} />}
                </>
              )}
            </Box>
          </Paper>
        </Container>
      </Box>

      {/* Footer */}
      <Box component="footer" sx={{ py: 6, borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
        <Container>
          <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: '-0.02em', mb: 2, opacity: 0.5 }}>
            BuildingSMART Awards
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.4)' }}>
            © 2026 Все права защищены. <Link href="/admin" sx={{ color: 'inherit', textDecoration: 'underline' }}>Вход для администраторов</Link>
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
