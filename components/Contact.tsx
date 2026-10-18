import { contactChannels, primaryContact } from "@/lib/site";
import { SocialIcon } from "@/components/SocialIcon";

export function Contact() {
  return (
    <section className="contact" id="contact" aria-labelledby="contact-heading">
      <div>
        <h2 id="contact-heading">Mari bekerja sama.</h2>
        <p>
          Saya terbuka untuk membahas proyek web, pengembangan ERP, atau
          peluang bekerja sama. Silakan hubungi melalui salah satu profil berikut.
        </p>
      </div>
      <div className="contact-actions">
        {primaryContact && (
          <a
            className="primary social-link"
            href={primaryContact.href}
            target={primaryContact.id === "email" ? undefined : "_blank"}
            rel={
              primaryContact.id === "email" ? undefined : "noopener noreferrer"
            }
          >
            <SocialIcon channel={primaryContact.id} />
            {primaryContact.id === "email"
              ? "Kirim Email"
              : `Terhubung di ${primaryContact.label}`}{" "}
            <span aria-hidden="true">↗</span>
          </a>
        )}
        <div className="contact-socials">
          {contactChannels
            .filter((channel) => channel !== primaryContact)
            .map((channel) => (
              <a
                className="text-link social-link"
                key={channel.id}
                href={channel.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <SocialIcon channel={channel.id} />
                {channel.label} <span aria-hidden="true">↗</span>
              </a>
            ))}
        </div>
      </div>
    </section>
  );
}
