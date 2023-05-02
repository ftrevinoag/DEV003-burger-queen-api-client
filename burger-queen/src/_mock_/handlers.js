/* eslint-disable import/prefer-default-export */
import { rest } from 'msw';


// Manejadores de solicitudes HTTP simulados para la API ficticia.
// Cada manejador simula una respuesta de la API a una solicitud HTTP en particular.

// GET usuarios
export const handlers = [
  rest.get('http://localhost:3000/users', (_req, res, ctx) => res(
    ctx.status(200),
    ctx.json({
      _id: 'u_001',
      email: 'example@gmail.com',
      roles: { admin: true },
    }),
  )),

  // POST usuarios
  rest.post('http://localhost:3000/users', (req, res, ctx) => res(
    ctx.status(200),
    ctx.json(req.body),
  )),

  // DELETE usuarios
  rest.delete('http://localhost:3000/users/u_001', (_req, res, ctx) => res(
    ctx.status(200),
    ctx.json({ message: 'El usuario ha sido eliminado' }),
  )),

  // PUT usuarios
  rest.put('http://localhost:3000/u_001', (req, res, ctx) => res(
    ctx.status(200),
    ctx.json(req.body),
  )),


  // GET productos
  rest.get('http://localhost:3000/products', (_req, res, ctx) => res(
    ctx.status(200),
    ctx.json({
      _id: 1,
      name: 'Hamburguesa doble',
      price: '15',
      image: '',
      type: 'burger',
      date: '2022-07-15',
    }),
  )),

  // POST productos
  rest.post('http://localhost:3000/products', (req, res, ctx) => res(
    ctx.status(200),
    ctx.json(req.body),
  )),

  // PUT productos
  rest.put('http://localhost:3000/products/1', (req, res, ctx) => res(
    ctx.status(200),
    ctx.json(req.body),
  )),

  // DELETE productos
  rest.delete('http://localhost:3000/products/1', (_req, res, ctx) => res(
    ctx.status(200),
    ctx.json({ message: 'El producto ha sido eliminado' }),
  )),

];
