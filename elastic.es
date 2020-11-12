// Запросы к Эластик.
// Для выполнения запросов необходимо установить
// расширение Elasticsearch for VSCode
// https://marketplace.visualstudio.com/items?itemName=ria.elastic

// host = http://a***:r****1@dockertest.rgwork.ru:9094
GET /elasticsearch/_cat/indices?format=txt



// SQL query
POST /elasticsearch/_sql/translate/?format=json
{
    "query": "SELECT obj_id FROM articles WHERE date_modified > '2020-11-01 00:00:00' LIMIT 12 ",
    "fetch_size": 3
}

// simple query
GET /elasticsearch/articles/_search
{
    "size": 3,
    "_source": [
        "obj_id",
        "lemmatized_text"
    ]
}

// get one document
GET /elasticsearch/articles/_doc/621612

GET /elasticsearch/articles/_termvectors/621612
{
  "fields" : ["lemmatized_text"],
  "offsets" : false,
  "payloads" : true,
  "positions" : false,
  "term_statistics" : true,
  "field_statistics" : false
}




// ---------------------------------------------------




//update index settings
PUT /elasticsearch/my-index-000001/_settings
{
  "index" : {
    "number_of_replicas" : 0
  }
}



// get index settings
GET /elasticsearch/articles/_settings

// get mapping of articles
GET /elasticsearch/articles/_mapping

// get mapping of a fields
GET /elasticsearch/articles/_mapping/field/index_date,date_modified,release_date


// Delete index
DELETE /elasticsearch/articles_date

// Create index
PUT /elasticsearch/articles
{
    "settings": {
        "index": {
            "number_of_replicas": "0"
        }
    },
    "mappings": {
        "properties": {
            "announce": {
                "type": "text",
                "fields": {
                    "keyword": {
                        "type": "keyword",
                        "ignore_above": 256
                    }
                }
            },
            "authors": {
                "type": "text",
                "fields": {
                    "keyword": {
                        "type": "keyword",
                        "ignore_above": 256
                    }
                }
            },
            "date_modified": {
                "type": "date",
                "format": "yyyy-MM-dd HH:mm:ss"            
            },
            "index_date": {
                "type": "date",
                "format": "yyyy-MM-dd HH:mm:ss"            
            },
            "elastic_status": {
                "type": "text",
                "fields": {
                    "keyword": {
                        "type": "keyword",
                        "ignore_above": 256
                    }
                }
            },
            "entities_grouped": {
                "type": "text",
                "fields": {
                    "keyword": {
                        "type": "keyword",
                        "ignore_above": 256
                    }
                }
            },
            "entities_text": {
                "type": "text",
                "fields": {
                    "keyword": {
                        "type": "keyword",
                        "ignore_above": 256
                    }
                }
            },
            "full-text": {
                "type": "text",
                "fields": {
                    "keyword": {
                        "type": "keyword",
                        "ignore_above": 256
                    }
                }
            },
            "images": {
                "type": "text",
                "fields": {
                    "keyword": {
                        "type": "keyword",
                        "ignore_above": 256
                    }
                }
            },
            "index_priority": {
                "type": "text",
                "fields": {
                    "keyword": {
                        "type": "keyword",
                        "ignore_above": 256
                    }
                }
            },
            "is_active": {
                "type": "text",
                "fields": {
                    "keyword": {
                        "type": "keyword",
                        "ignore_above": 256
                    }
                }
            },
            "is_announce": {
                "type": "text",
                "fields": {
                    "keyword": {
                        "type": "keyword",
                        "ignore_above": 256
                    }
                }
            },
            "is_paid": {
                "type": "text",
                "fields": {
                    "keyword": {
                        "type": "keyword",
                        "ignore_above": 256
                    }
                }
            },
            "lemmatized_text": {
                "type": "text",
                "fields": {
                    "keyword": {
                        "type": "keyword",
                        "ignore_above": 256
                    }
                }
            },
            "link_title": {
                "type": "text",
                "fields": {
                    "keyword": {
                        "type": "keyword",
                        "ignore_above": 256
                    }
                }
            },
            "links": {
                "type": "text",
                "fields": {
                    "keyword": {
                        "type": "keyword",
                        "ignore_above": 256
                    }
                }
            },
            "migration_status": {
                "type": "text",
                "fields": {
                    "keyword": {
                        "type": "keyword",
                        "ignore_above": 256
                    }
                }
            },
            "obj_id": {
                "type": "text",
                "fields": {
                    "keyword": {
                        "type": "keyword",
                        "ignore_above": 256
                    }
                }
            },
            "obj_kind": {
                "type": "text",
                "fields": {
                    "keyword": {
                        "type": "keyword",
                        "ignore_above": 256
                    }
                }
            },
            "process_status": {
                "type": "text",
                "fields": {
                    "keyword": {
                        "type": "keyword",
                        "ignore_above": 256
                    }
                }
            },
            "projects": {
                "type": "text",
                "fields": {
                    "keyword": {
                        "type": "keyword",
                        "ignore_above": 256
                    }
                }
            },
            "release_date": {
                "type": "date",
                "format": "yyyyMMddHHmm"            
            },
            "spiegel": {
                "type": "text",
                "fields": {
                    "keyword": {
                        "type": "keyword",
                        "ignore_above": 256
                    }
                }
            },
            "title": {
                "type": "text",
                "fields": {
                    "keyword": {
                        "type": "keyword",
                        "ignore_above": 256
                    }
                }
            },
            "uannounce": {
                "type": "text",
                "fields": {
                    "keyword": {
                        "type": "keyword",
                        "ignore_above": 256
                    }
                }
            },
            "url": {
                "type": "text",
                "fields": {
                    "keyword": {
                        "type": "keyword",
                        "ignore_above": 256
                    }
                }
            }
        }
    }
}



// reindex
POST /elasticsearch/_reindex
{
    "source": {
        "index": "articles"
    },
    "dest": {
        "index": "articles_date"
    }
}

// get alias
GET /elasticsearch/articles_date/_alias

// create alias
PUT /elasticsearch/articles_date/_alias/articles_alias

// delete alias
DELETE /elasticsearch/articles_date/_alias/articles_alias

// Histogramms
                // "include_lower": true,
                // "include_upper": true,
                // "time_zone": "Z",
                // "boost": 1
                // "to": null
 
POST /elasticsearch/articles/_search
{
    "size": 0,
    "query": {
        "range": {
            "date_modified": {
                "from": "now-1d/h"
            }
        }
    },
    "aggs": {
        "articles_over_time": {
            "date_histogram": {
                "field": "date_modified",
                "calendar_interval": "hour"
            }
        }
    }
}

//   SELECT HISTOGRAM("@timestamp", INTERVAL 30 SECOND) as interval, 
//   count(*) as count
//   FROM "log-generator-logrus*"
//   GROUP by interval
//   ORDER BY interval DESC
//   LIMIT 30


POST /elasticsearch/_sql?format=json
{
    "query": "SELECT HISTOGRAM(date_modified, INTERVAL 1 HOUR) as interval, count(*) as count FROM articles GROUP by interval ORDER BY interval DESC LIMIT 24 "    
}

