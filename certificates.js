// Certificate data with image paths
const certificateData = {
  cc: {
    name: "CC",
    fullName: "Certified in Cybersecurity",
    issuer: "ISC²",
    date: "2025",
    credentialId: "bc699cdc-4e54-458b-b250-669c69de9910",
    imagePath: "images/isc2-candidate.png",
    description:
      "Official ISC2 Online Self-Paced Certified in Cybersecurity (CC) Training is a groundbreaking way to prep for certification that uses artificial intelligence to customize your learning journey.",
    verifyUrl: "https://www.credly.com/badges/bc699cdc-4e54-458b-b250-669c69de9910/public_url",
  }
}

// Initialize certificates page
document.addEventListener("DOMContentLoaded", () => {
  // Update certificate images with proper paths
  updateCertificateImages()

  // Add loading effect to certificate images
  const certImages = document.querySelectorAll(".cert-image")
  certImages.forEach((img) => {
    img.addEventListener("load", function () {
      this.style.animation = "none"
    })

    // Handle image loading errors
    img.addEventListener("error", function () {
      this.src = "images/placeholder-cert.jpg"
      console.log(`Failed to load certificate image: ${this.src}`)
    })
  })

  // Add click handlers to certificate cards
  const certCards = document.querySelectorAll(".certificate-card")
  certCards.forEach((card) => {
    card.addEventListener("click", function (e) {
      // Don't trigger card click if button was clicked
      if (e.target.closest(".cert-btn")) {
        return
      }
      const certId = this.getAttribute("data-cert")
      viewCertificate(certId)
    })
  })

  // Modal functionality
  const modal = document.getElementById("certificateModal")
  const closeBtn = document.querySelector(".close")

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      closeModal()
    })
  }

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal()
    }
  })

  // Add keyboard navigation
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal && modal.style.display === "block") {
      closeModal()
    }
  })
})

// Update certificate images with proper paths
function updateCertificateImages() {
  Object.keys(certificateData).forEach((certId) => {
    const cert = certificateData[certId]
    const imgElement = document.querySelector(`[data-cert="${certId}"] .cert-image`)
    if (imgElement) {
      imgElement.src = cert.imagePath
      imgElement.alt = `${cert.name} Certificate`
    }
  })
}

// View certificate function
function viewCertificate(certId) {
  const cert = certificateData[certId]
  if (!cert) {
    console.error(`Certificate data not found for: ${certId}`)
    return
  }

  const modal = document.getElementById("certificateModal")
  const modalTitle = document.getElementById("modalTitle")
  const modalImage = document.getElementById("modalImage")
  const modalCertName = document.getElementById("modalCertName")
  const modalCertDesc = document.getElementById("modalCertDesc")
  const modalIssuer = document.getElementById("modalIssuer")
  const modalDate = document.getElementById("modalDate")
  const modalCredId = document.getElementById("modalCredId")

  if (!modal || !modalTitle || !modalImage) {
    console.error("Modal elements not found")
    return
  }

  // Update modal content
  modalTitle.textContent = cert.fullName
  modalImage.src = cert.imagePath
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

  // Prevent body scrolling when modal is open
  document.body.style.overflow = "hidden"
}

// Close modal function
function closeModal() {
  const modal = document.getElementById("certificateModal")
  if (modal) {
    modal.style.opacity = "0"
    setTimeout(() => {
      modal.style.display = "none"
      document.body.style.overflow = "auto"
    }, 300)
  }
}

