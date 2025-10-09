import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { format, parseISO } from 'date-fns';

const CouponContainer = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const CouponHeader = styled.h3`
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
`;

const CouponList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
`;

const CouponItem = styled.li`
  background-color: ${({ theme }) => theme.colors.background};
  padding: 1rem;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const CouponCode = styled.span`
  font-weight: bold;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.secondary};
`;

const CouponDetails = styled.div`
  margin-top: 0.5rem;
  font-size: 0.9rem;
`;

const NoCoupons = styled.p`
  text-align: center;
  font-style: italic;
  color: ${({ theme }) => theme.colors.text};
`;

const CouponDisplay = ({ instanceId, onSelectCoupon }) => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoupons = async () => {
      if (!instanceId) return;
      setLoading(true);
      try {
        const response = await fetch(`/api/${instanceId}/public/coupons`);
        if (response.ok) {
          const data = await response.json();
          setCoupons(data);
        }
      } catch (error) {
        console.error('Error fetching available coupons:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCoupons();
  }, [instanceId]);

  if (loading) return <p>Loading coupons...</p>;

  return (
    <CouponContainer>
      <CouponHeader>Available Coupons</CouponHeader>
      {coupons.length > 0 ? (
        <CouponList>
          {coupons.map(coupon => (
            <CouponItem key={coupon.code} onClick={() => onSelectCoupon(coupon.code)}>
              <CouponCode>{coupon.code}</CouponCode>
              <CouponDetails>
                <span>{coupon.discount}% off</span> |
                <span> Expires: {format(parseISO(coupon.expiresAt), 'MMMM d, yyyy')}</span>
              </CouponDetails>
            </CouponItem>
          ))}
        </CouponList>
      ) : (
        <NoCoupons>No coupons currently available.</NoCoupons>
      )}
    </CouponContainer>
  );
};

export default CouponDisplay;