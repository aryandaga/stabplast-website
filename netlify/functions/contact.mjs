/**
 * Contact-form proxy — Netlify Function (served at /api/contact via netlify.toml).
 *
 * WHY: the form used to POST cross-origin to a Google Apps Script /exec URL. That
 * pattern on a page collecting name/email/phone is the static signature of an
 * Apps-Script phishing kit — 12+ reputation engines flagged the domain (2026-07).
 * Routing through this function makes the browser POST SAME-ORIGIN, so the
 * Apps Script URL never appears in any HTML page.
 *
 * FLOW: browser --POST /api/contact--> this function --POST--> Apps Script.
 * The Apps Script still verifies the Turnstile token server-side (its secret
 * lives in the script) and appends the row to the Google Sheet. This function is
 * a thin proxy and does NOT redeem the Turnstile token (tokens are single-use;
 * redeeming here would make the Apps Script's own verification fail).
 *
 * CONFIG (Netlify dashboard → Site settings → Environment variables):
 *   FORM_ENDPOINT   the Apps Script /exec URL   (NOT committed to the repo)
 *
 * Server-to-server, so CORS does not apply and we read the real upstream
 * response — the browser finally gets true success/failure.
 */

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      "x-content-type-options": "nosniff",
    },
  });

export default async (request) => {
  if (request.method !== "POST") {
    return json({ ok: false, error: "Method not allowed" }, 405);
  }

  let form;
  try {
    form = await request.formData();
  } catch {
    return json({ ok: false, error: "Malformed submission" }, 400);
  }

  // Honeypot: bots fill `_gotcha`. Report success so they don't retry.
  if (String(form.get("_gotcha") || "").trim() !== "") {
    return json({ ok: true });
  }

  // Turnstile token must be present (the Apps Script verifies it for real).
  if (!String(form.get("cf-turnstile-response") || "").trim()) {
    return json({ ok: false, error: "Verification required" }, 400);
  }

  const upstream = process.env.FORM_ENDPOINT;
  if (!upstream) {
    console.error("FORM_ENDPOINT env var is not set");
    return json({ ok: false, error: "Form temporarily unavailable" }, 500);
  }

  try {
    const res = await fetch(upstream, { method: "POST", body: form });
    if (!res.ok) {
      console.error("Upstream Apps Script returned", res.status);
      return json({ ok: false, error: "Could not deliver your enquiry" }, 502);
    }
    return json({ ok: true });
  } catch (err) {
    console.error("Upstream fetch failed:", err);
    return json({ ok: false, error: "Could not deliver your enquiry" }, 502);
  }
};
