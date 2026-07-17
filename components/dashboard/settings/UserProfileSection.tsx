'use client';
import { useState } from 'react';
import { Camera, Save, User } from 'lucide-react';
import SectionCard from './SectionCard';
import SectionHeading from './SectionHeading';
import Field from './Field';
import Toggle from './Toggle';
import { useUserProfileStore } from '@/providers/user-profile-store';
import UserService from '@/services/UserService';
import { useToastStore } from '@/providers/toast-provider';

export default function UserProfileSection() {
  const { userProfile, setUserProfile } = useUserProfileStore();
  const { show } = useToastStore();

  const [firstName, setFirstName] = useState(userProfile?.firstName ?? '');
  const [lastName, setLastName] = useState(userProfile?.lastName ?? '');
  const [saving, setSaving] = useState(false);

  const initials = ((firstName?.[0] ?? '') + (lastName?.[0] ?? '')).toUpperCase() || 'U';
  const fullName = [firstName, lastName].filter(Boolean).join(' ') || 'User';

  const hasChanges =
    firstName !== (userProfile?.firstName ?? '') ||
    lastName !== (userProfile?.lastName ?? '');

  const handleSave = async () => {
    if (!hasChanges || saving) return;
    setSaving(true);
    try {
      const updated = await UserService.updateProfile({ firstName, lastName });
      setUserProfile(updated);
      show('Profile updated', 'success');
    } catch {
      show('Failed to update profile', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <SectionCard id="profile">
      <SectionHeading
        icon={User}
        title="Your Profile"
        blurb="How you appear to teammates and in notifications."
      />

      {/* Avatar + identity row */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-5 mb-6 pb-6 border-b border-outline-variant/10">
        <div className="relative shrink-0">
          <div className="w-20 h-20 rounded-full bg-primary-container/30 border-2 border-primary-container/50 flex items-center justify-center text-primary text-xl font-bold">
            {initials}
          </div>
          <button
            type="button"
            aria-label="Change avatar"
            className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-primary-container border-2 border-surface-container-lowest text-on-primary-container flex items-center justify-center hover:opacity-90 transition-opacity"
          >
            <Camera className="w-3.5 h-3.5" strokeWidth={2} />
          </button>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-base font-semibold text-on-surface">
              {fullName}
            </h3>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase bg-primary/10 text-primary">
              Owner
            </span>
          </div>
          <p className="text-xs text-on-surface-variant mt-1">
            {userProfile?.email}
          </p>
        </div>
      </div>

      {/* Editable fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Field label="First Name" value={firstName} onChange={setFirstName} />
        <Field label="Last name" value={lastName} onChange={setLastName} />
        <Field
          hint="Used for sign-in and notifications."
          label="Email"
          value={userProfile?.email}
          disabled
        />
      </div>

      {/* Save button */}
      <div className="flex justify-end mb-6">
        <button
          type="button"
          onClick={handleSave}
          disabled={!hasChanges || saving}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors bg-primary text-on-primary hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Save className="w-4 h-4" strokeWidth={2} />
          {saving ? 'Saving…' : 'Save changes'}
        </button>
      </div>

      {/* Personal preferences */}
      <div className="pt-5 border-t border-outline-variant/10">
        <h3 className="text-sm font-semibold text-on-surface mb-3">
          Preferences
        </h3>
        <div>
          <Toggle
            label="Show my activity to teammates"
            description="When enabled, teammates can see which transactions you've categorized and which rules you've created."
            defaultChecked
          />
          <Toggle
            label="Compact tables"
            description="Reduces row padding in transactions, wallets, and reports tables for higher information density."
          />
          <Toggle
            label="Use 24-hour time"
            description="Affects timestamps throughout the dashboard."
          />
        </div>
      </div>
    </SectionCard>
  );
}
