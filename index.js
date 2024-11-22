const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Helper functions
const isPrime = (num) => {
  if (num <= 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
};

// POST endpoint
app.post("/bfhl", (req, res) => {
  try {
    const { data = [], file_b64 } = req.body;

    // User details
    const userId = "john_doe_17091999"; // Replace with your name and DOB
    const email = "john@xyz.com";
    const rollNumber = "ABCD123";

    // Separate numbers and alphabets
    const numbers = data.filter((item) => /^[0-9]+$/.test(item));
    const alphabets = data.filter((item) => /^[a-zA-Z]$/.test(item));

    // Find the highest lowercase alphabet
    const lowercase = alphabets.filter((item) => /^[a-z]$/.test(item));
    const highestLowercase = lowercase.sort().pop() || null;

    // Check for prime numbers
    const isPrimeFound = numbers.some((num) => isPrime(parseInt(num)));

    // Handle file information
    let fileValid = false,
      fileMimeType = null,
      fileSizeKb = null;

    if (file_b64) {
      try {
        const fileBuffer = Buffer.from(file_b64, "base64");
        fileValid = true;
        fileMimeType = "application/octet-stream"; // Mock MIME type
        fileSizeKb = (fileBuffer.length / 1024).toFixed(2); // File size in KB
      } catch (error) {
        fileValid = false;
      }
    }

    // Construct the response
    const response = {
      is_success: true,
      user_id: userId,
      email,
      roll_number: rollNumber,
      numbers,
      alphabets,
      highest_lowercase_alphabet: highestLowercase,
      is_prime_found: isPrimeFound,
      file_valid: fileValid,
      file_mime_type: fileMimeType,
      file_size_kb: fileSizeKb,
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({ is_success: false, error: error.message });
  }
});

// GET endpoint
app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
