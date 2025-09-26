// pages/Settings/Settings.tsx
import React, { useState } from "react";
import { 
  User, 
  Bell, 
  Monitor, 
  Volume2, 
  Shield, 
  Gamepad2, 
  Palette, 
  Globe, 
  Moon, 
  Sun, 
  Check, 
  ChevronRight,
  Eye,
  Clock,
  Target,
  Zap,
  Save,
  RotateCcw,
  Camera,
  Mail,
//   Lock
} from "lucide-react";
import { useUserStore } from "../../utils/store";
import { User as UserType } from "../../utils/types";

interface SettingsState {
  // Profile Settings
  username: string;
  email: string;
  avatar: string;
  
  // Game Settings
  timeControl: string;
  pieceStyle: string;
  boardTheme: string;
  autoQueen: boolean;
  showLegalMoves: boolean;
  highlightLastMove: boolean;
  
  // Display Settings
  theme: 'light' | 'dark' | 'system';
  language: string;
  showCoordinates: boolean;
  animationSpeed: string;
  
  // Audio Settings
  soundEnabled: boolean;
  moveSound: boolean;
  captureSound: boolean;
  checkSound: boolean;
  volume: number;
  
  // Notification Settings
  gameInvites: boolean;
  gameUpdates: boolean;
  friendRequests: boolean;
  emailNotifications: boolean;
  
  // Privacy Settings
  profileVisibility: string;
  showOnlineStatus: boolean;
  allowSpectators: boolean;
}

