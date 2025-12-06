import React, { useState, useEffect } from 'react';
import { fetchFloodData } from '../../services/waterDataService';
import { Droplets, TrendingUp, AlertTriangle, ArrowDown, Activity, ChevronRight, X } from 'lucide-react';

// Exact prefixes based on file listing: 'Khanpur', 'simly', 'Rawal', 'Tarbela', 'Mangla'
const RESERVOIRS = [
    { id: 'try_khanpur', name: 'Khanpur Dam', prefix: 'Khanpur' },
    { id: 'try_simly', name: 'Simly Dam', prefix: 'simly' },
    { id: 'try_rawal', name: 'Rawal Dam', prefix: 'Rawal' },
    { id: 'try_tarbela', name: 'Tarbela Dam', prefix: 'Tarbela' },
    { id: 'try_mangla', name: 'Mangla Dam', prefix: 'Mangla' }
];

const WaterAnalysis = () => {
    const [floodData, setFloodData] = useState(null);
    const [selectedReservoir, setSelectedReservoir] = useState(RESERVOIRS[3]); // Default Tarbela (index 3)
    const [loading, setLoading] = useState(true);
    const [expandedImage, setExpandedImage] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchFloodData();
                setFloodData(data);
            } catch (err) {
                console.error("Failed to load water data", err);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const getRiskColor = (risk) => {
        switch (risk) {
            case 'EXTREME': return 'text-red-400 bg-red-400/10 border-red-400/20';
            case 'DANGER': return 'text-red-400 bg-red-400/10 border-red-400/20';
            case 'WARNING': return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
            default: return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full min-h-[500px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
            </div>
        );
    }

    const { risks } = floodData || { risks: {} };

    return (
        <div className="p-6 space-y-6 animate-fade-in pb-24 text-white">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent flex items-center gap-3">
                        <Droplets className="w-8 h-8 text-blue-400" />
                        Water Levels & Reservoir Analysis
                    </h1>
                    <p className="text-gray-400 text-sm mt-1 max-w-2xl">
                        Real-time monitoring of major dams, barrages, and river inflows with historical trend analysis and predictive modeling.
                    </p>
                </div>
                <div className="text-xs text-gray-400 bg-black/20 px-3 py-1.5 rounded-lg border border-white/5 backdrop-blur-sm">
                    Live Source: <span className="text-blue-300 font-medium">{floodData?.source}</span>
                </div>
            </div>

            {/* LIGHTBOX MODAL */}
            {expandedImage && (
                <div
                    className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
                    onClick={() => setExpandedImage(null)}
                >
                    <div className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center">
                        <button
                            onClick={() => setExpandedImage(null)}
                            className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors p-2"
                        >
                            <span className="sr-only">Close</span>
                            <X className="w-8 h-8" />
                        </button>
                        <img
                            src={expandedImage}
                            alt="Full Screen View"
                            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                </div>
            )}

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Tarbela Card */}
                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/10 shadow-lg relative overflow-hidden group hover:bg-white/10 transition-all">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Activity className="w-16 h-16 text-blue-400" />
                    </div>
                    <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Tarbela Dam Level</h3>
                    <div className="flex items-end gap-2 mb-2">
                        <span className="text-4xl font-black text-white tracking-tight">
                            {risks?.tarbela?.level?.toFixed(1) || '--'}
                        </span>
                        <span className="text-sm font-medium text-gray-400 mb-1">ft</span>
                    </div>
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold border ${getRiskColor(risks?.tarbela?.risk)}`}>
                        <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                        {risks?.tarbela?.risk || 'NORMAL'}
                    </div>
                </div>

                {/* Mangla Card */}
                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/10 shadow-lg relative overflow-hidden group hover:bg-white/10 transition-all">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <TrendingUp className="w-16 h-16 text-emerald-400" />
                    </div>
                    <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Mangla Dam Level</h3>
                    <div className="flex items-end gap-2 mb-2">
                        <span className="text-4xl font-black text-white tracking-tight">
                            {risks?.mangla?.level?.toFixed(1) || '--'}
                        </span>
                        <span className="text-sm font-medium text-gray-400 mb-1">ft</span>
                    </div>
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold border ${getRiskColor(risks?.mangla?.risk)}`}>
                        <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                        {risks?.mangla?.risk || 'NORMAL'}
                    </div>
                </div>

                {/* Total Inflow Card */}
                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/10 shadow-lg relative overflow-hidden group hover:bg-white/10 transition-all">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <ArrowDown className="w-16 h-16 text-purple-400" />
                    </div>
                    <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Total Rim Inflow</h3>
                    <div className="flex items-end gap-2 mb-2">
                        <span className="text-4xl font-black text-white tracking-tight">
                            {risks?.rim_stations?.total_inflow?.toLocaleString() || '--'}
                        </span>
                        <span className="text-sm font-medium text-gray-400 mb-1">cusecs</span>
                    </div>
                    <div className="text-xs text-gray-500">Aggregate inflow of all major rivers.</div>
                </div>
            </div>

            {/* Reservoir Analyis Section */}
            <div className="bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-2xl">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <div>
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <BarChart3Icon className="w-5 h-5 text-blue-400" />
                            Reservoir Trends
                        </h2>
                        <p className="text-sm text-gray-400 mt-1">Select a reservoir to view hydrographs and storage capacity.</p>
                    </div>
                    <div className="relative">
                        <select
                            value={selectedReservoir.id}
                            onChange={(e) => setSelectedReservoir(RESERVOIRS.find(r => r.id === e.target.value))}
                            className="bg-gray-900/80 border border-white/20 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 px-4 pr-10 appearance-none hover:bg-gray-800 transition-colors"
                        >
                            {RESERVOIRS.map(r => (
                                <option key={r.id} value={r.id}>{r.name}</option>
                            ))}
                        </select>
                        <ChevronRight className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none" />
                    </div>
                </div>

                {/* Image Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((num) => {
                        const imgUrl = `/reservoirs/${selectedReservoir.prefix} reserviour img ${num}.jpg`;
                        return (
                            <div
                                key={num}
                                className="bg-black/30 rounded-xl overflow-hidden border border-white/5 group hover:border-white/20 transition-all duration-300 shadow-lg cursor-pointer"
                                onClick={() => setExpandedImage(imgUrl)}
                            >
                                <div className="aspect-video relative bg-gray-900/50 flex items-center justify-center p-2">
                                    <img
                                        src={imgUrl}
                                        alt={`${selectedReservoir.name} Chart ${num}`}
                                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.parentElement.classList.add('p-8', 'text-center');
                                            e.target.parentElement.innerHTML = `<div class="flex flex-col items-center gap-2"><div class="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-500">?</div><span class="text-xs text-gray-500">Chart Unavailable</span></div>`;
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-end justify-center pb-4">
                                        <span className="text-xs text-white bg-black/50 px-2 py-1 rounded backdrop-blur-sm">Click to expand</span>
                                    </div>
                                </div>
                                <div className="p-3 border-t border-white/5">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                        Analysis Chart 0{num}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Detailed Data Table */}
            <div className="bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
                <div className="px-6 py-4 border-b border-white/10 bg-white/5">
                    <h3 className="font-bold text-white flex items-center gap-2">
                        <Activity className="w-5 h-5 text-emerald-400" />
                        Detailed River Report
                    </h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-300">
                        <thead className="bg-white/5 text-gray-400 uppercase text-xs font-bold">
                            <tr>
                                <th className="px-6 py-4">Location</th>
                                <th className="px-6 py-4">Type</th>
                                <th className="px-6 py-4 text-right">Inflow (Cs)</th>
                                <th className="px-6 py-4 text-right">Outflow (Cs)</th>
                                <th className="px-6 py-4 text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {/* Dams */}
                            <tr className="hover:bg-white/5 transition-colors group">
                                <td className="px-6 py-4 font-medium text-white group-hover:text-blue-300 transition-colors">Tarbela Dam</td>
                                <td className="px-6 py-4 text-gray-500 text-xs uppercase">Reservoir</td>
                                <td className="px-6 py-4 text-right font-mono text-white">{risks?.tarbela?.inflow?.toLocaleString()}</td>
                                <td className="px-6 py-4 text-right font-mono text-gray-400">{risks?.tarbela?.outflow?.toLocaleString()}</td>
                                <td className="px-6 py-4 text-center">
                                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${getRiskColor(risks?.tarbela?.risk)}`}>{risks?.tarbela?.risk}</span>
                                </td>
                            </tr>
                            <tr className="hover:bg-white/5 transition-colors group">
                                <td className="px-6 py-4 font-medium text-white group-hover:text-blue-300 transition-colors">Mangla Dam</td>
                                <td className="px-6 py-4 text-gray-500 text-xs uppercase">Reservoir</td>
                                <td className="px-6 py-4 text-right font-mono text-white">{risks?.mangla?.inflow?.toLocaleString()}</td>
                                <td className="px-6 py-4 text-right font-mono text-gray-400">{risks?.mangla?.outflow?.toLocaleString()}</td>
                                <td className="px-6 py-4 text-center">
                                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${getRiskColor(risks?.mangla?.risk)}`}>{risks?.mangla?.risk}</span>
                                </td>
                            </tr>

                            {/* Stations */}
                            {Object.entries(risks?.stations || {}).map(([key, data]) => (
                                <tr key={key} className="hover:bg-white/5 transition-colors border-l-2 border-transparent hover:border-blue-500/50">
                                    <td className="px-6 py-4 font-medium text-white capitalize">{key}</td>
                                    <td className="px-6 py-4 text-gray-500 text-xs uppercase">Station</td>
                                    <td className="px-6 py-4 text-right font-mono text-white">{data.inflow?.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-right font-mono text-gray-400">{data.outflow?.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${getRiskColor(data.risk)}`}>{data.risk}</span>
                                    </td>
                                </tr>
                            ))}

                            {/* Barrages */}
                            {Object.entries(risks?.barrages || {}).map(([key, data]) => (
                                <tr key={key} className="hover:bg-white/5 transition-colors border-l-2 border-transparent hover:border-purple-500/50">
                                    <td className="px-6 py-4 font-medium text-white capitalize">{key} Barrage</td>
                                    <td className="px-6 py-4 text-gray-500 text-xs uppercase">Barrage</td>
                                    <td className="px-6 py-4 text-right font-mono text-white">{data.inflow?.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-right font-mono text-gray-400">{data.outflow?.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${getRiskColor(data.risk)}`}>{data.risk}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

// Add icon helper
const BarChart3Icon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" x2="12" y1="20" y2="10" /><line x1="18" x2="18" y1="20" y2="4" /><line x1="6" x2="6" y1="20" y2="16" /></svg>
);

export default WaterAnalysis;
