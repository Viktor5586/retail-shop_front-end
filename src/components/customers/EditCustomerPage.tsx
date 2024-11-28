import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CustomerForm from './CustomerForm';
import customerApi from '../../apis/customersApi.js'; 
import { toast } from 'react-toastify';

const EditCustomerPage: React.FC = () => {
    const { customerId } = useParams<{ customerId: string }>();
    const [customerData, setCustomerData] = useState<{ 
      customerId: number; 
      firstName: string; 
      lastName: string; 
      email: string; 
      phoneNumber:string;
      createdAt: string;
      updatedAt: string;
    } | null>(null);
  
    useEffect(() => {
      const fetchCustomerData = async () => {
        try {
          const data = await customerApi.getCustomer(Number(customerId));
          setCustomerData(data);
        } catch (error) {
          toast.error(`Error fetching customer data: ${error}`);
        }
      };
  
      if (customerId) {
        fetchCustomerData();
      }
    }, [customerId]);
  
    const handleEditCustomer = async (customerData: { 
      firstName: string; 
      lastName: string; 
      email: string; 
      phoneNumber:string;
    }) => {
      try {
        const updatedCustomer = { 
          customerId: Number(customerId), 
          ...customerData 
        };  
        await customerApi.editCustomer('edit', updatedCustomer);
        toast.success('Customer updated successfully!', { position: 'top-center' });
      } catch (error) {
        console.error('Error updating customer:', error);
      }
    };
  
    return (
      <div>
        {customerData ? (
          <CustomerForm
            customerId={Number(customerId)}
            existingCustomerData={customerData}
            onSubmit={handleEditCustomer}
          />
        ) : (
          <p>Loading customer data...</p>
        )}
      </div>
    );
  };
  
  export default EditCustomerPage;