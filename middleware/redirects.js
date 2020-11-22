const redirects = require('../assets/data/redirects.json');

export default function(req, res, next) {
  // find the redirect if it exists where the from === the requested url
  const redirect = redirects.find(r => r.from === req.url)

  // If it exists, redirect the page with a 301 response else carry on
  if (redirect) {
    res.writeHead(301, {
      Location: redirect.to
    })
    res.end()
  } else {
    next()
  }
}
