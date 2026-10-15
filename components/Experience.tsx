import { experiences } from "@/lib/experience";

export function Experience() {
  return (
    <section
      className="section experience"
      id="experience"
      aria-labelledby="experience-title"
    >
      <div className="section-top">
        <h2 id="experience-title">Membangun di balik operasional bisnis.</h2>
      </div>
      <div className="experience-list">
        <span className="experience-track" aria-hidden="true">
          <span className="experience-progress" />
        </span>
        {experiences.map((experience) => (
          <article
            className="experience-entry"
            key={experience.id}
            aria-labelledby={`experience-${experience.id}`}
          >
            <div className="experience-context">
              <p className="experience-company">HashMicro</p>
              <p className="experience-platform">{experience.platform}</p>
              <p className="experience-period">{experience.period}</p>
              <div className="tags">
                {experience.tools.map((tool) => (
                  <span key={tool}>{tool}</span>
                ))}
              </div>
            </div>
            <div className="experience-content">
              <h3 id={`experience-${experience.id}`}>{experience.title}</h3>
              <p className="experience-summary">{experience.summary}</p>
              <ul className="experience-contributions">
                {experience.contributions.map((contribution) => (
                  <li key={contribution.area}>
                    <h4>{contribution.area}</h4>
                    <p>{contribution.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
