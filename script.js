document.addEventListener("DOMContentLoaded", () => {
  // Chart Configuration
  const ctx = document.getElementById("weeklyChart").getContext("2d");

  const gradientFill = ctx.createLinearGradient(0, 0, 0, 400);
  gradientFill.addColorStop(0, "rgba(45, 96, 255, 0.5)"); // Start color
  gradientFill.addColorStop(1, "rgba(255, 255, 255, 0)"); // End color

  const weeklyChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
      datasets: [
        {
          label: "Deposit",
          data: [450, 320, 480, 200, 300, 450, 500],
          backgroundColor: "#1814F3",
          borderRadius: 20,
          barThickness: 15,
        },
        {
          label: "Withdraw",
          data: [200, 150, 300, 100, 150, 280, 350],
          backgroundColor: "#16DBCC",
          borderRadius: 20,
          barThickness: 15,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
          align: "end",
          labels: {
            usePointStyle: true,
            pointStyle: "circle",
            padding: 20,
            font: {
              family: "Outfit",
              size: 12,
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            display: true,
            drawBorder: false,
            color: "rgba(223, 234, 242, 0.5)",
          },
          ticks: {
            font: {
              family: "Outfit",
            },
          },
        },
        x: {
          grid: {
            display: false,
            drawBorder: false,
          },
          ticks: {
            font: {
              family: "Outfit",
            },
          },
        },
      },
    },
  });

    // Mobile Menu Toggle Logic
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if(menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            if(navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
            }
        });
    }

    // Sidebar Navigation & View Switching
    const navItems = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('.view-section');
    const pageTitle = document.getElementById('page-title');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // 1. Update Active State on Sidebar
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            // 2. Get Target View
            const targetId = item.getAttribute('data-target');
            const targetTitle = item.querySelector('span').textContent;

            // 3. Switch View
            sections.forEach(section => {
                if(section.id === targetId) {
                    section.style.display = 'block';
                    // Re-render chart if analytics or dashboard is shown (workaround for canvas context issues sometimes)
                } else {
                    section.style.display = 'none';
                }
            });

            // 4. Update Header Title
            if(pageTitle) {
                if(targetId === 'dashboard') pageTitle.textContent = 'Overview';
                else pageTitle.textContent = targetTitle;
            }
        });
    });

    // Quick Transfer User Selection Logic
    const userAvatars = document.querySelectorAll('.user-avatar');
    userAvatars.forEach(avatar => {
        avatar.addEventListener('click', () => {
            userAvatars.forEach(a => a.classList.remove('selected'));
            avatar.classList.add('selected');
        });
    });
});
