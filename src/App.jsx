import { ArrowRight, BookOpen, Headphones, Search, ShieldCheck, Sparkles } from 'lucide-react';

const categories = ['Estudos Bíblicos', 'Espírito Santo', 'Fé e Vida Cristã', 'Liderança', 'Cura e Milagres', 'Finanças do Reino'];

const highlights = [
  { tag: 'ESTUDOS BÍBLICOS', title: 'Aprofunde o conhecimento das Escrituras', text: 'Recursos para estudar a Palavra com contexto, clareza e consistência.', icon: BookOpen },
  { tag: 'CRESCIMENTO ESPIRITUAL', title: 'Uma fé que cresce com entendimento', text: 'Conteúdos seleccionados para fortalecer a sua caminhada cristã.', icon: Sparkles },
  { tag: 'APRENDA ONDE ESTIVER', title: 'Leia e ouça ao seu ritmo', text: 'Uma experiência de aprendizagem pensada para acompanhar o seu dia.', icon: Headphones },
];

function App() {
  return (
    <main>
      <div className="announcement">EM BREVE · Uma nova experiência de conhecimento cristão</div>
      <header className="header wrap">
        <a className="brand" href="#" aria-label="Parousia início"><span className="brand-mark">P</span><span>PAROUSIA<small>BOOKS & KNOWLEDGE</small></span></a>
        <nav><a href="#biblioteca">Biblioteca</a><a href="#categorias">Categorias</a><a href="#sobre">Sobre nós</a></nav>
        <a className="header-cta" href="#biblioteca">Explorar biblioteca <ArrowRight size={16}/></a>
      </header>

      <section className="hero wrap">
        <div className="hero-copy">
          <span className="eyebrow"><span className="eyebrow-line"/> CONHECIMENTO QUE EDIFICA</span>
          <h1>Alimente a sua fé.<br/><em>Expanda o seu conhecimento.</em></h1>
          <p>Uma biblioteca de recursos cristãos para quem deseja compreender mais profundamente a Palavra, crescer espiritualmente e transformar conhecimento em prática.</p>
          <div className="hero-actions"><a className="button button-gold" href="#biblioteca">Explorar biblioteca <ArrowRight size={17}/></a><a className="text-link" href="#sobre">Conheça a Parousia</a></div>
          <div className="hero-note"><ShieldCheck size={16}/> Conteúdo seleccionado para edificar e ensinar</div>
        </div>
        <div className="hero-art" aria-label="Ilustração de livros">
          <div className="glow"/>
          <div className="book book-back"><span>VERITAS</span></div>
          <div className="book book-mid"><span>PALAVRA<br/>E VIDA</span></div>
          <div className="book book-front"><span className="book-symbol">✦</span><b>PAROUSIA</b><small>CONHECIMENTO QUE TRANSFORMA</small></div>
          <div className="art-caption">VERDADE · SABEDORIA · TRANSFORMAÇÃO</div>
        </div>
      </section>

      <section className="trust-strip"><div className="wrap trust-inner"><span>UMA PLATAFORMA PARA</span><b>Estudar</b><i/><b>Aprender</b><i/><b>Crescer</b><i/><b>Partilhar</b></div></section>

      <section className="section wrap" id="categorias">
        <div className="section-heading"><div><span className="eyebrow">EXPLORE POR TEMA</span><h2>Conhecimento para cada<br/>etapa da sua caminhada.</h2></div><p>Descubra conteúdos organizados por áreas de interesse e aprofundamento espiritual.</p></div>
        <div className="category-grid">{categories.map((category, i) => <a className="category-card" href="#biblioteca" key={category}><span>0{i+1}</span><b>{category}</b><ArrowRight size={18}/></a>)}</div>
      </section>

      <section className="feature-section" id="sobre"><div className="wrap"><div className="section-heading light"><div><span className="eyebrow">MAIS DO QUE UMA LIVRARIA</span><h2>Um espaço para aprender,<br/>reflectir e crescer.</h2></div><p>A Parousia nasce para tornar o conhecimento cristão mais acessível, organizado e relevante para o quotidiano.</p></div><div className="feature-grid">{highlights.map(({tag,title,text,icon:Icon}) => <article className="feature-card" key={tag}><Icon size={23}/><span>{tag}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

      <section className="library-cta wrap" id="biblioteca"><div><span className="eyebrow">A SUA PRÓXIMA LEITURA COMEÇA AQUI</span><h2>O conhecimento certo<br/>pode transformar a sua jornada.</h2><p>Estamos a preparar a biblioteca digital Parousia. Em breve, poderá descobrir e adquirir os seus próximos recursos.</p><a className="button button-gold" href="mailto:contacto@parousia.ao">Entrar em contacto <ArrowRight size={17}/></a></div><div className="cta-decoration"><BookOpen size={88} strokeWidth={0.8}/><span>PAROUSIA</span></div></section>

      <footer><div className="wrap footer-inner"><a className="brand footer-brand" href="#"><span className="brand-mark">P</span><span>PAROUSIA<small>BOOKS & KNOWLEDGE</small></span></a><p>Conhecimento que edifica. Verdade que transforma.</p><small>© {new Date().getFullYear()} PAROUSIA. Todos os direitos reservados.</small></div></footer>
    </main>
  );
}

export default App;