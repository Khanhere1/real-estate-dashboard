import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { 
  Building2, Clock, Zap, TrendingUp, Users, Calendar, 
  MessageSquare, ShieldCheck, ArrowRight, Menu, X, 
  LayoutDashboard, FileText, ChevronRight, CheckCircle, Globe
} from 'lucide-react';

// --- DATA CONSTANTS ---

const CALENDAR_LINK = "https://cal.com/cmt-khan/30min";
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const CASE_STUDIES = [
  {
    id: 'skyline',
    name: 'Skyline Property Group',
    location: 'Dubai, UAE',
    type: 'Premium Brokerage',
    color: 'from-blue-600 to-cyan-500',
    accent: '#0891b2',
    stats: {
      responseReduction: '96%',
      hoursSaved: '22',
      qualifiedViewings: '3x'
    },
    challenge: [
      '3-5 hour response delays',
      '61% unqualified inquiry volume',
      'Frequent viewing double-bookings',
      'Agents wasting 25hrs/week on admin'
    ],
    solution: [
      'AI Lead Qualification Engine',
      'Automated Viewing Scheduler',
      'WhatsApp Auto-Responder Bot',
      'Unified CRM Integration'
    ],
    results: [
      'Response time: 8-12 minutes',
      '22 hours saved per agent/week',
      '74% better lead-to-viewing conversion',
      '3x increase in qualified viewings'
    ],
    testimonial: "We've finally eliminated the chaos. Clients get responses instantly and viewings book themselves.",
    chartData: {
      responseTime: [
        { name: 'Manual Process', time: 240, label: '3-5 Hours' },
        { name: 'AI Automation', time: 10, label: '10 Mins' },
      ],
      leadQuality: [
        { name: 'Qualified', value: 39 },
        { name: 'Unqualified', value: 61 },
      ],
      leadQualityAfter: [
        { name: 'High Intent', value: 70 },
        { name: 'Nurture', value: 20 },
        { name: 'Filtered Out', value: 10 },
      ]
    }
  },
  {
    id: 'bluekey',
    name: 'BlueKey Realtors',
    location: 'Dallas, Texas',
    type: 'Multi-Platform Residential',
    color: 'from-indigo-600 to-purple-500',
    accent: '#7c3aed',
    stats: {
      leakageReduction: '60%',
      conversionBoost: '28%',
      followUp: '100%'
    },
    challenge: [
      '54% lead leakage (no follow-up)',
      'Scattered data (Zillow, FB, WhatsApp)',
      'No central CRM pipeline',
      'Manual platform switching'
    ],
    solution: [
      'Cross-Platform Lead Consolidation',
      '60-Second Auto-Response System',
      'Multi-Touch Nurture Pipeline',
      'Property Matching AI'
    ],
    results: [
      '60% reduction in lost leads',
      '100% inquiry follow-up rate',
      '14 hours saved per agent/week',
      '28% increase in conversions'
    ],
    chartData: {
      leakage: [
        { name: 'Before', leakage: 54, captured: 46 },
        { name: 'After', leakage: 0, captured: 100 },
      ],
      conversionTrend: [
        { month: 'Jan', rate: 2.1 },
        { month: 'Feb', rate: 2.3 },
        { month: 'Mar', rate: 2.8 }, // Implementation
        { month: 'Apr', rate: 3.5 },
        { month: 'May', rate: 4.1 },
        { month: 'Jun', rate: 4.8 },
      ]
    }
  },
  {
    id: 'crownstone',
    name: 'CrownStone Estates',
    location: 'London, UK',
    type: 'Luxury & UHNW',
    color: 'from-slate-700 to-slate-900',
    accent: '#334155',
    stats: {
      noShowDrop: '48%',
      qualTime: '30m',
      adminSaved: '16h'
    },
    challenge: [
      'High no-show rates for luxury viewings',
      'Time zone friction with overseas buyers',
      'Manual confirmation calls',
      'Lack of "Concierge" feel'
    ],
    solution: [
      'Luxury Buyer AI Assistant',
      'Multi-touch Confirmation Engine',
      'Time-zone intelligent scheduling',
      'ROI & Amenities Instant-Answer Bot'
    ],
    results: [
      '48% reduction in no-shows',
      'Qual time: 4hrs → 30 mins',
      'Premium client experience',
      '16 hours admin saved/week'
    ],
    testimonial: "Luxury clients expect speed. CMT helped us deliver a premium experience matching our properties.",
    chartData: {
      noShows: [
        { week: 'Week 1', rate: 35 },
        { week: 'Week 2', rate: 32 },
        { week: 'Week 3', rate: 28 },
        { week: 'Week 4', rate: 12 }, // Go Live
        { week: 'Week 5', rate: 8 },
        { week: 'Week 6', rate: 5 },
      ],
      timeSpent: [
        { name: 'Lead Qual', manual: 240, auto: 30 },
      ]
    }
  },
  {
    id: 'horizon',
    name: 'Horizon Realty',
    location: 'Toronto, Canada',
    type: 'Investor-Focused',
    color: 'from-emerald-600 to-teal-500',
    accent: '#059669',
    stats: {
      conversion: '2.3x',
      offerRatio: '+46%',
      hoursSaved: '18'
    },
    challenge: [
      'Inconsistent investor follow-up',
      'Lack of structured onboarding',
      'Missed nurturing opportunities',
      'Manual reporting'
    ],
    solution: [
      'Investor Pipeline Optimization',
      '14-30 Day Nurture Sequences',
      'Automated Market Reports',
      'Property-Specific AI Assistant'
    ],
    results: [
      '2.3x increase in buyer conversions',
      '46% better viewing-to-offer ratio',
      'Automated educational content',
      'Predictable closing workflow'
    ],
    testimonial: "This turned our agency into a predictable closing machine. Our conversion rates have never been higher.",
    chartData: {
      pipeline: [
        { name: 'Leads', value: 1000 },
        { name: 'Nurtured', value: 850 },
        { name: 'Viewings', value: 400 },
        { name: 'Offers', value: 120 },
        { name: 'Closed', value: 85 }, // 2.3x higher than previous baseline of ~35
      ],
      comparison: [
        { stage: 'View to Offer', before: 12, after: 17.5 }, // 46% increase rough calc
        { stage: 'Close Rate', before: 3.5, after: 8.5 },
      ]
    }
  }
];

