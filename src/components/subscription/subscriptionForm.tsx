// import React, { useState } from "react";
// // import { createPayment } from "../services/apiservice.ts";

// const SubscriptionForm: React.FC = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     amount: "",
//     method: "MOBILE",
//   });
//   const navigate = useNavigate();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await createPayment(formData);
//       if (response.status === "SUCCESS") {
//         navigate("/confirmation");
//       } else {
//         navigate("/error");
//       }
//     } catch (error) {
//       console.error(error);
//       navigate("/error");
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
//     >
//       <h1 className="text-xl font-bold mb-4">Souscription</h1>
//       <input
//         type="text"
//         name="name"
//         placeholder="Nom"
//         value={formData.name}
//         onChange={handleChange}
//         required
//         className="border border-gray-300 rounded py-2 px-3 mb-4 w-full"
//       />
//       <input
//         type="email"
//         name="email"
//         placeholder="Email"
//         value={formData.email}
//         onChange={handleChange}
//         required
//         className="border border-gray-300 rounded py-2 px-3 mb-4 w-full"
//       />
//       <input
//         type="tel"
//         name="phone"
//         placeholder="Téléphone"
//         value={formData.phone}
//         onChange={handleChange}
//         required
//         className="border border-gray-300 rounded py-2 px-3 mb-4 w-full"
//       />
//       <input
//         type="number"
//         name="amount"
//         placeholder="Montant"
//         value={formData.amount}
//         onChange={handleChange}
//         required
//         className="border border-gray-300 rounded py-2 px-3 mb-4 w-full"
//       />
//       <button
//         type="submit"
//         className="bg-blue-500 text-white rounded py-2 px-4 hover:bg-blue-700"
//       >
//         Souscrire
//       </button>
//     </form>
//   );
// };

// export default SubscriptionForm;
