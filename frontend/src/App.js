import React, { useState, useEffect, useRef } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Search, AlertTriangle, CheckCircle, TrendingUp, Globe, Activity, Database, Zap } from 'lucide-react';

const API_BASE = 'http://localhost:8000';

const RISK_COLORS = {
  high: '#ef4444',
  medium: '#f59e0b',
  low: '#10b981'
};

const WFIPDashboard = () => {
  const [features, setFeatures] = useState([]);
  const [scanHistory, setScanHistory] = useState([]);
  const [heatmap, setHeatmap] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      // Load mock data for demo (replace with real API calls)
      const mockFeatures = [
        { name: ':has()', global_support: 87.3, risk_level: 4.2, baseline_status: 'newly_available' },
        { name: 'backdrop-filter', global_support: 94.5, risk_level: 1.8, baseline_status: 'widely_available' },
        { name: 'subgrid', global_support: 72.4, risk_level: 7.5, baseline_status: 'limited' },
        { name: 'container-queries', global_support: 85.1, risk_level: 5.0, baseline_status: 'newly_available' },
        { name: 'view-transitions', global_support: 68.2, risk_level: 8.3, baseline_status: 'limited' },
        { name: 'scroll-snap', global_support: 96.2, risk_level: 1.2, baseline_status: 'widely_available' },
        { name: 'IntersectionObserver', global_support: 96.8, risk_level: 1.0, baseline_status: 'widely_available' },
        { name: '@layer', global_support: 89.5, risk_level: 3.5, baseline_status: 'newly_available' }
      ];

      const mockHistory = [
        { id: 1, ui_name: 'Dashboard UI', scan_date: '2025-09-28', compliance_score: 87.5, total_features: 12 },
        { id: 2, ui_name: 'Admin Panel', scan_date: '2025-09-27', compliance_score: 72.3, total_features: 18 },
        { id: 3, ui_name: 'Marketing Site', scan_date: '2025-09-26', compliance_score: 94.2, total_features: 8 },
        { id: 4, ui_name: 'Mobile App Web', scan_date: '2025-09-25', compliance_score: 81.7, total_features: 15 },
        { id: 5, ui_name: 'Dashboard UI', scan_date: '2025-09-20', compliance_score: 85.1, total_features: 12 }
      ];

      const mockHeatmap = {
        total_uis: 4,
        average_compliance: 83.9,
        ui_analyses: [
          { ui_name: 'Dashboard UI', compliance_score: 87.5, total_features: 12, high_risk_features: ['subgrid'], deprecated_features: [] },
          { ui_name: 'Admin Panel', compliance_score: 72.3, total_features: 18, high_risk_features: ['subgrid', 'view-transitions'], deprecated_features: ['document.write'] },
          { ui_name: 'Marketing Site', compliance_score: 94.2, total_features: 8, high_risk_features: [], deprecated_features: [] },
          { ui_name: 'Mobile App Web', compliance_score: 81.7, total_features: 15, high_risk_features: [':has()'], deprecated_features: [] }
        ],
        summary: {
          low_compliance_uis: 1,
          high_risk_uis: 3
        }
      };

      setFeatures(mockFeatures);
      setScanHistory(mockHistory);
      setHeatmap(mockHeatmap);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRiskCategory = (riskLevel) => {
    if (riskLevel < 3) return 'low';
    if (riskLevel < 6) return 'medium';
    return 'high';
  };

  const getRiskBadgeColor = (riskLevel) => {
    const category = getRiskCategory(riskLevel);
    return RISK_COLORS[category];
  };

  const filteredFeatures = features.filter(f => 
    f.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Prepare chart data
  const riskDistribution = [
    { name: 'Low Risk', value: features.filter(f => getRiskCategory(f.risk_level) === 'low').length, color: RISK_COLORS.low },
    { name: 'Medium Risk', value: features.filter(f => getRiskCategory(f.risk_level) === 'medium').length, color: RISK_COLORS.medium },
    { name: 'High Risk', value: features.filter(f => getRiskCategory(f.risk_level) === 'high').length, color: RISK_COLORS.high }
  ];

  const complianceTrend = scanHistory
    .sort((a, b) => new Date(a.scan_date) - new Date(b.scan_date))
    .map(scan => ({
      date: scan.scan_date.slice(5),
      score: scan.compliance_score,
      ui: scan.ui_name
    }));

  const uiComparisonData = heatmap?.ui_analyses.map(ui => ({
    name: ui.ui_name.split(' ')[0],
    compliance: ui.compliance_score,
    features: ui.total_features,
    highRisk: ui.high_risk_features.length
  })) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <header className="bg-slate-800/50 backdrop-blur-xl border-b border-slate-700 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-lg">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  WFIP Dashboard
                </h1>
                <p className="text-sm text-slate-400">Web Feature Intelligence Platform</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Database className="w-4 h-4" />
                <span>{features.length} features tracked</span>
              </div>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-2">
                <Zap className="w-4 h-4" />
                New Scan
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="container mx-auto px-6 py-4">
        <div className="flex gap-2 bg-slate-800/50 p-1 rounded-lg backdrop-blur-sm inline-flex">
          {['overview', 'features', 'heatmap', 'history'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-md transition-all capitalize ${
                activeTab === tab
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 py-6">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-slate-400 text-sm">Avg Compliance</p>
                        <h3 className="text-3xl font-bold mt-1">{heatmap?.average_compliance.toFixed(1)}%</h3>
                      </div>
                      <div className="bg-green-500/20 p-3 rounded-lg">
                        <CheckCircle className="w-6 h-6 text-green-400" />
                      </div>
                    </div>
                    <div className="mt-4 flex items-center gap-1 text-sm text-green-400">
                      <TrendingUp className="w-4 h-4" />
                      <span>+2.3% from last week</span>
                    </div>
                  </div>

                  <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-slate-400 text-sm">UIs Tracked</p>
                        <h3 className="text-3xl font-bold mt-1">{heatmap?.total_uis}</h3>
                      </div>
                      <div className="bg-blue-500/20 p-3 rounded-lg">
                        <Globe className="w-6 h-6 text-blue-400" />
                      </div>
                    </div>
                    <div className="mt-4 text-sm text-slate-400">
                      {heatmap?.summary.high_risk_uis} with high risk features
                    </div>
                  </div>

                  <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-slate-400 text-sm">Features Scanned</p>
                        <h3 className="text-3xl font-bold mt-1">{features.length}</h3>
                      </div>
                      <div className="bg-purple-500/20 p-3 rounded-lg">
                        <Activity className="w-6 h-6 text-purple-400" />
                      </div>
                    </div>
                    <div className="mt-4 text-sm text-slate-400">
                      {features.filter(f => f.baseline_status === 'newly_available').length} newly available
                    </div>
                  </div>

                  <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-slate-400 text-sm">High Risk</p>
                        <h3 className="text-3xl font-bold mt-1">
                          {features.filter(f => getRiskCategory(f.risk_level) === 'high').length}
                        </h3>
                      </div>
                      <div className="bg-red-500/20 p-3 rounded-lg">
                        <AlertTriangle className="w-6 h-6 text-red-400" />
                      </div>
                    </div>
                    <div className="mt-4 text-sm text-slate-400">
                      Requires immediate attention
                    </div>
                  </div>
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Risk Distribution */}
                  <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-4">Feature Risk Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={riskDistribution}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {riskDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Compliance Trend */}
                  <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-4">Compliance Trend</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={complianceTrend}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="date" stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" domain={[60, 100]} />
                        <Tooltip
                          contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                          labelStyle={{ color: '#94a3b8' }}
                        />
                        <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6' }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* UI Comparison */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-4">UI Compliance Comparison</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={uiComparisonData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="name" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                        labelStyle={{ color: '#94a3b8' }}
                      />
                      <Legend />
                      <Bar dataKey="compliance" fill="#10b981" name="Compliance %" radius={[8, 8, 0, 0]} />
                      <Bar dataKey="highRisk" fill="#ef4444" name="High Risk Features" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* Features Tab */}
            {activeTab === 'features' && (
              <div className="space-y-6">
                {/* Search Bar */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search features..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    />
                  </div>
                </div>

                {/* Features Table */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-slate-700/50">
                      <tr>
                        <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300">Feature</th>
                        <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300">Global Support</th>
                        <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300">Risk Level</th>
                        <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300">Status</th>
                        <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                      {filteredFeatures.map((feature, idx) => (
                        <tr key={idx} className="hover:bg-slate-700/30 transition-colors">
                          <td className="px-6 py-4">
                            <code className="text-blue-400 bg-blue-500/10 px-2 py-1 rounded">
                              {feature.name}
                            </code>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className="w-32 bg-slate-700 rounded-full h-2">
                                <div
                                  className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all"
                                  style={{ width: `${feature.global_support}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-medium">{feature.global_support}%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: getRiskBadgeColor(feature.risk_level) }}
                              ></div>
                              <span className="text-sm">{feature.risk_level.toFixed(1)}/10</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              feature.baseline_status === 'widely_available' 
                                ? 'bg-green-500/20 text-green-400'
                                : feature.baseline_status === 'newly_available'
                                ? 'bg-yellow-500/20 text-yellow-400'
                                : 'bg-red-500/20 text-red-400'
                            }`}>
                              {feature.baseline_status.replace('_', ' ')}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => setSelectedFeature(feature)}
                              className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Heatmap Tab */}
            {activeTab === 'heatmap' && heatmap && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {heatmap.ui_analyses.map((ui, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-lg">{ui.ui_name}</h3>
                        <div
                          className={`text-2xl font-bold ${
                            ui.compliance_score >= 90
                              ? 'text-green-400'
                              : ui.compliance_score >= 70
                              ? 'text-yellow-400'
                              : 'text-red-400'
                          }`}
                        >
                          {ui.compliance_score}%
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-400">Total Features</span>
                          <span className="font-medium">{ui.total_features}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-400">Baseline Compliant</span>
                          <span className="font-medium text-green-400">{ui.baseline_compliant}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-400">High Risk Features</span>
                          <span className="font-medium text-red-400">{ui.high_risk_features.length}</span>
                        </div>
                        {ui.deprecated_features.length > 0 && (
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-400">Deprecated</span>
                            <span className="font-medium text-orange-400">{ui.deprecated_features.length}</span>
                          </div>
                        )}
                      </div>

                      {ui.high_risk_features.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-slate-700">
                          <p className="text-xs text-slate-400 mb-2">High Risk:</p>
                          <div className="flex flex-wrap gap-1">
                            {ui.high_risk_features.map((feat, i) => (
                              <code key={i} className="text-xs bg-red-500/10 text-red-400 px-2 py-1 rounded">
                                {feat}
                              </code>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* History Tab */}
            {activeTab === 'history' && (
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-slate-700/50">
                    <tr>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300">UI Name</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300">Scan Date</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300">Compliance</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300">Features</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700">
                    {scanHistory.map((scan) => (
                      <tr key={scan.id} className="hover:bg-slate-700/30 transition-colors">
                        <td className="px-6 py-4 font-medium">{scan.ui_name}</td>
                        <td className="px-6 py-4 text-slate-400">{scan.scan_date}</td>
                        <td className="px-6 py-4">
                          <span className={`font-semibold ${
                            scan.compliance_score >= 90
                              ? 'text-green-400'
                              : scan.compliance_score >= 70
                              ? 'text-yellow-400'
                              : 'text-red-400'
                          }`}>
                            {scan.compliance_score}%
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-400">{scan.total_features}</td>
                        <td className="px-6 py-4">
                          <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                            View Report
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>

      {/* Feature Detail Modal */}
      {selectedFeature && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-6">
              <div>
                <code className="text-2xl font-bold text-blue-400">{selectedFeature.name}</code>
                <p className="text-slate-400 mt-1">Feature Risk Assessment</p>
              </div>
              <button
                onClick={() => setSelectedFeature(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-700/50 rounded-lg p-4">
                <p className="text-slate-400 text-sm mb-1">Global Support</p>
                <p className="text-3xl font-bold text-green-400">{selectedFeature.global_support}%</p>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-4">
                <p className="text-slate-400 text-sm mb-1">Risk Level</p>
                <p className="text-3xl font-bold" style={{ color: getRiskBadgeColor(selectedFeature.risk_level) }}>
                  {selectedFeature.risk_level.toFixed(1)}/10
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-slate-400 text-sm mb-2">Baseline Status</p>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  selectedFeature.baseline_status === 'widely_available' 
                    ? 'bg-green-500/20 text-green-400'
                    : selectedFeature.baseline_status === 'newly_available'
                    ? 'bg-yellow-500/20 text-yellow-400'
                    : 'bg-red-500/20 text-red-400'
                }`}>
                  {selectedFeature.baseline_status.replace('_', ' ')}
                </span>
              </div>

              <div>
                <p className="text-slate-400 text-sm mb-2">Recommendation</p>
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                  <p className="text-blue-300">
                    {selectedFeature.risk_level < 3
                      ? '✅ Safe to use. This feature has excellent browser support.'
                      : selectedFeature.risk_level < 6
                      ? '⚠️ Use with caution. Consider progressive enhancement or polyfills for older browsers.'
                      : '🔥 High risk. Strongly consider alternatives or ensure fallbacks are in place.'}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                View Documentation
              </button>
              <button className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors">
                Check Alternatives
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WFIPDashboard;
