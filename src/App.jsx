import React, { useState, useEffect, useRef } from 'react';
import { 
  Briefcase, 
  FileText, 
  TrendingUp, 
  CheckCircle, 
  Star, 
  Menu, 
  X, 
  ArrowRight, 
  Users, 
  Globe, 
  Award,
  ChevronRight,
  Target,
  Clock,
  Shield,
  Zap,
  Crown,
  Layout,
  FileCheck,
  Send,
  HelpCircle,
  Plus,
  Minus,
  MessageSquare,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Check,
  LogOut,
  User,
  Instagram,
  Plane,
  Cpu,
  UserCheck,
  Rocket,
  Calendar,
  BookOpen,
  ArrowLeft,
  FileWarning,
  Lock,
  RefreshCcw,
  Ban
} from 'lucide-react';

// --- Firebase Imports ---
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged,
  signInWithCustomToken,
  signInAnonymously
} from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

/**
 * ==================================================================================
 * ASSET CONFIGURATION (CDN LINKS)
 * ==================================================================================
 */
const ASSETS = {
  // Hero Section
  heroImage: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?q=80&w=2574&auto=format&fit=crop",
  
  // About Section
  aboutImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",

  // Founders
  founder1_Manasa: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=400&h=400&q=80",
  founder2_Vamshi: "https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=400&h=400&q=80",

  // Testimonials
  review1_Img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  review2_Img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  review3_Img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  review4_Img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  review5_Img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  review6_Img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",

  // Blog Images
  blog_Featured: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2670&auto=format&fit=crop",
  blog_1: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2672&auto=format&fit=crop",
  blog_2: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2670&auto=format&fit=crop",
  blog_3: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2669&auto=format&fit=crop",

  // Company Logos
  logo_Google: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  logo_Netflix: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
  logo_Salesforce: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg",
  logo_Airbnb: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg",
  logo_Spotify: "https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg",
  logo_Microsoft: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
  logo_Meta: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg",
  logo_Adobe: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Adobe_Corporate_Logo.svg",
  logo_Samsung: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg"
};

const COMPANY_LOGOS = {
  Google: ASSETS.logo_Google,
  Netflix: ASSETS.logo_Netflix,
  Salesforce: ASSETS.logo_Salesforce,
  Airbnb: ASSETS.logo_Airbnb,
  Spotify: ASSETS.logo_Spotify,
  Microsoft: ASSETS.logo_Microsoft,
  Meta: ASSETS.logo_Meta,
  Adobe: ASSETS.logo_Adobe,
  Samsung: ASSETS.logo_Samsung
};

const BLOG_DATA = [
  {
    id: 'wall-street-guide',
    image: ASSETS.blog_Featured,
    category: "Job Search Advice",
    title: "How to Get a Job or Internship on Wall Street",
    excerpt: "Landing a job on Wall Street is hard. This in-depth guide shows you exactly how to build your technical experience, network, and interview skills to land your next big offer in finance.",
    author: "Michael Yan",
    date: "12 Jun 2024",
    readTime: "12 min read",
    featured: true,
    content: (
      <>
        <p className="mb-6 text-lg text-slate-700 font-medium">Landing a job on Wall Street is one of the most competitive challenges for young professionals. Whether you are aiming for investment banking, sales and trading, or equity research, the process requires rigorous preparation, strategic networking, and a flawless resume.</p>
        <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">1. Master the Technicals</h3>
        <p className="mb-4 text-slate-700">You cannot fake your way through a finance interview. You need to understand accounting, valuation (DCF, Comps, Precedent Transactions), and LBOs inside out. Resources like "Investment Banking" by Rosenbaum & Pearl are essential reading.</p>
        <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">2. The Power of Networking</h3>
        <p className="mb-4 text-slate-700">Applying online is rarely enough. Wall Street runs on referrals. Start cold emailing alumni from your university who are currently working at the firms you are interested in.</p>
      </>
    )
  },
  {
    id: 'ats-resume',
    image: ASSETS.blog_1,
    category: "Resume Advice",
    title: "How to Write an ATS Resume (2025 Updated)",
    excerpt: "Don't let an ATS get between you and your dream job. Read along to learn how to write an ATS resume that gets you past this system.",
    author: "Kevin Shim",
    date: "22 Aug 2025",
    readTime: "5 min read",
    featured: false,
    content: <p>Full article content regarding ATS optimization...</p>
  },
  {
    id: 'chatgpt-interview',
    image: ASSETS.blog_2,
    category: "Interview Advice",
    title: "25+ Job Interview Preparation Prompts for ChatGPT",
    excerpt: "Prepare for your job interview effectively with these 25+ prompts for ChatGPT.",
    author: "Leila Le",
    date: "4 Nov 2023",
    readTime: "4 min read",
    featured: false,
    content: <p>Full article content regarding ChatGPT prompts...</p>
  },
  {
    id: 'internship-strong',
    image: ASSETS.blog_3,
    category: "Internship Advice",
    title: "How To Finish Your Internship Strong",
    excerpt: "Ending your internship soon? Here are some key tips to end off strong and maximize your chances of getting a return offer!",
    author: "Riya Cyriac",
    date: "10 Aug 2022",
    readTime: "5 min read",
    featured: false,
    content: <p>Full article content regarding internships...</p>
  }
];

// --- Components ---

