"use client";
import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";
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

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      width="auto"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        backgroundImage: 'url("/path/to/your/background-image.jpg")', // Replace with your image path
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        p: 2, // Padding to prevent content from touching edges on small screens
      }}
    >
      <Typography
        variant={isMobile ? "h3" : "h1"}
        gutterBottom
        color={"white"}
        align="center"
        sx={{
          fontWeight: "bold",
          fontSize: isMobile ? "2.5rem" : "4rem",
          mb: 2,
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
        }}
      >
        Welcome to ProfessorPulse
      </Typography>
      <Typography
        variant={isMobile ? "h5" : "h3"}
        gutterBottom
        color={"white"}
        align="center"
        sx={{
          fontWeight: "normal",
          fontSize: isMobile ? "1.5rem" : "2.5rem",
          mb: 4,
          textShadow: "1px 1px 3px rgba(0, 0, 0, 0.6)",
        }}
      >
        Find the best professors based on your needs.
      </Typography>
      {loading ? (
        <RingLoader color="#FCA311" size={60} css={{ marginTop: "16px" }} />
      ) : (
        <Button
          variant="contained"
          sx={{
            mt: 2,
            bgcolor: "#fcbf49",
            color: "black",
            fontSize: isMobile ? "0.875rem" : "1rem",
          }}
          onClick={handleClick}
        >
          Get Started
        </Button>
      )}
      <Box
        sx={{
          mt: isMobile ? 4 : 12,
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: 2,
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          p: 10,
        }}
      >
        <Paper
          elevation={9}
          sx={{
            p: 3,
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
            variant={isMobile ? "h6" : "h5"}
            color={"black"}
            gutterBottom
            sx={{
              fontWeight: "bold",
              fontSize: isMobile ? "1.25rem" : "1.5rem",
              textAlign: "center",
            }}
          >
            Find Your Professor
          </Typography>
          <Typography
            variant={isMobile ? "body2" : "body1"}
            color={"black"}
            sx={{
              fontSize: isMobile ? "0.875rem" : "1rem",
              textAlign: "center",
            }}
          >
            Discover reviews and ratings for professors from universities across
            the country. Quickly find out what students have to say about their
            teaching style, class experience, and more.
          </Typography>
        </Paper>
        <Paper
          elevation={9}
          sx={{
            p: 3,
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
            variant={isMobile ? "h6" : "h5"}
            color={"black"}
            gutterBottom
            sx={{
              fontWeight: "bold",
              fontSize: isMobile ? "1.25rem" : "1.5rem",
              textAlign: "center",
            }}
          >
            Share Your Experience
          </Typography>
          <Typography
            variant={isMobile ? "body2" : "body1"}
            color={"black"}
            sx={{
              fontSize: isMobile ? "0.875rem" : "1rem",
              textAlign: "center",
            }}
          >
            Have you taken a class with a professor? Leave a review and help
            future students make informed decisions. Your feedback contributes
            to a community of knowledgeable learners.
          </Typography>
        </Paper>
        <Paper
          elevation={9}
          sx={{
            p: 3,
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
            variant={isMobile ? "h6" : "h5"}
            color={"black"}
            gutterBottom
            sx={{
              fontWeight: "bold",
              fontSize: isMobile ? "1.25rem" : "1.5rem",
              textAlign: "center",
            }}
          >
            Compare Ratings
          </Typography>
          <Typography
            variant={isMobile ? "body2" : "body1"}
            color={"black"}
            sx={{
              fontSize: isMobile ? "0.875rem" : "1rem",
              textAlign: "center",
            }}
          >
            Compare ratings of different professors and classes to choose the
            best option for your academic needs. Make well-informed choices to
            enhance your educational experience.
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
}
