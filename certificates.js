// Certificate data
const certificateData = {
  cissp: {
    name: "CISSP",
    fullName: "Certified Information Systems Security Professional",
    issuer: "ISC²",
    date: "March 2023",
    credentialId: "CISSP-123456",
    description:
      "The CISSP certification validates expertise in designing, implementing, and managing cybersecurity programs. This certification demonstrates advanced knowledge in security and risk management, asset security, security architecture, and more.",
    verifyUrl: "https://www.isc2.org/Certifications/CISSP",
  },
  ceh: {
    name: "CEH",
    fullName: "Certified Ethical Hacker",
    issuer: "EC-Council",
    date: "August 2022",
    credentialId: "CEH-789012",
    description:
      "The CEH certification demonstrates the ability to think and act like a malicious hacker in order to better defend against attacks. This certification covers penetration testing, vulnerability assessment, and ethical hacking methodologies.",
    verifyUrl: "https://www.eccouncil.org/programs/certified-ethical-hacker-ceh/",
  },
  secplus: {
    name: "Security+",
    fullName: "CompTIA Security+",
    issuer: "CompTIA",
    date: "June 2021",
    credentialId: "COMP001021345678",
    description:
      "CompTIA Security+ is a global certification that validates the baseline skills necessary to perform core security functions and pursue an IT security career. It covers network security, compliance, threats and vulnerabilities.",
    verifyUrl: "https://www.comptia.org/certifications/security",
  },
  gcih: {
    name: "GCIH",
    fullName: "GIAC Certified Incident Handler",
    issuer: "SANS/GIAC",
    date: "January 2023",
    credentialId: "GCIH-345678",
    description:
      "The GCIH certification validates the ability to detect, respond to, and resolve computer security incidents. This certification demonstrates expertise in incident handling, digital forensics, and malware analysis.",
    verifyUrl: "https://www.giac.org/certification/certified-incident-handler-gcih",
  },
  oscp: {
    name: "OSCP",
    fullName: "Offensive Security Certified Professional",
    issuer: "Offensive Security",
    date: "November 2022",
    credentialId: "OSCP-901234",
    description:
      "The OSCP certification is a hands-on penetration testing certification that requires candidates to successfully attack and penetrate various live machines in a safe lab environment. It demonstrates practical penetration testing skills.",
    verifyUrl: "https://www.offensive-security.com/pwk-oscp/",
  },
  cism: {
    name: "CISM",
    fullName: "Certified Information Security Manager",
    issuer: "ISACA",
    date: "September 2023",
    credentialId: "CISM-567890",
    description:
      "The CISM certification is designed for individuals who manage, design, oversee and assess an enterprise's information security program. It demonstrates expertise in information security governance, risk management, and incident management.",
    verifyUrl: "https://www.isaca.org/credentialing/cism",
  },
}

// Initialize certificates page
document.addEventListener("DOMContentLoaded", () => {
  // Add loading effect to certificate images
  const certImages = document.querySelectorAll(".cert-image")
  certImages.forEach((img) => {
    img.addEventListener("load", function () {
      this.style.animation = "none"
    })
  })

  // Add click handlers to certificate cards
  const certCards = document.querySelectorAll(".certificate-card")
  certCards.forEach((card) => {
    card.addEventListener("click", function () {
      const certId = this.getAttribute("data-cert")
      viewCertificate(certId)
    })
  })

  // Modal functionality
  const modal = document.getElementById("certificateModal")
  const closeBtn = document.querySelector(".close")

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none"
  })

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none"
    }
  })

  // Add keyboard navigation
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.style.display === "block") {
      modal.style.display = "none"
    }
  })
})

// View certificate function
function viewCertificate(certId) {
  const cert = certificateData[certId]
  if (!cert) return

  const modal = document.getElementById("certificateModal")
  const modalTitle = document.getElementById("modalTitle")
  const modalImage = document.getElementById("modalImage")
  const modalCertName = document.getElementById("modalCertName")
  const modalCertDesc = document.getElementById("modalCertDesc")
  const modalIssuer = document.getElementById("modalIssuer")
  const modalDate = document.getElementById("modalDate")
  const modalCredId = document.getElementById("modalCredId")

  // Update modal content
  modalTitle.textContent = cert.fullName
  modalImage.src = `/placeholder.svg?height=400&width=600&text=${cert.name}+Certificate`
  modalImage.alt = `${cert.name} Certificate`
  modalCertName.textContent = cert.fullName
  modalCertDesc.textContent = cert.description
  modalIssuer.textContent = cert.issuer
  modalDate.textContent = cert.date
  modalCredId.textContent = cert.credentialId

  // Show modal with animation
  modal.style.display = "block"
  modal.style.opacity = "0"
  setTimeout(() => {
    modal.style.opacity = "1"
  }, 10)
}

