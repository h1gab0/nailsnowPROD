import React, { createContext, useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const InstanceContext = createContext(null);

export const useInstance = () => {
    return useContext(InstanceContext);
};

export const InstanceProvider = ({ children }) => {
    const { instanceId } = useParams();
    const id = instanceId || 'default';

    const [instance, setInstance] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInstanceData = async () => {
            if (!id) return;
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:3000/api/instances/${id}`);
                setInstance(response.data);
            } catch (err) {
                setError(err);
                if (err.response && err.response.status === 404) {
                    setInstance({ name: 'Nail Salon Scheduler' });
                }
            } finally {
                setLoading(false);
            }
        };

        fetchInstanceData();
    }, [id]);

    const value = { instanceId: id, instance, loading, error };

    return (
        <InstanceContext.Provider value={value}>
            {children}
        </InstanceContext.Provider>
    );
};
