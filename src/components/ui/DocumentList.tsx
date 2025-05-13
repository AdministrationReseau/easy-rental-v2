'use client';

import React, { useState } from "react";
import { BiKey } from "react-icons/bi";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface Documents {
    registration_certificate: string;
    technical_inspection: string;
    insurance: string;
    tax_sticker: string[];
}

interface DocumentListProps {
    documents?: Documents;
}

export const DocumentList: React.FC<DocumentListProps> = ({ documents }) => {
    const { t } = useTranslation('common');
    const [modalOpen, setModalOpen] = useState(false);
    const [pdfUrl, setPdfUrl] = useState<string>("");

    if (!documents) return null;

    const openPdfModal = (url: string) => {
        setPdfUrl(url);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setPdfUrl("");
    };

    // Les clés de traduction pour les documents
    const documentKeys: Record<string, string> = {
        registration_certificate: "documents.registration_certificate",
        technical_inspection: "documents.technical_inspection",
        insurance: "documents.insurance",
        tax_sticker: "documents.tax_sticker",
    };

    return (
        <>
            <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                <DialogContent className="bg-card-light dark:bg-card-dark w-[90%] max-w-2xl p-0">
                    <div className="flex justify-between items-center p-4 border-b border-border-light dark:border-border-dark">
                        <h3 className="text-lg font-semibold text-text-light dark:text-text-dark">
                            {t('documents.document_viewer')}
                        </h3>
                        <button
                            onClick={closeModal}
                            className="text-text-light-secondary dark:text-text-light-secondary hover:text-error-500 rounded-full p-1 transition-colors"
                            aria-label={t('documents.close')}
                        >
                            <X size={20} />
                        </button>
                    </div>
                    <div className="p-4">
                        <iframe
                            src={pdfUrl}
                            width="100%"
                            height="500"
                            title={t('documents.pdf_viewer')}
                            className="border border-border-light dark:border-border-dark rounded-md"
                            sandbox="allow-scripts allow-same-origin"
                            allow="fullscreen"
                        ></iframe>
                    </div>
                </DialogContent>
            </Dialog>

            <div className="space-y-4">
                {Object.entries(documents).map(([key, value]) => (
                    <div
                        key={key}
                        className="flex items-center justify-between p-4 bg-surface-light dark:bg-surface-dark rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 border border-border-light dark:border-border-dark"
                    >
                        <div className="flex items-center space-x-3">
                            <BiKey className="h-5 w-5 text-primary-500 dark:text-primary-400" />
                            <span className="text-text-light dark:text-text-dark">
                                {t(`documents.document_types.${documentKeys[key]}`, { defaultValue: key })}
                            </span>
                        </div>
                        <div className="text-right">
                            {Array.isArray(value) ? (
                                value.map((pdf, i) => (
                                    <div key={i} className="flex items-center space-x-4">
                                        <span className="text-text-light-secondary dark:text-text-light-secondary text-sm">
                                            {pdf.split('/').pop()}
                                        </span>
                                        <button
                                            onClick={() => openPdfModal(pdf)}
                                            className="text-primary-500 dark:text-primary-400 hover:text-primary-600 dark:hover:text-primary-300 font-medium text-sm"
                                        >
                                            {t('documents.view')}
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div className="flex items-center space-x-4">
                                    <span className="text-text-light-secondary dark:text-text-light-secondary text-sm">
                                        {value.split('/').pop()}
                                    </span>
                                    <button
                                        onClick={() => openPdfModal(value)}
                                        className="text-primary-500 dark:text-primary-400 hover:text-primary-600 dark:hover:text-primary-300 font-medium text-sm"
                                    >
                                        {t('documents.view')}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};
