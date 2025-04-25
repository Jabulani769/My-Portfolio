    // Toggle menu and icon on click
    document.addEventListener("DOMContentLoaded", () => {
        const menu = document.getElementById("myLinks");
        const icon = document.getElementById("menu-icon");
        const links = document.querySelectorAll('#myLinks a');

        // Toggle menu and icon on click
        window.myFunction = function () {
            menu.classList.toggle("hidden");

        // Toggle icon
        if (icon.classList.contains("fa-bars")) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-times");
        } else {
            icon.classList.remove("fa-times");
            icon.classList.add("fa-bars");
        }
    };

        // Auto-close menu and reset icon when a link is clicked
        links.forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.add("hidden");
                icon.classList.remove("fa-times");
                icon.classList.add("fa-bars");
            });
        });
    });


    // Toggle the portfolio section
    function togglePortfolio() {
        const header = document.getElementById('portfolio');
        header.classList.toggle('hidden');
    }

    // my portfolio manu script
    function showCategory(category) {
    document.querySelectorAll('.tab-content').forEach(div => {
      div.classList.add('hidden');
    });

    // Reset all buttons to default
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.remove('bg-orange-500', 'text-white');
      btn.classList.add('bg-[#f5f5f5]', 'text-black');
    });

    // Show selected section
    document.querySelectorAll(`.${category}`).forEach(div => {
      div.classList.remove('hidden');
    });

    // Highlight active button
    const activeBtn = Array.from(document.querySelectorAll('.tab-btn'))
      .find(btn => btn.textContent.toLowerCase() === category);
    if (activeBtn) {
      activeBtn.classList.add('bg-orange-500', 'text-white');
      activeBtn.classList.remove('bg-[#f5f5f5]', 'text-black');
    }
  }

  // Show new by default on page load
  document.addEventListener('DOMContentLoaded', () => {
    showCategory('new');
  });