const Button = ({ children, variant = 'primary', className = '', onClick }) => {
  const baseStyle = "px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2 text-sm md:text-base";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-900/20",
    secondary: "bg-slate-800 text-white hover:bg-slate-700 border border-slate-700",
    outline: "bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
    gold: "bg-amber-500 text-slate-900 hover:bg-amber-400 shadow-lg shadow-amber-900/20"
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

const SectionHeading = ({ title, subtitle, center = true, light = false }) => (
  <div className={`mb-12 ${center ? 'text-center' : 'text-left'}`}>
    <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${light ? 'text-white' : 'text-slate-900'}`}>{title}</h2>
    <div className={`h-1 w-20 bg-blue-600 mb-6 ${center ? 'mx-auto' : ''}`}></div>
    <p className={`text-lg max-w-2xl mx-auto ${light ? 'text-slate-300' : 'text-slate-600'}`}>{subtitle}</p>
  </div>
);

// --- Auth Modal Component ---
const AuthModal = ({ isOpen, onClose, onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    setError('');
    try {
      await onLogin();
      onClose();
    } catch (err) {
      console.error("Auth Error:", err);
      if (err.code === 'auth/popup-closed-by-user') {
        setError('Sign-in cancelled.');
      } else {
        setError('Unable to sign in. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in-up">
        <div className="bg-slate-50 p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-xl font-bold text-slate-900">
            {isSignUp ? 'Create your Account' : 'Welcome Back'}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={24} />
          </button>
        </div>
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Rocket size={32} className="text-blue-600" />
            </div>
            <p className="text-slate-600">
              {isSignUp 
                ? 'Join thousands of professionals landing their dream jobs.' 
                : 'Login to access your dashboard and daily reports.'}
            </p>
          </div>
          {error && <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center">{error}</div>}
          <button 
            onClick={handleGoogleAuth}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 bg-white border-2 border-slate-200 hover:border-blue-600 hover:bg-blue-50 text-slate-700 font-bold py-3 rounded-xl transition-all duration-300 group"
          >
            {isLoading ? <span className="animate-pulse">Connecting...</span> : <><span className="group-hover:text-blue-700">Continue with Google</span></>}
          </button>
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-500">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <button onClick={() => { setIsSignUp(!isSignUp); setError(''); }} className="text-blue-600 font-bold hover:underline">
                {isSignUp ? "Log In" : "Sign Up"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Legal Page Component ---
const LegalPage = ({ isOpen, onClose, type }) => {
  if (!isOpen) return null;

  const contentMap = {
    terms: {
      title: "Terms of Service",
      icon: FileText,
      body: (
        <>
          <p>Welcome to JobSurely. By accessing our website and using our services, you agree to be bound by the following terms and conditions.</p>
          <h3 className="text-xl font-bold text-slate-800 mt-6 mb-2">1. Service Description</h3>
          <p>JobSurely provides career advancement services, including resume optimization and job application management.</p>
          <h3 className="text-xl font-bold text-slate-800 mt-6 mb-2">2. User Responsibilities</h3>
          <p>You agree to provide accurate and up-to-date information regarding your career history.</p>
          <h3 className="text-xl font-bold text-slate-800 mt-6 mb-2">3. Limitation of Liability</h3>
          <p>JobSurely does not guarantee job interviews or offers. Hiring decisions are made solely by third-party employers.</p>
        </>
      )
    },
    privacy: {
      title: "Privacy Policy",
      icon: Lock,
      body: (
        <>
          <p>Your privacy is important to us. This policy outlines how we collect, use, and protect your personal information.</p>
          <h3 className="text-xl font-bold text-slate-800 mt-6 mb-2">1. Information Collection</h3>
          <p>We collect personal data necessary for our services, including resume content and LinkedIn profile data.</p>
          <h3 className="text-xl font-bold text-slate-800 mt-6 mb-2">2. Data Usage</h3>
          <p>Your data is shared only with potential employers via job applications.</p>
        </>
      )
    },
    refund: {
      title: "Refund Policy",
      icon: RefreshCcw,
      body: (
        <>
          <p className="font-medium text-slate-800">At JobSurely, we commit significant resources to your job search immediately upon subscription.</p>
          <h3 className="text-xl font-bold text-slate-800 mt-6 mb-2">1. Strict No Refund Policy</h3>
          <p>All sales are final. We do <strong>not</strong> offer refunds for monthly or quarterly subscriptions.</p>
        </>
      )
    },
    cancellation: {
      title: "Cancellation Policy",
      icon: Ban,
      body: (
        <>
          <p>You remain in full control of your subscription and can cancel at any time.</p>
          <h3 className="text-xl font-bold text-slate-800 mt-6 mb-2">1. How to Cancel</h3>
          <p>You can cancel your subscription directly through your user dashboard.</p>
          <h3 className="text-xl font-bold text-slate-800 mt-6 mb-2">2. Effect of Cancellation</h3>
          <p>Cancellation stops <strong>future</strong> auto-renewals. It does <strong>not</strong> trigger an immediate termination.</p>
        </>
      )
    }
  };

  const currentPolicy = contentMap[type] || contentMap.terms;
  const Icon = currentPolicy.icon || FileText;

  return (
    <div className="fixed inset-0 z-[120] bg-white overflow-y-auto animate-fade-in-up">
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
            <Rocket size={24} className="text-blue-600" />
            <span className="text-xl font-bold text-slate-900">Job<span className="text-blue-600">Surely</span> Legal</span>
        </div>
        <button onClick={onClose} className="flex items-center gap-2 text-slate-600 hover:text-blue-600 font-medium px-4 py-2 hover:bg-slate-50 rounded-lg transition-colors">
            <ArrowLeft size={18} /> Back to Home
        </button>
      </div>
      <div className="container mx-auto px-6 max-w-4xl py-16">
        <div className="flex items-center gap-4 mb-8">
           <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
              <Icon size={32} />
           </div>
           <h1 className="text-3xl md:text-4xl font-bold text-slate-900">{currentPolicy.title}</h1>
        </div>
        <div className="prose prose-lg prose-slate max-w-none text-slate-600 leading-relaxed bg-slate-50 p-8 md:p-12 rounded-2xl border border-slate-100">
           {currentPolicy.body}
        </div>
        <div className="mt-12 pt-8 border-t border-slate-200 text-center text-slate-500 text-sm">
           <p>Last updated: December 2024</p>
           <p>Questions? Contact us at <a href="mailto:support@jobsurely.com" className="text-blue-600 hover:underline">support@jobsurely.com</a></p>
        </div>
      </div>
    </div>
  );
};

// --- Blog Overlay Component ---
const BlogOverlay = ({ isOpen, onClose }) => {
  const [selectedPost, setSelectedPost] = useState(null);

  if (!isOpen) return null;

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const handleBackToGrid = () => {
    setSelectedPost(null);
  };

  if (selectedPost) {
    return (
      <div className="fixed inset-0 z-[130] bg-white overflow-y-auto animate-fade-in-up">
         <div className="max-w-4xl mx-auto px-6 py-12">
            <button onClick={handleBackToGrid} className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold mb-8 transition-colors">
               <ArrowLeft size={20} /> Back to Articles
            </button>
            <div className="mb-8">
               <div className="flex items-center gap-2 text-sm text-blue-600 font-bold uppercase tracking-wider mb-3">
                  {selectedPost.category}
               </div>
               <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
                  {selectedPost.title}
               </h1>
               <div className="flex items-center gap-4 text-slate-500 text-sm">
                  <span className="font-medium text-slate-900">{selectedPost.author}</span>
                  <span>•</span>
                  <span>{selectedPost.date}</span>
                  <span>•</span>
                  <span>{selectedPost.readTime}</span>
               </div>
            </div>
            <div className="rounded-2xl overflow-hidden mb-12 shadow-xl">
               <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-auto object-cover max-h-[500px]" />
            </div>
            <article className="prose prose-lg prose-slate max-w-none text-slate-700">
               {selectedPost.content}
            </article>
            <div className="mt-16 pt-8 border-t border-slate-200 text-center">
               <h4 className="text-2xl font-bold text-slate-900 mb-4">Ready to put this advice into action?</h4>
               <Button onClick={onClose}>Get Started Now</Button>
            </div>
         </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[120] bg-white overflow-y-auto animate-fade-in-up">
      {/* Blog Header */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
            <Rocket size={24} className="text-blue-600" />
            <span className="text-xl font-bold text-slate-900">Job<span className="text-blue-600">Surely</span> Blog</span>
        </div>
        <button onClick={onClose} className="flex items-center gap-2 text-slate-600 hover:text-blue-600 font-medium px-4 py-2 hover:bg-slate-50 rounded-lg transition-colors">
            <X size={20} /> Close
        </button>
      </div>

      <div className="container mx-auto px-6 max-w-6xl py-12">
        <SectionHeading 
          title="Career Insights" 
          subtitle="Expert advice, tips, and strategies to help you land your dream job."
          center={true}
        />

        {/* Featured Post */}
        <div className="mb-12 cursor-pointer" onClick={() => handlePostClick(BLOG_DATA[0])}>
          <div className="group relative bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300 grid md:grid-cols-2">
             <div className="relative h-64 md:h-auto overflow-hidden">
                <img 
                  src={BLOG_DATA[0].image} 
                  alt="Featured Blog" 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                />
             </div>
             <div className="p-8 flex flex-col justify-center">
                <span className="text-blue-600 font-bold text-xs uppercase tracking-wider mb-2">Featured Article</span>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {BLOG_DATA[0].title}
                </h3>
                <p className="text-slate-600 mb-6 line-clamp-3">
                   {BLOG_DATA[0].excerpt}
                </p>
                <div className="flex items-center gap-4 mt-auto">
                   <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">MY</div>
                      <span className="text-sm font-medium text-slate-900">{BLOG_DATA[0].author}</span>
                   </div>
                   <span className="text-slate-300">•</span>
                   <span className="text-xs text-slate-500">{BLOG_DATA[0].readTime}</span>
                </div>
             </div>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
           {BLOG_DATA.slice(1).map((blog) => (
             <div key={blog.id} onClick={() => handlePostClick(blog)} className="group bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full cursor-pointer">
                <div className="relative h-48 overflow-hidden">
                   <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-blue-600 shadow-sm">
                      {blog.category}
                   </div>
                   <img 
                     src={blog.image} 
                     alt={blog.title} 
                     className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                   />
                </div>
                <div className="p-6 flex flex-col flex-1">
                   <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                     {blog.title}
                   </h3>
                   <p className="text-slate-600 text-sm mb-4 line-clamp-3 flex-1">
                     {blog.excerpt}
                   </p>
                   <div className="flex items-center justify-between pt-4 border-t border-slate-50 mt-auto">
                      <div className="flex items-center gap-2">
                         <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">
                            {blog.author.split(' ').map(n=>n[0]).join('')}
                         </div>
                         <span className="text-xs font-medium text-slate-700">{blog.author}</span>
                      </div>
                      <span className="text-xs text-slate-400">{blog.readTime}</span>
                   </div>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

// --- About & Founders Overlay ---
const AboutOverlay = ({ isOpen, onClose, initialScrollId }) => {
  useEffect(() => {
    if (isOpen && initialScrollId) {
      const element = document.getElementById(initialScrollId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100); 
      }
    }
  }, [isOpen, initialScrollId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] bg-white overflow-y-auto animate-fade-in-up">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
            <Rocket size={24} className="text-blue-600" />
            <span className="text-xl font-bold text-slate-900">About Job<span className="text-blue-600">Surely</span></span>
        </div>
        <button onClick={onClose} className="flex items-center gap-2 text-slate-600 hover:text-blue-600 font-medium px-4 py-2 hover:bg-slate-50 rounded-lg transition-colors">
            <X size={20} /> Close
        </button>
      </div>

      <div className="container mx-auto px-6 max-w-6xl py-12">
        
        {/* Origin Story */}
        <div className="max-w-4xl mx-auto mb-16 text-center md:text-left">
           <span className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-2 block">Our Story</span>
           <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-8 leading-tight">It started with a frustration.</h2>
           
           <div className="prose prose-lg text-slate-600 leading-relaxed mx-auto md:mx-0">
             <p className="mb-6">
               It was 2 AM on a Tuesday. <strong>Manasa</strong> was exhausted. Despite being unemployed, she was working harder than ever—not on a job, but on <em>getting</em> one.
             </p>
             <p className="mb-6">
               Every single application required a different version of her resume to beat the ATS. Modify. Export. Upload. Repeat. It was a hectic, soul-crushing loop that left no time to actually prepare for the interviews she was fighting to get.
             </p>
             <p className="mb-6">
               She thought, <em>"I wish there was a tool that would just do this for me. A service that applies on my behalf, tailoring my resume for every single JD, so I can just focus on the interview."</em>
             </p>
             <p className="mb-8">
               That frustration sparked an idea. Manasa, now our <strong>Lead Developer</strong>, joined forces with her friend and <strong>Business Strategist</strong>, <strong>Vamshikrishna Kalluri</strong>. Together, they built <strong>JobSurely</strong> to end the repetitive grind of job applications forever.
             </p>
             <p className="font-medium text-slate-900 text-xl border-l-4 border-blue-600 pl-6 italic">
               "Now, instead of modifying resumes all day, you can focus on preparing for your future."
             </p>
           </div>
        </div>

        {/* Privacy Note */}
        <div id="privacy-note" className="max-w-4xl mx-auto mb-20 bg-slate-50 rounded-2xl p-8 md:p-12 border border-slate-100">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">A Note on Privacy</h3>
            <div className="prose prose-lg text-slate-600 leading-relaxed">
                <p className="mb-4">
                    At our core, we're internet users and human beings. We place a heavy emphasis on privacy, and believe that our users deserve transparency regarding how their information is used.
                </p>
                <p className="mb-4">
                    Our goal at JobSurely is to get you hired. We know that by creating a truly phenomenal candidate experience, we facilitate more hires. This keeps our incentives aligned with getting our users hired - the same mission we started this company to pursue.
                </p>
                <p className="mb-4">
                    We use your data to create tailored resumes, optimize your applications, and submit them to interested employers on your behalf. <strong>We don't sell your personal data to third-party advertisers.</strong>
                </p>
                <p className="mb-8">
                    At the end of the day, we will be upfront and transparent with the data we collect and how we use it to help you land your dream job - and we'll let you decide if you're cool with that.
                </p>
                <p className="font-bold text-slate-900 text-xl mb-8">
                    Let's make recruiting better for everyone.
                </p>
                
                {/* Highlighted Founders Sign-off */}
                <div className="flex flex-col sm:flex-row gap-8 pt-8 border-t-2 border-slate-200 mt-8">
                    <div className="flex-1">
                        <p className="font-extrabold text-slate-900 text-xl mb-1 font-serif">Manasa Nalla</p>
                        <p className="text-blue-600 font-bold text-xs uppercase tracking-widest">Founder & Lead Developer</p>
                    </div>
                    <div className="flex-1">
                        <p className="font-extrabold text-slate-900 text-xl mb-1 font-serif">Vamshikrishna Kalluri</p>
                        <p className="text-blue-600 font-bold text-xs uppercase tracking-widest">Founder & Business Strategist</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

// --- Company Marquee Component ---
const CompanyMarquee = () => {
  return (
    <div className="w-full py-6 md:py-10 bg-white border-b border-slate-100">
      <p className="text-center text-slate-400 text-xs md:text-sm font-semibold uppercase tracking-wider mb-6 md:mb-8 px-4">
        Our Tailored Resumes Pass ATS Filters At
      </p>
      <div className="relative w-full max-w-6xl mx-auto overflow-hidden">
        {/* Responsive Gradient Masks */}
        <div className="absolute top-0 left-0 h-full w-12 md:w-24 lg:w-48 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 h-full w-12 md:w-24 lg:w-48 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
        
        {/* Scrolling Track with Responsive Gaps */}
        <div className="flex gap-8 md:gap-16 lg:gap-24 items-center animate-scroll whitespace-nowrap">
          {[
            // USING THE GLOBAL COMPANY_LOGOS defined earlier to ensure correctness
            ...Object.entries(COMPANY_LOGOS), 
            ...Object.entries(COMPANY_LOGOS), 
            ...Object.entries(COMPANY_LOGOS), 
            ...Object.entries(COMPANY_LOGOS)
          ].map(([name, url], index) => (
            <img 
              key={`${name}-${index}`} 
              src={url} 
              alt={name} 
              className="h-6 md:h-8 lg:h-12 w-auto object-contain flex-shrink-0 transition-transform duration-300 hover:scale-110" 
            />
          ))}
        </div>
      </div>
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 60s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
        @media (max-width: 768px) {
          .animate-scroll {
            animation-duration: 40s; 
          }
        }
      `}</style>
    </div>
  );
};

