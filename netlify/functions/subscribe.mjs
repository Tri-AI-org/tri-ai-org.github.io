/**
 * Newsletter subscription relay.
 *
 * The browser can't POST to https://ai6lagos.bestregards.me/api/v1/subscribers
 * directly because that API doesn't include the right CORS headers. So the
 * site's newsletter form posts here instead — same origin, no CORS issue —
 * and this function forwards the payload to the real API server-to-server.
 *
 * Path on the deployed site: /.netlify/functions/subscribe
 *
 * Expects: { email, firstName, lastName }
 * Returns: pass-through of the API's response (status code and JSON body),
 *          so the client UI can branch on success / already-subscribed / error
 *          exactly as it would with a direct call.
 */

const UPSTREAM = 'https://ai6lagos.bestregards.me/api/v1/subscribers';
const FORM_ID = 'form_wv8XxtbD7WDIWY7AaxV-b';

export const handler = async (event) => {
  // Sanity: only allow POST. Anything else is a probe; reject quickly.
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Method not allowed' }),
    };
  }

  // The upstream API requires a bearer token. Read it from Netlify's
  // environment variables — NEVER hardcode it. If the env var isn't set,
  // fail fast with a clear server-side error so the deploy doesn't silently
  // call the API with no auth and 401 for every visitor.
  const apiKey = process.env.NEWSLETTER_API_KEY;
  if (!apiKey) {
    console.error('NEWSLETTER_API_KEY environment variable is not set');
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'Subscription service is not configured. Please try again later.',
      }),
    };
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Invalid JSON' }),
    };
  }

  const email = (body.email || '').trim();
  const firstName = (body.firstName || '').trim();
  const lastName = (body.lastName || '').trim();

  // Basic email validation. The real API will reject malformed addresses
  // anyway, but rejecting here saves a network round-trip and gives a
  // faster error to the user.
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Please enter a valid email.' }),
    };
  }

  const payload = {
    email,
    firstName,
    lastName,
    sources: [{ type: 'FORM', id: FORM_ID }],
  };

  try {
    const upstreamResponse = await fetch(UPSTREAM, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'Cache-Control': 'no-cache',
      },
      body: JSON.stringify(payload),
    });

    // Pass the upstream response through to the client unchanged, so the
    // newsletter component can branch on status / message exactly as if
    // it had called the API directly.
    const responseBody = await upstreamResponse.text();

    return {
      statusCode: upstreamResponse.status,
      headers: { 'Content-Type': 'application/json' },
      body: responseBody,
    };
  } catch (err) {
    // Upstream API unreachable. Report a clean error to the client.
    console.error('Upstream subscribe call failed:', err);
    return {
      statusCode: 502,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'Subscription service is temporarily unreachable. Please try again in a moment.',
      }),
    };
  }
};
