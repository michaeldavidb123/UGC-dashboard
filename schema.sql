-- ============================================
-- UGC Studio — Supabase Database Schema v3
-- Run this in your Supabase SQL Editor
-- Last updated: reflects all UI features built
-- ============================================

-- Enable required extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pg_stat_statements";

-- ============================================
-- ENUMS
-- ============================================

-- Top-level roles
create type user_role as enum ('admin', 'user');

-- Sub-type for users
-- creator: submits UGC content for campaigns
-- normal:  brand / buyer browsing and posting campaigns
create type user_type as enum ('creator', 'normal');

-- Campaign lifecycle
create type campaign_status as enum (
  'draft',      -- brand is editing, not yet visible
  'active',     -- live, accepting creator applications
  'reviewing',  -- brand is reviewing submissions
  'completed',  -- all deliverables accepted, payments released
  'paused',     -- temporarily hidden by brand
  'cancelled'   -- campaign removed
);

-- Content format
create type content_type as enum ('video', 'photo', 'video_photo');

-- Creator application to a campaign
create type application_status as enum (
  'pending',   -- waiting for brand decision
  'approved',  -- brand accepted the creator
  'rejected',  -- brand declined
  'withdrawn'  -- creator pulled out
);

-- Submission review status (what the creator sees on /submissions)
create type submission_status as enum (
  'draft',              -- creator saved but not sent
  'submitted',          -- sent to brand for review
  'under_review',       -- brand actively reviewing
  'revision_requested', -- brand asked for changes
  'approved',           -- brand accepted
  'rejected'            -- brand rejected
);

-- Payout request lifecycle
create type payout_request_status as enum (
  'pending_review', -- just submitted by creator
  'approved',       -- admin approved, ready to pay
  'processing',     -- payment being sent
  'paid',           -- funds delivered
  'rejected'        -- admin declined the request
);

-- Payout method
create type payout_method as enum (
  'bank_transfer',
  'paypal',
  'stripe',
  'wise'
);

-- Earning entry status (what appears in the earnings table)
create type earning_status as enum (
  'pending',    -- campaign approved but not yet cleared
  'processing', -- clearance period running
  'available',  -- ready to withdraw
  'paid_out'    -- already included in a completed payout
);

-- Ledger entry direction
create type transaction_type as enum ('credit', 'debit', 'refund', 'adjustment');

-- Notification types
create type notification_type as enum (
  'campaign_invite',
  'submission_approved',
  'submission_revision',
  'submission_rejected',
  'payout_processed',
  'payout_rejected',
  'deadline_reminder',
  'general'
);

-- ============================================
-- PROFILES (extends Supabase auth.users)
-- ============================================
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  full_name text,
  username  text unique,
  email     text,

  role      user_role not null default 'user',
  user_type user_type default 'creator',

  avatar_url       text,
  cover_url        text,   -- profile cover/banner photo
  bio              text,
  website          text,
  phone_number     text,

  -- Social handles (collected during onboarding & editable on profile)
  instagram_handle    text,
  tiktok_handle       text,
  youtube_url         text,
  twitter_handle      text,

  -- Location
  country       text,
  city          text,
  street_address text,

  niches text[] default '{}',

  -- Notification preferences (profile page toggles)
  notif_email            boolean default true,
  notif_sms              boolean default false,
  notif_campaign_invites boolean default true,
  notif_payment_updates  boolean default true,
  notif_marketing        boolean default false,

  -- Referral System
  referral_code    text unique,        -- e.g. "SARAH2025"
  referred_by_code text,               -- code used during sign up

  -- Onboarding
  onboarding_complete boolean default false,
  onboarding_step     integer default 0,

  is_active  boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);


