import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { format, parseISO } from 'date-fns';

const CouponContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 8px;
  padding: 1rem;
  margin-top: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const StatCard = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
`;

const StatValue = styled.p`
  font-size: 2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
`;

const StatLabel = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

const SectionHeader = styled.h3`
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.primary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding-bottom: 0.5rem;
`;

const SubHeader = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors.secondary};
`;

const CouponForm = styled.form`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
  align-items: end;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  height: fit-content;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.disabled};
    cursor: not-allowed;
  }
`;

const CouponList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const CouponItem = styled.li`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 1rem;
  margin-bottom: 0.5rem;
  border-radius: 4px;
  gap: 1rem;
`;

const CouponInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const RemoveButton = styled.button`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: white;
  border: none;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondaryDark};
  }
`;

const UpdateUsesContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  width: 1rem;
  height: 1rem;
`;


const CouponManagement = ({ instanceId }) => {
  const [coupons, setCoupons] = useState([]);
  const [stats, setStats] = useState({
    totalCouponTypes: 0,
    couponsRedeemed: 0,
    couponsAwarded: 0,
    activeCouponTypes: 0,
  });
  const [newCoupon, setNewCoupon] = useState({
    code: '',
    discount: '',
    usesLeft: '',
    expiresAt: '',
    inRotation: false,
  });

  useEffect(() => {
    const fetchCoupons = async () => {
      if (!instanceId) return;
      try {
        const response = await fetch(`/api/${instanceId}/coupons`, { credentials: 'include' });
        if (response.ok) {
          const data = await response.json();
          setCoupons(data);
        }
      } catch (error) {
        console.error('Error fetching coupons:', error);
      }
    };
    fetchCoupons();
  }, [instanceId]);

  useEffect(() => {
    const fetchCouponStats = async () => {
        if (!instanceId) return;
        try {
            const response = await fetch(`/api/${instanceId}/coupons/stats`, { credentials: 'include' });
            if (response.ok) {
                const data = await response.json();
                setStats(data);
            }
        } catch (error) {
            console.error('Error fetching coupon stats:', error);
        }
    };
    fetchCouponStats();
  }, [instanceId, coupons]);

  const handleAddCoupon = async (e) => {
    e.preventDefault();
    if (!newCoupon.code || !newCoupon.discount || !newCoupon.usesLeft || !newCoupon.expiresAt) {
      alert('Please fill in all fields for the new coupon.');
      return;
    }
    try {
      const response = await fetch(`/api/${instanceId}/coupons`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCoupon),
        credentials: 'include',
      });
      if (response.ok) {
        const addedCoupon = await response.json();
        setCoupons([...coupons, addedCoupon]);
        setNewCoupon({ code: '', discount: '', usesLeft: '', expiresAt: '', inRotation: false });
      }
    } catch (error) {
      console.error('Error adding coupon:', error);
    }
  };

  const handleRemoveCoupon = async (code) => {
    try {
      const response = await fetch(`/api/${instanceId}/coupons/${code}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (response.ok) {
        setCoupons(coupons.filter((coupon) => coupon.code !== code));
      }
    } catch (error) {
      console.error('Error deleting coupon:', error);
    }
  };

  const handleUpdateCouponUses = async (code, newUses) => {
    try {
        const response = await fetch(`/api/${instanceId}/coupons/${code}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usesLeft: newUses }),
            credentials: 'include',
        });
        if (response.ok) {
            const updatedCoupon = await response.json();
            setCoupons(coupons.map(c => c.code === code ? updatedCoupon : c));
        }
    } catch (error) {
        console.error('Error updating coupon uses:', error);
    }
  };

  const handleToggleRotation = async (code, inRotation) => {
    try {
      const response = await fetch(`/api/${instanceId}/coupons/${code}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inRotation }),
        credentials: 'include',
      });
      if (response.ok) {
        const updatedCoupon = await response.json();
        setCoupons(coupons.map(c => c.code === code ? updatedCoupon : c));
      }
    } catch (error) {
      console.error('Error toggling coupon rotation:', error);
    }
  };

  const activeCoupons = coupons.filter(c => c.usesLeft > 0);
  const pastCoupons = coupons.filter(c => c.usesLeft <= 0);

  return (
    <CouponContainer>
      <SubHeader>Coupon Management</SubHeader>
      <StatsContainer>
        <StatCard>
            <StatValue>{stats.totalCouponTypes}</StatValue>
            <StatLabel>Total Types</StatLabel>
        </StatCard>
        <StatCard>
            <StatValue>{stats.activeCouponTypes}</StatValue>
            <StatLabel>Active Types</StatLabel>
        </StatCard>
        <StatCard>
            <StatValue>{stats.couponsAwarded}</StatValue>
            <StatLabel>Awarded</StatLabel>
        </StatCard>
        <StatCard>
            <StatValue>{stats.couponsRedeemed}</StatValue>
            <StatLabel>Redeemed</StatLabel>
        </StatCard>
      </StatsContainer>
      <CouponForm onSubmit={handleAddCoupon}>
        <Input
          type="text"
          placeholder="Coupon Code"
          value={newCoupon.code}
          onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })}
        />
        <Input
          type="number"
          placeholder="Discount (%)"
          value={newCoupon.discount}
          onChange={(e) => setNewCoupon({ ...newCoupon, discount: e.target.value })}
        />
        <Input
          type="number"
          placeholder="Number of Uses"
          value={newCoupon.usesLeft}
          onChange={(e) => setNewCoupon({ ...newCoupon, usesLeft: e.target.value })}
        />
        <Input
          type="date"
          value={newCoupon.expiresAt}
          onChange={(e) => setNewCoupon({ ...newCoupon, expiresAt: e.target.value })}
        />
        <Button type="submit">Add Coupon</Button>
      </CouponForm>

      <SectionHeader>Active Coupons</SectionHeader>
      <CouponList>
        {activeCoupons.map((coupon) => (
          <CouponItem key={coupon.code}>
            <CouponInfo>
                <strong>{coupon.code}</strong>
                <span>{coupon.discount}% off</span>
            </CouponInfo>
            <CouponInfo>
                <span>Uses Left: {coupon.usesLeft}</span>
                <span>Expires: {format(parseISO(coupon.expiresAt), 'MMMM d, yyyy')}</span>
            </CouponInfo>
            <UpdateUsesContainer>
                <Button onClick={() => handleUpdateCouponUses(coupon.code, coupon.usesLeft + 1)}>+</Button>
                <Button disabled={coupon.usesLeft <= 0} onClick={() => handleUpdateCouponUses(coupon.code, coupon.usesLeft - 1)}>-</Button>
            </UpdateUsesContainer>
            <CheckboxLabel>
              In Rotation
              <Checkbox
                checked={coupon.inRotation}
                onChange={(e) => handleToggleRotation(coupon.code, e.target.checked)}
              />
            </CheckboxLabel>
            <RemoveButton onClick={() => handleRemoveCoupon(coupon.code)}>Remove</RemoveButton>
          </CouponItem>
        ))}
      </CouponList>

      <SectionHeader>Past Coupons</SectionHeader>
      <CouponList>
        {pastCoupons.map((coupon) => (
          <CouponItem key={coupon.code}>
            <CouponInfo>
                <strong>{coupon.code}</strong>
                <span>{coupon.discount}% off</span>
            </CouponInfo>
            <CouponInfo>
                <span>Uses Left: {coupon.usesLeft}</span>
                <span>Expires: {format(parseISO(coupon.expiresAt), 'MMMM d, yyyy')}</span>
            </CouponInfo>
            <UpdateUsesContainer>
                <Button onClick={() => handleUpdateCouponUses(coupon.code, coupon.usesLeft + 1)}>Re-enable (+)</Button>
            </UpdateUsesContainer>
            <RemoveButton onClick={() => handleRemoveCoupon(coupon.code)}>Remove</RemoveButton>
          </CouponItem>
        ))}
      </CouponList>
    </CouponContainer>
  );
};

export default CouponManagement;