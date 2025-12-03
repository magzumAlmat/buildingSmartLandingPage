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
import BusinessIcon from '@mui/icons-material/Business';
import { saveSubmission } from '@/actions/submissions';

function SponsorFormContent({ onSuccess }) {
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    website: "",
    sponsorLevel: "",
    industry: "",
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
      const result = await saveSubmission(formData, "sponsor");

      if (!result.success) {
        throw new Error(result.message || "Ошибка при отправке формы");
      }

      setFormData({
        companyName: "",
        contactPerson: "",
        email: "",
        phone: "",
        website: "",
        sponsorLevel: "",
        industry: "",
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
            label="Название компании"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Название вашей компании"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            required
            label="Контактное лицо"
            name="contactPerson"
            value={formData.contactPerson}
            onChange={handleChange}
            placeholder="ФИО контактного лица"
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
            type="url"
            label="Веб-сайт"
            name="website"
            value={formData.website}
            onChange={handleChange}
            placeholder="https://example.com"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            required
            label="Отрасль"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            placeholder="Ваша отрасль"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            required
            select
            label="Уровень спонсорства"
            name="sponsorLevel"
            value={formData.sponsorLevel}
            onChange={handleChange}
          >
            <MenuItem value="">Выберите уровень спонсорства</MenuItem>
            <MenuItem value="platinum">Платиновый спонсор</MenuItem>
            <MenuItem value="gold">Золотой спонсор</MenuItem>
            <MenuItem value="silver">Серебряный спонсор</MenuItem>
            <MenuItem value="bronze">Бронзовый спонсор</MenuItem>
            <MenuItem value="partner">Партнёр</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Сообщение"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Расскажите о вашей компании и интересе к спонсорству..."
          />
        </Grid>
      </Grid>



      <Button
        type="submit"
        variant="contained"
        size="large"
        fullWidth
        disabled={loading}
        endIcon={<BusinessIcon />}
        sx={{ 
          mt: 4,
          background: 'linear-gradient(45deg, #6366f1 30%, #a855f7 90%)',
          '&:hover': {
            background: 'linear-gradient(45deg, #4f46e5 30%, #9333ea 90%)',
          }
        }}
      >
        {loading ? "Отправка..." : "Отправить заявку на спонсорство"}
      </Button>


    </Box>
  );
}

export default SponsorFormContent;