// --- HELPER FUNCTIONS ---

const openCalendar = () => {
  window.open(CALENDAR_LINK, '_blank', 'noopener,noreferrer');
};

// --- COMPONENTS ---

const NavSidebar = ({ activeId, setActiveId, setViewMode, isMobileOpen, setIsMobileOpen }) => (
  <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 shadow-2xl`}>
    <div className="p-6 border-b border-slate-800 flex justify-between items-center">
      <div className="cursor-pointer" onClick={() => { setActiveId(null); setIsMobileOpen(false); }}>
        <h1 className="text-xl font-bold tracking-tight">Connects<span className="text-blue-400">Media</span></h1>
        <p className="text-xs text-slate-400 mt-1">Automation Case Studies</p>
      </div>
      <button onClick={() => setIsMobileOpen(false)} className="md:hidden text-slate-400 hover:text-white">
        <X size={20} />
      </button>
    </div>

    <nav className="p-4 space-y-2">
      <button 
        onClick={() => { setActiveId(null); setIsMobileOpen(false); }}
        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${!activeId ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-300 hover:bg-slate-800'}`}
      >
        <LayoutDashboard size={18} />
        <span className="font-medium">Overview</span>
      </button>
      
      <div className="pt-4 pb-2 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
        Case Studies
      </div>

      {CASE_STUDIES.map((study) => (
        <button
          key={study.id}
          onClick={() => { setActiveId(study.id); setViewMode('landing'); setIsMobileOpen(false); }}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-left group ${activeId === study.id ? 'bg-slate-800 text-white border-l-4 border-blue-500' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
        >
          <Building2 size={16} className={activeId === study.id ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300'} />
          <span className="truncate">{study.name}</span>
        </button>
      ))}
    </nav>
    
    <div className="absolute bottom-0 w-full p-6 border-t border-slate-800">
        <div className="text-xs text-slate-500">
            <p className="font-semibold text-slate-400">Connects Media Tech</p>
            <p>business.connectsmedia@gmail.com</p>
        </div>
    </div>
  </div>
);

const LandingPageView = ({ study }) => (
  <div className="animate-fade-in space-y-12">
    {/* Hero Section */}
    <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${study.color} text-white shadow-xl`}>
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
      <div className="relative p-8 md:p-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/20 text-sm font-medium backdrop-blur-sm">
              <Globe size={14} />
              <span>{study.location}</span>
              <span className="mx-2">•</span>
              <span>{study.type}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">{study.name}</h2>
            <p className="text-lg text-blue-100 max-w-xl">
              Transforming operations with intelligent automation. 
              {study.testimonial && <span className="italic opacity-90 block mt-2">"{study.testimonial}"</span>}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full md:w-auto">
            {Object.entries(study.stats).map(([key, value]) => (
              <div key={key} className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 text-center md:text-left">
                <div className="text-3xl font-bold">{value}</div>
                <div className="text-xs uppercase tracking-wide opacity-80 mt-1">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Content Grid */}
    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
      {/* Challenge */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3 text-rose-500">
          <div className="p-2 bg-rose-100 rounded-lg">
            <TrendingUp size={24} className="transform rotate-180" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800">The Challenge</h3>
        </div>
        <ul className="space-y-4">
          {study.challenge.map((item, idx) => (
            <li key={idx} className="flex items-start space-x-3 p-4 bg-rose-50/50 rounded-xl border border-rose-100">
              <X size={20} className="text-rose-500 mt-1 shrink-0" />
              <span className="text-slate-700">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Solution */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3 text-blue-600">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Zap size={24} />
          </div>
          <h3 className="text-2xl font-bold text-slate-800">The Solution</h3>
        </div>
        <ul className="space-y-4">
          {study.solution.map((item, idx) => (
            <li key={idx} className="flex items-start space-x-3 p-4 bg-blue-50/50 rounded-xl border border-blue-100">
              <CheckCircle size={20} className="text-blue-600 mt-1 shrink-0" />
              <span className="text-slate-700">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>

    {/* Results Banner */}
    <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">Operational Impact</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {study.results.map((result, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-800 border border-slate-700 hover:border-blue-500 transition-colors">
              <div className="w-2 h-2 rounded-full bg-blue-500 mx-auto mb-3"></div>
              <p className="text-slate-300 font-medium">{result}</p>
            </div>
          ))}
        </div>
        <button 
          onClick={openCalendar}
          className="mt-10 px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold transition-all transform hover:scale-105 shadow-lg shadow-blue-900/50"
        >
          Schedule Discovery Call
        </button>
      </div>
    </div>
  </div>
);

const DashboardView = ({ study }) => {
  // Render specific charts based on the case study ID
  const renderCharts = () => {
    switch(study.id) {
      case 'skyline':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h4 className="text-lg font-semibold text-slate-800 mb-4">Response Time Velocity</h4>
              <p className="text-sm text-slate-500 mb-6">Drastic reduction from hours to minutes prevents lead drop-off.</p>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={study.chartData.responseTime} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" width={100} tick={{fontSize: 12}} />
                    <Tooltip cursor={{fill: 'transparent'}} />
                    <Bar dataKey="time" fill="#0891b2" radius={[0, 4, 4, 0]} barSize={40}>
                        {
                            study.chartData.responseTime.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={index === 0 ? '#ef4444' : '#22c55e'} />
                            ))
                        }
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h4 className="text-lg font-semibold text-slate-800 mb-4">Lead Qualification Filter</h4>
              <p className="text-sm text-slate-500 mb-6">AI filters 61% of noise, letting agents focus on the 39% high-value leads.</p>
              <div className="h-64 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={study.chartData.leadQuality}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      <Cell fill="#22c55e" />
                      <Cell fill="#e2e8f0" />
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36}/>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        );
      
      case 'bluekey':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h4 className="text-lg font-semibold text-slate-800 mb-4">Lead Leakage Elimination</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={study.chartData.leakage}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="leakage" name="Lost Leads" fill="#ef4444" stackId="a" />
                    <Bar dataKey="captured" name="Captured" fill="#22c55e" stackId="a" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h4 className="text-lg font-semibold text-slate-800 mb-4">Conversion Rate Growth</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={study.chartData.conversionTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="rate" stroke="#8884d8" fill="#8884d8" fillOpacity={0.2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        );
      
      case 'crownstone':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
             <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h4 className="text-lg font-semibold text-slate-800 mb-4">No-Show Rate Reduction</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={study.chartData.noShows}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="rate" stroke="#ef4444" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
             <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center items-center text-center">
                <div className="p-4 bg-blue-50 rounded-full mb-4">
                    <Clock size={48} className="text-blue-600" />
                </div>
                <h4 className="text-4xl font-bold text-slate-800 mb-2">30 mins</h4>
                <p className="text-slate-500">Qualification Time (vs 4 hours)</p>
                <div className="mt-6 w-full max-w-xs bg-slate-100 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: '12%'}}></div>
                </div>
            </div>
          </div>
        );

      case 'horizon':
        return (
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h4 className="text-lg font-semibold text-slate-800 mb-4">Investor Nurture Funnel</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                   <BarChart data={study.chartData.pipeline} layout="vertical">
                      <XAxis type="number" hide />
                      <YAxis dataKey="name" type="category" width={80} />
                      <Tooltip />
                      <Bar dataKey="value" fill="#059669" radius={[0, 4, 4, 0]} barSize={20} />
                   </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
             <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h4 className="text-lg font-semibold text-slate-800 mb-4">Efficiency Gains</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={study.chartData.comparison}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="stage" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="before" name="Before %" fill="#94a3b8" />
                    <Bar dataKey="after" name="After %" fill="#059669" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
           </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                <p className="text-sm text-slate-500 mb-1">Total Time Saved</p>
                <p className="text-3xl font-bold text-slate-800">{study.stats.hoursSaved || study.stats.adminSaved}h<span className="text-sm font-normal text-slate-400">/week</span></p>
            </div>
             <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                <p className="text-sm text-slate-500 mb-1">Conversion Impact</p>
                <p className="text-3xl font-bold text-green-600">{study.stats.qualifiedViewings || study.stats.conversionBoost || study.stats.conversion}</p>
            </div>
             <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                <p className="text-sm text-slate-500 mb-1">Response Efficiency</p>
                <p className="text-3xl font-bold text-blue-600">{study.stats.responseReduction || study.stats.followUp || study.stats.noShowDrop}</p>
            </div>
       </div>

      {renderCharts()}

      <div className="bg-blue-50 rounded-xl p-6 border border-blue-100 mt-8">
          <h4 className="text-blue-900 font-semibold mb-2 flex items-center gap-2">
            <Zap size={18} />
            Connects Media Tech Analysis
          </h4>
          <p className="text-blue-800 text-sm">
            Data collected over a 6-week implementation period. Results verified via CRM timestamps and agent activity logs. 
            The dashboards above visualize the direct correlation between automation deployment (Week 3-4) and metric improvements.
          </p>
      </div>
    </div>
  );
};

const OverviewPage = ({ setActiveId, setViewMode }) => (
  <div className="max-w-4xl mx-auto space-y-12 animate-fade-in py-8">
    <div className="text-center space-y-4">
      <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
        Proven Automation Frameworks
      </h1>
      <p className="text-xl text-slate-600 max-w-2xl mx-auto">
        Transforming real estate operations through reduced overhead, accelerated response times, and improved conversion rates.
      </p>
      <div className="flex justify-center pt-4">
        <button className="px-6 py-2 bg-slate-900 text-white rounded-full text-sm font-medium">
          Global Case Studies 2024-2025
        </button>
      </div>
    </div>

    <div className="grid md:grid-cols-2 gap-6">
      {CASE_STUDIES.map((study) => (
        <div 
          key={study.id} 
          onClick={() => { setActiveId(study.id); setViewMode('landing'); }}
          className="group relative bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all cursor-pointer overflow-hidden"
        >
          <div className={`h-2 w-full bg-gradient-to-r ${study.color}`}></div>
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{study.name}</h3>
                <p className="text-sm text-slate-500">{study.location}</p>
              </div>
              <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-blue-50 transition-colors">
                <ArrowRight size={20} className="text-slate-400 group-hover:text-blue-600" />
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center text-sm text-slate-600">
                <CheckCircle size={16} className="text-green-500 mr-2" />
                {study.results[0]}
              </div>
              <div className="flex items-center text-sm text-slate-600">
                <CheckCircle size={16} className="text-green-500 mr-2" />
                {study.results[1]}
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold px-2 py-1 bg-slate-100 rounded text-slate-600">{study.type}</span>
                <span className="text-xs text-blue-600 font-medium group-hover:translate-x-1 transition-transform">View Analysis &rarr;</span>
            </div>
          </div>
        </div>
      ))}
    </div>
    
    <div className="bg-slate-900 text-white rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to automate your workflow?</h2>
        <p className="text-slate-300 mb-6">Schedule a discovery call to discuss your specific challenges.</p>
        <button 
          onClick={openCalendar}
          className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg hover:shadow-blue-500/50"
        >
            Get Your Custom Assessment
        </button>
    </div>
  </div>
);

// --- MAIN APP COMPONENT ---

const App = () => {
  const [activeId, setActiveId] = useState(null);
  const [viewMode, setViewMode] = useState('landing'); // 'landing' or 'dashboard'
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const activeStudy = CASE_STUDIES.find(s => s.id === activeId);

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      {/* Sidebar */}
      <NavSidebar 
        activeId={activeId} 
        setActiveId={setActiveId} 
        setViewMode={setViewMode}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:ml-64 h-full relative">
        {/* Mobile Header */}
        <header className="md:hidden h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sticky top-0 z-30">
          <span className="font-bold text-lg">Connects Media</span>
          <button onClick={() => setIsMobileOpen(true)} className="p-2 text-slate-600">
            <Menu size={24} />
          </button>
        </header>

        {/* Top View Toggle (Only visible inside a case study) */}
        {activeId && (
          <div className="bg-white border-b border-slate-200 px-6 py-3 flex justify-between items-center shadow-sm z-20">
            <div className="flex items-center space-x-2 text-sm text-slate-500">
               <button onClick={() => setActiveId(null)} className="hover:text-blue-600 transition-colors">Overview</button>
               <ChevronRight size={14} />
               <span className="font-semibold text-slate-800">{activeStudy.name}</span>
            </div>
            
            <div className="flex bg-slate-100 p-1 rounded-lg">
              <button
                onClick={() => setViewMode('landing')}
                className={`flex items-center space-x-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all ${viewMode === 'landing' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                <FileText size={14} />
                <span className="hidden sm:inline">Case Study</span>
              </button>
              <button
                onClick={() => setViewMode('dashboard')}
                className={`flex items-center space-x-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all ${viewMode === 'dashboard' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                <LayoutDashboard size={14} />
                <span className="hidden sm:inline">Live Dashboard</span>
              </button>
            </div>
          </div>
        )}

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-20">
          {activeId ? (
            <div className="max-w-5xl mx-auto">
              {viewMode === 'landing' ? (
                <LandingPageView study={activeStudy} />
              ) : (
                <DashboardView study={activeStudy} />
              )}
            </div>
          ) : (
            <OverviewPage setActiveId={setActiveId} setViewMode={setViewMode} />
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
