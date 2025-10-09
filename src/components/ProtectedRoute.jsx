import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useInstance } from '../context/InstanceContext';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

const LoadingText = styled(motion.div)`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.5rem;
  font-weight: 500;
  text-align: center;
`;

const loadingVariants = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 }
};

const ProtectedRoute = ({ children, superAdminOnly = false }) => {
  const { user, isAuthenticated, loading } = useAuth();
  const { instanceId } = useInstance();

  if (loading) {
    return (
      <LoadingWrapper>
        <LoadingText
          variants={loadingVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.5 }}
        >
          Verifying access...
        </LoadingText>
      </LoadingWrapper>
    );
  }

  if (!isAuthenticated) {
    const loginPath = instanceId ? `/${instanceId}/login` : '/login';
    return <Navigate to={loginPath} replace />;
  }

  // If the route is for super admins only, ensure the user has the correct role.
  if (superAdminOnly && !user.isSuperAdmin) {
    // If a non-super admin tries to access a super admin page, send them to their dashboard.
    return <Navigate to={`/${user.instanceId}/admin`} replace />;
  }

  return children;
};

export default ProtectedRoute;