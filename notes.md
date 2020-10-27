  # Experiments with elasticdump
  
  docker-compose.yml
  ```
  # # Для дампов данных
  # rg-corpus-dump:
  #   image: elasticdump/elasticsearch-dump
  #   container_name: rg-corpus-dump
  #   restart: unless-stopped
  #   volumes:
  #     - ./dumps:/dumps
  #   # command: while true; do date; sleep 10; done
  #   command: sleep 300000000
```
scripts to dump elastic data . Very slow.
```
# Backup index data to a file:
docker run --rm -it --network auth_proxy_network -v /home/gitupdater/rgdb/rgdb-dumps/rg-corpus:/tmp elasticdump/elasticsearch-dump \
  --input=http://es01:9200/rubrics \
  --output=/tmp/rubrics_data.json \
  --type=data

time docker exec -it rg-corpus-dump elasticdump --overwrite --limit 10000 --sourceOnly \
--input=http://es01:9200/rubrics \
--output=/dumps/rubrics_data.json \
--type=data

time docker exec -it rg-corpus-dump elasticdump --overwrite --limit 10000 --sourceOnly \
--input=http://es01:9200/rubrics_objects \
--output=/dumps/rubrics_objects_data.json \
--type=data


```