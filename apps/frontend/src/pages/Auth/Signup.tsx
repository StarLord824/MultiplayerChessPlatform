import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft, Sparkles } from "lucide-react";
import { useNavigate } from "react-router";
import { authClient } from "../../lib/auth-client";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGoogleSignup = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard"
    })
  }
  const handleDiscordSignup = async () => {
    await authClient.signIn.social({
      provider: "discord",
      callbackURL: "/dashboard"
    })
  }
  const handleSubmit = async () => {
    setIsLoading(true);
    
    await authClient.signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.firstName+" "+formData.lastName,
        callbackURL: "/home"
      },{
        onError: (error) => {
          alert(`Error signing up: ${JSON.stringify(error)}`);
          // setIsLoading(false);
        },
        onSuccess: (user) => {
          console.log(user);
        },
        onRequest: () => {
          console.log("Requesting signup");
        }
      }
    )
    // Simulate API call
    // setTimeout(() => {
    //   setIsLoading(false);
    //   console.log("Signup attempt:", formData);
    // }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-emerald-500/3 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/3 rounded-full blur-3xl"></div>
          <div className="absolute top-32 right-32 text-8xl text-white/[0.02] select-none">♛</div>
          <div className="absolute bottom-32 left-32 text-6xl text-white/[0.02] select-none">♞</div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-16">
          <div className="space-y-8">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-white/90 rounded-full"></div>
              <h1 className="text-3xl font-light tracking-wide text-white/95">
                MyChess
              </h1>
            </div>

            {/* Headline */}
            <div className="space-y-6">
              <h2 className="text-5xl font-extralight text-white/95 leading-tight">
                Start Your<br />Journey
              </h2>
              <p className="text-xl text-white/60 font-light max-w-md leading-relaxed">
                Join thousands of chess players and begin mastering the art of strategy.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4 pt-8">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-emerald-400/60 rounded-full"></div>
                <span className="text-white/60 font-light">Play against players worldwide</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-emerald-400/60 rounded-full"></div>
                <span className="text-white/60 font-light">Track your progress & improve</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-emerald-400/60 rounded-full"></div>
                <span className="text-white/60 font-light">Join tournaments & competitions</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 lg:px-16 py-8">
        <div className="w-full max-w-md space-y-6">
          
          {/* Back Button - Mobile */}
          <div className="lg:hidden">
            <button className="flex items-center gap-2 text-white/60 hover:text-white/90 transition-colors duration-200">
              <ArrowLeft className="w-4 h-4" />
              <span className="font-light">Back</span>
            </button>
          </div>

          {/* Mobile Logo */}
          <div className="lg:hidden text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-2.5 h-2.5 bg-white/90 rounded-full"></div>
              <h1 className="text-2xl font-light tracking-wide text-white/95">
                MyChess
              </h1>
            </div>
            <h2 className="text-3xl font-extralight text-white/95">Join MyChess</h2>
          </div>

          {/* Form Header - Desktop */}
          <div className="hidden lg:block text-center space-y-2">
            <h3 className="text-2xl font-light text-white/95">Create Account</h3>
            <p className="text-white/60 font-light">Enter your details to get started</p>
          </div>

          {/* Signup Form */}
          <div className="space-y-5">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                {/* <label className="text-white/70 text-sm font-light">First Name</label> */}
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-4 bg-slate-900/30 backdrop-blur-sm border border-slate-800/50 rounded-full text-white/90 placeholder-white/40 font-light focus:outline-none focus:border-white/30 transition-colors duration-200"
                    placeholder="First name"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                {/* <label className="text-white/70 text-sm font-light">Last Name</label> */}
                <div className="relative">
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full pl-4 pr-4 py-4 bg-slate-900/30 backdrop-blur-sm border border-slate-800/50 rounded-full text-white/90 placeholder-white/40 font-light focus:outline-none focus:border-white/30 transition-colors duration-200"
                    placeholder="Last name"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              {/* <label className="text-white/70 text-sm font-light">Email Address</label> */}
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-4 bg-slate-900/30 backdrop-blur-sm border border-slate-800/50 rounded-full text-white/90 placeholder-white/40 font-light focus:outline-none focus:border-white/30 transition-colors duration-200"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              {/* <label className="text-white/70 text-sm font-light">Password</label> */}
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-12 py-4 bg-slate-900/30 backdrop-blur-sm border border-slate-800/50 rounded-full text-white/90 placeholder-white/40 font-light focus:outline-none focus:border-white/30 transition-colors duration-200"
                  placeholder="Create a password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors duration-200"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              {/* <label className="text-white/70 text-sm font-light">Confirm Password</label> */}
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-12 py-4 bg-slate-900/30 backdrop-blur-sm border border-slate-800/50 rounded-full text-white/90 placeholder-white/40 font-light focus:outline-none focus:border-white/30 transition-colors duration-200"
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors duration-200"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start gap-3 text-sm">
              <input
                type="checkbox"
                className="w-4 h-4 mt-0.5 rounded border border-slate-700 bg-slate-900/30 text-white focus:ring-0 focus:ring-offset-0"
                required
              />
              <p className="text-white/60 font-light leading-relaxed">
                I agree to the{" "}
                <button className="text-white hover:text-white/80 transition-colors duration-200">
                  Terms of Service
                </button>{" "}
                and{" "}
                <button className="text-white hover:text-white/80 transition-colors duration-200">
                  Privacy Policy
                </button>
              </p>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full py-4 bg-white text-slate-900 font-medium rounded-full hover:bg-white/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin"></div>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Create Account</span>
                </>
              )}
            </button>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800/50"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-slate-950 text-white/40 font-light">or continue with</span>
            </div>
          </div>

          {/* Social Signup */}
          <div className="grid grid-cols-2 gap-4">
            <button 
              className="py-3 px-4 border border-slate-800/50 rounded-full text-white/70 hover:text-white/90 hover:border-slate-700/50 transition-all duration-200 font-light"
              onClick={ handleGoogleSignup }
            >
              Google
            </button>
            <button 
              className="py-3 px-4 border border-slate-800/50 rounded-full text-white/70 hover:text-white/90 hover:border-slate-700/50 transition-all duration-200 font-light"
              onClick={ handleDiscordSignup }
            >
              GitHub
            </button>
          </div>

          {/* Sign In Link */}
          <div className="text-center pt-4">
            <p className="text-white/60 font-light">
              Already have an account?{" "}
              <button className="text-white hover:text-white/80 font-normal transition-colors duration-200"
                onClick={() => navigate("/signin")}
              >
                Sign in
              </button>
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center gap-6 pt-6 text-white/30 text-xs font-light">
            <div className="flex items-center gap-1">
              <div className="w-1 h-1 bg-white/30 rounded-full"></div>
              <span>Secure Registration</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-1 h-1 bg-white/30 rounded-full"></div>
              <span>Data Protected</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}