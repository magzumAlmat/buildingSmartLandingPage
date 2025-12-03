"use client";

import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Paper, CircularProgress, Alert, Button, TextField, Chip, Snackbar } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Lock as LockIcon, Refresh as RefreshIcon } from '@mui/icons-material';
import { getAllSubmissions, updateSubmissionStatus } from '@/actions/submissions';

// Компонент для имитации аутентификации
const AuthForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password); // Pass username and password directly
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
  const [loggedIn, setLoggedIn] = useState(false);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [creds, setCreds] = useState({ username: '', password: '' }); // Store credentials
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const fetchSubmissions = async () => {
    setLoading(true);
    setError(null);
    try {
      // Use getAllSubmissions server action directly
      const result = await getAllSubmissions(creds.username, creds.password);

      if (!result.success) {
        if (result.message === 'Invalid credentials') {
          setLoggedIn(false); // Authentication failed
        }
        throw new Error(result.message || 'Ошибка загрузки данных');
      }

      setSubmissions(result.submissions);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loggedIn) {
      fetchSubmissions();
    }
  }, [loggedIn, creds]); // Rerun when loggedIn or creds change

  const handleLogin = (username, password) => {
    setCreds({ username, password });
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setCreds({ username: '', password: '' });
    setSubmissions([]);
  };

  const processRowUpdate = async (newRow, oldRow) => {
    if (newRow.status === oldRow.status) {
      return newRow; // No change in status
    }

    try {
      const result = await updateSubmissionStatus(newRow.id, newRow.type, newRow.status, creds.username, creds.password);

      if (!result.success) {
        throw new Error(result.message || 'Ошибка при обновлении статуса');
      }

      setSnackbarMessage('Статус успешно обновлен!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);

      // Update the local state with the new row
      return newRow;
    } catch (err) {
      setSnackbarMessage(err.message);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      // Revert to old row if update fails
      return oldRow;
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  if (!loggedIn) {
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
      editable: true,
      type: 'singleSelect',
      valueOptions: ['Новая', 'Одобрена', 'В работе', 'Закрыта'],
      renderCell: (params) => {
        let color = 'primary';
        if (params.value === 'Новая') color = 'secondary';
        if (params.value === 'Одобрена') color = 'success';
        if (params.value === 'Закрыта') color = 'error';
        if (params.value === 'В работе') color = 'info'; // Add color for "In Progress"
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
            onClick={fetchSubmissions} 
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
            processRowUpdate={processRowUpdate}
            onProcessRowUpdateError={(error) => {
                setSnackbarMessage(`Ошибка обновления: ${error.message}`);
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            }}
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
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

