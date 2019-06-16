Requirements
-------------
* Node.js v10 LTS

Quick Start
-------------

* Set environment variables
```
$ cp .env-example .env
```
* Install packages
```
$ yarn install
```
* Start database(docker compose in needed)
```
$ docker-compose up -d
```
* Run application
```
$ yarn start
```

Your API is available in `http://locahost:3001`


API
-------------
* Add many organizations.

```
POST /insertOrganization

Example:
[  
   {  
      "org_name":"Paradise Island",
      "daughters":[  
         {  
            "org_name":"Banana tree",
            "daughters":[  
               {  
                  "org_name":"Yellow Banana"
               },
               {  
                  "org_name":"Brown Banana"
               },
               {  
                  "org_name":"Black Banana"
               }
            ]
         },
         {  
            "org_name":"Big banana tree",
            "daughters":[  
               {  
                  "org_name":"Yellow Banana"
               },
               {  
                  "org_name":"Brown Banana"
               },
               {  
                  "org_name":"Green Banana"
               },
               {  
                  "org_name":"Black Banana",
                  "daughters":[  
                     {  
                        "org_name":"Phoneutria Spider"
                     }
                  ]
               }
            ]
         }
      ]
   }
]
```

* Get organization relations

```
GET /getRelations

Example: Find organization "Black Banana" all relations, show 2 per page, start with 2nd page

http://localhost:3001/getRelations?name=Black Banana&offset=2&limit=2
```
