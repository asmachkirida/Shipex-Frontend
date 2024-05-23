import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Button,
  Box,
  Collapse,
} from '@chakra-ui/react';
import "./style.css"
const AdminColisView = () => {
  const [colis, setColis] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [colisFormData, setColisFormData] = useState({
    id: null,
    date: '',
    state: '',
    destination: '',
    currentPlace: '',
    transporter: '',
    receiver_first_name: '',
    receiver_last_name: '',
    receiver_phone_number: '',
  });
  const [productFormData, setProductFormData] = useState({
    id: null,
    poids: '',
    description: '',
    category: '',
  });
  const [showProducts, setShowProducts] = useState(null);

  useEffect(() => {
    const fetchColis = async () => {
      try {
        const token = Cookies.get('token');
        const response = await axios.get('http://127.0.0.1:8000/api/admincolis', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setColis(response.data);
      } catch (error) {
        console.error('Error fetching colis:', error);
      }
    };

    fetchColis();
  }, []);

  const handleEdit = (coli) => {
    setEditMode(coli.id);
    setColisFormData({
      ...coli,
      currentPlace: coli.currentPlace, // Correcting the casing
    });
  };

  const handleColisChange = (e) => {
    setColisFormData({
      ...colisFormData,
      [e.target.name]: e.target.value
    });
  };

  const handleProductChange = (e) => {
    setProductFormData({
      ...productFormData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    try {
      const token = Cookies.get('token');
      await axios.put(`http://127.0.0.1:8000/api/update-colis/${colisFormData.id}/`, colisFormData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEditMode(null);
      const updatedColis = colis.map(coli =>
        coli.id === colisFormData.id ? colisFormData : coli
      );
      setColis(updatedColis);
    } catch (error) {
      console.error('Error updating colis:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = Cookies.get('token');
      await axios.delete(`http://127.0.0.1:8000/api/delete-colis/${id}/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setColis(colis.filter(coli => coli.id !== id));
    } catch (error) {
      console.error('Error deleting colis:', error);
    }
  };

  const toggleProducts = (id) => {
    setShowProducts(showProducts === id ? null : id);
  };

  const handleEditProduct = (product) => {
    setEditMode(product.id);
    setProductFormData({ ...product });
  };

  const handleUpdateProduct = async () => {
    try {
      const token = Cookies.get('token');
      await axios.put(`http://127.0.0.1:8000/api/update-product/${productFormData.id}/`, productFormData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEditMode(null);
      // Optionally update state if needed
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const token = Cookies.get('token');
      await axios.delete(`http://127.0.0.1:8000/api/delete-product/${productId}/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Optionally update state if needed
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="admin-client-view">
      <h2>Colis List</h2>
      <Table variant="simple" className="chakra-table">
        <Thead>
          <Tr>
            <Th>Date</Th>
            <Th>State</Th>
            <Th>Destination</Th>
            <Th>Current Place</Th>
            <Th>Transporter</Th>
            <Th>Receiver First Name</Th>
            <Th>Receiver Last Name</Th>
            <Th>Receiver Phone Number</Th>
            <Th>Action</Th>
            <Th>Products</Th>
          </Tr>
        </Thead>
        <Tbody>
          {colis.map((coli) => (
            <React.Fragment key={coli.id}>
              <Tr>
                <Td>
                  {editMode === coli.id ? (
                    <Input
                      type="text"
                      name="date"
                      value={colisFormData.date}
                      onChange={handleColisChange}
                    />
                  ) : (
                    coli.date
                  )}
                </Td>
                <Td>
                  {editMode === coli.id ? (
                    <Input
                      type="text"
                      name="state"
                      value={colisFormData.state}
                      onChange={handleColisChange}
                    />
                  ) : (
                    coli.state
                  )}
                </Td>
                <Td>
                  {editMode === coli.id ? (
                    <Input
                      type="text"
                      name="destination"
                      value={colisFormData.destination}
                      onChange={handleColisChange}
                    />
                  ) : (
                    coli.destination
                  )}
                </Td>
                <Td>
                  {editMode === coli.id ? (
                    <Input
                      type="text"
                      name="currentPlace"
                      value={colisFormData.currentPlace}
                      onChange={handleColisChange}
                    />
                  ) : (
                    coli.currentPlace
                  )}
                </Td>
                <Td>
                  {editMode === coli.id ? (
                    <Input
                      type="text"
                      name="transporter"
                      value={colisFormData.transporter}
                      onChange={handleColisChange}
                    />
                  ) : (
                    coli.transporter
                  )}
                </Td>
                <Td>
                  {editMode === coli.id ? (
                    <Input
                      type="text"
                      name="receiver_first_name"
                      value={colisFormData.receiver_first_name}
                      onChange={handleColisChange}
                    />
                  ) : (
                    coli.receiver_first_name
                  )}
                </Td>
                <Td>
                  {editMode === coli.id ? (
                    <Input
                      type="text"
                      name="receiver_last_name"
                      value={colisFormData.receiver_last_name}
                      onChange={handleColisChange}
                    />
                  ) :
                  (
                    coli.receiver_last_name
                  )}
                </Td>
                <Td>
                  {editMode === coli.id ? (
                    <Input
                    type="text"
                    name="receiver_phone_number"
                    value={colisFormData.receiver_phone_number}
                    onChange={handleColisChange}
                  />
                ) : (
                  coli.receiver_phone_number
                )}
              </Td>
              <Td className="action-buttons">
                {editMode === coli.id ? (
                  <Button onClick={handleSave} colorScheme="blue" size="sm">Save</Button>
                ) : (
                  <>
                    <Button onClick={() => handleEdit(coli)} colorScheme="blue" size="sm">Edit</Button>
                    <Button colorScheme="red" size="sm" onClick={() => handleDelete(coli.id)}>Delete</Button>
                  </>
                )}
              </Td>
              <Td>
                <Button onClick={() => toggleProducts(coli.id)} colorScheme="teal" size="sm">
                  {showProducts === coli.id ? 'Hide Products' : 'Show Products'}
                </Button>
              </Td>
            </Tr>
            {showProducts === coli.id && (
              <Tr>
                <Td colSpan="10">
                  <Collapse in={showProducts === coli.id}>
                    <Box p={4} bg="gray.50">
                      <Table variant="simple">
                        <Thead>
                          <Tr>
                            <Th>ID</Th>
                            <Th>Poids</Th>
                            <Th>Description</Th>
                            <Th>Category</Th>
                            <Th>Action</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {coli.products.map((product) => (
                            <Tr key={product.id}>
                              <Td>{product.id}</Td>
                              <Td>
                                {editMode === product.id ? (
                                  <Input
                                    type="text"
                                    name="poids"
                                    value={productFormData.poids}
                                    onChange={handleProductChange}
                                  />
                                ) : (
                                  product.poids
                                )}
                              </Td>
                              <Td>
                                {editMode === product.id ? (
                                  <Input
                                    type="text"
                                    name="description"
                                    value={productFormData.description}
                                    onChange={handleProductChange}
                                  />
                                ) : (
                                  product.description
                                )}
                              </Td>
                              <Td>
                                {editMode === product.id ? (
                                  <Input
                                    type="text"
                                    name="category"
                                    value={productFormData.category}
                                    onChange={handleProductChange}
                                  />
                                ) : (
                                  product.category
                                )}
                              </Td>
                              <Td>
                                {editMode === product.id ? (
                                  <Button
                                    onClick={handleUpdateProduct}
                                    colorScheme="green"
                                    size="sm"
                                  >
                                    Update
                                  </Button>
                                ) : (
                                  <>
                                    <Button
                                      onClick={() => handleEditProduct(product)}
                                      colorScheme="blue"
                                      size="sm"
                                    >
                                      Edit
                                    </Button>
                                    <Button
                                      colorScheme="red"
                                      size="sm"
                                      onClick={() => handleDeleteProduct(product.id)}
                                    >
                                      Delete
                                    </Button>
                                  </>
                                )}
                              </Td>
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                    </Box>
                  </Collapse>
                </Td>
              </Tr>
            )}
          </React.Fragment>
        ))}
      </Tbody>
    </Table>
  </div>
);
};

export default AdminColisView;
