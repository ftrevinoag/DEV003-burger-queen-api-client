// /* eslint-disable no-underscore-dangle */
// /* eslint-disable jsx-a11y/label-has-associated-control */
// /* eslint-disable react/prop-types */
// import React, { useState } from 'react';
// import { postUser, putUser } from '../../../burger-queen/src/controller/admin-users';

// const FormUsers = ({ state, setState }) => {
//   return (
//     <form className="form-modal">
//       <div className="form-container">
//         <div>
//           <label htmlFor="input-email" className="label-text">E-MAIL:</label>
//           <div className="box-input">
//             <input
//               defaultValue={state.userData.email}
//               data-testid="email"
//               id="input-email"
//               name="email"
//               type="email"
//               onChange={handleInputChange}
//               placeholder={error.email ? 'Campo requerido' : 'Ingrese el email'}
//               className={error.email ? 'input-modal error' : 'input-modal'}
//             />
//           </div>
//         </div>
//         <div>
//           <label htmlFor="input-password" className="label-text">PASSWORD:</label>
//           <div className="box-input">
//             <input
//               defaultValue={state.userData.password}
//               id="input-password"
//               name="password"
//               type="password"
//               onChange={handleInputChange}
//               placeholder={error.password ? 'Campo requerido' : 'Ingrese el password'}
//               className={error.password ? 'input-modal error' : 'input-modal'}
//             />
//           </div>
//         </div>
//         <div>
//           <label htmlFor="input-admin" className="label-text">ADMIN:</label>
//           <div className="box-option">
//             <select id="input-admin" onChange={handleSelectChange} className="select-modal" defaultValue={state.userData.roles.admin ? 'SI' : 'NO'}>
//               <option value="NO">NO</option>
//               <option value="SI">YES</option>
//             </select>
//           </div>
//         </div>
//         {error.message !== '' && <span>{error.message}</span>}
//         <div>
//           <button type="button" className="btn-modal cancel" onClick={closeModal}>Cancel</button>
//           {state.display.btnEdit ? (
//             <button type="button" className="btn-modal save" onClick={() => handleRequest('PUT')}>Edit</button>
//           ) : (
//             <button type="button" className="btn-modal save" onClick={() => handleRequest('POST')}>Save</button>
//           )}
//         </div>
//       </div>
//     </form>
//   );
// };

// export default FormUsers;