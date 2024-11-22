import React, { useState, useEffect  } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Box,
  InputAdornment,
  Snackbar,
  Alert,
  CircularProgress,
  Grid2,
} from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import { create } from './api-recipe'; 
import auth from '../lib/auth-helper.js';
import imageCompression from 'browser-image-compression';

const AddRecipePage = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    preptime: "",
    cooktime: "",
    servings: "",
    image: null,
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = () => {
    const authStatus = auth.isAuthenticated();
    console.log("Authentication status:", authStatus);
    if (!authStatus) {
      setError("You must be logged in to create a recipe.");
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
  };

  const handleChange = (name) => async (event) => {
    if (name === 'image') {
      const file = event.target.files[0];
      if (file) {
        try {
          const compressedFile = await compressImage(file);
          setValues({ ...values, [name]: compressedFile });
        } catch (err) {
          console.error("Error compressing image:", err);
          setError("Error processing image. Please try a different file.");
        }
      }
    } else {
      const value = event.target.value;
      setValues({ ...values, [name]: value });
    }
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const compressImage = async (imageFile) => {
    const options = {
      maxSizeMB: 5, // Compress to 100KB
      maxWidthOrHeight: 1920,
      useWebWorker: true
    }
    try {
      const compressedFile = await imageCompression(imageFile, options);
      return compressedFile;
    } catch (error) {
      console.log(error);
      throw new Error("Image compression failed");
    }
  }

  const validateForm = () => {
    const newErrors = {};
    if (!values.title.trim()) newErrors.title = "Title is required";
    if (!values.instructions.trim()) newErrors.instructions = "Instructions are required";
    if (!values.ingredients.trim()) newErrors.ingredients = "Ingredients are required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted", values); // Debug log

    if (!isAuthenticated) {
      setError("You must be logged in to create a recipe.");
      return;
    }

    if (!validateForm()) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const jwt = auth.isAuthenticated();
      if (!jwt) {
        throw new Error('You must be logged in to create a recipe.');
      }

      let imageData = null;
      if (values.image) {
        const reader = new FileReader();
        imageData = await new Promise((resolve, reject) => {
          reader.onload = (event) => resolve(event.target.result);
          reader.onerror = (error) => reject(error);
          reader.readAsDataURL(values.image);
        });
      }

      const recipeData = {
        title: values.title,
        ingredients: values.ingredients,
        instructions: values.instructions,
        preptime: parseInt(values.preptime, 10),
        cooktime: parseInt(values.cooktime, 10),
        servings: parseInt(values.servings, 10),
        image: imageData,      
      };

      const result = await create({ t: jwt.token }, recipeData);
      if (result.error) {
        throw new Error(result.error);
      }

      navigate('/recipelist');
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <Container component="main" maxWidth="sm" sx={{ py: 4 }}>
        <Typography variant="h5" component="h2" align="center" sx={{ mb: 2 }}>
          Authentication Required
        </Typography>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => navigate("/login")}
        >
          Go to Login
        </Button>
      </Container>
    );
  }

  return (
    <Container component="main" maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h3" align="center" color="#FF6E1C" sx={{ fontWeight: "bold", mb: 4 }}>
        Recipes
      </Typography>

      <Card sx={{ p: 4, bgcolor: "#fff" }}>
        <CardContent>
          <Typography variant="h5" component="h2" align="center" sx={{ fontWeight: "bold", mb: 3 }}>
            Add new Recipe
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Recipe Title*"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              value={values.title}
              onChange={handleChange("title")}
              required
              error={!!errors.title}
              helperText={errors.title}
            />

            <TextField
              label="Ingredients*"
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              sx={{ mb: 2 }}
              value={values.ingredients}
              onChange={handleChange("ingredients")}
              required
              error={!!errors.ingredients}
              helperText={errors.ingredients}
            />

            <TextField
              label="Instructions*"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              sx={{ mb: 2 }}
              value={values.instructions}
              onChange={handleChange("instructions")}
              required
            />

<Box sx={{ 
      display: 'flex', 
      gap: 4,
      mb: 2,
      '& .MuiOutlinedInput-root': {
        backgroundColor: '#fff'
      }
    }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1 }}>
        <Typography variant="body2" color="text.secondary">Prep Time</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TextField
            type="number"
            size="small"
            value={values.preptime}
            onChange={handleChange("preptime")}
            sx={{ width: '150px' }}
            inputProps={{ min: 0 }}
            InputProps={{
              endAdornment: <InputAdornment position="end">Minutes</InputAdornment>,
            }}
          />
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1 }}>
        <Typography variant="body2" color="text.secondary">Cook Time</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TextField
            type="number"
            size="small"
            value={values.cooktime}
            onChange={handleChange("cooktime")}
            sx={{ width: '150px' }}
            inputProps={{ min: 0 }}
            InputProps={{
              endAdornment: <InputAdornment position="end">Minutes</InputAdornment>,
            }}
          />
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1 }}>
        <Typography variant="body2" color="text.secondary">Servings</Typography>
        <TextField
          type="number"
          size="small"
          value={values.servings}
          onChange={handleChange("servings")}
          sx={{ width: '90px' }}
          inputProps={{ min: 0 }}
        />
      </Box>
    </Box>

            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 3 }}>
              <Button variant="outlined" component="label" startIcon={<CloudUpload />} fullWidth>
                Upload an image
                <input type="file" hidden onChange={handleChange("image")} accept="image/*"/>
              </Button>
            </Box>

            <Grid2 container spacing={2}>
              <Grid2 xs={6}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : "Add Recipe"}
                </Button>
              </Grid2>
              {values.image && (
        <Typography variant="body2" align="center" sx={{ mb: 2 }}>
          Selected file: {values.image.name} (Compressed size: {(values.image.size / 1024).toFixed(2)} KB)
        </Typography>
      )}
              <Grid2 xs={6}>
                <Button variant="outlined" color="secondary" fullWidth onClick={() => navigate("/recipelist")}>
                  Cancel
                </Button>
              </Grid2>
            </Grid2>
          </form>
        </CardContent>
      </Card>

      <Snackbar open={success} autoHideDuration={6000} onClose={() => setSuccess(false)}>
        <Alert onClose={() => setSuccess(false)} severity="success">
          Recipe added successfully!
        </Alert>
      </Snackbar>

      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError("")}>
        <Alert onClose={() => setError("")} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AddRecipePage;