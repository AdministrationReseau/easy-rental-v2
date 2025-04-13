import React, {useState} from "react";
import {KeyIcon} from "lucide-react";

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

    const documentLabels: Record<string, string> = {
        registration_certificate: "Registration Certificate",
        technical_inspection: "Technical Inspection",
        insurance: "Insurance",
        tax_sticker: "Tax Sticker",
    };

    return (
        <>
            {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                    <div className="bg-white p-4 rounded-lg shadow-lg w-[90%] max-w-2xl">
                        <button
                            onClick={closeModal}
                            className="text-red-500 float-right text-lg font-bold"
                        >
                            ✕
                        </button>
                        <iframe
                            src={pdfUrl}
                            width="100%"
                            height="500"
                            title="PDF Viewer"
                            className="mt-4"
                            sandbox="allow-scripts allow-same-origin"
                            allow="fullscreen"
                        ></iframe>
                    </div>
                </div>
            )}

            <div className="space-y-4">
                {Object.entries(documents).map(([key, value]) => (
                    <div
                        key={key}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    >
                        <div className="flex items-center space-x-3">
                            <KeyIcon className="h-5 w-5 text-gray-500" />
                            <span>{documentLabels[key] || key}</span>
                        </div>
                        <div className="text-right">
                            {Array.isArray(value) ? (
                                value.map((pdf, i) => (
                                    <div key={i} className="flex items-center space-x-4">
                                        <span>{pdf}</span>
                                        <button
                                            onClick={() => openPdfModal(pdf)}
                                            className="text-blue-500 hover:text-blue-600"
                                        >
                                            Voir
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <button
                                    onClick={() => openPdfModal(value)}
                                    className="text-blue-500 hover:text-blue-600"
                                >
                                    Voir
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};
