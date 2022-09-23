import { request as _request } from 'http';

const data = JSON.stringify({
  name: 'product'
})

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/products',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
}

const request = _request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => { body += "" + chunk; })
  res.on('end', () => { console.log('response', body) })
  res.on('close', () => { console.log('Closed connection') })
})

request.end(data);