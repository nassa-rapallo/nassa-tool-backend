# FOLDER STRUCTURE FOR NEW SERVICE

- controllers: logical divided controllers for the service's schema
- entities: service's schema
- messages: commands and responses's message for each controller
- model: the logical implementation of the schema in the controllers
  - dto: arguments for the controller's method
  - responses: resposes type of each method
- services: low level implementation of the service's logic
