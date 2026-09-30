"use client";

import { useEffect, useState, type FormEvent } from "react";

const eventDate = new Date("2026-10-02T18:00:00+01:00").getTime();

export default function Home() {
  const [open, setOpen] = useState(false);
  const [opening, setOpening] = useState(false);
  const [left, setLeft] = useState<number | null>(null);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const tick = () => setLeft(Math.max(0, eventDate - Date.now()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const parts =
    left === null
      ? ["—", "—", "—", "—"]
      : [
          Math.floor(left / 86400000),
          Math.floor(left / 3600000) % 24,
          Math.floor(left / 60000) % 60,
          Math.floor(left / 1000) % 60,
        ].map((value) => String(value).padStart(2, "0"));

  async function sendRsvp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setStatus("");

    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form));

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Could not save your response.");
      }

      setStatus("Thank you — your response has been received.");
      form.reset();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main>
      {!open ? (
        <section className="opening">
          <div className={`envelope ${opening ? "is-opening" : ""}`}>
            <div className="back" />
            <div className="letter">
              <span className="eyebrow">WITH THE BLESSINGS OF ALLAH</span>
              <h1>Taha & Laiba</h1>
              <p>Friday, 2 October 2026</p>
            </div>
            <div className="pocket" />
            <div className="flap" />
            <button
              className="seal"
              type="button"
              disabled={opening}
              onClick={() => {
                setOpening(true);
                window.setTimeout(() => setOpen(true), 1400);
              }}
            >
              Open
            </button>
          </div>
        </section>
      ) : (
        <div className="reveal">
          <section className="hero">
            <span className="eyebrow">YOU ARE INVITED</span>
            <h1>Taha <em>&</em> Laiba</h1>
            <p>Together with their families request the honour of your presence.</p>
          </section>

          <section className="section">
            <span className="eyebrow">SAVE THE DATE</span>
            <h2>02 · 10 · 2026</h2>
            <div className="countdown">
              {parts.map((value, index) => (
                <div key={index}>
                  <strong>{value}</strong>
                  <span>{["Days", "Hours", "Minutes", "Seconds"][index]}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="section">
            <span className="eyebrow">THE CELEBRATION</span>
            <h2>Join us</h2>
            <p>
              The public portfolio version intentionally omits private venue details.
            </p>
          </section>

          <section className="section">
            <span className="eyebrow">RSVP</span>
            <h2>Will you join us?</h2>

            <form onSubmit={sendRsvp} className="rsvp">
              <label>
                Name
                <input name="name" required maxLength={100} />
              </label>

              <label>
                Attendance
                <select name="attendance" defaultValue="accept">
                  <option value="accept">Accept with pleasure</option>
                  <option value="decline">Decline with regret</option>
                </select>
              </label>

              <label>
                Guests
                <input
                  name="guests"
                  type="number"
                  min="0"
                  max="4"
                  defaultValue="1"
                />
              </label>

              <label>
                Message
                <textarea name="message" maxLength={500} rows={4} />
              </label>

              <button type="submit" disabled={busy}>
                {busy ? "Sending..." : "Send RSVP"}
              </button>

              <p className="status">{status}</p>
            </form>
          </section>
        </div>
      )}
    </main>
  );
}
