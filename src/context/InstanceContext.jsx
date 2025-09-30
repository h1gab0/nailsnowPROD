import React, { createContext, useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const InstanceContext = createContext(null);

export const useInstance = () => {
    return useContext(InstanceContext);
};

export const InstanceProvider = ({ children }) => {
    const { instanceId } = useParams();
    const id = instanceId || 'default';
    const [instanceData, setInstanceData] = useState({ appName: 'Nail Scheduler' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInstanceData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/${id}/public-data`);
                if (response.ok) {
                    const data = await response.json();
                    setInstanceData(data);
                } else {
                    console.error("Failed to fetch instance data");
                    // Keep default app name
                }
            } catch (error) {
                console.error("Error fetching instance data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchInstanceData();
    }, [id]);

    const value = { instanceId: id, instanceData, loading };

    return (
        <InstanceContext.Provider value={value}>
            {children}
        </InstanceContext.Provider>
    );
};
