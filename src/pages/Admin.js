import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: null,
  });

  const [produtos, setProdutos] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('image', formData.image);

    try {
      setLoading(true);
      await axios.post('http://localhost:5000/produtos', data);
      alert('Produto adicionado com sucesso!');
      fetchProdutos(); // Atualiza a lista de produtos
      resetForm();
    } catch (err) {
      console.error('Erro ao adicionar produto:', err.response?.data || err.message);
      alert('Erro ao adicionar produto.');
    } finally {
      setLoading(false);
    }
  };

  const fetchProdutos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/produtos');
      setProdutos(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  const handleEdit = (produto) => {
    setSelectedProduct(produto);
    setIsEditing(true);
    setFormData({
      name: produto.name,
      description: produto.description,
      price: produto.price,
      image: null, // Resetar a imagem para não sobrescrever
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      setLoading(true);
      const response = await axios.put(`http://localhost:5000/produtos/${selectedProduct._id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setProdutos(produtos.map(prod => (prod._id === selectedProduct._id ? response.data : prod)));
      alert('Produto atualizado com sucesso!');
      setIsEditing(false);
      resetForm();
    } catch (error) {
      alert('Erro ao atualizar produto.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Tem certeza que deseja deletar este produto?");
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`http://localhost:5000/produtos/${id}`);
      alert(response.data.message);
      setProdutos((prevProdutos) => prevProdutos.filter((produto) => produto._id !== id));
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Erro desconhecido";
      console.error("Erro ao deletar produto:", errorMessage);
      alert(errorMessage);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      image: null,
    });
    setIsEditing(false);
    setSelectedProduct(null);
  };

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold">Adicionar Produto</h2>
      <form onSubmit={isEditing ? handleUpdate : handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Nome"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border"
          required
        />
        <textarea
          name="description"
          placeholder="Descrição"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border"
          required
        ></textarea>
        <input
          type="number"
          name="price"
          placeholder="Preço"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-2 border"
          required
        />
        <input
          type="file"
          name="image"
          onChange={handleFileChange}
          className="w-full p-2 border"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white">
          {isEditing ? 'Atualizar' : 'Adicionar'}
        </button>
      </form>

      <div className="grid grid-cols-3 gap-4 mt-4">
        {produtos.map((produto) => (
          <div key={produto._id} className="p-4 border rounded">
            <img src={produto.image} alt={produto.name} className="w-full h-48 object-cover" />
            <h2 className="text-xl font-bold">{produto.name}</h2>
            <p>{produto.description}</p>
            <p className="text-green-500 font-bold">${produto.price}</p>
            <button
              className="mt-2 bg-blue-500 text-white py-1 px-3 rounded"
              onClick={() => handleEdit(produto)}
            >
              Editar
            </button>
            <button
              className="mt-2 bg-red-500 text-white py-1 px-3 rounded"
              onClick={() => handleDelete(produto._id)}
            >
              Excluir
            </button>
          </div>
        ))}
      </div>

      {isEditing && selectedProduct && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <form
            onSubmit={handleUpdate}
            className="bg-white p-4 rounded shadow-lg"
          >
            <h2 className="text-lg font-bold">Editar Produto</h2>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Nome"
              className="block w-full border rounded p-2 mb-2"
            />
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Descrição"
              className="block w-full border rounded p-2 mb-2"
            ></textarea>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              placeholder="Preço"
              className="block w-full border rounded p-2 mb-2"
            />
            <input
              type="file"
              onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
              className="w-full p-2 border"
            />
            <button type="submit" className="bg-green-500 text-white py-1 px-3 rounded">
              {loading && <p className="text-blue-500">Carregando...</p>}
              Atualizar
            </button>
            <button
              type="button"
              className="bg-red-500 text-white py-1 px-3 rounded ml-2"
              onClick={() => setIsEditing(false)}
            >
              Cancelar
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Admin;