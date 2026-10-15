import { contactChannels, primaryContact } from "@/lib/site";

export function Contact() {
  return (
    <section className="contact" id="contact" aria-labelledby="contact-heading">
      <div>
        <p className="eyebrow mono">03 / MARI TERHUBUNG</p>
        <h2 id="contact-heading">Ada kebutuhan yang ingin diwujudkan?</h2>
        <p>
          Punya ide aplikasi web atau ingin membahas peluang kerja? Mari mulai
          dari kebutuhan dan alur kerja yang ingin Anda bangun.
        </p>
      </div>
      <div className="contact-actions">
        {primaryContact && (
          <a
            className="primary"
            href={primaryContact.href}
            target={primaryContact.label === "Email" ? undefined : "_blank"}
            rel={primaryContact.label === "Email" ? undefined : "noreferrer"}
          >
            {primaryContact.label === "Email"
              ? "Kirim Email"
              : `Terhubung di ${primaryContact.label}`}{" "}
            <span aria-hidden="true">↗</span>
          </a>
        )}
        {contactChannels
          .filter((channel) => channel !== primaryContact)
          .map((channel) => (
            <a
              className="text-link"
              key={channel.label}
              href={channel.href}
              target="_blank"
              rel="noreferrer"
            >
              {channel.label} <span aria-hidden="true">↗</span>
            </a>
          ))}
      </div>
    </section>
  );
}