-- ============================================
-- CREATOR PROFILE (extended fields for creators)
-- ============================================
create table public.creator_profiles (
  id uuid references public.profiles(id) on delete cascade primary key,

  -- Rates
  rate_short_video numeric(10,2) default 150,
  rate_long_video  numeric(10,2) default 250,
  rate_photo_pack  numeric(10,2) default 120,
  rate_bundle      numeric(10,2) default 350,

  -- Earnings summary (kept in sync by triggers/functions)
  total_earned       numeric(12,2) default 0,
  total_paid_out     numeric(12,2) default 0,
  available_balance  numeric(12,2) default 0,
  pending_clearance  numeric(12,2) default 0,

  -- Performance
  approval_rate      numeric(5,2) default 0,  -- percentage
  total_submissions  integer default 0,
  completed_briefs   integer default 0,
  active_campaigns   integer default 0,
  rating             numeric(3,2) default 0,

  -- Profile detail
  portfolio_urls       text[] default '{}',       -- simple URL list (legacy)
  portfolio_links      jsonb  default '[]'::jsonb, -- [{label, url, type}] from profile page
  content_categories   text[] default '{}',        -- niche chips (mirrors profiles.niches)
  content_preferences  text[] default '{}',        -- content type chips (Product Reviews, etc.)
  languages            text[] default '{}',
  timezone             text,
  location             text,
  experience_years     text,                       -- "Less than 1 year" / "1–2 years" etc.
  follower_count       integer default 0,
  is_available         boolean default true,

  -- Social follower counts (entered during onboarding Step 3)
  instagram_followers    text,   -- e.g. "120K"
  tiktok_followers       text,
  youtube_subscribers    text,

  -- Audience Insights (manual / API analytics — profile page)
  audience_country      text,
  audience_age_range    text,
  audience_gender_split text,
  engagement_rate       numeric(5,2) default 0,
  avg_views             text,
  avg_reach             text,

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================
-- BRAND / NORMAL USER PROFILE
-- ============================================
create table public.normal_profiles (
  id uuid references public.profiles(id) on delete cascade primary key,

  company_name       text,
  company_website    text,
  industry           text,
  company_size       text,  -- e.g. '1-10', '11-50', '51-200', '201+'
  country            text,
  phone_number       text,
  logo_url           text,
  brand_description  text,

  -- Creator Content Guidelines & Brief Defaults
  target_audience    text,
  content_guidelines text,

  -- Escrow Wallet
  escrow_balance     numeric(12,2) default 0.00,
  locked_escrow      numeric(12,2) default 0.00,

  -- Stats (synced by triggers)
  total_campaigns    integer default 0,
  total_spent        numeric(12,2) default 0,
  active_campaigns   integer default 0,

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Brand team members & permissions
create table public.brand_team_members (
  id uuid default uuid_generate_v4() primary key,
  brand_id uuid references public.normal_profiles(id) on delete cascade not null,
  user_id  uuid references public.profiles(id) on delete set null,
  email    text not null,
  role     text not null default 'Campaign Manager', -- 'Owner' | 'Admin' | 'Campaign Manager'
  status   text not null default 'Pending',          -- 'Active' | 'Pending'
  created_at timestamptz default now()
);

-- ============================================
-- SUBSCRIPTION PLANS (admin-editable)
-- ============================================
create table public.subscription_plans (
  id uuid default uuid_generate_v4() primary key,
  name         text not null,
  slug         text unique not null,        -- 'creator_free', 'creator_pro', 'brand_growth' etc.
  user_type    user_type not null,          -- 'creator' | 'normal' (brand)
  price_monthly  numeric(10,2) not null,
  price_yearly   numeric(10,2),             -- discounted annual price (optional)
  description  text,
  features     jsonb default '[]'::jsonb,   -- ["Feature one", "Feature two", ...]
  limits       jsonb default '{}'::jsonb,   -- {"max_campaigns": 5, "max_submissions": 20}
  is_popular   boolean default false,       -- highlights "Most Popular" badge
  is_active    boolean default true,
  sort_order   integer default 0,
  created_at   timestamptz default now(),
  updated_at   timestamptz default now()
);

-- Seed default plans
insert into public.subscription_plans (name, slug, user_type, price_monthly, price_yearly, description, features, limits, is_popular, sort_order) values
  -- Creator plans
  ('Free',   'creator_free',  'creator',  0,    null,  'Get started with UGC Studio at no cost.',
   '["Apply to 2 campaigns/month","Basic analytics","Community support","Standard payout (weekly)"]'::jsonb,
   '{"max_campaigns":2,"max_submissions":5}'::jsonb,
   false, 1),
  ('Pro',    'creator_pro',   'creator',  29,   290,   'For active creators serious about UGC income.',
   '["Apply to 20 campaigns/month","Priority campaign matching","Advanced analytics","Faster payout (3 days)","Profile badge"]'::jsonb,
   '{"max_campaigns":20,"max_submissions":50}'::jsonb,
   true, 2),
  ('Elite',  'creator_elite', 'creator',  79,   790,   'For top creators scaling their content business.',
   '["Unlimited campaigns","Dedicated account manager","Real-time analytics","Same-day payout","Elite badge + priority listing","Early access to premium brands"]'::jsonb,
   '{"max_campaigns":-1,"max_submissions":-1}'::jsonb,
   false, 3),

  -- Brand plans
  ('Starter',    'brand_starter',    'normal', 99,  990,   'Launch your first UGC campaigns.',
   '["3 active campaigns","Up to 15 creator slots","Basic analytics","Email support","Standard creator pool"]'::jsonb,
   '{"max_active_campaigns":3,"max_creators_per_campaign":15}'::jsonb,
   false, 1),
  ('Growth',     'brand_growth',     'normal', 299, 2990,  'Scale your content production.',
   '["15 active campaigns","Up to 50 creator slots","Advanced analytics & reporting","Priority support","Featured brand listing","Custom brief templates"]'::jsonb,
   '{"max_active_campaigns":15,"max_creators_per_campaign":50}'::jsonb,
   true, 2),
  ('Enterprise', 'brand_enterprise', 'normal', 999, 9990,  'Full-scale UGC operations.',
   '["Unlimited campaigns","Unlimited creator slots","White-glove onboarding","Dedicated account manager","Custom integrations","SLA guarantee","Invoiced billing"]'::jsonb,
   '{"max_active_campaigns":-1,"max_creators_per_campaign":-1}'::jsonb,
   false, 3);

-- ============================================
-- USER SUBSCRIPTIONS
-- ============================================
create type subscription_status as enum (
  'pending',    -- plan selected, payment not yet confirmed
  'active',     -- paying and active
  'past_due',   -- payment failed, grace period
  'cancelled',  -- user cancelled, access until period_end
  'expired',    -- period ended, no renewal
  'trialing'    -- on a free trial
);

create table public.user_subscriptions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  plan_id uuid references public.subscription_plans(id) not null,

  status        subscription_status default 'pending',
  billing_cycle text default 'monthly',   -- 'monthly' | 'yearly'
  price_paid    numeric(10,2) not null,

  -- Period
  starts_at  timestamptz,
  ends_at    timestamptz,
  trial_ends_at timestamptz,

  cancelled_at  timestamptz,
  auto_renew    boolean default true,

  -- Gateway reference (Stripe subscription ID, etc.)
  external_subscription_id text,

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================
-- DEPOSITS / PAYMENTS
-- ============================================
create type deposit_status as enum (
  'pending',    -- awaiting processing
  'processing', -- being charged
  'completed',  -- payment confirmed
  'failed',     -- charge declined
  'refunded'    -- money returned
);

create table public.deposits (
  id uuid default uuid_generate_v4() primary key,
  user_id         uuid references public.profiles(id) on delete cascade not null,
  subscription_id uuid references public.user_subscriptions(id),

  amount    numeric(10,2) not null,
  currency  text default 'USD',
  status    deposit_status default 'pending',

  -- Payment method details
  payment_method  text,              -- 'card' | 'bank_transfer' | 'paypal'
  card_last_four  text,              -- last 4 digits for display
  card_brand      text,              -- 'visa' | 'mastercard' | 'amex'
  card_holder     text,

  -- Gateway
  external_reference text,           -- Stripe PaymentIntent ID etc.

  description text,
  notes       text,                  -- admin notes

  processed_at timestamptz,
  processed_by uuid references public.profiles(id),

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================
-- REFERRALS SYSTEM
-- ============================================
create type referral_status as enum (
  'pending',   -- referee signed up, waiting for first action (campaign launch or brief completion)
  'rewarded',  -- condition met, reward credited
  'expired',   -- condition not met within time limit
  'canceled'   -- referral disqualified
);

create table public.referrals (
  id uuid default uuid_generate_v4() primary key,
  referrer_id  uuid references public.profiles(id) on delete cascade not null, -- person who owns the code
  referee_id   uuid references public.profiles(id) on delete cascade not null, -- person who used the code
  referral_code text not null,

  user_type     user_type not null default 'creator', -- referee's user type ('creator' | 'normal')
  status        referral_status default 'pending',

  reward_amount  numeric(10,2) default 50.00,
  reward_type    text default 'cash_credit',  -- 'cash_credit' | 'payout' | 'discount'

  rewarded_at    timestamptz,
  notes          text,

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Global referral configuration (managed in admin settings)
create table public.referral_settings (
  id integer primary key default 1 check (id = 1),
  creator_reward_amount numeric(10,2) default 50.00, -- reward given when referred creator completes 1st brief
  brand_reward_amount   numeric(10,2) default 100.00, -- reward given when referred brand launches 1st campaign
  min_payout_threshold numeric(10,2) default 50.00,
  is_enabled            boolean default true,
  updated_at timestamptz default now()
);

insert into public.referral_settings (id, creator_reward_amount, brand_reward_amount)
values (1, 50.00, 100.00)
on conflict (id) do nothing;

-- ============================================
-- COMMUNITY & FORUM SYSTEM
-- ============================================
create type post_category as enum (
  'general',
  'tips_tricks',
  'brief_help',
  'showcase',
  'collaboration',
  'announcement'
);

create type post_status as enum (
  'active',
  'hidden',
  'flagged',
  'archived'
);

create table public.community_posts (
  id uuid default uuid_generate_v4() primary key,
  author_id uuid references public.profiles(id) on delete cascade not null,

  category   post_category default 'general',
  title      text not null,
  content    text not null,
  media_urls text[] default '{}',

  likes_count    integer default 0,
  comments_count integer default 0,

  is_pinned  boolean default false,
  is_flagged boolean default false,
  status     post_status default 'active',

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.post_comments (
  id uuid default uuid_generate_v4() primary key,
  post_id   uuid references public.community_posts(id) on delete cascade not null,
  author_id uuid references public.profiles(id) on delete cascade not null,

  content     text not null,
  likes_count integer default 0,

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.post_likes (
  user_id uuid references public.profiles(id) on delete cascade not null,
  post_id uuid references public.community_posts(id) on delete cascade not null,
  created_at timestamptz default now(),
  primary key (user_id, post_id)
);





-- ============================================
-- CAMPAIGNS
-- ============================================
create table public.campaigns (
  id uuid default uuid_generate_v4() primary key,
  owner_id uuid references public.profiles(id) on delete cascade not null,

  -- Identity
  brand_name text,                  -- denormalised from normal_profiles for fast reads
  image_url  text,                  -- campaign cover image
  title      text not null,
  description text not null,

  -- Content specs
  content_type  content_type not null default 'video',
  niche         text,
  duration_min  integer,            -- seconds
  duration_max  integer,            -- seconds

  -- Brief detail fields (shown inside the brief drawer)
  deliverables   text[] default '{}',   -- e.g. ["1x 30s Reel", "3x Photos"]
  required_shots text[] default '{}',   -- step-by-step shot list
  dos            text[] default '{}',
  donts          text[] default '{}',
  brand_assets   text[] default '{}',   -- file URLs for logos, overlays etc.
  reference_files text[] default '{}',  -- example video/photo URLs
  requirements   text,                  -- free-text additional notes

  -- Finance
  budget          numeric(10,2) not null,
  pay_per_creator numeric(10,2) not null,
  max_creators    integer default 10,
  spots_remaining integer,

  -- Deadline
  deadline date,

  -- Lifecycle
  status     campaign_status default 'active',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================
-- CAMPAIGN APPLICATIONS (creators apply)
-- ============================================
create table public.applications (
  id uuid default uuid_generate_v4() primary key,
  campaign_id uuid references public.campaigns(id) on delete cascade not null,
  creator_id  uuid references public.profiles(id) on delete cascade not null,
  message     text,
  status      application_status default 'pending',
  created_at  timestamptz default now(),
  unique (campaign_id, creator_id)
);

-- ============================================
-- SUBMISSION FILES
-- Separate table so each submission can have
-- multiple uploaded files with metadata
-- ============================================
create table public.submission_files (
  id            uuid default uuid_generate_v4() primary key,
  submission_id uuid references public.submissions(id) on delete cascade not null,
  file_url      text not null,         -- Supabase Storage public URL
  file_name     text not null,
  file_type     text,                  -- 'video', 'image', 'document'
  file_size     bigint,                -- bytes
  duration      integer,               -- seconds (for video)
  version       integer default 1,     -- increments on each resubmission
  created_at    timestamptz default now()
);

-- ============================================
-- CONTENT SUBMISSIONS
-- ============================================
create table public.submissions (
  id uuid default uuid_generate_v4() primary key,
  campaign_id   uuid references public.campaigns(id) on delete cascade not null,
  creator_id    uuid references public.profiles(id) on delete cascade not null,
  application_id uuid references public.applications(id),

  -- Notes written by the creator when submitting
  creator_notes text,

  -- Current version number (increments on resubmission)
  version integer default 1,

  -- Status (mirrors submission_status enum)
  status submission_status default 'draft',

  -- Earnings for this submission (set when approved)
  amount numeric(10,2),

  -- Review metadata
  reviewed_at  timestamptz,
  reviewed_by  uuid references public.profiles(id),

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================
-- SUBMISSION FEEDBACK / MESSAGE THREAD
-- Stores the full back-and-forth history
-- between brand and creator on each submission
-- ============================================
create table public.submission_feedback (
  id            uuid default uuid_generate_v4() primary key,
  submission_id uuid references public.submissions(id) on delete cascade not null,
  author_id     uuid references public.profiles(id) on delete cascade not null,
  from_role     text not null check (from_role in ('brand', 'creator', 'admin')),
  message       text not null,
  version       integer,              -- which submission version this refers to
  created_at    timestamptz default now()
);

-- ============================================
-- CREATOR PAYMENT METHODS
-- ============================================
create table public.payment_methods (
  id         uuid default uuid_generate_v4() primary key,
  creator_id uuid references public.profiles(id) on delete cascade not null,

  method      payout_method not null default 'bank_transfer',
  is_default  boolean default false,
  is_verified boolean default false,

  -- Bank transfer fields
  account_holder_name text,
  bank_name           text,
  account_number      text,   -- store encrypted in production
  routing_code        text,   -- routing / sort code
  iban                text,
  swift_code          text,
  country             text,
  currency            text default 'USD',

  -- PayPal / Wise / Stripe
  account_email text,
  external_id   text,         -- e.g. Stripe Connect account ID

  -- Masking for display (e.g. "4821")
  last_four text,

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================
-- EARNINGS (per-campaign payment record)
-- Created when a submission is approved
-- ============================================
create table public.earnings (
  id            uuid default uuid_generate_v4() primary key,
  creator_id    uuid references public.profiles(id) on delete cascade not null,
  campaign_id   uuid references public.campaigns(id) not null,
  submission_id uuid references public.submissions(id) not null,

  amount   numeric(10,2) not null,
  status   earning_status default 'pending',

  -- Clearance tracking
  clears_at    timestamptz,  -- when the earning becomes 'available'
  cleared_at   timestamptz,  -- actual clearance timestamp

  -- Which payout this was bundled into (set when paid_out)
  payout_id uuid references public.payouts(id),

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================
-- PAYOUT REQUESTS (creator withdrawal requests)
-- ============================================
create table public.payouts (
  id         uuid default uuid_generate_v4() primary key,
  creator_id uuid references public.profiles(id) on delete cascade not null,
  payment_method_id uuid references public.payment_methods(id),

  amount   numeric(10,2) not null,
  currency text default 'USD',
  status   payout_request_status default 'pending_review',

  -- Admin handling
  notes        text,
  processed_at timestamptz,
  processed_by uuid references public.profiles(id),

  -- Reference for bank / payment gateway
  external_reference text,

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================
-- TRANSACTIONS LEDGER
-- Full audit trail of every money movement
-- ============================================
create table public.transactions (
  id uuid default uuid_generate_v4() primary key,
  user_id       uuid references public.profiles(id) on delete cascade not null,
  submission_id uuid references public.submissions(id),
  earning_id    uuid references public.earnings(id),
  payout_id     uuid references public.payouts(id),

  type        transaction_type not null,
  amount      numeric(10,2) not null,
  balance_after numeric(12,2),       -- snapshot of creator balance after this tx
  description text,
  created_at  timestamptz default now()
);

-- ============================================
-- NOTIFICATIONS
-- ============================================
create table public.notifications (
  id          uuid default uuid_generate_v4() primary key,
  user_id     uuid references public.profiles(id) on delete cascade not null,
  type        notification_type not null default 'general',
  title       text not null,
  message     text,
  is_read     boolean default false,
  action_url  text,    -- e.g. "/submissions?id=xyz"
  created_at  timestamptz default now()
);

-- ============================================
-- PLATFORM SETTINGS (admin-controlled)
-- One row, managed by admins via the Settings page
-- ============================================
create table public.platform_settings (
  id uuid default uuid_generate_v4() primary key,

  -- General
  platform_name     text default 'UGC Studio',
  platform_url      text default 'https://ugcstudio.com',
  support_email     text default 'support@ugcstudio.com',
  default_currency  text default 'USD',

  -- Finance
  commission_rate             numeric(5,2) default 15,   -- % taken from creator payout
  minimum_withdrawal_amount   numeric(10,2) default 50,  -- enforced on Request Payout
  maximum_withdrawal_amount   numeric(10,2) default 5000,
  payout_processing_days      integer default 3,         -- business days
  earnings_clearance_days     integer default 7,         -- days after approval before available

  -- Creator policy
  max_revision_rounds           integer default 3,
  submission_review_window_days integer default 7,
  max_active_campaigns_creator  integer default 5,
  content_approval_timeout_days integer default 14,

  -- Feature flags
  auto_approve_creators            boolean default true,
  require_id_verification_above    numeric(10,2) default 500,
  allow_multi_brief_applications   boolean default false,

  updated_at  timestamptz default now(),
  updated_by  uuid references public.profiles(id)
);

-- Seed one row so backend can always do a single SELECT
insert into public.platform_settings default values;

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
alter table public.profiles           enable row level security;
alter table public.creator_profiles   enable row level security;
alter table public.normal_profiles    enable row level security;
alter table public.campaigns          enable row level security;
alter table public.applications       enable row level security;
alter table public.submissions        enable row level security;
alter table public.submission_files   enable row level security;
alter table public.submission_feedback enable row level security;
alter table public.payment_methods    enable row level security;
alter table public.earnings           enable row level security;
alter table public.payouts            enable row level security;
alter table public.transactions       enable row level security;
alter table public.notifications      enable row level security;
alter table public.platform_settings  enable row level security;

-- ── Profiles ──
create policy "Profiles viewable by all"     on public.profiles for select using (true);
create policy "Users update own profile"     on public.profiles for update using (auth.uid() = id);
create policy "Users insert own profile"     on public.profiles for insert with check (auth.uid() = id);
create policy "Admins full access profiles"  on public.profiles for all
  using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

-- ── Campaigns ──
create policy "Active campaigns visible to all" on public.campaigns for select
  using (status = 'active' or owner_id = auth.uid());
create policy "Owners manage campaigns"      on public.campaigns for all using (owner_id = auth.uid());
create policy "Admins full access campaigns" on public.campaigns for all
  using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

-- ── Submissions ──
create policy "Creators see own submissions"     on public.submissions for select using (creator_id = auth.uid());
create policy "Creators insert submissions"      on public.submissions for insert with check (creator_id = auth.uid());
create policy "Creators update own submissions"  on public.submissions for update using (creator_id = auth.uid());
-- Brand (campaign owner) can view submissions for their campaigns
create policy "Brand views their campaign submissions" on public.submissions for select
  using (exists (select 1 from public.campaigns where id = campaign_id and owner_id = auth.uid()));
create policy "Admins full access submissions"   on public.submissions for all
  using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

-- ── Submission Files ──
create policy "Creators manage own files"    on public.submission_files for all
  using (exists (select 1 from public.submissions where id = submission_id and creator_id = auth.uid()));
create policy "Brands view files"            on public.submission_files for select
  using (exists (
    select 1 from public.submissions s
    join public.campaigns c on c.id = s.campaign_id
    where s.id = submission_id and c.owner_id = auth.uid()
  ));

-- ── Submission Feedback ──
create policy "Participants view feedback"   on public.submission_feedback for select
  using (
    author_id = auth.uid() or
    exists (select 1 from public.submissions where id = submission_id and creator_id = auth.uid()) or
    exists (
      select 1 from public.submissions s
      join public.campaigns c on c.id = s.campaign_id
      where s.id = submission_id and c.owner_id = auth.uid()
    )
  );
create policy "Participants post feedback"   on public.submission_feedback for insert
  with check (author_id = auth.uid());

-- ── Payment Methods ──
create policy "Creators manage own payment methods" on public.payment_methods for all
  using (creator_id = auth.uid());
create policy "Admins view payment methods"         on public.payment_methods for select
  using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

-- ── Earnings ──
create policy "Creators see own earnings"    on public.earnings for select using (creator_id = auth.uid());
create policy "Admins full access earnings"  on public.earnings for all
  using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

-- ── Payouts ──
create policy "Creators see own payouts"     on public.payouts for select using (creator_id = auth.uid());
create policy "Creators request payouts"     on public.payouts for insert with check (creator_id = auth.uid());
create policy "Admins full access payouts"   on public.payouts for all
  using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

-- ── Transactions ──
create policy "Users see own transactions"   on public.transactions for select using (user_id = auth.uid());
create policy "Admins full access transactions" on public.transactions for all
  using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

-- ── Notifications ──
create policy "Users see own notifications"  on public.notifications for select using (user_id = auth.uid());
create policy "Users mark notifications read" on public.notifications for update using (user_id = auth.uid());
create policy "Admins full access notifications" on public.notifications for all
  using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

-- ── Platform Settings ──
create policy "Anyone can read settings"     on public.platform_settings for select using (true);
create policy "Admins manage settings"       on public.platform_settings for all
  using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Auto-create profile row on Supabase auth signup
create or replace function public.handle_new_user()
returns trigger as $$
declare
  v_role      user_role;
  v_user_type user_type;
begin
  v_role      := coalesce((new.raw_user_meta_data->>'role')::user_role, 'user');
  v_user_type := coalesce((new.raw_user_meta_data->>'user_type')::user_type, 'creator');

  insert into public.profiles (id, full_name, email, role, user_type)
  values (new.id, new.raw_user_meta_data->>'full_name', new.email, v_role, v_user_type);

  if v_role = 'user' and v_user_type = 'creator' then
    insert into public.creator_profiles (id) values (new.id);
  elsif v_role = 'user' and v_user_type = 'normal' then
    insert into public.normal_profiles (id) values (new.id);
  end if;

  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Auto-update updated_at timestamps
create or replace function public.update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_profiles_updated_at        before update on public.profiles        for each row execute procedure public.update_updated_at();
create trigger set_creator_profiles_updated   before update on public.creator_profiles for each row execute procedure public.update_updated_at();
create trigger set_normal_profiles_updated    before update on public.normal_profiles  for each row execute procedure public.update_updated_at();
create trigger set_campaigns_updated_at       before update on public.campaigns        for each row execute procedure public.update_updated_at();
create trigger set_submissions_updated_at     before update on public.submissions      for each row execute procedure public.update_updated_at();
create trigger set_earnings_updated_at        before update on public.earnings         for each row execute procedure public.update_updated_at();
create trigger set_payouts_updated_at         before update on public.payouts          for each row execute procedure public.update_updated_at();
create trigger set_payment_methods_updated    before update on public.payment_methods  for each row execute procedure public.update_updated_at();

-- ── When a submission is approved:
--    1. Create an earnings record
--    2. Write a credit transaction
--    3. Schedule clearance (based on platform_settings.earnings_clearance_days)
--    4. Notify the creator
create or replace function public.handle_submission_approved()
returns trigger as $$
declare
  v_campaign      public.campaigns%rowtype;
  v_settings      public.platform_settings%rowtype;
  v_clearing_date timestamptz;
  v_earning_id    uuid;
begin
  if new.status = 'approved' and old.status <> 'approved' then
    select * into v_campaign from public.campaigns where id = new.campaign_id;
    select * into v_settings from public.platform_settings limit 1;

    v_clearing_date := now() + (v_settings.earnings_clearance_days || ' days')::interval;

    -- Insert earning record
    insert into public.earnings (creator_id, campaign_id, submission_id, amount, status, clears_at)
    values (new.creator_id, new.campaign_id, new.id, new.amount, 'pending', v_clearing_date)
    returning id into v_earning_id;

    -- Write transaction
    insert into public.transactions (user_id, submission_id, earning_id, type, amount, description)
    values (new.creator_id, new.id, v_earning_id, 'credit', new.amount,
            'Campaign payment: ' || v_campaign.title);

    -- Notify creator
    insert into public.notifications (user_id, type, title, message, action_url)
    values (
      new.creator_id,
      'submission_approved',
      'Submission Approved!',
      'Your submission for "' || v_campaign.title || '" was approved. $' || new.amount || ' is pending clearance.',
      '/earnings'
    );

    -- Update creator profile totals
    update public.creator_profiles
    set
      total_earned      = total_earned + new.amount,
      pending_clearance = pending_clearance + new.amount,
      total_submissions = total_submissions + 1,
      completed_briefs  = completed_briefs + 1
    where id = new.creator_id;
  end if;
  return new;
end;
$$ language plpgsql security definer;

create trigger on_submission_approved
  after update on public.submissions
  for each row execute procedure public.handle_submission_approved();

-- ── When an earning clears (clears_at passed):
--    Move status from 'pending'/'processing' → 'available'
--    Update creator_profiles.available_balance
--    (This would be called by a cron job / scheduled function)
create or replace function public.release_cleared_earnings()
returns void as $$
declare
  v_earning public.earnings%rowtype;
begin
  for v_earning in
    select * from public.earnings
    where status in ('pending', 'processing')
      and clears_at <= now()
  loop
    update public.earnings set status = 'available', cleared_at = now()
    where id = v_earning.id;

    update public.creator_profiles
    set
      available_balance = available_balance + v_earning.amount,
      pending_clearance = pending_clearance - v_earning.amount
    where id = v_earning.creator_id;
  end loop;
end;
$$ language plpgsql security definer;

-- ── When a payout request is marked 'paid':
--    Mark bundled earnings as 'paid_out'
--    Update creator_profiles totals
--    Notify creator
create or replace function public.handle_payout_paid()
returns trigger as $$
begin
  if new.status = 'paid' and old.status <> 'paid' then
    -- Mark earnings as paid_out
    update public.earnings
    set status = 'paid_out', payout_id = new.id
    where creator_id = new.creator_id
      and status = 'available';

    -- Update creator balance
    update public.creator_profiles
    set
      available_balance = available_balance - new.amount,
      total_paid_out    = total_paid_out + new.amount
    where id = new.creator_id;

    -- Write debit transaction
    insert into public.transactions (user_id, payout_id, type, amount, description)
    values (new.creator_id, new.id, 'debit', new.amount, 'Payout sent via ' || new.currency);

    -- Notify creator
    insert into public.notifications (user_id, type, title, message, action_url)
    values (
      new.creator_id,
      'payout_processed',
      'Payout Sent!',
      '$' || new.amount || ' has been sent to your account. It should arrive within 1–3 business days.',
      '/earnings'
    );

    -- Mark new.processed_at
    new.processed_at := now();
  end if;
  return new;
end;
$$ language plpgsql security definer;

create trigger on_payout_paid
  after update on public.payouts
  for each row execute procedure public.handle_payout_paid();

-- ── Validate payout request against minimum withdrawal
--    Raises an error before insert if balance < minimum
create or replace function public.validate_payout_request()
returns trigger as $$
declare
  v_balance  numeric(12,2);
  v_min      numeric(10,2);
begin
  select available_balance into v_balance
  from public.creator_profiles where id = new.creator_id;

  select minimum_withdrawal_amount into v_min
  from public.platform_settings limit 1;

  if new.amount < v_min then
    raise exception 'Minimum withdrawal is $%. Your requested amount ($%) is below the threshold.', v_min, new.amount;
  end if;

  if new.amount > v_balance then
    raise exception 'Insufficient balance. Available: $%, Requested: $%.', v_balance, new.amount;
  end if;

  return new;
end;
$$ language plpgsql security definer;

create trigger before_payout_insert
  before insert on public.payouts
  for each row execute procedure public.validate_payout_request();

-- ============================================
-- INDEXES (for performance)
-- ============================================
create index idx_campaigns_owner       on public.campaigns(owner_id);
create index idx_campaigns_status      on public.campaigns(status);
create index idx_applications_campaign on public.applications(campaign_id);
create index idx_applications_creator  on public.applications(creator_id);
create index idx_submissions_campaign  on public.submissions(campaign_id);
create index idx_submissions_creator   on public.submissions(creator_id);
create index idx_submissions_status    on public.submissions(status);
create index idx_submission_files_sub  on public.submission_files(submission_id);
create index idx_feedback_submission   on public.submission_feedback(submission_id);
create index idx_earnings_creator      on public.earnings(creator_id);
create index idx_earnings_status       on public.earnings(status);
create index idx_earnings_clears_at    on public.earnings(clears_at);
create index idx_payouts_creator       on public.payouts(creator_id);
create index idx_payouts_status        on public.payouts(status);
create index idx_transactions_user     on public.transactions(user_id);
create index idx_notifications_user    on public.notifications(user_id, is_read);
create index idx_payment_methods_creator on public.payment_methods(creator_id);

-- ============================================
-- HELPER FUNCTIONS
-- ============================================

-- Get current authenticated user's role
create or replace function public.get_my_role()
returns user_role as $$
  select role from public.profiles where id = auth.uid();
$$ language sql security definer;

-- Get current authenticated user's type
create or replace function public.get_my_user_type()
returns user_type as $$
  select user_type from public.profiles where id = auth.uid();
$$ language sql security definer;

-- Get the single platform settings row safely
create or replace function public.get_platform_settings()
returns public.platform_settings as $$
  select * from public.platform_settings limit 1;
$$ language sql security definer;
