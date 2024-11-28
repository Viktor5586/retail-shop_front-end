import React, { useEffect, useState } from 'react';
import customerApi from '../../apis/customersApi.js';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { toast } from 'react-toastify';
import ordersApi from '../../apis/ordersApi.js';


interface Customer {
    customerId: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
}

const CustomerList: React.FC = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const response = await customerApi.getCustomers();
            setCustomers(response);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await ordersApi.deleteOrdersForCustomer(id)
            await customerApi.deleteCustomer(id);
            setCustomers(customers.filter((customer) => customer.customerId !== id));
        } catch (error) {
            toast.error(`Error deleting customer: ${error}`);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4 text-primary">Customer Management</h2>
            <div className="text-end mb-4">
                <button
                className="btn btn-lg btn-primary shadow-sm d-flex align-items-center justify-content-center gap-3"
                onClick={() => navigate('/add-customer')}
                >
                <i className="fas fa-plus"></i> <span className="ms-2">New Customer</span>
                </button>
            </div>

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {customers.map((customer) => (
                <div className="col" key={customer.customerId}>
                    <div className="card shadow-sm h-100">
                        <div className="card-body">
                            <h5 className="card-title">{customer.firstName} {customer.lastName}</h5>
                            <p className="card-text">
                                <strong>Email:</strong>
                                    <span id="customerEmail" className="ms-2">{customer.email}</span>
                                    <br />
                                <strong>Phone:</strong> 
                                <span id="customerPhone" className="ms-2">{customer.phoneNumber}</span>
                            </p>

                            <div className="d-flex justify-content-between">
                            <button className="btn btn-warning btn-sm d-flex align-items-center justify-content-center gap-2"
                                onClick={() => navigate(`/edit-customer/${customer.customerId}`)}>
                                <i className="fas fa-pencil-alt"></i>
                                <span>Edit</span>
                            </button>

                            <button className="btn btn-danger btn-sm d-flex align-items-center justify-content-center gap-2"
                                onClick={() => handleDelete(customer.customerId)}>
                                <i className="fas fa-trash"></i>
                                <span>Delete</span>
                            </button>
                        </div>
                        <div className="text-center mt-3">
                            <button
                                className="btn btn-info btn-sm d-flex align-items-center justify-content-center gap-2"
                                onClick={() => navigate(`/orders/${customer.customerId}`)}>
                                <i className="fas fa-list"></i>
                                <span>View Orders</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        ))}
        </div>
    </div>
  );
};

export default CustomerList;