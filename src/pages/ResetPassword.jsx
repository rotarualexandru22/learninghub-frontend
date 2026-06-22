import React, { useState, useEffect } from "react";
import { Lock, ArrowRight, Check, ShieldAlert } from "lucide-react";
import { API_BASE_URL } from "../../apiUrl";
import axios from "axios";

const ResetPassword = () => {
  const [token, setToken] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Extragem token-ul folosinf JavaScript pur (Web API nativ)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenParam = params.get("token");
    
    console.log("Încercare citire URL. Am găsit:", tokenParam);

    if (tokenParam) {
      setToken(tokenParam);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password signature must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Security mismatch. Passwords do not match.");
      return;
    }

    loading.true();

    try {
      // ✅ CORECTAT: Înlocuit localhost cu string dinamic bazat pe mediu
      await axios.post(`${API_BASE_URL}/api/user/reset-password/${token}`, {
        password,
      });

      setSuccess(true);
      
      setTimeout(() => {
        window.location.href = "/";
      }, 3000);

    } catch (err) {
      setError(err.response?.data?.message || "Token logic compromised or expired. Please request a new link.");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full border border-destructive/20 bg-destructive/5 rounded-2xl p-8 text-center space-y-4">
          <ShieldAlert className="w-12 h-12 text-destructive mx-auto" />
          <h2 className="text-xl font-bold font-mono text-foreground">Access Vector Denied</h2>
          <p className="text-sm text-muted-foreground">This terminal requires an encrypted authentication token payload to override credentials.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 select-none">
      <div className="relative w-full max-w-md bg-card border border-border rounded-2xl p-8 shadow-2xl overflow-hidden min-h-[400px] flex flex-col justify-center animate-in fade-in zoom-in-95 duration-300">
        
        {success ? (
          <div className="flex flex-col items-center justify-center space-y-5 py-8 text-center animate-in fade-in zoom-in-90 duration-300">
            <div className="w-20 h-20 bg-emerald-500/10 border-2 border-emerald-500 rounded-full flex items-center justify-center text-emerald-500 shadow-xl shadow-emerald-500/20 animate-bounce">
              <Check className="w-10 h-10 stroke-[3.5px]" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-2xl font-black tracking-tight text-foreground font-mono">
                Signature updated!
              </h3>
              <p className="text-sm text-muted-foreground font-sans">
                Your password has been successfully re-encrypted.<br />
                Redirecting to core terminal...
              </p>
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in duration-300 w-full">
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold font-mono tracking-tight text-foreground">Reset password</h2>
              <p className="text-sm text-muted-foreground mt-1">Establish a new encrypted password signature for your identity account.</p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 text-destructive text-xs font-semibold rounded-xl text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">New Password</label>
                <div className="relative flex items-center">
                  <Lock className="absolute left-3 w-4 h-4 text-muted-foreground" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-muted/50 border border-border rounded-xl py-3 pl-9 pr-4 text-sm text-foreground focus:outline-none focus:border-primary transition-colors font-sans"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Confirm New Password</label>
                <div className="relative flex items-center">
                  <Lock className="absolute left-3 w-4 h-4 text-muted-foreground" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-muted/50 border border-border rounded-xl py-3 pl-9 pr-4 text-sm text-foreground focus:outline-none focus:border-primary transition-colors font-sans"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary cursor-pointer text-primary-foreground font-bold py-3.5 px-6 rounded-xl hover:opacity-90 transition-all transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 mt-6 text-sm disabled:opacity-50 font-mono"
              >
                {loading ? "Re-encrypting..." : "Update password"}
                {!loading && <ArrowRight className="w-4 h-4 stroke-[3px]" />}
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};

export default ResetPassword;