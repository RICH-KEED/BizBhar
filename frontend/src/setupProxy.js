const { createProxyMiddleware } = require('http-proxy-middleware');

/**
 * Forwards browser requests from the dev server (any port, e.g. 3002) to Spring Boot.
 * Default matches backend `server.port` (8081 in this repo).
 *
 * Override: frontend/.env.development
 *   REACT_APP_PROXY_TARGET=http://127.0.0.1:YOUR_PORT
 * Restart `npm start` after changing.
 *
 * If you see "Error occurred while trying to proxy", the backend is not accepting TCP
 * connections at that URL (not running, wrong port, or firewall).
 */
module.exports = function setupProxy(app) {
  const target = process.env.REACT_APP_PROXY_TARGET || 'http://127.0.0.1:8081';

  app.use(
    '/api',
    createProxyMiddleware({
      target,
      changeOrigin: true,
      secure: false,
      onError(err, req, res) {
        // eslint-disable-next-line no-console
        console.error(
          `[setupProxy] ${req.method} ${req.url} → ${target} failed: ${err.code || err.message}\n` +
            '  → Start the backend: cd backend && mvn spring-boot:run\n' +
            '  → Or set REACT_APP_PROXY_TARGET in frontend/.env.development to match server.port'
        );
        if (res && !res.headersSent) {
          res.writeHead(502, { 'Content-Type': 'text/plain; charset=utf-8' });
          res.end(
            `BizBhar: cannot reach API at ${target} (${err.code || err.message}). ` +
              'Start Spring Boot (port 8081 by default) and refresh.'
          );
        }
      },
    })
  );
};