// Verify certificate function
function verifyCertificate(certId) {
  const cert = certificateData[certId]
  if (!cert) {
    console.error(`Certificate data not found for: ${certId}`)
    return
  }

  // Create verification popup
  const popup = document.createElement("div")
  popup.className = "verify-popup"
  popup.innerHTML = `
        <div class="verify-content">
            <div class="verify-header">
                <h3><i class="fas fa-certificate"></i> Verify Certificate</h3>
                <button class="close-verify-btn" onclick="this.closest('.verify-popup').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="verify-body">
                <div class="cert-info">
                    <h4>${cert.fullName}</h4>
                    <p><strong>Issuer:</strong> ${cert.issuer}</p>
                    <p><strong>Date Earned:</strong> ${cert.date}</p>
                    <p><strong>Credential ID:</strong> ${cert.credentialId}</p>
                </div>
                <p class="verify-instruction">Click the link below to verify this certificate on Credly:</p>
                <a href="${cert.verifyUrl}" target="_blank" class="verify-link">
                    <i class="fas fa-external-link-alt"></i>
                    Verify on Credly
                </a>
                <button onclick="this.closest('.verify-popup').remove()" class="close-verify">Close</button>
            </div>
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
        animation: fadeIn 0.3s ease;
    `

  const verifyContent = popup.querySelector(".verify-content")
  verifyContent.style.cssText = `
        background: var(--accent-color);
        border-radius: 15px;
        border: 2px solid var(--primary-color);
        max-width: 500px;
        width: 90%;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        animation: slideIn 0.3s ease;
    `

  const verifyHeader = popup.querySelector(".verify-header")
  verifyHeader.style.cssText = `
        background: var(--gradient);
        color: var(--secondary-color);
        padding: 1.5rem;
        border-radius: 13px 13px 0 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
    `

  const verifyBody = popup.querySelector(".verify-body")
  verifyBody.style.cssText = `
        padding: 2rem;
        text-align: center;
    `

  const certInfo = popup.querySelector(".cert-info")
  certInfo.style.cssText = `
        background: var(--secondary-color);
        padding: 1rem;
        border-radius: 8px;
        margin-bottom: 1.5rem;
        border: 1px solid var(--border-color);
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
        transition: transform 0.3s ease, box-shadow 0.3s ease;
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

  const closeVerifyBtn = popup.querySelector(".close-verify-btn")
  closeVerifyBtn.style.cssText = `
        background: none;
        border: none;
        color: var(--secondary-color);
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 50%;
        transition: background 0.3s ease;
    `

  document.body.appendChild(popup)

  // Add hover effects
  verifyLink.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-2px)"
    this.style.boxShadow = "0 5px 15px rgba(20, 184, 166, 0.3)"
  })

  verifyLink.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)"
    this.style.boxShadow = "none"
  })

  closeBtn.addEventListener("mouseenter", function () {
    this.style.background = "var(--primary-color)"
    this.style.color = "var(--secondary-color)"
  })

  closeBtn.addEventListener("mouseleave", function () {
    this.style.background = "transparent"
    this.style.color = "var(--primary-color)"
  })

  closeVerifyBtn.addEventListener("mouseenter", function () {
    this.style.background = "rgba(255, 255, 255, 0.2)"
  })

  closeVerifyBtn.addEventListener("mouseleave", function () {
    this.style.background = "none"
  })

  // Prevent body scrolling
  document.body.style.overflow = "hidden"

  // Close popup when clicking outside
  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      popup.remove()
      document.body.style.overflow = "auto"
    }
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

// Add search functionality
function addCertificateSearch() {
  const searchContainer = document.createElement("div")
  searchContainer.className = "cert-search"
  searchContainer.innerHTML = `
        <div class="search-wrapper">
            <input type="text" placeholder="Search certificates..." class="search-input">
            <i class="fas fa-search search-icon"></i>
        </div>
    `

  // Add search styles
  searchContainer.style.cssText = `
    margin-bottom: 2rem;
    display: flex;
    justify-content: center;
  `

  const searchWrapper = searchContainer.querySelector(".search-wrapper")
  searchWrapper.style.cssText = `
    position: relative;
    max-width: 400px;
    width: 100%;
  `

  const searchInput = searchContainer.querySelector(".search-input")
  searchInput.style.cssText = `
    width: 100%;
    padding: 12px 45px 12px 15px;
    background: var(--secondary-color);
    border: 2px solid var(--border-color);
    border-radius: 25px;
    color: var(--text-color);
    font-size: 1rem;
    transition: all 0.3s ease;
  `

  const searchIcon = searchContainer.querySelector(".search-icon")
  searchIcon.style.cssText = `
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--primary-color);
    font-size: 1.1rem;
  `

  const certificatesSection = document.querySelector(".certificates-section .container")
  if (certificatesSection) {
    certificatesSection.insertBefore(searchContainer, certificatesSection.firstChild)

    searchInput.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase()
      const cards = document.querySelectorAll(".certificate-card")

      cards.forEach((card) => {
        const certId = card.getAttribute("data-cert")
        const cert = certificateData[certId]
        if (cert) {
          const searchableText = `${cert.name} ${cert.fullName} ${cert.issuer}`.toLowerCase()

          if (searchableText.includes(searchTerm)) {
            card.style.display = "block"
            card.style.animation = "fadeIn 0.3s ease"
          } else {
            card.style.display = "none"
          }
        }
      })
    })

    // Focus styles
    searchInput.addEventListener("focus", function () {
      this.style.borderColor = "var(--primary-color)"
      this.style.boxShadow = "0 0 10px rgba(20, 184, 166, 0.3)"
    })

    searchInput.addEventListener("blur", function () {
      this.style.borderColor = "var(--border-color)"
      this.style.boxShadow = "none"
    })
  }
}

// Initialize search functionality
document.addEventListener("DOMContentLoaded", addCertificateSearch)

// Add CSS animations
const style = document.createElement("style")
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slideIn {
    from { transform: translateY(-50px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
`
document.head.appendChild(style)

// Console welcome message
console.log(
  `
%c
 ███████╗██╗██████╗ ██╗   ██╗███████╗
 ██╔════╝██║██╔══██╗██║   ██║██╔════╝
 ███████╗██║██████╔╝██║   ██║███████╗
 ╚════██║██║██╔══██╗██║   ██║╚════██║
 ███████║██║██║  ██║╚██████╔╝███████║
 ╚══════╝╚═╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝
 
 Certificates Page Loaded Successfully!
 
`,
  "color: #14b8a6; font-family: monospace;",
)

console.log("%cCertificate functionality ready! 🎓", "color: #14b8a6; font-size: 16px; font-weight: bold;")
