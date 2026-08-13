"use client";

import { useEffect, useMemo, useState } from "react";

type Match = "vibe" | "warm" | "fresh" | "slow";
type Scores = Record<Match, number>;

const matches: Record<Match, { name: string; eyebrow: string; copy: string; note: string }> = {
  vibe: {
    name: "VIBE",
    eyebrow: "Curiosidade em movimento",
    copy: "Gostam de quebrar a rotina, descobrir sensações inesperadas e deixar espaço para a surpresa.",
    note: "A vossa experiência ideal mistura novidade, intensidade e muita curiosidade.",
  },
  warm: {
    name: "WARM",
    eyebrow: "Calor que aproxima",
    copy: "Procuram uma experiência envolvente, intensa e criada para prolongar cada momento a dois.",
    note: "A vossa ligação cresce quando o ritmo abranda e a sensação ganha intensidade.",
  },
  fresh: {
    name: "FRESH",
    eyebrow: "Contraste que desperta",
    copy: "Gostam de leveza, espontaneidade e de sensações que transformam o familiar em algo novo.",
    note: "A vossa experiência ideal é fresca, lúdica e cheia de pequenos contrastes.",
  },
  slow: {
    name: "SLOW",
    eyebrow: "Presença sem pressa",
    copy: "Valorizam o toque, a confiança e os momentos que criam proximidade antes de qualquer outra coisa.",
    note: "A vossa experiência ideal começa na presença, no conforto e na conexão.",
  },
};

const questions: Array<{
  title: string;
  hint: string;
  answers: Array<{ label: string; match: Match }>;
}> = [
  {
    title: "O que vos apetece descobrir?",
    hint: "Escolham sem pensar demasiado.",
    answers: [
      { label: "Uma sensação completamente nova", match: "vibe" },
      { label: "Mais intensidade e calor", match: "warm" },
      { label: "Algo leve e inesperado", match: "fresh" },
      { label: "Mais tempo e proximidade", match: "slow" },
    ],
  },
  {
    title: "Como seria a noite perfeita?",
    hint: "Não há respostas certas.",
    answers: [
      { label: "Espontânea e fora da rotina", match: "vibe" },
      { label: "Envolvente e intensa", match: "warm" },
      { label: "Divertida e descontraída", match: "fresh" },
      { label: "Calma, longa e sem distrações", match: "slow" },
    ],
  },
  {
    title: "Escolham uma palavra.",
    hint: "A primeira que vos chamar.",
    answers: [
      { label: "Curiosidade", match: "vibe" },
      { label: "Desejo", match: "warm" },
      { label: "Contraste", match: "fresh" },
      { label: "Presença", match: "slow" },
    ],
  },
  {
    title: "O que torna uma experiência memorável?",
    hint: "Pensem naquilo que fica depois.",
    answers: [
      { label: "A surpresa", match: "vibe" },
      { label: "A intensidade", match: "warm" },
      { label: "O inesperado", match: "fresh" },
      { label: "A conexão", match: "slow" },
    ],
  },
];

const initialScores: Scores = { vibe: 0, warm: 0, fresh: 0, slow: 0 };

function DropMark({ small = false }: { small?: boolean }) {
  return <span className={small ? "drop-mark small" : "drop-mark"} aria-hidden="true">◆</span>;
}

