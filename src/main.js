import './index.css';

const categories = ['Estudos Bíblicos', 'Espírito Santo', 'Fé e Vida Cristã', 'Liderança', 'Cura e Milagres', 'Finanças do Reino'];
const highlights = [
  { tag: 'ESTUDOS BÍBLICOS', title: 'Aprofunde o conhecimento das Escrituras', text: 'Recursos para estudar a Palavra com contexto, clareza e consistência.', icon: '✧' },
  { tag: 'CRESCIMENTO ESPIRITUAL', title: 'Uma fé que cresce com entendimento', text: 'Conteúdos seleccionados para fortalecer a sua caminhada cristã.', icon: '✦' },
  { tag: 'APRENDA ONDE ESTIVER', title: 'Leia e ouça ao seu ritmo', text: 'Uma experiência de aprendizagem pensada para acompanhar o seu dia.', icon: '♫' }
];
const arrow = '<span aria-hidden="true">→</span>';
const root = document.querySelector('#app');

root.innerHTML = [
  '<main>',
  '<div class="announcement">EM BREVE · Uma nova experiência de conhecimento cristão</div>',
  '<header class="header wrap">',
  '<a class="brand" href="#" aria-label="Parousia início"><span class="brand-mark">P</span><span>PAROUSIA<small>BOOKS &amp; KNOWLEDGE</small></span></a>',
  '<nav aria-label="Navegação principal"><a href="#biblioteca">Biblioteca</a><a href="#categorias">Categorias</a><a href="#sobre">Sobre nós</a></nav>',
  '<a class="header-cta" href="#biblioteca">Explorar biblioteca ' + arrow + '</a>',
  '</header>',
  '<section class="hero wrap"><div class="hero-copy">',
  '<span class="eyebrow"><span class="eyebrow-line"></span> CONHECIMENTO QUE EDIFICA</span>',
  '<h1>Alimente a sua fé.<br><em>Expanda o seu conhecimento.</em></h1>',
  '<p>Uma biblioteca de recursos cristãos para quem deseja compreender mais profundamente a Palavra, crescer espiritualmente e transformar conhecimento em prática.</p>',
  '<div class="hero-actions"><a class="button button-gold" href="#biblioteca">Explorar biblioteca ' + arrow + '</a><a class="text-link" href="#sobre">Conheça a Parousia</a></div>',
  '<div class="hero-note"><span aria-hidden="true">✓</span> Conteúdo seleccionado para edificar e ensinar</div>',
  '</div><div class="hero-art" aria-label="Ilustração de livros"><div class="glow"></div><div class="book book-back"><span>VERITAS</span></div><div class="book book-mid"><span>PALAVRA<br> E VIDA</span></div><div class="book book-front"><span class="book-symbol">✦</span><b>PAROUSIA</b><small>CONHECIMENTO QUE TRANSFORMA</small></div><div class="art-caption">VERDADE · SABEDORIA · TRANSFORMAÇÃO</div></div></section>',
  '<section class="trust-strip"><div class="wrap trust-inner"><span>UMA PLATAFORMA PARA</span><b>Estudar</b><i></i><b>Aprender</b><i></i><b>Crescer</b><i></i><b>Partilhar</b></div></section>',
  '<section class="section wrap" id="categorias"><div class="section-heading"><div><span class="eyebrow">EXPLORE POR TEMA</span><h2>Conhecimento para cada<br>etapa da sua caminhada.</h2></div><p>Descubra conteúdos organizados por áreas de interesse e aprofundamento espiritual.</p></div><div class="category-grid">' +
    categories.map(function(category, index) { return '<a class="category-card" href="#biblioteca"><span>0' + (index + 1) + '</span><b>' + category + '</b>' + arrow + '</a>'; }).join('') +
  '</div></section>',
  '<section class="feature-section" id="sobre"><div class="wrap"><div class="section-heading light"><div><span class="eyebrow">MAIS DO QUE UMA LIVRARIA</span><h2>Um espaço para aprender,<br>reflectir e crescer.</h2></div><p>A Parousia nasce para tornar o conhecimento cristão mais acessível, organizado e relevante para o quotidiano.</p></div><div class="feature-grid">' +
    highlights.map(function(item) { return '<article class="feature-card"><span class="feature-icon" aria-hidden="true">' + item.icon + '</span><span>' + item.tag + '</span><h3>' + item.title + '</h3><p>' + item.text + '</p></article>'; }).join('') +
  '</div></div></section>',
  '<section class="library-cta wrap" id="biblioteca"><div><span class="eyebrow">A SUA PRÓXIMA LEITURA COMEÇA AQUI</span><h2>O conhecimento certo<br>pode transformar a sua jornada.</h2><p>Estamos a preparar a biblioteca digital Parousia. Em breve, poderá descobrir e adquirir os seus próximos recursos.</p><a class="button button-gold" href="mailto:contacto@parousia.ao">Entrar em contacto ' + arrow + '</a></div><div class="cta-decoration" aria-hidden="true"><span class="cta-book">▤</span><span>PAROUSIA</span></div></section>',
  '<footer><div class="wrap footer-inner"><a class="brand footer-brand" href="#"><span class="brand-mark">P</span><span>PAROUSIA<small>BOOKS &amp; KNOWLEDGE</small></span></a><p>Conhecimento que edifica. Verdade que transforma.</p><small>© ' + new Date().getFullYear() + ' PAROUSIA. Todos os direitos reservados.</small></div></footer>',
  '</main>'
].join('');

document.querySelectorAll('a[href^="#"]').forEach(function(link) {
  link.addEventListener('click', function(event) {
    const href = link.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
