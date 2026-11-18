import './index.css';

const categories = ['Estudos Bíblicos', 'Espírito Santo', 'Fé e Vida Cristã', 'Liderança', 'Cura e Milagres', 'Finanças do Reino'];
const highlights = [
  { tag: 'ESTUDOS BÍBLICOS', title: 'Aprofunde o conhecimento das Escrituras', text: 'Recursos para estudar a Palavra com contexto, clareza e consistência.', icon: '✧' },
  { tag: 'CRESCIMENTO ESPIRITUAL', title: 'Uma fé que cresce com entendimento', text: 'Conteúdos seleccionados para fortalecer a sua caminhada cristã.', icon: '✦' },
  { tag: 'APRENDA ONDE ESTIVER', title: 'Leia e ouça ao seu ritmo', text: 'Uma experiência de aprendizagem pensada para acompanhar o seu dia.', icon: '♫' }
];

const books = [
{title:"A Autoridade do Crente",author:"Kenneth E. Hagin",category:"Fé e Vida Cristã",description:"Ensinamentos sobre a autoridade espiritual do cristão."},
{title:"O Nome de Jesus",author:"Kenneth E. Hagin",category:"Estudos Bíblicos",description:"O significado e a importância do nome de Jesus."},
{title:"Como Ser Guiado pelo Espírito de Deus",author:"Kenneth E. Hagin",category:"Espírito Santo",description:"Princípios sobre orientação e discernimento espiritual."},
{title:"A Fé do Tipo de Deus",author:"Uebert Angel",category:"Fé e Vida Cristã",description:"Ensinamentos sobre fé e vida sobrenatural."},
{title:"Como Ouvir a Voz de Deus",author:"Uebert Angel",category:"Espírito Santo",description:"Reflexões sobre ouvir e reconhecer a direção de Deus."},
{title:"Como Ver Anjos",author:"Uebert Angel",category:"Estudos Bíblicos",description:"Uma abordagem sobre anjos e o mundo espiritual."},
{title:"O Poder da Tua Mente",author:"Chris Oyakhilome",category:"Fé e Vida Cristã",description:"A importância de uma mente renovada."},
{title:"Orar da Maneira Certa",author:"Chris Oyakhilome",category:"Oração",description:"Princípios sobre oração e comunhão com Deus."},
{title:"Sete Coisas que o Espírito Santo Fará em Ti",author:"Chris Oyakhilome",category:"Espírito Santo",description:"Um estudo sobre a obra do Espírito Santo."}
];
const authorsComingSoon = ["Shepherd Bushiri","Michael Orokpo","T.B. Joshua"];

const arrow = '<span aria-hidden="true">→</span>';
const root = document.querySelector('#app');

