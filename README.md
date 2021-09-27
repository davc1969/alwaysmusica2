# Always Musica 2
## Desafío Latam e-camp: manejo de base de datos utilizando node/pg y objeto pool

Utliizando una base de datos ya creada se hicieron diferentes consultas a la base de datos para agregar infromación, actualizarla, borrarla o mostrarla.  Las consultas se hicieron como Sentencias preparadas (*Prepared Statement*)

Todas las opciones se hicieron en el archivo *index.js* como base para su futura implementación en el backend.

Se modularizó en lo posible el código, utilizando una función para la creación de las consultas preparadas y una función para la conexión a la base de datos.

La creación de la instancia del objeto **Pool** de la librería **pg**, se hace con el patrón de diseño ***Singleton***, de manera de evitar la duplicidad de dicho objeto.



 Hecho por *Darío Valenzuela*, septiembre 2021