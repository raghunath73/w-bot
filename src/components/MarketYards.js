// src/components/MarketYards.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, ListGroup, Alert, Spinner } from 'react-bootstrap';

const MarketYards = ({ location }) => {
  const [markets, setMarkets] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMarkets = async () => {
      const { lat, lng } = location;
      try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=market&key=YOUR_API_KEY`);
        setMarkets(response.data.results);
      } catch (err) {
        setError('Could not fetch market data');
      }
    };
    
    fetchMarkets();
  }, [location]);

  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div>
      <h2>Nearby Agricultural Market Yards</h2>
      {markets.length > 0 ? (
        <ListGroup>
          {markets.map(market => (
            <ListGroup.Item key={market.place_id}>
              <Card>
                <Card.Body>
                  <Card.Title>{market.name}</Card.Title>
                  <Card.Text>
                    <strong>Rating:</strong> {market.rating}<br />
                    <strong>Address:</strong> {market.vicinity}
                  </Card.Text>
                </Card.Body>
              </Card>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <Spinner animation="border" />
      )}
    </div>
  );
};

export default MarketYards;
