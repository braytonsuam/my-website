// ===== NAVIGATION FUNCTION =====
function showSection(sectionId) {
    document.querySelectorAll(".content-section").forEach(s => s.style.display = "none");
    const target = document.getElementById(sectionId);
    if (target) target.style.display = "block";

    document.querySelectorAll(".nav-links a").forEach(l => l.classList.remove("active"));
    const active = document.querySelector(`.nav-links a[onclick="showSection('${sectionId}')"]`);
    if (active) active.classList.add("active");
}

// Show home on load
window.addEventListener("DOMContentLoaded", () => showSection("home"));

// ===== SAFARI ITINERARY FORMS =====
const safariSelect = document.getElementById("safariDays");
const safariForms = document.querySelectorAll(".safariForm");

safariSelect.addEventListener("change", () => {
    safariForms.forEach(f => f.style.display = "none");
    const selected = safariSelect.value;
    if (selected) document.getElementById(selected).style.display = "block";
});

// Function to send WhatsApp and Email
function sendMessage(name, email, message, safariType) {
    const phone = "255626552784";
    const encodedText = encodeURIComponent(
        `🦁 *${safariType}*%0A👤 Name: ${name}%0A📧 Email: ${email}%0A💬 Message: ${message}`
    );

    // Open WhatsApp
    window.open(`https://wa.me/${phone}?text=${encodedText}`, "_blank");

    // Open Email client
    const subject = encodeURIComponent(`Safari Inquiry: ${safariType}`);
    const body = decodeURIComponent(encodedText.replace(/%0A/g, "\n"));
    window.location.href = `mailto:sumabrayton0203@gmail.com?subject=${subject}&body=${body}`;
}

// Safari inquiry forms submission
document.querySelectorAll(".safariForm").forEach(form => {
    form.addEventListener("submit", function(e) {
        e.preventDefault();
        const safariType = this.querySelector("h3").innerText;
        const name = this.querySelector("input[type='text']").value;
        const email = this.querySelector("input[type='email']").value;
        const message = this.querySelector("textarea").value;

        // WhatsApp
        const phone = "255626552784";
        const waText = encodeURIComponent(
            `🦁 *${safariType}*%0A
            👤 Name: ${name}%0A
            📧 Email: ${email}%0A
            💬 Message: ${message}`
        );
        window.open(`https://wa.me/${phone}?text=${waText}`, "_blank");

        // EmailJS
        emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
            safariType: safariType,
            name: name,
            email: email,
            message: message
        })
        .then(() => alert("✅ Inquiry sent successfully via WhatsApp & Email!"))
        .catch(err => alert("❌ Failed to send email: " + err));

        this.reset();
    });
});



// ===== BOOKING FORM with EmailJS =====
document.getElementById("bookingForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const visitDateTime = this.visitDateTime.value;
    const parks = this.parks.value;
    const days = this.days.value;
    const fullName = this.fullName.value;
    const country = this.country.value;
    const familyInfo = this.familyInfo.value;
    const email = this.email.value;
    const phone = this.phone.value;

    // ===== WhatsApp Message =====
    const phoneWhatsApp = "255626552784";
    const waText = encodeURIComponent(
        `🦓 *New Safari Booking Request*%0A
        📅 Date & Time: ${visitDateTime}%0A
        🏞️ Parks: ${parks}%0A
        ⏳ Days: ${days}%0A
        👤 Name: ${fullName}%0A
        🌍 Country: ${country}%0A
        👨‍👩‍👧 Family: ${familyInfo}%0A
        📧 Email: ${email}%0A
        📱 Contact: ${phone}`
    );
    window.open(`https://wa.me/${phoneWhatsApp}?text=${waText}`, "_blank");

    // ===== EmailJS =====
    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
        visitDateTime: visitDateTime,
        parks: parks,
        days: days,
        fullName: fullName,
        country: country,
        familyInfo: familyInfo,
        email: email,
        phone: phone
    })
    .then(function(response) {
        alert("✅ Booking sent successfully via WhatsApp & Email!");
        console.log("SUCCESS!", response.status, response.text);
    }, function(error) {
        alert("❌ Failed to send email: " + error.text);
        console.log("FAILED...", error);
    });

    this.reset();
});
