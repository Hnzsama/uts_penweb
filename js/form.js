function initForm() {
  const form = document.getElementById("contactForm");
  const feedback = document.getElementById("formFeedback");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    // e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (name.length < 3) {
      showFeedback("Nama wajib diisi minimal 3 karakter!", "error");
      return;
    }

    if (!emailRegex.test(email)) {
      showFeedback("Format alamat email tidak valid!", "error");
      return;
    }

    if (message.length < 5) {
      showFeedback("Pesan wajib diisi minimal 5 karakter!", "error");
      return;
    }

    showFeedback(`Terima kasih, ${name}! Pesan Anda berhasil dikirim.`, "success");
    form.reset();
  });

  function showFeedback(text, type) {
    if (!feedback) return;
    feedback.textContent = text;
    feedback.className = `feedback-box ${type}`;
    feedback.style.display = "block";
  }
}
