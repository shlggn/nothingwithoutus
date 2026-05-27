import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Lock, 
  LogOut, 
  FileText, 
  Handshake, 
  Loader2, 
  Calendar,
  Mail,
  User,
  Building2,
  MessageSquare,
  CheckCircle2
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { 
  getAllRecommendations, 
  getAllSponsorships,
  RecommendationDocument,
  SponsorshipDocument
} from "@/lib/firebaseService";
import { auth } from "@/lib/firebase";
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User as FirebaseUser
} from "firebase/auth";

type TabType = "recommendations" | "sponsorships";

const Admin = () => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<TabType>("recommendations");
  const [recommendations, setRecommendations] = useState<RecommendationDocument[]>([]);
  const [sponsorships, setSponsorships] = useState<SponsorshipDocument[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check authentication state on mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
      if (currentUser) {
        loadData();
      }
    });

    return () => unsubscribe();
  }, []);

  const loadData = async () => {
    setIsFetching(true);
    try {
      const [recs, spons] = await Promise.all([
        getAllRecommendations(),
        getAllSponsorships()
      ]);
      setRecommendations(recs);
      setSponsorships(spons);
    } catch (error) {
      console.error("Error loading data:", error);
      toast({
        title: "Error loading data",
        description: "Please check your Firebase configuration and try again.",
        variant: "destructive",
      });
    } finally {
      setIsFetching(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "Welcome back!",
        description: "You've successfully logged in to the admin panel.",
      });
    } catch (error: any) {
      console.error("Login error:", error);
      let errorMessage = "Invalid email or password.";
      
      if (error.code === "auth/invalid-credential") {
        errorMessage = "Invalid email or password. Please try again.";
      } else if (error.code === "auth/user-not-found") {
        errorMessage = "No account found with this email.";
      } else if (error.code === "auth/wrong-password") {
        errorMessage = "Incorrect password.";
      } else if (error.code === "auth/too-many-requests") {
        errorMessage = "Too many failed attempts. Please try again later.";
      }

      toast({
        title: "Authentication failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Logged out",
        description: "You've been successfully logged out.",
      });
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "N/A";
    try {
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "N/A";
    }
  };

  // Show loading while checking auth state
  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Login form
  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <div className="glass-strong rounded-3xl p-8 md:p-10">
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mx-auto mb-6">
              <Lock className="w-7 h-7 text-primary" />
            </div>
            
            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground text-center mb-2">
              Admin Access
            </h1>
            <p className="text-muted-foreground text-center mb-8">
              Enter your credentials to continue
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-muted border-2 border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 text-foreground transition-all"
                  placeholder="Enter your email"
                  required
                  autoComplete="email"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-muted border-2 border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 text-foreground transition-all"
                  placeholder="Enter password"
                  required
                  autoComplete="current-password"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/25 hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    Sign In
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Admin dashboard
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground">
                Manage form submissions and inquiries
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground bg-muted px-4 py-2 rounded-full hover:bg-muted/80 transition-all"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <FileText className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">Recommendations</h3>
              </div>
              <p className="text-3xl font-bold text-foreground">{recommendations.length}</p>
              <p className="text-sm text-muted-foreground mt-1">Total submissions</p>
            </div>

            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <Handshake className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">Sponsorships</h3>
              </div>
              <p className="text-3xl font-bold text-foreground">{sponsorships.length}</p>
              <p className="text-sm text-muted-foreground mt-1">Total inquiries</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="glass-strong rounded-3xl p-6 md:p-8">
            <div className="flex gap-2 border-b border-border/40 mb-6">
              <button
                onClick={() => setActiveTab("recommendations")}
                className={`inline-flex items-center gap-2 px-4 py-2 font-medium transition-all border-b-2 -mb-px ${
                  activeTab === "recommendations"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <FileText className="w-4 h-4" />
                Recommendations ({recommendations.length})
              </button>
              <button
                onClick={() => setActiveTab("sponsorships")}
                className={`inline-flex items-center gap-2 px-4 py-2 font-medium transition-all border-b-2 -mb-px ${
                  activeTab === "sponsorships"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Handshake className="w-4 h-4" />
                Sponsorships ({sponsorships.length})
              </button>
            </div>

            {isFetching ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : (
              <>
                {activeTab === "recommendations" && (
                  <RecommendationsTab 
                    recommendations={recommendations} 
                    formatDate={formatDate}
                  />
                )}
                {activeTab === "sponsorships" && (
                  <SponsorshipsTab 
                    sponsorships={sponsorships} 
                    formatDate={formatDate}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

// Recommendations tab component
const RecommendationsTab = ({ 
  recommendations, 
  formatDate 
}: { 
  recommendations: RecommendationDocument[];
  formatDate: (timestamp: any) => string;
}) => {
  if (recommendations.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
        <p className="text-muted-foreground">No recommendations submitted yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {recommendations.map((rec) => (
        <div key={rec.id} className="glass rounded-2xl p-6 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-lg text-foreground">
                  {rec.nomineeName}
                </h3>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  rec.status === "pending" 
                    ? "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400" 
                    : "bg-green-500/10 text-green-600 dark:text-green-400"
                }`}>
                  {rec.status}
                </span>
              </div>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(rec.submittedAt)}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground mb-1">Nominee Email</p>
              <p className="text-foreground flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {rec.nomineeEmail || "Not provided"}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Category</p>
              <p className="text-foreground">
                <CheckCircle2 className="w-4 h-4 inline mr-2" />
                {rec.category}
              </p>
            </div>
          </div>

          <div>
            <p className="text-muted-foreground mb-1 text-sm">Relationship</p>
            <p className="text-foreground">{rec.relationship}</p>
          </div>

          <div>
            <p className="text-muted-foreground mb-1 text-sm">Story</p>
            <p className="text-foreground leading-relaxed">{rec.story}</p>
          </div>

          <div className="border-t border-border/40 pt-4 space-y-2">
            <p className="text-sm font-medium text-foreground">Submitted by:</p>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground mb-1">Name</p>
                <p className="text-foreground flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {rec.yourName}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Email</p>
                <p className="text-foreground flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {rec.yourEmail}
                </p>
              </div>
              {rec.organization && (
                <div className="md:col-span-2">
                  <p className="text-muted-foreground mb-1">Organization</p>
                  <p className="text-foreground flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    {rec.organization}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Sponsorships tab component
const SponsorshipsTab = ({ 
  sponsorships, 
  formatDate 
}: { 
  sponsorships: SponsorshipDocument[];
  formatDate: (timestamp: any) => string;
}) => {
  if (sponsorships.length === 0) {
    return (
      <div className="text-center py-12">
        <Handshake className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
        <p className="text-muted-foreground">No sponsorship inquiries yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {sponsorships.map((sponsor) => (
        <div key={sponsor.id} className="glass rounded-2xl p-6 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-lg text-foreground">
                  {sponsor.organizationName}
                </h3>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  sponsor.status === "new" 
                    ? "bg-blue-500/10 text-blue-600 dark:text-blue-400" 
                    : "bg-green-500/10 text-green-600 dark:text-green-400"
                }`}>
                  {sponsor.status}
                </span>
              </div>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(sponsor.submittedAt)}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground mb-1">Contact Person</p>
              <p className="text-foreground flex items-center gap-2">
                <User className="w-4 h-4" />
                {sponsor.contactName}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Email</p>
              <p className="text-foreground flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {sponsor.email}
              </p>
            </div>
            {sponsor.phone && (
              <div>
                <p className="text-muted-foreground mb-1">Phone</p>
                <p className="text-foreground">{sponsor.phone}</p>
              </div>
            )}
            <div>
              <p className="text-muted-foreground mb-1">Sponsorship Level</p>
              <p className="text-foreground font-medium">{sponsor.sponsorshipLevel}</p>
            </div>
          </div>

          {sponsor.interests.length > 0 && (
            <div>
              <p className="text-muted-foreground mb-2 text-sm">Areas of Interest</p>
              <div className="flex flex-wrap gap-2">
                {sponsor.interests.map((interest, idx) => (
                  <span 
                    key={idx}
                    className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          )}

          {sponsor.message && (
            <div>
              <p className="text-muted-foreground mb-1 text-sm flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Message
              </p>
              <p className="text-foreground leading-relaxed">{sponsor.message}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Admin;
