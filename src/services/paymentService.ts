import axios from "axios";

const BASE_URL = "https://gateway.yowyob.com/payment-service/";

export const createPayment = async (formData: {
  name: string;
  email: string;
  phone: string;
  amount: string;
  method: string;
}) => {
  const apiKey = "OyeJA0OxOJQ3Q8MDXO2jpP347tTQnnWZ";
  const requestBody = {
    "transaction_amount": formData.amount,
    "transaction_currency": "XAF",
    "transaction_method": formData.method,
    "transaction_reference": "unique_subscription_ref_" + new Date().getTime(),
    "payer_name": formData.name,
    "payer_email": formData.email,
    "payer_phone_number": formData.phone,
    "service_name": "Abonnement Premium",
    "service_description": "Accès complet au contenu premium",
    "service_quantity": 1,
  };

  const response = await axios.post(`${BASE_URL}${apiKey}/payin`, requestBody, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};
