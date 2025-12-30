document.addEventListener('DOMContentLoaded', () => {
    const starContainer = document.getElementById('stars-container');
    const starCount = 150;
    let stars = [];

    function createStars() {
        for (let i = 0; i < starCount; i++) {
            const wrapper = document.createElement('div');
            wrapper.className = 'star-wrapper';
            
            // Posição inicial aleatória
            wrapper.style.left = `${Math.random() * 100}%`;
            wrapper.style.top = `${Math.random() * 100}%`;
            
            // Duração da subida (floatUp)
            const floatDuration = Math.random() * 40 + 10; 
            wrapper.style.setProperty('--duration', `${floatDuration}s`);

            const star = document.createElement('div');
            star.className = 'star';
            
            // Tamanho
            const size = Math.random() * 2 + 1;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            
            // Piscar (Twinkle) independente
            const twinkleDuration = Math.random() * 3 + 2; 
            star.style.setProperty('--twinkle-duration', `${twinkleDuration}s`);
            
            // Velocidade para o Paralaxe (Mouse)
            const speed = (Math.random() - 0.5) * 15; 
            star.setAttribute('data-speed', speed);

            // Monta a estrutura: Wrapper -> Star
            wrapper.appendChild(star);
            starContainer.appendChild(wrapper);
            
            stars.push(star);
        }
    }

    createStars();

    // --- Rastreamento do Mouse ---
    let mouseX = 0;
    let mouseY = 0;
    let windowCenterX = window.innerWidth / 2;
    let windowCenterY = window.innerHeight / 2;

    window.addEventListener('resize', () => {
        windowCenterX = window.innerWidth / 2;
        windowCenterY = window.innerHeight / 2;
    });

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX - windowCenterX);
        mouseY = (e.clientY - windowCenterY);
        
        requestAnimationFrame(animateStars);
    });

    function animateStars() {
        stars.forEach(star => {
            const speed = parseFloat(star.getAttribute('data-speed'));
            const x = (mouseX * speed) / 80;
            const y = (mouseY * speed) / 80;

            star.style.transform = `translate(${x}px, ${y}px)`;
        });
    }

    // --- Efeito de Digitação (Typewriter) ---
    const textElement = document.getElementById('typing-text');
    const texts = [
        "Desenvolvedor Fullstack.", 
        "Apaixonado por React & Node.", 
        "Criador de Soluções Escaláveis.",
        "Focado em Performance."
    ];
    let count = 0;
    let index = 0;
    let currentText = "";
    let letter = "";
    let isDeleting = false;

    (function type() {
        if (count === texts.length) { count = 0; }
        currentText = texts[count];

        if (isDeleting) {
            letter = currentText.slice(0, --index);
        } else {
            letter = currentText.slice(0, ++index);
        }

        textElement.textContent = letter;
        let typeSpeed = 100;

        if (isDeleting) { typeSpeed /= 2; }

        if (!isDeleting && letter.length === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && letter.length === 0) {
            isDeleting = false;
            count++;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }());

    // Logica do modal
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc'); // Certifique-se que é este ID no HTML
    const closeBtn = document.querySelector('.modal-close');
    const cards = document.querySelectorAll('.card');

    // Banco de dados dos textos dos projetos
    const projectData = {
        "senha": {
            title: "Gerador de senhas",
            html: `
                <p>O usuário pode definir critérios como tamanho da senha e tipos de caracteres, garantindo mais segurança no uso do dia a dia. A aplicação possui uma interface simples, fácil de usar e funciona diretamente no navegador.</p>
                <br>
                <strong>Tecnologias utilizadas:</strong>
                <ul style="list-style: disc; margin-left: 20px; margin-top: 5px; color: var(--text-muted);">
                    <li>HTML</li>
                    <li>CSS</li>
                    <li>JavaScript</li>
                </ul>
                <br>
                <p><em>Este projeto demonstra conhecimentos em lógica de programação, JavaScript e criação de interfaces funcionais.</em></p>
            `
        },
        "contrato": {
            title: "Gerador de Contratos",
            html: `
                <p>O sistema utiliza um modelo de contrato em Word, contendo variáveis (ex: {nome}, {cpf}, {valor}), que são automaticamente substituídas por dados reais obtidos de uma planilha Excel. Com isso, é possível gerar contratos prontos de forma rápida, reduzindo erros manuais e economizando tempo.</p>
                <br>
                <strong>Tecnologias utilizadas:</strong>
                <ul style="list-style: disc; margin-left: 20px; margin-top: 5px; color: var(--text-muted);">
                    <li>JavaScript</li>
                    <li>Manipulação de arquivos (Word e Excel)</li>
                </ul>
                <br>
                <p><em>Este projeto demonstra conhecimentos em automação de processos, manipulação de dados e organização de informações.</em></p>
            `
        },
        "aniversario": {
            title: "Gerador de Aniversariantes",
            html: `
                <p>O sistema permite cadastrar os aniversariantes de um mês específico (dia, nome e setor), e a partir dessas informações o site gera automaticamente uma imagem pronta, já no layout oficial da empresa, para divulgação interna ou em canais digitais.</p>
                <p>A ferramenta facilita o processo, elimina edições manuais e garante padronização visual nas comunicações da empresa.</p>
                <br>
                <strong>Tecnologias utilizadas:</strong>
                <ul style="list-style: disc; margin-left: 20px; margin-top: 5px; color: var(--text-muted);">
                    <li>HTML</li>
                    <li>CSS</li>
                    <li>JavaScript</li>
                </ul>
                <br>
                <p><em>Este projeto demonstra habilidades em manipulação de dados, geração dinâmica de conteúdo e criação de interfaces funcionais voltadas para uso corporativo.</em></p>
            `
        }
    };

    // Abre o modal ao clicar no card
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Se clicar no botão de link (Site/Github), NÃO abre o modal
            if (e.target.closest('a')) return;

            const id = card.getAttribute('data-id');
            const data = projectData[id];

            if (data) {
                modalTitle.textContent = data.title;
                // Usamos innerHTML para que as tags <br> e <ul> funcionem
                modalDesc.innerHTML = data.html; 
                modal.classList.add('active');
            }
        });
    });

    // Fecha ao clicar no X
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    // Fecha ao clicar fora do conteúdo
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // Fecha com a tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
        }
    });
});