export default function VeymeaSite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Scores>(initialScores);
  const [result, setResult] = useState<Match | null>(null);
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    document.body.style.overflow = quizOpen || menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [quizOpen, menuOpen]);

  const progress = useMemo(() => ((step + 1) / questions.length) * 100, [step]);

  function openQuiz() {
    setMenuOpen(false);
    setQuizOpen(true);
  }

  function closeQuiz() {
    setQuizOpen(false);
  }

  function choose(match: Match) {
    const next = { ...scores, [match]: scores[match] + 1 };
    setScores(next);
    if (step < questions.length - 1) {
      setStep(step + 1);
      return;
    }
    const winner = (Object.keys(next) as Match[]).reduce((a, b) => next[b] > next[a] ? b : a);
    setResult(winner);
  }

  function restartQuiz() {
    setStep(0);
    setScores(initialScores);
    setResult(null);
    setJoined(false);
    setEmail("");
    setFormError("");
  }

  async function submitInterest(event: React.FormEvent) {
    event.preventDefault();
    if (!email.trim()) return;
    setFormError("");
    try {
      const response = await fetch("/api/interest", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: email.trim(), result }),
      });
      if (!response.ok) throw new Error("Não foi possível guardar o email.");
      setJoined(true);
    } catch {
      setFormError("Não conseguimos guardar agora. Tenta novamente dentro de momentos.");
    }
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand-lockup" href="#inicio" aria-label="Veymea — início">
          <img src="/brand/veymea-logo.png" alt="Veymea" />
        </a>
        <nav className="desktop-nav" aria-label="Navegação principal">
          <a href="#manifesto">A Veymea</a>
          <a href="#descoberta">Descoberta</a>
          <a href="#universo">Universo</a>
        </nav>
        <button className="header-cta" onClick={openQuiz}>Descobrir o match</button>
        <button className="menu-toggle" onClick={() => setMenuOpen(true)} aria-label="Abrir menu">
          <span /> <span />
        </button>
      </header>

      <section id="inicio" className="hero">
        <div className="hero-media" aria-hidden="true">
          <img src="/brand/veymea-ritual.png" alt="" />
          <div className="hero-vignette" />
        </div>
        <div className="hero-copy reveal">
          <p className="eyebrow"><DropMark small /> Sexual wellness para dois</p>
          <h1>Mais do que prazer.<br /><em>Uma forma de conexão.</em></h1>
          <p className="hero-intro">Descubram novas sensações, ao vosso ritmo — com intimidade, curiosidade e zero tabus.</p>
          <div className="hero-actions">
            <button className="button primary" onClick={openQuiz}>Descobrir o nosso match</button>
            <a className="text-link" href="#manifesto">Conhecer a Veymea <span>↘</span></a>
          </div>
        </div>
        <div className="hero-foot">
          <span>Intimacy</span><i /><span>Discovery</span><i /><span>Connection</span>
        </div>
        <a className="scroll-cue" href="#manifesto" aria-label="Continuar para a próxima secção">↓</a>
      </section>

      <section id="manifesto" className="manifesto section-light">
        <div className="section-label"><span>01</span> O nosso manifesto</div>
        <div className="manifesto-grid">
          <div className="manifesto-title">
            <DropMark />
            <h2>A intimidade vive<br />nos <em>pequenos momentos.</em></h2>
          </div>
          <div className="manifesto-copy">
            <p>Na Veymea, acreditamos que o bem-estar sexual faz parte de uma vida plena — e que descobrir o que nos aproxima deve ser simples, bonito e natural.</p>
            <p>Criamos um espaço pensado para casais curiosos. Sem julgamentos. Sem ruído. Apenas conhecimento, confiança e novas formas de estar a dois.</p>
            <a className="text-link dark" href="#descoberta">Começar a descoberta <span>→</span></a>
          </div>
        </div>
      </section>

      <section id="descoberta" className="discovery section-dark">
        <div className="discovery-image">
          <img src="/brand/veymea-couple.png" alt="Casal num momento de proximidade" />
        </div>
        <div className="discovery-copy">
          <div className="section-label light"><span>02</span> A vossa descoberta</div>
          <h2>Não existe uma fórmula.<br /><em>Existe a vossa.</em></h2>
          <p>Respondam a quatro perguntas e descubram o tipo de experiência que mais combina convosco neste momento.</p>
          <ul className="quiz-benefits">
            <li><span>01</span> Quatro perguntas simples</li>
            <li><span>02</span> Um resultado pensado para vocês</li>
            <li><span>03</span> Recomendações quando lançarmos</li>
          </ul>
          <button className="button blush" onClick={openQuiz}>Fazer o quiz — 1 min</button>
        </div>
      </section>

      <section id="universo" className="universe section-light">
        <div className="universe-heading">
          <div className="section-label"><span>03</span> O universo Veymea</div>
          <h2>Quatro formas de<br /><em>sentir mais.</em></h2>
        </div>
        <div className="sensations">
          <article className="sensation-card tone-vibe">
            <span className="card-number">01</span><div className="orb" />
            <h3>VIBE</h3><p>Curiosidade, novidade e sensações inesperadas.</p>
          </article>
          <article className="sensation-card tone-warm">
            <span className="card-number">02</span><div className="orb" />
            <h3>WARM</h3><p>Calor, intensidade e momentos que se prolongam.</p>
          </article>
          <article className="sensation-card tone-fresh">
            <span className="card-number">03</span><div className="orb" />
            <h3>FRESH</h3><p>Leveza, contraste e uma nova energia a dois.</p>
          </article>
          <article className="sensation-card tone-slow">
            <span className="card-number">04</span><div className="orb" />
            <h3>SLOW</h3><p>Toque, presença e conexão sem pressa.</p>
          </article>
        </div>
        <p className="disclaimer">A Veymea está a ser criada. Estas são experiências em desenvolvimento, não produtos atualmente disponíveis para compra.</p>
      </section>

      <section className="closing">
        <img src="/brand/veymea-silk.png" alt="Universo visual Veymea em tons ameixa e rosa" />
        <div className="closing-overlay" />
        <div className="closing-copy">
          <DropMark />
          <p className="eyebrow">Um convite à descoberta</p>
          <h2>Qual é o vosso <em>match?</em></h2>
          <p>Uma pergunta pode ser o início de uma conversa completamente nova.</p>
          <button className="button primary" onClick={openQuiz}>Descobrir agora</button>
        </div>
      </section>

      <footer>
        <div className="footer-brand">
          <img src="/brand/veymea-logo.png" alt="Veymea" />
          <p>Intimacy. Discovery. Connection.</p>
        </div>
        <div className="footer-links">
          <div><span>Explorar</span><a href="#manifesto">A Veymea</a><a href="#descoberta">Quiz</a><a href="#universo">Universo</a></div>
          <div><span>Contacto</span><a href="mailto:hello@veymea.eu">hello@veymea.eu</a><a href="https://instagram.com/veymea.eu">Instagram</a></div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Veymea</span><span>Portugal · Para maiores de 18 anos</span></div>
      </footer>

      {menuOpen && (
        <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu">
          <button className="close-button" onClick={() => setMenuOpen(false)} aria-label="Fechar menu">×</button>
          <img src="/brand/veymea-logo.png" alt="Veymea" />
          <nav>
            <a href="#manifesto" onClick={() => setMenuOpen(false)}>A Veymea</a>
            <a href="#descoberta" onClick={() => setMenuOpen(false)}>Descoberta</a>
            <a href="#universo" onClick={() => setMenuOpen(false)}>Universo</a>
          </nav>
          <button className="button primary" onClick={openQuiz}>Descobrir o match</button>
        </div>
      )}

      {quizOpen && (
        <div className="quiz-modal" role="dialog" aria-modal="true" aria-labelledby="quiz-title">
          <button className="close-button" onClick={closeQuiz} aria-label="Fechar quiz">×</button>
          <div className="quiz-brand"><img src="/brand/veymea-logo.png" alt="Veymea" /></div>
          {!result ? (
            <div className="quiz-panel" key={step}>
              <div className="quiz-progress"><span style={{ width: `${progress}%` }} /></div>
              <p className="quiz-count">Pergunta {String(step + 1).padStart(2, "0")} / {String(questions.length).padStart(2, "0")}</p>
              <h2 id="quiz-title">{questions[step].title}</h2>
              <p className="quiz-hint">{questions[step].hint}</p>
              <div className="answers">
                {questions[step].answers.map((answer, index) => (
                  <button key={answer.label} onClick={() => choose(answer.match)}>
                    <span>{String.fromCharCode(65 + index)}</span>{answer.label}<i>→</i>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className={`result-panel result-${result}`}>
              <p className="eyebrow">O vosso match é</p>
              <div className="result-orb" />
              <h2 id="quiz-title">{matches[result].name}</h2>
              <h3>{matches[result].eyebrow}</h3>
              <p>{matches[result].copy}</p>
              <blockquote>{matches[result].note}</blockquote>
              {!joined ? (
                <form onSubmit={submitInterest} className="interest-form">
                  <label htmlFor="interest-email">Sejam os primeiros a descobrir a Veymea.</label>
                  <div><input id="interest-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="O vosso email" required /><button type="submit">Quero saber mais</button></div>
                  <small>Ao continuar, aceitam receber novidades da Veymea. Podem sair a qualquer momento.</small>
                  {formError && <p className="form-error" role="alert">{formError}</p>}
                </form>
              ) : (
                <div className="joined-message"><DropMark /><strong>Estão na lista.</strong><span>Guardem este resultado: {matches[result].name}.</span></div>
              )}
              <button className="restart" onClick={restartQuiz}>Refazer o quiz</button>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
