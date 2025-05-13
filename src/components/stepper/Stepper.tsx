import React from 'react';
import { useTranslation } from 'react-i18next';

export interface StepperProps {
    steps: string[] | { key: string }[];
    currentStep: number;
    className?: string;
    namespace?: string;
}

export const Stepper: React.FC<StepperProps> = ({
                                                    steps,
                                                    currentStep,
                                                    className = '',
                                                    namespace = 'common'
                                                }) => {
    const { t } = useTranslation(namespace);

    // Détermine si les étapes sont des chaînes simples ou des objets avec des clés de traduction
    const getStepLabel = (step: string | { key: string }): string => {
        if (typeof step === 'string') {
            return step;
        }
        return t(`stepper.steps.${step.key}`);
    };

    return (
        <div className={`stepper ${className}`}>
            {steps.map((step, index) => {
                const isActive = currentStep === index;
                const isCompleted = currentStep > index;

                return (
                    <div key={index} className="stepper-step">
                        {index > 0 && (
                            <div
                                className={`step-connector ${index <= currentStep ? 'active' : ''}`}
                                style={{ left: '0' }}
                            />
                        )}

                        <div
                            className={`step-indicator ${
                                isActive ? 'active' : isCompleted ? 'completed' : ''
                            }`}
                        >
                            {isCompleted ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            ) : (
                                index + 1
                            )}
                        </div>

                        <div className="mt-2 text-center">
                            <span className={`text-sm font-medium ${
                                isActive || isCompleted
                                    ? 'text-primary-500 dark:text-primary-400'
                                    : 'text-text-light-secondary dark:text-text-light-secondary'
                            }`}>
                                {getStepLabel(step)}
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
