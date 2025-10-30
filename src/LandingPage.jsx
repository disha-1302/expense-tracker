import React, { useState, useEffect, useRef } from "react";
import "./LandingPage.css";
import { 
  ChevronDown, CheckCircle2, Play, BarChart3, PieChart, Wallet,
  ShoppingBag, Coffee, Car, Home, Plane, Utensils, Film,
  CreditCard, Heart, Dumbbell, Book, Wifi
} from 'lucide-react';

const CATEGORIES = [
  { icon: ShoppingBag, name: "Shopping", color: "#FF6B6B", percent: 25 },
  { icon: Utensils, name: "Food & Dining", color: "#4ECDC4", percent: 20 },
  { icon: Home, name: "Housing", color: "#45B7D1", percent: 15 },
  { icon: Car, name: "Transport", color: "#96CEB4", percent: 10 },
  { icon: Film, name: "Entertainment", color: "#FFEEAD", percent: 8 },
  { icon: Wifi, name: "Utilities", color: "#D4A5A5", percent: 7 },
  { icon: Dumbbell, name: "Health", color: "#9B59B6", percent: 5 },
  { icon: Book, name: "Education", color: "#3498DB", percent: 5 },
  { icon: Plane, name: "Travel", color: "#F1C40F", percent: 3 },
  { icon: CreditCard, name: "Bills", color: "#E74C3C", percent: 2 }
];

const FeatureCard = ({ title, icon: Icon, children }) => (
  <div className="lp-feature-card">
    <div className="lp-feature-icon">
      <Icon size={24} />
    </div>
    <div className="lp-feature-content">
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  </div>
);

const useIntersectionObserver = (ref) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref]);

  return isVisible;
};

