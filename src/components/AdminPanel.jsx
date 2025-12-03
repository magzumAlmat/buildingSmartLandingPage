"use client";

import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Paper, CircularProgress, Alert, Button, TextField, Chip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Lock as LockIcon, Refresh as RefreshIcon } from '@mui/icons-material';

// Компонент для имитации аутентификации
const AuthForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // В реальном приложении здесь будет запрос к серверу
    if (username === 'admin' && password === 'admin123') {
      // Для демонстрации используем Base64 кодирование
      const token = Buffer.from(`${username}:${password}`).toString('base64');
      onLogin(token);
    } else {
      setError('Неверный логин или пароль');
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'rgba(30, 41, 59, 0.8)' }}>
        <LockIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
        <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
          Вход в Админ-панель
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Логин"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Пароль"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2 }}
          />
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ 
              mt: 3, 
              mb: 2,
              background: 'linear-gradient(45deg, #6366f1 30%, #a855f7 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #a855f7 30%, #ec4899 90%)',
              },
            }}
          >
            Войти
          </Button>
          <Typography variant="body2" align="center" sx={{ mt: 2, color: 'text.secondary' }}>
            Демо-логин: admin / admin123
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

// Основной компонент админ-панели
export default function AdminPanel() {
  const [token, setToken] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSubmissions = async (authToken) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/get-submissions', {
        headers: {
          'Authorization': `Basic ${authToken}`,
        },
      });

      if (response.status === 401) {
        setToken(null); // Токен недействителен, сброс
        return;
      }

      if (!response.ok) {
        throw new Error('Ошибка загрузки данных');
      }

      const data = await response.json();
      setSubmissions(data.submissions);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchSubmissions(token);
    }
  }, [token]);

  const handleLogin = (authToken) => {
    setToken(authToken);
  };

  const handleLogout = () => {
    setToken(null);
    setSubmissions([]);
  };

  if (!token) {
    return <AuthForm onLogin={handleLogin} />;
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'type', headerName: 'Тип заявки', width: 150 },
    { field: 'name', headerName: 'Имя', width: 180 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'phone', headerName: 'Телефон', width: 150 },
    { field: 'company', headerName: 'Компания', width: 180 },
    { field: 'date', headerName: 'Дата', width: 120 },
    { 
      field: 'status', 
      headerName: 'Статус', 
      width: 120,
      renderCell: (params) => {
        let color = 'primary';
        if (params.value === 'Новая') color = 'secondary';
        if (params.value === 'Одобрена') color = 'success';
        if (params.value === 'Закрыта') color = 'error';
        return <Chip label={params.value} color={color} size="small" />;
      }
    },
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h3" sx={{ fontWeight: 700 }}>
          Админ-панель: Заявки
        </Typography>
        <Box>
          <Button 
            variant="outlined" 
            onClick={() => fetchSubmissions(token)} 
            disabled={loading} 
            startIcon={<RefreshIcon />}
            sx={{ mr: 2 }}
          >
            Обновить
          </Button>
          <Button 
            variant="contained" 
            color="error" 
            onClick={handleLogout}
          >
            Выйти
          </Button>
        </Box>
      </Box>

      <Paper elevation={3} sx={{ height: 600, width: '100%', background: 'rgba(30, 41, 59, 0.8)' }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box sx={{ p: 3 }}>
            <Alert severity="error">Ошибка: {error}</Alert>
          </Box>
        ) : (
          <DataGrid
            rows={submissions}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10, 20]}
            disableRowSelectionOnClick
            sx={{
              border: 'none',
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                color: 'white',
                fontWeight: 700,
              },
              '& .MuiDataGrid-cell': {
                borderColor: 'rgba(255, 255, 255, 0.1)',
              },
              '& .MuiDataGrid-root': {
                color: 'white',
              },
              '& .MuiTablePagination-root': {
                color: 'white',
              },
              '& .MuiDataGrid-footerContainer': {
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              }
            }}
          />
        )}
      </Paper>
    </Container>
  );
}
