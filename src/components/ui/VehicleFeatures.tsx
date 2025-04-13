import React from "react";

export const VehicleFeatures: React.FC<{ vehicleFeatures: Record<string, boolean> }> = ({ vehicleFeatures }) => {
    const features = [
        "Air Condition",
        "Child Seat",
        "GPS",
        "USB Input",
        "Bluetooth",
        "Luggage",
        "Seat Belt",
        "Sleeping Bed",
        "Water",
        "Audio Input",
        "Onboard Computer",
        "Additional Covers",
    ];

    const isValidFeaturesObject = vehicleFeatures && typeof vehicleFeatures === 'object';

    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:items-center">
                {features.map((feature, index) => (
                    <div key={index}
                         className="bg-gray-50 p-3 rounded-lg text-center hover:bg-gray-100 transition-colors duration-200 sm:text-center">
                        {isValidFeaturesObject ?
                            <p className="text-sm font-medium text-gray-700">{feature}</p>
                            :
                            <p></p>
                        }
                    </div>
                ))}
            </div>
        </>
    );
};
