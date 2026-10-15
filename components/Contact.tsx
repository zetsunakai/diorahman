"use client";

import { useRef, useState, type FormEvent } from "react";
import { Dialog } from "@/components/Dialog";
import { site } from "@/lib/site";

const storageKey = "dio-contact-email";

export function Contact() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [draft, setDraft] = useState("");
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const showContact = () => {
    let saved = site.email;
    if (!saved) {
      try {
        saved = localStorage.getItem(storageKey) || "";
      } catch {
        /* Storage may be unavailable in private browsing. */
      }
    }
    setEmail(saved);
    setDraft(saved);
    setEditing(!saved);
    setOpen(true);
  };

  const saveContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = draft.trim();
    if (!value || !inputRef.current?.checkValidity()) return;
    try {
      localStorage.setItem(storageKey, value);
    } catch {
      /* Keep the contact available for this visit. */
    }
    setEmail(value);
    setEditing(false);
  };

  return (
    <section className="contact" id="contact" aria-labelledby="contact-heading">
      <div>
        <div className="eyebrow mono">03 / WHAT&apos;S NEXT?</div>
        <h2 id="contact-heading">Ide bagus dimulai dari obrolan.</h2>
        <p>
          Punya ide website, aplikasi web, atau sistem untuk bisnis? Mari
          ngobrol dan cari cara untuk mewujudkannya.
        </p>
      </div>
      <button
        type="button"
        className="primary"
        onClick={showContact}
        aria-haspopup="dialog"
      >
        Mari ngobrol <span aria-hidden="true">↗</span>
      </button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        labelledBy="contact-title"
      >
        <div className="eyebrow mono">LET&apos;S CONNECT</div>
        <h2 id="contact-title">
          {email ? "Mari terhubung." : "Lengkapi kontak profil."}
        </h2>
        <p>
          {email
            ? "Klik email berikut untuk membuka aplikasi email kamu."
            : "Desain profil sudah siap. Tambahkan email yang ingin ditampilkan untuk mencoba tombol kontak."}
        </p>
        {editing ? (
          <form onSubmit={saveContact}>
            <label htmlFor="contact-email">Email kontak</label>
            <input
              ref={inputRef}
              id="contact-email"
              type="email"
              autoComplete="email"
              placeholder="nama@domain.com"
              required
              maxLength={254}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
            />
            <button className="primary" type="submit">
              Simpan di browser ini <span aria-hidden="true">↗</span>
            </button>
          </form>
        ) : (
          <div>
            <a
              className="contact-saved"
              href={`mailto:${encodeURIComponent(email)}`}
            >
              {email}
            </a>
            {!site.email && (
              <button
                type="button"
                className="primary"
                onClick={() => setEditing(true)}
              >
                Ubah email
              </button>
            )}
          </div>
        )}
        {!site.email && (
          <p className="dialog-note">
            Email tersimpan hanya di browser ini. Untuk kontak yang terlihat
            oleh semua pengunjung, email perlu ditambahkan ke konten situs.
          </p>
        )}
      </Dialog>
    </section>
  );
}
