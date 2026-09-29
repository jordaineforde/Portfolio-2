document.addEventListener("DOMContentLoaded", () => {

    // 1. Typing Animation Logic (Slowed down to 65ms per character)
    const text = "Bridging technology, business and policy to build a smarter, more responsible future.";
    const introElement = document.getElementById("typing-intro");

    if (introElement) {
        let charIndex = 0;
        introElement.innerHTML = '<span class="cursor"></span>';

        function typeWriter() {
            if (charIndex < text.length) {
                introElement.innerHTML = text.substring(0, charIndex + 1) + '<span class="cursor"></span>';
                charIndex++;
                setTimeout(typeWriter, 65);
            }
        }

        setTimeout(typeWriter, 200);
    }

    // 2. Search Bar & Preview Logic
    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");
    const searchResults = document.getElementById("search-results");
    const hoverPreview = document.getElementById("hover-preview");

    if (hoverPreview) {
        hoverPreview.innerHTML = "";
    }

    const portfolioData = [
        {
            title: "Lab Projects",
            category: "Computing & AI",
            url: "lab_projects.html",
            description: "Explore my computing projects, Python tools, and system architecture work."
        },
        {
            title: "About Me",
            category: "Background",
            url: "about_me.html",
            description: "Learn more about my background in computing, business analysis, and policy."
        },
        {
            title: "My CV",
            category: "Experience",
            url: "my_cv.html",
            description: "View my professional experience, education, and technical skillsets."
        },
        {
            title: "Contact",
            category: "Connect",
            url: "contact.html",
            description: "Get in touch for professional opportunities, mentorship, or collaborations."
        }
    ];

    function performSearch(query) {
        if (!searchResults) return;
        
        searchResults.innerHTML = "";
        const searchTerm = query.toLowerCase().trim();

        if (searchTerm === "") {
            searchResults.style.display = "none";
            return;
        }

        const filtered = portfolioData.filter(item => 
            item.title.toLowerCase().includes(searchTerm) || 
            item.category.toLowerCase().includes(searchTerm) ||
            item.description.toLowerCase().includes(searchTerm)
        );

        searchResults.style.display = "block";

        if (filtered.length === 0) {
            searchResults.innerHTML = `<div class="no-results">No matching results found for "${query}"</div>`;
            return;
        }

        filtered.forEach(item => {
            const resultDiv = document.createElement("div");
            resultDiv.classList.add("results");
            resultDiv.innerHTML = `
                <a href="${item.url}">${item.title} (${item.category})</a>
                <p>${item.description}</p>
            `;
            searchResults.appendChild(resultDiv);
        });
    }

    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            performSearch(e.target.value);
        });

        searchInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                performSearch(searchInput.value);
            }
        });
    }

    if (searchBtn) {
        searchBtn.addEventListener("click", () => {
            if (searchInput) {
                performSearch(searchInput.value);
            }
        });
    }
});
