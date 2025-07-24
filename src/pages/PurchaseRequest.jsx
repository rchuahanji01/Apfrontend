
import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { MdOutlineRequestQuote } from 'react-icons/md';
import { FaPlus, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import axios from 'axios';

export default function PurchaseRequest() {
  const [isOpen, setIsOpen] = useState(false);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filteredRequests, setFilteredRequests] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 8;

  const [formData, setFormData] = useState({
    _RequestTitle: '',
    _RequestDescription: '',
    _RequestedBy: '',
    _Department: '',
    _EstimatedAmount: '',
    _CreatedBy: '',
    _CostCenterCode: '',
    _Currency: 'INR',
    _ItemName: '',
    _Quantity: '',
    _UnitPrice: '',
    _PreferredVendorID: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const payload = {
        spname: 'usp_get_all_purchase_requests',
        parameters: {}
      };

      const response = await axios.post('https://apbackend-2.onrender.com/api/Automation/index', payload);
      const data = response.data?.data || [];
      setRequests(data);
      setFilteredRequests(data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        spname: 'usp_add_purchase_request',
        parameters: {
          ...formData,
          _EstimatedAmount: parseFloat(formData._EstimatedAmount),
          _Quantity: parseInt(formData._Quantity),
          _UnitPrice: parseFloat(formData._UnitPrice),
        },
      };

      await axios.post('https://apbackend-2.onrender.com/api/Automation/index', payload);
      setIsOpen(false);
      setFormData({
        _RequestTitle: '',
        _RequestDescription: '',
        _RequestedBy: '',
        _Department: '',
        _EstimatedAmount: '',
        _CreatedBy: '',
        _CostCenterCode: '',
        _Currency: 'INR',
        _ItemName: '',
        _Quantity: '',
        _UnitPrice: '',
        _PreferredVendorID: '',
      });
      fetchRequests();
    } catch (err) {
      console.error('Error submitting request:', err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  useEffect(() => {
    const filtered = requests.filter((req) => {
      const values = Object.values(req).join(' ').toLowerCase();
      return values.includes(search.toLowerCase());
    });
    setFilteredRequests(filtered);
    setCurrentPage(1);
  }, [search, requests]);

  const totalPages = Math.ceil(filteredRequests.length / recordsPerPage);
  const paginatedData = filteredRequests.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <MdOutlineRequestQuote className="text-blue-600 text-4xl" />
            Purchase Requests
          </h1>
          <p className="text-sm text-gray-500 mt-1">Manage and track your purchase requests</p>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md flex items-center gap-2"
        >
          <FaPlus /> Raise New Request
        </button>
      </div>

      {/* Search and Table */}
      <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-xl p-4 min-h-[250px]">
        <div className="flex justify-between items-center mb-3">
          <input
            type="text"
            placeholder="Search anything..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 px-3 py-2 text-sm rounded-lg shadow-sm focus:outline-none"
          />
          <div className="text-xs text-gray-600">
            Showing {Math.min(filteredRequests.length, recordsPerPage)} of {filteredRequests.length}
          </div>
        </div>

        {loading ? (
          <div className="text-center text-blue-600 py-12 font-semibold animate-pulse">Loading requests...</div>
        ) : filteredRequests.length === 0 ? (
          <div className="text-center text-gray-500 py-12">No requests found.</div>
        ) : (
          <div className="overflow-auto max-h-[400px] border border-gray-200 rounded-md">
            <table className="min-w-full text-sm text-left text-gray-700">
              <thead className="bg-gray-100 sticky top-0 z-10 text-xs uppercase">
                <tr>
                  <th className="p-3 whitespace-nowrap">Title</th>
                  <th className="p-3 whitespace-nowrap">Dept</th>
                  <th className="p-3 whitespace-nowrap">Amount</th>
                  <th className="p-3 whitespace-nowrap">By</th>
                  <th className="p-3 whitespace-nowrap">Qty</th>
                  <th className="p-3 whitespace-nowrap">Unit Price</th>
                  <th className="p-3 whitespace-nowrap">Currency</th>
                  <th className="p-3 whitespace-nowrap">Status</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((item, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50 transition-all duration-200">
                    <td className="p-3 whitespace-nowrap">{item.requesttitle}</td>
                    <td className="p-3 whitespace-nowrap">{item.department}</td>
                    <td className="p-3 whitespace-nowrap">₹{item.estimatedamount}</td>
                    <td className="p-3 whitespace-nowrap">{item.requestedby}</td>
                    <td className="p-3 whitespace-nowrap">{item.quantity}</td>
                    <td className="p-3 whitespace-nowrap">₹{item.unitprice}</td>
                    <td className="p-3 whitespace-nowrap">{item.currency}</td>
                    <td className="p-3 whitespace-nowrap">
                      {item.status === 'Approved' ? (
                        <span className="text-green-600 flex items-center gap-1">
                          <FaCheckCircle /> Approved
                        </span>
                      ) : (
                        <span className="text-yellow-600 flex items-center gap-1">
                          <FaTimesCircle /> Pending
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex justify-end items-center gap-2 px-4 py-3">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded border text-sm disabled:text-gray-400 disabled:border-gray-300 hover:bg-gray-100"
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 text-sm rounded border ${
                    currentPage === i + 1 ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded border text-sm disabled:text-gray-400 disabled:border-gray-300 hover:bg-gray-100"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-xl">
            <Dialog.Title className="text-lg font-bold mb-4">Raise New Purchase Request</Dialog.Title>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(formData).map(([key, value]) => (
                <input
                  key={key}
                  name={key}
                  value={value}
                  placeholder={key.replace(/^_/, '').replace(/([A-Z])/g, ' $1')}
                  onChange={handleChange}
                  className="border p-2 rounded"
                />
              ))}
            </div>
            <div className="mt-6 text-right">
              <button
                className="bg-gray-300 px-4 py-2 rounded mr-2"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={handleSubmit}
              >
                Submit Request
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
