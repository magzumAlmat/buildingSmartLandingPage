// import AdminPanel from '@/components/AdminPanel';
// import { Box } from '@mui/material';

// // Страница админ-панели
// export default function AdminPage() {
//   return (
//     <Box sx={{ minHeight: '100vh', py: 5 }}>
//       <AdminPanel />
//     </Box>
//   );
// }

"use client";

import { useState } from "react";
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
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
  useMediaQuery,
  Link,
  TextField,
} from "@mui/material";
import {
  LocationOn as LocationIcon,
  Event as EventIcon,
  Phone as PhoneIcon,
  People as PeopleIcon,
  Check as CheckIcon,
  Public as PublicIcon,
  School as SchoolIcon,
  Business as BusinessIcon,
  AccountBalance as AccountBalanceIcon,
  Construction as ConstructionIcon,
  EmojiEvents as TrophyIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import ContactForm from "../components/ContactForm";
import ParticipantForm from "../components/ParticipantForm";
import SpeakerForm from "../components/SpeakerForm";
import SponsorForm from "../components/SponsorForm";
import ImageSlider from "../components/ImageSlider";
import PhotoWall from "../components/PhotoWall";

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      color: 'white',
      fontFamily: 'Inter, sans-serif'
    }}>
      {/* Header/AppBar */}
      <AppBar position="sticky" sx={{ 
        background: 'rgba(30, 41, 59, 0.8)', 
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                fontWeight: 800,
                letterSpacing: '.1rem',
                color: 'inherit',
                textDecoration: 'none',
                background: 'linear-gradient(45deg, #6366f1 30%, #ec4899 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              BuildingSMART Awards
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  sx={{ my: 2, color: 'white', display: 'block', mx: 1, fontWeight: 600 }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
              <Button color="inherit" onClick={() => alert('Menu clicked')}>
                <MenuIcon />
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Hero Section */}
      <Box 
        sx={{ 
          py: 15, 
          textAlign: 'center', 
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <Container maxWidth="md">
          <Chip 
            label="23 Октября 2025 | Алматы" 
            color="secondary" 
            sx={{ mb: 2, fontSize: '0.9rem', fontWeight: 700 }} 
          />
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontWeight: 900,
              fontSize: { xs: '3rem', sm: '4rem', md: '5rem' },
              mb: 3,
              background: 'linear-gradient(45deg, #6366f1 30%, #ec4899 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            BuildingSMART Kazakhstan Awards 2025
          </Typography>
          <Typography variant="h5" sx={{ mb: 5, color: 'text.secondary' }}>
            Первая Национальная Премия и Конференция по цифровой трансформации строительной отрасли.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => scrollToSection('contact')}
            sx={{
              px: 5,
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 700,
              background: 'linear-gradient(45deg, #6366f1 30%, #a855f7 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #a855f7 30%, #ec4899 90%)',
              },
              transition: 'all 0.3s',
            }}
          >
            Зарегистрироваться
          </Button>
        </Container>
      </Box>

      {/* About Section */}
      <Box id="about" sx={{ py: 10, background: 'rgba(0, 0, 0, 0.2)' }}>
        <Container maxWidth="lg">
          <Typography variant="h2" align="center" gutterBottom sx={{ mb: 6 }}>
            О конференции
          </Typography>
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                Национальная Премия и конференция, посвящённая цифровому строительству и openBIM — подходу использования открытых форматов данных о строительных объектах.
              </Typography>
              <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                Мероприятие объединит лидеров цифровой трансформации строительства и экспертов, компании и профильные вузы для обсуждения практического внедрения технологий и стратегий цифровой трансформации строительной отрасли.
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                В программе выступления экспертов из Казахстана и зарубежных стран, тематические сессии и обмен опытом.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper 
                elevation={0}
                sx={{ 
                  p: 4, 
                  background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 3
                }}
              >
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                  Программа конференции:
                </Typography>
                <List>
                  {[
                    'Выступления экспертов из Казахстана и зарубежных стран',
                    'Тематические сессии по цифровому строительству',
                    'Обмен опытом и лучшими практиками',
                    'Церемония вручения BuildingSMART Awards',
                    'Сетевые мероприятия и встречи'
                  ].map((item, index) => (
                    <ListItem key={index} sx={{ py: 1 }}>
                      <ListItemIcon>
                        <CheckIcon sx={{ color: '#6366f1' }} />
                      </ListItemIcon>
                      <ListItemText primary={item} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Retrospective Section */}
      <Box id="retrospective" sx={{ py: 10 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" align="center" gutterBottom sx={{ mb: 6 }}>
            Итоги конференции 2025 года
          </Typography>
          <Paper 
            elevation={0}
            sx={{ 
              p: 5, 
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(99, 102, 241, 0.1) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 3
            }}
          >
            <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
              В Алматы прошла Первая Национальная Премия и Конференция BuildingSMART Kazakhstan Awards & StudentSMART Cup 2025, ставшая ключевым событием в цифровой трансформации строительной отрасли Казахстана.
            </Typography>
            <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
              Мероприятие организовано АО «КазНИИСА» и buildingSMART Kazakhstan при поддержке buildingSMART International. Конференция объединила представителей государственных органов, проектных и строительных компаний, научных и образовательных учреждений, а также международных экспертов в области BIM и openBIM-технологий.
            </Typography>
            <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
              С приветственным словом к участникам конференции онлайн обратился вице-министр Промышленности и Строительства Республики Казахстан Куандык Жумабекович Кажкенов, отметив важность развития цифровизации и внедрения технологий openBIM в строительной отрасли страны.
            </Typography>
            <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
              Генеральный директор АО «КазНИИСА» Бегман Кульбаев подчеркнул значимость внедрения цифровых инструментов и открытых стандартов данных для повышения эффективности и прозрачности строительных процессов.
            </Typography>
            <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
              Директор по маркетингу buildingSMART International Aidan Mercer рассказал о глобальных достижениях организации и международных тенденциях развития стандарта openBIM.
            </Typography>
            <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
              Председатель buildingSMART Kazakhstan Александр Шахнович представил планы по расширению применения открытых форматов данных в строительной отрасли Казахстана и развитию национального сообщества специалистов openBIM.
            </Typography>
            <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
              Одним из центральных событий конференции стало награждение победителей BuildingSMART Kazakhstan Awards 2025. Премией отмечены лучшие BIM-проекты, продемонстрировавшие инновационные подходы к проектированию и управлению строительством с использованием технологий openBIM.
            </Typography>
            <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
              Также состоялось награждение победителей студенческого конкурса Student SMART Cup, направленного на развитие цифровых компетенций и поддержку молодых специалистов, осваивающих современные инструменты информационного моделирования.
            </Typography>
            <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
              В рамках конференции прошла панельная дискуссия с участием представителей РГП «Госэкспертиза», АО «КазНИИСА», Engineering Center LTD, Генпро и Autodesk, где обсуждались барьеры и перспективы сквозной цифровизации строительной отрасли Казахстана.
            </Typography>
            <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
              Кроме того, участники посетили мастер-класс «Интероперабельность и прохождение госэкспертизы», по итогам которого получили сертификаты.
            </Typography>
            <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
              BuildingSMART Kazakhstan Awards & StudentSMART Cup 2025 продемонстрировала высокий интерес профессионального сообщества к внедрению цифровых технологий и международных стандартов в строительстве.
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
              Мероприятие стало важным шагом в формировании единой экосистемы openBIM в Казахстане и укреплении сотрудничества между государством, бизнесом и образовательными структурами.
            </Typography>
          </Paper>
        </Container>
      </Box>

      <ImageSlider />

      {/* Awards Section */}
      <Box sx={{ py: 10, background: 'rgba(0, 0, 0, 0.2)' }}>
        <Container maxWidth="lg">
          <Box textAlign="center" sx={{ mb: 6 }}>
            <TrophyIcon sx={{ fontSize: 64, color: '#fbbf24', mb: 2 }} />
            <Typography variant="h2" gutterBottom>
              BuildingSMART Awards
            </Typography>
          </Box>
          <Paper 
            elevation={0}
            sx={{ 
              p: 5, 
              background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 3,
              textAlign: 'center'
            }}
          >
            <Typography variant="h6" sx={{ lineHeight: 1.8, fontSize: '1.1rem' }}>
              Церемония вручения BuildingSMART Awards пройдёт в рамках конференции и отметит наиболее успешные проекты и инициативы в области BIM в Казахстане. Это признание лучших практик в цифровой трансформации строительной отрасли и внедрении открытых стандартов данных.
            </Typography>
          </Paper>
        </Container>
      </Box>

      {/* Details Section */}
      <Box id="details" sx={{ py: 10 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" align="center" gutterBottom sx={{ mb: 6 }}>
            Детали мероприятия
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ p: 4 }}>
                  <EventIcon sx={{ fontSize: 40, color: '#6366f1', mb: 2 }} />
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                    Дата и время
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    <strong>23 октября 2025 года</strong>
                  </Typography>
                  <Typography variant="body1">
                    Начало в <strong>9:00</strong>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ p: 4 }}>
                  <LocationIcon sx={{ fontSize: 40, color: '#ec4899', mb: 2 }} />
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                    Место проведения
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    <strong>The Ritz-Carlton, Алматы</strong>
                  </Typography>
                  <Typography variant="body1">
                    Ballroom
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ p: 4 }}>
                  <PhoneIcon sx={{ fontSize: 40, color: '#a855f7', mb: 2 }} />
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                    Справки
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    <Link href="tel:+77477931665" sx={{ color: '#6366f1', textDecoration: 'none' }}>
                      +7 (747) 793 16 65
                    </Link>
                  </Typography>
                  <Typography variant="body1">
                    <Link href="tel:+77018167481" sx={{ color: '#6366f1', textDecoration: 'none' }}>
                      +7 (701) 816-74-81
                    </Link>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ p: 4 }}>
                  <PeopleIcon sx={{ fontSize: 40, color: '#10b981', mb: 2 }} />
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                    Участники
                  </Typography>
                  <List dense>
                    <ListItem>• Международные эксперты</ListItem>
                    <ListItem>• Представители Министерств РК</ListItem>
                    <ListItem>• Лидеры строительных компаний</ListItem>
                    <ListItem>• Девелоперские компании</ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Speakers Section */}
      <PhotoWall />
      <Box id="speakers" sx={{ py: 10, background: 'rgba(0, 0, 0, 0.2)' }}>
        <Container maxWidth="lg">
          <Typography variant="h2" align="center" gutterBottom sx={{ mb: 6 }}>
            Наши спикеры
          </Typography>
          <Grid container spacing={4}>
            {[
              { icon: <PublicIcon sx={{ fontSize: 60 }} />, title: 'Международные эксперты', desc: 'Ведущие специалисты в области BIM и цифрового строительства из разных стран', color: '#6366f1' },
              { icon: <AccountBalanceIcon sx={{ fontSize: 60 }} />, title: 'Представители Министерств РК', desc: 'Официальные представители государственных органов и министерств Республики Казахстан', color: '#a855f7' },
              { icon: <ConstructionIcon sx={{ fontSize: 60 }} />, title: 'Лидеры строительных компаний', desc: 'Руководители крупнейших строительных и девелоперских компаний Казахстана', color: '#ec4899' },
              { icon: <SchoolIcon sx={{ fontSize: 60 }} />, title: 'Профильные вузы', desc: 'Представители ведущих университетов и образовательных учреждений', color: '#10b981' },
            ].map((speaker, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card 
                  sx={{ 
                    height: '100%',
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: `0 12px 40px ${speaker.color}40`,
                    }
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', p: 4 }}>
                    <Box sx={{ color: speaker.color, mb: 2 }}>
                      {speaker.icon}
                    </Box>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                      {speaker.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {speaker.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Sponsorship Section */}
      <Box id="sponsorship" sx={{ py: 10 }}>
        <Container maxWidth="lg">
          <Box textAlign="center" sx={{ mb: 6 }}>
            <BusinessIcon sx={{ fontSize: 64, color: '#fbbf24', mb: 2 }} />
            <Typography variant="h2" gutterBottom>
              Спонсорство
            </Typography>
          </Box>
          <Paper 
            elevation={0}
            sx={{ 
              p: 5, 
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 3
            }}
          >
            <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8, mb: 3 }}>
              Мы приглашаем компании присоединиться к нам в качестве спонсоров конференции BuildingSMART Awards 2025. Спонсорство предоставляет уникальную возможность продемонстрировать вашу компанию лидерам строительной отрасли и экспертам в области BIM.
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
              <strong>Уровни спонсорства:</strong> Платиновый, Золотой, Серебряный, Бронзовый и Партнёр. Каждый уровень включает различные преимущества и возможности для продвижения вашего бренда.
            </Typography>
          </Paper>
        </Container>
      </Box>

      {/* Contact Forms Section */}
      <Box id="contact" sx={{ py: 10, background: 'rgba(0, 0, 0, 0.2)' }}>
        <Container maxWidth="md">
          <Typography variant="h2" align="center" gutterBottom sx={{ mb: 6 }}>
            Присоединяйтесь к конференции
          </Typography>

          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
            <Tabs 
              value={activeTab} 
              onChange={handleTabChange}
              variant={isMobile ? "scrollable" : "fullWidth"}
              scrollButtons="auto"
              sx={{
                '& .MuiTab-root': {
                  fontWeight: 600,
                  fontSize: '1rem',
                },
                '& .Mui-selected': {
                  color: '#6366f1 !important',
                }
              }}
            >
              <Tab label="Обратная связь" />
              <Tab label="Участник" />
              <Tab label="Спикер" />
              <Tab label="Спонсор" />
            </Tabs>
          </Box>

          {formSubmitted ? (
            <Alert 
              severity="success" 
              sx={{ 
                py: 4,
                fontSize: '1.1rem',
                '& .MuiAlert-icon': {
                  fontSize: 40
                }
              }}
            >
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                Спасибо!
              </Typography>
              <Typography>
                Ваша заявка успешно отправлена. Мы свяжемся с вами в ближайшее время.
              </Typography>
            </Alert>
          ) : (
            <Paper 
              elevation={0}
              sx={{ 
                p: 4, 
                background: 'rgba(30, 41, 59, 0.6)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 3
              }}
            >
              {activeTab === 0 && <ContactForm onSuccess={handleFormSuccess} />}
              {activeTab === 1 && <ParticipantForm onSuccess={handleFormSuccess} />}
              {activeTab === 2 && <SpeakerForm onSuccess={handleFormSuccess} />}
              {activeTab === 3 && <SponsorForm onSuccess={handleFormSuccess} />}
            </Paper>
          )}
        </Container>
      </Box>

      {/* Footer */}
      <Box 
        component="footer" 
        sx={{ 
          py: 4, 
          background: 'rgba(0, 0, 0, 0.4)',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <Container>
          <Typography variant="body2" align="center" color="text.secondary">
            © 2025 BuildingSMART Awards. Все права защищены. | <Link href="/admin" color="inherit" sx={{ textDecoration: 'underline' }}>Админ-панель</Link>
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
