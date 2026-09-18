fetch("http://localhost:5000/api/contact", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "Test", email: "test@example.com", message: "Local test" })
}).then(res => res.json()).then(console.log).catch(console.error);
