import React, { useState, useEffect } from 'react';
import api from './api';

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    description: "",
    is_income: false,
    date: ""
  });

  const fetchTransactions = async () => {
    const response = await api.get('/transactions/');
    setTransactions(response.data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await api.post('/transactions/', formData);
    fetchTransactions();
    setFormData({
      amount: "",
      category: "",
      description: "",
      is_income: false,
      date: ""
    });
  };

  return (
    <>
      <nav className="bg-blue-600 p-4">
        <div className="container mx-auto">
          <a className="text-white text-2xl font-bold" href="/">Finance App</a>
        </div>
      </nav>
      <div className="container mx-auto p-4">
        <form onSubmit={handleFormSubmit} className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label htmlFor="amount" className="block text-gray-700">Amount</label>
            <input 
              type="text" 
              className="w-full p-2 border border-gray-300 rounded mt-1" 
              id="amount" 
              name="amount"
              onChange={handleInputChange} 
              value={formData.amount} 
            />
          </div>

          <div className="mb-4">
            <label htmlFor="category" className="block text-gray-700">Category</label>
            <input 
              type="text" 
              className="w-full p-2 border border-gray-300 rounded mt-1" 
              id="category" 
              name="category"
              onChange={handleInputChange} 
              value={formData.category} 
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700">Description</label>
            <input 
              type="text" 
              className="w-full p-2 border border-gray-300 rounded mt-1" 
              id="description" 
              name="description"
              onChange={handleInputChange} 
              value={formData.description} 
            />
          </div>

          <div className="mb-4 flex items-center">
            <input 
              type="checkbox" 
              className="mr-2" 
              id="is_income" 
              name="is_income"
              onChange={handleInputChange} 
              checked={formData.is_income} 
            />
            <label htmlFor="is_income" className="text-gray-700">Income?</label>
          </div>

          <div className="mb-4">
            <label htmlFor="date" className="block text-gray-700">Date</label>
            <input 
              type="date" 
              className="w-full p-2 border border-gray-300 rounded mt-1" 
              id="date" 
              name="date"
              onChange={handleInputChange} 
              value={formData.date} 
            />
          </div>

          <button className="w-full bg-blue-600 text-white p-2 rounded mt-4 hover:bg-blue-700">Submit</button>
        </form>
        
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Transactions</h2>
          <ul className="space-y-4">
            {transactions.map(transaction => (
              <li key={transaction.id} className="bg-white p-4 rounded-lg shadow-md">
                <p className="text-gray-700">Amount: {transaction.amount}</p>
                <p className="text-gray-700">Category: {transaction.category}</p>
                <p className="text-gray-700">Description: {transaction.description}</p>
                <p className="text-gray-700">Date: {transaction.date}</p>
                <p className="text-gray-700">Income: {transaction.is_income ? "Yes" : "No"}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default App;