root.innerHTML = [
  '<main>',
  '<div class="announcement">EM BREVE · Uma nova experiência de conhecimento cristão</div>',
  '<header class="header wrap">',
  '<a class="brand" href="#" aria-label="Koinonia início"><span class="brand-mark">K</span><span>KOINONIA<small>BOOKS &amp; KNOWLEDGE</small></span></a>',
  '<nav aria-label="Navegação principal"><a href="#biblioteca">Biblioteca</a><a href="#categorias">Categorias</a><a href="#sobre">Sobre nós</a></nav>',
  '<a class="header-cta" href="#biblioteca">Explorar biblioteca ' + arrow + '</a>',
  '</header>',
  '<section class="hero wrap"><div class="hero-copy">',
  '<span class="eyebrow"><span class="eyebrow-line"></span> CONHECIMENTO QUE EDIFICA</span>',
  '<h1>Alimente a sua fé.<br><em>Expanda o seu conhecimento.</em></h1>',
  '<p>Uma biblioteca de recursos cristãos para quem deseja compreender mais profundamente a Palavra, crescer espiritualmente e transformar conhecimento em prática.</p>',
  '<div class="hero-actions"><a class="button button-gold" href="#biblioteca">Explorar biblioteca ' + arrow + '</a><a class="text-link" href="#sobre">Conheça a Koinonia</a></div>',
  '<div class="hero-note"><span aria-hidden="true">✓</span> Conteúdo seleccionado para edificar e ensinar</div>',
  '</div><div class="hero-art" aria-label="Ilustração de livros"><div class="glow"></div><div class="book book-back"><span>VERITAS</span></div><div class="book book-mid"><span>PALAVRA<br> E VIDA</span></div><div class="book book-front"><span class="book-symbol">✦</span><b>KOINONIA</b><small>CONHECIMENTO QUE TRANSFORMA</small></div><div class="art-caption">VERDADE · SABEDORIA · TRANSFORMAÇÃO</div></div></section>',
  '<section class="trust-strip"><div class="wrap trust-inner"><span>UMA PLATAFORMA PARA</span><b>Estudar</b><i></i><b>Aprender</b><i></i><b>Crescer</b><i></i><b>Partilhar</b></div></section>',
  '<section class="section wrap" id="categorias"><div class="section-heading"><div><span class="eyebrow">EXPLORE POR TEMA</span><h2>Conhecimento para cada<br>etapa da sua caminhada.</h2></div><p>Descubra conteúdos organizados por áreas de interesse e aprofundamento espiritual.</p></div><div class="category-grid">' +
    categories.map(function(category, index) { return '<a class="category-card" href="#biblioteca"><span>0' + (index + 1) + '</span><b>' + category + '</b>' + arrow + '</a>'; }).join('') +
  '</div></section>',
  '<section class="feature-section" id="sobre"><div class="wrap"><div class="section-heading light"><div><span class="eyebrow">MAIS DO QUE UMA LIVRARIA</span><h2>Um espaço para aprender,<br>reflectir e crescer.</h2></div><p>A Koinonia nasce para tornar o conhecimento cristão mais acessível, organizado e relevante para o quotidiano.</p></div><div class="feature-grid">' +
    highlights.map(function(item) { return '<article class="feature-card"><span class="feature-icon" aria-hidden="true">' + item.icon + '</span><span>' + item.tag + '</span><h3>' + item.title + '</h3><p>' + item.text + '</p></article>'; }).join('') +
  '</div></div></section>',

  '<section class="catalog-section wrap" id="biblioteca"><div class="section-heading"><div><span class="eyebrow">BIBLIOTECA KOINONIA</span><h2>Leituras que marcaram<br>gerações de cristãos.</h2></div><p>Uma selecção inicial de títulos e autores. A disponibilidade e os formatos serão confirmados antes da comercialização.</p></div><div class="catalog-tools"><input id="book-search" type="search" placeholder="Pesquisar por título ou autor..."><select id="author-filter"><option value="">Todos os autores</option>' + Array.from(new Set(books.map(function(b){return b.author;}))).map(function(a){return '<option value="' + a + '">' + a + '</option>';}).join('') + '</select></div><div class="book-grid" id="book-grid"></div><div class="authors-note"><span class="eyebrow">AUTORES QUE QUEREMOS DESTACAR</span><p>' + authorsComingSoon.join(' · ') + ' — títulos a identificar e validar para inclusão no catálogo.</p></div></section>',
  '<section class="library-cta wrap" id="contacto"><div><span class="eyebrow">A SUA PRÓXIMA LEITURA COMEÇA AQUI</span><h2>O conhecimento certo<br>pode transformar a sua jornada.</h2><p>Estamos a preparar a biblioteca digital Koinonia. Em breve, poderá descobrir e adquirir os seus próximos recursos.</p><a class="button button-gold" href="#sobre">Acompanhe o lançamento ' + arrow + '</a></div><div class="cta-decoration" aria-hidden="true"><span class="cta-book">▤</span><span>KOINONIA</span></div></section>',
  '<footer><div class="wrap footer-inner"><a class="brand footer-brand" href="#"><span class="brand-mark">K</span><span>KOINONIA<small>BOOKS &amp; KNOWLEDGE</small></span></a><p>Conhecimento que edifica. Verdade que transforma.</p><small>© ' + new Date().getFullYear() + ' KOINONIA. Todos os direitos reservados.</small></div></footer>',
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

function renderBooks() {
 const q = document.querySelector('#book-search').value.toLocaleLowerCase();
 const a = document.querySelector('#author-filter').value;
 const list = books.filter(function(b){return (!a || b.author === a) && (b.title + ' ' + b.author + ' ' + b.category).toLocaleLowerCase().includes(q);});
 document.querySelector('#book-grid').innerHTML = list.length ? list.map(function(b){
  const n = books.indexOf(b) % 4 + 1;
  return '<article class="catalog-card"><div class="cover-art cover-' + n + '"><span>KOINONIA</span><b>' + b.title + '</b><small>' + b.author + '</small></div><div class="catalog-info"><span class="catalog-category">' + b.category + '</span><h3>' + b.title + '</h3><p class="catalog-author">' + b.author + '</p><p>' + b.description + '</p><span class="availability">Disponibilidade a confirmar</span></div></article>';
 }).join('') : '<p class="empty-catalog">Não encontrámos livros com essa pesquisa.</p>';
}
document.querySelector('#book-search').addEventListener('input', renderBooks);
document.querySelector('#author-filter').addEventListener('change', renderBooks);
renderBooks();
