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
  Grid
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { saveSubmission } from '@/actions/submissions';

function ContactFormContent({ onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
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
      const result = await saveSubmission(formData, "contact");

      if (!result.success) {
        throw new Error(result.message || "Ошибка при отправке формы");
      }

      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
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
            label="Имя"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ваше имя"
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
            label="Компания"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Название компании"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={5}
            label="Сообщение"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Расскажите нам о себе и о том, почему вас интересует конференция..."
          />
        </Grid>
      </Grid>



      <Button
        type="submit"
        variant="contained"
        size="large"
        fullWidth
        disabled={loading}
        endIcon={<SendIcon />}
        sx={{ 
          mt: 4,
          background: 'linear-gradient(45deg, #6366f1 30%, #a855f7 90%)',
          '&:hover': {
            background: 'linear-gradient(45deg, #4f46e5 30%, #9333ea 90%)',
          }
        }}
      >
        {loading ? "Отправка..." : "Зарегистрироваться"}
      </Button>


    </Box>
  );
}

export default ContactFormContent;

