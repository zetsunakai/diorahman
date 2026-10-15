import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div>
        <div className="eyebrow mono">
          <span className="dot" aria-hidden="true" /> HELLO, WORLD. SAYA DIO.
        </div>
        <h1 id="hero-title">
          Mengubah logika
          <br />
          menjadi <span>solusi.</span>
        </h1>
        <p>{site.intro}</p>
        <div className="actions">
          <a className="primary" href="#projects">
            Jelajahi proyek <span aria-hidden="true">↗</span>
          </a>
          <a className="secondary" href="#about">
            Kenali saya <span aria-hidden="true">↓</span>
          </a>
        </div>
        <div className="smallnote">
          <span aria-hidden="true">⌘</span> Dibangun dengan rasa ingin tahu
          &amp; secangkir kopi.
        </div>
      </div>
      <div
        className="hero-art"
        role="img"
        aria-label={`Ilustrasi terminal Python: profil ${site.name}, ${site.role} dengan stack React, Next.js, Tailwind CSS, dan Docker.`}
      >
        <div className="orbit" aria-hidden="true" />
        <div className="terminal" aria-hidden="true">
          <div className="termbar">
            <i />
            <i />
            <i />
            <span>developer.py</span>
            <b>⌘</b>
          </div>
          <div className="code">
            <div>
              <span className="ln">01</span>
              <span className="gray"># behind the code</span>
            </div>
            <div>
              <span className="ln">02</span>
              <span className="purple">class</span>{" "}
              <span className="blue">Developer</span>:
            </div>
            <div>
              <span className="ln">03</span>
              {"    name = "}
              <span className="green">&quot;{site.name}&quot;</span>
            </div>
            <div>
              <span className="ln">04</span>
              {"    role = "}
              <span className="green">&quot;{site.role}&quot;</span>
            </div>
            <div>
              <span className="ln">05</span>
              {"    stack = ["}
              <span className="green">
                &quot;React&quot;, &quot;Next.js&quot;
              </span>
              ]
            </div>
            <div>
              <span className="ln">06</span>
              {"    tools = ["}
              <span className="green">
                &quot;Tailwind&quot;, &quot;Docker&quot;
              </span>
              ]
            </div>
            <div>
              <span className="ln">07</span>
              {"    "}
              <span className="purple">def</span>{" "}
              <span className="blue">build</span>(self, idea):
            </div>
            <div>
              <span className="ln">08</span>
              {"        "}
              <span className="purple">return</span> idea.to_solution()
            </div>
            <div>
              <span className="ln">09</span>
            </div>
            <div>
              <span className="ln">10</span>
              <span className="gray"># always learning, always building.</span>
            </div>
          </div>
        </div>
        <div className="floating" aria-hidden="true">
          <span className="float-icon">&lt;/&gt;</span>
          <div>
            <b>Business meets code.</b>
            <small>Satu solusi, satu langkah lebih baik.</small>
          </div>
        </div>
      </div>
    </section>
  );
}
