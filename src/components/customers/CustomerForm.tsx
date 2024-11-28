import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface CustomerFormProps {
  customerId?: number;
  existingCustomerData?: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    createdAt: string;
    updatedAt: string;
  } | null;
  onSubmit: (customerData: {
    customerId?: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
  }) => void;
}

const CustomerForm: React.FC<CustomerFormProps> = ({
  customerId,
  existingCustomerData,
  onSubmit,
}) => {
  const [firstName, setFirstName] = useState(existingCustomerData?.firstName || '');
  const [lastName, setLastName] = useState(existingCustomerData?.lastName || '');
  const [email, setEmail] = useState(existingCustomerData?.email || '');
  const [phoneNumber, setPhoneNumber] = useState(existingCustomerData?.phoneNumber || '');
  const [createdAt, setCreatedAt] = useState(existingCustomerData?.createdAt || '');
  const [updatedAt, setUpdatedAt] = useState(existingCustomerData?.updatedAt || '');

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const customerData = { customerId, firstName, lastName, email, phoneNumber };
    console.log('Phone:' + phoneNumber)
    try {
      await onSubmit(customerData);
    } catch (error) {
      toast.error('An error occurred while processing the request.', { position: 'top-center' });
    }
  };

  useEffect(() => {
    if (existingCustomerData) {
      setFirstName(existingCustomerData.firstName);
      setLastName(existingCustomerData.lastName);
      setEmail(existingCustomerData.email);
      setPhoneNumber(existingCustomerData.phoneNumber);
      setCreatedAt(existingCustomerData.createdAt);
      setUpdatedAt(existingCustomerData.updatedAt);
    }
  }, [existingCustomerData]);

  return (
    <>
      <form onSubmit={handleSubmit} className="p-4 shadow-lg rounded-3 bg-light">
        <h3 className="text-center mb-4">{customerId ? 'Update Customer' : 'Add New Customer'}</h3>
        <div className="row mb-4">
          <div className="col-md-6">
            <div className="form-outline">
              <label className="form-label" htmlFor="firstNameInput">First Name</label>
              <input
                type="text"
                id="firstNameInput"
                className="form-control form-control-lg"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-outline">
              <label className="form-label" htmlFor="lastNameInput">Last Name</label>
              <input
                type="text"
                id="lastNameInput"
                className="form-control form-control-lg"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-md-6">
            <div className="form-outline">
              <label className="form-label" htmlFor="emailInput">Email</label>
              <input
                type="email"
                id="emailInput"
                className="form-control form-control-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-outline">
              <label className="form-label" htmlFor="phoneInput">Phone Number</label>
              <input
                type="tel"
                id="phoneInput"
                className="form-control form-control-lg"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
          </div>
        </div>
        {customerId && (
          <>
            <div className="row mb-4">
              <div className="col-md-6">
                <div className="form-outline">
                  <label className="form-label" htmlFor="createdAtInput">Created At</label>
                  <input
                    type="text"
                    id="createdAtInput"
                    className="form-control form-control-lg"
                    value={formatDate(createdAt)}
                    disabled
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-outline">
                  <label className="form-label" htmlFor="updatedAtInput">Updated At</label>
                  <input
                    type="text"
                    id="updatedAtInput"
                    className="form-control form-control-lg"                    
                    value={formatDate(updatedAt)}
                    disabled
                  />
                </div>
              </div>
            </div>
          </>
        )}
        <div className="text-center">
          <button
            type="submit"
            className="btn btn-primary btn-lg w-100"
            data-mdb-ripple-init
          >
            {customerId ? 'Update Customer' : 'Add Customer'}
          </button>
        </div>
      </form>
      <ToastContainer position="top-center" />
    </>
  );
};

export default CustomerForm;