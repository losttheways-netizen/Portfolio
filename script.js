document.addEventListener("DOMContentLoaded", () => {

    console.log("JS WORKING ✅");

    /* HEADLINE */
    document.getElementById("headline")?.classList.add("active");
    document.getElementById("subtitle2")?.classList.add("active");
    /* SCROLL FLOAT (ถ้ายังใช้) */
    window.addEventListener("scroll", () => {
        const scrollY = window.scrollY;

        document.querySelectorAll(".scroll-float").forEach((el, i) => {
            const speed = (i + 1) * 0.2;
            el.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });

    /* ================= BUBBLE SYSTEM ================= */

    const bubbles = document.querySelectorAll(".bubble");

    if (bubbles.length === 0) {
        console.log("❌ NO BUBBLES FOUND");
        return;
    }

    const mouse = { x: 0, y: 0 };

    window.addEventListener("mousemove", (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    const bubbleData = [];

    bubbles.forEach((el) => {
        bubbleData.push({
            el: el,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 1,
            vy: (Math.random() - 0.5) * 1,
            size: el.offsetWidth || 120
        });
    });

    function animate() {

        bubbleData.forEach(b => {

            b.x += b.vx;
            b.y += b.vy;

            /* bounce */
            if (b.x <= 0 || b.x + b.size >= window.innerWidth) b.vx *= -1;
            if (b.y <= 0 || b.y + b.size >= window.innerHeight) b.vy *= -1;

            /* repel */
            const dx = b.x - mouse.x;
            const dy = b.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 120) {
                const angle = Math.atan2(dy, dx);
                const force = (120 - dist) / 120;

                b.vx += Math.cos(angle) * force * 2;
                b.vy += Math.sin(angle) * force * 2;
            }

            /* smooth */
            b.vx *= 0.99;
            b.vy *= 0.99;

            b.el.style.transform = `translate(${b.x}px, ${b.y}px)`;
        });

        requestAnimationFrame(animate);
    }

    animate();

    /* ================= MODAL ================= */

    window.openModal = function (src) {
        const modal = document.getElementById("modal");
        const modalImg = document.getElementById("modal-img");

        modal.classList.add("show");
        modalImg.src = src;
    };

    window.closeModal = function () {
        document.getElementById("modal").classList.remove("show");
    };

});
