"use client";

import { useState } from "react";
import { AltchaWrapper } from '@/components/AltchaWrapper';
import { 
  TextField, 
  Button, 
  Box, 
  Alert,
  Typography,
  Link,
  Grid,
  MenuItem
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { saveSubmission } from '@/actions/submissions';

function ParticipantFormContent({ onSuccess }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    position: "",
    specialization: "",
    experience: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await saveSubmission(formData, "participant");

      if (!result.success) {
        throw new Error(result.message || "Ошибка при отправке формы");
      }

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        company: "",
        position: "",
        specialization: "",
        experience: "",
      });

      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Произошла ошибка при отправке");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            required
            label="ФИО"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Ваше полное имя"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            required
            type="email"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="ваш@email.com"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            required
            type="tel"
            label="Телефон"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+7 (999) 999-99-99"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            required
            label="Компания"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Название компании"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            required
            label="Должность"
            name="position"
            value={formData.position}
            onChange={handleChange}
            placeholder="Ваша должность"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Специализация"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            placeholder="Ваша специализация"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            select
            label="Опыт в BIM (лет)"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
          >
            <MenuItem value="">Выберите опыт</MenuItem>
            <MenuItem value="0-1">0-1 год</MenuItem>
            <MenuItem value="1-3">1-3 года</MenuItem>
            <MenuItem value="3-5">3-5 лет</MenuItem>
            <MenuItem value="5+">5+ лет</MenuItem>
          </TextField>
        </Grid>
      </Grid>



      <Button
        type="submit"
        variant="contained"
        size="large"
        fullWidth
        disabled={loading}
        endIcon={<PersonAddIcon />}
        sx={{ 
          mt: 4,
          background: 'linear-gradient(45deg, #6366f1 30%, #a855f7 90%)',
          '&:hover': {
            background: 'linear-gradient(45deg, #4f46e5 30%, #9333ea 90%)',
          }
        }}
      >
        {loading ? "Отправка..." : "Зарегистрироваться как участник"}
      </Button>


    </Box>
  );
}

export default ParticipantFormContent;