export default function LandingPage() {
  const [showVideo, setShowVideo] = useState(false);
  const [activeExpense, setActiveExpense] = useState(0);
  const whyRef = useRef(null);
  const pricingRef = useRef(null);
  const howRef = useRef(null);

  const isWhyVisible = useIntersectionObserver(whyRef);
  const isPricingVisible = useIntersectionObserver(pricingRef);
  const isHowVisible = useIntersectionObserver(howRef);

  const scrollTo = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveExpense(prev => (prev + 100) % 400);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="lp-root">
      <header className="lp-header">
        <div className="lp-brand">
          <Wallet className="brand-icon" size={24} />
          PennyPlan <span className="lp-badge">Expense Tracker</span>
        </div>
        <nav className="lp-main-nav">
          <a onClick={() => scrollTo(whyRef)} className="nav-link">Features</a>
          <a onClick={() => scrollTo(howRef)} className="nav-link">How it works</a>
          <a onClick={() => scrollTo(pricingRef)} className="nav-link">Pricing</a>
          <a className="nav-link">FAQ</a>
        </nav>
        <div className="lp-cta">
          <button className="lp-cta-primary hover-elevate">Get started</button>
        </div>
      </header>

      {showVideo && (
        <div className="video-modal" onClick={() => setShowVideo(false)}>
          <div className="video-content" onClick={e => e.stopPropagation()}>
            <button className="close-video" onClick={() => setShowVideo(false)}>×</button>
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Product Demo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      <main className="lp-hero">
        <div className="lp-hero-left">
          <div className="lp-pill animated-pill">
            <span className="pill-dot"></span>
            Secure • Real-time • Insightful
          </div>
          <h1 className="lp-title">
            <span className="gradient-text">PennyPlan</span><br/>
            <span className="text-animate">Modern Expense<br/>Tracker</span>
          </h1>
          <p className="lp-sub slide-in">Take control of your money with a beautiful, privacy-minded tracker. Budgets, insights, and goals—powered by fast, delightful design.</p>
          <div className="lp-actions slide-in">
            <button className="lp-primary hover-elevate">Start free</button>
            <button className="lp-secondary hover-glow" onClick={() => setShowVideo(true)}>
              <Play size={16} className="play-icon" />
              Watch demo
            </button>
          </div>

          <div className="lp-feature-list slide-in">
            <div className="feature-tag">
              <CheckCircle2 size={16} className="check-icon" />
              End-to-end encrypted
            </div>
            <div className="feature-tag">
              <CheckCircle2 size={16} className="check-icon" />
              Real-time budgets
            </div>
          </div>
        </div>

        <aside className="lp-hero-right floating">
          <div className="lp-card interactive-card">
            <div className="lp-card-header hover-highlight">
              <div className="lp-card-title">Budget Overview</div>
              <div className="lp-card-badge pulse">On track</div>
            </div>
            <div className="lp-card-body">
              <div className="lp-stats">
                <div className="lp-stat hover-scale">
                  <div className="label">Spent</div>
                  <div className="value counter">₹{activeExpense.toLocaleString()}</div>
                </div>
                <div className="lp-stat hover-scale">
                  <div className="label">Remaining</div>
                  <div className="value counter">₹{(4000 - activeExpense).toLocaleString()}</div>
                </div>
                <div className="lp-stat hover-scale">
                  <div className="label">Savings</div>
                  <div className="value counter">₹{Math.floor(activeExpense * 0.2).toLocaleString()}</div>
                </div>
              </div>

              <div className="lp-progress">
                <div 
                  className="lp-progress-bar" 
                  style={{ 
                    width: `${(activeExpense / 4000) * 100}%`,
                    transition: 'width 0.5s ease-in-out'
                  }} 
                />
              </div>

              <div className="card-interaction-hint">
                <div className="pulse-ring"></div>
                Click to interact
              </div>
            </div>
          </div>
        </aside>
      </main>

      <section className="lp-categories">
        <h2>Smart Expense Categories</h2>
        <p className="lp-categories-sub">Track your spending across multiple categories with automatic categorization</p>

        <div className="categories-grid">
          {CATEGORIES.map((cat, idx) => (
            <div key={cat.name} className="category-item" style={{"--delay": `${idx * 0.1}s`, "--color": cat.color}}>
              <div className="category-icon">
                <cat.icon size={24} />
              </div>
              <div className="category-info">
                <h3>{cat.name}</h3>
                <div className="category-bar">
                  <div className="category-progress" style={{ width: `${cat.percent}%` }} />
                </div>
                <span className="category-percent">{cat.percent}%</span>
              </div>
            </div>
          ))}
        </div>

        <div className="category-features">
          <div className="feature-point">
            <CheckCircle2 size={20} />
            Automatic categorization using AI
          </div>
          <div className="feature-point">
            <CheckCircle2 size={20} />
            Custom categories & sub-categories
          </div>
          <div className="feature-point">
            <CheckCircle2 size={20} />
            Smart recurring transaction detection
          </div>
        </div>
      </section>

      <section className="lp-why" ref={whyRef}>
        <h2 className={`fade-in ${isWhyVisible ? 'visible' : ''}`}>Why PennyPlan?</h2>
        <p className={`lp-why-sub fade-in ${isWhyVisible ? 'visible' : ''}`}>
          Powerful tools with a calm, focused experience.
        </p>

        <div className={`lp-features slide-up ${isWhyVisible ? 'visible' : ''}`}>
          <FeatureCard 
            title="Smart categorization" 
            icon={BarChart3}>
            Auto-organize your transactions with AI-powered rules and smart hints.
          </FeatureCard>
          <FeatureCard 
            title="Real-time budgets" 
            icon={PieChart}>
            See how much you can safely spend today—no spreadsheets needed.
          </FeatureCard>
          <FeatureCard 
            title="Private by design" 
            icon={CheckCircle2}>
            Local-first with encryption. Your financial data stays yours.
          </FeatureCard>
        </div>
      </section>

      <section className="lp-hiw" ref={howRef}>
        <h2 className={`fade-in ${isHowVisible ? 'visible' : ''}`}>How it Works</h2>
        <p className={`lp-hiw-sub fade-in ${isHowVisible ? 'visible' : ''}`}>
          Start managing your expenses in three simple steps
        </p>
        
        <div className={`lp-steps ${isHowVisible ? 'steps-animate' : ''}`}>
          <div className="lp-step hover-lift">
            <div className="lp-step-number">1</div>
            <div className="step-content">
              <h3>Create Account</h3>
              <p>Sign up for free in less than 2 minutes with just your email</p>
            </div>
            <div className="step-arrow">
              <ChevronDown size={24} />
            </div>
          </div>
          <div className="lp-step hover-lift">
            <div className="lp-step-number">2</div>
            <div className="step-content">
              <h3>Set Your Budget</h3>
              <p>Define your spending limits and financial goals</p>
            </div>
            <div className="step-arrow">
              <ChevronDown size={24} />
            </div>
          </div>
          <div className="lp-step hover-lift">
            <div className="lp-step-number">3</div>
            <div className="step-content">
              <h3>Track & Optimize</h3>
              <p>Monitor your expenses and get insights to save more</p>
              <div className="step-arrow">
              <ChevronDown size={24} />
            </div>
            </div>
            <div className="sparkle"></div>
          </div>
        </div>
      </section>

      <section className="lp-pricing" ref={pricingRef}>
        <h2 className={`fade-in ${isPricingVisible ? 'visible' : ''}`}>
          Simple, Transparent Pricing
        </h2>
        <p className={`lp-pricing-sub fade-in ${isPricingVisible ? 'visible' : ''}`}>
          Choose the plan that works best for you
        </p>

        <div className={`lp-plans ${isPricingVisible ? 'plans-animate' : ''}`}>
          <div className="lp-plan hover-lift">
            <div className="popular-tag">Most Popular</div>
            <div className="lp-plan-name">Free</div>
            <div className="lp-plan-price shine">₹0<span className="period">/mo</span></div>
            <ul className="lp-plan-features">
              <li className="feature-animate">Basic expense tracking</li>
              <li className="feature-animate">Up to 2 budgets</li>
              <li className="feature-animate">30-day transaction history</li>
              <li className="feature-animate">Basic reports</li>
            </ul>
            <button className="lp-secondary hover-glow">Get Started</button>
          </div>

          <div className="lp-plan featured hover-lift">
            <div className="popular-tag">Most Popular</div>
            <div className="lp-plan-name">Premium</div>
            <div className="lp-plan-price shine">₹299<span className="period">/mo</span></div>
            <ul className="lp-plan-features">
              <li className="feature-animate">Advanced expense tracking</li>
              <li className="feature-animate">Unlimited budgets</li>
              <li className="feature-animate">Unlimited history</li>
              <li className="feature-animate">Advanced analytics & insights</li>
              <li className="feature-animate">AI-powered categorization</li>
              <li className="feature-animate">Priority support</li>
            </ul>
            <button className="lp-primary hover-elevate">Start Free Trial</button>
            <div className="plan-highlight"></div>
          </div>

          <div className="lp-plan hover-lift">
            <div className="enterprise-tag">Enterprise Ready</div>
            <div className="lp-plan-name">Business</div>
            <div className="lp-plan-price shine">₹999<span className="period">/mo</span></div>
            <ul className="lp-plan-features">
              <li className="feature-animate">Everything in Premium</li>
              <li className="feature-animate">Multiple users</li>
              <li className="feature-animate">Team budgets</li>
              <li className="feature-animate">Custom reports</li>
              <li className="feature-animate">API access</li>
              <li className="feature-animate">Dedicated support</li>
            </ul>
            <button className="lp-secondary hover-glow">Contact Sales</button>
          </div>
        </div>
      </section>

      <section className="lp-cta-hero">
        <div className="lp-cta-box hover-lift">
          <div className="cta-sparkles"></div>
          <h2 className="gradient-text">Ready to own your finances?</h2>
          <p>Join thousands switching to a calmer, clearer way to track money with PennyPlan.</p>
          <div className="lp-cta-actions">
            <button className="lp-primary large hover-elevate">Create your free account</button>
            <button className="lp-secondary large hover-glow">Learn more</button>
          </div>
          <div className="satisfaction-guarantee">
            <CheckCircle2 size={16} className="check-icon" />
            30-day money-back guarantee
          </div>
        </div>
      </section>
    </div>
  );
}
