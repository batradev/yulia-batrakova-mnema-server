# Setting up the project locally

```
openssl genpkey -algorithm RSA -out key.pem
openssl req -new -key key.pem -out csr.pem -subj "/C=CA/ST=QC/L=Montreal/O=NoName/OU=None/CN=localhost/emailAddress=test@example.com"
openssl x509 -req -days 365 -in csr.pem -signkey key.pem -out cert.pem
rm csr.pem
```