// --- FAQ Item Component ---
const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className={`bg-white rounded-2xl border transition-all duration-300 ${isOpen ? 'shadow-lg ring-1 ring-blue-100 border-blue-100' : 'shadow-sm hover:shadow-md border-slate-200'}`}>
      <button 
        className="w-full flex justify-between items-center p-6 text-left focus:outline-none group"
        onClick={onClick}
      >
        <span className={`text-base md:text-lg font-bold transition-colors duration-300 ${isOpen ? 'text-blue-600' : 'text-slate-800 group-hover:text-blue-600'}`}>
          {question}
        </span>
        <div className={`ml-4 flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full border transition-all duration-300 ${isOpen ? 'bg-blue-600 border-blue-600 text-white rotate-180' : 'bg-slate-50 border-slate-200 text-slate-400 group-hover:border-blue-600 group-hover:text-blue-600'}`}>
           {isOpen ? <Minus size={18} /> : <Plus size={18} />}
        </div>
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out px-6 ${isOpen ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-slate-600 leading-relaxed pt-2 border-t border-slate-50 text-sm md:text-base">
          {answer}
        </p>
      </div>
    </div>
  );
};

// --- Founders Section ---
const FoundersSection = ({ id = "founders", className = "py-16 md:py-24 bg-white border-t border-slate-100 relative overflow-hidden" }) => {
  return (
    <section id={id} className={className}>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
         <div className="absolute top-1/4 -left-64 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30"></div>
         <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-amber-100 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeading 
          title="Meet Our Founders" 
          subtitle="The visionaries building the future of career advancement."
          center={true}
        />
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* Founder 1 - Manasa */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-b from-blue-500 to-cyan-400 rounded-[2rem] opacity-5 group-hover:opacity-40 blur-xl transition duration-500"></div>
            <div className="relative bg-white rounded-[1.8rem] p-6 h-full flex flex-col items-center text-center shadow-xl border border-slate-50 transition-transform duration-500 group-hover:-translate-y-1 overflow-hidden">
                {/* Decorative Top */}
                <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-blue-50 to-transparent opacity-50"></div>

                {/* Image Area */}
                <div className="relative mb-4 mt-1">
                    <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-blue-600 to-cyan-400 shadow-lg group-hover:rotate-3 transition-transform duration-500 opacity-90">
                        <div className="w-full h-full rounded-full border-4 border-white overflow-hidden bg-slate-100">
                            <img 
                              src={ASSETS.founder1_Manasa} 
                              alt="Manasa Nalla" 
                              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                            />
                        </div>
                    </div>
                    {/* Floating Icon */}
                    <div className="absolute bottom-0 right-0 bg-slate-900 text-white p-2.5 rounded-full border-4 border-white shadow-lg">
                        <Briefcase size={16} />
                    </div>
                </div>
                
                {/* Content */}
                <h3 className="text-2xl font-bold text-slate-900 mb-1">Manasa Nalla</h3>
                <p className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 mb-4 uppercase tracking-widest">Founder & Lead Developer</p>
                <p className="text-slate-600 leading-relaxed mb-6 italic relative z-10 max-w-sm text-sm">
                    "Architecting the AI engines that power our resume tailoring technology. Passionate about leveraging code to solve complex career challenges."
                </p>
                
                {/* Socials */}
                <div className="mt-auto flex gap-5">
                    <a 
                      href="https://www.linkedin.com/in/manasanalla123/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-blue-600 hover:text-blue-700 transition-transform duration-300 hover:-translate-y-1"
                    >
                      <Linkedin size={28} />
                    </a>
                    <a 
                      href="https://www.instagram.com/itsmemanasa.n?igsh=MXd1NDBhcjd5aXI2Zw==" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-pink-600 hover:text-pink-700 transition-transform duration-300 hover:-translate-y-1"
                    >
                      <Instagram size={28} />
                    </a>
                </div>
            </div>
          </div>

          {/* Founder 2 - Vamshikrishna */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-b from-amber-500 to-orange-500 rounded-[2rem] opacity-5 group-hover:opacity-40 blur-xl transition duration-500"></div>
            <div className="relative bg-white rounded-[1.8rem] p-6 h-full flex flex-col items-center text-center shadow-xl border border-slate-50 transition-transform duration-500 group-hover:-translate-y-1 overflow-hidden">
                {/* Decorative Top */}
                <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-amber-50 to-transparent opacity-50"></div>

                {/* Image Area */}
                <div className="relative mb-4 mt-1">
                    <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-amber-500 to-orange-500 shadow-lg group-hover:rotate-3 transition-transform duration-500 opacity-90">
                        <div className="w-full h-full rounded-full border-4 border-white overflow-hidden bg-slate-100">
                            <img 
                              src={ASSETS.founder2_Vamshi} 
                              alt="Vamshikrishna Kalluri" 
                              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                            />
                        </div>
                    </div>
                    {/* Floating Icon */}
                    <div className="absolute bottom-0 right-0 bg-slate-900 text-white p-2.5 rounded-full border-4 border-white shadow-lg">
                        <TrendingUp size={16} />
                    </div>
                </div>
                
                {/* Content */}
                <h3 className="text-2xl font-bold text-slate-900 mb-1">Vamshikrishna Kalluri</h3>
                <p className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600 mb-4 uppercase tracking-widest">Founder & Business Strategist</p>
                <p className="text-slate-600 leading-relaxed mb-6 italic relative z-10 max-w-sm text-sm">
                    "Driving the strategic vision and partnerships that connect our clients with top-tier opportunities. Expert in market analysis and growth."
                </p>
                
                {/* Socials */}
                <div className="mt-auto flex gap-5">
                    <a 
                      href="https://www.linkedin.com/in/vamshikrishna-kalluri/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 transition-transform duration-300 hover:-translate-y-1"
                    >
                      <Linkedin size={28} />
                    </a>
                    <a 
                      href="https://www.instagram.com/vamshikrishna_kalluri?igsh=aHdyOWlienl0N2M5" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-pink-600 hover:text-pink-700 transition-transform duration-300 hover:-translate-y-1"
                    >
                      <Instagram size={28} />
                    </a>
                </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

// --- Contact Section Component ---
const ContactSection = ({ onOpenLegal }) => {
  return (
    <section id="contact" className="py-20 bg-slate-50">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
          
          {/* Left Panel: Contact Info */}
          <div className="lg:w-5/12 bg-slate-900 p-8 md:p-12 text-white flex flex-col justify-between relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-3xl opacity-20 -mr-16 -mt-16 pointer-events-none"></div>
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500 rounded-full blur-3xl opacity-10 -ml-16 -mb-16 pointer-events-none"></div>

             <div className="relative z-10">
               <h3 className="text-2xl md:text-3xl font-bold mb-4">Get in Touch</h3>
               <p className="text-slate-300 mb-8 leading-relaxed text-sm md:text-base">
                 Ready to accelerate your career? Fill out the form or contact our dedicated executive support team directly.
               </p>
               
               <div className="space-y-8">
                 {/* Email */}
                 <div className="flex items-start gap-4">
                   <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 border border-white/10 transition-colors hover:bg-blue-600">
                     <Mail size={24} className="text-blue-400" />
                   </div>
                   <div>
                     <p className="text-sm text-slate-400 font-bold uppercase tracking-wider mb-1">Email Support</p>
                     <p className="text-lg md:text-xl font-semibold break-all">support@jobsurely.com</p>
                     <p className="text-xs text-slate-400 mt-1">Average response time: 2 hours</p>
                   </div>
                 </div>

                 {/* Hours */}
                 <div className="flex items-start gap-4">
                   <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 border border-white/10">
                     <Clock size={24} className="text-blue-400" />
                   </div>
                   <div>
                     <p className="text-sm text-slate-400 font-bold uppercase tracking-wider mb-1">Working Hours</p>
                     <p className="text-lg md:text-xl font-semibold">Mon - Fri, 9AM - 6PM EST</p>
                     <p className="text-xs text-slate-400 mt-1">Dedicated human support agents</p>
                   </div>
                 </div>

                 {/* Security */}
                 <div className="flex items-start gap-4">
                   <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 border border-white/10">
                     <Shield size={24} className="text-green-400" />
                   </div>
                   <div>
                     <p className="text-sm text-slate-400 font-bold uppercase tracking-wider mb-1">Data Privacy</p>
                     <p className="text-lg md:text-xl font-semibold">100% Secure & Confidential</p>
                     <p className="text-xs text-slate-400 mt-1">We value your privacy above all.</p>
                   </div>
                 </div>
               </div>
             </div>

             <div className="relative z-10 mt-12 hidden lg:block">
               <div className="h-1 w-20 bg-blue-500"></div>
             </div>
          </div>

          {/* Right Panel: Form */}
          <div className="lg:w-7/12 p-8 md:p-12 lg:p-16 bg-white">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Send us a Message</h3>
            <form className="grid md:grid-cols-2 gap-6" onSubmit={(e) => e.preventDefault()}>
              
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                <input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-colors" placeholder="John Doe" />
              </div>

              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                <input type="email" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-colors" placeholder="john@company.com" />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2">What is your biggest job search hurdle?</label>
                <select className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-colors bg-white">
                  <option>Getting past ATS filters</option>
                  <option>Lack of time to apply</option>
                  <option>Salary negotiation</option>
                  <option>Transitioning industries</option>
                  <option>Getting interviews for senior roles</option>
                </select>
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2">Message</label>
                <textarea rows="4" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-colors" placeholder="Tell us about your target role and requirements..."></textarea>
              </div>

              <div className="col-span-2">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative flex items-center mt-0.5">
                    <input type="checkbox" className="peer sr-only" required />
                    <div className="w-5 h-5 border-2 border-slate-300 rounded peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-all"></div>
                    <Check size={14} className="absolute text-white opacity-0 peer-checked:opacity-100 top-[3px] left-[3px] transition-all" />
                  </div>
                  <span className="text-sm text-slate-600">
                    I agree to the{' '}
                    <button 
                      type="button" 
                      onClick={(e) => { e.preventDefault(); onOpenLegal('privacy'); }} 
                      className="text-blue-600 hover:underline font-medium"
                    >
                      Privacy Policy
                    </button>
                    {' '}and{' '}
                    <button 
                      type="button" 
                      onClick={(e) => { e.preventDefault(); onOpenLegal('terms'); }} 
                      className="text-blue-600 hover:underline font-medium"
                    >
                      Terms of Service
                    </button>.
                  </span>
                </label>
              </div>

              <div className="col-span-2 mt-2 flex flex-col items-center">
                <Button variant="primary" className="w-auto px-12 text-lg py-4">
                  Get Your Free Career Analysis
                </Button>
                <p className="text-xs text-slate-500 mt-4">
                  Your data is 100% secure. We never spam.
                </p>
              </div>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

// --- Main App Component ---

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('autopilot'); 
  const [billingCycle, setBillingCycle] = useState('monthly'); 
  const [openFAQ, setOpenFAQ] = useState(0); 
  
  // Auth State
  const [user, setUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  // Legal & Blog & About Modal State
  const [showLegalPage, setShowLegalPage] = useState(false);
  const [legalPageType, setLegalPageType] = useState('terms');
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [aboutScrollId, setAboutScrollId] = useState(null);

  const firebaseConfig = JSON.parse(__firebase_config);
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
  
  const openLegal = (type) => {
    setLegalPageType(type);
    setShowLegalPage(true);
  };
  
  const openAbout = (scrollId = null) => {
    setAboutScrollId(scrollId);
    setShowAboutModal(true);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const initAuth = async () => {
      if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
        await signInWithCustomToken(auth, __initial_auth_token);
      } else {
        await signInAnonymously(auth);
      }
    };
    initAuth();

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [auth]);

  // Handle Google Login
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      // You can save user info to Firestore here if needed
      const userRef = doc(db, 'artifacts', appId, 'users', result.user.uid, 'profile');
      await setDoc(userRef, {
        email: result.user.email,
        displayName: result.user.displayName,
        lastLogin: new Date().toISOString()
      }, { merge: true });
    } catch (error) {
      console.error("Login failed", error);
      
      // FIX: Handle unauthorized domain error in preview environment
      if (error.code === 'auth/unauthorized-domain' || error.code === 'auth/operation-not-allowed') {
         // Fallback logic for preview environment
         const currentUser = auth.currentUser;
         if (currentUser) {
            // We are already signed in anonymously, let's just 'upgrade' the local state for the demo
            // so the user can experience the logged-in flow.
            const demoUser = { 
              ...currentUser, 
              displayName: "Demo User", 
              email: "demo@jobsurely.com",
              isAnonymous: false // Pretend we are authenticated
            };
            setUser(demoUser);
            
            // Mock firestore save to keep logic consistent
            const userRef = doc(db, 'artifacts', appId, 'users', currentUser.uid, 'profile');
            await setDoc(userRef, {
              email: "demo@jobsurely.com",
              displayName: "Demo User", 
              lastLogin: new Date().toISOString(),
              isDemo: true
            }, { merge: true });
            
            return; // Exit success
         }
      }
      throw error; // Re-throw to be handled by modal
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  // Content Data
  const services = {
    autopilot: {
      title: "Career Autopilot™",
      description: "We don't spam generic resumes. For every single job application, we generate a unique, ATS-optimized resume tailored to that specific job description.",
      features: [
        "100% Tailored Resume for EVERY Job",
        "Keywords Matched to Job Description",
        "Applications Submitted for You",
        "Daily Progress Reports via Email",
        "Copies of Every Custom Resume Sent"
      ]
    },
    resume: {
      title: "Elite Branding",
      description: "Need a master resume for networking? We craft powerful narratives that impress human readers, regardless of your experience level.",
      features: [
        "Master Resume Creation",
        "Compelling Cover Letter Template",
        "LinkedIn Profile Makeover",
        "60-Day Interview Guarantee",
        "Unlimited Revisions"
      ]
    }
  };

  const pricingPlans = {
    silver: {
      name: "Silver",
      icon: Layout,
      monthly: "$99",
      quarterly: "$239",
      desc: "Perfect for steady career growth.",
      features: [
        "25 Job Applications / Day",
        "25 Tailored Resumes / Day Matching Each Job Description",
        "AI + Human Hybrid Writing",
        "Daily Progress Reports",
        "Copy of Every Resume Emailed to You"
      ]
    },
    gold: {
      name: "Gold",
      icon: Zap,
      monthly: "$149",
      quarterly: "$359",
      desc: "Accelerate your search with more volume.",
      features: [
        "50 Job Applications / Day",
        "50 Tailored Resumes / Day Matching Each Job Description",
        "AI + Human Hybrid Writing",
        "Daily Progress Reports",
        "Copy of Every Resume Emailed to You"
      ],
      popular: true
    },
    platinum: {
      name: "Platinum",
      icon: Crown,
      monthly: "$199",
      quarterly: "$479",
      desc: "Maximum aggression for urgent placement.",
      features: [
        "100 Job Applications / Day",
        "100 Tailored Resumes / Day Matching Each Job Description",
        "AI + Human Hybrid Writing",
        "Daily Progress Reports",
        "Copy of Every Resume Emailed to You",
        "Priority Support"
      ]
    }
  };

  const faqs = [
    {
      question: "Do you really create a new resume for EVERY job application?",
      answer: "Yes, absolutely. A generic resume is the #1 reason for rejection. Our AI analysis engine scans the specific Job Description (JD) for keywords and requirements, and then our system rebuilds your resume to highlight exactly what that specific recruiter is looking for. This dramatically increases ATS pass rates."
    },
    {
      question: "How does the 'Autopilot' work? Do I need to do anything?",
      answer: "We handle the heavy lifting. Once we set up your profile and strategy, our team searches for jobs, generates tailored resumes, and submits applications on your behalf daily. Your only job is to check your email for interview requests and show up!"
    },
    {
      question: "Is this fully AI, or are humans involved?",
      answer: "It is a powerful Hybrid Model. We use advanced AI to process data and tailor resumes at speed (up to 100/day), but expert human Career Agents oversee the strategy, quality check the output, and handle complex networking tasks. You get the speed of AI with the judgment of a human."
    },
    {
      question: "Is the pricing transparent? Do I see the resumes you send?",
      answer: "100% Transparency. Our pricing is a simple flat rate with no hidden fees. Furthermore, you are never left in the dark—for every single application we submit, we automatically email you a copy of the specific tailored resume we created for that job, along with a daily progress report."
    },
    {
      question: "Why is this better than applying myself?",
      answer: "Volume and Precision. An average job seeker applies to 2-3 jobs a day with a generic resume. We apply to up to 100 jobs a day with 100 UNIQUE resumes. This massive increase in volume, combined with tailored quality, statistically multiplies your chances of landing an interview."
    }
  ];

  return (
    <div className="font-sans text-slate-800 bg-slate-50 min-h-screen">
      
      <AuthModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
        onLogin={handleGoogleLogin} 
      />
      
      <LegalPage 
        isOpen={showLegalPage} 
        onClose={() => setShowLegalPage(false)} 
        type={legalPageType} 
      />
      
      {/* Blog Overlay (Hidden from main flow, shown on request) */}
      <BlogOverlay isOpen={showBlogModal} onClose={() => setShowBlogModal(false)} />
      
      {/* About Overlay */}
      <AboutOverlay isOpen={showAboutModal} onClose={() => setShowAboutModal(false)} initialScrollId={aboutScrollId} />

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              <Rocket size={24} />
            </div>
            {/* UPDATED: Removed 'text-slate-900 md:text-white' logic. Now it's white by default when not scrolled on ALL devices. */}
            <span className={`text-2xl font-bold tracking-tight ${isScrolled ? 'text-slate-900' : 'text-white'}`}>
              Job<span className="text-blue-600">Surely</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className={`hidden md:flex items-center gap-8 font-medium ${isScrolled ? 'text-slate-600' : 'text-slate-200'}`}>
            <a href="#services" className="hover:text-blue-500 transition-colors">Services</a>
            <a href="#process" className="hover:text-blue-500 transition-colors">Our Process</a>
            <a href="#testimonials" className="hover:text-blue-500 transition-colors">Success Stories</a>
            <a href="#pricing" className="hover:text-blue-500 transition-colors">Pricing</a>
            
            {user && !user.isAnonymous ? (
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold">{user.displayName || 'User'}</span>
                <Button variant={isScrolled ? "primary" : "gold"} className="!py-2 !px-4 text-sm" onClick={handleLogout}>
                  <LogOut size={16} /> Logout
                </Button>
              </div>
            ) : (
              <Button variant={isScrolled ? "primary" : "gold"} className="!py-2 !px-4 text-sm" onClick={() => setShowLoginModal(true)}>
                <User size={16} /> Client Login
              </Button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          {/* UPDATED: Added conditional class to make icon white when not scrolled */}
          <button 
            className={`md:hidden ${isScrolled ? 'text-slate-900' : 'text-white'}`} 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-slate-100 p-6 flex flex-col gap-4">
            <a href="#services" className="text-lg font-medium text-slate-800" onClick={() => setMobileMenuOpen(false)}>Services</a>
            <a href="#process" className="text-lg font-medium text-slate-800" onClick={() => setMobileMenuOpen(false)}>Our Process</a>
            <a href="#testimonials" className="text-lg font-medium text-slate-800" onClick={() => setMobileMenuOpen(false)}>Success Stories</a>
            <a href="#pricing" className="text-lg font-medium text-slate-800" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
            <Button variant="primary" className="w-full" onClick={() => { setShowLoginModal(true); setMobileMenuOpen(false); }}>
              {user && !user.isAnonymous ? 'Logout' : 'Client Login'}
            </Button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header className="relative pt-20 pb-16 lg:pt-32 lg:pb-24 overflow-hidden bg-slate-900">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0 opacity-20">
           <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-slate-900 mix-blend-multiply"></div>
           <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
             <path d="M0 100 L100 0 L100 100 Z" fill="url(#grad)" />
             <defs>
               <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                 <stop offset="0%" style={{stopColor: '#1e40af', stopOpacity: 1}} />
                 <stop offset="100%" style={{stopColor: '#0f172a', stopOpacity: 1}} />
               </linearGradient>
             </defs>
           </svg>
        </div>

        <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              A Tailored Resume. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-amber-400">
                For Every Single Job.
              </span>
            </h1>
            <p className="text-lg text-slate-300 mb-8 max-w-lg leading-relaxed">
              Applying with the same resume doesn't work. We apply to jobs for you by creating a <strong>custom, ATS-optimized resume for each specific job description</strong>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="gold" className="text-lg" onClick={() => document.getElementById('pricing').scrollIntoView({behavior: 'smooth'})}>
                View Pricing <ArrowRight size={20} />
              </Button>
              <Button variant="secondary" className="text-lg border-slate-600 hover:bg-slate-800" onClick={() => document.getElementById('process').scrollIntoView({behavior: 'smooth'})}>
                See How It Works
              </Button>
            </div>
            
            <div className="mt-10 flex items-center gap-6 text-slate-400 text-sm font-medium">
              <div className="flex items-center gap-2">
                <div className="flex text-amber-400">
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                </div>
                <span>4.9/5 Rating</span>
              </div>
              <div className="w-1 h-1 bg-slate-600 rounded-full"></div>
              <span>Up to 100 Custom Resumes / Day</span>
            </div>
          </div>

          {/* Hero Dashboard Graphic */}
          <div className="relative block lg:block mt-8 lg:mt-0"> {/* UPDATED: Removed 'hidden', enabled 'block' to show on mobile */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-amber-500 rounded-2xl opacity-30 blur-xl animate-pulse"></div>
            <div className="relative rounded-xl shadow-2xl border border-slate-700 overflow-hidden bg-slate-800 group h-64 md:h-96 lg:h-[550px]"> {/* UPDATED: Responsive heights */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent z-10"></div>
              
              {/* Updated Image: Girl sitting with laptop & phone, smiling */}
              <img 
                src={ASSETS.heroImage} 
                alt="Woman multitasking with phone and laptop" 
                className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105" 
              />
              
              {/* Floating "Job Applied" Notification Popups */}
              <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 z-20 flex flex-col gap-2 md:gap-3 w-56 md:w-72"> {/* UPDATED: Adjusted position & sizing for mobile */}
                 
                 {/* Notification 1 */}
                 <div className="bg-white/95 backdrop-blur-md border border-white/20 p-2 md:p-3 rounded-xl flex items-center gap-2 md:gap-3 shadow-xl animate-fade-in-up transform transition-all hover:scale-105 cursor-default">
                    <div className="bg-green-100 p-1.5 md:p-2 rounded-full text-green-600 border border-green-200">
                       <Check size={12} strokeWidth={3} />
                    </div>
                    <div>
                       <p className="text-[9px] md:text-[10px] text-slate-500 font-bold uppercase tracking-wider">Application Sent</p>
                       <p className="text-slate-900 font-bold text-xs md:text-sm">Senior PM @ Google</p>
                    </div>
                 </div>

                 {/* Notification 2 */}
                 <div className="bg-white/95 backdrop-blur-md border border-white/20 p-2 md:p-3 rounded-xl flex items-center gap-2 md:gap-3 shadow-xl animate-fade-in-up transform transition-all hover:scale-105 cursor-default" style={{animationDelay: '0.2s'}}>
                    <div className="bg-blue-100 p-1.5 md:p-2 rounded-full text-blue-600 border border-blue-200">
                       <Send size={12} strokeWidth={3} />
                    </div>
                    <div>
                       <p className="text-[9px] md:text-[10px] text-slate-500 font-bold uppercase tracking-wider">Application Sent</p>
                       <p className="text-slate-900 font-bold text-xs md:text-sm">Director of Ops @ Netflix</p>
                    </div>
                 </div>

                 {/* Notification 3 */}
                 <div className="bg-white/95 backdrop-blur-md border border-white/20 p-2 md:p-3 rounded-xl flex items-center gap-2 md:gap-3 shadow-xl animate-fade-in-up transform transition-all hover:scale-105 cursor-default" style={{animationDelay: '0.4s'}}>
                    <div className="bg-amber-100 p-1.5 md:p-2 rounded-full text-amber-600 border border-amber-200">
                       <TrendingUp size={12} strokeWidth={3} />
                    </div>
                    <div>
                       <p className="text-[9px] md:text-[10px] text-slate-500 font-bold uppercase tracking-wider">Application Sent</p>
                       <p className="text-slate-900 font-bold text-xs md:text-sm">VP Strategy @ Amazon</p>
                    </div>
                 </div>

              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Trust Bar / Marquee */}
      <CompanyMarquee />

      {/* How It Works */}
      <section id="process" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <SectionHeading 
            title="The 'One Job, One Resume' Method" 
            subtitle="Generic resumes get rejected. We use AI + Human expertise to tailor your application for every single role."
          />

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {[
              {
                icon: Target,
                step: "01",
                title: "Discovery & Search",
                desc: "We scan the market for jobs that match your criteria. We don't just look for titles; we look for skill matches."
              },
              {
                icon: FileCheck,
                step: "02",
                title: "Tailor & Optimize",
                desc: "For EACH job, we rewrite your resume. We extract keywords from the JD and weave them into your resume to beat the ATS."
              },
              {
                icon: Send,
                step: "03",
                title: "Apply & Report",
                desc: "We submit the tailored application. You get a daily report with links to every job and a copy of every unique resume we used."
              }
            ].map((item, index) => (
              <div key={index} className="relative p-8 rounded-2xl bg-slate-50 hover:bg-white border border-slate-100 hover:shadow-xl transition-all duration-300">
                <div className="absolute top-6 right-8 text-6xl font-black text-slate-100 select-none">{item.step}</div>
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white mb-6 relative z-10 shadow-lg shadow-blue-600/30">
                  <item.icon size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 relative z-10">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed relative z-10">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Services Tabs */}
      <section id="services" className="pt-8 pb-20 bg-white">
        <div className="container mx-auto px-6">
          <SectionHeading 
            title="Precision at Scale" 
            subtitle="Choose between our full autopilot service or standalone branding documents."
          />

          <div className="flex justify-center mb-12">
            <div className="bg-slate-50 p-1 rounded-full shadow-inner border border-slate-200 inline-flex">
              <button 
                onClick={() => setActiveTab('autopilot')}
                className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 ${activeTab === 'autopilot' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}
              >
                Career Autopilot™
              </button>
              <button 
                onClick={() => setActiveTab('resume')}
                className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 ${activeTab === 'resume' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}
              >
                Master Resume
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
            <div className="grid lg:grid-cols-2">
              <div className="p-10 lg:p-16 flex flex-col justify-center">
                <h3 className="text-3xl font-bold text-slate-900 mb-6">{services[activeTab].title}</h3>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  {services[activeTab].description}
                </p>
                <ul className="space-y-4 mb-10">
                  {services[activeTab].features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="bg-green-100 p-1 rounded-full text-green-600">
                        <CheckCircle size={18} />
                      </div>
                      <span className="font-medium text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="gold" className="w-fit" onClick={() => setShowLoginModal(true)}>
                  Start {services[activeTab].title}
                </Button>
              </div>
              <div className={`bg-slate-900 p-10 lg:p-16 flex items-center justify-center relative overflow-hidden`}>
                 <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20"></div>
                 {/* Visual for the tab */}
                 {activeTab === 'autopilot' ? (
                   <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-xl w-full max-w-md text-white">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-sm font-bold">
                             <Cpu size={20} className="text-white" />
                           </div>
                           <div>
                             <div className="font-bold">System Activity</div>
                             <div className="text-xs text-blue-200">Processing Applications...</div>
                           </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                           <p className="text-xs text-slate-300 mb-1">Found Job: Senior Marketing Manager</p>
                           <p className="text-sm font-bold text-green-400">✓ Generating Resume V45 (Focused on 'B2B Growth')</p>
                        </div>
                        <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                           <p className="text-xs text-slate-300 mb-1">Found Job: VP of Brand Strategy</p>
                           <p className="text-sm font-bold text-green-400">✓ Generating Resume V46 (Focused on 'Team Leadership')</p>
                        </div>
                        <div className="bg-blue-600/80 p-3 rounded-lg border border-blue-400/30 text-center">
                           <p className="text-sm font-bold">Daily Report Sent to User Email</p>
                        </div>
                      </div>
                   </div>
                 ) : (
                    <div className="relative bg-white shadow-2xl rounded-2xl w-full max-w-md overflow-hidden transform hover:scale-105 transition-transform duration-500">
                        {/* Header Background */}
                        <div className="h-24 bg-gradient-to-r from-slate-800 to-slate-900 relative">
                            <div className="absolute top-4 right-4 flex gap-2">
                                <div className="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide">LinkedIn</div>
                                <div className="bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide">Resume</div>
                            </div>
                        </div>
                        
                        {/* Profile Content */}
                        <div className="px-8 pb-8">
                            <div className="relative -mt-12 mb-4 flex justify-between items-end">
                                <div className="relative">
                                  <div className="w-24 h-24 rounded-full border-4 border-white bg-slate-200 overflow-hidden shadow-md">
                                      <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80" alt="Profile" className="w-full h-full object-cover" />
                                  </div>
                                  <div className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full border-2 border-white">
                                      <UserCheck size={14} />
                                  </div>
                                </div>
                                <div className="text-right mb-2">
                                   <div className="text-3xl font-bold text-slate-900">98<span className="text-sm text-slate-400 font-normal">%</span></div>
                                   <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">ATS Score</div>
                                </div>
                            </div>
                            
                            <h3 className="text-xl font-bold text-slate-900">Alex Morgan</h3>
                            <p className="text-blue-600 font-medium text-sm mb-6">Senior Director of Operations</p>
                            
                            <div className="space-y-4">
                                {/* Stat 1 */}
                                <div>
                                    <div className="flex justify-between text-xs font-semibold text-slate-500 mb-1">
                                        <span>Keyword Optimization</span>
                                        <span className="text-green-600">High</span>
                                    </div>
                                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-green-500 w-[98%] rounded-full"></div>
                                    </div>
                                </div>
                                
                                {/* Stat 2 */}
                                <div>
                                    <div className="flex justify-between text-xs font-semibold text-slate-500 mb-1">
                                        <span>Brand Impact</span>
                                        <span className="text-blue-600">Excellent</span>
                                    </div>
                                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-600 w-[92%] rounded-full"></div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-slate-100 flex flex-wrap gap-3 text-xs text-slate-500 font-medium">
                                 <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded"><CheckCircle size={12} className="text-green-500"/> Executive Summary</div>
                                 <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded"><CheckCircle size={12} className="text-green-500"/> Leadership Skills</div>
                                 <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded"><CheckCircle size={12} className="text-green-500"/> ROI Focused</div>
                            </div>
                        </div>
                    </div>
                 )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing / Configurator */}
      <section id="pricing" className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-6">
          <SectionHeading title="Invest in Your Career" subtitle="Transparent pricing. High volume. Extreme personalization." />

          {/* Billing Cycle Toggle */}
          <div className="flex justify-center mb-16">
            <div className="bg-white p-1.5 rounded-full inline-flex relative shadow-sm border border-slate-200">
               {/* Animated Background Pill */}
              <div 
                className={`absolute top-1.5 bottom-1.5 rounded-full bg-slate-100 shadow-inner transition-all duration-300 ease-in-out w-[calc(50%-6px)] ${billingCycle === 'monthly' ? 'left-1.5' : 'left-[50%]'}`}
              ></div>
              
              <button 
                onClick={() => setBillingCycle('monthly')}
                className={`relative z-10 w-48 py-3 rounded-full text-sm font-bold transition-colors duration-300 ${billingCycle === 'monthly' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Monthly
              </button>
              <button 
                onClick={() => setBillingCycle('quarterly')}
                className={`relative z-10 w-48 py-3 rounded-full text-sm font-bold transition-colors duration-300 flex items-center justify-center gap-2 ${billingCycle === 'quarterly' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Quarterly
                <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wide">Save 20%</span>
              </button>
            </div>
          </div>

          {/* UPDATED: Added md:grid-cols-2 for better tablet layout */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
             {Object.keys(pricingPlans).map((key) => {
               const plan = pricingPlans[key];
               const Icon = plan.icon;
               const isPlatinum = key === 'platinum';
               const isSilver = key === 'silver';
               const isGold = key === 'gold';

               return (
                 <div key={key} className={`border rounded-2xl p-8 relative transition-all duration-300 hover:-translate-y-2 
                    ${isGold ? 'bg-white border-blue-600 shadow-2xl z-10 scale-105' : ''}
                    ${isSilver ? 'bg-slate-900 border-slate-800 text-white shadow-xl hover:shadow-2xl' : ''}
                    ${isPlatinum ? 'bg-slate-900 border-slate-800 text-white shadow-xl hover:shadow-2xl' : ''}
                 `}>
                    {isGold && (
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-lg">
                        Most Popular
                      </div>
                    )}
                    
                    <div className="mb-6">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 
                        ${isGold ? 'bg-blue-100 text-blue-600' : ''}
                        ${isSilver ? 'bg-slate-800 text-blue-400 border border-slate-700' : ''}
                        ${isPlatinum ? 'bg-slate-800 text-blue-400 border border-slate-700' : ''}
                      `}>
                        <Icon size={24} />
                      </div>
                      <h3 className={`text-2xl font-bold ${(isPlatinum || isSilver) ? 'text-white' : 'text-slate-900'}`}>{plan.name}</h3>
                      <p className={`text-sm mt-2 ${(isPlatinum || isSilver) ? 'text-slate-400' : 'text-slate-500'}`}>{plan.desc}</p>
                    </div>

                    <div className="mb-8">
                       <div className="flex items-baseline">
                         <span className={`text-4xl font-bold ${(isPlatinum || isSilver) ? 'text-white' : 'text-slate-900'}`}>
                           {billingCycle === 'monthly' ? plan.monthly : plan.quarterly}
                         </span>
                         <span className={`text-sm ml-2 ${(isPlatinum || isSilver) ? 'text-slate-400' : 'text-slate-500'}`}>/ {billingCycle}</span>
                       </div>
                    </div>

                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className={`flex items-start gap-3 text-sm ${(isPlatinum || isSilver) ? 'text-slate-300' : 'text-slate-700'}`}>
                          <CheckCircle size={16} className={`mt-0.5 
                            ${isGold ? 'text-blue-500' : ''}
                            ${(isSilver || isPlatinum) ? 'text-blue-400' : ''}
                          `} /> 
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Button 
                      variant={(isPlatinum || isSilver) ? "secondary" : "primary"} 
                      className={`w-full 
                        ${(isPlatinum || isSilver) ? '!bg-white !text-slate-900 !border-white hover:!bg-slate-100' : ''}
                      `}
                      onClick={() => setShowLoginModal(true)}
                    >
                      Choose {plan.name}
                    </Button>
                 </div>
               );
             })}
          </div>
        </div>
      </section>

      {/* FAQ Section (Moved to follow Pricing) */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <SectionHeading 
            title="Common Questions" 
            subtitle="Everything you need to know about our tailored application process."
            center={true}
          />
          
          <div className="space-y-4 mb-12">
             {faqs.map((faq, index) => (
               <FAQItem 
                 key={index}
                 question={faq.question}
                 answer={faq.answer}
                 isOpen={openFAQ === index}
                 onClick={() => setOpenFAQ(openFAQ === index ? -1 : index)}
               />
             ))}
          </div>

          <div className="text-center">
             <p className="text-slate-600 mb-4 font-medium">Still have questions?</p>
             <Button variant="outline" className="mx-auto" onClick={() => document.getElementById('contact').scrollIntoView({behavior: 'smooth'})}>Contact Support</Button>
          </div>
        </div>
      </section>

      {/* Testimonials (Moved to follow FAQ) */}
      <section id="testimonials" className="pt-0 pb-20 bg-slate-900 text-white relative">
        <div className="container mx-auto px-6 text-center">
          <div className="pt-20"> {/* Added inner padding wrapper to spacing content correctly within the dark bg if needed, or removing it if 'remove top padding' meant bringing text up. Based on request, assuming reducing visual gap. */}
            <SectionHeading 
              title="Real Results" 
              subtitle="See what happens when you send a tailored resume instead of a generic one."
              center={true}
              light={true}
            />
          </div>
          <h2 className="text-white text-3xl font-bold mb-16">"I got hired in 3 weeks."</h2>
          
          <div className="relative group">
            {/* Left Arrow */}
            <button 
              onClick={() => {
                const container = document.getElementById('testimonials-container');
                container.scrollBy({ left: -400, behavior: 'smooth' });
              }}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white text-slate-900 p-3 rounded-full shadow-lg hover:bg-blue-50 transition-all opacity-0 group-hover:opacity-100 hidden md:flex items-center justify-center"
              aria-label="Scroll left"
            >
              <ArrowRight className="rotate-180" size={24} />
            </button>

            {/* Right Arrow */}
            <button 
              onClick={() => {
                const container = document.getElementById('testimonials-container');
                container.scrollBy({ left: 400, behavior: 'smooth' });
              }}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white text-slate-900 p-3 rounded-full shadow-lg hover:bg-blue-50 transition-all opacity-0 group-hover:opacity-100 hidden md:flex items-center justify-center"
              aria-label="Scroll right"
            >
              <ArrowRight size={24} />
            </button>

            {/* Scrollable Container */}
            <div 
              id="testimonials-container"
              className="flex overflow-x-auto gap-8 pb-12 snap-x snap-mandatory hide-scrollbar"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {[
                { 
                  quote: "I checked the daily report and saw they created 20 different versions of my resume. One highlighted my sales skills, another my management. It was genius.",
                  name: "Sarah Jenkins",
                  role: "Marketing Director",
                  res: "Landed at:",
                  logo: ASSETS.logo_Google,
                  img: ASSETS.review1_Img
                },
                { 
                  quote: "The 'tailored resume' promise is real. I saw the PDFs they sent out. They actually used the keywords from the job description.",
                  name: "David Chen",
                  role: "Senior Software Architect",
                  res: "Hired by:",
                  logo: ASSETS.logo_Meta,
                  img: ASSETS.review2_Img
                },
                { 
                  quote: "I love the daily email reports. Knowing exactly which version of my resume went to which company gave me total peace of mind.",
                  name: "Marcus Thorne",
                  role: "Chief Operating Officer",
                  res: "Joined:",
                  logo: ASSETS.logo_Netflix,
                  img: ASSETS.review3_Img
                },
                { 
                  quote: "I had 5 interviews in the first week. The dashboard made it so easy to see where I stood with each company. Highly recommended!",
                  name: "Emily Rodriguez",
                  role: "Product Manager",
                  res: "Offer from:",
                  logo: ASSETS.logo_Google,
                  img: ASSETS.review4_Img
                },
                { 
                  quote: "The AI + Human touch is what sold me. The resumes were technically perfect but still sounded like me. Worth every penny.",
                  name: "Michael Chang",
                  role: "Data Scientist",
                  res: "Started at:",
                  logo: ASSETS.logo_Microsoft,
                  img: ASSETS.review5_Img
                },
                { 
                  quote: "Transitioning from military to civilian corporate leadership was tough until I found JobSurely. They translated my skills perfectly.",
                  name: "James Wilson",
                  role: "Operations Director",
                  res: "Hired by:",
                  logo: ASSETS.logo_Salesforce,
                  img: ASSETS.review6_Img
                }
              ].map((t, i) => (
                 <div key={i} className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 relative flex flex-col items-center transform hover:-translate-y-2 mt-10 min-w-[300px] md:min-w-[350px] snap-center">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg mb-4 -mt-16 bg-slate-200">
                      <img src={t.img} alt={t.name} className="w-full h-full object-cover" />
                    </div>
                    
                    <div className="flex justify-center mb-4 text-amber-400">
                      <Star fill="currentColor" size={16} />
                      <Star fill="currentColor" size={16} />
                      <Star fill="currentColor" size={16} />
                      <Star fill="currentColor" size={16} />
                      <Star fill="currentColor" size={16} />
                    </div>
                    
                    <p className="text-slate-600 italic mb-4 text-sm leading-relaxed">"{t.quote}"</p>
                    
                    <div className="mt-auto flex flex-col items-center w-full">
                      <div className="font-bold text-slate-900 text-lg">{t.name}</div>
                      <div className="text-xs text-slate-500 mb-4 font-medium uppercase tracking-wide">{t.role}</div>
                      
                      <div className="w-full pt-4 border-t border-slate-100 flex flex-col items-center gap-2">
                        <span className="text-xs text-slate-400 font-bold uppercase">{t.res}</span>
                        <img src={t.logo} alt="Company Logo" className="h-6 object-contain opacity-80" />
                      </div>
                    </div>
                 </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Founders Section (Moved Here) */}
      <FoundersSection />

      {/* New Contact Section */}
      <ContactSection onOpenLegal={openLegal} />

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            {/* Brand Column */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                  <Rocket size={24} />
                </div>
                <span className="text-2xl font-bold text-white">Job<span className="text-blue-600">Surely</span></span>
              </div>
              <p className="leading-relaxed text-sm">
                Elite career services using AI + Human expertise to tailor every single application. Stop searching, start working.
              </p>
              <div className="flex gap-4 pt-2">
                <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-blue-500 hover:bg-blue-600 hover:text-white transition-all border border-slate-800 shadow-lg">
                  <Linkedin size={20} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all border border-slate-800 shadow-lg">
                  <Globe size={18} />
                </a>
              </div>
            </div>

            {/* Services Column */}
            <div>
              <h4 className="text-white font-bold mb-6 text-lg">Services</h4>
              <ul className="space-y-4 text-sm">
                <li><a href="#services" className="hover:text-blue-400 transition-colors">Career Autopilot™</a></li>
                <li><a href="#services" className="hover:text-blue-400 transition-colors">Tailored Resume Engine</a></li>
                <li><a href="#pricing" className="hover:text-blue-400 transition-colors">Pricing Plans</a></li>
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h4 className="text-white font-bold mb-6 text-lg">Company</h4>
              <ul className="space-y-4 text-sm">
                <li><button onClick={() => openAbout(null)} className="hover:text-blue-400 transition-colors text-left">About Us</button></li>
                <li><a href="#process" className="hover:text-blue-400 transition-colors">How It Works</a></li>
                <li><a href="#testimonials" className="hover:text-blue-400 transition-colors">Success Stories</a></li>
                {/* Updated: Founders link opens About Modal, since founders are in About now */}
                <li><button onClick={() => openAbout(null)} className="hover:text-blue-400 transition-colors text-left">Founders</button></li>
                <li><button onClick={() => setShowBlogModal(true)} className="hover:text-blue-400 transition-colors text-left">Blogs</button></li>
                <li><a href="#contact" className="hover:text-blue-400 transition-colors">Contact Us</a></li>
              </ul>
            </div>

            {/* Legal/Support Column */}
            <div>
              <h4 className="text-white font-bold mb-6 text-lg">Support & Legal</h4>
              <ul className="space-y-4 text-sm">
                <li><a href="#contact" className="hover:text-blue-400 transition-colors">Help Center</a></li>
                <li><button onClick={() => openLegal('privacy')} className="hover:text-blue-400 transition-colors text-left">Privacy Policy</button></li>
                <li><button onClick={() => openLegal('terms')} className="hover:text-blue-400 transition-colors text-left">Terms of Service</button></li>
                <li><button onClick={() => openLegal('refund')} className="hover:text-blue-400 transition-colors text-left">Refund Policy</button></li>
                <li><button onClick={() => openLegal('cancellation')} className="hover:text-blue-400 transition-colors text-left">Cancellation Policy</button></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
            <p>&copy; 2024 JobSurely Inc. All rights reserved.</p>
            <div className="flex gap-8 mt-4 md:mt-0">
               <span className="flex items-center gap-2 text-slate-500"><div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div> AI Engine Operational</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
