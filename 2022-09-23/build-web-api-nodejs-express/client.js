import { get } from 'http';

get({
    port: 3000,
    hostname: 'localhost',
    path: '/users',
    headers: {
        authorization: 'secret'
    },
  }, (res) => {
    console.log('connected');
    res.on('data', (data) => {
      console.log('data', '' + data);
    });
    res.on('end', () => {
      console.log('end');
    });
    res.on('close', () => {
      console.log('close');
    });
  }
);