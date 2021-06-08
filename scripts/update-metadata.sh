#!/bin/bash
for i in {1..73} # change 73 by the actual number of nft
do
  curl "https://api.opensea.io/asset/0x9478C05534d62E9ee20E3EacE30663b38Cce6F3E/$i?force_update=true"
done