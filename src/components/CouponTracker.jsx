import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { format, parseISO } from 'date-fns';

const TrackerContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 8px;
  padding: 1rem;
  margin-top: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SubHeader = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors.secondary};
`;

const AppointmentList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const AppointmentItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 1rem;
  margin-bottom: 0.5rem;
  border-radius: 4px;
`;

const AppointmentInfo = styled.div`
  font-size: 0.9rem;
`;

const CouponCode = styled.span`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`;

const NoAwardsMessage = styled.p`
  text-align: center;
  font-style: italic;
  color: ${({ theme }) => theme.colors.text};
`;

const CouponTracker = ({ instanceId }) => {
    const [awardedAppointments, setAwardedAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAppointments = async () => {
            if (!instanceId) return;
            setLoading(true);
            try {
                const response = await fetch(`/api/${instanceId}/appointments`, { credentials: 'include' });
                if (response.ok) {
                    const data = await response.json();
                    const awarded = data.filter(appt => appt.awardedCoupon);
                    setAwardedAppointments(awarded);
                }
            } catch (error) {
                console.error('Error fetching appointments for coupon tracker:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchAppointments();
    }, [instanceId]);

    return (
        <TrackerContainer>
            <SubHeader>Coupon Award Tracker</SubHeader>
            {loading ? (
                <p>Loading awarded coupons...</p>
            ) : awardedAppointments.length > 0 ? (
                <AppointmentList>
                    {awardedAppointments.map(appt => (
                        <AppointmentItem key={appt.id}>
                            <AppointmentInfo>
                                <strong>{appt.clientName}</strong> on {format(parseISO(appt.date), 'MMMM d, yyyy')}
                            </AppointmentInfo>
                            <AppointmentInfo>
                                Awarded: <CouponCode>{appt.awardedCoupon.code}</CouponCode>
                            </AppointmentInfo>
                        </AppointmentItem>
                    ))}
                </AppointmentList>
            ) : (
                <NoAwardsMessage>No coupons have been awarded yet.</NoAwardsMessage>
            )}
        </TrackerContainer>
    );
};

export default CouponTracker;