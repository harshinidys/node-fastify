const fastify = require('fastify')();
const fastifyCors = require('fastify-cors');
const fastifyFormbody = require('fastify-formbody');

fastify.register(require('fastify-cors'), {
    origin: '*',
    methods: 'GET,PUT,POST,DELETE',
  });

  fastify.register(require('fastify-formbody'));

  // Sample data for demonstration purposes (in-memory data store)
let items = [
    { id: 1, name: 'Task 1' },
    { id: 2, name: 'Task 2' },
  ];

  // Create a new item
fastify.post('/items', (request, reply) => {
    const { name } = request.body;
    const newItem = { id: items.length + 1, name };
    items.push(newItem);
    reply.code(201).send(newItem);
  });

  // Get all items
fastify.get('/items', (request, reply) => {
    reply.send(items);
  });

  // Get a specific item by ID
fastify.get('/items/:id', (request, reply) => {
    const { id } = request.params;
    const item = items.find((item) => item.id === Number(id));
    if (!item) {
      reply.code(404).send({ message: 'Item not found' });
      return;
    }
    reply.send(item);
  });

  // Update an item by ID
fastify.put('/items/:id', (request, reply) => {
    const { id } = request.params;
    const { name } = request.body;
    const itemIndex = items.findIndex((item) => item.id === Number(id));
    if (itemIndex === -1) {
      reply.code(404).send({ message: 'Item not found' });
      return;
    }
    const updatedItem = { ...items[itemIndex], name };
    items[itemIndex] = updatedItem;
    reply.send(updatedItem);
  });

  // Delete an item by ID
fastify.delete('/items/:id', (request, reply) => {
    const { id } = request.params;
    const itemIndex = items.findIndex((item) => item.id === Number(id));
    if (itemIndex === -1) {
      reply.code(404).send({ message: 'Item not found' });
      return;
    }
    const deletedItem = items.splice(itemIndex, 1)[0];
    reply.send(deletedItem);
  });

// Start the Fastify server
fastify.listen({port:3000}, (err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server is running on port 3000`);
  });