// Verify certificate function
function verifyCertificate(certId) {
  const cert = certificateData[certId]
  if (!cert) return

  // Create verification popup
  const popup = document.createElement("div")
  popup.className = "verify-popup"
  popup.innerHTML = `
        <div class="verify-content">
            <h3>Verify Certificate</h3>
            <p>Click the link below to verify this certificate on the official ${cert.issuer} website:</p>
            <a href="${cert.verifyUrl}" target="_blank" class="verify-link">
                <i class="fas fa-external-link-alt"></i>
                Verify on ${cert.issuer} Website
            </a>
            <p class="verify-id">Credential ID: <strong>${cert.credentialId}</strong></p>
            <button onclick="this.parentElement.parentElement.remove()" class="close-verify">Close</button>
        </div>
    `

  // Style the popup
  popup.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 3000;
        backdrop-filter: blur(5px);
    `

  const verifyContent = popup.querySelector(".verify-content")
  verifyContent.style.cssText = `
        background: var(--accent-color);
        padding: 2rem;
        border-radius: 15px;
        border: 2px solid var(--primary-color);
        text-align: center;
        max-width: 400px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    `

  const verifyLink = popup.querySelector(".verify-link")
  verifyLink.style.cssText = `
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        background: var(--gradient);
        color: var(--secondary-color);
        padding: 12px 24px;
        border-radius: 5px;
        text-decoration: none;
        margin: 1rem 0;
        font-weight: bold;
        transition: transform 0.3s ease;
    `

  const closeBtn = popup.querySelector(".close-verify")
  closeBtn.style.cssText = `
        background: transparent;
        border: 2px solid var(--primary-color);
        color: var(--primary-color);
        padding: 8px 16px;
        border-radius: 5px;
        cursor: pointer;
        margin-top: 1rem;
        transition: all 0.3s ease;
    `

  document.body.appendChild(popup)

  // Add hover effects
  verifyLink.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-2px)"
  })

  verifyLink.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)"
  })

  closeBtn.addEventListener("mouseenter", function () {
    this.style.background = "var(--primary-color)"
    this.style.color = "var(--secondary-color)"
  })

  closeBtn.addEventListener("mouseleave", function () {
    this.style.background = "transparent"
    this.style.color = "var(--primary-color)"
  })
}

// Add parallax effect to certificate cards
document.addEventListener("mousemove", (e) => {
  const cards = document.querySelectorAll(".certificate-card")
  const mouseX = e.clientX
  const mouseY = e.clientY

  cards.forEach((card) => {
    const rect = card.getBoundingClientRect()
    const cardX = rect.left + rect.width / 2
    const cardY = rect.top + rect.height / 2

    const deltaX = (mouseX - cardX) / 50
    const deltaY = (mouseY - cardY) / 50

    if (card.matches(":hover")) {
      card.style.transform = `translateY(-10px) scale(1.02) rotateX(${deltaY}deg) rotateY(${deltaX}deg)`
    }
  })
})

// Reset transform when not hovering
document.querySelectorAll(".certificate-card").forEach((card) => {
  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1) rotateX(0) rotateY(0)"
  })
})

// Add certificate loading animation
function loadCertificateImages() {
  const images = document.querySelectorAll(".cert-image")
  images.forEach((img, index) => {
    setTimeout(() => {
      img.style.opacity = "1"
      img.style.transform = "scale(1)"
    }, index * 200)
  })
}

// Initialize loading animation
window.addEventListener("load", loadCertificateImages)

// Add search functionality (bonus feature)
function addCertificateSearch() {
  const searchContainer = document.createElement("div")
  searchContainer.className = "cert-search"
  searchContainer.innerHTML = `
        <input type="text" placeholder="Search certificates..." class="search-input">
        <i class="fas fa-search search-icon"></i>
    `

  const certificatesSection = document.querySelector(".certificates-section .container")
  certificatesSection.insertBefore(searchContainer, certificatesSection.firstChild)

  const searchInput = searchContainer.querySelector(".search-input")
  searchInput.addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase()
    const cards = document.querySelectorAll(".certificate-card")

    cards.forEach((card) => {
      const certId = card.getAttribute("data-cert")
      const cert = certificateData[certId]
      const searchableText = `${cert.name} ${cert.fullName} ${cert.issuer}`.toLowerCase()

      if (searchableText.includes(searchTerm)) {
        card.style.display = "block"
      } else {
        card.style.display = "none"
      }
    })
  })
}

// Initialize search functionality
document.addEventListener("DOMContentLoaded", addCertificateSearch)
