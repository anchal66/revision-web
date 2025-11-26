'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { TheorySection } from '@/data/types';

interface TOCContextType {
    sections: TheorySection[];
    setSections: (sections: TheorySection[]) => void;
    activeSection: string;
    setActiveSection: (id: string) => void;
    hasFaqs: boolean;
    setHasFaqs: (has: boolean) => void;
}

const TOCContext = createContext<TOCContextType | undefined>(undefined);

export function TOCProvider({ children }: { children: ReactNode }) {
    const [sections, setSections] = useState<TheorySection[]>([]);
    const [activeSection, setActiveSection] = useState<string>('');
    const [hasFaqs, setHasFaqs] = useState<boolean>(false);

    return (
        <TOCContext.Provider
            value={{
                sections,
                setSections,
                activeSection,
                setActiveSection,
                hasFaqs,
                setHasFaqs,
            }}
        >
            {children}
        </TOCContext.Provider>
    );
}

export function useTOC() {
    const context = useContext(TOCContext);
    if (context === undefined) {
        throw new Error('useTOC must be used within a TOCProvider');
    }
    return context;
}