export default function Settings() {
  const [activeSection, setActiveSection] = useState('profile');
  const [settings, setSettings] = useState<SettingsState>({
    // Profile Settings
    username: 'ChessPlayer2025',
    email: 'player@email.com',
    avatar: '',
    
    // Game Settings
    timeControl: '10+0',
    pieceStyle: 'classic',
    boardTheme: 'wood',
    autoQueen: true,
    showLegalMoves: true,
    highlightLastMove: true,
    
    // Display Settings
    theme: 'dark',
    language: 'English',
    showCoordinates: true,
    animationSpeed: 'normal',
    
    // Audio Settings
    soundEnabled: true,
    moveSound: true,
    captureSound: true,
    checkSound: true,
    volume: 70,
    
    // Notification Settings
    gameInvites: true,
    gameUpdates: true,
    friendRequests: true,
    emailNotifications: false,
    
    // Privacy Settings
    profileVisibility: 'public',
    showOnlineStatus: true,
    allowSpectators: true,
  });

  const [hasChanges, setHasChanges] = useState(false);

  const updateSetting = (key: keyof SettingsState, value: unknown) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleSave = () => {
    // Save settings logic here
    console.log('Saving settings:', settings);
    setHasChanges(false);
    // Show success notification
  };

  const handleReset = () => {
    // Reset to default settings
    setHasChanges(false);
  };

  const settingSections = [
    { id: 'profile', name: 'Profile', icon: <User className="w-5 h-5" /> },
    { id: 'game', name: 'Game Settings', icon: <Gamepad2 className="w-5 h-5" /> },
    { id: 'display', name: 'Display', icon: <Monitor className="w-5 h-5" /> },
    { id: 'audio', name: 'Audio', icon: <Volume2 className="w-5 h-5" /> },
    { id: 'notifications', name: 'Notifications', icon: <Bell className="w-5 h-5" /> },
    { id: 'privacy', name: 'Privacy', icon: <Shield className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Settings</h1>
          <p className="text-slate-400">Customize your chess experience</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Settings Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-4">
              <nav className="space-y-2">
                {settingSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200
                      ${activeSection === section.id
                        ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                        : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                      }
                    `}
                  >
                    {section.icon}
                    <span className="font-medium">{section.name}</span>
                    <ChevronRight className="w-4 h-4 ml-auto opacity-50" />
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3">
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6">
              {activeSection === 'profile' && <ProfileSettings settings={settings} updateSetting={updateSetting} />}
              {activeSection === 'game' && <GameSettings settings={settings} updateSetting={updateSetting} />}
              {activeSection === 'display' && <DisplaySettings settings={settings} updateSetting={updateSetting} />}
              {activeSection === 'audio' && <AudioSettings settings={settings} updateSetting={updateSetting} />}
              {activeSection === 'notifications' && <NotificationSettings settings={settings} updateSetting={updateSetting} />}
              {activeSection === 'privacy' && <PrivacySettings settings={settings} updateSetting={updateSetting} />}
            </div>

            {/* Action Buttons */}
            {hasChanges && (
              <div className="mt-6 flex gap-4 justify-end">
                <button
                  onClick={handleReset}
                  className="px-6 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-medium transition-all duration-200 flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all duration-200 flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Profile Settings Component
function ProfileSettings({ settings, updateSetting }: { settings: SettingsState; updateSetting: (key: keyof SettingsState, value: unknown) => void }) {

  const user : UserType = useUserStore.getState();
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <User className="w-6 h-6 text-blue-400" />
          Profile Settings
        </h2>
        
        {/* Avatar Section */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-slate-300 mb-4">Profile Picture</label>
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
              {settings.username.charAt(0).toUpperCase()}
            </div>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition-all duration-200">
              <Camera className="w-4 h-4" />
              Change Avatar
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Username"
            icon={<User className="w-4 h-4" />}
            value={settings.username}
            onChange={(value) => updateSetting('username', value)}
            placeholder="Enter username"
          />
          
          <InputField
            label="Email"
            icon={<Mail className="w-4 h-4" />}
            value={settings.email}
            onChange={(value) => updateSetting('email', value)}
            placeholder="Enter email"
            type="email"
          />
        </div>
      </div>
    </div>
  );
}

// Game Settings Component
function GameSettings({ settings, updateSetting }: { settings: SettingsState; updateSetting: (key: keyof SettingsState, value: unknown) => void }) {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        <Gamepad2 className="w-6 h-6 text-blue-400" />
        Game Settings
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectField
          label="Time Control"
          icon={<Clock className="w-4 h-4" />}
          value={settings.timeControl}
          onChange={(value) => updateSetting('timeControl', value)}
          options={[
            { value: '1+0', label: '1 minute' },
            { value: '3+0', label: '3 minutes' },
            { value: '5+0', label: '5 minutes' },
            { value: '10+0', label: '10 minutes' },
            { value: '15+10', label: '15+10' },
            { value: '30+0', label: '30 minutes' },
          ]}
        />
        
        <SelectField
          label="Piece Style"
          icon={<Target className="w-4 h-4" />}
          value={settings.pieceStyle}
          onChange={(value) => updateSetting('pieceStyle', value)}
          options={[
            { value: 'classic', label: 'Classic' },
            { value: 'modern', label: 'Modern' },
            { value: 'medieval', label: 'Medieval' },
            { value: 'glass', label: 'Glass' },
          ]}
        />
        
        <SelectField
          label="Board Theme"
          icon={<Palette className="w-4 h-4" />}
          value={settings.boardTheme}
          onChange={(value) => updateSetting('boardTheme', value)}
          options={[
            { value: 'wood', label: 'Wood' },
            { value: 'marble', label: 'Marble' },
            { value: 'green', label: 'Green' },
            { value: 'blue', label: 'Blue' },
            { value: 'purple', label: 'Purple' },
          ]}
        />
        
        <div className="space-y-4">
          <ToggleField
            label="Auto-Queen Promotion"
            description="Automatically promote pawns to queens"
            checked={settings.autoQueen}
            onChange={(checked) => updateSetting('autoQueen', checked)}
          />
          
          <ToggleField
            label="Show Legal Moves"
            description="Highlight possible moves when selecting a piece"
            checked={settings.showLegalMoves}
            onChange={(checked) => updateSetting('showLegalMoves', checked)}
          />
          
          <ToggleField
            label="Highlight Last Move"
            description="Show the previous move on the board"
            checked={settings.highlightLastMove}
            onChange={(checked) => updateSetting('highlightLastMove', checked)}
          />
        </div>
      </div>
    </div>
  );
}

// Display Settings Component
function DisplaySettings({ settings, updateSetting }: { settings: SettingsState; updateSetting: (key: keyof SettingsState, value: unknown) => void }) {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        <Monitor className="w-6 h-6 text-blue-400" />
        Display Settings
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectField
          label="Theme"
          icon={settings.theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          value={settings.theme}
          onChange={(value) => updateSetting('theme', value)}
          options={[
            { value: 'light', label: 'Light' },
            { value: 'dark', label: 'Dark' },
            { value: 'system', label: 'System' },
          ]}
        />
        
        <SelectField
          label="Language"
          icon={<Globe className="w-4 h-4" />}
          value={settings.language}
          onChange={(value) => updateSetting('language', value)}
          options={[
            { value: 'English', label: 'English' },
            { value: 'Spanish', label: 'Español' },
            { value: 'French', label: 'Français' },
            { value: 'German', label: 'Deutsch' },
            { value: 'Russian', label: 'Русский' },
          ]}
        />
        
        <SelectField
          label="Animation Speed"
          icon={<Zap className="w-4 h-4" />}
          value={settings.animationSpeed}
          onChange={(value) => updateSetting('animationSpeed', value)}
          options={[
            { value: 'slow', label: 'Slow' },
            { value: 'normal', label: 'Normal' },
            { value: 'fast', label: 'Fast' },
            { value: 'instant', label: 'Instant' },
          ]}
        />
        
        <div className="space-y-4">
          <ToggleField
            label="Show Coordinates"
            description="Display A-H and 1-8 coordinates on the board"
            checked={settings.showCoordinates}
            onChange={(checked) => updateSetting('showCoordinates', checked)}
          />
        </div>
      </div>
    </div>
  );
}

// Audio Settings Component
function AudioSettings({ settings, updateSetting }: { settings: SettingsState; updateSetting: (key: keyof SettingsState, value: unknown) => void }) {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        <Volume2 className="w-6 h-6 text-blue-400" />
        Audio Settings
      </h2>
      
      <div className="space-y-6">
        <ToggleField
          label="Sound Effects"
          description="Enable all game sound effects"
          checked={settings.soundEnabled}
          onChange={(checked) => updateSetting('soundEnabled', checked)}
        />
        
        {settings.soundEnabled && (
          <div className="ml-6 space-y-4 border-l-2 border-slate-600 pl-6">
            <ToggleField
              label="Move Sound"
              description="Play sound when pieces move"
              checked={settings.moveSound}
              onChange={(checked) => updateSetting('moveSound', checked)}
            />
            
            <ToggleField
              label="Capture Sound"
              description="Play sound when pieces are captured"
              checked={settings.captureSound}
              onChange={(checked) => updateSetting('captureSound', checked)}
            />
            
            <ToggleField
              label="Check Sound"
              description="Play sound when in check"
              checked={settings.checkSound}
              onChange={(checked) => updateSetting('checkSound', checked)}
            />
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">Volume</label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={settings.volume}
                  onChange={(e) => updateSetting('volume', parseInt(e.target.value))}
                  className="flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                />
                <span className="text-slate-300 font-medium min-w-[3rem]">{settings.volume}%</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Notification Settings Component
function NotificationSettings({ settings, updateSetting }: { settings: SettingsState; updateSetting: (key: keyof SettingsState, value: unknown) => void }) {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        <Bell className="w-6 h-6 text-blue-400" />
        Notification Settings
      </h2>
      
      <div className="space-y-6">
        <ToggleField
          label="Game Invites"
          description="Receive notifications for game invitations"
          checked={settings.gameInvites}
          onChange={(checked) => updateSetting('gameInvites', checked)}
        />
        
        <ToggleField
          label="Game Updates"
          description="Get notified about ongoing games"
          checked={settings.gameUpdates}
          onChange={(checked) => updateSetting('gameUpdates', checked)}
        />
        
        <ToggleField
          label="Friend Requests"
          description="Receive notifications for friend requests"
          checked={settings.friendRequests}
          onChange={(checked) => updateSetting('friendRequests', checked)}
        />
        
        <ToggleField
          label="Email Notifications"
          description="Send notifications to your email"
          checked={settings.emailNotifications}
          onChange={(checked) => updateSetting('emailNotifications', checked)}
        />
      </div>
    </div>
  );
}

// Privacy Settings Component
function PrivacySettings({ settings, updateSetting }: { settings: SettingsState; updateSetting: (key: keyof SettingsState, value: unknown) => void }) {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        <Shield className="w-6 h-6 text-blue-400" />
        Privacy Settings
      </h2>
      
      <div className="space-y-6">
        <SelectField
          label="Profile Visibility"
          icon={<Eye className="w-4 h-4" />}
          value={settings.profileVisibility}
          onChange={(value) => updateSetting('profileVisibility', value)}
          options={[
            { value: 'public', label: 'Public' },
            { value: 'friends', label: 'Friends Only' },
            { value: 'private', label: 'Private' },
          ]}
        />
        
        <ToggleField
          label="Show Online Status"
          description="Let others see when you're online"
          checked={settings.showOnlineStatus}
          onChange={(checked) => updateSetting('showOnlineStatus', checked)}
        />
        
        <ToggleField
          label="Allow Spectators"
          description="Let others watch your games"
          checked={settings.allowSpectators}
          onChange={(checked) => updateSetting('allowSpectators', checked)}
        />
      </div>
    </div>
  );
}

// Reusable Components
function InputField({ 
  label, 
  icon, 
  value, 
  onChange, 
  placeholder, 
  type = "text" 
}: { 
  label: string; 
  icon: React.ReactElement; 
  value: string; 
  onChange: (value: string) => void; 
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">{label}</label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
          {icon}
        </div>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
      </div>
    </div>
  );
}

function SelectField({ 
  label, 
  icon, 
  value, 
  onChange, 
  options 
}: { 
  label: string; 
  icon: React.ReactElement; 
  value: string; 
  onChange: (value: string) => void; 
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">{label}</label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
          {icon}
        </div>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronRight className="absolute right-3 top-1/2 transform -translate-y-1/2 rotate-90 text-slate-400 w-4 h-4 pointer-events-none" />
      </div>
    </div>
  );
}

function ToggleField({ 
  label, 
  description, 
  checked, 
  onChange 
}: { 
  label: string; 
  description: string; 
  checked: boolean; 
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex-1">
        <h3 className="text-white font-medium">{label}</h3>
        <p className="text-slate-400 text-sm">{description}</p>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`
          relative w-12 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800
          ${checked ? 'bg-blue-600' : 'bg-slate-600'}
        `}
      >
        <div
          className={`
            absolute w-5 h-5 bg-white rounded-full transition-transform duration-200 top-0.5
            ${checked ? 'translate-x-6' : 'translate-x-0.5'}
          `}
        >
          {checked && (
            <Check className="w-3 h-3 text-blue-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          )}
        </div>
      </button>
    </div>
  );
}