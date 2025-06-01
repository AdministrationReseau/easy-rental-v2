'use client';
import ProfileTabsPageLayout from "@/components/layout/ProfileTabsPageLauyout";
import { useTranslation } from "react-i18next";
import { Camera, Pencil } from 'lucide-react'
import { useState } from "react";
import Image from "next/image";

export default function PersonalInfo() {
  const { t } = useTranslation('client');
  const [editing, setEditing] = useState<string | null>(null)
  const [form, setForm] = useState({
    name: 'John Doe',
    email: 'user@example.com',
    phone: '',
    avatar:'',
    password:'',
    birthdate: '',
    country: '',
    gender: '',
    address: '',
    passport: '',
    city:'',
    driving_license:'',


  })

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const handleCancel = () => setEditing(null)
  const handleSave = () => {
    // Enregistrement des nouvelles données
    setEditing(null)
  }

const countryData= [
  { name: "Cameroon", dial_code: "+237" },
  { name: "France", dial_code: "+33" },
  { name: "United States", dial_code: "+1" },
  { name: "Germany", dial_code: "+49" },
  { name: "Nigeria", dial_code: "+234" },
  { name: "Canada", dial_code: "+1" },
  { name: "United Kingdom", dial_code: "+44" },
];


const renderRow = (label: string, key: keyof typeof form, placeholder = '') => {
  const value = form[key];

   if (key === 'avatar') {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          handleChange('avatar', reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    };

    return (
      <div className="flex items-center gap-4 py-4 border-t">
        <div className="relative group cursor-pointer">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="avatar-upload"
            onChange={handleFileChange}
          />
          <label htmlFor="avatar-upload">
            <div className="w-24 h-24 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden relative bg-gray-50">
              {form.avatar ? (
                <Image
                  src={form.avatar}
                  alt="Avatar"
                  className="object-cover w-full h-full"
                />
              ) : (
                <span className="text-gray-400 text-sm">Upload</span>
              )}

              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="text-white w-6 h-6" />
              </div>
            </div>
          </label>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">{label}</div>
          <p className="text-sm text-gray-600">Click to change your profile photo</p>
        </div>
      </div>
    );
  }

  const handleInput = () => {
    switch (key) {
      case 'phone':
        return (
          <div className="flex gap-2">
            <select
              className="border border-gray-300 rounded-md p-2 text-sm"
              onChange={e => handleChange(key, e.target.value)}
              value={form[key]}
            >
              {countryData.map(({ name, dial_code }) => (
                <option key={name} value={`${dial_code}`}>
                  {`${name} (${dial_code})`}
                </option>
              ))}
            </select>
            <input
              type="tel"
              placeholder="Phone number"
              className="w-full border border-gray-300 rounded-md p-2 text-sm"
              onChange={e => handleChange(key, e.target.value)}
              value={form[key]}
            />
          </div>
        );

      case 'birthdate':
        return (
          <input
            type="date"
            className="w-full border border-gray-300 rounded-md p-2 text-sm"
            onChange={e => handleChange(key, e.target.value)}
            value={form[key]}
          />
        );

      case 'gender':
        return (
          <select
            className="w-full border border-gray-300 rounded-md p-2 text-sm"
            onChange={e => handleChange(key, e.target.value)}
            value={form[key]}
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        );

      case 'country':
        return (
          <select
            className="w-full border border-gray-300 rounded-md p-2 text-sm"
            onChange={e => handleChange(key, e.target.value)}
            value={form[key]}
          >
            <option value="">Select country</option>
            {countryData.map(({ name }) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        );

      case 'password':
        return (
          <input
            type="password"
            className="w-full border border-gray-300 rounded-md p-2 text-sm"
            onChange={e => handleChange(key, e.target.value)}
            value={form[key]}
            placeholder="New password"
          />
        );

      default:
        return (
          <input
            className="w-full border border-gray-300 rounded-md p-2 text-sm"
            value={form[key]}
            onChange={e => handleChange(key, e.target.value)}
            placeholder={placeholder}
            type={key === 'email' ? 'email' : 'text'}
          />
        );
    }
  };

  return (
    <div className="flex justify-between py-4 border-t items-start">
      <div className="flex-1">
        <div className="text-sm text-gray-500">{label}</div>
        {editing === key ? (
          <div className="mt-1">
            {handleInput()}
            {key === 'email' && (
              <p className="text-xs text-gray-500 mt-1">
                We’ll send a verification link to your new email address — check your inbox.
              </p>
            )}
            <div className="mt-2 flex gap-2">
              <button onClick={handleSave} className="px-3 py-1 text-white bg-blue-600 rounded text-sm hover:bg-blue-700">Save</button>
              <button onClick={handleCancel} className="text-sm text-gray-600 hover:underline">Cancel</button>
            </div>
          </div>
        ) : (
          <p className={`mt-1 text-sm ${value ? 'font-medium' : 'text-gray-400'}`}>
            {value || placeholder}
          </p>
        )}
      </div>

      {editing !== key && (
        <button onClick={() => setEditing(key)} className="text-blue-600 text-sm flex items-center gap-1 hover:underline">
          <Pencil size={12} /> Edit
        </button>
      )}
    </div>
  );
};

console.log('form', form);

  return (
    <ProfileTabsPageLayout title={t('profile.personal.title')}>
     
        <p className="text-sm mb-6">
            Ces informations doivent correspondre à votre pièce d'identité officielle.
        </p>
        {renderRow('Avatar', 'avatar')}
        {renderRow(t('profile.personal.name'), 'name')}
        {renderRow(t('profile.personal.email'), 'email')}
        {renderRow(t('profile.personal.phone'), 'phone',  t('profile.personal.add') + t('profile.personal.phone') )}
        {renderRow(t('profile.personal.date_of_birth'), 'birthdate', t('profile.personal.add') + t('profile.personal.date_of_birth'))}
        {renderRow(t('profile.personal.address'), 'address')}
        {renderRow(t('profile.personal.city'), 'city')}
        {renderRow(t('profile.personal.country'), 'country')}
        {renderRow(t('profile.personal.driving_license'), 'driving_license')}
        {renderRow(t('profile.personal.change_password'), 'password')}

    </ProfileTabsPageLayout>
  
  );
}

