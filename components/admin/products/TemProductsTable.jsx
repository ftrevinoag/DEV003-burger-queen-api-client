import React, { useState, useEffect } from 'react';
import Header from '../../Header';
import TempProductsTable from './TempProductsTable';
import { getProducts } from '../../../burger-queen/src/controller/admin-products';
import ModalProducts from './ModalProducts';
