"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  DollarSign, Upload, FileText, TrendingUp, Star, ChevronRight,
  ChevronLeft, ArrowUpRight, ArrowDownLeft, Sparkles, Clock, CheckCircle2,
  Headphones, CreditCard, ArrowUp, Wallet, PlayCircle, Zap, ShieldCheck,
  Flame, Award, Bell, AlertCircle, Calendar, Compass, UserCheck, FilePlus,
  ArrowRight, Crown, X
} from "lucide-react";

const activeBriefs = [
  {
    brand: "GlowBrand",
    brandInitial: "GB",
    title: "Skincare Morning Routine Reel",
    type: "Short Video (30s)",
    payout: "$200.00",
    deadline: "2 days left",
    status: "In Production",
    statusPill: "pill-blue",
    progress: 65,
  },
  {
    brand: "TechFlow",
    brandInitial: "TF",
    title: "Noise-Canceling Headphones Unboxing",
    type: "Product Demo Video",
    payout: "$300.00",
    deadline: "4 days left",
    status: "Brief Accepted",
    statusPill: "pill-amber",
    progress: 25,
  },
  {
    brand: "NutriLife",
    brandInitial: "NL",
    title: "High-Protein Meal Prep Recipe",
    type: "Photo Pack (5 Stills)",
    payout: "$120.00",
    deadline: "Tomorrow (18h)",
    status: "Revision Needed",
    statusPill: "pill-red",
    progress: 90,
  },
];

const recentSubmissions = [
  {
    brand: "Nike",
    title: "Summer Running Collection Promo",
    status: "Approved & Paid",
    amount: "+$150.00",
    date: "Jul 24, 2025",
    pill: "pill-green",
    format: "Video (45s)"
  },
  {
    brand: "GlowBrand",
    title: "Night Routine Serum Review",
    status: "Under Review",
    amount: "$200.00",
    date: "Jul 22, 2025",
    pill: "pill-amber",
    format: "Video (30s)"
  },
  {
    brand: "TechFlow",
    title: "Smartwatch Fitness Tracking Test",
    status: "Approved & Paid",
    amount: "+$300.00",
    date: "Jul 18, 2025",
    pill: "pill-green",
    format: "Video (60s)"
  },
];

const upcomingDeadlines = [
  {
    title: "High-Protein Meal Prep Recipe",
    brand: "NutriLife",
    due: "Due in 18 hours",
    urgent: true,
    actionText: "Fix Revision",
    link: "/creator/uploads"
  },
  {
    title: "Skincare Morning Routine Reel",
    brand: "GlowBrand",
    due: "Due in 2 days",
    urgent: false,
    actionText: "Upload Video",
    link: "/creator/uploads"
  },
  {
    title: "Noise-Canceling Headphones Unboxing",
    brand: "TechFlow",
    due: "Due in 4 days",
    urgent: false,
    actionText: "View Brief",
    link: "/creator/deals"
  },
];

const notifications = [
  {
    id: 1,
    title: "Payout of $150.00 Processed",
    time: "2 hours ago",
    type: "payout",
    icon: DollarSign,
    unread: true,
  },
  {
    id: 2,
    title: "NutriLife requested a quick revision",
    time: "5 hours ago",
    type: "revision",
    icon: AlertCircle,
    unread: true,
  },
  {
    id: 3,
    title: "New Campaign Matched: Fitness & Tech",
    time: "1 day ago",
    type: "brief",
    icon: Sparkles,
    unread: false,
  },
];

const carouselSlides = [
  {
    tag: "Featured Briefs",
    icon: Flame,
    tagColor: "#0284c7",
    title: "High-Paying Tech & Beauty Campaigns",
    description: "New brands are actively hiring creators today with payouts up to $350 per video.",
    ctaText: "Browse Briefs",
    ctaLink: "/creator/briefs",
    image: "/slide-1.png",
  },
  {
    tag: "Weekly Bonus",
    icon: Wallet,
    tagColor: "#10b981",
    title: "$100 Creator Streak Challenge",
    description: "Complete 3 approved deliverables this week to unlock an instant $100 bonus payout.",
    ctaText: "View My Progress",
    ctaLink: "/creator/deals",
    image: "/slide-2.png",
  },
  {
    tag: "Pro Level 3",
    icon: Award,
    tagColor: "#8b5cf6",
    title: "Top 5% Creator Status Unlocked",
    description: "Enjoy +5% bonus payouts on every accepted brief and 24-hour instant clearance.",
    ctaText: "View Tier Perks",
    ctaLink: "/creator/profile",
    image: "/slide-3.png",
  },
];

