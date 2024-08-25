"use client";
import { useState } from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import RingLoader from "react-spinners/RingLoader";
import Link from "next/link";

export default function LandingPage() {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    // Simulate loading or async operation
    setTimeout(() => {
      setLoading(false);
      // Redirect to /ChatApp after loading
      window.location.href = "/ChatApp";
    }, 8000); // Adjust the timeout as needed
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        // mt: "220px", // Set top margin to 120px
        backgroundImage: 'url("/path/to/your/background-image.jpg")', // Replace with your image path
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Typography variant="h2" gutterBottom color={"white"}>
        Welcome to ProfessorPulse
      </Typography>
      <Typography variant="h3" gutterBottom color={"white"}>
        Find the best professors based on your needs.
      </Typography>
      {loading ? (
        <RingLoader color="#FCA311" size={60} css={{ marginTop: "16px" }} />
      ) : (
        <Button
          variant="contained"
          sx={{ mt: 2, bgcolor: "#fcbf49", color: "black" }}
          onClick={handleClick}
        >
          Get Started
        </Button>
      )}
      <Box
        sx={{
          mt: 12,
          display: "flex",
          flexDirection: "row", // Align items in a row
          gap: 5,
          p: 4, // Add spacing between items (optional)
        }}
      >
        <Paper
          elevation={9}
          sx={{
            p: 4,
            maxWidth: "400px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "#fcbf49",
          }}
        >
          <Typography
            variant="h5"
            color={"black"}
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            Find Your Professor
          </Typography>
          <Typography variant="body1" color={"black"}>
            Discover reviews and ratings for professors from universities across
            the country. Quickly find out what students have to say about their
            teaching style, class experience, and more.
          </Typography>
        </Paper>
        <Paper
          elevation={9}
          sx={{
            p: 4,
            maxWidth: "400px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "#fcbf49",
          }}
        >
          <Typography
            variant="h5"
            color={"black"}
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            Share Your Experience
          </Typography>
          <Typography variant="body1" color={"black"}>
            Have you taken a class with a professor? Leave a review and help
            future students make informed decisions. Your feedback contributes
            to a community of knowledgeable learners.
          </Typography>
        </Paper>
        <Paper
          elevation={9}
          sx={{
            p: 4,
            maxWidth: "400px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "#fcbf49",
          }}
        >
          <Typography
            variant="h5"
            color={"black"}
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            Compare Ratings
          </Typography>
          <Typography variant="body1" color={"black"}>
            Compare ratings of different professors and classes to choose the
            best option for your academic needs. Make well-informed choices to
            enhance your educational experience.
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
}
