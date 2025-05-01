import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Orphanages.css'; // Import the CSS file

const OrphanagesPage = () => {
  const navigate = useNavigate();

  const orphanages = [
    {
      id: 1,
      name: 'Sunshine Orphanage',
      address: '123 Sunshine Street, Hyderabad',
      contact: '9876543210',
      imageUrl: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e',
    },
    {
      id: 2,
      name: 'Little Stars Home',
      address: '456 Hope Lane, Bangalore',
      contact: '9871234560',
      imageUrl: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2',
    },
    {
      id: 3,
      name: 'Happy Hearts Shelter',
      address: '789 Joy Road, Chennai',
      contact: '9123456780',
      imageUrl: './chil.jpeg',
    },
    {
      id: 4,
      name: 'Safe Haven Orphanage',
      address: '101 Peace Avenue, Mumbai',
      contact: '9008765432',
      imageUrl: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a',
    },
  ];

  const handleDonate = (orphanageName) => {
    navigate("/donations");
    navigate("/donations", { state: { orphanageName } });
  };
  

  return (
    <div className="orphanages-page p-6">
      <h2>Orphanages</h2>
      <div className="orphanage-card-container">
        {orphanages.map((orphanage) => (
          <div key={orphanage.id} className="orphanage-card">
            <img
              src={orphanage.imageUrl}
              alt={orphanage.name}
            />
            <div className="card-content">
              <h3>{orphanage.name}</h3>
              <p>{orphanage.address}</p>
              <p>{orphanage.contact}</p>
              <button
              className="donate-button"
                 onClick={() => handleDonate(orphanage.name)}
                    >
                   Donate
              </button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrphanagesPage;