export default function CreatorHome() {
  const router = useRouter();
  const [withdrawing, setWithdrawing] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showSubModal, setShowSubModal] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Show "one more step" modal if creator hasn't subscribed yet
  useEffect(() => {
    const hasSub = localStorage.getItem("ugc_selected_plan");
    const dismissed = sessionStorage.getItem("ugc_sub_modal_dismissed");
    if (!hasSub && !dismissed) {
      const t = setTimeout(() => setShowSubModal(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  const dismissModal = () => {
    sessionStorage.setItem("ugc_sub_modal_dismissed", "1");
    setShowSubModal(false);
  };


  const handleWithdraw = () => {
    setWithdrawing(true);
    setTimeout(() => setWithdrawing(false), 2500);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
  };

  const slide = carouselSlides[currentSlide];
  const SlideIcon = slide.icon;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

      {/* ── Subscription "One More Step" Modal ── */}
      {showSubModal && (
        <div style={{ position: "fixed", inset: 0, zIndex: 1200, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div className="card" style={{ maxWidth: 480, width: "100%", borderRadius: 24, padding: "36px 32px", textAlign: "center", position: "relative" }}>
            <button onClick={dismissModal} style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", color: "var(--text-subtle)", cursor: "pointer" }}>
              <X style={{ width: 18, height: 18 }} />
            </button>

            {/* Icon */}
            <div style={{ width: 64, height: 64, borderRadius: 20, background: "linear-gradient(135deg,#0284c7,#38bdf8)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", boxShadow: "0 12px 32px rgba(2,132,199,0.35)" }}>
              <Crown style={{ width: 28, height: 28, color: "#fff" }} />
            </div>

            <span style={{ display: "inline-block", background: "rgba(2,132,199,0.1)", border: "1px solid rgba(2,132,199,0.25)", color: "#0284c7", fontSize: 11, fontWeight: 800, padding: "4px 12px", borderRadius: 999, marginBottom: 14, letterSpacing: "0.04em" }}>ONE MORE STEP</span>

            <h2 style={{ color: "var(--text)", fontWeight: 900, fontSize: 24, letterSpacing: "-0.03em", marginBottom: 10, lineHeight: 1.2 }}>Unlock Your Full Creator Potential</h2>
            <p style={{ color: "var(--text-subtle)", fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>
              Choose a plan to start applying for paid campaigns, unlock premium features, and get faster payouts. Takes less than 2 minutes.
            </p>

            {/* Mini plan preview */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 24 }}>
              {[
                { name: "Free",  price: "$0",  color: "#64748b", icon: Zap  },
                { name: "Pro",   price: "$29", color: "#0284c7", icon: Star, popular: true },
                { name: "Elite", price: "$79", color: "#f59e0b", icon: Crown },
              ].map(p => (
                <div key={p.name} style={{ padding: "12px 8px", borderRadius: 12, background: p.popular ? "rgba(2,132,199,0.07)" : "var(--surface-subtle)", border: `1.5px solid ${p.popular ? "#0284c7" : "var(--border-strong)"}`, position: "relative" }}>
                  {p.popular && <div style={{ position: "absolute", top: -8, left: "50%", transform: "translateX(-50%)", background: "#0284c7", color: "#fff", fontSize: 9, fontWeight: 800, padding: "2px 8px", borderRadius: 999, whiteSpace: "nowrap" }}>Popular</div>}
                  <p.icon style={{ width: 16, height: 16, color: p.color, margin: "0 auto 4px" }} />
                  <div style={{ color: "var(--text)", fontWeight: 800, fontSize: 13 }}>{p.name}</div>
                  <div style={{ color: p.color, fontWeight: 900, fontSize: 15 }}>{p.price}<span style={{ color: "var(--text-subtle)", fontWeight: 400, fontSize: 11 }}>/mo</span></div>
                </div>
              ))}
            </div>

            <button
              onClick={() => { dismissModal(); router.push("/creator/subscription"); }}
              style={{ width: "100%", padding: "15px", borderRadius: 14, background: "#0284c7", border: "none", color: "#fff", fontWeight: 800, fontSize: 15, cursor: "pointer", fontFamily: "inherit", letterSpacing: "-0.01em", boxShadow: "0 8px 24px rgba(2,132,199,0.35)", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 10 }}
            >
              View Plans & Subscribe <ArrowRight style={{ width: 16, height: 16 }} />
            </button>
            <button onClick={dismissModal} style={{ background: "none", border: "none", color: "var(--text-subtle)", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
              Maybe later
            </button>
          </div>
        </div>
      )}


      {/* ── 1. Top Greeting Header ── */}
      <div className="page-header-flex" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
        <div>
          <h1 style={{ color: "var(--text)", fontWeight: 800, fontSize: 26, letterSpacing: "-0.03em", margin: "0 0 4px" }}>
            Welcome back, Sarah
          </h1>
          <p style={{ color: "var(--text-subtle)", fontSize: 13, margin: 0 }}>
            Here is your financial summary and active campaign updates for today.
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "var(--surface)", border: "1px solid var(--border-strong)",
            padding: "8px 14px", borderRadius: 14, boxShadow: "var(--shadow-card)"
          }}>
            <Star style={{ width: 16, height: 16, color: "#fbbf24", fill: "#fbbf24" }} />
            <div>
              <div style={{ color: "var(--text)", fontWeight: 800, fontSize: 15, lineHeight: 1 }}>4.92</div>
              <div style={{ color: "var(--text-subtle)", fontSize: 10, fontWeight: 500, marginTop: 2 }}>Creator Rating</div>
            </div>
          </div>

          <Link href="/creator/briefs" className="btn btn-primary" style={{ padding: "0 18px", height: 40, borderRadius: 12, textDecoration: "none", fontSize: 13, fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 6 }}>
            <Sparkles style={{ width: 14, height: 14 }} />
            Browse Briefs
          </Link>
        </div>
      </div>

      {/* ── 2. QUICK ACTIONS BAR ── */}
      <div className="grid-responsive-3col" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {/* Quick Action 1: View Campaigns */}
        <Link
          href="/creator/briefs"
          style={{
            padding: "16px 20px",
            borderRadius: 16,
            background: "var(--surface)",
            border: "1px solid var(--border-strong)",
            boxShadow: "var(--shadow-card)",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            transition: "all 0.2s ease"
          }}
          className="card-lift"
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 38, height: 38, borderRadius: 12,
              background: "rgba(2, 132, 199, 0.1)", border: "1px solid rgba(2, 132, 199, 0.25)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#0284c7"
            }}>
              <Compass style={{ width: 18, height: 18 }} />
            </div>
            <div>
              <div style={{ color: "var(--text)", fontWeight: 700, fontSize: 14 }}>View Campaigns</div>
              <div style={{ color: "var(--text-subtle)", fontSize: 11, marginTop: 2 }}>Browse live brand briefs</div>
            </div>
          </div>
          <ChevronRight style={{ width: 16, height: 16, color: "var(--text-subtle)" }} />
        </Link>

        {/* Quick Action 2: Upload Submission */}
        <Link
          href="/creator/uploads"
          style={{
            padding: "16px 20px",
            borderRadius: 16,
            background: "var(--surface)",
            border: "1px solid var(--border-strong)",
            boxShadow: "var(--shadow-card)",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            transition: "all 0.2s ease"
          }}
          className="card-lift"
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 38, height: 38, borderRadius: 12,
              background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.25)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#10b981"
            }}>
              <FilePlus style={{ width: 18, height: 18 }} />
            </div>
            <div>
              <div style={{ color: "var(--text)", fontWeight: 700, fontSize: 14 }}>Upload Submission</div>
              <div style={{ color: "var(--text-subtle)", fontSize: 11, marginTop: 2 }}>Submit content for review</div>
            </div>
          </div>
          <ChevronRight style={{ width: 16, height: 16, color: "var(--text-subtle)" }} />
        </Link>

        {/* Quick Action 3: Edit Profile */}
        <Link
          href="/creator/profile"
          style={{
            padding: "16px 20px",
            borderRadius: 16,
            background: "var(--surface)",
            border: "1px solid var(--border-strong)",
            boxShadow: "var(--shadow-card)",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            transition: "all 0.2s ease"
          }}
          className="card-lift"
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 38, height: 38, borderRadius: 12,
              background: "rgba(139, 92, 246, 0.1)", border: "1px solid rgba(139, 92, 246, 0.25)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#8b5cf6"
            }}>
              <UserCheck style={{ width: 18, height: 18 }} />
            </div>
            <div>
              <div style={{ color: "var(--text)", fontWeight: 700, fontSize: 14 }}>Edit Profile</div>
              <div style={{ color: "var(--text-subtle)", fontSize: 11, marginTop: 2 }}>Update rates & socials</div>
            </div>
          </div>
          <ChevronRight style={{ width: 16, height: 16, color: "var(--text-subtle)" }} />
        </Link>
      </div>

      {/* ── 3. STATISTICS SECTION ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

        {/* TOP ROW: Left Balance Card + Right 3-Slide Image Carousel */}
        <div className="grid-responsive-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1.25fr", gap: 16 }}>

          {/* LEFT FEATURED BALANCE CARD */}
          <div style={{
            borderRadius: 20,
            padding: "26px 24px 22px",
            background: "var(--surface)",
            border: "1.5px solid rgba(2, 132, 199, 0.4)",
            boxShadow: "0 8px 24px rgba(2, 132, 199, 0.08)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: 16
          }}>
            <div>
              {/* Balanced Balance Amount */}
              <div style={{ color: "var(--text)", fontWeight: 800, fontSize: 32, letterSpacing: "-0.03em", lineHeight: 1 }}>
                $1,450.00
              </div>
              <div style={{ color: "var(--text-subtle)", fontSize: 13, fontWeight: 500, marginTop: 6 }}>
                Available Balance
              </div>

              {/* Sub-stats row: This Month's Earnings + Pending Escrow */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 18, padding: "0 2px" }}>
                <div>
                  <div style={{ color: "var(--text-subtle)", fontSize: 11, fontWeight: 500 }}>This Month's Earnings</div>
                  <div style={{ color: "#10b981", fontWeight: 700, fontSize: 15, marginTop: 3 }}>+$420.00</div>
                </div>

                <div style={{ textAlign: "right" }}>
                  <div style={{ color: "var(--text-subtle)", fontSize: 11, fontWeight: 500 }}>Pending Escrow</div>
                  <div style={{ color: "var(--accent-text)", fontWeight: 700, fontSize: 15, marginTop: 3 }}>$2,750.50</div>
                </div>
              </div>
            </div>

            {/* Action Buttons: Payout Info / Request Payout */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 10 }}>
              <Link
                href="/creator/profile"
                style={{
                  padding: "10px 14px", borderRadius: 12,
                  background: "var(--surface-subtle)", border: "1px solid var(--border-strong)",
                  color: "var(--text)", fontWeight: 600, fontSize: 12,
                  textDecoration: "none",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
                  transition: "all 0.15s ease"
                }}
              >
                <CreditCard style={{ width: 14, height: 14 }} />
                Payout Info
              </Link>

              <button
                onClick={handleWithdraw}
                style={{
                  padding: "10px 14px", borderRadius: 12,
                  background: withdrawing ? "#10b981" : "#0284c7",
                  border: "none",
                  color: "#fff", fontWeight: 700, fontSize: 12,
                  cursor: "pointer", fontFamily: "inherit",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
                  boxShadow: "0 4px 12px rgba(2, 132, 199, 0.25)",
                  transition: "all 0.15s ease"
                }}
              >
                <ArrowUp style={{ width: 14, height: 14 }} />
                {withdrawing ? "Requesting..." : "Request Payout"}
              </button>
            </div>

            {/* Support Pill Banner */}
            <div style={{
              background: "var(--surface-hover)",
              border: "1px solid var(--border)",
              borderRadius: 14,
              padding: "10px 14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 30, height: 30, borderRadius: 8,
                  background: "#0284c7", display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", flexShrink: 0
                }}>
                  <Headphones style={{ width: 15, height: 15 }} />
                </div>
                <div>
                  <div style={{ color: "var(--text)", fontWeight: 600, fontSize: 12 }}>Contact Support</div>
                  <div style={{ color: "var(--text-subtle)", fontSize: 11, marginTop: 1 }}>Need help? Chat with us instantly</div>
                </div>
              </div>
              <ChevronRight style={{ width: 16, height: 16, color: "var(--text-subtle)" }} />
            </div>
          </div>

          {/* RIGHT CARD: 3-SLIDE IMAGE CAROUSEL CARD */}
          <div style={{
            borderRadius: 20,
            padding: "22px 24px",
            background: "var(--surface)",
            border: "1px solid var(--border-strong)",
            boxShadow: "var(--shadow-card)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
            overflow: "hidden"
          }}>
            {/* Carousel Content Layout: Left text + Right image */}
            <div className="carousel-responsive-grid" style={{ display: "grid", gridTemplateColumns: "1fr 140px", gap: 16, alignItems: "center" }}>
              <div>
                <span style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                  padding: "4px 10px",
                  borderRadius: 999,
                  background: `${slide.tagColor}15`,
                  color: slide.tagColor,
                  fontSize: 11,
                  fontWeight: 700,
                  marginBottom: 10
                }}>
                  <SlideIcon style={{ width: 12, height: 12 }} />
                  {slide.tag}
                </span>

                <h3 style={{ color: "var(--text)", fontWeight: 800, fontSize: 17, margin: "0 0 6px", lineHeight: 1.25, letterSpacing: "-0.02em" }}>
                  {slide.title}
                </h3>
                <p style={{ color: "var(--text-subtle)", fontSize: 12, lineHeight: 1.5, margin: "0 0 16px" }}>
                  {slide.description}
                </p>

                <Link
                  href={slide.ctaLink}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    color: "var(--accent-text)",
                    fontWeight: 700,
                    fontSize: 12,
                    textDecoration: "none"
                  }}
                >
                  {slide.ctaText} <ChevronRight style={{ width: 14, height: 14 }} />
                </Link>
              </div>

              {/* Slide Image */}
              <div className="carousel-responsive-image" style={{
                position: "relative",
                width: 140,
                height: 130,
                borderRadius: 14,
                overflow: "hidden",
                border: "1px solid var(--border)",
                background: "var(--surface-subtle)"
              }}>
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  style={{ objectFit: "cover", transition: "all 0.4s ease" }}
                />
              </div>
            </div>

            {/* Carousel Bottom Controls */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 18, paddingTop: 12, borderTop: "1px solid var(--border)" }}>
              {/* Dot Indicators */}
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                {carouselSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    style={{
                      width: idx === currentSlide ? 18 : 6,
                      height: 6,
                      borderRadius: 999,
                      background: idx === currentSlide ? "#0284c7" : "var(--border-strong)",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      transition: "all 0.3s ease"
                    }}
                  />
                ))}
              </div>

              {/* Prev / Next Buttons */}
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <button
                  onClick={prevSlide}
                  style={{
                    width: 28, height: 28, borderRadius: 8,
                    background: "var(--surface-subtle)", border: "1px solid var(--border-strong)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "var(--text)", cursor: "pointer"
                  }}
                >
                  <ChevronLeft style={{ width: 14, height: 14 }} />
                </button>
                <button
                  onClick={nextSlide}
                  style={{
                    width: 28, height: 28, borderRadius: 8,
                    background: "var(--surface-subtle)", border: "1px solid var(--border-strong)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "var(--text)", cursor: "pointer"
                  }}
                >
                  <ChevronRight style={{ width: 14, height: 14 }} />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM ROW: 3 EQUAL STATS CARDS SIDE BY SIDE */}
        <div className="grid-responsive-3col" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>

          {/* Card 1: Total Lifetime Earned */}
          <div style={{
            borderRadius: 18,
            padding: "18px 20px",
            background: "var(--surface)",
            border: "1px solid var(--border-strong)",
            boxShadow: "var(--shadow-card)",
            display: "flex",
            alignItems: "center",
            gap: 14
          }}>
            <div style={{
              width: 42, height: 42, borderRadius: 12,
              background: "#0284c7", display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", flexShrink: 0, boxShadow: "0 6px 14px rgba(2, 132, 199, 0.2)"
            }}>
              <ArrowDownLeft style={{ width: 20, height: 20 }} />
            </div>

            <div>
              <div style={{ color: "var(--text)", fontWeight: 800, fontSize: 22, letterSpacing: "-0.03em", lineHeight: 1 }}>
                $4,200.50
              </div>
              <div style={{ color: "var(--text-subtle)", fontSize: 12, fontWeight: 500, marginTop: 4 }}>
                Total Lifetime Earned
              </div>
              <div style={{ color: "#10b981", fontSize: 11, fontWeight: 600, marginTop: 4, display: "flex", alignItems: "center", gap: 3 }}>
                <ArrowUpRight style={{ width: 12, height: 12 }} /> All-time creator earnings
              </div>
            </div>
          </div>

          {/* Card 2: Total Paid Out */}
          <div style={{
            borderRadius: 18,
            padding: "18px 20px",
            background: "var(--surface)",
            border: "1px solid var(--border-strong)",
            boxShadow: "var(--shadow-card)",
            display: "flex",
            alignItems: "center",
            gap: 14
          }}>
            <div style={{
              width: 42, height: 42, borderRadius: 12,
              background: "#10b981", display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", flexShrink: 0, boxShadow: "0 6px 14px rgba(16, 185, 129, 0.2)"
            }}>
              <ArrowUpRight style={{ width: 20, height: 20 }} />
            </div>

            <div>
              <div style={{ color: "var(--text)", fontWeight: 800, fontSize: 22, letterSpacing: "-0.03em", lineHeight: 1 }}>
                $2,750.00
              </div>
              <div style={{ color: "var(--text-subtle)", fontSize: 12, fontWeight: 500, marginTop: 4 }}>
                Total Paid Out
              </div>
              <div style={{ color: "#10b981", fontSize: 11, fontWeight: 600, marginTop: 4, display: "flex", alignItems: "center", gap: 3 }}>
                <ArrowUpRight style={{ width: 12, height: 12 }} /> Transferred to bank/PayPal
              </div>
            </div>
          </div>

          {/* Card 3: Pending Escrow */}
          <div style={{
            borderRadius: 18,
            padding: "18px 20px",
            background: "var(--surface)",
            border: "1px solid var(--border-strong)",
            boxShadow: "var(--shadow-card)",
            display: "flex",
            alignItems: "center",
            gap: 14
          }}>
            <div style={{
              width: 42, height: 42, borderRadius: 12,
              background: "#0ea5e9", display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", flexShrink: 0, boxShadow: "0 6px 14px rgba(14, 165, 233, 0.2)"
            }}>
              <Wallet style={{ width: 20, height: 20 }} />
            </div>

            <div>
              <div style={{ color: "var(--text)", fontWeight: 800, fontSize: 22, letterSpacing: "-0.03em", lineHeight: 1 }}>
                $2,750.50
              </div>
              <div style={{ color: "var(--text-subtle)", fontSize: 12, fontWeight: 500, marginTop: 4 }}>
                Pending Escrow
              </div>
              <div style={{ color: "var(--accent-text)", fontSize: 11, fontWeight: 600, marginTop: 4, display: "flex", alignItems: "center", gap: 3 }}>
                <ArrowUpRight style={{ width: 12, height: 12 }} /> Held until content approval
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* ── 4. MAIN CONTENT COLUMNS ── */}
      <div className="grid-responsive-2col" style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 20, marginTop: 4 }}>

        {/* Left Main Column: Active Campaign Briefs & Recent Uploads */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Active Campaign Briefs */}
          <div className="card" style={{ padding: "24px 24px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
              <div>
                <h3 style={{ color: "var(--text)", fontWeight: 800, fontSize: 17, margin: 0, letterSpacing: "-0.02em" }}>
                  Active Campaign Briefs
                </h3>
                <p style={{ color: "var(--text-subtle)", fontSize: 12, margin: "3px 0 0" }}>
                  3 deliverables in progress · Track your deadlines & submission status
                </p>
              </div>

              <Link href="/creator/deals" style={{ color: "var(--accent-text)", fontSize: 12, fontWeight: 700, textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
                View All My Briefs <ChevronRight style={{ width: 14, height: 14 }} />
              </Link>
            </div>

            {/* List of active briefs */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {activeBriefs.map((b, i) => (
                <div key={i} style={{
                  padding: "16px 18px",
                  borderRadius: 14,
                  background: "var(--surface-subtle)",
                  border: "1px solid var(--border)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12
                }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                      <div style={{ width: 34, height: 34, borderRadius: 10, background: "var(--surface)", border: "1px solid var(--border-strong)", color: "var(--accent-text)", fontWeight: 800, fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {b.brandInitial}
                      </div>
                      <div>
                        <div style={{ color: "var(--text)", fontWeight: 700, fontSize: 14 }}>{b.title}</div>
                        <div style={{ color: "var(--text-subtle)", fontSize: 11, marginTop: 2 }}>
                          {b.brand} • <span style={{ color: "var(--text-muted)", fontWeight: 600 }}>{b.type}</span>
                        </div>
                      </div>
                    </div>

                    <div style={{ textAlign: "right" }}>
                      <div style={{ color: "#10b981", fontWeight: 800, fontSize: 14 }}>{b.payout}</div>
                      <span className={`pill ${b.statusPill}`} style={{ fontSize: 10, marginTop: 3 }}>{b.status}</span>
                    </div>
                  </div>

                  {/* Progress & Deadline Bar */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, paddingTop: 8, borderTop: "1px solid var(--border)", flexWrap: "wrap" }}>
                    <div style={{ flex: 1, minWidth: 160 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--text-subtle)", marginBottom: 4, fontWeight: 500 }}>
                        <span>Deliverable Progress</span>
                        <span>{b.progress}%</span>
                      </div>
                      <div style={{ height: 5, background: "var(--progress-bg)", borderRadius: 999, overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${b.progress}%`, background: "linear-gradient(90deg, #0284c7, #38bdf8)", borderRadius: 999 }} />
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
                      <span style={{ fontSize: 11, color: b.deadline.includes("Tomorrow") ? "#ef4444" : "var(--text-subtle)", fontWeight: 600, display: "flex", alignItems: "center", gap: 3 }}>
                        <Clock style={{ width: 12, height: 12 }} />
                        {b.deadline}
                      </span>

                      <Link href="/creator/uploads" className="btn btn-primary" style={{ padding: "5px 12px", fontSize: 11, borderRadius: 8 }}>
                        Upload Content
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Uploads History */}
          <div className="card" style={{ padding: "24px 24px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
              <div>
                <h3 style={{ color: "var(--text)", fontWeight: 800, fontSize: 16, margin: 0, letterSpacing: "-0.02em" }}>
                  Recent Uploads
                </h3>
                <p style={{ color: "var(--text-subtle)", fontSize: 11, margin: "2px 0 0" }}>
                  Brand reviews & payouts
                </p>
              </div>

              <Link href="/creator/uploads" style={{ color: "var(--accent-text)", fontSize: 11, fontWeight: 700, textDecoration: "none" }}>
                View All
              </Link>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {recentSubmissions.map((s, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "12px 14px", borderRadius: 12,
                  background: "var(--surface-subtle)",
                  border: "1px solid var(--border)", gap: 10
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
                    <div style={{ width: 30, height: 30, borderRadius: 8, background: "rgba(14,165,233,0.1)", border: "1px solid rgba(14,165,233,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <PlayCircle style={{ width: 14, height: 14, color: "#38bdf8" }} />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ color: "var(--text)", fontWeight: 600, fontSize: 12, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{s.title}</div>
                      <div style={{ color: "var(--text-subtle)", fontSize: 10, marginTop: 1 }}>{s.brand} • {s.date}</div>
                    </div>
                  </div>

                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ color: s.amount.startsWith("+") ? "#10b981" : "var(--text)", fontWeight: 700, fontSize: 12 }}>{s.amount}</div>
                    <span className={`pill ${s.pill}`} style={{ fontSize: 9, marginTop: 2, padding: "2px 6px" }}>{s.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar Column: Upcoming Deadlines & Recent Notifications */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

          {/* 📅 UPCOMING DEADLINES WIDGET */}
          <div className="card" style={{ padding: "22px 20px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Calendar style={{ width: 16, height: 16, color: "#0284c7" }} />
                <h3 style={{ color: "var(--text)", fontWeight: 800, fontSize: 15, margin: 0 }}>Upcoming Deadlines</h3>
              </div>
              <span className="pill pill-blue" style={{ fontSize: 10 }}>{upcomingDeadlines.length} Active</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {upcomingDeadlines.map((d, i) => (
                <div
                  key={i}
                  style={{
                    padding: "12px 14px",
                    borderRadius: 12,
                    background: d.urgent ? "rgba(239, 68, 68, 0.06)" : "var(--surface-subtle)",
                    border: `1px solid ${d.urgent ? "rgba(239, 68, 68, 0.2)" : "var(--border)"}`,
                    display: "flex",
                    flexDirection: "column",
                    gap: 8
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
                    <div>
                      <div style={{ color: "var(--text)", fontWeight: 700, fontSize: 12, lineHeight: 1.3 }}>{d.title}</div>
                      <div style={{ color: "var(--text-subtle)", fontSize: 11, marginTop: 2 }}>{d.brand}</div>
                    </div>
                    {d.urgent && (
                      <span style={{ fontSize: 9, fontWeight: 700, background: "#ef4444", color: "#fff", padding: "2px 6px", borderRadius: 4, flexShrink: 0 }}>
                        URGENT
                      </span>
                    )}
                  </div>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 11 }}>
                    <span style={{ color: d.urgent ? "#ef4444" : "var(--text-subtle)", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
                      <Clock style={{ width: 11, height: 11 }} /> {d.due}
                    </span>
                    <Link href={d.link} style={{ color: "var(--accent-text)", fontWeight: 700, textDecoration: "none", fontSize: 11 }}>
                      {d.actionText} →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 🔔 RECENT NOTIFICATIONS WIDGET */}
          <div className="card" style={{ padding: "22px 20px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Bell style={{ width: 16, height: 16, color: "#8b5cf6" }} />
                <h3 style={{ color: "var(--text)", fontWeight: 800, fontSize: 15, margin: 0 }}>Recent Notifications</h3>
              </div>
              <span style={{ fontSize: 11, color: "var(--accent-text)", fontWeight: 600, cursor: "pointer" }}>Mark read</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {notifications.map((n) => {
                const NotifIcon = n.icon;
                return (
                  <div
                    key={n.id}
                    style={{
                      padding: "12px 14px",
                      borderRadius: 12,
                      background: n.unread ? "rgba(14, 165, 233, 0.05)" : "var(--surface-subtle)",
                      border: `1px solid ${n.unread ? "rgba(14, 165, 233, 0.2)" : "var(--border)"}`,
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 10
                    }}
                  >
                    <div style={{
                      width: 28, height: 28, borderRadius: 8,
                      background: n.type === "payout" ? "rgba(16,185,129,0.12)" : n.type === "revision" ? "rgba(239,68,68,0.12)" : "rgba(14,165,233,0.12)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: n.type === "payout" ? "#10b981" : n.type === "revision" ? "#ef4444" : "#0284c7",
                      flexShrink: 0
                    }}>
                      <NotifIcon style={{ width: 14, height: 14 }} />
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ color: "var(--text)", fontWeight: n.unread ? 700 : 500, fontSize: 12, lineHeight: 1.3 }}>
                        {n.title}
                      </div>
                      <div style={{ color: "var(--text-subtle)", fontSize: 10, marginTop: 3 }}>
                        {n.time}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
