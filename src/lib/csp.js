const csp = `default-src 'self'; script-src 'self' 'sha256-iw8VvzgavNKNkxd0Zc1YEnIETElKX101xtTnyMA9hvc=' 'sha256-p9IK8JOYvx6Woe4ln6el53um0VaIex4eH29qcO8RFkE=' 'sha256-AmcRgtbLQTVvWw9bdw6Vdul+TjKWHgfl5/v+4TzltGo=' 'sha256-wwKKDLFzSGJ/I+lSf+YHezQTYfHqKkpU1t0G9QdIcm4='; base-uri 'self'; object-src 'none'; media-src 'none'; worker-src 'none'; form-action 'none'; frame-ancestors 'none'; connect-src 'none'; upgrade-insecure-requests;`
// <meta http-equiv="Content-Security-Policy" content={csp}>

export default csp
