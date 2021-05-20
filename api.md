### Fetch metadata

```bash
curl http://localhost:3000/api/nfts/[NFT_ID]/[META_ID]
```

### Create metadata

```bash
curl -X POST \
  -H 'Content-type: application/json' \
  --data '{"author":"Nico","description":"Hello","name":"the best of nico","owner":"0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266","backgroundId":1}' \
  http://localhost:3000/api/nfts/create
```

### Edit metadata

```bash
curl -X POST \
  -H 'Content-type: application/json' \
  --data '{"id":3, "author":"Nico","description":"Hello","name":"the best of nico","owner":"0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266","backgroundId":1}' \
  http://localhost:3000/api/nfts/update
```
