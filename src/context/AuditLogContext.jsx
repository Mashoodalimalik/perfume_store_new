import React, { createContext, useContext, useState, useEffect } from 'react';

const AuditLogContext = createContext();

export const useAuditLogs = () => useContext(AuditLogContext);

export const AuditLogProvider = ({ children }) => {
    const [logs, setLogs] = useState(() => {
        const savedLogs = localStorage.getItem('auditLogs');
        return savedLogs ? JSON.parse(savedLogs) : [];
    });

    useEffect(() => {
        localStorage.setItem('auditLogs', JSON.stringify(logs));
    }, [logs]);

    const addLog = (action, details, user = 'Admin') => {
        const newLog = {
            id: Date.now(),
            timestamp: new Date().toISOString(),
            user,
            action,
            details
        };
        setLogs(prevLogs => [newLog, ...prevLogs]);
    };

    const clearLogs = () => {
        setLogs([]);
    };

    return (
        <AuditLogContext.Provider value={{ logs, addLog, clearLogs }}>
            {children}
        </AuditLogContext.Provider>
    );
};
