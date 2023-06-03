const allowedCors = [
  'https://api.mesto.govard.nomoredomains.rocks',
  'http://mesto.govard.nomoredomains.rocks',
  'localhost:3000',
  'http://localhost',
  'http://localhost:3001',
  'http://localhost:3000',
];

export const corsOptions = {
  origin: allowedCors,
  optionsSuccesStatus: 200,
  credentials: true
}
