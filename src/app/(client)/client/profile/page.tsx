'use client';

import { useState } from 'react';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [profile, setProfile] = useState({
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '0801 234 5678',
    address: '15 Admiralty Way, Lekki Phase 1, Lagos',
  });

  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    push: false,
  });

  const handleProfileSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    setIsEditing(false);
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      alert('Passwords do not match');
      return;
    }
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    setPasswords({ current: '', new: '', confirm: '' });
    alert('Password changed successfully');
  };

  const tabs = [
    { id: 'profile', label: 'Personal Info', icon: 'user' },
    { id: 'password', label: 'Password', icon: 'lock' },
    { id: 'notifications', label: 'Notifications', icon: 'bell' },
    { id: 'addresses', label: 'Addresses', icon: 'location' },
  ];

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-semibold text-foreground tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-0.5">Manage your account preferences</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-card rounded-2xl border border-border/20 overflow-hidden">
            {/* Profile Header */}
            <div className="p-5 text-center border-b border-border/20">
              <div className="w-16 h-16 rounded-full bg-[#044D22] flex items-center justify-center text-white text-xl font-bold mx-auto mb-3">
                JD
              </div>
              <p className="font-semibold text-foreground">{profile.fullName}</p>
              <p className="text-sm text-muted-foreground">{profile.email}</p>
            </div>
            
            {/* Navigation */}
            <nav className="p-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-[#044D22] text-white'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  {tab.icon === 'user' && <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>}
                  {tab.icon === 'lock' && <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>}
                  {tab.icon === 'bell' && <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" /></svg>}
                  {tab.icon === 'location' && <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>}
                  {tab.label}
                </button>
              ))}
            </nav>

            <div className="p-2 border-t border-border/20">
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                </svg>
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {/* Personal Info */}
          {activeTab === 'profile' && (
            <div className="bg-card rounded-2xl border border-border/20 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold text-foreground">Personal Information</h2>
                {!isEditing && (
                  <button onClick={() => setIsEditing(true)} className="px-4 py-2 bg-muted text-muted-foreground font-medium rounded-xl hover:bg-muted/80 text-sm transition-colors">
                    Edit
                  </button>
                )}
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1.5">Full Name</label>
                  <input type="text" value={profile.fullName} onChange={(e) => setProfile(p => ({ ...p, fullName: e.target.value }))} disabled={!isEditing} className="w-full h-11 px-4 bg-muted/30 border border-border/30 rounded-xl disabled:bg-muted disabled:text-muted-foreground text-foreground focus:outline-none focus:bg-card focus:border-[#044D22] transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1.5">Email</label>
                  <input type="email" value={profile.email} onChange={(e) => setProfile(p => ({ ...p, email: e.target.value }))} disabled={!isEditing} className="w-full h-11 px-4 bg-muted/30 border border-border/30 rounded-xl disabled:bg-muted disabled:text-muted-foreground text-foreground focus:outline-none focus:bg-card focus:border-[#044D22] transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1.5">Phone</label>
                  <input type="tel" value={profile.phone} onChange={(e) => setProfile(p => ({ ...p, phone: e.target.value }))} disabled={!isEditing} className="w-full h-11 px-4 bg-muted/30 border border-border/30 rounded-xl disabled:bg-muted disabled:text-muted-foreground text-foreground focus:outline-none focus:bg-card focus:border-[#044D22] transition-all" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-muted-foreground mb-1.5">Address</label>
                  <textarea value={profile.address} onChange={(e) => setProfile(p => ({ ...p, address: e.target.value }))} disabled={!isEditing} rows={2} className="w-full py-3 px-4 bg-muted/30 border border-border/30 rounded-xl disabled:bg-muted disabled:text-muted-foreground text-foreground focus:outline-none focus:bg-card focus:border-[#044D22] transition-all resize-none" />
                </div>
              </div>
              
              {isEditing && (
                <div className="flex gap-3 mt-6">
                  <button onClick={handleProfileSave} disabled={isSaving} className="px-6 py-2.5 bg-[#044D22] text-white font-medium rounded-xl hover:bg-[#033a19] disabled:opacity-50 transition-colors">
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button onClick={() => setIsEditing(false)} className="px-6 py-2.5 bg-muted text-muted-foreground font-medium rounded-xl hover:bg-muted/80 transition-colors">
                    Cancel
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Password */}
          {activeTab === 'password' && (
            <div className="bg-card rounded-2xl border border-border/20 p-6">
              <h2 className="font-semibold text-foreground mb-6">Change Password</h2>
              <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1.5">Current Password</label>
                  <input type="password" value={passwords.current} onChange={(e) => setPasswords(p => ({ ...p, current: e.target.value }))} className="w-full h-11 px-4 bg-muted/30 border border-border/30 rounded-xl text-foreground focus:outline-none focus:bg-card focus:border-[#044D22] transition-all" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1.5">New Password</label>
                  <input type="password" value={passwords.new} onChange={(e) => setPasswords(p => ({ ...p, new: e.target.value }))} className="w-full h-11 px-4 bg-muted/30 border border-border/30 rounded-xl text-foreground focus:outline-none focus:bg-card focus:border-[#044D22] transition-all" required minLength={8} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1.5">Confirm Password</label>
                  <input type="password" value={passwords.confirm} onChange={(e) => setPasswords(p => ({ ...p, confirm: e.target.value }))} className="w-full h-11 px-4 bg-muted/30 border border-border/30 rounded-xl text-foreground focus:outline-none focus:bg-card focus:border-[#044D22] transition-all" required />
                </div>
                <button type="submit" disabled={isSaving} className="px-6 py-2.5 bg-[#044D22] text-white font-medium rounded-xl hover:bg-[#033a19] disabled:opacity-50 transition-colors">
                  {isSaving ? 'Updating...' : 'Update Password'}
                </button>
              </form>
            </div>
          )}

          {/* Notifications */}
          {activeTab === 'notifications' && (
            <div className="bg-card rounded-2xl border border-border/20 p-6">
              <h2 className="font-semibold text-foreground mb-6">Notification Preferences</h2>
              <div className="space-y-3">
                {[
                  { id: 'email', label: 'Email Notifications', desc: 'Receive updates via email' },
                  { id: 'sms', label: 'SMS Notifications', desc: 'Receive updates via SMS' },
                  { id: 'push', label: 'Push Notifications', desc: 'Receive push notifications' },
                ].map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
                    <div>
                      <p className="font-medium text-foreground">{item.label}</p>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                    <button
                      onClick={() => setNotifications(n => ({ ...n, [item.id]: !n[item.id as keyof typeof n] }))}
                      className={`relative w-12 h-6 rounded-full transition-colors ${notifications[item.id as keyof typeof notifications] ? 'bg-[#044D22]' : 'bg-muted'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${notifications[item.id as keyof typeof notifications] ? 'left-7' : 'left-1'}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Addresses */}
          {activeTab === 'addresses' && (
            <div className="bg-card rounded-2xl border border-border/20 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold text-foreground">Saved Addresses</h2>
                <button className="px-4 py-2 bg-[#044D22] text-white font-medium rounded-xl hover:bg-[#033a19] text-sm transition-colors">
                  + Add
                </button>
              </div>
              <div className="space-y-3">
                <div className="p-4 border-2 border-[#044D22]/30 bg-[#044D22]/5 dark:bg-[#044D22]/10 rounded-xl">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 bg-[#044D22] text-white text-xs font-medium rounded">Default</span>
                    <span className="font-medium text-foreground">Home</span>
                  </div>
                  <p className="text-sm text-muted-foreground">15 Admiralty Way, Lekki Phase 1, Lagos</p>
                </div>
                <div className="p-4 border border-border/30 rounded-xl hover:border-border transition-colors">
                  <p className="font-medium text-foreground mb-1">Office</p>
                  <p className="text-sm text-muted-foreground">42 Allen Avenue, Ikeja, Lagos</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
