## Requerimientos
Node.js: Versión 20.11.0. Puedes descargarlo desde nodejs.org.
Angular CLI: Versión 17.2.2. Instalar o actualizar con:
npm install -g @angular/cli@17.2.2

Bootstrap: Asegúrate de tener Bootstrap instalado. Puedes instalarlo con:
npm install bootstrap

## Instalación y Ejecución
Clonar el Repositorio:
git clone https://github.com/JohanTellez/prutec-marvel

Instalar Dependencias:
npm install

Ejecutar el Servidor de Desarrollo:
ng serve
La aplicación estará disponible en http://localhost:4200.


### Arquitectura del Proyecto

## Frontend
 - Angular: Framework principal para la construcción de la interfaz de usuario.
 - Componentes: La aplicación está organizada en componentes reutilizables (e.g., comics, comic-detail, favorites).
 - Servicios: Servicios para la comunicación con la API y la lógica de negocio (e.g., MarvelApiService, AuthService, FavoritesService).

## Backend
 - API Marvel: Utiliza la API pública de Marvel para obtener información sobre cómics.
 - IndexedDB: Almacena información localmente en el navegador del usuario al momento de registrarlo, como la lista de favoritos.

## Detalles de Implementación

# Componente AppComponent: Componente raíz con enrutamiento y componentes header y footer.

# Módulos:
 - AppModule: Configuración de módulos de Angular, declaración de componentes y provisión de servicios.

# Servicios:
 - MarvelApiService: Comunicación con la API de Marvel.
 - AuthService: Manejo de autenticación y estado de inicio de sesión.
 - FavoritesService: Operaciones relacionadas con la lista de favoritos.

# Enrutamiento:
 - AppRoutingModule: Configuración de rutas y componentes asociados.

# IndexDB:
 - Almacenamiento de datos locales en el navegador.

# Diseño y Estilos:
 - Bootstrap: Para diseño y estilos.
