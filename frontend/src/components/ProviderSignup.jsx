import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ProviderSignup() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic Info
    email: '',
    password: '',
    fullName: '',
    phoneNumber: '',
    
    // Provider Details
    serviceType: '',
    certifications: [],
    identityProof: null,
    licenseProof: null,
    serviceAreas: [],
    availability: {}
  });

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/auth/provider/signup', formData);
      
      if (response.data.success) {
        localStorage.setItem('providerToken', response.data.token);
        navigate('/provider/waiting-approval');
      }
    } catch (error) {
      console.error('Registration failed:', error.response?.data?.error);
    }
  };

  return (
    <div className="provider-signup-container">
      {/* Step 1: Basic Information */}
      {step === 1 && (
        <div className="signup-step">
          <h2>Basic Information</h2>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          {/* Other basic fields... */}
          <button onClick={() => setStep(2)}>Next</button>
        </div>
      )}

      {/* Step 2: Service Details */}
      {step === 2 && (
        <div className="signup-step">
          <h2>Service Information</h2>
          <select
            value={formData.serviceType}
            onChange={(e) => setFormData({...formData, serviceType: e.target.value})}
          >
            <option value="">Select Service</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Electrical">Electrical</option>
            {/* Other services... */}
          </select>
          
          {/* File upload for certifications */}
          <input
            type="file"
            onChange={(e) => setFormData({...formData, certifications: e.target.files})}
            multiple
          />
          <button onClick={() => setStep(3)}>Next</button>
        </div>
      )}

      {/* Step 3: Verification */}
      {step === 3 && (
        <div className="signup-step">
          <h2>Identity Verification</h2>
          <FileUpload 
            label="Government ID"
            onUpload={(file) => setFormData({...formData, identityProof: file})}
          />
          <FileUpload
            label="Professional License"
            onUpload={(file) => setFormData({...formData, licenseProof: file})}
          />
          <button onClick={handleSubmit}>Submit Application</button>
        </div>
      )}
    </div>
  );
}

// File Upload Helper Component
function FileUpload({ label, onUpload }) {
  return (
    <div className="file-upload">
      <label>{label}</label>
      <input 
        type="file" 
        onChange={(e) => onUpload(e.target.files[0])}
      />
    </div>
  );
}