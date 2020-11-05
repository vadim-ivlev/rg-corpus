
RG-CORPUS
========
**Корпус текстов РГ** в рамках построения рекомендательной системы RGRU.

<img src="images/RG-CORPUS.png" style="max-width:300px">

Индексы Эластик представляют собой синхронизированные копии таблиц Постгрес с опозданием 5 мин.
Предназначены для полнотекстового поиска статей с использованием различных алгоритмов. Наполнение данными - проекты 
rg-db, text-processor.


<a href="http://dockertest.rgwork.ru:9555">GUI доступа к API поиска</a>

<a target="_blank" href="https://viewer.diagrams.net/?highlight=0000ff&edit=_blank&layers=1&nav=1&title=RG%20NLP%20project.drawio#Uhttps%3A%2F%2Fdrive.google.com%2Fuc%3Fid%3D1yflDpag5TSUrKPRsHgFzR2sBhjBY_7tz%26export%3Ddownload">Общая схема проектов</a>



## Настройки сервера

**1. Тома (volumes)**

Для наполнения БД данными RG API может потребоваться 
несколько суток. Чтобы сократить время создайте внешние тома
для данных  
```
$ docker volume create rg-corpus-es01
```


Требования к системе
------



* **Минимум 4 ГБ RAM выделено для Docker**

    Для работы Elasticsearch требуется как минимум 2 ГБ оперативной памяти.

    Для Mac объем оперативной памяти, выделенной для Docker, можно установить с помощью пользовательского интерфейса

* **Лимит на mmap должен быть больше или равен 262,144**

    Это самая частая причина, по которой Elasticsearch не запускается с момента выпуска Elasticsearch версии 5.

    В Linux используйте `sysctl vm.max_map_count` на хосте, чтобы просмотреть текущее значение. Обратите внимание, что ограничения должны быть изменены на хосте; они не могут быть изменены из контейнера.

    Если вы используете Docker для Mac, вам потребуется запустить контейнер с переменной среды `MAX_MAP_COUNT`, установленной как минимум в 262144 (с использованием, например, опции `-e` докера), чтобы Elasticsearch установил ограничения на число `mmap` в время запуска.


Виртуальная память
-----------

Elasticsearch по умолчанию использует директорию `hybrid mmapfs / niofs` для хранения своих индексов. По умолчанию ограничения  `mmap` слишком малы, что может привести к нехватке памяти.

В Linux вы можете увеличить ограничения, выполнив следующую команду от имени root:

    sysctl -w vm.max_map_count=262144

Чтобы установить это значение навсегда, обновите параметр `vm.max_map_count` в `/etc/sysctl.conf`. Для проверки после перезагрузки, запустите 

    sysctl vm.max_map_count

Пакеты RPM и Debian настроят этот параметр автоматически. Никаких дополнительных настроек не требуется.

Владелец директории с данными

Если в докере прописан volume как локальная директория, нужно изменить владельца,
чтобы процесс докера с id=1000 мог писать в эту директорию.

    sudo chown -R 1000:1000 elastic-data




<br><br><br>



<br><br><br>

Дополнительная информация
----

**Запросы к Эластик**

https://dzone.com/articles/23-useful-elasticsearch-example-queries


https://docs.google.com/document/d/1Q1ExyY36btdnTNe5co_pB4UdWNk41gY3rP1geg1LJBo/edit?usp=sharing



Перезапуск Caddy и перестройка контейнера если что то изменилость в docker-compose 
```
dc restart rg-corpus-caddy  
dc up -d --build rg-corpus-caddy     
```
.