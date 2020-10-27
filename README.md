
RG-CORPUS
========
корпус текстов РГ

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



<br><br><br>

--------------------------

Порядок работы
==============

1. Изменить код
2. Запустить докер
3. Проверить
4. Запушить
5. Отдеплоить
   

Команды
-------
В директории `sh/` находятся следующие команды для облегчения работы.


|   |   |
|---|---|
Подъем                                      | `sh/up.sh`
Приостановка контейнера                     | `sh/stop.sh`
Старт приостановленного контейнера          | `sh/start.sh`
Полный останов контейнера                   | `sh/down.sh`
Подготовка директории deploy                | `sh/build-deploy-directory.sh`
Деплой                                      | `sh/deploy.sh`



Перезапуск Caddy и перестройка контейнера если что то изменилость в docker-compose 
```
dc restart rg-corpus-caddy  
dc up -d --build rg-corpus-caddy     
```
.