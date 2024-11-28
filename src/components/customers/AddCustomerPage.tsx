import React, { useState } from 'react';
import CustomerForm from './CustomerForm';
import customerApi from '../../apis/customersApi'; // No need for '.js' if using TypeScript
import { toast } from 'react-toastify';

const AddCustomerPage: React.FC = () => {
  const [customerData] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    createdAt: string;
    updatedAt: string;
  } | null>(null);

  const handleCreateCustomer = async (customerData: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
  }) => {
    try {
      const newCustomer = { ...customerData };
      await customerApi.addCustomer('add', newCustomer);
      toast.success('Customer created successfully!');
    } catch (error) {
      toast.error(`Error creating customer: ${error}`);
    }
  };

  return (
    <div className="container">
      <CustomerForm
        existingCustomerData={customerData}
        onSubmit={handleCreateCustomer}
      />
    </div>
  );
};

export default AddCustomerPage;
