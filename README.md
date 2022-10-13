#ADN API

##Analizar ADN

https://af9wmhu6k0.execute-api.us-east-1.amazonaws.com/prod/clon [POST]

*Body* 

{
"adn":["WSYEWW","EYWSSY","WESSYY","YEWEES","EWWSSY","WESSYW"]
}


##Estadisticas ADN

https://af9wmhu6k0.execute-api.us-east-1.amazonaws.com/prod/estadisticas [GET]


Cada funcion lambda debe instalar los node modules con

npm install

Puede ejecutar los test con 

npm run test

Si quiere compilar la funcion lo puede hacer atravez del tookit en VS o manualmente 
Subiendo la version a la funcion lambda

1. Revisar Arquitectura
2. Revisar documento de implementación de la arquitectura
3. Pendiente validar rendimiento maximo