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
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import { saveSubmission } from '@/actions/submissions';

function SpeakerFormContent({ onSuccess }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    position: "",
    expertise: "",
    bio: "",
    topicTitle: "",
    topicDescription: "",
    country: "",
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
      const result = await saveSubmission(formData, "speaker");

      if (!result.success) {
        throw new Error(result.message || "Ошибка при отправке формы");
      }

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        company: "",
        position: "",
        expertise: "",
        bio: "",
        topicTitle: "",
        topicDescription: "",
        country: "",
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
            label="Страна"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="Страна"
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
        <Grid item xs={12}>
          <TextField
            fullWidth
            required
            label="Область экспертизы"
            name="expertise"
            value={formData.expertise}
            onChange={handleChange}
            placeholder="Ваша область экспертизы (BIM, цифровое строительство и т.д.)"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Краткая биография"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Расскажите о себе и вашем опыте..."
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            required
            label="Название доклада"
            name="topicTitle"
            value={formData.topicTitle}
            onChange={handleChange}
            placeholder="Название вашего доклада"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            required
            multiline
            rows={4}
            label="Описание доклада"
            name="topicDescription"
            value={formData.topicDescription}
            onChange={handleChange}
            placeholder="Подробное описание вашего доклада..."
          />
        </Grid>
      </Grid>



      <Button
        type="submit"
        variant="contained"
        size="large"
        fullWidth
        disabled={loading}
        endIcon={<RecordVoiceOverIcon />}
        sx={{ 
          mt: 4,
          background: 'linear-gradient(45deg, #6366f1 30%, #a855f7 90%)',
          '&:hover': {
            background: 'linear-gradient(45deg, #4f46e5 30%, #9333ea 90%)',
          }
        }}
      >
        {loading ? "Отправка..." : "Подать заявку как спикер"}
      </Button>


    </Box>
  );
}

export default SpeakerFormContent;
